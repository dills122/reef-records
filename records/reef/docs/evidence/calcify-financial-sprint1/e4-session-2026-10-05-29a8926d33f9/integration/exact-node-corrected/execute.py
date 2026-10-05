from pathlib import Path
import subprocess,json,os,hashlib
root=Path.cwd();run=root/'.planning/calcify-e4-session-2026-10-05/integration/exact-node-corrected';command=json.loads((run/'command.json').read_text());before=json.loads((run/'source-before.json').read_text());env=os.environ.copy();env['NODE_V8_COVERAGE']=str(run/'v8')
with (run/'stdout.log').open('w') as stdout,(run/'stderr.log').open('w') as stderr:p=subprocess.run(command,cwd=root,env=env,stdout=stdout,stderr=stderr)
after={n:hashlib.sha256((root/n).read_bytes()).hexdigest() for n in before};(run/'source-after.json').write_text(json.dumps(after,indent=2)+'\n');(run/'result.json').write_text(json.dumps({'exitCode':p.returncode,'sourceStable':before==after})+'\n');raise SystemExit(p.returncode if before==after else 99)
