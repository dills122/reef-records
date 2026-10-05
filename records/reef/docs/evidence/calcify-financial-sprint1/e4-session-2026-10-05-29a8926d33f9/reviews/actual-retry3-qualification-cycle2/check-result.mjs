import assert from 'node:assert/strict';
import {readFile,writeFile,lstat,readdir} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {validateBootstrapResult} from '../../../../scripts/dev/calcify-financial/bootstrap-calibration.mjs';
const session=path.resolve('.planning/calcify-e4-session-2026-10-05'),frozen=path.join(session,'bootstrap-attempt3/frozen'),proof=path.join(session,'bootstrap-attempt3/proof');
const read=async p=>JSON.parse(await readFile(p)),sha=b=>createHash('sha256').update(b).digest('hex');
async function digest(p){const h=createHash('sha256');for await(const b of createReadStream(p))h.update(b);return h.digest('hex');}
const request=await read(path.join(frozen,'bootstrap-request.json')),m=await read(path.join(proof,'bootstrap.json')),config=await read(path.join(frozen,'config.json'));
const assessment=await validateBootstrapResult(request,m,proof);
const activation=await read(path.join(proof,'managed-recovery/activation-attempt.json')),recoveryRequest=await read(path.join(proof,'managed-recovery/request.json'));
assert.deepEqual(activation,m.managedRecovery.activation);assert.equal(activation.ownerSha256,recoveryRequest.ownerSha256);assert.equal(activation.historyChecksum,recoveryRequest.historyChecksum);assert.equal(activation.historyRecords,recoveryRequest.historyRecords);assert.equal(activation.ordinal,2099);
const parity=await read(path.join(proof,'parity.json'));assert.deepEqual(parity,m.parity);assert.equal(m.ackJournal.directory,config.ackJournalDir);
const journalHashes={};for(const [name,field]of [['members.bin','dataSha256'],['publications.bin','publicationSha256'],['publication-witness.bin','publicationWitnessSha256']]){journalHashes[name]=await digest(path.join(config.ackJournalDir,name));assert.equal(journalHashes[name],m.ackJournal[field]);}
assert.equal(journalHashes['publications.bin'],journalHashes['publication-witness.bin']);
assert.equal(m.ackJournal.publishedMembers,2100);assert.equal(m.ackJournal.recoveredMembers,0);assert.equal(m.managedRecovery.recoveredMembers,2100);
assert.equal(m.effectiveClients.schema,'financial-bootstrap-effective-clients-v1');assert.equal(m.effectiveClients.producer['buffer.memory'],4194304);assert.equal(m.effectiveClients.producer['batch.size'],65536);assert.equal(m.effectiveClients.producer['max.request.size'],262144);assert.equal(m.effectiveClients.bufferedRecordsPerPartition,16);
for(const c of [m.effectiveClients.mainConsumer,m.effectiveClients.restoreConsumer]){assert.equal(c['max.poll.records'],16);assert.equal(c['fetch.max.bytes'],524288);assert.equal(c['max.partition.fetch.bytes'],262144);assert.equal(c['isolation.level'],'read_committed');}
assert.equal(m.effectiveTopics.length,3);for(const t of m.effectiveTopics){assert.equal(t.maxMessageBytes,'262144');assert.equal(t.writeCaching,'false');}
const checkpoints=m.physicalCheckpoints.map(c=>({stage:c.stage,logicalReplicaBytes:c.artifact.logicalReplicaBytes,brokerAllocatedBytes:c.artifact.brokerAllocatedBytes,localAllocatedBytes:c.artifact.localAllocatedBytes,localCategoryAllocatedBytes:c.artifact.localCategoryAllocatedBytes,startedAtMs:c.artifact.startedAtMs,completedAtMs:c.artifact.completedAtMs}));
const receipt={schema:'independent-actual-retry3-result-check-v1',reviewInstance:'2of3',bootstrapSha256:request.bootstrapSha256,candidateSha256:request.candidateSha256,resultSha256:await digest(path.join(proof,'bootstrap.json')),final:m.final,parentProcessId:m.processId,childProcessId:m.managedRecovery.processId,activation,parity,resultOnlyReplay:m.resultOnlyReplay,ackJournal:m.ackJournal,journalHashes,heapObservation:m.heapObservation,recoveryHeapObservation:m.managedRecovery.heapObservation,physicalCheckpoints:checkpoints,assessment,pass:true};
await writeFile(path.join(import.meta.dirname,'result-check.json'),JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify({pass:true,parentProcessId:m.processId,childProcessId:m.managedRecovery.processId,historyRecords:m.historyRecords,sourceActions:m.sourceActions,ownerSha256:m.parity.ownerSha256,historyChecksum:m.parity.historyChecksum,checkpoints:checkpoints.map(c=>c.stage),resultSha256:receipt.resultSha256}));
