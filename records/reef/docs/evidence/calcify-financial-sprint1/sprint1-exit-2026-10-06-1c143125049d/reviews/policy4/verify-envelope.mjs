import assert from 'node:assert/strict';
import { readFile, writeFile, readdir, lstat, realpath, open } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { freezeDiagnostic, verifyDiagnosticEvidence } from '../../../../scripts/dev/calcify-financial/rate-proof.mjs';
import { validateRateSupervisor, validateRateResourcePolicy, validateBootstrapRuntime } from '../../../../scripts/dev/calcify-financial/rate-supervision.mjs';
import { resourceBudgets } from '../../../../scripts/dev/calcify-financial/proof-supervisor.mjs';

const session = path.resolve('.planning/calcify-sprint1-exit-2026-10-06');
const frozen = path.join(session, 'arm5/frozen'), broker = path.join(session, 'broker3');
const sha = value => createHash('sha256').update(value).digest('hex');
const load = async file => JSON.parse(await readFile(file, 'utf8'));
const fileHash = async file => {
  const fd = await open(file, 'r'), md = createHash('sha256'), buffer = Buffer.alloc(1024 * 1024);
  try { while (true) { const { bytesRead } = await fd.read(buffer, 0, buffer.length, null); if (!bytesRead) break; md.update(buffer.subarray(0, bytesRead)); } }
  finally { await fd.close(); }
  return md.digest('hex');
};
const walk = async dir => {
  const files = [];
  for (const d of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) files.push(...await walk(p)); else if (d.isFile()) files.push(p);
  }
  return files.sort();
};
const policy = await load(path.join(frozen, 'policy.json'));
const request = await load(path.join(frozen, 'request.json'));
const capability = await load(path.join(frozen, 'capability.json'));
const adapter = await load(path.join(frozen, 'adapter.json'));
const supervisor = await load(path.join(frozen, 'supervisor.json'));
const config = await load(path.join(frozen, 'config.json'));
const preflight = await load(path.join(broker, 'preflight.json'));
const registration = await load(path.join(broker, 'registration.json'));
const checks = [];
assert.deepEqual(freezeDiagnostic(request), policy); checks.push('freezeDiagnostic(request) exact policy');
await verifyDiagnosticEvidence(policy, path.join(frozen, 'policy.json'), path.join(frozen, 'config.json'), capability);
checks.push('verifyDiagnosticEvidence raw capability/correctness/fixture/config/source PASS');
assert.equal(await fileHash(path.join(frozen, 'supervisor.json')), adapter.supervisorEvidenceSha256);
const out = config.proofDir;
const args = [...adapter.args, '--financial-rate-policy', path.join(frozen, 'policy.json'), '--financial-rate-measurement', path.join(out, 'measurement.json')];
const p = validateRateSupervisor(supervisor, adapter.command, args, out);
validateRateResourcePolicy(p, policy);
validateBootstrapRuntime(config, p, out, args[6]);
checks.push('validateRateSupervisor/validateRateResourcePolicy/validateBootstrapRuntime actual argv/output PASS');
assert.deepEqual(resourceBudgets(p), { abortAllocatedBytes: 14 * 1024 ** 3, hardAllocatedBytes: 16 * 1024 ** 3,
  guestFreeBytesFloor: 20 * 1024 ** 3, rawProofBytes: 256 * 1024 ** 2, sampleIntervalMs: 5000,
  name: 'financial-empirical-heap8-disk16-v1' });
assert.match(p.scope, /8GiBheap2GiBjournal14GiBabort16GiBhard/);
checks.push('explicit8GiB/profile14–16GiB/current annotation PASS');
for (const q of [config.ownedRoot, config.stateDir, config.ackJournalDir]) {
  assert.equal(await realpath(q), q); const s = await lstat(q); assert(s.isDirectory() && !s.isSymbolicLink());
}
assert.deepEqual(await readdir(config.stateDir), []); assert.deepEqual(await readdir(config.ackJournalDir), []);
await assert.rejects(lstat(out), { code: 'ENOENT' });
checks.push('canonical owned root; empty store/journal; absent unique proof output PASS');
const capCommand = await load(path.join(frozen, 'capability-command.json'));
assert.equal(capCommand.returncode, 0); assert.deepEqual(JSON.parse(capCommand.stdout), capability);
assert.deepEqual(capCommand.argv, [adapter.command, ...adapter.args.slice(0, 5), 'heap-capability', policy.sourceHead,
  path.join(frozen, 'fixture.json'), path.join(frozen, 'config.json')]);
