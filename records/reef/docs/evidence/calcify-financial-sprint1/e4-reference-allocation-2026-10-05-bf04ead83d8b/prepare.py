import json,hashlib
from pathlib import Path
r=Path('/Users/dsteele/.codex/worktrees/8c6f/reef/.planning/calcify-e4-session-2026-10-05');out=Path('/private/tmp/calcify-e4-reference-allocation-profile'); receipts=[]; maps=[]
for n in ['attempt2-cycle2','attempt3-cycle1']:
 p=r/'candidate-source-snapshots'/n/'manifest.json';d=json.loads(p.read_text());rows=d.get('compiledFinancial',d.get('compiled'))
 for x in d['source']+rows:
  b=Path(x['snapshotPath']).read_bytes();assert hashlib.sha256(b).hexdigest()==x['sha256'];assert len(b)==x['sizeBytes']
 maps.append({Path(x['originalPath']).stem:x['snapshotPath'] for x in rows});receipts.append({'arm':n,'manifestPath':str(p),'manifestSha256':hashlib.sha256(p.read_bytes()).hexdigest(),'buildSha256':d['buildSha256'],'candidateSha256':d['candidateSha256'],'sourceCount':len(d['source']),'compiledCount':len(rows),'validated':True})
c=json.loads((r/'bootstrap-compact1/frozen/capability.json').read_text());jars=[x for x in c['classpathEntries'] if x.endswith('.jar')];(out/'cp.txt').write_text(':'.join(jars));(out/'classmaps.json').write_text(json.dumps(maps));(out/'pre-snapshot-validation.json').write_text(json.dumps(receipts,indent=2));(out/'jar-sha256.json').write_text(json.dumps([{'path':x,'sha256':hashlib.sha256(Path(x).read_bytes()).hexdigest()} for x in jars],indent=2))
