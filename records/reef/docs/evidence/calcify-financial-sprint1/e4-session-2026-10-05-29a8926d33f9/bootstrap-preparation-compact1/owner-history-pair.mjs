// Pure comparison only; root must first validate each actual closed run with product gates.
import assert from 'node:assert/strict';
const hash=v=>typeof v==='string'&&/^[a-f0-9]{64}$/.test(v);
export function assertOwnerHistoryPair({baseline,compact}){
 for(const arm of [baseline,compact]){
  const m=arm.measurement,c=arm.config;
  assert(m?.schema==='financial-bootstrap-calibration-v1'&&m.purpose==='EMPIRICAL_BOUNDED_DIAGNOSTIC'&&m.capacityQualification===false&&m.heapConservativeBound===false);
  assert.deepEqual([m.sampleTrades,m.pendingSample,m.agedIdentities,m.sourceActions,m.historyRecords],[1000,100,0,2100,2101],'actual fixed1000/100 cohort required');
  assert(['offered','callbackSuccess','admitted','decided','settled'].every(k=>m.final?.[k]===1000)&&m.final.pending===0,'complete timed cohort required');
  assert(hash(m.fixtureSha256)&&hash(m.candidateSha256)&&hash(m.bootstrapSha256)&&hash(m.parity?.ownerSha256)&&hash(m.parity?.historyChecksum));
  assert(m.parity.historyRecords===2101&&m.parity.sourceUuid===m.sourceTopicUuid&&m.parity.readCommitted===true&&m.parity.independentCompleteDeltas===true);
  assert(m.managedRestartVerified===true&&m.resultOnlyReplayVerified===true);
  for(const p of [m.managedRecovery?.activation,m.resultOnlyReplay])assert(p?.ownerSha256===m.parity.ownerSha256&&p.historyChecksum===m.parity.historyChecksum,'per-arm recovered owner/history parity required');
  assert(c.registeredResources.containers.length===3&&new Set(c.registeredResources.containers.map(r=>r.id)).size===3);
 }
 const a=baseline.measurement,b=compact.measurement;
 assert.equal(baseline.config.registeredResources.project,'reef-calcify-e4-attempt3-8c6f');assert.equal(compact.config.registeredResources.project,'reef-calcify-e4-compact1-8c6f');
 assert(baseline.config.registeredResources.containers.every(a=>compact.config.registeredResources.containers.every(b=>a.id!==b.id)),'distinct fresh three-broker rigs required');
 assert.notEqual(a.sourceTopicUuid,b.sourceTopicUuid,'independent source topic identities required');assert.notEqual(a.bootstrapSha256,b.bootstrapSha256);assert.notEqual(a.candidateSha256,b.candidateSha256,'owner-change candidate must differ');
 assert.equal(a.fixtureSha256,b.fixtureSha256,'same exact fixture required');assert.equal(a.sourceHead,b.sourceHead,'same source baseline required');assert.deepEqual(baseline.config.policy,compact.config.policy,'same business policy required');
 assert.equal(a.parity.ownerSha256,b.parity.ownerSha256,'exact paired canonical owner mismatch');assert.equal(a.parity.historyChecksum,b.parity.historyChecksum,'exact paired complete history mismatch');
 return {schema:'calcify-bounded-owner-history-pair-v1',sampleTrades:1000,pendingSample:100,agedIdentities:0,sourceActions:2100,historyRecords:2101,ownerSha256:a.parity.ownerSha256,historyChecksum:a.parity.historyChecksum,baselineProject:baseline.config.registeredResources.project,compactProject:compact.config.registeredResources.project,scope:'Pure owner/history comparison after independently validated actual closed runs; no capacity/native/RSS/retained-heap-upper-bound or raw-closure validation by this helper'};
}
