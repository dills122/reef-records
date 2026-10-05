import assert from 'node:assert/strict';
import {readFile,readdir,writeFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {createHash} from 'node:crypto';
import {validatePreflight,validateSample} from '../../../../scripts/dev/calcify-financial/proof-supervisor.mjs';
const root=resolve(import.meta.dirname,'../../../..'),session=join(root,'.planning/calcify-session-2026-10-04');
const json=async p=>JSON.parse(await readFile(p,'utf8'));
const lines=async p=>(await readFile(p,'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse);
const sha=async p=>createHash('sha256').update(await readFile(p)).digest('hex');
const attempts=await lines(join(session,'attempts/attempts.jsonl'));const report={runs:[],identity:{},rawResults:0};let baseline;
for(const name of ['recovery-smoke1','external3','activation2','core1','golden1']){
 const id='session8c6f-'+name,d=join(session,'runs',id),p=validatePreflight(await json(join(d,'supervisor-preflight.json')));
 const finish=await json(join(d,'supervisor-finished.json'));
 assert.equal(finish.ok,true);assert.deepEqual(finish.wrapperStatus,{code:0,signal:null});assert.deepEqual(finish.cleanupErrors,[]);assert.equal(finish.volumesPreserved,true);
 assert.ok(finish.finalSample.containers.every(c=>c.running&&c.healthy));
 const attempt=attempts.find(a=>a.id===id+'-supervised');assert.ok(attempt);assert.equal(attempt.code,0);assert.equal(attempt.signal,null);
 const journal=await lines(join(d,'resource-samples.jsonl')),samples=journal.filter(r=>r.sampledAtMs!==undefined&&!r.result);
 assert.ok(samples.length);let maxGap=0;for(let i=0;i<samples.length;i++){
  const r=samples[i];validateSample(p,r,r.sampledAtMs);assert.equal(r.projectAllocatedBytes,r.containers.reduce((v,c)=>v+c.allocatedBytes,0));
  if(i){let gap=r.sampledAtMs-samples[i-1].sampledAtMs;assert.ok(gap>=0&&gap<=5000);maxGap=Math.max(gap,maxGap);}
  assert.ok(r.containers.filter(c=>c.running&&c.healthy).length>=2);
  for(const c of r.containers){const inspected=r.rawInspection.find(x=>x.Id===c.id);assert.ok(inspected);assert.deepEqual(inspected.State,c.lifecycle);
   if(c.running){const receipt=r.commands.find(x=>x.argv[0]==='exec'&&x.argv[1]===c.id&&x.argv[2]==='du');assert.ok(receipt);assert.equal(Number(receipt.stdout.trim().split(/\s+/)[0])*1024,c.measuredAllocatedBytes);}
  }
 }
 assert.deepEqual(journal.at(-1).wrapperStatus,{code:0,signal:null});assert.equal(journal.at(-1).result,'PROOF_READY');
 let starting=0;
 if(p.externalBrokerFault){const f=p.externalBrokerFault,acks=[];
  for(let seq=1;seq<=4;seq++){
   const req=await json(join(d,'broker-fault',`request-${seq}.json`)),ack=await json(join(d,'broker-fault',`ack-${seq}.json`));
   for(const key of Object.keys(req))assert.deepEqual(ack[key],req[key]);assert.equal(ack.authorized,true);assert.equal(ack.seq,seq);acks.push(ack);
   assert.ok(journal.some(r=>r.result==='FAULT_AUTHORIZATION'&&r.seq===seq&&r.grantedAtMs===ack.grantedAtMs));
  }
  assert.equal(acks[2].recoveryDeadlineMs-acks[2].grantedAtMs,30000);assert.ok(acks[3].grantedAtMs<acks[2].recoveryDeadlineMs);
  assert.notEqual(acks[3].targetGeneration,acks[2].generations[f.targetContainer].startedAt);
  for(const r of samples){let t=r.containers.find(c=>c.id===f.targetContainer);assert.equal(t.allocatedBytes,3221225472);
   if(t.lifecycle.Health?.Status==='starting'&&t.running){assert.equal(r.fault.phase,'RECOVERING');assert.ok(r.sampledAtMs<acks[2].recoveryDeadlineMs);starting++;}
   if(r.fault?.phase==='RECOVERED'){assert.equal(t.lifecycle.StartedAt,acks[3].targetGeneration);assert.ok(t.lifecycle.Health.Log.some(l=>l.ExitCode===0&&Date.parse(l.Start)>=Date.parse(t.lifecycle.StartedAt)));}
  }
  assert.equal(finish.fault.phase,'RECOVERED');assert.equal(finish.fault.seq,4);
 }
 const summary={name,samples:samples.length,maxGapMs:maxGap,starting,maxAccountedBytes:Math.max(...samples.map(r=>r.projectAllocatedBytes)),actualCliExit:attempt.code};
 if(name!=='recovery-smoke1'){
  const proof=join(d,'proof'),plan=await json(join(proof,'plan.json')),results=await json(join(proof,'results.json'));
  const signature=JSON.stringify([plan.runnerHashes,plan.sourceHashes,plan.compiledHashes,plan.fixtureSha256]);if(baseline)assert.equal(signature,baseline);else baseline=signature;
  for(const [path,hash] of Object.entries(plan.runnerHashes))assert.equal(await sha(join(root,path)),hash);
  for(const [path,hash] of Object.entries(plan.sourceHashes))assert.equal(await sha(join(root,'services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial',path)),hash);
  for(const [path,hash] of Object.entries(plan.compiledHashes))assert.equal(await sha(path),hash);
  assert.equal(await sha(join(root,'docs/evidence/calcify-financial-sprint1/fixtures.json')),plan.fixtureSha256);
  report.identity={runners:Object.keys(plan.runnerHashes).length,sources:Object.keys(plan.sourceHashes).length,compiled:Object.keys(plan.compiledHashes).length,fixture:plan.fixtureSha256};
  const raw=[];for(const file of await readdir(proof))if(file.endsWith('.stdout.log')){const rows=(await readFile(join(proof,file),'utf8')).split('\n').flatMap(l=>{try{return [JSON.parse(l)];}catch{return [];}});raw.push(...rows);}
  for(const arm of results.results){assert.equal(arm.after.pass,true);assert.equal(arm.after.readCommittedOracle,true);assert.equal(arm.after.coveredInputs,arm.after.expectedInputs);assert.ok(raw.some(r=>r.result&&JSON.stringify(r.result)===JSON.stringify(arm.after)));
   if(arm.isolated)for(const row of arm.isolated){assert.ok(raw.some(r=>JSON.stringify(r)===JSON.stringify(row)));if(row.isolatedReconstruction){assert.equal(row.isolatedReconstruction.mixedAgeRefused,true);assert.equal(row.isolatedReconstruction.missingHistoryRefused,true);assert.equal(row.isolatedReconstruction.repairFromCompleteHistory,true);}}
  }
  summary.arms=results.results.length;summary.armNames=results.results.map(a=>a.name);report.rawResults+=results.results.length;
 }
 report.runs.push(summary);
}
await writeFile(join(import.meta.dirname,'receipt-check.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
