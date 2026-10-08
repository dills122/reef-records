# Independent delivery milestone review

Review instance: 1 of 3. Empirical evidence/sprint reconciliation; implementation policy4of4 and earlier E4 qualification3of3 unchanged. Neutral bootstrap read first; preliminary.md saved before adjacent author testimony. Read-only source/docs; only reviews/delivery1 artifacts written. No load, Gradle, source edits, commits, pushes or delegation.

## Findings

No actionable findings remain in reviewed empirical/sprint/P3 content.

**Closed P2 — CPU temporal scope overstated.** Initial frozen `docs/THROUGHPUT_BASELINES.md:1534` and latest verification JSON `arms[2].cpuScope` claimed321184ms included result-only replay. `FinancialRateProbe.kt:874` captures baseline before timed load;`:880` captures elapsed process CPU after producer flush/full observer coverage. Owner digest`:895` and replay`:941–955` follow. Incorrect scope could distort cost comparison. Root corrected owner ledger/JSON to timed load through coverage/drain, inline worker/producer/observer validation, excluding later owner digest/replay/final serialization and brokers. Numeric unchanged. Author testimony retains original with explicit correction. Updated source-freeze.json six hashes verified; original freeze preserved separately. Finding closed within same instance; no code behavior changed.

## Plan Review

RFC first experiment sprint and P0–P4 ladder remain authority. Work plan records bounded unreserved kernel keep; finite source-prefix recommendation; reservation owner acceptance pending; bounded E3 retain; empirical cost measured with target miss. No production authority, full sprint exit, full-path capacity, managed restart, aged-state or conservative resource qualification asserted.

Next task matches existing P0 prerequisite to P3: isolated finite opt-in source profile binds retention0, source ownership and finite resources; terminal duplicate/restore acceptance before lifecycle coverage/admission/runtime financial/SQL/API work. Matcher retained `(run,order)` check (`order_index.go:59`) and terminal eviction (`terminal_retention.go:79–108`) establish scope; positive-retention reuse is intentional (`terminal_retention_replay_test.go:397`). Restore V4 checks configured retention (`service_snapshot.go:169–177`). Existing retention0 prevents eviction, not arbitrary unbounded admission. Proposal states finite profile only and preserves legacy semantics. Source/lifecycle closure, durable financial order, runtime kernel mapping, one epoch/version-checked SQL bundle, common read snapshot, repair/restart remain explicit P3 dependencies. Authority adoption and numeric SLO choices remain owner decisions. No architecture pivot required.

## Author-Claim Reconciliation

| Claim | Evidence / status | Consequence |
| --- | --- | --- |
| Arm3/4 target miss with no measured deadline rate | Recomputed journal272154/136077 and297280/148640, zero tails; kernel path requires published membership (`FinancialRateProbe.kt:755–759`,`:582–589`). Confirmed count upper bounds. | Any-cut settled count below150000; no actual deadline settlement rate reconstructed. |
| Arm5 deadline63104/60s and final150000 distinct | Frozen measurement, assessment, policy and counter boundaries`:725–729`,`:802`,`:877–881`; rate recomputed1051.7333333333333. Confirmed. | Producer132040ms/drain8139ms and rate/lag failures retained; later completion cannot qualify target. |
| Complete300001-history parity/result-only replay | Executed parity receipt hash matches measurement; independent fixed BigInteger reference`:79–146`, observer`:788–805`, replay`:941–955` validate exact inputs/deltas/journal/sequence/checksum/owner. Confirmed executing-probe assertion and source sensitivity. | Reviewer did not independently replay absent raw result-topic export; no new managed restart. |
| Closed input journal exact300000 actions/150000 pairs | Re-executed inspected offline reader validates frames, SHA chains, ordinal index, mirrored publication witness, scope and every arm5 full synthetic payload; source112172230B matches measurement, raw bytes unchanged. Confirmed. | Input proof does not independently certify output economic history/deadline clocks. |
| Heap3962293592/RSS4726587392/allocation peak11773079552 | Measurement scope and53 live project allocation rows recomputed. Confirmed sampled separate scopes. | No continuous memory/disk bound, native guarantee or causal bottleneck attribution. |
| CPU321184 includes replay | Contradicted source, corrected owner/JSON and author companion. | Closed P2 above;5.353 normalized by60s remains cohort cost expression, not utilization. |
| Kernel/adapter unchanged; prior49 scope reused | Current source SHA matches frozen correctness binding and prior proof SHA. Confirmed source compatibility. | Timed probe/config/build differ; prior recovery evidence cannot qualify new timed cohort. |
| Source tests279/112 pass | Raw receipt SHA matches, Node log279 tests/pass0fail;11 JUnit XML files sum112tests0fail0error0skip. Confirmed historical executed receipts. | No new test execution claimed. |
| Cleanup preserves volumes | Arm3/4 exact3 exited, empty owned-JVM/errors; arm5 exact IDs allExited/ownedJvmAbsent/errors0. Confirmed closed receipts. | Broker volumes and raw topic history retained locally, not archive exports. |
| Archive complete/retention closure | Publication currently pending. Unverified. | Distinct delivery gate; await immutable publication/inventory/link supplement. |

