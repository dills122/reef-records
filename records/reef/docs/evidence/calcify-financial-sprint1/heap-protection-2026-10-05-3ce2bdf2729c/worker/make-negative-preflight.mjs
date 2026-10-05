import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { PLAN, preparePolicy } from '../../../scripts/dev/calcify-financial/rate-proof.mjs';
const root = process.cwd(), worker = path.join(root, '.planning/calcify-heap-protection-2026-10-05/worker'), dir = path.join(worker, 'negative-preflight');
const rawCapability = await readFile(path.join(worker, 'actual-heap-capability.log'));
const observed = JSON.parse(rawCapability);
const byteHash = value => createHash('sha256').update(value).digest('hex');
const c = { ...observed, usedHeapBytes: 0 }; // Explicit forged stored baseline; child must measure real baseline.
const b = { schema: 'financial-heap-bounds-v1', ...Object.fromEntries(['sourceHead', 'fixtureSha256', 'configSha256', 'buildSha256', 'classpathSha256'].map(k => [k, c[k]])),
 identityHeapBytesUpper: 1, pendingHeapBytesUpper: 1, baselineHeapBytesUpper: 1,
 transientHeapReserveBytes: 1, replayHeapReserveBytes: 1, supportedIdentities: 150000, supportedPendingItems: 1,
 validationOnly: false, derivation: 'NEGATIVE CONTROL ONLY: intentionally impossible one-byte baseline and fabricated stored zero used; never conservative cost evidence',
 scope: 'Broker-free child refusal control; no load authorized by fixture' };
const boundsBytes = JSON.stringify(b), capabilityBytes = JSON.stringify(c);
const review = { schema: 'financial-heap-bounds-review-v1', verdict: 'READY_CONSERVATIVE_BOUND', validationOnly: false,
 boundsEvidenceSha256: byteHash(boundsBytes), ...Object.fromEntries(['sourceHead', 'fixtureSha256', 'configSha256', 'buildSha256', 'classpathSha256', 'supportedIdentities', 'supportedPendingItems', 'derivation', 'scope'].map(k => [k, b[k]])) };
const reviewBytes = JSON.stringify(review);
const heap = { schema: 'financial-heap-admission-v1', authorizedMaxHeapBytes: 805306368, bounds: b, capability: c, review,
 boundsEvidencePath: 'bounds.json', boundsEvidenceSha256: byteHash(boundsBytes), capabilityEvidencePath: 'capability.json', capabilityEvidenceSha256: byteHash(capabilityBytes),
 reviewEvidencePath: 'review.json', reviewEvidenceSha256: byteHash(reviewBytes), fixtureEvidencePath: 'fixture.json' };
const hash = 'a'.repeat(64), calibration = { schema: 'financial-rate-calibration-v1', sourceHead: c.sourceHead, fixtureSha256: c.fixtureSha256, realRecordEvidenceSha256: hash,
 sampleTrades: 1000, encodedBytes: 100000, physicalBytes: 200000, physicalReplicationIncluded: true, identityPhysicalBytes: 100, pendingPhysicalBytes: 200,
 producer: { completedTrades: 10000, elapsedMs: 1000 }, observer: { completedTrades: 10000, elapsedMs: 1000, exactParity: true } };
const correctness = { schema: 'financial-e3-correctness-v1', result: 'PASS', sourceHead: c.sourceHead, fixtureSha256: c.fixtureSha256, evidenceSha256: hash };
const preflight = { guestFreeBytes: 40*1024**3, basePhysicalBytes: 1024, indexedReadView: true, boundedWrites: true, retainsFullDomainHistory: false, accessPatternEvidenceSha256: hash };
const p = preparePolicy({ calibration, correctness, preflight, arm: PLAN.ladder[0], heap });
if (p.status !== 'FROZEN') throw Error(JSON.stringify(p));
for (const [name, bytes] of [['bounds.json', boundsBytes], ['capability.json', capabilityBytes], ['review.json', reviewBytes], ['policy.json', JSON.stringify(p, null, 2)+'\n']]) await writeFile(path.join(dir, name), bytes);
await copyFile(path.join(root, 'docs/evidence/calcify-financial-sprint1/fixtures.json'), path.join(dir, 'fixture.json'));
await writeFile(path.join(dir, 'CONTROL_SCOPE.md'), 'Negative test only. All cost/funding/rate/review claims fabricated. Stored usedHeapBytes intentionally forged zero; one-byte baseline impossible. Actual child must refuse before state/client/topic setup. Genuine raw fixture/config/compiled/classpath/VM identities copied from actual broker-free capability. No executable load permission or capacity evidence.\n');
