# E4 integration independent review

Review instance: 1 of 3. Attempt 1 cycle 1. Verdict: **Not ready**.

## Findings

**P1: Runtime store/journal resources need exact binding to watched registry.** `FinancialRateProbe.kt:334-338` validates only containment of stateDir/ackJournalDir/proofDir under ownedRoot. `rate-supervision.mjs:7-17,31` binds command/output and independently validates registered paths, but never equates config runtime store/journal paths to supervisor or physical manifest paths. Runtime can use another sibling directory while supervisor and physical collector measure empty registered directories. Disk allocation above envelope may therefore evade monitoring; cleanup can address wrong resource registry. Small correction: before launch, load pinned config and require identical ownedRoot, exact registeredResources and exactly three local category/path identities across config, runtime fields and supervisor; keep defensive Kotlin validation. Add negative mismatched-store/journal/registry controls. Reproduction `registry-mismatch-control.json`: mismatched watched store and journal accepted by actual validator.

**P1: E3 gate accepts declaration without raw proof or dirty-candidate binding.** `bootstrap-calibration.mjs:freezeBootstrap` and `FinancialRateProbe.kt:331-333` check declared PASS, sourceHead, fixtureSha256 and SHA-shaped evidenceSha256 only. No raw correctness evidence file is opened; candidateSha256/build/config/classpath are not reconciled. Different dirty implementations share baseline sourceHead, so earlier proof or invented 64-character hash can authorize new bootstrap load. Small correction: owned raw correctness evidence with checked hash, PASS semantics and exact current candidate/build/classpath/fixture plus documented config/image scope, verified before load in executable boundary. Manual current-source E3 run remains required evidence, but should feed enforceable launcher gate.

**P2: Frozen config omits required proofDir.** `bootstrap-attempt1/frozen/config.json` inspected during pass has localResources proof path but no proofDir. `FinancialRateProbe.kt:336-337` dereferences absent node; actual bootstrap/recovery refuses before load. Configuration repair needs proofDir equal exact registered proof path, then refreshed config/capability/review/request identity. This is preparation artifact defect, not source freeze drift. Root subsequently reports repair and refreshed actual capability; later preparation state outside original snapshot, not source correction.

## Plan Review

Canonical E4-A/B/C/D and RFC10.1 inspected. Fixed empirical 1000 settled +100 pending bootstrap is appropriate bounded experiment gate while ordinary 150k arm remains refused. Ordinary heap policies retain conservative evidence requirement; bootstrap never invents upper bound or capacity claim. Journal batches data/index/witness/publication force, preserves logical ordinal versus physical offset and disk-backed historical membership; actual main membership/admission/observer consume journal. New JVM reopens managed state and journal, validates certified full owner/history cut, no historical admission times; complete committed result replay rejects extra publications. Physical collectors preserve exact topic/replica identities, raw API receipts, allocated versus logical sizes, signed deltas and unknown category/native/CPU scope. Owned supervisor spans setup through worker exit and final handshake. Cold activation callback executes during processor init and requires all2100 recovered members, certified ordinal2099/physical journal offset plus owner/history equality without fresh input. Parent/child close precede committed result endOffsets cut; replay consumes entire cut and rejects extra records/ordinals. Physical collector subprocess remains in detached owned wrapper group, with bounded drain/failure receipt; outer supervisor kills whole group even after leader exits. Resource cross-binding and raw E3 provenance are missing enforcement boundaries, blocking bounded launch readiness.

No heavy pivot required. Local fixes fit existing architecture. Actual same-source E3, bounded bootstrap, full final Kotlin suite, owner docs/current evidence/retention and delivery remain pending; passing component reviews cannot complete E4 acceptance.

## Author-Claim Reconciliation

| Claim | Evidence | Status | Consequence |
| --- | --- | --- | --- |
| Diagnostic cannot authorize ordinary rate arms or invent upper bound | bootstrap freeze/guard and ordinary heapGuard/estimateHeap | Confirmed | Retain separate diagnostic scope |
| Raw fixture/config/CP/build/review/source bound | verifyBootstrapEvidence and bootstrapGuard, source/build capability | Confirmed for stated fields | Final identities must refresh after fixes |
| Raw E3 proof bound | freezeBootstrap and bootstrapGuard only inspect embedded declaration/hash shape | Contradicted | P1 gate correction |
| Exact owned store/journal/proof envelope | supervisor validates independent registry, config containment only | Incomplete | P1 cross-binding correction |
| Actual separate JVM, full certified activation, complete committed replay | bootstrapRecovery and parent ProcessBuilder; endOffsets replay | Confirmed source path, actual execution pending | No empirical restart/capacity claim yet |
| Logical bytes not promoted allocated; signed deltas | PhysicalInventory/physical-evidence/physicalDelta | Confirmed bootstrap scope | Ordinary legacy metrics remain narrower |
| Node exact workflow pass | integration/exact-node-first command/result/source receipts | Confirmed receipt exit0/sourceStable | Does not replace live experiment |

## Verification Performed

Read-only source/test review of all modified Kotlin and Node implementation files plus focused changed tests and CI diff. Checked frozen 23-path SHA256 manifest against working tree twice: no drift. Verified baseline and HEAD29a8926d33f9e2dc7278a1676a6fa3272628de3c, branchcodex/calcify-e4-readiness. Read canonical requirements, repository invariants/context, RFC10.1 and author explanation after saved preliminary ledger. No inherited implementation history; task bootstrap supplied narrow prior-check testimony.

Executed `node --test scripts/dev/calcify-financial/bootstrap-calibration.test.mjs scripts/dev/calcify-financial/rate-supervision.test.mjs scripts/dev/calcify-financial/physical-evidence.test.mjs scripts/dev/calcify-financial/physical-adapter.test.mjs scripts/dev/calcify-financial/proof-supervisor.test.mjs scripts/dev/calcify-financial/rate-proof.test.mjs`: **117/117 PASS**, no skips/failures, receipt node-controls.log. Executed actual `validateRateSupervisor` against differing runtime/registered store/journal paths: **accepted**, receipt registry-mismatch-control.json.

Kotlin compilation not rerun independently to avoid shared build writers; root supplied full93 earlier compile then3 focused final recompile testimony. Older ack-worker/final-test-receipt.json is72 tests and not final combined proof; kept scope distinct. Root exact37-file workflow receipt exit0/sourceStable inspected; log reports266/266 pass. Final same-source full Kotlin suite remains required after fixes.

## Open Questions And Residual Risks

Actual physical API/du timing under five-second combined window, new JVM restoration, live RF3/EOS behavior and real guard refusal remain unexecuted. Sampled heap protection cannot prove conservative retained/transient upper bound or prevent sudden OOM. E3 and bootstrap readiness are test-only; no production authority, SQL/API/full-system throughput qualification. Guard source/config identity does not by itself link source to compiler output; immutable compile receipts remain required provenance.

## Verdict

**Not ready** for bounded bootstrap until P1 boundary gaps repaired; preparation proofDir correction separately reported by root. This verdict applies to exact frozen source manifest, not later changes. No rate/capacity pass asserted.

## Recommended Next Actions

Root respond Accept/Dispute/Defer per finding; apply bounded corrections, refresh freeze/config/build/capability and use cycle2 independent pass if reviewed behavior changes. Then execute same-source E3 before fixed bootstrap, retain failures/raw cleanup receipts, review measured results and finish docs/retention pass. Review count remains1of3; no restart.
