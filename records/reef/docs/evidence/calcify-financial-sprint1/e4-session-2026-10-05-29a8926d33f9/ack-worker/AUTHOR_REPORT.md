# E4-A ACK journal author report — Attempt1 cycle0

Scope: test-only local durable ACK evidence. No new financial authority, broker durability claim, managed restart qualification, or independent Ready verdict. Root owns RF3 restart integration, resource envelope, delivery docs, contracts/evidence review, retention and Git.

Owned source: `FinancialAckJournal.kt`, `FinancialAckJournalTest.kt`, `FinancialRateProbe.kt` under `services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/`. No other source files edited by ACK worker. Shared scripts/root/physical changes preserved. Baseline `29a8926d33f9e2dc7278a1676a6fa3272628de3c`, branch `codex/calcify-e4-readiness`.

## Architecture/API/lifecycle

`FinancialAckJournal(directory, Scope(runId, topic, topicUuid, partition, domain), queueCapacity, batchSize, batchMillis, maxBytes, boundary, onPublished)` acquires exclusive directory writer lock; validates scope/generation/files; streams complete published history/index integrity; preserves unpublished tail with raw copies plus forced SHA-256 recovery receipt; truncates only unpublished active tail; starts single writer only after recovery. Published history corruption/missing/torn bytes refuse construction before state activation.

`callback(...)` copies raw source payload into bounded queue; overflow/invalid bounds stick failure. Raw source payload bytes/base64, SHA-256, byte count, exact topic UUID/run/partition/domain, logical ordinal, physical offset, phase/kind/trade, offer timestamp, callback timestamp and original process clock scope persist in data frame. Logical prefix contiguous; physical offsets strictly increase with holes permitted. Scope clocks include run, PID and nonce. No source-only recreation of old controller admission timestamp.

Writer batches at most256 facts with at most10ms collection interval. Protocol: append data+16-byte ordinal index entries; force data; capture actual data force completion timestamp; force index; append+force publication witness; append+force primary publication; capture actual live publication force completion; notify controller; expose live lookup frontier. Four channel forces/batch, no full manifest rewrite or force/trade. Index entry stores data and publication byte positions. Marker carries preceding data-force timestamp, process clock scope and chained frame/frontier identities. Live force batch count, summed actual force duration and last publication force timestamp report separately; recovered past publication/notification timestamps remain unknown.

`member(ordinal)` uses disk index and bounded frame reads, verifies primary/witness, raw byte/hash identity and scope, returns parsed input with `dataForceNano`, original force clock and `controllerAdmissionNano:null`. No in-memory full JSON ACK prefix, no historical notification replay. `FinancialRateProbe.acknowledgedMember(...)` provides bounded10s hot/cold lookup with sticky failure checks. Actual rate topology membership and observer use same journal provider. Journal recovery completes before topology/Streams creation. Original live suffix semaphore16,384 remains.

Main callback success increments separately at actual callback event. Main controller admission increments only after forced publication notification, timestamp captured under short stage-counter lock. Offered/callback/admitted/decided/settled/deadline counters and snapshots use same lock; CAPTURE may decide before later SETTLE admission, with no pair gating. Callback topic/partition verified against journal scope. Send/capacity/pacing/drain/observer/provider paths check sticky writer health before financial work; final output checks health after journal close. Result replay explicitly names `result-only-replay`; no helper-only managed recovery claim.

Journal closes with5s writer join; timeout sticks failure, interrupts writer, closes channels and prevents result publication. Outer `use` idempotently closes on exceptions. JVM process halt tests perform no close/shutdown force.

## Frozen bounds/resource integration

- Source bytes1,024; encoded journal frame4,096; queue16,384; batch256; default10ms.
- Logical members at most6,000,000; historical disk index16 bytes/member. Recovery retains constant handful of bounded frames at once.
- Default aggregate journal logical cap256MiB includes data, index, both publication files, scope/lock and retained tail/receipts. Additional journal allocation separate from existing256MiB encoded proof allocation; both require combined root host/broker/local budget evidence.
- Finite constructor cap up to2GiB exists for later explicitly frozen policies. Actual main uses `ackJournalMaxBytes` from supplied calibration/policy spec; default256MiB; no automatic increase. Policy hash covers explicit override in run mode.
- Directory from config `ackJournalDir`, otherwise `<output-parent>/ack-journal`. Root registry/collector must register exact directory, measure allocated size separately from logical bytes, include retained tails, and monitor init→close→publication. Current rate sampler still root-owned for complete accounting integration.
- Tail preservation reserves raw copy+receipt within same cap. If preserving tail would exceed cap, recovery fails without truncating original bytes. Tail receipts record published count, old raw/index byte counts, retained filenames and SHA-256. Restart receipts may require raw resource-owner handling.

## Crash semantics/fault model

1. `before-data-force`: callback/data/index writes can be visible but no publication; restart excludes membership, retains/truncates unpublished active tail.
2. `after-data-force-before-publication`: forced facts/index do not imply published/controller admission; restart excludes membership and retains tail.
3. `after-witness-force-before-publication`: witness/primary disagree; restart fails closed. Availability limitation explicit; no repair or reclassification.
4. `after-publication-force-before-notification`: complete published frontier recovered; admission notification absent and timestamp unknown; no synthetic old deadline credit.

