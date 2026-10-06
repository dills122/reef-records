import {assertSubnetUnused} from './operator-safety.mjs';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {writeFile,appendFile,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {createServer} from 'node:net';
import {resolve,join} from 'node:path';
const exec=promisify(execFile),dir=resolve(import.meta.dirname),project='reef-calcify-e4-timed2-8c6f',docker='/usr/local/bin/docker';
const image='sha256:0ceda3e98968e814705a75569063c7dc64ce74c1345681624f47bd8d6a6eb3c6';
const hash=s=>createHash('sha256').update(s).digest('hex');const rows=[];
async function command(name,args,allowError=false){
 const r={name,executable:docker,args,startedAtMs:Number(process.hrtime.bigint()/1000000n),startedUtc:new Date().toISOString()};
 try{const out=await exec(docker,args,{timeout:30000,maxBuffer:1048576});Object.assign(r,out,{exitCode:0});}
 catch(error){Object.assign(r,{stdout:error.stdout??'',stderr:error.stderr??'',exitCode:error.code,error:error.message});if(!allowError)throw error;}
 finally{Object.assign(r,{completedAtMs:Number(process.hrtime.bigint()/1000000n),completedUtc:new Date().toISOString(),stdoutSha256:hash(r.stdout??''),stderrSha256:hash(r.stderr??''),inputSha256:hash(JSON.stringify({executable:docker,args}))});
  rows.push(r);await writeFile(join(dir,`create-${String(rows.length).padStart(3,'0')}-${name}.json`),JSON.stringify(r,null,2)+'\n',{flag:'wx'});await appendFile(join(dir,'receipts.jsonl'),JSON.stringify(r)+'\n');}
 return r;
}
function assert(condition,message){if(!condition)throw Error(message);}
assert(process.argv.length===4&&process.argv[2]==='--setup-authorization','root setup authorization path required');
const authorizationPath=resolve(process.argv[3]),authorization=JSON.parse(await readFile(authorizationPath));
assert(authorization.schema==='calcify-owned-setup-authorization-v1'&&authorization.accepted===true&&authorization.baselineClosed===true&&authorization.cleanupVerified===true&&authorization.project===project,'root closed-baseline/cleanup authorization required');
assert(typeof authorization.rootClosurePath==='string'&&resolve(authorization.rootClosurePath)===authorization.rootClosurePath&&/^[a-f0-9]{64}$/.test(authorization.rootClosureSha256),'actual root closure path/hash required');
assert(hash(await readFile(authorization.rootClosurePath))===authorization.rootClosureSha256,'root closure receipt hash drift');
const oldIds=["1335cf8f168bed8177104f47994745d4525b12ab5b014dd649adcb4e73860143", "5aa6560ec9bb80fd238bdba3c2e07259854f30de76c6c82868de1e038cd2d446", "733d961222e085cb98d5af55859eaeb59a2390198fa0bbcdffdf975061fcec9c", "e35648ab23ef4ac6d37e1e82b938eb4a370150221de20942bedb393d75af39af", "2753163a664f440f59a139b1c09ddc4312edddf4145e8f8bc9217672c1742f4e", "841231db0a0bd1bde6b7a33976f43f7950753c9bbc91782c7675b97a384de81f", "05e2b09ff3d44b6e32d398b6cc20790f82b7a2cf98f25ff50e3c07d430279fce", "9a9f3e1e1fbaaa82740db449e5094b6db9457caa0732176f4a82eef0b6bc2dec", "553a483b1a11d32daf5d67a9465e591c4a4c58b61548a02a790980be8d6d7672"];
const oldRows=JSON.parse((await command('prior-nine-stopped',['inspect',...oldIds])).stdout);
assert(oldRows.length===oldIds.length&&new Set(oldRows.map(r=>r.Id)).size===oldIds.length&&oldIds.every(id=>oldRows.some(r=>r.Id===id&&!r.State.Running&&r.State.Status==='exited')),'prior exact nine brokers must all be exited');
const portRows=[];
for(const port of [42092,42192,42292]){const server=createServer();await new Promise((ok,no)=>{server.once('error',no);server.listen({host:'127.0.0.1',port,exclusive:true},ok);});await new Promise(ok=>server.close(ok));portRows.push({host:'127.0.0.1',port,availableAtUtc:new Date().toISOString()});}
await writeFile(join(dir,'create-ports.json'),JSON.stringify(portRows,null,2)+'\n',{flag:'wx'});
await command('version',['version','--format','{{json .}}']);
const inspected=JSON.parse((await command('image',['image','inspect',image])).stdout);assert(inspected.length===1&&inspected[0].Id===image,'image identity mismatch');
assert(inspected[0].RepoDigests.includes('redpandadata/redpanda@sha256:9e83cfa99278f30d0133271c26bf670cd69c94ffa6ba0b42830dd0c3bd9dcfd9'),'image repo digest missing');
const existing=await command('project-absence',['ps','-a','--filter',`label=com.docker.compose.project=${project}`,'--format','{{json .}}']);assert(existing.stdout.trim()==='','fresh project already exists');
for(let i=0;i<3;i++){const r=await command(`volume-absence-${i}`,['volume','inspect',`${project}_rp${i}-data`],true);assert(r.exitCode!==0&&/no such volume/i.test(r.stderr),'fresh volume already exists or inspection unknown');}
const args=['compose','--project-name',project,'-f',join(dir,'broker.compose.yml'),'-f',join(dir,'pinned-network.compose.yml')];
const networkIds=(await command('network-inventory',['network','ls','--format','{{.ID}}'])).stdout.trim().split(/\s+/).filter(Boolean);
assert(networkIds.length>0&&networkIds.every(id=>/^[a-f0-9]{12,64}$/.test(id)),'network inventory unknown');
const priorNetworks=JSON.parse((await command('network-existing-ipam',['network','inspect',...networkIds])).stdout);assert(priorNetworks.length===networkIds.length,'network inventory drift');assertSubnetUnused('10.254.241.0/24',priorNetworks);
await command('compose-config',[...args,'config','--format','json']);
await command('create',[...args,'create','--pull','never','--no-build','rp0','rp1','rp2']);
const names=[0,1,2].map(i=>`${project}-rp${i}-1`),containers=JSON.parse((await command('created-inspect',['inspect',...names])).stdout);
assert(containers.length===3,'created cardinality mismatch');
const registered=containers.map((r,i)=>{
 assert(r.Name===`/${names[i]}`&&r.Image===image&&r.State.Running===false&&r.State.Status==='created','created broker identity/state drift');
 assert(r.Config.Labels['com.docker.compose.project']===project&&r.Config.Labels['com.docker.compose.service']===`rp${i}`&&r.Config.Labels['reef.test']==='calcify-financial-sprint1','labels mismatch');
 assert(r.HostConfig.Memory===2147483648&&r.HostConfig.NanoCpus===1000000000,'resource cgroup drift');
 assert(r.Mounts.length===1&&r.Mounts[0].Type==='volume'&&r.Mounts[0].Name===`${project}_rp${i}-data`&&r.Mounts[0].Destination==='/var/lib/redpanda/data'&&r.Mounts[0].RW,'fresh data mount mismatch');
 return {id:r.Id,brokerId:i,name:names[i],hostKafkaEndpoint:{host:'127.0.0.1',port:42092+i*100,containerPort:`${42092+i*100}/tcp`},labels:{'com.docker.compose.project':project,'com.docker.compose.service':`rp${i}`,'reef.test':'calcify-financial-sprint1'},imageId:image,volumes:[{name:r.Mounts[0].Name,destination:r.Mounts[0].Destination}]};
});
const volumeRows=JSON.parse((await command('created-volumes',['volume','inspect',...registered.map(r=>r.volumes[0].name)])).stdout);
assert(volumeRows.length===3&&volumeRows.every(v=>v.Labels['com.docker.compose.project']===project&&v.Labels['reef.test']==='calcify-financial-sprint1'),'volume ownership drift');
const network=JSON.parse((await command('network-inspect',['network','inspect',`${project}_default`])).stdout);assert(network.length===1&&network[0].IPAM.Config.length===1&&network[0].IPAM.Config[0].Subnet==='10.254.241.0/24','explicit unused subnet daemon allocation/readback failed');
const result={schema:'calcify-e4-created-broker-registry-v1',createdUtc:new Date().toISOString(),registeredResources:{project,containers:registered,bootstrapServers:'127.0.0.1:42092,127.0.0.1:42192,127.0.0.1:42292'},bootstrapServers:'127.0.0.1:42092,127.0.0.1:42192,127.0.0.1:42292',composePath:join(dir,'broker.compose.yml'),composeSha256:hash(await readFile(join(dir,'broker.compose.yml'))),profilePath:join(dir,'profile.json'),profileSha256:hash(await readFile(join(dir,'profile.json'))),state:'CREATED_NOT_STARTED',guestFreeBytes:null};
await writeFile(join(dir,'registration.json'),JSON.stringify(result,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(result));
