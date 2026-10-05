import datetime,hashlib,json,os,pathlib,subprocess,sys,time
root=pathlib.Path(__file__).resolve().parent
project=sys.argv[1]
if project not in {'reef-calcify-financial-session-8c6f'}:raise ValueError('unregistered project')
work=pathlib.Path.cwd();records=[]
def run(name,argv):
 start=time.monotonic()
 result=subprocess.run(argv,capture_output=True,text=True,timeout=30)
 for suffix,text in [('stdout',result.stdout),('stderr',result.stderr)]:
  (root/(name+'.'+suffix+'.log')).write_text(text)
 row={'name':name,'argv':argv,'elapsedSeconds':round(time.monotonic()-start,3),'exitCode':result.returncode};records.append(row)
 (root/'profile-attempts.json').write_text(json.dumps(records,indent=2)+'\n')
 if result.returncode:raise RuntimeError(row)
 return result.stdout
rp=project+'-rp0-1'
profile=json.loads((work/'docs/evidence/calcify-financial-sprint1/broker-profile.json').read_text())
values={}
for key,value in profile['clusterProperties'].items():
 run('set-'+key,['docker','exec',rp,'rpk','cluster','config','set',key,str(value)])
 for attempt in range(10):
  out=run('read-'+key+'-'+str(attempt),['docker','exec',rp,'rpk','cluster','config','get',key])
  if int(out.strip())==value:values[key]=int(out.strip());break
  time.sleep(0.2)
 else:raise RuntimeError('config readback mismatch '+key)
cluster=run('cluster-info',['docker','exec',rp,'rpk','cluster','info'])
status=run('cluster-config-status',['docker','exec',rp,'rpk','cluster','config','status'])
if 'false' not in status.lower():raise RuntimeError('inspect cluster config status: missing non-restart confirmation')
tx=int(run('transaction-max',['docker','exec',rp,'rpk','cluster','config','get','transaction_max_timeout_ms']).strip())
assert tx>=120000
image=json.loads(run('image',['docker','image','inspect','redpandadata/redpanda:v26.2.3','--format','{{json .RepoDigests}}']))
assert 'redpandadata/redpanda@sha256:9e83cfa99278f30d0133271c26bf670cd69c94ffa6ba0b42830dd0c3bd9dcfd9' in image
sizes=[];containers=[]
for i in range(3):
 container=project+f'-rp{i}-1';out=run(f'du-rp{i}',['docker','exec',container,'du','-sk','/var/lib/redpanda/data']);sizes.append(int(out.split()[0])*1024)
 obj=json.loads(run(f'inspect-rp{i}',['docker','inspect',container,'--format','{{json .}}']))
 assert obj['State']['Running'] and obj['State']['Health']['Status']=='healthy'
 assert obj['Config']['Labels']['com.docker.compose.project']==project
 containers.append({'name':container,'id':obj['Id'],'imageId':obj['Image'],'memoryLimitBytes':obj['HostConfig']['Memory'],'nanoCpus':obj['HostConfig']['NanoCpus'],'volumes':[m['Name'] for m in obj['Mounts'] if m['Type']=='volume']})
free=int(run('guest-df',['docker','exec',rp,'df','-k','/var/lib/redpanda/data']).splitlines()[-1].split()[3])*1024
hostfree=os.statvfs(work).f_bavail*os.statvfs(work).f_frsize
hardware={key:run('host-'+key.replace('.','-'),['sysctl','-n',key]).strip() for key in ['hw.memsize','hw.physicalcpu','hw.logicalcpu','machdep.cpu.brand_string']}
docker=json.loads(run('docker-info',['docker','info','--format','{{json .}}'])); hardware['docker']={k:docker[k] for k in ['ServerVersion','NCPU','MemTotal','OperatingSystem']}
assert free>=20*1024**3 and sum(sizes)<9*1024**3
preflight={'utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'sourceHead':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip(),'codeSourceHead':'a6ddafbbae750693e227985f054be2d26716ae84','profileSourceHead':'f56b30b19d00a1033abae44a75435a4e771990e9','project':project,'scope':'Supervised synthetic RF3/EOS correctness only; no throughput/capacity','image':'redpandadata/redpanda:v26.2.3','digest':image,'clusterInfo':cluster,'clusterConfigStatus':status,'clusterProperties':values,'transactionMaxTimeoutMs':tx,'workerTransactionTimeoutMs':120000,'workerCommitIntervalMs':60000,'hardware':hardware,'hostFreeBytes':hostfree,'guestFreeBytes':free,'baselineAllocatedBytes':sum(sizes),'minimumFreeBytes':20*1024**3,'experimentDiskBudgetBytes':10*1024**3,'abortAllocatedBytes':9*1024**3,'rawProofBudgetBytes':256*1024**2,'composeSha256':hashlib.sha256((work/'docs/evidence/calcify-financial-sprint1/broker.compose.yml').read_bytes()).hexdigest(),'profileSha256':hashlib.sha256((work/'docs/evidence/calcify-financial-sprint1/broker-profile.json').read_bytes()).hexdigest(),'registeredResources':containers,'cleanup':'Stop only registered project; retain volumes/topics and all original projects'}
preflight['externalBrokerFault']={'composeProject':project,'containers':[c['id'] for c in containers],'targetContainer':containers[1]['id']};preflight['dirtyDiffSha256']=hashlib.sha256(subprocess.check_output(['git','diff'])).hexdigest();preflight['networkSubnet']='10.254.250.0/24';preflight['pinnedOverlaySha256']=hashlib.sha256((root/'pinned.compose.yml').read_bytes()).hexdigest()
(root/'preflight.json').write_text(json.dumps(preflight,indent=2)+'\n');print(json.dumps({'profile':values,'baselineAllocatedBytes':sum(sizes),'guestFreeBytes':free,'preflight':str(root/'preflight.json')}))
