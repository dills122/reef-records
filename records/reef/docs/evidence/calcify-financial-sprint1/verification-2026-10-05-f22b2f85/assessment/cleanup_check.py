import json,pathlib,subprocess,datetime
root=pathlib.Path('.planning/sprint1-proof-bounded')
projects=['reef-calcify-financial-s1-bounded','reef-calcify-financial-s1-bounded-pilot']
rows=[]
for project in projects:
 names=[f'{project}-rp{i}-1' for i in range(3)]
 r=subprocess.run(['docker','inspect',*names],capture_output=True,text=True,check=True)
 (root/(project+'-stopped-inspect.json')).write_text(r.stdout)
 data=json.loads(r.stdout)
 assert all(not x['State']['Running'] for x in data)
 volumes=[m['Name'] for x in data for m in x['Mounts'] if m['Type']=='volume']
 assert len(volumes)==3
 subprocess.run(['docker','volume','inspect',*volumes],capture_output=True,text=True,check=True)
 rows.append({'project':project,'containersStopped':3,'volumesRetained':volumes})
ps=subprocess.check_output(['ps','-axo','pid=,command='],text=True)
owned=[line for line in ps.splitlines() if 'FinancialBrokerProbe' in line and 'bounded-f56b30b1-' in line]
assert not owned
summary={'utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'projects':rows,'ownedProbeProcessesRemaining':0,'cleanup':'Only registered projects stopped; volumes retained. No prune/reset or unrelated cleanup.'}
(root/'cleanup-state.json').write_text(json.dumps(summary,indent=2)+'\n');print(json.dumps(summary))
