import assert from 'node:assert/strict';
import {readFile,writeFile,open} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
const proof=path.resolve(process.argv[2]),measured=JSON.parse(await readFile(path.join(proof,'bootstrap.json'))),out=path.resolve(import.meta.dirname);
const canonical=v=>v===null||typeof v!=='object'?JSON.stringify(v):Array.isArray(v)?`[${v.map(canonical).join(',')}]`:`{${Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')}}`;
const sha=b=>createHash('sha256').update(b).digest('hex');
const owner=Object.fromEntries(['balances','executions','obligations','workflows','instructions','attempts','exceptions','reservations','dedup','effects','versions','dueQueue','stagedInputs','policy'].map(k=>[k,{}]));
Object.assign(owner,{logicalTick:'0',businessSeq:0,historySeq:0,deliveryCursor:0,nextDelivery:0,continuation:null,lastDecisionId:null,semanticDigest:null,activePolicy:null});
let inputCount=0,resultCount=0,inputBytes=0,resultBytes=0,history=0,chain='GENESIS',genesis=0;const inputs=new Map();
function record(raw){const bytes=Buffer.byteLength(raw);assert(bytes<=135324);const value=JSON.parse(raw);
 if(!value.records){assert(bytes<=1024);assert.equal(value.inputOrdinal,inputCount++);assert.equal(value.mode,'EXECUTE');assert.equal(value.domain,'hot');inputs.set(value.inputOrdinal,value.input);inputBytes+=bytes;return;}
 assert.equal(value.inputOrdinal,resultCount++);assert(inputs.has(value.inputOrdinal));assert.deepEqual(value.records.at(-1).input,inputs.get(value.inputOrdinal));inputs.delete(value.inputOrdinal);assert.equal(value.records.length,value.inputOrdinal===0?2:1);resultBytes+=bytes;
 for(const r of value.records){assert.equal(r.sequence,history+1);assert.equal(r.priorSequence,history);assert.equal(r.priorChecksum,chain);if(r.kind==='GENESIS')genesis++;else assert.equal(r.kind,'BUSINESS');
  const {checksum,...unsigned}=r;assert.equal(sha(canonical(unsigned)),checksum);assert(Array.isArray(r.changes)&&r.changes.length<=64);const seen=new Set();
  for(const c of r.changes){assert(Array.isArray(c.path)&&[1,2].includes(c.path.length));const k=JSON.stringify(c.path);assert(!seen.has(k));seen.add(k);const parent=c.path.length===1?owner:owner[c.path[0]],key=c.path.at(-1);assert(parent&&typeof parent==='object');assert.deepEqual(parent[key]??null,c.before);if(c.after===null&&c.path.length===2)delete parent[key];else parent[key]=c.after;}
  for(const legs of Object.values(r.journalGroups)){let sum=0n;for(const leg of legs)sum+=BigInt(leg.amount);assert.equal(sum,0n);}
  history++;chain=checksum;
 }
}
// Bounded concatenated-JSON scanner. Retains one record; reads64KiB chunks.
const fd=await open(path.join(proof,measured.realRecordEvidencePath),'r'),buffer=Buffer.alloc(65536),hash=createHash('sha256');let fileOffset=0,recordBytes=[],recordSize=0,depth=0,string=false,escape=false;
try{for(;;){const {bytesRead}=await fd.read(buffer,0,buffer.length,fileOffset);if(!bytesRead)break;fileOffset+=bytesRead;const chunk=buffer.subarray(0,bytesRead);hash.update(chunk);let start=0;
 for(let i=0;i<chunk.length;i++){const b=chunk[i];if(string){if(escape)escape=false;else if(b===92)escape=true;else if(b===34)string=false;}else if(b===34)string=true;else if(b===123||b===91)depth++;else if(b===125||b===93)depth--;
  assert(depth>=0);if(depth===0){const piece=chunk.subarray(start,i+1);recordBytes.push(Buffer.from(piece));recordSize+=piece.length;assert(recordSize<=135324);record(Buffer.concat(recordBytes,recordSize).toString());recordBytes=[];recordSize=0;start=i+1;}}
 if(start<chunk.length){const piece=chunk.subarray(start);recordBytes.push(Buffer.from(piece));recordSize+=piece.length;assert(recordSize<=135324);}}
}finally{await fd.close();}
assert.equal(recordSize,0);assert.equal(depth,0);assert(!string);assert.equal(hash.digest('hex'),measured.realRecordEvidenceSha256);assert.equal(fileOffset,measured.encodedBytes);assert.equal(inputBytes,measured.encodedInputBytes);assert.equal(resultBytes,measured.encodedResultBytes);
assert.equal(inputCount,2100);assert.equal(resultCount,2100);assert.equal(history,2101);assert.equal(genesis,1);assert.equal(inputs.size,0);assert.equal(chain,measured.parity.historyChecksum);assert.equal(sha(canonical(owner)),measured.parity.ownerSha256);
const obligations=Object.values(owner.obligations);assert.equal(obligations.filter(o=>o.status==='SETTLED').length,1000);assert.equal(obligations.filter(o=>o.status==='PENDING').length,100);
const receipt={schema:'independent-encoded-delta-check-v1',reviewInstance:'2of3',bytes:fileOffset,inputBytes,resultBytes,inputs:inputCount,results:resultCount,historyRecords:history,genesisRecords:genesis,historyChecksum:chain,ownerSha256:sha(canonical(owner)),settled:1000,pending:100,completeBeforeAfterDeltaChain:true,eachJournalGroupBalanced:true,pass:true};
await writeFile(path.join(out,'encoded-check.json'),JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(receipt));
