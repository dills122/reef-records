# Admin inventory component review

Review instance: 1 of 3. Admin inventory attempt1 cycle1. Verdict: **Ready**, scoped component within mandatory existing owned process-group supervisor.

## Findings

No actionable P0–P3 component findings. Preliminary direct-child termination concern reconciled against explicit outer ownership contract: process() terminates immediate Node only; descendants retain enclosing detached wrapper group and supervisor teardown signals whole group even after leader exit. This is not standalone descendant containment.

## Plan Review

FinancialPhysicalInventory.kt/Test.kt are new test-only files against baseline 29a8926d. Exact three source/output/changelog topics frozen from actual TopicDescription values. Three registered broker IDs must be unique; each topic partition requires all three replicas. API replies require exact topic/broker sets, stable UUID and ordered replica assignment. Normalization rejects missing/duplicate/unknown-partition/future/negative/unsafe replicas, log-directory errors and path escape. Actual DescribeLogDirs sizes remain logical replica bytes, distinct from allocated storage.

Raw topic/log-directory rows derive from Admin objects and are hashed; foreign replicas retained raw, excluded from normalized owned inventory. Metadata bound includes foreign rows. Serializer enforces 8 MiB aggregate inventory bound. Node collector validates raw-versus-normalized semantics and exact registered image/mount ownership before allocation probes. Whole registered broker directories plus exact local paths measured using allocated KiB; unsupported category allocation/telemetry remains unknown, no invented changelog attribution.

Snapshot captures same pinned Node host sample before Admin calls and after future completion. Raw receipts use conservative covering host interval, explicitly not individual API latency. Original JVM operation windows retain separate origin; no offset/shared-origin assumption. Futures share three-second deadline; clock processes have one-second deadlines. Collector uses aggregate five-second elapsed check, independent heap sensor stays live, process wait checks guard every 25 ms. Linux portability source check: PATH-based Node discovery/platform separators replace hard-coded macOS Node path; Linux execution not performed.

Runtime callsite inspected narrowly: bootstrap freezes manifest after Streams warm-up, invokes collectCheckpoint with same guard/Admin/pinned Node/script/proof root. Full bootstrap parser/config/execution integration excluded. No live RF3 or runtime qualification proved.

## Author-Claim Reconciliation

Source-first preliminary saved before reading admin-worker/handoff.md.

| Author claim | Evidence | Status/consequence |
| --- | --- | --- |
| Actual finite RF3/UUID/replica/raw API values | freezeManifest/inventoryFromReplies/snapshot/tests | Confirmed source semantics; no live broker receipt |
| Host covering samples separate JVM windows | captureHostClock/snapshot/future-path test | Confirmed; honest latency scope |
| Bounded API/process/output/metadata | Deadline/options/process/serializer branches | Confirmed local wait/output limits; descendant teardown depends supervisor |
| 11 passing tests | portable-node-final.xml, green-portable-node.txt | Confirmed retained evidence for current portable test hash |
| Frozen source | source-portable-node.sha256 vs current SHA-256 | Confirmed |
| Hard-coded Node test path unresolved | nodeExecutable() and portable receipt | Superseded: PATH discovery implemented; Linux unexecuted |
| Root owns supervised integration | rate-supervision/proof-supervisor launch/cleanup | Confirmed boundary; broader runtime readiness excluded |

Older source-frozen.sha256 binds pre-portability test hash 8aa1f959..., not current test. Correct current freeze is source-portable-node.sha256 and portable-node-final.xml. Earlier failures remain preserved.

## Verification Performed

Read scoped source/tests, canonical E4-B/E4-C and bootstrap guard contract, targeted runtime callsite, adapter/evidence collector and outer launch/teardown. Independent-review skill read earlier in reviewer task. No structural graph exploration needed for explicit known files.

Executed:

- node --test scripts/dev/calcify-financial/physical-adapter.test.mjs scripts/dev/calcify-financial/physical-evidence.test.mjs — 20 pass, zero fail.
- node --test scripts/dev/calcify-financial/rate-supervision.test.mjs — 3 pass, zero fail.
- node --test --test-name-pattern='owned group kills stopped TERM-resistant leaf after leader exits; unrelated sentinel survives|observer failure stops active owned wrapper/STOP leaf while sentinel survives' scripts/dev/calcify-financial/proof-supervisor.test.mjs — 2 pass; actual owned descendants killed, unrelated sentinel survives.
- git diff --check on scoped paths — zero output; files untracked, direct source inspection also performed.
- shasum -a 256 on scoped source — matches portable receipt.

Retained portable Kotlin XML: 11 tests, zero failures/errors/skips; green-portable-node.txt BUILD SUCCESSFUL with compileTestKotlin/test executed. No independent Kotlin/Gradle rerun; compiler ownership root-controlled. No Docker/live load/dependency/Git mutations. Edited only assigned review artifacts.

Frozen current SHA-256:

- FinancialPhysicalInventory.kt: 984d21564e57472525c28ddd72668645be76dd5f1e10e7e70c968dec68256c2c
- FinancialPhysicalInventoryTest.kt: 8a7045d480d55538ed162dc316e593205932eeaa987a529e3bc20bf43e34fb3c

## Open Questions And Residual Risks

Immediate Node kill can leave collector child until supervisor teardown; same-group ownership required for every live invocation. Node child timeout cannot be relied on after Node dies. Source-backed outer cleanup and actual group/sentinel tests support component contract; physical-checkpoint failure through live supervised JVM remains integration verification.

No live API/RF3 allocation measurement, Linux JVM run, complete bootstrap success/failure or source/config/image/CP qualification performed. Kotlin tests use actual API value objects/futures with mocked Admin transport. Component proves no scientifically reviewed heap costs/capacity.

## Verdict

**Ready** for frozen component under mandatory supervisor. Excludes unsupervised execution, whole bootstrap/runtime integration, diagnostic load authorization and capacity qualification.

## Recommended Next Actions

Root preserve whole owned process-group wrapper for live collectors; integrated failure control should exercise stalled collector/heap failure and descendant cleanup before load. Finish frozen identity/config/client/runtime gates, docs/evidence/retention pass, review integrated candidate separately.
