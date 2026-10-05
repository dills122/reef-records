// Operator packaging only. Root must wait actual proof closure + fresh packaging Ready.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile,readdir,lstat,realpath,open,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {validateClosure} from './build-inputs.mjs';
import {SIDECARS,verifyPackage} from './verify-package.mjs';
const dir=path.resolve(import.meta.dirname),session=path.dirname(dir),originalRoot=path.join(session,'bootstrap-attempt2/e3-current-candidate'),expectedPackage=path.join(session,'bootstrap-attempt2/e3-packaged-candidate');
const hash=b=>createHash('sha256').update(b).digest('hex'),json=v=>Buffer.from(JSON.stringify(v,null,2)+'\n');
async function digest(file){const fd=await open(file,'r'),h=createHash('sha256'),buffer=Buffer.alloc(65536);let offset=0;try{for(;;){const {bytesRead}=await fd.read(buffer,0,buffer.length,offset);if(!bytesRead)break;offset+=bytesRead;assert(offset<=256*1024**2);h.update(buffer.subarray(0,bytesRead));}}finally{await fd.close();}return {sizeBytes:offset,sha256:h.digest('hex')};}
async function sourceTree(){assert.equal(await realpath(originalRoot),originalRoot);const files=[];let entries=0,total=0;async function walk(dir,depth=0){assert(depth<=64);for(const name of await readdir(dir)){assert(++entries<=65536);const p=path.join(dir,name),s=await lstat(p);assert(!s.isSymbolicLink());if(s.isDirectory())await walk(p,depth+1);else{assert(s.isFile());total+=s.size;assert(total<=256*1024**2);const checked=await digest(p);assert.equal(checked.sizeBytes,s.size);files.push({path:p,relativePath:path.relative(originalRoot,p),...checked});}}}await walk(originalRoot);return files.sort((a,b)=>a.path<b.path?-1:a.path>b.path?1:0);}
async function writeBuffer(fd,buffer){let offset=0;while(offset<buffer.length){const {bytesWritten}=await fd.write(buffer,offset,buffer.length-offset);assert(bytesWritten>0);offset+=bytesWritten;}}
async function emit(source,packageRoot){
 const chunks=source.sizeBytes>8*1024**2,paths=[];const sourceFd=await open(source.path,'r'),whole=createHash('sha256'),buffer=Buffer.alloc(65536);let offset=0,partIndex=0;
 try{do{
  const target=chunks?path.join(packageRoot,'__lossless-e3_chunks__',hash(source.relativePath),`part-${String(partIndex++).padStart(6,'0')}.bin`):path.join(packageRoot,source.relativePath);
  await mkdir(path.dirname(target),{recursive:true});const targetFd=await open(target,'wx'),part=createHash('sha256'),start=offset;let size=0;
  try{while(offset<source.sizeBytes&&size<(chunks?4*1024**2:source.sizeBytes)){
   const limit=Math.min(buffer.length,source.sizeBytes-offset,(chunks?4*1024**2:source.sizeBytes)-size),{bytesRead}=await sourceFd.read(buffer,0,limit,offset);assert(bytesRead>0);
   const b=buffer.subarray(0,bytesRead);await writeBuffer(targetFd,b);whole.update(b);part.update(b);offset+=bytesRead;size+=bytesRead;
  }await targetFd.sync();}finally{await targetFd.close();}
  paths.push({path:target,offset:start,sizeBytes:size,sha256:part.digest('hex')});
 }while(offset<source.sizeBytes);
 const extra=await sourceFd.read(buffer,0,1,offset);assert.equal(extra.bytesRead,0,'source grew while copying');
 }finally{await sourceFd.close();}
 assert.equal(offset,source.sizeBytes);assert.equal(whole.digest('hex'),source.sha256,'source bytes changed while copying');
 return {...source,originalPath:source.path,kind:chunks?'chunks':'copy',files:paths};
}
export async function pack(confirmationPath,packageRoot,receiptPath){
 assert.equal(packageRoot,expectedPackage,'unique registered package sibling required');assert.equal(path.dirname(receiptPath),dir,'receipt worker-owned direct child');
 assert(path.isAbsolute(confirmationPath)&&path.resolve(confirmationPath)===confirmationPath);assert(path.resolve(receiptPath)===receiptPath);
 const confirmationStat=await lstat(confirmationPath);assert(confirmationStat.isFile()&&!confirmationStat.isSymbolicLink()&&confirmationStat.size<=1024**2);
 assert(!confirmationPath.startsWith(originalRoot+path.sep));assert.equal(await realpath(dir),dir);assert.equal(await realpath(path.dirname(packageRoot)),path.dirname(packageRoot));
 const pins=JSON.parse(await readFile(path.join(dir,'preparation-pins.json'))),confirmationRaw=await readFile(confirmationPath);assert.equal(pins.acceptedCandidate,true,'root Attempt2 acceptance required');assert(confirmationRaw.length<=1024**2);
 const finishedPath=path.join(originalRoot,'supervisor-finished.json'),statusPath=path.join(originalRoot,'wrapper-status.json'),confirmation=JSON.parse(confirmationRaw);
 validateClosure(confirmation,JSON.parse(await readFile(finishedPath)),JSON.parse(await readFile(statusPath)),pins.executionManifestSha256);
 assert.equal(confirmation.supervisorFinishedSha256,(await digest(finishedPath)).sha256);assert.equal(confirmation.wrapperStatusSha256,(await digest(statusPath)).sha256);
 const cleanupStat=await lstat(confirmation.cleanupInspectionPath);assert(cleanupStat.isFile()&&!cleanupStat.isSymbolicLink()&&cleanupStat.size<=1024**2);
 const cleanupRaw=await readFile(confirmation.cleanupInspectionPath);assert.equal(hash(cleanupRaw),confirmation.cleanupInspectionSha256);
 const files=await sourceTree();assert(files.length>0);assert(files.every(f=>!SIDECARS.includes(f.relativePath)&&f.relativePath.split(path.sep)[0]!=='__lossless-e3_chunks__'),'reserved package name collision');
 const originalBytes=files.reduce((n,f)=>n+f.sizeBytes,0);assert(originalBytes*2<=256*1024**2,'duplicate raw preservation would exceed existing256MiB envelope');
 const indexRaw=json({schema:'calcify-e3-original-file-index-v1',originalRoot,files});assert(indexRaw.length<=1024**2);
 await mkdir(packageRoot);const mappings=[];for(const source of files)mappings.push(await emit(source,packageRoot));
 assert.deepEqual(await sourceTree(),files,'original complete tree changed while packaging');
 const sidecarRaw=json({schema:'calcify-lossless-e3-packaging-v1',originalRoot,packagedRoot:packageRoot,originalManifestSha256:hash(indexRaw),closedConfirmationSha256:hash(confirmationRaw),executionManifestSha256:pins.executionManifestSha256,supervisorFinishedSha256:confirmation.supervisorFinishedSha256,wrapperStatusSha256:confirmation.wrapperStatusSha256,chunkMaxBytes:4194304,bufferBytes:65536,originalPreservation:'Entire actual original tree unchanged at originalRoot; copied JSON paths still refer to actual execution root',mappings});assert(sidecarRaw.length<=1024**2);
 assert(originalBytes*2+indexRaw.length+confirmationRaw.length+sidecarRaw.length+cleanupRaw.length<=256*1024**2,'combined retained raw sidecar bound');
 for(const [name,raw]of [[SIDECARS[0],indexRaw],[SIDECARS[1],confirmationRaw],[SIDECARS[2],sidecarRaw],[SIDECARS[3],cleanupRaw]])await writeFile(path.join(packageRoot,name),raw,{flag:'wx'});
 const checked=await verifyPackage(originalRoot,packageRoot),receiptRaw=json(checked);assert(checked.combinedRetainedRawBytes+receiptRaw.length<=256*1024**2);
 await writeFile(receiptPath,receiptRaw,{flag:'wx'});return {...checked,receiptPath,receiptSha256:hash(receiptRaw)};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){assert.equal(process.argv.length,8);assert.equal(process.argv[2],'--closed-e3-confirmation');assert.equal(process.argv[4],'--package-root');assert.equal(process.argv[6],'--receipt');console.log(JSON.stringify(await pack(process.argv[3],process.argv[5],process.argv[7])));}
