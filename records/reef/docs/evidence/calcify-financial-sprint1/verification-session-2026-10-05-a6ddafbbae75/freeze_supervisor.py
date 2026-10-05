import sys,json,pathlib,subprocess,hashlib,datetime
root=pathlib.Path.cwd();session=root/'.planning/calcify-session-2026-10-04'
name,mode=sys.argv[1:3]
assert mode in {'smoke','fault-smoke','run-external','run-activation','run-core','run-golden','run-recovery'}
assert name.replace('-','').isalnum()
profile=json.loads((session/'broker/preflight.json').read_text())
ids=[row['id'] for row in profile['registeredResources']]
rows=json.loads(subprocess.check_output(['docker','inspect',*ids],text=True,timeout=10))
containers=[]
for row in rows:
 labels=row['Config']['Labels']
 assert row['Id'] in ids and labels['com.docker.compose.project']==profile['project'] and row['State']['Running'] and row['State']['Health']['Status']=='healthy'
 containers.append({'id':row['Id'],'labels':{key:labels[key] for key in ['com.docker.compose.project','com.docker.compose.service','reef.test']},'imageId':row['Image'],'volumes':[{'name':m['Name'],'destination':m['Destination']} for m in row['Mounts'] if m['Type']=='volume']})
runs=session/'runs';runs.mkdir(exist_ok=True)
output=runs/name
assert not output.exists()
node=subprocess.check_output(['which','node'],text=True).strip()
profile_path=session/'broker/preflight.json'
fault_mode=mode in {'run-external','fault-smoke'}
if fault_mode:
 profile_path=session/f'{name}-broker-preflight.json'
 assert not profile_path.exists()
 profile['derivedFromFrozenProfileSha256']=hashlib.sha256((session/'broker/preflight.json').read_bytes()).hexdigest()
 profile['derivedFrozenUtc']=datetime.datetime.now(datetime.timezone.utc).isoformat()
 profile['derivedFaultRunId']=name
 profile['originalProfileFactsScope']='Original configuration/hardware/baseline receipts retained; current startup identities/generations/bytes are measured by supervisor. Current executable source and compiled hashes frozen separately by runner plan.'
 profile['externalBrokerFault'].update({'resources':containers,'stoppedAllocatedBytesUpperBound':3*1024**3,'phaseProtocol':{'schema':'calcify-broker-fault-phase-v1','runId':name,'maxCycles':1,'recoveryTimeoutMs':30000,'stopTimeoutMs':30000,'directory':str(output/'broker-fault'),'clock':{'platform':'darwin','node':'22.22.1','uv':'1.51.0'}}})
 profile_path.write_text(json.dumps(profile,indent=2)+'\n')
argv=['/usr/bin/true'] if mode=='smoke' else ['/usr/bin/env','JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home',f'CALCIFY_FINANCIAL_RUN_ID={name}',f'CALCIFY_FINANCIAL_PREFLIGHT={profile_path}',f'CALCIFY_FINANCIAL_PROOF_DIR={output / "proof"}',node,str(session/'fault_smoke.mjs' if mode=='fault-smoke' else root/'scripts/dev/calcify-financial/broker-proof.mjs')]
if mode not in {'smoke','fault-smoke'}:argv.append(mode)
if fault_mode:argv.extend(['--fault-phase-directory',str(output/'broker-fault')])
p={'schema':'calcify-proof-supervisor-v1','registeredResources':{'project':profile['project'],'containers':containers},'wrapper':{'argv':argv,'cwd':str(root),'outputDir':str(output),'timeoutMs':1800000},'externalBrokerFault':{**profile['externalBrokerFault'],'stoppedAllocatedBytesUpperBound':3*1024**3,'evidence':'Frozen conservative 3 GiB target reservation throughout fault mode; measure actual du whenever running and reject above bound. Stopped actual size unknown. Fresh registered volumes exclusively owned; no outside writers is operational premise. Upper-bound accounting, not measured stopped bytes or continuous peak.'},'profileSha256':hashlib.sha256((session/'broker/preflight.json').read_bytes()).hexdigest()}
if not fault_mode: p.pop('externalBrokerFault')
p['profileSha256']=hashlib.sha256(profile_path.read_bytes()).hexdigest()
if mode=='fault-smoke':
 p['wrapper']['timeoutMs']=90000
 p['smokeWrapperSha256']=hashlib.sha256((session/'fault_smoke.mjs').read_bytes()).hexdigest()
p['supervisorSourceSha256']=hashlib.sha256((root/'scripts/dev/calcify-financial/proof-supervisor.mjs').read_bytes()).hexdigest()
p['sourceHead']=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()
p['workingTreeBoundary']='Explicit dirty source hashes and compiled hashes frozen by broker runner plan; sourceHead denotes baseline, not new uncommitted implementation.'
target=session/f'{name}-supervisor.json'
assert not target.exists()
target.write_text(json.dumps(p,indent=2)+'\n')
print(json.dumps({'manifest':str(target),'mode':mode,'wrapperOutput':str(output),'containers':ids}))
