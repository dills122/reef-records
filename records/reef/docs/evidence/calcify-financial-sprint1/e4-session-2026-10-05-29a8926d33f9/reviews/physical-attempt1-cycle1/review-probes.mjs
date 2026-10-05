import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, mkdir, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { freezePhysicalManifest, collectPhysicalEvidence, validatePhysicalEvidence, physicalDelta, parseAllocatedKiB } from '/Users/dsteele/.codex/worktrees/8c6f/reef/scripts/dev/calcify-financial/physical-evidence.mjs';

const hash = text => createHash('sha256').update(text).digest('hex');
const uuid = '00000000-0000-0000-0000-000000000001';
function manifest() {
  return { schema:'calcify-physical-manifest-v1', runId:'test-run',
    provenance:{sourceCommit:'a'.repeat(40),sourceSha256:{'probe.kt':hash('source')},classpathSha256:hash('classpath'),imageDigest:`sha256:${'a'.repeat(64)}`,configSha256:hash('config'),buildSha256:hash('build'),fixtureSha256:hash('fixture')},
    ownedRoot:'/tmp/owned',registeredResources:{project:'reef-calcify-session-test',containers:[0,1,2].map(n=>({brokerId:n,id:String(n+1).repeat(64),imageId:`sha256:${'a'.repeat(64)}`,
      labels:{'com.docker.compose.project':'reef-calcify-session-test','com.docker.compose.service':`rp${n}`,'reef.test':'calcify-financial-sprint1'},
      volumes:[{name:`data${n}`,destination:'/var/lib/redpanda/data'}]}))},
    topics:[{name:'exact-owned-topic',topicId:uuid,category:'source',partitions:[{partition:0,replicas:[0,1,2]}]}],
    localResources:[{id:'ack',category:'controllerJournal',path:'/tmp/owned/ack'},{id:'state',category:'localStore',path:'/tmp/owned/state'},{id:'proof',category:'proof',path:'/tmp/owned/proof'}],
    categoryMappings:[] };
}
function metadata(m=manifest()) {
  return {schema:'calcify-replica-inventory-v1',runId:m.runId,provenance:m.provenance,window:{startedAtMs:1000,completedAtMs:1001,clockScope:'host-monotonic-ms'},
    topics:m.topics.map(({name,topicId,partitions})=>({name,topicId,partitions})),
    replicas:[0,1,2].map(brokerId=>({brokerId,topic:'exact-owned-topic',topicId:uuid,partition:0,logDir:'/var/lib/redpanda/data',sizeBytes:123,unit:'bytes',error:null})),
    rawReceipts:[{operation:'describeTopics/describeLogDirs',startedAtMs:1000,completedAtMs:1001,rawJSON:'raw-api-reply',bytesSha256:hash('raw-api-reply')}]};
}
function inspection(m=manifest()) {
  return m.registeredResources.containers.map(c=>({Id:c.id,Image:c.imageId,Config:{Labels:c.labels},
    Mounts:c.volumes.map(v=>({Type:'volume',Name:v.name,Destination:v.destination,RW:true})),State:{Running:true,Status:'running',Paused:false,Restarting:false,Dead:false}}));
}
function deps(m=manifest(),override={}) {
  const calls=[];
  return {calls,now:()=>1002,verifyLocalPath:async()=>{},metadataSnapshot:async()=>metadata(m),execute:async(executable,args)=>{
    calls.push({executable,args});
    if(args[0]==='inspect')return {stdout:JSON.stringify(inspection(m)),stderr:'',exitCode:0};
    const path=args.at(-1);return {stdout:`8\t${path}\n`,stderr:'',exitCode:0};
  },...override};
}
async function sample(m=manifest()) {return collectPhysicalEvidence(m,deps(m));}


const m = manifest();
const d = deps(m);
d.metadataSnapshot = async()=>{const s=metadata(m);s.replicas.forEach(r=>r.sizeBytes=999);return s;};
const arbitrary=await collectPhysicalEvidence(m,d);
console.log(JSON.stringify({probe:'opaque raw unchanged, invented normalized replica sizes',raw:arbitrary.raw.inventory.rawReceipts[0].rawJSON,acceptedLogicalBytes:arbitrary.logicalReplicaBytes}));
const omitted=manifest();omitted.localResources=[];
const zero=await sample(omitted);
console.log(JSON.stringify({probe:'all local categories absent',accepted:zero.localCategoryAllocatedBytes,localRows:zero.allocations.filter(r=>r.kind==='local').length}));
const telemetry=await sample();telemetry.telemetry={rss:{status:'measured',bytes:100},native:{status:'measured',bytes:100},cpu:{status:'measured',percent:100}};
validatePhysicalEvidence(manifest(),telemetry,1002);
console.log(JSON.stringify({probe:'unsubstantiated measured telemetry',accepted:telemetry.telemetry}));
const mapped=manifest();mapped.categoryMappings=[0,1,2].map(brokerId=>({brokerId,category:'source',path:'/var/lib/redpanda/data/unrelated',evidence:'trust me',evidenceSha256:hash('trust me'),replicas:[{topic:'exact-owned-topic',topicId:uuid,partition:0}]}));
const result=await sample(mapped);
console.log(JSON.stringify({probe:'arbitrary category path with opaque assertion',accepted:result.categories.source}));
