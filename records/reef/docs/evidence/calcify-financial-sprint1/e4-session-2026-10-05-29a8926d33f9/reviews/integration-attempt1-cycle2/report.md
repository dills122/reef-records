# E4 integration independent review

Review instance: 2 of 3. Attempt1 cycle2. Verdict: **Not ready**.

## Findings

**P1: Actual broker endpoint remains unbound to watched Docker resources.** `rate-supervision.mjs:59-63` validates config local directories and registered Docker identities before launch but never checks financial argv broker string (`args[6]`). `FinancialRateProbe.kt:614` creates broker clients from command-line broker; physical Admin inventories derive from that cluster while Docker inspect/du monitor registered local containers. Two RF3 clusters can both use broker IDs0/1/2; topic UUID and replica checks only reconcile metadata from chosen endpoint, not chosen cluster to watched Docker IDs. Wrong adapter endpoint therefore writes outside resource envelope and owned cleanup registry even though exact directory/registry checks pass. Actual exported `superviseRateAdapter` accepted `foreign-cluster.example:9092` through dependency/supervision boundary with correct registered resources; synthetic negative receipt `endpoint-mismatch-control.json`, no broker contact or payload. Small correction: pin exact bootstrap endpoint list and per-container host/port/container-port mappings in E4 config/registry; require actual argv equality and live Docker port mapping before launch and throughout samples, plus actual broker cluster identity matching frozen rig before any topic/load. Add wrong-endpoint, changed-port/cluster negative controls. Root accepts source correction; no operator exception or generic Ready claim.

Prior cycle1 P1 fixes confirmed: `validateBootstrapRuntime` requires canonical ownedRoot/stateDir/ackJournalDir/proofDir, exact category mappings and identical whole registry before dependency creation; nearest-existing ancestor checks reject symlinks/aliases. `verifyCurrentE3Evidence` and Kotlin `validateBootstrapCorrectness` require owned raw correctness/complete manifest, hashes and current Financial sources/runner/compiled classpath, four selected current plans and exact49 successful arms. Prepared config relative proofDir reproduced refusal during preliminary review; root preserved failure, corrected absolute path and refreshed actual capability/config hash. Rechecked mapping PASS and hash equality. No remaining prep-path finding.

## Plan Review

Canonical requirements E4-A/B/C/D and RFC10.1 E4 reviewed against actual path. Fixed1000-settled+100-pending bootstrap remains empirical finite diagnostic, rejects ordinary rate arms/cohort expansion, preserves actual768MiB heap with strict80percent sampled protection. No conservative heap upper bound or capacity claim manufactured. Ordinary150k arm remains refused by retained lower804000000>644245094 before transient costs; final ordinary evidence rebind remains separate task.

ACK journal persists callback visibility independently of forced publication/controller admission; batched4force sequence, bounded RAM suffix, complete disk-backed old membership and restart witness/chain checks. Main topology observer/admission use journal. Actual new JVM managed activation checks full certified owner/history/physical offset before output; old controller admission times remain unknown. Result-only replay closes workers, captures read-committed endOffsets and checks complete cut/economic parity separately. Physical collectors retain exact topic/replica identities and raw Admin/inspect/du receipts, logical versus allocated bytes, signed deltas and unknown native/CPU/changelog allocation categories. Supervisor spans initialization through publication/close and owns detached process tree; live endpoint mapping is missing link to same resource envelope.

Prepared E3 operator recipe `e3-preparation/wrapper.mjs` freezes serial external4/core24/golden20/activation1 with acceptedCandidate=false until root final freeze, full ordered3directory+48jar bytes/resources and pre/post per-mode verification. Exact outer owned group and fault-phase protocol retained. Recipe explicitly retains original small unregistered `/private/tmp` E3 RocksDB paths; no E4 local allocation/heap/capacity claim made for that scope. Actual49 must finish and populate owned raw proof before bootstrap gate can admit it. No heavy pivot required; endpoint correction local to current architecture. Whole E4 acceptance, experiments, docs/retention and delivery pending.

## Author-Claim Reconciliation

