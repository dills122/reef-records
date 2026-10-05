import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {validateClosure,validateArm} from '../../bootstrap-preparation-attempt2/build-inputs.mjs';
const session=path.resolve(import.meta.dirname,'../..'),raw=path.join(session,'bootstrap-attempt2/e3-current-candidate'),packaged=path.join(session,'bootstrap-attempt2/e3-packaged-candidate');
const read=async p=>JSON.parse(await readFile(p)),hash=async p=>{const h=createHash('sha256');for await(const b of createReadStream(p))h.update(b);return h.digest('hex');};
const pins=await read(path.join(session,'bootstrap-preparation-attempt2/preparation-pins.json')),cap=await read(path.join(session,'bootstrap-attempt2/frozen/capability.json')),config=await read(path.join(session,'bootstrap-attempt2/frozen/config.json'));
const confirmation=await read(path.join(session,'bootstrap-preparation-attempt2/e3-closed-confirmation-corrected1.json')),finished=await read(path.join(raw,'supervisor-finished.json')),status=await read(path.join(raw,'wrapper-status.json'));
validateClosure(confirmation,finished,status,pins.executionManifestSha256);
const fixture=cap.fixtureSha256,sourceHashes=Object.fromEntries(Object.entries(pins.sourceSha256).filter(([p])=>p.endsWith('.kt')).map(([p,h])=>[path.basename(p),h]));
const runnerHashes=Object.fromEntries(['broker-proof.mjs','lib/external-faults.mjs','proof-supervisor.mjs'].map(n=>['scripts/dev/calcify-financial/'+n,pins.sourceSha256['scripts/dev/calcify-financial/'+n]]));
const first=await read(path.join(raw,'core/plan.json'));
for(const [p,h]of Object.entries(first.compiledHashes))assert.equal(await hash(p),h,p);
const identity={fixtureSha256:fixture,sourceHashes,runnerHashes,compiledHashes:first.compiledHashes,broker:config.registeredResources.bootstrapServers,classpath:cap.classpathEntries.join(path.delimiter)},armSummary=[];
for(const [kind,count]of Object.entries({external:4,core:24,golden:20,activation:1})){
 const plan=await read(path.join(raw,kind,'plan.json')),result=await read(path.join(raw,kind,'results.json'));
 validateArm(kind,count,plan,result,identity);assert.equal(await hash(path.join(raw,kind,'results.json')),status.results.find(r=>r.directory===path.join(raw,kind)).resultsSha256);
 assert.equal(await hash(path.join(raw,kind,'results.json')),await hash(path.join(packaged,kind,'results.json')));
 for(const a of result.results){assert.equal(a.after.readCommittedOracle,true);assert.equal(a.after.coveredInputs,a.after.expectedInputs);assert.equal(a.after.initialCommittedEndOffset,a.after.finalCommittedEndOffset);assert.deepEqual(Object.keys(a.after.ownerSnapshots).sort(),['A','B']);assert(a.after.resultOffsets.every((o,i,x)=>i===0||o>x[i-1]));}
 armSummary.push({kind,count,allPass:true,readCommittedOracle:true,completeCoveredInputs:true});
}
const inspectionRaw=await readFile(confirmation.cleanupInspectionPath),inspection=JSON.parse(inspectionRaw),envelope=await read(confirmation.receiptEnvelopePath);
assert.equal(createHash('sha256').update(inspectionRaw).digest('hex'),confirmation.cleanupInspectionSha256);
assert.deepEqual(JSON.parse(envelope.stdout),inspection);
const rows=(await readFile(path.join(raw,'resource-samples.jsonl'),'utf8')).trim().split('\n').map(JSON.parse),samples=rows.filter(r=>Array.isArray(r.containers)),fully=samples.filter(r=>r.containers.length===3&&r.containers.every(c=>Number.isFinite(c.measuredAllocatedBytes)));
assert.equal(rows.length,233);assert.equal(samples.length,228);assert.equal(fully.length,225);
assert(samples.every(s=>s.projectAllocatedBytes<9*1024**3&&s.guestFreeBytes>=20*1024**3&&s.rawProofBytes<=256*1024**2));
const checked={pass:true,scope:'Actual closed current49 identity/arm/oracle declarations, cleanup raw receipt, resource samples; no capacity qualification',arms:armSummary,compiledArtifacts:Object.keys(first.compiledHashes).length,elapsedMs:status.completedAtMs-status.startedAtMs,journalRows:rows.length,sampleObservations:samples.length,fullyMeasuredSamples:fully.length,maxChargedProjectBytes:Math.max(...samples.map(s=>s.projectAllocatedBytes)),maxMeasuredBrokerSum:Math.max(...fully.map(s=>s.containers.reduce((n,c)=>n+c.measuredAllocatedBytes,0))),minGuestFreeBytes:Math.min(...samples.map(s=>s.guestFreeBytes)),maxRawProofBytes:Math.max(...samples.map(s=>s.rawProofBytes))};
console.log(JSON.stringify(checked,null,2));
