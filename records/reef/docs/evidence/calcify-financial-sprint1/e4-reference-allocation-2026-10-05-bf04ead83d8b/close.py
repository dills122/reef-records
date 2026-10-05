import json,hashlib,statistics,datetime
from pathlib import Path
r=Path('/Users/dsteele/.codex/worktrees/8c6f/reef/.planning/calcify-e4-session-2026-10-05');p=Path('/private/tmp/calcify-e4-reference-allocation-profile'); checks=[]
for receipt in json.loads((p/'pre-snapshot-validation.json').read_text()):
 f=Path(receipt['manifestPath']);assert hashlib.sha256(f.read_bytes()).hexdigest()==receipt['manifestSha256'];d=json.loads(f.read_text());rows=d.get('compiledFinancial',d.get('compiled'))
 for x in d['source']+rows:
  b=Path(x['snapshotPath']).read_bytes();assert hashlib.sha256(b).hexdigest()==x['sha256'];assert len(b)==x['sizeBytes']
 checks.append({'arm':receipt['arm'],'sourceAndCompiledSnapshotUnchanged':True,'sourceCount':len(d['source']),'compiledCount':len(rows)})
for x in json.loads((p/'jar-sha256.json').read_text()):assert hashlib.sha256(Path(x['path']).read_bytes()).hexdigest()==x['sha256']
java=Path('/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home/bin/java');(p/'post-snapshot-validation.json').write_text(json.dumps({'pass':True,'checks':checks,'jarsUnchanged':True,'javaPath':str(java),'javaSha256':hashlib.sha256(java.read_bytes()).hexdigest()},indent=2))
d=json.loads((p/'profile-result.json').read_text());summ=[]
for arm in ['ordinary-reference','canonical-leaf-reference']:
 rows=[x for x in d['records'] if x['arm']==arm and not x['warmup']];assert len(rows)==5
 q={'arm':arm}
 for key in ['acceptAllocatedBytes','finalOwnerDigestAllocatedBytes','acceptElapsedNanos','digestElapsedNanos']:
  a=[x[key] for x in rows];q[key]={'min':min(a),'max':max(a),'median':statistics.median(a),'all':a}
 summ.append(q)
(p/'summary.json').write_text(json.dumps({'pass':True,'summary':summ,'scope':d['scope'],'failureHistory':'failed1 baseline method discovery, no successful allocation result claimed; original logs/client preserved','armOrder':'ordinary all seven then compact all seven; no randomization or crossover; two warmups followed by five repetitions','warning':'Allocation includes reflection, canonicalization/checksums and class-local mapper, not retained bytes; shared preparsed history/data excluded. Does not prove cause of full-driver sampled heap peaks or safe cost upper bound.'},indent=2));print(json.dumps(summ,indent=2))
files=[]
for f in sorted(p.iterdir()):
 if f.is_file():files.append({'name':f.name,'sha256':hashlib.sha256(f.read_bytes()).hexdigest(),'sizeBytes':f.stat().st_size})
(p/'supplement-manifest-proposal.json').write_text(json.dumps({'schema':'isolated-reference-allocation-supplement-proposal-v1','capturedUtc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'root':str(p),'files':files,'publicationAuthorizedByRoot':False},indent=2))
