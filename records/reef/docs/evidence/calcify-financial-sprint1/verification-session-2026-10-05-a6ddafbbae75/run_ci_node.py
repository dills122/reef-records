import pathlib,re,json,os,subprocess,hashlib,datetime
root=pathlib.Path.cwd()
session=root/'.planning/calcify-session-2026-10-04'
source=(root/'.github/workflows/ci.yml').read_text()
start=source.index('node --test --experimental-test-coverage')
end=source.index('| tee coverage/node-dev-tooling/test-output.txt',start)
files=re.findall(r'scripts/[\w./-]+\.test\.mjs',source[start:end])
assert len(files)==len(set(files)) and 'scripts/dev/calcify-financial/proof-supervisor.test.mjs' in files
command=['node','--test','--experimental-test-coverage',*files]
label=os.environ.get('CALCIFY_FINANCIAL_CI_LABEL','')
assert not label or re.fullmatch(r'[a-z0-9-]+',label)
output=session/'ci-validation'/label if label else session/'ci-validation'
output.mkdir(exist_ok=False)
(output/'exact-command.json').write_text(json.dumps({'source':'.github/workflows/ci.yml','command':command},indent=2)+'\n')
paths=['.github/workflows/ci.yml',*files]
paths+=['scripts/dev/calcify-financial/'+name for name in ['proof-supervisor.mjs','broker-proof.mjs','lib/external-faults.mjs','record-attempt.mjs']]
def boundary():return {'capturedUtc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'files':{name:hashlib.sha256((root/name).read_bytes()).hexdigest() for name in paths}}
before=boundary()
(output/'source-before.json').write_text(json.dumps(before,indent=2)+'\n')
env=dict(os.environ,NODE_V8_COVERAGE=str(output/'v8'))
status=subprocess.call(command,cwd=root,env=env)
after=boundary()
(output/'source-after.json').write_text(json.dumps(after,indent=2)+'\n')
assert before['files']==after['files'],'Source changed during exact CI run'
raise SystemExit(status)
