// Setup handoff extension only. Strict existing supervisor monitor; no startup grace.
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {readFile,writeFile,readdir,lstat,realpath} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,join,relative,isAbsolute} from 'node:path';
import {BUDGETS,validatePreflight,validateSample,dockerDependencies} from '../../../scripts/dev/calcify-financial/proof-supervisor.mjs';
const dir=resolve(import.meta.dirname),output=process.argv[2],exec=promisify(execFile),now=()=>Number(process.hrtime.bigint()/1000000n);
if(process.argv.length!==3||!isAbsolute(output)||!/^idle-[a-z0-9-]+$/.test(relative(dir,output))||await realpath(dir)!==dir)throw Error('exact unique broker-e4/idle-name output directory required');
const registration=JSON.parse(await readFile(join(dir,'registration.json'),'utf8'));
const p=validatePreflight({schema:'calcify-proof-supervisor-v1',registeredResources:registration.registeredResources,
 wrapper:{argv:['/usr/bin/true'],cwd:resolve(dir,'../../..'),outputDir:output,timeoutMs:1200000}});
const hash=s=>createHash('sha256').update(s).digest('hex');let ordinal=0,lastSample,timer;
async function execute(executable,argv,options){
 const seq=++ordinal,r={executable,argv,startedAtMs:now(),clockScope:'host-monotonic-ms',inputSha256:hash(JSON.stringify({executable,argv}))};
 try{const result=await exec(executable,argv,options);Object.assign(r,result,{exitCode:0});return result;}
 catch(error){Object.assign(r,{stdout:error.stdout??'',stderr:error.stderr??'',exitCode:error.code,error:error.message});throw error;}
 finally{r.completedAtMs=now();r.stdoutSha256=hash(r.stdout??'');r.stderrSha256=hash(r.stderr??'');await writeFile(join(output,`command-${String(seq).padStart(5,'0')}.json`),JSON.stringify(r,null,2)+'\n',{flag:'wx'});}
}
const deps=dockerDependencies(p,{execute}),deadline=now()+1200000;
async function bounded(operation,ms,label){let timer;try{return await Promise.race([operation(),new Promise((_,no)=>{timer=setTimeout(()=>no(Error(`${label} timed out`)),ms);})]);}finally{clearTimeout(timer);}}
async function rawBytes(path=dir){let bytes=0;for(const name of await readdir(path)){const child=join(path,name),stat=await lstat(child);if(stat.isSymbolicLink())throw Error('raw proof symlink');bytes+=stat.isDirectory()?await rawBytes(child):stat.size;if(!Number.isSafeInteger(bytes)||bytes>=BUDGETS.rawProofBytes)throw Error('raw proof256MiB reached');}return bytes;}
let interrupted=false;process.once('SIGTERM',()=>interrupted=true);process.once('SIGINT',()=>interrupted=true);
try{
 await deps.prepare(p);
 for(;;){
  if(interrupted||now()>=deadline)throw Error('strict idle watch interrupted/20-minute deadline');
  if(lastSample)validateSample(p,lastSample,now());
  const sample=await bounded(()=>deps.monitor(p),4500,'strict idle sample');sample.rawProofBytes=await bounded(()=>rawBytes(),1000,'aggregate raw proof scan');
  lastSample=validateSample(p,sample,now());await bounded(()=>deps.record({...lastSample,scope:'Strict healthy idle setup extension; existing9/10GiB/20GiB/256MiB/5s gates, no startup exception'}),1000,'idle evidence write');validateSample(p,lastSample,now());
  if(ordinal===5)await writeFile(join(output,'idle-ready.json'),JSON.stringify({ready:true,firstSample:lastSample,deadlineMs:deadline,clockScope:'host-monotonic-ms'},null,2)+'\n',{flag:'wx'});
  let accepted=false;try{accepted=JSON.parse(await readFile(join(output,'idle-handoff.json'),'utf8')).accepted===true;}catch(error){if(error.code!=='ENOENT')throw error;}
  if(accepted){await writeFile(join(output,'idle-finished.json'),JSON.stringify({reason:'root accepted next strict monitor handoff',lastSample},null,2)+'\n',{flag:'wx'});break;}
  const wait=Math.max(1,Math.min(4000,lastSample.sampledAtMs+4000-now()));await new Promise(ok=>setTimeout(ok,wait));
 }
}catch(error){await deps.stopBrokers(p);await writeFile(join(output,'idle-failure.json'),JSON.stringify({error:error.message,lastSample,utc:new Date().toISOString()},null,2)+'\n',{flag:'wx'});throw error;}
finally{await deps.close();}
