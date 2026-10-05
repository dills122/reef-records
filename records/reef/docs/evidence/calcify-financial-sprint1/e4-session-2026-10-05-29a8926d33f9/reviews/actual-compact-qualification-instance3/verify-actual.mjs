import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {validateBootstrapResult,verifyBootstrapEvidence} from '../../../../scripts/dev/calcify-financial/bootstrap-calibration.mjs';
import {validatePreflight,validateSample} from '../../../../scripts/dev/calcify-financial/proof-supervisor.mjs';
const s=path.resolve('.planning/calcify-e4-session-2026-10-05'),proof=path.join(s,'bootstrap-compact1/proof'),frozen=path.join(s,'bootstrap-compact1/frozen'),j=async p=>JSON.parse(await readFile(p)),sha=b=>createHash('sha256').update(b).digest('hex');
const request=await j(path.join(frozen,'bootstrap-request.json')),m=await j(path.join(proof,'bootstrap.json'));
await verifyBootstrapEvidence(request,path.join(frozen,'bootstrap-request.json'),path.join(frozen,'config.json'));
const assessment=await validateBootstrapResult(request,m,proof);assert.deepEqual(await j(path.join(proof,'assessment.json')),assessment);
const config=await j(path.join(frozen,'config.json')),closure=await j(path.join(s,'bootstrap-preparation-compact1/bootstrap-successful-closure.json'));
for(const[k,v]of Object.entries(closure))if(k.endsWith('Path')&&closure[k.slice(0,-4)+'Sha256'])assert.equal(sha(await readFile(v)),closure[k.slice(0,-4)+'Sha256']);
const inspection=await j(closure.cleanupInspectionPath),receipt=await j(path.join(s,'bootstrap-preparation-compact1/bootstrap-cleanup-inspect.command.json'));
assert.equal(receipt.code,0);assert.equal(receipt.stdout,await readFile(closure.cleanupInspectionPath,'utf8'));assert.equal(inspection.length,3);
for(const c of config.registeredResources.containers){const a=inspection.find(a=>a.Id===c.id);assert(a&&a.State.Status==='exited'&&a.State.Running===false&&a.RestartCount===0);assert.equal(a.Image,c.imageId);for(const[k,v]of Object.entries(c.labels))assert.equal(a.Config.Labels[k],v);for(const v of c.volumes)assert(a.Mounts.some(m=>m.Name===v.name&&m.Destination===v.destination));}
const process=await j(path.join(proof,'process.json')),finished=await j(path.join(proof,'supervision/supervisor-finished.json'));
assert.deepEqual(process,finished);assert(process.ok&&process.error===null&&process.wrapperStatus.code===0&&process.cleanupErrors.length===0&&process.volumesPreserved);
const preflight=validatePreflight(await j(path.join(proof,'supervision/supervisor-preflight.json'))),rows=(await readFile(path.join(proof,'supervision/resource-samples.jsonl'),'utf8')).trim().split('\n').map(JSON.parse),samples=rows.filter(r=>r.sampledAtMs!==undefined);
assert.equal(rows.at(-1).result,'PROOF_READY');assert.equal(rows.at(-1).ok,true);assert.equal(samples.length,rows.length-1);
for(let i=0;i<samples.length;i++){validateSample(preflight,samples[i],samples[i].sampledAtMs);assert(samples[i].containers.every(c=>c.allocationMode==='measured'&&c.running&&c.healthy&&Number.isSafeInteger(c.measuredAllocatedBytes)));assert(samples[i].hostLocalAllocations.length===3);if(i)assert(samples[i].sampledAtMs-samples[i-1].sampledAtMs<=5000);}
assert.deepEqual(samples.at(-1),{...process.finalSample,utc:samples.at(-1).utc});
const child=await j(path.join(proof,'managed-recovery/result.json'));assert.equal(child.processId,83139);assert.equal(m.processId,82795);assert.equal(child.activation.ordinal,2099);assert.equal(child.activation.offset,2099);assert.equal(child.recoveredMembers,2100);assert.equal(child.controllerAdmissionsReplayed,0);
const baseline=await j(path.join(s,'bootstrap-attempt3/proof/bootstrap.json'));
const out={pass:true,status:assessment.status,sourceActions:m.sourceActions,historyRecords:m.historyRecords,parentPid:m.processId,childPid:child.processId,activationOrdinal:child.activation.ordinal,activationOffset:child.activation.offset,resultReplay:m.resultOnlyReplay,encodedBytes:m.encodedBytes,physicalStages:m.physicalCheckpoints.map(c=>c.stage),supervisionJournalRows:rows.length,fullyActualAll3Samples:samples.length,cleanupPinnedStoppedBrokers:3,parentHeapPeakBytes:m.heapObservation.heapPeakBytes,childHeapPeakBytes:child.heapObservation.heapPeakBytes,baselineParentHeapPeakBytes:baseline.heapObservation.heapPeakBytes,baselineChildHeapPeakBytes:baseline.managedRecovery.heapObservation.heapPeakBytes};
console.log(JSON.stringify(out,null,2));await writeFile(path.join(s,'reviews/actual-compact-qualification-instance3/actual-result-closure-check.json'),JSON.stringify(out,null,2)+'\n');
