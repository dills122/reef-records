# E4-B physical collector candidate handoff

Frozen worker candidate; no Ready verdict, independent review or actual RF3 collection claimed. Ownership only new `scripts/dev/calcify-financial/physical-evidence.mjs` and `.test.mjs`. No Docker command, container lifecycle operation, dependency change, commit or push executed. Concurrent root/ACK edits preserved.

## APIs and integration

```js
import { freezePhysicalManifest, collectPhysicalEvidence, physicalDelta } from './physical-evidence.mjs';
const frozen = freezePhysicalManifest({
  schema: 'calcify-physical-manifest-v1', runId,
  provenance: { sourceCommit, sourceSha256, configSha256, fixtureSha256,
    buildSha256, classpathSha256, imageDigest },
  registeredResources: { project, containers }, // supervisor pins plus brokerId
  ownedRoot, localResources: [
    { id: 'state', category: 'localStore', path: statePath },
    { id: 'ack', category: 'controllerJournal', path: ackPath },
    { id: 'proof', category: 'proof', path: proofPath },
  ],
  topics, // [{name, topicId, category, partitions:[{partition, replicas:[brokerId]}]}]
  categoryMappings: [],
  executables: { docker: '/usr/local/bin/docker', du: '/usr/bin/du' },
});
const current = await collectPhysicalEvidence(frozen, {
  now: hostMonotonicMs,
  metadataSnapshot: async ({ signal, deadlineMs, manifest }) => normalizedInventory,
});
const signed = physicalDelta(frozen, baseline, current, hostMonotonicMs());
```

`sourceSha256` must be nonempty exact path/hash map, or `candidateSha256` valid hash. Required config/fixture/build/classpath hashes and image digest preserved verbatim. Container pins include full ID, brokerId, imageId, expected project/service/test labels and named volume names/destinations. Manifest automatically freezes default executable pins when omitted. Caller override must equal frozen pins.

Normalized inventory: `schema:'calcify-replica-inventory-v1'`, same `runId` and exact `provenance`, `window:{startedAtMs,completedAtMs,clockScope:'host-monotonic-ms'}`, exact topics without category field, complete finite RF3 replicas `[{brokerId,topic,topicId,partition,sizeBytes,logDir,error:null}]`, and `rawReceipts:[{operation,startedAtMs,completedAtMs,rawJSON,bytesSha256}]`. Raw JSON must be exact string bytes hashed with SHA256. Optional path substitutes for rawJSON only inside canonical ownedRoot; collector reads bounded file and verifies supplied bytes hash. Producer must supply actual Admin response data, preserve API errors and bind times to same host clock. Collector does not launch Kafka dependencies or fabricate snapshots.

Local paths must already exist, ownedRoot canonical, each local path canonical descendant, no overlapping paths. Missing paths fail with retained evidence; no zero inference before initialization. Baseline collection therefore follows initialization of state/journal/proof paths. Supervisor may separately implement checked prelaunch zero evidence. All three categories should be explicitly registered for complete local scope. Currently omitted local categories appear as numeric0 in localCategoryAllocatedBytes, with no corresponding measured allocation row; root/reviewer should treat absent category as unknown, not measured zero.

Collection: exact registered IDs only Docker inspect; verify ID/image/labels/exact named mounts and no bind shadow of data root; require all brokers running/nonpaused/nonrestarting/nondead before any container exec. Request injected Admin inventory; then exact-ID `du -sk /var/lib/redpanda/data` per broker, host `du -sk` per local path, optional exact-path category measurement. No stopped-container execution. Both real execFile timeout and collector race bound to <= existing five-second freshness window. Abort stops subsequent operations even if injected executor resolves late. Actual command raw input/output hashes, stdout/stderr/exit/error/time/units preserved. Failed collection attaches evidence to error.evidence, including partial receipts and injected metadata rawEvidence/rawReceipts when supplied.

Outputs separate logicalReplicaBytes, brokerAllocatedBytes, localAllocatedBytes, per-local-category totals, allocation rows with identity/path/receipt binding, raw normalized inventory/hash and command receipts. Source/changelog/output allocated categories remain unknown without complete frozen exact replica-to-directory mapping. Optional mapping requires exact known broker/category/path, exact nonduplicated replica membership, no overlapping paths and evidence string SHA256. Mapping provenance must be independently established before freeze; mock mapping control proves validator contract only. RSS/native/CPU remain explicitly unknown. No cost multiplier, logical byte renaming or continuous-peak claim.

Signed delta retains baseline/final/signed values; decreasing allocation classified reclamation, never clamped. costPerTradeBytes remains null because physical delta alone is not safe cost evidence. Baseline validates against its own completion instant; current sample validates freshness against now. API receipt and collector windows remain separately preserved; caller must align workload cut and measurement windows before attributing change.

## Validation evidence and corrections

- `red-missing-component.txt`: expected initial ERR_MODULE_NOT_FOUND before implementation.
- `green-attempt-1.txt`: first8 controls passed.
- `green-attempt-2.txt`: normalized inventory hash, mapping hash binding, category/local totals and abort continuation hardening passed8 controls.
- `red-unit-executable.txt`: meaningful receipt-unit mutation accepted unexpectedly;12/13 controls passed, unit control failed. Failure preserved.
- `green-attempt-3.txt`: fixed frozen executable/unit checks;13/13 controls passed.
- `syntax-check.txt`: node syntax check succeeded.
- `baseline.txt`, `source-before.sha256`, `source-after.sha256`: source identity. New component absent before RED; source-before pins existing supervisor read for budget/registry contract only.

Controls cover exact RF3 logical versus allocated distinction, frozen clone and finite manifest validation, missing/duplicate/extra replica and range/assignment errors, API errors, unsafe integers, byte unit errors, source/config drift, stale/future/span windows, Docker ownership/image/mount/stopped refusal before exec, strict KiB conversion/path validation, raw hash mutation, command failure/hang receipts, reclamation, unit/executable mutation, actual filesystem symlink escape, complete/partial category mapping, late executor after timeout, normalized metadata mutation and raw API receipt integrity. Test named “output overrun” currently covers failures/hang, not actual >256MiB payload execution. Bound exists in production collector/maxBuffer/final serialized-raw check; dedicated small-limit overrun control remains reviewer consideration.

No actual allocated source/changelog category measured. Parent owns combined CI, actual source snapshot helper, live supervised execution, owner docs/contracts/evidence publication/retention and fresh independent reviewer. Retention no-op for worker scratch: no superseded tracked record created or removed; complete attempt/correction bundle retained for parent archive pass.

One read-only search command blocked by local PreToolUse grep-count hook; corrected to targeted source read. No graph query used for excluded scripts subtree; direct source was authoritative.
