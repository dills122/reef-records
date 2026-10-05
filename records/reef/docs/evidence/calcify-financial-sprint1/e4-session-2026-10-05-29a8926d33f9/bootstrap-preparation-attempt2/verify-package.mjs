// Independent streaming verifier: reads originals and package; never writes either.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile,readdir,lstat,realpath,open} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {validateClosure} from './build-inputs.mjs';
const sha=b=>createHash('sha256').update(b).digest('hex');
export const SIDECARS=['lossless-original-files.json','lossless-original-closure.json','lossless-packaging.json','lossless-cleanup-inspection.json'];
export function validateMappingShape(source,mapping,originalRoot,packageRoot){
 assert.equal(mapping.originalPath,source.path);assert.equal(mapping.relativePath,source.relativePath);
 assert.equal(mapping.sizeBytes,source.sizeBytes);assert.equal(mapping.sha256,source.sha256);
 assert.equal(source.path,path.join(originalRoot,source.relativePath));assert(!source.relativePath.split(path.sep).includes('..'));
 assert.equal(mapping.kind,source.sizeBytes>8*1024**2?'chunks':'copy');assert(Array.isArray(mapping.files)&&mapping.files.length>0);
 let offset=0;const names=new Set();for(const part of mapping.files){
  assert(path.isAbsolute(part.path)&&path.resolve(part.path)===part.path&&part.path.startsWith(packageRoot+path.sep));
  assert(!names.has(part.path));names.add(part.path);assert.equal(part.offset,offset);
  assert(Number.isSafeInteger(part.sizeBytes)&&part.sizeBytes>=0&&part.sizeBytes<=(mapping.kind==='chunks'?4*1024**2:8*1024**2));
  assert(/^[a-f0-9]{64}$/.test(part.sha256));offset+=part.sizeBytes;assert(Number.isSafeInteger(offset));
 }
 assert.equal(offset,source.sizeBytes);
 if(mapping.kind==='copy'){assert.equal(mapping.files.length,1);assert.equal(mapping.files[0].path,path.join(packageRoot,source.relativePath));assert.equal(mapping.files[0].sha256,source.sha256);}
 else assert(mapping.files.every(p=>p.sizeBytes>0),'empty chunk rejected');
}
async function digestFile(file,expected,whole){
 const stat=await lstat(file);assert(stat.isFile()&&!stat.isSymbolicLink());if(expected)assert.equal(stat.size,expected.sizeBytes);
 const fd=await open(file,'r'),hash=createHash('sha256'),buffer=Buffer.alloc(65536);let count=0;
 try{for(;;){const {bytesRead}=await fd.read(buffer,0,buffer.length,count);if(!bytesRead)break;count+=bytesRead;assert(count<=256*1024**2);const b=buffer.subarray(0,bytesRead);hash.update(b);whole?.update(b);}}finally{await fd.close();}
 assert.equal(count,stat.size);const digest=hash.digest('hex');if(expected)assert.equal(digest,expected.sha256);return {sizeBytes:count,sha256:digest};
}
async function tree(root){
 assert.equal(await realpath(root),root);const rows=[];let n=0,total=0;
 async function walk(dir,depth=0){assert(depth<=64);for(const name of await readdir(dir)){
  assert(++n<=65536);const file=path.join(dir,name),s=await lstat(file);assert(!s.isSymbolicLink());
  if(s.isDirectory())await walk(file,depth+1);else{assert(s.isFile());total+=s.size;assert(total<=256*1024**2);rows.push({path:file,relativePath:path.relative(root,file),...await digestFile(file)});}
 }}await walk(root);rows.sort((a,b)=>a.path<b.path?-1:a.path>b.path?1:0);return rows;
}
async function sidecar(file){const stat=await lstat(file);assert(stat.isFile()&&!stat.isSymbolicLink()&&stat.size<=1024**2);const raw=await readFile(file);return {raw,value:JSON.parse(raw)};}
export async function verifyPackage(originalRoot,packageRoot){
 const index=await sidecar(path.join(packageRoot,SIDECARS[0])),closure=await sidecar(path.join(packageRoot,SIDECARS[1])),pack=await sidecar(path.join(packageRoot,SIDECARS[2]));
 const m=pack.value;assert.equal(m.schema,'calcify-lossless-e3-packaging-v1');assert.equal(m.originalRoot,originalRoot);assert.equal(m.packagedRoot,packageRoot);
 assert.equal(m.originalManifestSha256,sha(index.raw));assert.equal(m.closedConfirmationSha256,sha(closure.raw));
 assert.equal(index.value.schema,'calcify-e3-original-file-index-v1');assert.equal(index.value.originalRoot,originalRoot);
 const original=await tree(originalRoot);assert.deepEqual(original,index.value.files,'entire original raw tree changed or omitted');
 const finished=JSON.parse(await readFile(path.join(originalRoot,'supervisor-finished.json'))),status=JSON.parse(await readFile(path.join(originalRoot,'wrapper-status.json')));
 validateClosure(closure.value,finished,status,m.executionManifestSha256);
 assert.equal(m.supervisorFinishedSha256,(await digestFile(path.join(originalRoot,'supervisor-finished.json'))).sha256);
 assert.equal(m.wrapperStatusSha256,(await digestFile(path.join(originalRoot,'wrapper-status.json'))).sha256);
 assert.equal(closure.value.supervisorFinishedSha256,m.supervisorFinishedSha256);assert.equal(closure.value.wrapperStatusSha256,m.wrapperStatusSha256);
 const inspection=await sidecar(path.join(packageRoot,SIDECARS[3])),originalInspection=await sidecar(closure.value.cleanupInspectionPath);
 assert.equal(sha(inspection.raw),closure.value.cleanupInspectionSha256);assert.deepEqual(inspection.raw,originalInspection.raw);
 const registry=JSON.parse(await readFile(path.resolve(import.meta.dirname,'../bootstrap-attempt2/frozen/config.json'))).registeredResources;
 assert(Array.isArray(inspection.value)&&inspection.value.length===3);
 assert.deepEqual(inspection.value.map(r=>r.Id).sort(),registry.containers.map(r=>r.id).sort());
 assert(inspection.value.every(r=>r.State?.Status==='exited'&&r.State?.Running===false&&r.RestartCount===0),'actual owned cleanup inspection required');
 assert.equal(m.mappings.length,original.length);assert.deepEqual(m.mappings.map(r=>r.originalPath),original.map(r=>r.path),'complete ordered bijection required');
 const expected=SIDECARS.map(n=>path.join(packageRoot,n)),mapped=new Set();
 for(let i=0;i<original.length;i++){
  const source=original[i],mapping=m.mappings[i];validateMappingShape(source,mapping,originalRoot,packageRoot);
  const whole=createHash('sha256');let count=0;for(const part of mapping.files){
   assert(!mapped.has(part.path),'duplicate mapped package artifact');mapped.add(part.path);expected.push(part.path);
   const checked=await digestFile(part.path,part,whole);count+=checked.sizeBytes;
  }assert.equal(count,source.sizeBytes);assert.equal(whole.digest('hex'),source.sha256,'independent ordered whole-file reassembly mismatch');
 }
 const packaged=await tree(packageRoot);assert(packaged.length<=4096,'Kotlin file count bound');
 assert.deepEqual(packaged.map(r=>r.path),expected.sort(),'complete package sidecars+copies+chunks set required');
 assert(packaged.every(f=>f.sizeBytes<=8*1024**2));assert.deepEqual(await tree(originalRoot),original,'original changed during verification');
 const originalBytes=original.reduce((n,f)=>n+f.sizeBytes,0),packagedBytes=packaged.reduce((n,f)=>n+f.sizeBytes,0);
 assert(originalBytes+packagedBytes<=256*1024**2,'combined retained raw originals+package exceeds existing256MiB');
 return {schema:'calcify-lossless-e3-verification-v1',pass:true,originalRoot,packagedRoot:packageRoot,originalManifestSha256:sha(index.raw),packagingManifestSha256:sha(pack.raw),closedConfirmationSha256:sha(closure.raw),executionManifestSha256:m.executionManifestSha256,originalFiles:original.length,packagedFiles:packaged.length,originalBytes,packagedBytes,combinedRetainedRawBytes:originalBytes+packagedBytes,reassembly:'Independent64KiB reads; exact ordered contiguous source byte count+SHA for every original; source entire tree equal before/after',actualLoadExecuted:false};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){assert.equal(process.argv.length,4);console.log(JSON.stringify(await verifyPackage(process.argv[2],process.argv[3])));}
