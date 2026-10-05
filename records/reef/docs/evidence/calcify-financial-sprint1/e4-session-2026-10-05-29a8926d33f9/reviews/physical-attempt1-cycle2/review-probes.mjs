import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtemp, symlink } from 'node:fs/promises';
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
  const s={schema:'calcify-replica-inventory-v1',runId:m.runId,provenance:m.provenance,window:{startedAtMs:1000,completedAtMs:1001,clockScope:'host-monotonic-ms'},
    topics:m.topics.map(({name,topicId,partitions})=>({name,topicId,partitions})),
    replicas:[0,1,2].map(brokerId=>({brokerId,topic:'exact-owned-topic',topicId:uuid,partition:0,logDir:'/var/lib/redpanda/data',sizeBytes:123,unit:'bytes',error:null})),
    rawReceipts:[]};
  const topicRaw={schema:'calcify-admin-topics-raw-v1',request:{topics:m.topics.map(t=>t.name)},response:{topics:s.topics.map(t=>({...t,error:null}))}};
  const logRaw={schema:'calcify-admin-log-dirs-raw-v1',request:{brokerIds:m.registeredResources.containers.map(c=>c.brokerId)},response:{brokers:[0,1,2].map(brokerId=>({brokerId,
    logDirs:[{logDir:'/var/lib/redpanda/data',error:null,replicas:[{topic:'exact-owned-topic',partition:0,sizeBytes:123,isFuture:false}]}]}))}};
  s.rawReceipts=[['describeTopics',topicRaw],['describeLogDirs',logRaw]].map(([operation,payload])=>{const rawJSON=JSON.stringify(payload);return {operation,startedAtMs:1000,completedAtMs:1001,rawJSON,bytesSha256:hash(rawJSON)};});
  return s;
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


const m=manifest(),d=deps(m);d.metadataSnapshot=async()=>{const s=metadata(m);s.replicas.forEach(r=>r.sizeBytes=999);return s;};
await assert.rejects(collectPhysicalEvidence(m,d),/RAW_REPLICA_BINDING/);
const mapped=manifest();mapped.categoryMappings=[{brokerId:0,category:'source',path:'/var/lib/redpanda/data/unrelated',evidence:'trust me',evidenceSha256:hash('trust me'),replicas:[{topic:'exact-owned-topic',topicId:uuid,partition:0}]}];
assert.throws(()=>freezePhysicalManifest(mapped),/CATEGORY_MAPPING_UNSUPPORTED/);
const omitted=manifest();omitted.localResources=[];const empty=await sample(omitted);
for(const c of ['localStore','controllerJournal','proof'])assert.equal(empty.localCategoryAllocatedBytes[c].status,'unknown');
const t=await sample();t.telemetry.rss={status:'measured',bytes:100};assert.throws(()=>validatePhysicalEvidence(manifest(),t,1002),/TELEMETRY/);
console.log('Four cycle1 P2 reproductions closed');
for(const mutate of [raw=>raw.response.brokers[2].logDirs[0].replicas=[],raw=>raw.response.brokers[2].logDirs[0].replicas[0].error='API_FAILURE',raw=>raw.response.brokers[2].logDirs.push(structuredClone(raw.response.brokers[2].logDirs[0]))]){
 const m=manifest(),d=deps(m);d.metadataSnapshot=async()=>{const s=metadata(m),r=s.rawReceipts[1],raw=JSON.parse(r.rawJSON);mutate(raw);r.rawJSON=JSON.stringify(raw);r.bytesSha256=hash(r.rawJSON);return s;};await assert.rejects(collectPhysicalEvidence(m,d));
}
const m2=manifest(),d2=deps(m2);d2.metadataSnapshot=async()=>{const s=metadata(m2),r=s.rawReceipts[0],raw=JSON.parse(r.rawJSON);raw.response.topics[0].error='UNKNOWN_TOPIC_ID';r.rawJSON=JSON.stringify(raw);r.bytesSha256=hash(r.rawJSON);return s;};await assert.rejects(collectPhysicalEvidence(m2,d2));
console.log('Additional rehashed raw missing-replica, replica-error, duplicate-logDir, topic-error boundaries reject');
