// Pure synthetic mapping controls; no proof read/copy/split/write or load.
import assert from 'node:assert/strict';
import {validateMappingShape} from '../verify-package.mjs';
const originalRoot='/synthetic-original',packageRoot='/synthetic-package',sha='a'.repeat(64);
const original={path:originalRoot+'/samples.jsonl',relativePath:'samples.jsonl',sizeBytes:9*1024**2,sha256:sha};
const mapping={originalPath:original.path,relativePath:original.relativePath,sizeBytes:original.sizeBytes,sha256:sha,kind:'chunks',files:[0,1,2].map(i=>({path:packageRoot+'/part'+i,offset:i*4*1024**2,sizeBytes:i===2?1024**2:4*1024**2,sha256:sha}))};
validateMappingShape(original,mapping,originalRoot,packageRoot);
for(const change of [m=>m.files.reverse(),m=>m.files[1].offset++,m=>m.files[1].path=m.files[0].path,m=>m.files.pop(),m=>m.files[0].sizeBytes++,m=>m.kind='copy',m=>m.sha256='b'.repeat(64),m=>m.originalPath='/foreign/samples.jsonl',m=>m.files[0].path='/outside/part',m=>m.files[0].sha256='fake']){
 const m=structuredClone(mapping);change(m);assert.throws(()=>validateMappingShape(original,m,originalRoot,packageRoot));
}
const small={path:originalRoot+'/small',relativePath:'small',sizeBytes:8*1024**2,sha256:sha};
const copy={originalPath:small.path,relativePath:small.relativePath,sizeBytes:small.sizeBytes,sha256:sha,kind:'copy',files:[{path:packageRoot+'/small',offset:0,sizeBytes:small.sizeBytes,sha256:sha}]};
validateMappingShape(small,copy,originalRoot,packageRoot);
const bad=structuredClone(copy);bad.kind='chunks';assert.throws(()=>validateMappingShape(small,bad,originalRoot,packageRoot));
console.log(JSON.stringify({pass:true,scope:'pure synthetic gap/reorder/duplicate/omission/unit/path/hash/copy-threshold controls',actualPackageExecuted:false,actualProofValidated:false,actualLoadExecuted:false}));