## Verification Performed

- Git HEAD1c143125049d18ee5c8c8cf473e7ed81ae25df8c and branch match bootstrap; five tracked docs plus explicit untracked latest JSON included. Executed run baseline863503ec plus frozen dirty implementation; post-run commit does not relabel runtime provenance.
- Six initial frozen SHA hashes and six corrected hashes pass. Measurement/parity/config/fixture/prior correctness/kernel/adapter hashes pass. Existing integration raw receipt SHA hashes pass.
- Re-executed journal-offline-inspect.py, arm4 andarm5 variants through in-memory output-path replacement into reviews/delivery1 only; no source journal writer/recovery instantiated. All prefix/frame/index/witness/hash checks pass; arm5 full expected payloads pass.
- Rate63104/60s and CPU321184/60000 recomputed.53 projectAllocatedBytes rows peak11773079552;54 total JSONL rows include one nonallocation row. Initial reviewer assertion compared54 total to53 allocation; corrected predicate and preserved correction in receipt-validation.json. No evidence correction needed.
- Node receipt/log279/279 and JUnit XML112/112 recomputed. Cleanup receipt predicates pass. `git diff --check` passes.
- Codebase-memory Verify project/root/generation checked, graph exact reserveOrder lookup and cited-path coverage checked. FinancialRateProbe coverage metadata_changed; direct source used. Matcher/kernel paths metadata_match, best-effort caveat; no exhaustive graph absence claim.

Durable check outputs: freeze-validation.json, corrected-scope-validation.json, receipt-validation.json, final-count-validation.json, arm3/4/5-journal-recomputed.json, preliminary.md.

## Open Questions And Residual Risks

Complete output topics remain on local broker volumes. Reviewer has independently validated complete source journal and source assertions/receipt bindings, not recomputed full result/owner history from an exported raw output stream. Sampled memory/allocation costs exclude scopes documented above. Resource gaps, failed producer/drain/rate/lag gates and no production capacity remain explicit. P0 contract adoption/finite deployment scope and P3 authority choices remain future owner decisions. Archive destination/retained inventory/immutable links need same-instance supplement before delivery closure; current originals must remain available until verified publication.

## Verdict

**Ready** for bounded empirical evidence/sprint decision reconciliation and proposed P0→P3 handoff, after closed CPU correction. Code implementation readiness not re-reviewed or reset; existing4of4 result retained. Earlier bounded qualification3of3 retained without expansion. Full sprint exit and production capacity not earned.

**Delivery retention closure pending** immutable Records publication, verified destination and current inventory/link repair. This pending gate does not invalidate observed rate/count evidence. Verdict covers current six corrected owner/evidence paths and listed immutable closed read inputs; publication supplement may be checked in this same review instance.

## Recommended Next Actions

Verify immutable archive selection/destination/checksum/reassembly plus current retention inventory/link changes when supplied. Preserve originals/corrections and all failures. Continue proposed finite isolated source-contract task after owner accepts intended source scope; do not restart optimization or capacity review loops from this report.
