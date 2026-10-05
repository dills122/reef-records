import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {readFile,writeFile,appendFile,readdir,lstat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,join} from 'node:path';
import {BUDGETS} from '../../../../scripts/dev/calcify-financial/proof-supervisor.mjs';
const exec=promisify(execFile),dir=resolve(import.meta.dirname),docker='/usr/local/bin/docker';
const registry=JSON.parse(await readFile(join(dir,'registration.json'),'utf8')),profile=JSON.parse(await readFile(join(dir,'profile.json'),'utf8'));
const cs=registry.registeredResources.containers,ids=cs.map(c=>c.id),project=registry.registeredResources.project;
const now=()=>Number(process.hrtime.bigint()/1000000n),hash=s=>createHash('sha256').update(s).digest('hex');
const sleep=ms=>new Promise(r=>setTimeout(r,ms)),assert=(value,message)=>{if(!value)throw Error(message);};
const started=now(),startupDeadline=started+30000,watchDeadline=started+1200000;
let ordinal=0,firstRunningAt=null,firstGuestAt=null,lastSample=null,ready=false,finished=false,watchError=null;
const oldIds=['1335cf8f168bed8177104f47994745d4525b12ab5b014dd649adcb4e73860143','5aa6560ec9bb80fd238bdba3c2e07259854f30de76c6c82868de1e038cd2d446','733d961222e085cb98d5af55859eaeb59a2390198fa0bbcdffdf975061fcec9c'];
async function command(name,args,timeout=1500){
 const seq=++ordinal,r={seq,name,executable:docker,args,startedAtMs:now(),startedUtc:new Date().toISOString()};
 try{const out=await exec(docker,args,{timeout,maxBuffer:1048576,killSignal:'SIGKILL'});Object.assign(r,out,{exitCode:0});return r.stdout;}
 catch(error){Object.assign(r,{stdout:error.stdout??'',stderr:error.stderr??'',exitCode:error.code,error:error.message});throw error;}
 finally{Object.assign(r,{completedAtMs:now(),completedUtc:new Date().toISOString(),stdoutSha256:hash(r.stdout??''),stderrSha256:hash(r.stderr??''),inputSha256:hash(JSON.stringify({executable:docker,args}))});await writeFile(join(dir,`bootstrap-${String(seq).padStart(5,'0')}-${name}.json`),JSON.stringify(r,null,2)+'\n',{flag:'wx'});await appendFile(join(dir,'bootstrap-receipts.jsonl'),JSON.stringify(r)+'\n');}
}
function validateRows(rows){
 assert(rows.length===3&&new Set(rows.map(r=>r.Id)).size===3,'owned registry cardinality drift');
 for(const c of cs){const r=rows.find(r=>r.Id===c.id);assert(r&&r.Image===c.imageId&&Object.entries(c.labels).every(([k,v])=>r.Config?.Labels?.[k]===v),'owned ID/image/label drift');
 assert(r.Mounts.length===1&&r.Mounts[0].Type==='volume'&&r.Mounts[0].Name===c.volumes[0].name&&r.Mounts[0].Destination===c.volumes[0].destination&&r.Mounts[0].RW===true,'owned mount drift');
 assert(r.State.Paused===false&&r.State.Restarting===false&&r.State.Dead===false&&r.RestartCount===0,'owned lifecycle drift');}
 return rows;
}
async function rawBytes(path=dir){let total=0;for(const name of await readdir(path)){const child=join(path,name),stat=await lstat(child);assert(!stat.isSymbolicLink(),'proof symlink');total+=stat.isDirectory()?await rawBytes(child):stat.size;assert(Number.isSafeInteger(total)&&total<BUDGETS.rawProofBytes,'raw proof budget');}return total;}
async function sample(){
 const start=now(),rows=validateRows(JSON.parse(await command('inspect',['inspect',...ids]))),allocations=[];
 const running=rows.filter(r=>r.State.Running===true);if(running.length&&firstRunningAt===null)firstRunningAt=now();
 for(const r of rows)if(!r.State.Running)assert(!ready&&now()<=startupDeadline&&r.State.Status==='created','broker stopped after startup or startup timeout');
 for(const r of running)assert(r.State.Status==='running'&&(!ready||r.State.Health?.Status==='healthy'),'broker lifecycle/health regression');
 let free=null;
 if(running.length){
  const out=await command('guest-df',['exec',running[0].Id,'df','-Pk','/var/lib/redpanda/data']),columns=out.trim().split('\n').at(-1).trim().split(/\s+/);
  assert(columns.length===6&&/^\d+$/.test(columns[3]),'guest df unknown');free=Number(columns[3])*1024;assert(Number.isSafeInteger(free)&&free>=BUDGETS.guestFreeBytesFloor,'guest free below20GiB');
  firstGuestAt??=now();assert(firstGuestAt-firstRunningAt<=BUDGETS.sampleIntervalMs,'first guest df later than5s after observed running');
  await Promise.all(running.map(async r=>{const out=await command(`du-${r.Id.slice(0,8)}`,['exec',r.Id,'du','-sk','/var/lib/redpanda/data']);const match=/^(\d+)\s+\/var\/lib\/redpanda\/data\s*$/.exec(out);assert(match,'allocation unknown');const bytes=Number(match[1])*1024;assert(Number.isSafeInteger(bytes)&&bytes>=0,'allocation invalid');allocations.push({id:r.Id,allocatedBytes:bytes});}));
 }
 const allocated=allocations.reduce((sum,r)=>sum+r.allocatedBytes,0);assert(Number.isSafeInteger(allocated)&&allocated<BUDGETS.abortAllocatedBytes&&allocated<BUDGETS.hardAllocatedBytes,'9/10GiB broker budget');
 const proof=await rawBytes();assert(now()-start<=BUDGETS.sampleIntervalMs,'startup sample stale');
 const s={schema:'calcify-e4-bootstrap-sample-v1',sampledAtMs:start,completedAtMs:now(),clockScope:'host-monotonic-ms',utc:new Date().toISOString(),runningIds:running.map(r=>r.Id),allocations,
  allocatedBytes:running.length===3?allocated:null,partialMeasuredAllocatedBytes:allocated,guestFreeBytes:free,rawProofBytes:proof,
  unmeasuredIds:rows.filter(r=>!r.State.Running).map(r=>r.Id),startupUnknown:running.length<3||free===null,scope:'Approved setup-only startup exception<=30s; actual running du/df; not strict runtime supervisor or capacity evidence',
  healthyIds:rows.filter(r=>r.State.Health?.Status==='healthy').map(r=>r.Id)};
 await appendFile(join(dir,'bootstrap-samples.jsonl'),JSON.stringify(s)+'\n');lastSample=s;return s;
}
async function stopOwned(){validateRows(JSON.parse(await command('cleanup-inspect',['inspect',...ids])));await command('stop-owned',['stop','--time','5',...ids],20000);}
const oldBefore=JSON.parse(await command('old-before',['inspect',...oldIds]));
assert(oldBefore.every(r=>r.State.Running===false&&r.State.Status==='exited'),'old rig not exited; preserving without touch');
await sample(); // registered before mutation; unknown initial guest-free explicit
const watcher=(async()=>{try{while(!finished){const s=await sample();if(!ready&&now()>startupDeadline)throw Error('startup not ready within30s');if(lastSample&&now()-lastSample.sampledAtMs>BUDGETS.sampleIntervalMs)throw Error('observer stale');if(now()>watchDeadline)throw Error('setup watch20-minute timeout');await sleep(1000);}}catch(error){watchError=error;finished=true;await stopOwned();await writeFile(join(dir,'bootstrap-failure.json'),JSON.stringify({error:error.message,lastSample,utc:new Date().toISOString()},null,2)+'\n',{flag:'wx'});}})();
try{
 await command('start',['start',...ids],15000);
 while(lastSample?.healthyIds.length!==3){assert(!watchError,'watch failed');assert(now()<=startupDeadline,'bootstrap health deadline');await sleep(100);}
 ready=true;
 const node=cs[0].id,values={};
 for(const [key,value]of Object.entries(profile.clusterProperties)){await command(`set-${key}`,['exec',node,'rpk','cluster','config','set',key,String(value)]);
  for(const c of cs){const out=await command(`get-${key}-rp${c.brokerId}`,['exec',c.id,'rpk','cluster','config','get',key]);assert(Number(out.trim())===value,`cluster property drift${key}`);}values[key]=value;}
 const clusterInfo=await command('cluster-info',['exec',node,'rpk','cluster','info']),brokerRows=clusterInfo.split('\n').filter(line=>/^\d+\*?\s+rp\d\s+9092\s*$/.test(line.trim()));
 assert(brokerRows.length===3&&[0,1,2].every(n=>brokerRows.some(line=>new RegExp(`^${n}\\*?\\s+rp${n}\\s+9092\\s*$`).test(line.trim()))),'cluster actual broker IDs/hosts mismatch');
 const status=await command('cluster-config-status',['exec',node,'rpk','cluster','config','status']),statusRows=status.split('\n').filter(line=>/^\d+\s+\d+\s+false\s+\[\]\s+\[\]\s*$/.test(line.trim()));
 assert(statusRows.length===3&&new Set(statusRows.map(line=>line.trim().split(/\s+/)[0])).size===3,'cluster config status invalid/unknown/restart');
 const tx=Number((await command('transaction-max',['exec',node,'rpk','cluster','config','get','transaction_max_timeout_ms'])).trim());assert(Number.isSafeInteger(tx)&&tx>=120000,'transaction timeout incompatible');
 const final=await sample();assert(final.runningIds.length===3&&final.healthyIds.length===3&&!final.startupUnknown,'ready resource sample incomplete');
 const oldAfter=JSON.parse(await command('old-after',['inspect',...oldIds]));
 for(const before of oldBefore){const after=oldAfter.find(r=>r.Id===before.Id);assert(after&&after.Image===before.Image&&JSON.stringify(after.Mounts)===JSON.stringify(before.Mounts)&&JSON.stringify(after.State)===JSON.stringify(before.State)&&after.RestartCount===before.RestartCount,'prior rig drift');}
 const preflight={...registry,schema:'calcify-e4-broker-preflight-v1',state:'HEALTHY_PROFILE_READ_BACK',utc:new Date().toISOString(),clusterProperties:values,clusterInfo,clusterConfigStatus:status,transactionMaxTimeoutMs:tx,
  baselineAllocatedBytes:final.allocatedBytes,guestFreeBytes:final.guestFreeBytes,rawProofBytes:final.rawProofBytes,bootstrapException:{startupDeadlineMs:startupDeadline,firstObservedRunningAtMs:firstRunningAt,firstGuestAtMs:firstGuestAt,firstGuestDelayMs:firstGuestAt-firstRunningAt,scope:'setup-only approved initial unknown; no topics or payload workload'},
  budgets:BUDGETS,pinnedNetworkPath:join(dir,'pinned-network.compose.yml'),pinnedNetworkSha256:hash(await readFile(join(dir,'pinned-network.compose.yml'))),priorRigPreserved:true,watchHandoffPath:join(dir,'watch-handoff.json')};
 await writeFile(join(dir,'preflight.json'),JSON.stringify(preflight,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify({ready:true,preflight:join(dir,'preflight.json'),bootstrapServers:registry.bootstrapServers,baselineAllocatedBytes:final.allocatedBytes,guestFreeBytes:final.guestFreeBytes}));
 while(!finished){let handoff=null;try{handoff=JSON.parse(await readFile(join(dir,'watch-handoff.json'),'utf8'));}catch(error){if(error.code!=='ENOENT')throw error;}
  if(handoff?.accepted===true){finished=true;break;}assert(!watchError,'watch failed');await sleep(500);}
 await watcher;assert(!watchError,watchError?.message);await writeFile(join(dir,'watch-finished.json'),JSON.stringify({reason:'root accepted strict supervisor handoff',lastSample,utc:new Date().toISOString()},null,2)+'\n',{flag:'wx'});
}catch(error){finished=true;if(!watchError)await stopOwned();await watcher;await writeFile(join(dir,'bootstrap-orchestrator-failure.json'),JSON.stringify({error:error.message,lastSample,utc:new Date().toISOString()},null,2)+'\n',{flag:'wx'});throw error;}
