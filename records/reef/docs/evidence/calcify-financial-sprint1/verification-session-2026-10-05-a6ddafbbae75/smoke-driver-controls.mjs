import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {runInNewContext} from 'node:vm';
import {validateInspection} from '../../scripts/dev/calcify-financial/lib/external-faults.mjs';

async function smoke(starting){
 const ids=['1','2','3'].map(v=>v.repeat(64)),project='reef-calcify-smoke-control';
 const resources=ids.map((id,i)=>({id,imageId:'sha256:'+'a'.repeat(64),labels:{'com.docker.compose.project':project,'com.docker.compose.service':'rp'+i,'reef.test':'calcify-financial-sprint1'},volumes:[{name:'smoke-'+i,destination:'/var/lib/redpanda/data'}]}));
 const fault={composeProject:project,containers:ids,targetContainer:ids[0],resources,phaseProtocol:{schema:'calcify-broker-fault-phase-v1',runId:'smoke-control',maxCycles:1,recoveryTimeoutMs:30000,stopTimeoutMs:30000,directory:'/tmp/smoke-control/broker-fault',clock:{platform:'darwin',node:'22.22.1',uv:'1.51.0'}}};
 const rows=resources.map(c=>({Id:c.id,Image:c.imageId,Config:{Labels:c.labels},Mounts:c.volumes.map(v=>({Type:'volume',Name:v.name,Destination:v.destination})),RestartCount:0,State:{Running:true,Status:'running',Paused:false,Restarting:false,Dead:false,StartedAt:'2026-10-05T01:00:00Z',Health:{Status:'healthy',Log:[]}}}));
 const generations=Object.fromEntries(rows.map(r=>[r.Id,{startedAt:r.State.StartedAt,restartCount:0}]));
 let seq=0,result,started=false,inspects=0;
 const client={request:async action=>({action,seq:++seq,authorized:true,grantedAtMs:10000,recoveryDeadlineMs:40000,generations})};
 const fakeRun=async(_,args)=>{
  const state=rows[0].State;
  if(args[0]==='stop')Object.assign(state,{Running:false,Status:'exited'});
  if(args[0]==='start'){started=true;Object.assign(state,{Running:true,Status:'running',StartedAt:'2026-10-05T02:00:00Z',Health:{Status:starting?'starting':'healthy',Log:[{Start:'2026-10-05T02:00:03Z',End:'2026-10-05T02:00:04Z',ExitCode:0}]}});}
  if(args[0]==='inspect'&&started&&++inspects>1)state.Health.Status='healthy';
  return {stdout:args[0]==='inspect'?JSON.stringify(rows):'',stderr:''};
 };
 const source=await readFile(resolve(import.meta.dirname,'fault_smoke.mjs'),'utf8');
 const body=source.split('\n').filter(line=>!line.startsWith('import ')).join('\n');
 await runInNewContext('(async()=>{'+body+'})()',{
  assert,readFile:async()=>JSON.stringify({externalBrokerFault:fault}),appendFile:async()=>{},writeFile:async(_,text)=>{result=JSON.parse(text);},resolve,
  process:{env:{CALCIFY_FINANCIAL_PREFLIGHT:'injected'},argv:['node','fault_smoke.mjs','--fault-phase-directory',fault.phaseProtocol.directory]},
  promisify:()=>fakeRun,execFile:{},createPhaseClient:()=>client,validateInspection:(reg,observed,opts)=>validateInspection(reg,observed,{...opts,now:10000}),hostMonotonicMs:()=>10000,Date,JSON,setTimeout,console:{log:()=>{}}
 });
 return {result,seq};
}
test('actual smoke body refuses unobserved starting instead of publishing success',async()=>{
 await assert.rejects(smoke(false),/starting.*unobserved/);
});
test('actual smoke body accepts observed starting followed by new-generation healthy recovery',async()=>{
 const {result,seq}=await smoke(true);assert.equal(result.ok,true);assert.equal(result.startingSeen,true);assert.equal(seq,4);
});
