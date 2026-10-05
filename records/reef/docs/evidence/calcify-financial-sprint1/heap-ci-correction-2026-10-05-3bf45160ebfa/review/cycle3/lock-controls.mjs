import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, open, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';

const originalPlatform = process.platform;
if (process.argv[2] === 'instrumented-linux') {
  Object.defineProperty(process, 'platform', { value: 'linux' });
  process.env.TMPDIR = await mkdtemp('/private/tmp/reviewer-linux-temp-');
}
const { capacityLockPath, runAdapter, calibrateAdapter, HEAP_LAUNCHER } = await import('../../../../scripts/dev/calcify-financial/rate-proof.mjs');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const dir = await mkdtemp('/private/tmp/reviewer-lock-control-');
const lockPath = capacityLockPath();
assert.equal(lockPath, path.join(process.platform === 'darwin' ? '/private/tmp' : tmpdir(), 'reef-financial-rate-capacity.lock'));
const fixtureBytes = Buffer.from('reviewer independent validation-only provenance fixture');
const identity = 'a'.repeat(64);
const fixtureSha256 = hash(fixtureBytes);
const identities = { sourceHead: identity, fixtureSha256, configSha256: identity, buildSha256: identity, classpathSha256: identity };
// Forged raw contracts only exercise refusals before any JVM or broker execution.
const bounds = { schema: 'financial-heap-bounds-v1', ...identities, identityHeapBytesUpper: 1, pendingHeapBytesUpper: 1,
  baselineHeapBytesUpper: 100, transientHeapReserveBytes: 10, replayHeapReserveBytes: 10,
  supportedIdentities: 100, supportedPendingItems: 100, validationOnly: false,
  derivation: 'Reviewer fabricated contract control; never measured', scope: 'Finite validation control only' };
const capability = { schema: 'financial-heap-capability-v1', ...identities, maxHeapBytes: HEAP_LAUNCHER.maxHeapBytes,
  usedHeapBytes: 50, vmArguments: HEAP_LAUNCHER.flags, javaVersion: 'synthetic', javaVendor: 'validation-only' };
const boundsBytes = JSON.stringify(bounds);
const review = { schema: 'financial-heap-bounds-review-v1', ...identities, validationOnly: false, verdict: 'READY_CONSERVATIVE_BOUND',
  boundsEvidenceSha256: hash(boundsBytes), supportedIdentities: bounds.supportedIdentities,
  supportedPendingItems: bounds.supportedPendingItems, derivation: bounds.derivation, scope: bounds.scope };
const heap = { schema: 'financial-heap-admission-v1', authorizedMaxHeapBytes: HEAP_LAUNCHER.maxHeapBytes,
  bounds, capability, review, fixtureEvidencePath: 'fixture.bin', boundsEvidencePath: 'bounds.json', boundsEvidenceSha256: hash(boundsBytes),
  capabilityEvidencePath: 'capability.json', capabilityEvidenceSha256: hash(JSON.stringify(capability)),
  reviewEvidencePath: 'review.json', reviewEvidenceSha256: hash(JSON.stringify(review)) };
const request = { ...identities, heap, correctness: { result: 'PASS', evidenceSha256: identity },
  adapterCalibrationContract: 'financial-rate-calibration-v1', sampleTrades: 1, pendingSample: 1 };
const requestPath = path.join(dir, 'request.json');
const adapterPath = path.join(dir, 'adapter.json');
const outputPath = path.join(dir, 'existing-output');
let ownedLock;
try {
  await Promise.all([['fixture.bin', fixtureBytes], ['bounds.json', boundsBytes], ['capability.json', JSON.stringify(capability)],
    ['review.json', JSON.stringify(review)], ['request.json', JSON.stringify(request)], ['adapter.json', JSON.stringify({ command: HEAP_LAUNCHER.java,
      args: [...HEAP_LAUNCHER.flags, '-cp', 'never-launched-classpath', HEAP_LAUNCHER.mainClass, 'calibrate', 'never-broker', 'financial-s1-review', 'never-read-config'] })]
  ].map(([name, bytes]) => writeFile(path.join(dir, name), bytes)));
  ownedLock = await open(lockPath, 'wx');
  const marker = 'reviewer owns fixed stale-lock control\n';
  await ownedLock.writeFile(marker);
  const rejectLocked = async call => {
    await assert.rejects(call(), error => error.code === 'EEXIST' && error.path === lockPath);
    assert.equal(await readFile(lockPath, 'utf8'), marker);
  };
  await rejectLocked(() => runAdapter('/never-read-policy', '/never-read-adapter', '/never-created-output', '--authorize-load'));
  await rejectLocked(() => calibrateAdapter(requestPath, adapterPath, outputPath, '--authorize-calibration'));
  console.log(JSON.stringify({ control: 'both entrypoints refuse same stale exclusive lock and preserve owner bytes', lockPath, result: 'PASS' }));
  await ownedLock.close(); ownedLock = undefined;
  await rm(lockPath);
  await assert.rejects(runAdapter(path.join(dir, 'missing-policy'), '/never-read-adapter', '/never-created-output', '--authorize-load'), error => error.code === 'ENOENT' && error.path === path.join(dir, 'missing-policy'));
  await assert.rejects(readFile(lockPath), { code: 'ENOENT' });
  await mkdir(outputPath);
  await assert.rejects(calibrateAdapter(requestPath, adapterPath, outputPath, '--authorize-calibration'), error => error.code === 'EEXIST' && error.path === outputPath);
  await assert.rejects(readFile(lockPath), { code: 'ENOENT' });
  console.log(JSON.stringify({ control: 'each entrypoint cleans only lock it acquired after downstream refusal', result: 'PASS' }));
  console.log(JSON.stringify({ originalPlatform, effectivePlatform: process.platform, instrumented: process.platform !== originalPlatform,
    actualLinuxQualification: false, capabilitySpawned: false, brokerSetup: false, fixtureValidationOnly: true }));
} finally {
  if (ownedLock) { await ownedLock.close(); await rm(lockPath); }
  await rm(dir, { recursive: true, force: true });
  if (process.platform !== originalPlatform) await rm(process.env.TMPDIR, { recursive: true, force: true });
}
