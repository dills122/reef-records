import assert from 'node:assert/strict';
import { superviseProof } from '../../../../scripts/dev/calcify-financial/proof-supervisor.mjs';
const GiB = 1024 ** 3;
const p = { schema: 'calcify-proof-supervisor-v1', registeredResources: {
 project: 'reef-calcify-review', containers: [1,2,3].map(n => ({ id: String(n).repeat(64), labels: {
 'com.docker.compose.project': 'reef-calcify-review', 'com.docker.compose.service': `rp${n}` } })) },
 wrapper: { argv: ['/usr/bin/true'], cwd: '/tmp', outputDir: '/tmp/review-unique', timeoutMs: 60000 } };
const sample = stamp => ({ sampledAtMs: stamp, containers: p.registeredResources.containers.map(c => ({ ...c,
 running: true, healthy: true, allocationMode: 'measured', allocatedBytes: GiB })), guestFreeBytes: 30 * GiB, rawProofBytes: 0 });
let now = 10000, starts = [], launchAge, lastStamp, count = 0;
const d = { now: () => now, sleep: async ms => { now += ms; }, prepare: async () => {},
 monitor: async () => { const stamp = now; lastStamp = stamp; starts.push(stamp); now += 4400; return sample(stamp); },
 record: async () => { now += 900; },
 launch: async () => { launchAge = now - lastStamp; return { status: () => ++count >= 2 ? { code: 0, signal: null } : null, stop: async () => {} }; },
 stopBrokers: async () => {}, finish: async () => {} };
const first = await superviseProof(p, d);
assert.equal(first.ok, true);
assert.equal(launchAge, 5300);
console.log(JSON.stringify({ control: 'launch-with-stale-initial-sample', resultOk: first.ok, launchAgeMs: launchAge, sampleStarts: starts }));
now = 10000; starts = []; count = 0;
d.monitor = async () => { const stamp = now; starts.push(stamp); now += 4000; return sample(stamp); };
d.record = async () => {};
d.launch = async () => ({ status: () => starts.length >= 2 ? { code: 0, signal: null } : null, stop: async () => {} });
const second = await superviseProof(p, d);
assert.equal(second.ok, true);
assert.equal(starts[1] - starts[0], 9000);
console.log(JSON.stringify({ control: 'first-periodic-sample-gap', resultOk: second.ok, sampleStarts: starts, firstGapMs: starts[1] - starts[0] }));
const clean = { now: () => 10000, sleep: async () => {}, prepare: async () => {}, monitor: async () => sample(10000),
 record: async () => {}, launch: async () => ({ status: () => ({ code: 0, signal: null }), stop: async () => {} }),
 stopBrokers: async () => {}, finish: () => new Promise(() => {}) };
const third = await Promise.race([superviseProof(p, clean), new Promise(resolve => setTimeout(() => resolve('still-pending'), 50))]);
assert.equal(third, 'still-pending');
console.log(JSON.stringify({ control: 'unbounded-completion-handshake', after50Ms: third }));
