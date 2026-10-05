import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {runInNewContext} from 'node:vm';
import {validatePreflight,superviseProof,dockerDependencies} from '../../../../scripts/dev/calcify-financial/proof-supervisor.mjs';
import {validateInspection} from '../../../../scripts/dev/calcify-financial/lib/external-faults.mjs';
const base=resolve(import.meta.dirname), GiB=1024**3,ids=['1','2','3'].map(x=>x.repeat(64));
function fixture(name){
 const output=join(base,name+'-'+process.pid),project='reef-calcify-review';
 const resources=ids.map((id,i)=>({id,imageId:'sha256:'+ 'a'.repeat(64),labels:{'com.docker.compose.project':project,'com.docker.compose.service':'rp'+i,'reef.test':'calcify-financial-sprint1'},volumes:[{name:'review-'+i,destination:'/var/lib/redpanda/data'}]}));
 const fault={composeProject:project,containers:ids,targetContainer:ids[0],resources,stoppedAllocatedBytesUpperBound:3*GiB,evidence:'Injected exclusive-writer review control',phaseProtocol:{schema:'calcify-broker-fault-phase-v1',runId:'review-adversarial',maxCycles:1,recoveryTimeoutMs:30000,stopTimeoutMs:30000,directory:join(output,'broker-fault'),clock:{platform:'darwin',node:'22.22.1',uv:'1.51.0'}}};
 const p={schema:'calcify-proof-supervisor-v1',registeredResources:{project,containers:resources},wrapper:{argv:['/usr/bin/true','--fault-phase-directory',fault.phaseProtocol.directory],cwd:base,outputDir:output,timeoutMs:60000},externalBrokerFault:fault};
 const rows=resources.map(c=>({Id:c.id,Image:c.imageId,Config:{Labels:c.labels},Mounts:c.volumes.map(v=>({Type:'volume',Name:v.name,Destination:v.destination})),RestartCount:0,State:{Running:true,Status:'running',Paused:false,Restarting:false,Dead:false,StartedAt:'2026-10-05T01:00:00.000Z',Health:{Status:'healthy',Log:[]}}}));return {p,rows};
}
// Full supervisor + real Docker adapter/final journal path, injected daemon snapshots.
const {p,rows}=fixture('final-peer-failure');let clock=10000,inspects=0;const calls=[];
const deps=dockerDependencies(validatePreflight(p),{now:()=>clock,execute:async(_,argv)=>{
 calls.push(argv);if(argv[0]==='inspect'){if(++inspects===3)rows[1].State.Health.Status='unhealthy';return {stdout:JSON.stringify(rows)};}
 if(argv.includes('du'))return {stdout:'1048576\t/var/lib/redpanda/data\n'};
 if(argv.includes('df'))return {stdout:'Filesystem 1024-blocks Used Available Capacity Mounted on\n/dev/disk 50000000 1000000 40000000 2% /var/lib/redpanda/data\n'};return {stdout:''};
}});
let groupStopped=false;deps.launch=async()=>({status:()=>({code:0,signal:null}),stop:async()=>{groupStopped=true;}});
try{
 const result=await superviseProof(p,deps);assert.equal(result.ok,false);assert.match(result.error,/healthy/);assert.equal(groupStopped,true);
 assert.equal(result.rejectedObservation.rawInspection[1].State.Health.Status,'unhealthy');
 const journal=(await readFile(join(p.wrapper.outputDir,'resource-samples.jsonl'),'utf8')).trim().split('\n').map(JSON.parse);
 assert.ok(journal.some(x=>x.result==='REJECTED_OBSERVATION'&&x.observation.rawInspection[1].State.Health.Status==='unhealthy'));
 assert.ok(journal.some(x=>x.result==='PROOF_ABORT'));assert.ok(!journal.some(x=>x.result==='PROOF_READY'));
 await assert.rejects(readFile(join(p.wrapper.outputDir,'supervisor-finished.json')),{code:'ENOENT'});
 assert.deepEqual(calls.find(x=>x[0]==='stop').slice(3),ids);
 console.log(JSON.stringify({control:'actual-adapter-final-peer-failure',ok:true,inspects,persistentRejectedInspect:true,exactIdStop:true,finishedMarker:false}));
}finally{await deps.close();}
// Actual root-owned smoke body, injected CLI/client only: immediate healthy restart.
const f=fixture('smoke-no-starting'),source=await readFile(resolve(base,'../../fault_smoke.mjs'),'utf8');
const body=source.split('\n').filter(line=>!line.startsWith('import ')).join('\n');let seq=0,stdoutResult;
const generations=Object.fromEntries(f.rows.map(r=>[r.Id,{startedAt:r.State.StartedAt,restartCount:0}]));
const client={request:async action=>{seq++;return {authorized:true,action,seq,grantedAtMs:clock,recoveryDeadlineMs:clock+30000,generations,targetGeneration:f.rows[0].State.StartedAt};}};
const fakeRun=async(_,args)=>{if(args[0]==='stop')Object.assign(f.rows[0].State,{Running:false,Status:'exited'});if(args[0]==='start')Object.assign(f.rows[0].State,{Running:true,Status:'running',StartedAt:'2026-10-05T02:00:00.000Z',Health:{Status:'healthy',Log:[{Start:'2026-10-05T02:00:03Z',End:'2026-10-05T02:00:04Z',ExitCode:0}]}});return {stdout:args[0]==='inspect'?JSON.stringify(f.rows):'',stderr:''};};
await runInNewContext('(async()=>{'+body+'})()',{
 assert,readFile:async()=>JSON.stringify({externalBrokerFault:f.p.externalBrokerFault}),appendFile:async()=>{},writeFile:async(_,text)=>{stdoutResult=JSON.parse(text);},resolve,
 process:{env:{CALCIFY_FINANCIAL_PREFLIGHT:'injected'},argv:['node','fault_smoke.mjs','--fault-phase-directory',f.p.externalBrokerFault.phaseProtocol.directory]},
 promisify:()=>fakeRun,execFile:{},createPhaseClient:()=>client,validateInspection:(reg,rows,opts)=>validateInspection(reg,rows,{...opts,now:clock}),hostMonotonicMs:()=>clock,Date,JSON,setTimeout,console:{log:()=>{}}
});
assert.equal(stdoutResult.ok,true);assert.equal(stdoutResult.startingSeen,false);assert.equal(seq,4);
console.log(JSON.stringify({control:'actual-smoke-missed-starting-observation',result:stdoutResult,scope:'Actual smoke body with injected Docker/client; does not represent real Docker recovery'}));
const malformed=fixture('missing-flag').p;malformed.wrapper.argv=['/usr/bin/true',malformed.externalBrokerFault.phaseProtocol.directory];
assert.doesNotThrow(()=>validatePreflight(malformed));console.log(JSON.stringify({control:'manifest-missing-protocol-flag',accepted:true,scope:'Input validation only; actual broker-proof CLI rejects malformed argv'}));