Witness rejects one publication component mutation or whole valid suffix truncation, including primary/witness emptied independently. Missing files, torn frames/markers, data/index mutation, duplicate ordinal/physical-order errors and topic-generation mismatch reject. Coordinated rollback of every journal component to same internally valid old prefix cannot be detected without external immutable anchor; no general rollback-detection claim.

## TDD/commands/evidence

All Gradle commands run from `services/platform-runtime`, shell `/bin/bash` with login disabled and `JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home`. Existing Gradle cache access required sandbox escalation. No Docker, broker load, volume mutation, commits, pushes, dependency additions or test exclusions.

Expected behavioral RED: `./gradlew test --tests com.reef.platform.calcify.financial.FinancialAckJournalTest --rerun-tasks`; exit1; 1 executed/1 failed, `ACK_JOURNAL_NOT_IMPLEMENTED` scaffold at callback. Raw `red.log`, fresh `red.xml` retained. Source hash before edits in `source-before.sha256`.

Environment attempts before RED: default zsh shell emitted `(eval):5: parse error near end`; corrected `/bin/bash`, login false. Sandbox cache attempt failed `FileNotFoundException ...gradle-9.8.0-bin.zip.lck (Operation not permitted)`; corrected authorized existing-cache escalation. Neither counted as behavioral RED.

GREEN1 focused command without rerun: exit1, 7 executed/1 failed. Test-control error: injected5,000-byte cap actually fit small first frame; final assertion masked await-failure absence. Corrected control to4,096 bytes; retained `green-1.log`, `green-1-failed.xml`. Three actual child halt boundaries already passed before correction.

GREEN2 same focused command: exit0, 7 executed/0 failed; `green-2.log`, fresh `green-2.xml`. Covers forced visibility, old-prefix restart lookup, real child process crashes, corruption/missing/generation, sticky queue/order/payload/cap, and no recovered notification replay.

Surrounding suite1: `./gradlew test --tests 'com.reef.platform.calcify.financial.*'`; exit0,72 executed/0 failed/0 skipped,2m24s. ACK8, Broker3, Committed3, Heap19, Kernel14, Oracle12, Partition13. Raw `financial-suite-1.log` and `suite-1-xml/` retained. Added recovered journal→actual rate provider→actual financial TopologyTestDriver flow and fourth witness crash control; broker-free scope.

Final candidate source hashes in `source-final-candidate.sha256`. Final exact-source surrounding suite rerun: same command, exit0,72 executed/0 failed/0 errors/0 skipped,2m28s. Raw `financial-suite-final.log`, fresh `final-xml/` and `final-test-receipt.json` retained. Suite1 preceded last force telemetry/lookup integrity/callback partition refinements; final rerun prevents attributing older compiled classes to final hashes. Java receipt `java-version.log`: Java21+35-LTS-2513. No tests excluded; Gradle task verified exclusions empty.

Frozen SHA-256: journal `a1600cadef1962822ea5d7bcbe32436ce5133d685f22624faa61f83a590fc933`; test `85127a857336a2f42193083354e7fb2533e22f1595392b38aa117a1a9e1d6a08`; RateProbe `10f2ceeaf4cb15c07b6820205cd67f511dec79204d0fce28c4bbfea940091a0d`. Root/heap worker notified source freeze and Kotlin compile handoff after final process exit. Later shared source edits belong subsequent candidate/review scope.

Graph context Verify supplied/current confirmed: project `reef-calcify-session-8c6f`, root exact, generation `2026-10-05T07:02:27Z`,14,569 nodes/75,204 edges. RateProbe coverage metadata_match/no recorded issue, best effort not completeness. Direct source reads for owned changes; new source not claimed indexed. Read-call hook rejection retained as tooling correction, then same bounded read succeeded.

## Adjacent findings and root dependencies

`FinancialBrokerProbe.init` currently eagerly maps coverage indices into full ACK JSON membership list, even with disk provider. Root must switch to lazy list/bounded access and inspect PartitionCut for copies to preserve no full-prefix ACK JSON retention during managed restart. Existing coverage/history/state managed restoration may remain separately unbounded; do not expand journal claim to whole worker recovery memory.

Actual `FinancialRateProbe.main` still creates fresh input/results topics and does not independently provide full managed-restart workflow. Root owns dedicated RF3 managed restart path using recover-before-topology journal scope/provider, complete activation/history/state/source agreement and lost-notification semantics. Current helper `TopologyTestDriver` proves actual provider through financial processing; it cannot prove real RF3/changelog restore/EOS recovery.

Root integration must update frozen spec and exact resource registry/build identity, capture journal allocated bytes/force overhead, preserve original E3/heap acceptance scope, and carry new Attempt1cycle0 independent review. ACK worker does not certify Ready. Owned source frozen after final run; root/heap worker receives exclusive Kotlin compile ownership thereafter.
