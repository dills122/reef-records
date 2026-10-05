import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {writeFile,appendFile,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {createServer} from 'node:net';
import {resolve,join} from 'node:path';
const exec=promisify(execFile),dir=resolve(import.meta.dirname),project='reef-calcify-e4-session-8c6f',docker='/usr/local/bin/docker';
const image='sha256:0ceda3e98968e814705a75569063c7dc64ce74c1345681624f47bd8d6a6eb3c6';
const hash=s=>createHash('sha256').update(s).digest('hex');const rows=[];
async function command(name,args,allowError=false){
 const r={name,executable:docker,args,startedAtMs:Number(process.hrtime.bigint()/1000000n),startedUtc:new Date().toISOString()};
 try{const out=await exec(docker,args,{timeout:30000,maxBuffer:1048576});Object.assign(r,out,{exitCode:0});}
 catch(error){Object.assign(r,{stdout:error.stdout??'',stderr:error.stderr??'',exitCode:error.code,error:error.message});if(!allowError)throw error;}
 finally{Object.assign(r,{completedAtMs:Number(process.hrtime.bigint()/1000000n),completedUtc:new Date().toISOString(),stdoutSha256:hash(r.stdout??''),stderrSha256:hash(r.stderr??''),inputSha256:hash(JSON.stringify({executable:docker,args}))});
  rows.push(r);await writeFile(join(dir,`retry3-${String(rows.length).padStart(3,'0')}-${name}.json`),JSON.stringify(r,null,2)+'\n',{flag:'wx'});await appendFile(join(dir,'receipts.jsonl'),JSON.stringify(r)+'\n');}
 return r;
}
function assert(condition,message){if(!condition)throw Error(message);}
const portRows=[];
for(const port of [39492,39592,39692]){const server=createServer();await new Promise((ok,no)=>{server.once('error',no);server.listen({host:'127.0.0.1',port,exclusive:true},ok);});await new Promise(ok=>server.close(ok));portRows.push({host:'127.0.0.1',port,availableAtUtc:new Date().toISOString()});}
await writeFile(join(dir,'retry3-ports.json'),JSON.stringify(portRows,null,2)+'\n',{flag:'wx'});
await command('version',['version','--format','{{json .}}']);
const inspected=JSON.parse((await command('image',['image','inspect',image])).stdout);assert(inspected.length===1&&inspected[0].Id===image,'image identity mismatch');
assert(inspected[0].RepoDigests.includes('redpandadata/redpanda@sha256:9e83cfa99278f30d0133271c26bf670cd69c94ffa6ba0b42830dd0c3bd9dcfd9'),'image repo digest missing');
const existing=await command('project-absence',['ps','-a','--filter',`label=com.docker.compose.project=${project}`,'--format','{{json .}}']);assert(existing.stdout.trim()==='','fresh project already exists');
for(let i=0;i<3;i++){const r=await command(`volume-absence-${i}`,['volume','inspect',`${project}_rp${i}-data`],true);if(r.exitCode===0){const volumes=JSON.parse(r.stdout),initial=JSON.parse(await readFile(join(dir,'008-create.json'),'utf8'));assert(volumes.length===1&&volumes[0].Labels['com.docker.compose.project']===project&&volumes[0].Labels['reef.test']==='calcify-financial-sprint1'&&Date.parse(volumes[0].CreatedAt)>=Date.parse(initial.startedUtc),'preexisting volume not owned fresh failed create');const users=await command(`volume-consumer-${i}`,['ps','-a','--filter',`volume=${project}_rp${i}-data`,'--format','{{json .}}']);assert(users.stdout.trim()==='','new volume has existing consumer');}else assert(/no such volume/i.test(r.stderr),'volume inspection unknown');}
const args=['compose','--project-name',project,'-f',join(dir,'broker.compose.yml'),'-f',join(dir,'pinned-network.compose.yml')];
await command('compose-config',[...args,'config','--format','json']);
await command('create',[...args,'create','--pull','never','--no-build','rp0','rp1','rp2']);
const names=[0,1,2].map(i=>`${project}-rp${i}-1`),containers=JSON.parse((await command('created-inspect',['inspect',...names])).stdout);
assert(containers.length===3,'created cardinality mismatch');
const registered=containers.map((r,i)=>{
 assert(r.Name===`/${names[i]}`&&r.Image===image&&r.State.Running===false&&r.State.Status==='created','created broker identity/state drift');
 assert(r.Config.Labels['com.docker.compose.project']===project&&r.Config.Labels['com.docker.compose.service']===`rp${i}`&&r.Config.Labels['reef.test']==='calcify-financial-sprint1','labels mismatch');
 assert(r.HostConfig.Memory===2147483648&&r.HostConfig.NanoCpus===1000000000,'resource cgroup drift');
 assert(r.Mounts.length===1&&r.Mounts[0].Type==='volume'&&r.Mounts[0].Name===`${project}_rp${i}-data`&&r.Mounts[0].Destination==='/var/lib/redpanda/data'&&r.Mounts[0].RW,'fresh data mount mismatch');
 return {id:r.Id,brokerId:i,name:names[i],labels:{'com.docker.compose.project':project,'com.docker.compose.service':`rp${i}`,'reef.test':'calcify-financial-sprint1'},imageId:image,volumes:[{name:r.Mounts[0].Name,destination:r.Mounts[0].Destination}]};
});
const volumeRows=JSON.parse((await command('created-volumes',['volume','inspect',...registered.map(r=>r.volumes[0].name)])).stdout);
assert(volumeRows.length===3&&volumeRows.every(v=>v.Labels['com.docker.compose.project']===project&&v.Labels['reef.test']==='calcify-financial-sprint1'),'volume ownership drift');
const result={schema:'calcify-e4-created-broker-registry-v1',createdUtc:new Date().toISOString(),registeredResources:{project,containers:registered},bootstrapServers:'127.0.0.1:39492,127.0.0.1:39592,127.0.0.1:39692',composePath:join(dir,'broker.compose.yml'),composeSha256:hash(await readFile(join(dir,'broker.compose.yml'))),profilePath:join(dir,'profile.json'),profileSha256:hash(await readFile(join(dir,'profile.json'))),state:'CREATED_NOT_STARTED',guestFreeBytes:null};
await writeFile(join(dir,'registration.json'),JSON.stringify(result,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(result));
