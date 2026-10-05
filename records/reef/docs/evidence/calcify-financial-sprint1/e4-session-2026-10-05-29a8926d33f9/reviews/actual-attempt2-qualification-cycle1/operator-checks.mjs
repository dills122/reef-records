import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {validateExecutionManifest,directoryFiles,MODES} from '../../e3-preparation-attempt2/wrapper.mjs';
import {validateClosure,validateArm} from '../../bootstrap-preparation-attempt2/build-inputs.mjs';
import {validateMappingShape} from '../../bootstrap-preparation-attempt2/verify-package.mjs';
import {validatePreflight,BUDGETS} from '../../../../scripts/dev/calcify-financial/proof-supervisor.mjs';
const session=path.resolve(import.meta.dirname,'../..'),root=path.resolve(session,'../..');
const read=async p=>JSON.parse(await readFile(p));
const digest=async p=>{const h=createHash('sha256');for await(const b of createReadStream(p))h.update(b);return h.digest('hex');};
let positive=0,negative=0,pinsChecked=0;
for(const name of ['e3-preparation-attempt2','bootstrap-preparation-attempt2']){
 const freeze=await read(path.join(session,name,'operator-code-freeze.json'));
 for(const f of freeze.files.filter(f=>f.path.endsWith('.mjs'))){assert.equal(await digest(f.path),f.sha256,f.path);pinsChecked++;}
}
const pins=await read(path.join(session,'bootstrap-preparation-attempt2/preparation-pins.json'));
const capPath=path.join(session,'bootstrap-attempt2/frozen/capability.json'),cap=await read(capPath),configPath=path.join(session,'bootstrap-attempt2/frozen/config.json'),config=await read(configPath);
for(const [p,h]of [[capPath,pins.capabilitySha256],[configPath,cap.configSha256],[pins.sourceFreezePath,pins.freezeSha256],[pins.reviewReportPath,pins.reviewReportSha256]]){assert.equal(await digest(p),h,p);pinsChecked++;}
for(const [name,h]of Object.entries(pins.sourceSha256)){assert.equal(await digest(path.join(root,name)),h,name);pinsChecked++;}
assert.equal(createHash('sha256').update(JSON.stringify(pins.sourceSha256)).digest('hex'),pins.candidateSha256);positive++;
const executionPath=path.join(session,'bootstrap-attempt2/frozen/e3-execution-manifest.json'),m=await read(executionPath),phase=path.join(m.proofRoot,'broker-fault');
assert.equal(await digest(executionPath),pins.executionManifestSha256);pinsChecked++;
validateExecutionManifest(m,phase);positive++;
for(const [p,h]of Object.entries(m.checksums)){assert.equal(await digest(p),h,p);pinsChecked++;}
for(const d of m.directoryChecksums){assert.deepEqual(await directoryFiles(d.path),d.files,d.path);pinsChecked+=Object.keys(d.files).length;}
assert.deepEqual(m.classpathEntries,cap.classpathEntries);positive++;
const supervisor=await read(path.join(session,'e3-preparation-attempt2/supervisor.recipe.json'));
validatePreflight(supervisor);assert.deepEqual(supervisor.budgets,BUDGETS);positive++;
assert.deepEqual(supervisor.registeredResources.containers.map(c=>c.id),config.registeredResources.containers.map(c=>c.id));positive++;
for(const mutate of [x=>x.acceptedCandidate=false,x=>x.modes[0].runId='e4-current-external1',x=>x.classpathEntries.pop(),x=>delete x.checksums[x.classpathEntries[3]],x=>x.directoryChecksums[0].files={}]){const x=structuredClone(m);mutate(x);assert.throws(()=>validateExecutionManifest(x,phase));negative++;}
const hash='a'.repeat(64),confirmation={schema:'calcify-e3-closed-confirmation-v1',confirmedBy:'root',cliExitCode:0,writersClosed:true,cleanupClosed:true,proofRoot:m.proofRoot,executionManifestSha256:hash};
const finished={ok:true,error:null,cleanupErrors:[],volumesPreserved:true,wrapperStatus:{code:0,signal:null}};
const status={schema:'calcify-e3-serial-wrapper-result-v1',ok:true,error:null,totalResults:49,manifestSha256:hash,startedAtMs:1,completedAtMs:2,results:MODES.map(r=>({mode:r.mode,runId:r.runId,results:r.expectedResults,directory:path.join(m.proofRoot,r.directory)}))};
validateClosure(confirmation,finished,status,hash);positive++;
for(const [which,key,value]of [['c','writersClosed',false],['c','cleanupClosed',false],['c','cliExitCode',1],['c','executionManifestSha256','b'.repeat(64)],['f','wrapperStatus',{code:0,signal:'SIGTERM'}],['f','cleanupErrors',['x']],['f','volumesPreserved',false],['s','totalResults',48],['s','completedAtMs',0]]){const c=structuredClone(confirmation),f=structuredClone(finished),s=structuredClone(status);({c,f,s})[which][key]=value;assert.throws(()=>validateClosure(c,f,s,hash));negative++;}
const identity={fixtureSha256:hash,broker:'synthetic',classpath:'synthetic',compiledHashes:{c:hash},sourceHashes:{s:hash},runnerHashes:{r:hash}},plan={schema:'financial-e3-plan-v1',prefix:'synthetic',...identity},result={prefix:'synthetic',results:[{name:'activation-quartet',topic:'synthetic-activation-quartet',before:{pass:true},after:{pass:true},idle:{pass:true}}]};
validateArm('activation',1,plan,result,identity);positive++;
for(const key of ['fixtureSha256','broker','classpath','compiledHashes','sourceHashes','runnerHashes']){const p=structuredClone(plan);p[key]='wrong';assert.throws(()=>validateArm('activation',1,p,result,identity));negative++;}
for(const key of ['before','after','idle']){const r=structuredClone(result);r.results[0][key].pass=false;assert.throws(()=>validateArm('activation',1,plan,r,identity));negative++;}
const original='/synthetic/original',packaged='/synthetic/package',source={path:original+'/big.log',relativePath:'big.log',sizeBytes:9*1024**2,sha256:hash},mapping={originalPath:source.path,relativePath:source.relativePath,sizeBytes:source.sizeBytes,sha256:hash,kind:'chunks',files:[4,4,1].map((n,i)=>({path:packaged+'/chunks/'+i,offset:i*4*1024**2,sizeBytes:n*1024**2,sha256:hash}))};
validateMappingShape(source,mapping,original,packaged);positive++;
for(const mutate of [x=>x.files[1].offset++,x=>x.files.pop(),x=>x.files[1].path=x.files[0].path,x=>x.files[0].path='/outside/file',x=>x.files[0].sizeBytes++,x=>x.kind='copy']){const x=structuredClone(mapping);mutate(x);assert.throws(()=>validateMappingShape(source,x,original,packaged));negative++;}
console.log(JSON.stringify({pass:true,scope:'Read-only frozen source/CP/operator identity and pure closure/arm/mapping gates; no active raw tree read',pinsChecked,positive,negative,candidateSha256:pins.candidateSha256,executionManifestSha256:pins.executionManifestSha256,actualProofValidated:false,actualLoadExecuted:false},null,2));
