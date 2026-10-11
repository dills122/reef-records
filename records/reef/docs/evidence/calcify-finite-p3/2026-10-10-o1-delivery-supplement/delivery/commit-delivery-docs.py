import hashlib,json,subprocess
from pathlib import Path
m=json.loads(Path('.planning/calcify-p3-overnight/integration/target-1.json').read_text());r=Path('.planning/calcify-p3-overnight/integration/review-1.md').read_text();v=r.split('## Verdict',1)[1].strip().splitlines()[0].strip('* ');assert v.startswith('Ready'),v
assert subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()==m['head']
assert not subprocess.check_output(['git','diff','--cached','--name-only'],text=True).strip()
for p,h in m['files'].items():assert hashlib.sha256(Path(p).read_bytes()).hexdigest()==h,p
paths=sorted(set(m['dirtyTracked']+m['inScopeUntracked']));assert len(paths)==9
subprocess.run(['git','add','--',*paths],check=True)
assert set(subprocess.check_output(['git','diff','--cached','--name-only'],text=True).splitlines())==set(paths)
subprocess.run(['git','diff','--cached','--check'],check=True)
subprocess.run(['git','commit','-m','docs(calcify): record reviewed O1 delivery and proof'],check=True)
print(subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip())
