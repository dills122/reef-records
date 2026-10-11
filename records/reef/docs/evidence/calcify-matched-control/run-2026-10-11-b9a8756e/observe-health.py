import subprocess,json,time
from pathlib import Path
p=Path(__file__).parent
roles=['calcify-resolver','matching-engine','platform-api','postgres','redpanda']
while not (p/'run/supervisor.json').exists():
 rows=[]
 for role in roles:
  r=subprocess.run(['docker','inspect','reef-calcify-contention-20261011-'+role,'--format','{{json .State}}'],capture_output=True,text=True)
  rows.append({'role':role,'state':json.loads(r.stdout) if r.returncode==0 else {'inspectError':r.stderr}})
 with (p/'run/live-health.jsonl').open('a') as f:f.write(json.dumps({'epochMs':round(time.time()*1000),'states':rows})+'\n')
 time.sleep(5)
