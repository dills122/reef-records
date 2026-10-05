# E4-B collector response to attempt1 cycle1 review

Candidate frozen for cycle2. Prior handoff/history preserved; this note supersedes its raw-receipt, category mapping, absent-local and telemetry contracts. No Ready/live/RF3/capacity verdict claimed.

All four P2 findings **Accept**:

1. Raw semantic binding: inventory requires exactly two distinct operations, describeTopics and describeLogDirs. Payloads must parse as actual JSON with typed schemas and exact frozen requests. Topic receipt provides exact UUID/partition/replica assignments and null API error. Log-dir receipt supplies exact three broker IDs, absolute owned-root log directories, null errors and actual replica size/isFuture fields. Collector derives normalized owned replicas from raw rows; comparison catches size/identity/incarnation/path/partition changes even with recomputed raw hashes. Topic UUID comes from describeTopics; Kafka log-dir rows do not claim independent UUID. Duplicate/missing/extra registered partition rows fail. Unregistered topic rows remain complete raw evidence but excluded from owned logical total. Normalized inventory hash remains additional publication-integrity control.
2. Category ownership: all nonempty categoryMappings rejected PHYSICAL_CATEGORY_MAPPING_UNSUPPORTED. No category measurement from arbitrary evidence text/path. Source/changelog/output allocated totals remain unknown/null until verified mapping capability exists; fabricated measured category mutations rejected. Broker-root allocation still measured separately.
3. Missing local scope: localCategoryAllocatedBytes maps each category to measured allocation or unknown/null with reason. Missing/empty registration remains explicit unknown. Registered path genuinely returning du0 reports measured0. localAllocatedBytes remains sum of registered paths only, paired with localAllocatedScope='registered local paths only; missing categories excluded and unknown'. Local aggregate and delta exclude absent categories; do not treat aggregate as complete local footprint when any category unknown.
4. Telemetry: validator enforces exact prescribed rss/native/cpu unknown object; absent fields, fabricated measurements, invented reasons or extra telemetry rejected. No process-scoped receipt API implemented.

## Revised producer schema

Inventory envelope unchanged: calcify-replica-inventory-v1/runId/provenance/window/topics/replicas/rawReceipts. Required receipts:

```json
{
  "operation": "describeTopics",
  "startedAtMs": 1000,
  "completedAtMs": 1001,
  "bytesSha256": "SHA256 of exact rawJSON bytes",
  "rawJSON": "JSON-encoded calcify-admin-topics-raw-v1 payload"
}
```

Parsed topic payload: `{schema:'calcify-admin-topics-raw-v1',request:{topics:[exact frozen names]},response:{topics:[{name,topicId,error:null,partitions:[{partition,replicas:[brokerId]}]}]}}`.

Parsed log-dir payload: `{schema:'calcify-admin-log-dirs-raw-v1',request:{brokerIds:[exact frozen broker IDs]},response:{brokers:[{brokerId,logDirs:[{logDir,error:null,replicas:[{topic,partition,sizeBytes,isFuture:false}]}]}]}}`; operation describeLogDirs. Actual error serialized as non-null error object/string fails. Future replicas fail instead of silently conflating migrating copies. Raw logDir must be `/var/lib/redpanda/data` or descendant. Actual Kafka replicaInfo can additionally preserve offsetLag/raw fields; selected normalized comparison only uses semantic owned fields above. Unregistered topic replicas preserved in raw JSON but excluded from selected measurements.

Root accepted schema before implementation and owns real Admin serialization. Producer must serialize actual TopicDescription/LogDirDescription/ReplicaInfo values, not a newly asserted copy of normalized inventory. All data stays test-only finite owned scope; collector alone cannot authenticate external response origin beyond frozen source/config/provenance and raw-semantic correspondence.

## Budget control

Manifest optional rawProofBytes defaults unchanged256MiB; only positive safe integer <= existing BUDGETS.rawProofBytes accepted. execFile maxBuffer, incremental raw charge, bounded API path read, validator payload sums and serialized-raw bound all use frozen cap. Focused control freezes1024bytes, returns actual inspect JSON larger than cap, refuses before any exec and preserves failure receipt. Production safety threshold not raised. Five-second maximum sample/collection freshness retained. All default collector ownership/stopped/symlink/time/hash/unit safeguards retained.

## Reproduction and corrections

- cycle2-red-review-findings.txt:12 controls pass,5 meaningful failures before patch; review4P2 plus practical lower-raw-budget control reproduced.
- cycle2-green-attempt1.txt:16/17 pass. Prior normalized-size mutation control expected HASH; semantic binding now rejects earlier RAW_REPLICA_BINDING_DRIFT. Failure preserved and assertion corrected to earlier precise failure; separate normalized hash mutant retained.
- cycle2-green-attempt2.txt:18/18 focused controls pass, including raw request/broker cardinality/duplicates/registered partition range/negative size/log-dir scope, foreign raw preservation, category mutation, measured0 versus absent unknown.
- cycle2-syntax-check.txt: success.
- cycle2-source-after.sha256: implementation3591634ab38f7a6d6e65663ba14d1a2a99641549e04777010ecf7e3c42672a54; tests52c69bc8d10e305abb64e9c575c7de3e8806d6cd6ea1edb735b9b130366ad865.

Initial patch failed context match before editing; corrected targeted patch applied. No source edit after candidate freeze. No Docker/live collector/build/dependency/git operations. Root owns fresh independent cycle2 reviewer, actual supervised RF3 collection, contracts/owner docs/integration and retention/archive pass. Worker scratch retention no-op: complete RED/GREEN/correction bundles preserved, no tracked superseded record removed.
