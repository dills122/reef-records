import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {validatePreflight,validateSample,BUDGETS} from '../../../..//scripts/dev/calcify-financial/proof-supervisor.mjs';
const proof=path.resolve(process.argv[2]),out=path.resolve(import.meta.dirname),sha=b=>createHash('sha256').update(b).digest('hex');
const preflightRaw=await readFile(path.join(proof,'supervisor-preflight.json')),p=validatePreflight(JSON.parse(preflightRaw));
const raw=await readFile(path.join(proof,'resource-samples.jsonl')),rows=raw.toString().trim().split('\n').map(JSON.parse),samples=rows.filter(r=>r.containers);
assert(samples.length>1);let maxGap=0,maxProject=0,maxMeasuredBroker=0,maxRaw=0,minFree=Infinity,previous;
for(const s of samples){
 const checked=validateSample(p,s,s.sampledAtMs);assert.equal(s.projectAllocatedBytes,checked.projectAllocatedBytes);
 if(previous!==undefined){assert(s.sampledAtMs>=previous);maxGap=Math.max(maxGap,s.sampledAtMs-previous);}previous=s.sampledAtMs;
 maxProject=Math.max(maxProject,checked.projectAllocatedBytes);maxRaw=Math.max(maxRaw,s.rawProofBytes);minFree=Math.min(minFree,s.guestFreeBytes);
 let measured=0;for(const c of p.registeredResources.containers){const actual=s.rawInspection.find(r=>r.Id===c.id);assert.equal(actual.Image,c.imageId);assert.equal(actual.HostConfig.Memory,2147483648);assert.equal(actual.HostConfig.NanoCpus,1000000000);
  for(const v of c.volumes)assert(actual.Mounts.some(m=>m.Type==='volume'&&m.Name===v.name&&m.Destination===v.destination));
  const du=s.commands.find(r=>JSON.stringify(r.argv)===JSON.stringify(['exec',c.id,'du','-sk','/var/lib/redpanda/data']));const container=s.containers.find(r=>r.id===c.id);
  if(du){const m=/^(\d+)\s+\/var\/lib\/redpanda\/data\s*$/.exec(du.stdout);assert(m);const bytes=Number(m[1])*1024;assert.equal(container.measuredAllocatedBytes,bytes);measured+=bytes;}else assert.equal(container.running,false);
 }
 maxMeasuredBroker=Math.max(maxMeasuredBroker,measured);
}
const finishedPath=process.argv[4]?path.resolve(process.argv[4]):path.join(proof,'supervisor-finished.json');
const finishedRaw=await readFile(finishedPath),finished=JSON.parse(finishedRaw);assert.equal(finished.ok,true);assert.deepEqual(finished.cleanupErrors,[]);assert.equal(finished.wrapperStatus.code,0);assert.equal(finished.wrapperStatus.signal,null);assert.equal(rows.at(-1).result,'PROOF_READY');assert(!rows.some(r=>r.result==='PROOF_ABORT'||r.result==='REJECTED_OBSERVATION'));
assert(maxGap<=5000);assert(maxProject<BUDGETS.abortAllocatedBytes);assert(minFree>=BUDGETS.guestFreeBytesFloor);assert(maxRaw<BUDGETS.rawProofBytes);
const receipt={schema:'independent-actual-resource-check-v1',reviewInstance:'2of3',proofRoot:proof,preflightSha256:sha(preflightRaw),samplesSha256:sha(raw),finishedSha256:sha(finishedRaw),journalRows:rows.length,samples:samples.length,maxSampleGapMs:maxGap,maxProjectAllocatedBytes:maxProject,maxActuallyMeasuredBrokerBytes:maxMeasuredBroker,minGuestFreeBytes:minFree,maxRawProofBytes:maxRaw,hasHostResources:!!p.hostLocalResources,faultTargetReservationBytes:p.externalBrokerFault?.stoppedAllocatedBytesUpperBound??null,pass:true};
await writeFile(path.join(out,process.argv[3]),JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(receipt));
