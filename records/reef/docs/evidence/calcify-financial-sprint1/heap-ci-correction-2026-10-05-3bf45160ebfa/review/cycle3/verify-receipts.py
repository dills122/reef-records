from pathlib import Path
import json, hashlib, xml.etree.ElementTree as ET, re, datetime

root = Path('.planning/calcify-heap-ci-correction-2026-10-05/review/cycle3')
old = Path('.planning/calcify-heap-protection-2026-10-05')
new = Path('.planning/calcify-heap-ci-correction-2026-10-05')
sha = lambda p: hashlib.sha256(Path(p).read_bytes()).hexdigest()
freeze = json.loads((new/'worker/source-freeze.json').read_text())['frozenSha256']
old_before = json.loads((old/'integration/financial2-final/source-before.json').read_text())
old_after = json.loads((old/'integration/financial2-final/source-after.json').read_text())
assert old_before == old_after
kotlin = [p for p in freeze if p.endswith('.kt')]
assert all(old_before[p] == freeze[p] == sha(p) for p in kotlin)
suite = []
for p in sorted((old/'integration/financial2-final/xml').glob('*.xml')):
    s = ET.parse(p).getroot()
    suite.append({'path': str(p), 'sha256': sha(p), 'timestamp': s.attrib['timestamp'],
                  **{k: int(s.attrib[k]) for k in ['tests', 'failures', 'errors', 'skipped']}})
assert len(suite) == 6 and sum(x['tests'] for x in suite) == 64
assert not sum(x[k] for x in suite for k in ['failures', 'errors', 'skipped'])
cap_path = old/'review/cycle2/capability.stdout.json'
cap = json.loads(cap_path.read_text())
command = json.loads((old/'review/cycle2/capability-command.json').read_text())['command']
build = Path(cap['classpathEntries'][0])/'com/reef/platform/calcify/financial'
md = hashlib.sha256()
classes = sorted(build.glob('Financial*.class'))
for p in classes:
    md.update(p.name.encode()); md.update(b'\0'); md.update(p.read_bytes())
assert md.hexdigest() == cap['buildSha256']
cp = hashlib.sha256()
def part(value):
    cp.update(str(value).encode()); cp.update(b'\0')
for entry in cap['classpathEntries']:
    p = Path(entry); assert p.exists(); part(p)
    if p.is_dir():
        for f in sorted(p.rglob('*'), key=str):
            if f.is_file(): part(f.relative_to(p)); part(sha(f))
    else: part(sha(p))
assert cp.hexdigest() == cap['classpathSha256']
assert sha(command[-2]) == cap['fixtureSha256']
assert sha(command[-1]) == cap['configSha256']
nb = json.loads((new/'integration/node-ci-final/source-before.json').read_text())
na = json.loads((new/'integration/node-ci-final/source-after.json').read_text())
assert nb == na and len(nb) == 437
assert all(nb[p] == h for p, h in freeze.items())
log = (new/'integration/node-ci-final/output.log').read_text()
counts = {k: int(re.search(r'^# '+k+r' (\d+)$', log, re.M).group(1)) for k in ['tests', 'pass', 'fail', 'cancelled', 'skipped']}
assert counts == {'tests': 230, 'pass': 230, 'fail': 0, 'cancelled': 0, 'skipped': 0}
orig_path = new/'integration/original-hosted-node-failure.log'
orig = orig_path.read_text()
assert sha(orig_path) == json.loads((new/'worker/source-freeze.json').read_text())['hostedOriginalLogSha256']
assert "ENOENT: no such file or directory, open '/private/tmp/reef-financial-rate-capacity.lock'" in orig
receipt = {
    'verifiedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(),
    'previousFinancial': {'scope': 'Retained actual earlier forced Kotlin run; no cycle3 rerun', 'sourceHashesMatchCurrent': True,
                          'suite': suite, 'tests': 64, 'failures': 0, 'errors': 0, 'skipped': 0},
    'currentBuild': {'recomputed': True, 'financialClasses': len(classes), 'buildSha256': md.hexdigest(),
                     'classpathSha256': cp.hexdigest(), 'fixturePath': command[-2], 'fixtureSha256': cap['fixtureSha256'],
                     'configPath': command[-1], 'configSha256': cap['configSha256'], 'capabilityRawSha256': sha(cap_path),
                     'actualRuntimeRecaptured': False},
    'parentNodeCI': {'sourceInputs': len(nb), 'allFrozenPathsMatch': True, 'beforeAfterEqual': True, 'counts': counts,
                     'outputSha256': sha(new/'integration/node-ci-final/output.log')},
    'originalHostedFailure': {'rawSha256': sha(orig_path), 'identifiedMissingLockParent': True, 'sourcePreserved': True},
}
(root/'receipts-independent-verification.json').write_text(json.dumps(receipt, indent=2)+'\n')
print(json.dumps(receipt, indent=2))