| Author claim | Evidence inspected | Status | Review consequence |
| --- | --- | --- | --- |
| Runtime local paths and registry cross-bound | rate-supervision and actual mode controls; Kotlin defensive paths | Confirmed | Prior P1 closed |
| Actual broker belongs to watched registry | FinancialRateProbe client setup; endpoint negative control | Contradicted for reusable harness | New P1, root accepted |
| Raw current49 E3 evidence enforced | Node verifyCurrentE3Evidence; Kotlin matching gate; semantic hash-rebound controls | Confirmed source gate | Actual current49 still required |
| Direct JAR plan hashing fixed | broker-proof.mjs explicit jar branch; direct-jar-green.json48verified | Confirmed scoped broker-free receipt | No actual E3 proof claim |
| Corrected full Kotlin96 then final focused6 | combined-financial-corrected-xml/receipt.json; bootstrap-cycle2-final.xml; changed walker/source diff | Confirmed scoped receipts | Full96 predates minor tree fix; final6 covers fix |
| Exact37workflow Node269 stable | integration/exact-node-corrected/result.json and logs | Confirmed scoped receipt | Kotlin-only later fix does not alter Node source |
| Current capability actual config/build/CP | frozen capability.json and refreshed config bytes | Confirmed retained artifact/config hash | Build provenance root-owned; no reviewer compile |
| Diagnostic neither upper bound nor capacity | BOOTSTRAP schema/freeze/result guard and FinancialHeapGuard | Confirmed | Keep strict labels |

## Verification Performed

Read repository AGENTS/context, independent-review skill, canonical requirements, RFC E4 and changed source/tests before author packet. Source-first preliminary.md saved, then root author report and worker corrective explanation read. Entirely blind pass impossible: initial neutral task supplied narrow prior-finding/correction testimony. Inspected working-tree modified/new scope and baseline/HEAD29a8926d33f9e2dc7278a1676a6fa3272628de3c, branchcodex/calcify-e4-readiness.24 frozen hashes checked before and after, no drift; source-after.json immutable target receipt.

Executed Node22.22.1 `--test` on bootstrap-calibration, rate-supervision, physical-evidence, physical-adapter, proof-supervisor and rate-proof test files: **120/120 PASS**, no skipped/failures; node-controls.log. Executed actual validators against relative proofDir: RATE_RUNTIME_DIRECTORY_MAPPING_MISMATCH, then repaired config exact mapping PASS and config hash matched capability. Executed synthetic wrong-broker endpoint control through actual superviseRateAdapter: accepted before dependency/supervision boundary, endpoint-mismatch-control.json. No brokers contacted, topics initialized or load run by reviewer. Kotlin compilation deliberately not repeated to avoid shared build writers; inspected retained96+final6XML and actual build/capability receipts. Graph coverage check reports Node scripts excluded and Kotlin metadata changed; source fallback used for all material claims, no graph completeness inference.

## Open Questions And Residual Risks

Actual same-source E3 correctness, empirical bootstrap, physical five-second collector timing, live managed JVM restore and sampled guard behavior remain unexecuted for current candidate. Sampled heap cannot prove conservative transient/retained bound or prevent abrupt OOM. Raw proof manifest is evidence gate, not cryptographic proof that all claimed runtime events occurred; selected current runner, immutable build/command and actual raw execution receipts remain necessary. Endpoint/source/config/build identities must refresh after correction. Test-only harness does not qualify production authority, SQL/API/full-system financial capacity.

## Verdict

**Not ready** for safe bounded E4 harness launch due one endpoint ownership P1. Prior two P1 findings closed; prep-path correction verified. Verdict bound to24 frozen source paths. No actual E3/bootstrap/rate acceptance asserted; no new review instance started by reviewer.

## Recommended Next Actions

Root accepted endpoint P1; implement pinned E4 endpoint/port/cluster mapping before load and focused failing/passing controls, refresh source/config/build/capability identities, then use third and final cycle of Attempt1 if needed. Actual49 E3 precedes bootstrap; preserve failures and raw ownership/cleanup receipts; complete result review and docs/retention before delivery. Review count2of3, no reset or parallel workstream.
