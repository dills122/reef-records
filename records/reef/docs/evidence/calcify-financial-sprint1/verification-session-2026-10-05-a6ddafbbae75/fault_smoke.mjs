import assert from 'node:assert/strict';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {readFile,appendFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createPhaseClient,validateInspection,hostMonotonicMs} from '../../scripts/dev/calcify-financial/lib/external-faults.mjs';

const profile=JSON.parse(await readFile(process.env.CALCIFY_FINANCIAL_PREFLIGHT,'utf8'));
const fault=profile.externalBrokerFault;
assert.equal(process.argv[2],'--fault-phase-directory');
assert.equal(process.argv[3],fault.phaseProtocol.directory);
const out=resolve(fault.phaseProtocol.directory,'..'),run=promisify(execFile);
const client=createPhaseClient(fault);
async function docker(args){
 const receipt={args,startedUtc:new Date().toISOString(),startedMonotonicMs:hostMonotonicMs()};
 try{const r=await run('/usr/local/bin/docker',args,{timeout:10000,maxBuffer:1024*1024});receipt.stdout=r.stdout;receipt.stderr=r.stderr;receipt.code=0;return r.stdout;}
 catch(e){receipt.stdout=e.stdout;receipt.stderr=e.stderr;receipt.code=e.code;receipt.error=String(e);throw e;}
 finally{receipt.finishedUtc=new Date().toISOString();receipt.finishedMonotonicMs=hostMonotonicMs();await appendFile(resolve(out,'fault-smoke-attempts.jsonl'),JSON.stringify(receipt)+'\n');}
}
const inspect=async()=>JSON.parse(await docker(['inspect',...fault.containers]));
const initial=await inspect();validateInspection(fault,initial);
const generations=Object.fromEntries(initial.map(r=>[r.Id,{startedAt:r.State.StartedAt,restartCount:r.RestartCount}]));
await client.request('stop');
await docker(['stop','--time','5',fault.targetContainer]);
validateInspection(fault,await inspect(),{targetStopped:true,generations});
await client.request('stopped');
const startGrant=await client.request('start');
await docker(['start',fault.targetContainer]);
let targetGeneration=null,recovered=false,startingSeen=false;
while(hostMonotonicMs()<startGrant.recoveryDeadlineMs){
 const rows=await inspect();
 const observation=validateInspection(fault,rows,{generations,recoveryGrant:{...startGrant,generations},allowTargetStarting:true});
 const target=rows.find(r=>r.Id===fault.targetContainer);
 if(targetGeneration===null)targetGeneration=target.State.StartedAt;
 assert.equal(target.State.StartedAt,targetGeneration,'second target generation');
 startingSeen ||= target.State.Health.Status==='starting';
 if(observation.targetHealthy){recovered=true;break;}
 await new Promise(r=>setTimeout(r,100));
}
assert.ok(recovered,'fixed recovery deadline missed');
assert.ok(startingSeen,'starting transition unobserved; smoke acceptance incomplete');
await client.request('recovered');
const result={ok:true,startingSeen,startGrant,targetGeneration,elapsedFromGrantMs:hostMonotonicMs()-startGrant.grantedAtMs,scope:'Exact-owned single STOP/starting/healthy cycle and resource guard only; no financial workload or oracle claim'};
await writeFile(resolve(out,'fault-smoke-result.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result));
