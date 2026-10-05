// Synthetic refusal/schema controls only; never create qualification evidence.
import assert from 'node:assert/strict';
import path from 'node:path';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {validateClosure,validateArm} from './build-inputs.mjs';
const dir=path.resolve(import.meta.dirname),proofRoot=path.resolve(dir,'../bootstrap-attempt1/e3-current-candidate');
const sha='a'.repeat(64);
const confirmation={schema:'calcify-e3-closed-confirmation-v1',confirmedBy:'root',cliExitCode:0,writersClosed:true,cleanupClosed:true,proofRoot,executionManifestSha256:sha};
const finished={ok:true,error:null,cleanupErrors:[],volumesPreserved:true,wrapperStatus:{code:0,signal:null}};
const status={schema:'calcify-e3-serial-wrapper-result-v1',ok:true,error:null,totalResults:49,manifestSha256:sha,startedAtMs:1,completedAtMs:2,results:[
 ['run-external','e4-current-external1',4,'external'],['run-core','e4-current-core1',24,'core'],['run-golden','e4-current-golden1',20,'golden'],['run-activation','e4-current-activation1',1,'activation']].map(([mode,runId,results,directory])=>({mode,runId,results,directory:path.join(proofRoot,directory)}))};
validateClosure(confirmation,finished,status,sha);
for(const [kind,key,value]of [['confirmation','writersClosed',false],['confirmation','cleanupClosed',false],['confirmation','cliExitCode',1],['confirmation','executionManifestSha256','b'.repeat(64)],['finished','ok',false],['finished','cleanupErrors',['error']],['status','totalResults',48],['status','completedAtMs',0]]){
 const c=structuredClone(confirmation),f=structuredClone(finished),s=structuredClone(status);({confirmation:c,finished:f,status:s})[kind][key]=value;
 assert.throws(()=>validateClosure(c,f,s,sha));
}
const identity={fixtureSha256:sha,broker:'127.0.0.1:39492,127.0.0.1:39592,127.0.0.1:39692',classpath:'explicit',compiledHashes:{java:sha},sourceHashes:{source:sha},runnerHashes:{runner:sha}};
const plan={schema:'financial-e3-plan-v1',prefix:'synthetic-controls-only',fixtureSha256:identity.fixtureSha256,broker:identity.broker,classpath:identity.classpath,compiledHashes:identity.compiledHashes,sourceHashes:identity.sourceHashes,runnerHashes:identity.runnerHashes};
const result={prefix:plan.prefix,results:[{name:'activation-quartet',topic:plan.prefix+'-activation-quartet',before:{pass:true},after:{pass:true},idle:{pass:true}}]};
validateArm('activation',1,plan,result,identity);
for(const mutate of [r=>r.results[0].after.pass=false,r=>r.results[0].before.pass=false,r=>r.results[0].idle.pass=false,r=>r.results.push(r.results[0]),r=>r.results[0].topic='other']){
 const r=structuredClone(result);mutate(r);assert.throws(()=>validateArm('activation',1,plan,r,identity));
}
for(const key of ['broker','classpath','fixtureSha256','sourceHashes','compiledHashes','runnerHashes']){
 const p=structuredClone(plan);p[key]=typeof p[key]==='string'?'other':{};assert.throws(()=>validateArm('activation',1,p,result,identity));
}
const pins=JSON.parse(await readFile(path.join(dir,'preparation-pins.json'),'utf8'));
assert.equal(createHash('sha256').update(JSON.stringify(pins.sourceSha256)).digest('hex'),pins.candidateSha256);
assert.equal(pins.candidateSha256,'5cb4cf59c099736a77eb63fe8fe690fa954901e25fd7e1eed072726c2596aa8d');
console.log(JSON.stringify({pass:true,scope:'synthetic closed-proof/schema/refusal controls only',actualProofValidated:false,actualBuilderExecuted:false,actualLoadExecuted:false}));
