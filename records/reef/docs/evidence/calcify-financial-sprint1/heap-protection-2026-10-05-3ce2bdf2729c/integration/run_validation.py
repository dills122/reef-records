import datetime, hashlib, json, os, pathlib, shutil, subprocess, sys, time
root = pathlib.Path.cwd()
out = root / '.planning/calcify-heap-protection-2026-10-05/integration' / sys.argv[1]
out.mkdir(exist_ok=False)
cmd = sys.argv[2:]
tracked = subprocess.check_output(['git', 'ls-files', '-z']).decode().split('\0')
paths = sorted(set(p for p in tracked if p and (p.startswith('scripts/') or '/calcify/financial/' in p or p == '.github/workflows/ci.yml')) | {
 'services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialHeapGuard.kt',
 'services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialHeapGuardTest.kt'})
def hashes():
 return {p: hashlib.sha256((root / p).read_bytes()).hexdigest() for p in paths if (root / p).is_file()}
before = hashes()
(out / 'source-before.json').write_text(json.dumps(before, indent=2)+'\n')
env = os.environ.copy()
env['JAVA_HOME'] = '/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home'
for key in ['JAVA_TOOL_OPTIONS', '_JAVA_OPTIONS', 'JDK_JAVA_OPTIONS', 'CLASSPATH']:
 env.pop(key, None)
env['NODE_V8_COVERAGE'] = str(out / 'v8')
started = datetime.datetime.now(datetime.timezone.utc).isoformat()
tick = time.monotonic()
with (out / 'output.log').open('w') as log:
 result = subprocess.run(cmd, cwd=root, env=env, stdout=log, stderr=subprocess.STDOUT)
after = hashes()
(out / 'source-after.json').write_text(json.dumps(after, indent=2)+'\n')
if cmd and 'gradlew' in cmd[0]:
 xml = root / 'services/platform-runtime/build/test-results/test'
 dest = out / 'xml'
 dest.mkdir()
 for file in xml.glob('TEST-*calcify.financial.*.xml'):
  shutil.copy2(file, dest / file.name)
summary = {'command':cmd, 'startedAt':started, 'finishedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),
 'elapsedSeconds':time.monotonic()-tick, 'exit':result.returncode, 'sourceInputs':len(before),
 'sourceBeforeAfterEqual':before == after, 'sourceSnapshotScope':'Tracked scripts, financial Kotlin sources and CI workflow plus two new guard sources; no claim covering unrelated module sources',
 'javaHome':env['JAVA_HOME'], 'jvmOptionEnvironmentRemoved':True}
(out / 'summary.json').write_text(json.dumps(summary, indent=2)+'\n')
print(json.dumps(summary))
print((out / 'output.log').read_text()[-4000:])
sys.exit(result.returncode if before == after else 97)
