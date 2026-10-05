import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createReadStream} from 'node:fs';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
const sha = value => createHash('sha256').update(value).digest('hex');
const canonical = value => Array.isArray(value) ? '['+value.map(canonical).join(',')+']' : value!==null&&typeof value==='object' ? '{'+Object.keys(value).sort().map(key=>JSON.stringify(key)+':'+canonical(value[key])).join(',')+'}' : JSON.stringify(value);
const json = async file => JSON.parse(await readFile(file,'utf8'));
async function encoded(file) {
 let depth=0,quoted=false,escape=false,raw='',bytes=0; const sources=[],results=[],sourceRawSha256=[];
 for await(const chunk of createReadStream(file,{encoding:'utf8',highWaterMark:65536})) {
  bytes+=Buffer.byteLength(chunk); assert(bytes<=150994944);
  for(const char of chunk) {
   if(depth===0&&/\s/.test(char))continue;
   raw+=char;
   if(quoted){if(escape)escape=false;else if(char==='\\')escape=true;else if(char==='"')quoted=false;}
   else if(char==='"')quoted=true;
   else if(char==='{'||char==='[')depth++;
   else if(char==='}'||char===']')depth--;
   assert(depth>=0);assert(Buffer.byteLength(raw)<=135324);
   if(depth===0){const obj=JSON.parse(raw);if(obj.records)results.push(obj);else {sources.push(obj);sourceRawSha256.push(sha(raw));}raw='';}
  }
 }
 assert(depth===0&&!quoted&&raw==='');assert.equal(sources.length,2100);assert.equal(results.length,2100);
 assert(sources.every((s,i)=>s.inputOrdinal===i));assert(results.every((r,i)=>r.inputOrdinal===i));
 return {sources,results,bytes,sourceRawSha256};
}
function initialOwner(){const o={};for(const name of ['balances','executions','obligations','workflows','instructions','attempts','exceptions','reservations','dedup','effects','versions','dueQueue','stagedInputs','policy'])o[name]={};o.logicalTick='0';for(const name of ['businessSeq','historySeq','deliveryCursor','nextDelivery'])o[name]=0;for(const name of ['continuation','lastDecisionId','semanticDigest','activePolicy'])o[name]=null;return o;}
function history(raw,measurement,config){
 const owner=initialOwner(),records=[];let chain='GENESIS';
 for(const [index,result]of raw.results.entries()){
  assert.equal(result.records.length,index===0?2:1);assert.deepEqual(result.records.at(-1).input,raw.sources[index].input);
  for(const record of result.records){
   assert.equal(record.sequence,records.length+1);assert.equal(record.priorSequence,records.length);assert.equal(record.priorChecksum,chain);
   const {checksum,...unsigned}=record;assert.equal(sha(canonical(unsigned)),checksum);
   for(const change of record.changes){
    assert(change.path.length>=1&&change.path.length<=2);const target=change.path.length===1?owner:owner[change.path[0]],key=change.path.at(-1);
    assert.deepEqual(target[key]??null,change.before,'complete delta before mismatch');
    if(change.path.length===2&&change.after===null)delete target[key];else target[key]=structuredClone(change.after);
   }
   chain=checksum;records.push(record);
  }
 }
 assert.equal(records.length,2101);assert.equal(records[0].kind,'GENESIS');assert.deepEqual(owner.policy,config.policy);
 assert.equal(sha(canonical(owner)),measurement.parity.ownerSha256);assert.equal(chain,measurement.parity.historyChecksum);
 assert.equal(Object.values(owner.obligations).filter(v=>v.status==='SETTLED').length,1000);assert.equal(Object.values(owner.obligations).filter(v=>v.status==='PENDING').length,100);
 const opening=records[0].changes.filter(c=>c.path[0]==='balances').map(c=>({path:c.path,after:c.after}));
 assert.equal(opening.find(c=>c.path[1]==='buyerCash').after,'11000000000');assert.equal(opening.find(c=>c.path[1]==='sellerShares').after,'1100');
 return {owner,records,opening};
}
function frame(bytes,position){const size=bytes.readInt32BE(position);assert(size>0&&size<=4096&&position+size+36<=bytes.length);const body=bytes.subarray(position+4,position+4+size),digest=sha(body);assert.equal(bytes.subarray(position+4+size,position+size+36).toString('hex'),digest);return {node:JSON.parse(body),end:position+size+36,digest};}
async function journal(root,raw,measurement){
 const dir=path.join(root,'journal'),[data,index,pub,witness,scope]=await Promise.all(['members.bin','ordinal-index.bin','publications.bin','publication-witness.bin','scope.json'].map(n=>readFile(path.join(dir,n))));
 const header=JSON.parse(scope);assert.equal(header.scopeSha256,sha(JSON.stringify(header.scope)));assert.equal(header.scope.topicUuid,measurement.sourceTopicUuid);
 assert.deepEqual(pub,witness);assert.equal(index.length,2100*16);let count=0,pp=0,dp=0,dc='GENESIS',pc='GENESIS',offset=-1,batches=0;const members=[];
 while(pp<pub.length){batches++;const p=frame(pub,pp),m=p.node;assert.equal(m.firstOrdinal,count);assert.equal(m.priorSha256,pc);assert.equal(m.scopeSha256,header.scopeSha256);assert(m.publishedCount>count&&m.publishedCount-count<=256);
  while(count<m.publishedCount){assert.equal(Number(index.readBigInt64BE(count*16)),dp);assert.equal(Number(index.readBigInt64BE(count*16+8)),pp);const f=frame(data,dp),n=f.node;assert.equal(n.ordinal,count);assert.equal(n.priorSha256,dc);assert(n.offset>offset);assert.equal(n.topicUuid,measurement.sourceTopicUuid);const payload=Buffer.from(n.payloadBase64,'base64');assert.equal(sha(payload),n.payloadSha256);assert.equal(payload.length,n.bytes);assert.deepEqual(JSON.parse(payload),raw.sources[count]);assert.equal(raw.results[count].inputOffset,n.offset);members.push(n);count++;dp=f.end;dc=f.digest;offset=n.offset;}
  assert.equal(m.dataEnd,dp);assert.equal(m.indexEnd,count*16);assert.equal(m.lastPhysicalOffset,offset);assert.equal(m.dataSha256,dc);pp=p.end;pc=p.digest;
 }
 assert.equal(count,2100);assert.equal(dp,data.length);assert.equal(measurement.managedRecovery.activation.offset,offset);
 assert.equal(sha(data),measurement.ackJournal.dataSha256);assert.equal(sha(pub),measurement.ackJournal.publicationSha256);assert.equal(sha(witness),measurement.ackJournal.publicationWitnessSha256);
 return {members:count,publicationBatches:batches,lastOffset:offset};
}
export async function inspectRaw(root){const proof=path.join(root,'proof'),measurement=await json(path.join(proof,'bootstrap.json')),config=await json(path.join(root,'frozen/config.json')),raw=await encoded(path.join(proof,'encoded-records.bin')),h=history(raw,measurement,config),j=await journal(root,raw,measurement);assert.equal(raw.bytes,measurement.encodedBytes);return {measurement,config,raw,h,j};}
export async function pairRaw(baselineRoot,compactRoot){const [a,b]=await Promise.all([inspectRaw(baselineRoot),inspectRaw(compactRoot)]);assert.deepEqual(a.raw.sources,b.raw.sources,'exact complete financial source envelopes changed');assert.deepEqual(a.raw.sourceRawSha256,b.raw.sourceRawSha256,'exact source envelope bytes changed');assert.deepEqual(a.h.records,b.h.records,'exact full history changed');assert.deepEqual(a.h.opening,b.h.opening);assert.deepEqual(a.config.policy,b.config.policy);assert.deepEqual(a.h.owner,b.h.owner);return {schema:'independent-actual-raw-owner-history-pair-v1',pass:true,sourceEnvelopes:2100,historyRecords:2101,settled:1000,pending:100,openingCashNanos:'11000000000',openingShares:'1100',ownerSha256:a.measurement.parity.ownerSha256,historyChecksum:a.measurement.parity.historyChecksum,baselineJournal:a.j,compactJournal:b.j,normalization:'none; exact deep equality of all source envelopes, full committed history records, opening resources, policy and reconstructed owner'};}
if(process.argv[1]===import.meta.filename){const root=path.resolve(process.argv[2]);if(process.argv[3])console.log(JSON.stringify(await pairRaw(root,path.resolve(process.argv[3])),null,2));else{const a=await inspectRaw(root);console.log(JSON.stringify({pass:true,sourceEnvelopes:a.raw.sources.length,historyRecords:a.h.records.length,ownerSha256:a.measurement.parity.ownerSha256,journal:a.j},null,2));}}