const scopeCommand = await load(path.join(frozen, 'broker-scope-command.json'));
assert.equal(scopeCommand.returncode, 0); assert.deepEqual(JSON.parse(scopeCommand.stdout), config.brokerScope);
assert.deepEqual(scopeCommand.argv, [adapter.command, ...adapter.args.slice(0, 5), 'broker-scope', args[6]]);
checks.push('successful raw capability/broker-scope command argv/stdout exact match PASS');
assert.equal(capability.maxHeapBytes, 8 * 1024 ** 3); assert.deepEqual(capability.vmArguments, ['-Xms128m', '-Xmx8g']);
assert.deepEqual(capability.classpathEntries, adapter.args[3].split(path.delimiter));
const classRoot = path.join(policy.sourceRoot, 'services/platform-runtime/build/classes/kotlin/test');
const dir = path.join(classRoot, 'com/reef/platform/calcify/financial'), build = createHash('sha256');
for (const name of (await readdir(dir)).filter(n => n.startsWith('Financial') && n.endsWith('.class')).sort()) {
  build.update(name); build.update(Buffer.from([0])); build.update(await readFile(path.join(dir, name)));
}
assert.equal(build.digest('hex'), capability.buildSha256);
const cp = createHash('sha256'), cpPart = value => { cp.update(value); cp.update(Buffer.from([0])); };
for (const entry of capability.classpathEntries) {
  assert.equal(path.resolve(entry), entry); cpPart(entry);
  if ((await lstat(entry)).isDirectory()) for (const file of await walk(entry)) { cpPart(path.relative(entry, file)); cpPart(await fileHash(file)); }
  else cpPart(await fileHash(entry));
}
assert.equal(cp.digest('hex'), capability.classpathSha256);
checks.push('compiled Financial classes and ordered entire classpath current byte hashes PASS');
assert.deepEqual(config.registeredResources, preflight.registeredResources);
assert.deepEqual(config.registeredResources, registration.registeredResources);
assert.equal(config.brokerScope.clusterId, preflight.clusterInfo.split('\n').find(l => l.startsWith('redpanda.')));
assert.equal(preflight.state, 'HEALTHY_PROFILE_READ_BACK'); assert(preflight.guestFreeBytes >= 20 * 1024 ** 3);
for (const [field, digest] of [['composePath', 'composeSha256'], ['profilePath', 'profileSha256'], ['pinnedNetworkPath', 'pinnedNetworkSha256']])
  assert.equal(await fileHash(preflight[field]), preflight[digest]);
const created = await load(path.join(broker, 'create-012-created-inspect.json'));
const volumes = await load(path.join(broker, 'create-013-created-volumes.json'));
for (const raw of [created, volumes]) { assert.equal(raw.exitCode, 0); assert.equal(sha(raw.stdout), raw.stdoutSha256); }
const rawContainers = JSON.parse(created.stdout), rawVolumes = JSON.parse(volumes.stdout);
const latestInspect = (await readdir(broker)).filter(n => /^bootstrap-\d+-inspect\.json$/.test(n)).sort().at(-1);
const latest = await load(path.join(broker, latestInspect));
assert.equal(latest.exitCode, 0); assert.equal(sha(latest.stdout), latest.stdoutSha256);
const current = JSON.parse(latest.stdout);
for (const c of config.registeredResources.containers) {
  const r = rawContainers.find(r => r.Id === c.id), live = current.find(r => r.Id === c.id);
  assert(r && live); assert.equal(r.Image, c.imageId); assert.equal(live.Image, c.imageId);
  for (const [label, value] of Object.entries(c.labels)) { assert.equal(r.Config.Labels[label], value); assert.equal(live.Config.Labels[label], value); }
  assert.equal(live.State.Status, 'running'); assert.equal(live.State.Health.Status, 'healthy');
  assert.equal(live.HostConfig.Memory, 2 * 1024 ** 3);
  assert.equal(live.HostConfig.NanoCpus, 1000000000);
  const endpoint = live.NetworkSettings.Ports[c.hostKafkaEndpoint.containerPort];
  assert(endpoint.some(e => e.HostPort === String(c.hostKafkaEndpoint.port) && ['127.0.0.1','0.0.0.0'].includes(e.HostIp)));
  for (const v of c.volumes) {
    assert(r.Mounts.some(m => m.Name === v.name && m.Destination === v.destination));
    const rv = rawVolumes.find(rv => rv.Name === v.name); assert(rv);
    assert.equal(rv.Labels['com.docker.compose.project'], config.registeredResources.project);
    assert.equal(rv.Labels['reef.test'], 'calcify-financial-sprint1');
  }
}
checks.push('raw created/healthy latest inspect IDs/images/labels/volumes/endpoints/1CPU2GiB match registry PASS');
const compatibility = await load(path.join(frozen, 'correctness-compatibility.json'));
assert.equal(await fileHash(path.join(frozen, compatibility.priorProofPath)), compatibility.priorProofSha256);
assert.deepEqual(config.policy, (await load(path.join(frozen, 'fixture.json'))).policy);
checks.push('prior49 correctness raw digest and fixture/config economic policy equality PASS');
const expected = await load(path.join(session, 'policy-author/after.json'));
for (const [file, digest] of Object.entries(expected)) assert.equal(await fileHash(file), digest);
const patchSha256 = sha(execFileSync('git', ['diff', '--', ...Object.keys(expected)]));
assert.equal(patchSha256, 'da8ad0e573c9d4a17a4da81c425401b08a34f4d3c04b8f301ec4061c1564117b');
checks.push('all10 reviewed source hashes and patch unchanged PASS');
const hashes = {};
for (const name of (await readdir(frozen)).filter(n => n.endsWith('.json')).sort()) hashes['arm5/frozen/'+name] = await fileHash(path.join(frozen, name));
for (const name of ['preflight.json','registration.json','create-012-created-inspect.json','create-013-created-volumes.json',latestInspect]) hashes['broker3/'+name] = await fileHash(path.join(broker, name));
const result = { reviewInstance: '4 of 4, same-instance concrete-envelope supplement', verdict: 'Ready', checkedUtc: new Date().toISOString(),
  patchSha256, policySha256: policy.policySha256, capability: { maxHeapBytes: capability.maxHeapBytes, buildSha256: capability.buildSha256,
    classpathSha256: capability.classpathSha256, configSha256: capability.configSha256, fixtureSha256: capability.fixtureSha256 },
  clusterId: config.brokerScope.clusterId, project: config.registeredResources.project, latestInspectedUtc: latest.completedUtc,
  emptyStoreAndJournal: true, proofOutputAbsent: true, checks, hashes,
  transition: 'Parent plans actual strict first-resource-sample plus wrapper-launch receipt then setup watcher handoff/exit; transition not yet executed or certified by this prelaunch supplement.' };
await writeFile(path.join(session, 'reviews/policy4/concrete-envelope.json'), JSON.stringify(result, null, 2)+'\n');
console.log(JSON.stringify(result, null, 2));
