# Whole integrated E4 review — Attempt2 Cycle3

Review instance: 3 of 3. Final cycle; no reset.

Repository `/Users/dsteele/.codex/worktrees/8c6f/reef`; branch `codex/calcify-e4-readiness`; base/HEAD `29a8926d33f9e2dc7278a1676a6fa3272628de3c`. Scope: working-tree integrated bounded E4 candidate, frozen 27 source paths in `review-preparation/source-frozen-attempt2-cycle3.json`, five changed owner docs, relevant E3/E4 plan and unchanged kernel/cut boundary. Untracked new source files included; unrelated `.kotlin/` build cache preserved.

Source-first ledger: `PRELIMINARY.md`, written before reading `AUTHOR_REPORT_ATTEMPT2_CYCLE3.md`. No author conversation inherited. Initiating operational bootstrap included implementation claims, so fully blind first pass impossible; dedicated rationale remained separate until preliminary review.

## Findings

**[P2] Append extra history as single record, not Iterable fields.** `services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialRateReferenceTest.kt:175` uses `verifyCompleteCut(history + history.last())`. Jackson `JsonNode` implements `Iterable<JsonNode>`; Kotlin resolves Collection-plus-Iterable, appending ObjectNode field values. Observer receives scalar child without `kind`, causing `NullPointerException` in `FinancialRateProbe.Reference.accept` at line102. Test expects `IllegalArgumentException`, so complete suite fails108/109; intended extra committed-record rejection never executes. Small correction: `history + listOf(history.last())`, then assert rejection message `duplicate timed economic action`. Preserve failed XML/log, prove corrected test reaches duplicate economic/history rejection, rerun whole suite on newly frozen source. Compiled constant pool independently confirms sole `CollectionsKt.plus` reference descriptor `(Ljava/util/Collection;Ljava/lang/Iterable;)Ljava/util/List;` in `compiled-plus-control.json`.

No additional actionable runtime/economic blocker found. Fixture bug does not imply actual complete-cut replay flattens records; live replay uses Kafka result rows and `forEach`, independently compares inputs/history count/checksum/full owner digest.

## Plan Review

Bounded test-only implementation matches E4 diagnostic prerequisites: exact prefunding; closed single hot domain; same kernel/API path; no per-action owner-wide copy; recoverable durable ACK membership; raw RF3/topic-incarnation/replica inventories; registered local and broker allocations; owned process supervision; separate JVM activation; complete committed-result replay. Fixed1000 settled +100 pending,2100 actions/2101 histories remains empirical. Frozen source/build/classpath/config and same-candidate49 E3 gates prevent old proof reuse.

Actual Reference keeps complete immutable canonical leaves across13 categories plus exact root scalars. Known-key reads parse individual leaves; complete deltas, journal groups, history frontier and checksum verified before writes. Streaming owner digest matches legacy canonical token order/escaping without full owner decoding/concatenation. Finite fixture `businessView` materialization stays outside live accept/digest. `clear` drops retained leaves before fresh replay owner. Tests cover2100 prefixes, independent BigInteger oracle,9712 leaves, constructor/write/read isolation, root types, null deletion, every complete-cut boundary and fact-sensitive digest; failing extra-record fixture needs repair.

ACK publication forces data/index/witness/publication before controller notification and visible membership. Recovery validates scope/hash/index chains, preserves unpublished tails, refuses torn/mutated publications; lost admission times remain unknown. Child activation checks2101 exact integral histories, hashes,ordinal2099 and last ACK offset; raw activation attempt emitted before comparison. Parent requires new child PID and complete result-only cut.

Physical evidence distinguishes allocated blocks from logical replica lengths. Actual Admin response rows bound raw receipts; source UUID/RF3 assignment and owned paths remain pinned. Node host brackets avoid assuming JVM clock origin. Category allocation/native/RSS/aggregate CPU unknowns remain explicit. Heap protection remains sampled strict80percent and finite client/record/journal bounds; no OOM or upper-cost guarantee.

Ordinary rate ladder, aged1m fixture, conservative cost upper, SQL/API seam and production authority remain unqualified. Accepted contracts/economic decisions unchanged. Docs describe earlier source scopes; final delivery must update compact candidate outcome and conditional lower-bound attribution, publish/verify retained bulk evidence and repair links. Active retention work is separate pending completion, not accepted by this source review.

## Author-Claim Reconciliation

| Claim | Evidence | Status / consequence |
| --- | --- | --- |
| Actual private owner replaced with immutable canonical string leaves; Reference internal test seam only | FinancialCanonicalLeafOwner; FinancialRateProbe.Reference; helper4 and Reference5 tests | Confirmed by source; no live owner materialization |
| Full financial109 expected; updated packet reports108pass/1failure | Whole log, preserved109/1receipt/XML and compiled plus control | Confirmed failure; fixture finding above |
| Structural retention regression fails old JsonNode owner | root-controls/owner-retention-red.xml/log | Confirmed semantic10/1 assertion failure, not compile failure |
| Strict integer2101/2099/hashes/memberoffset and raw activation retained | validateBootstrapActivation; bootstrapRecovery callback; regression tests | Confirmed source/whole test evidence |
| Prior actual49/bootstrap acceptance belongs24-path old candidate | Author packet scope and new27-path freeze | Scope preserved; prior acceptance cannot establish new compact runtime success |
| Fresh compact compile/current49/diagnostic/comparison required | Bootstrap source/build guards and E4 plan | Confirmed; none waived |
| Final publication/retention/current docs remain pending | Owner docs and author packet | Confirmed delivery gate; no completed PR claim |

## Verification Performed

- Reviewer `node --test` six affected financial Node suites:125/125,0 failures,0 skips; `node-controls.log`.
- Reviewer `git diff --check 29a8926d33f9e2dc7278a1676a6fa3272628de3c`: pass.
- Pure Node SHA check frozen source:27/27 exact; `source-freeze-check.json`.
- Read implementation-owner Gradle log/current XML:109 tests,1 failure,0 errors,0 skips; `financial-xml-check.json`. Reviewer ran no compiler, Gradle, JVM, broker or workload.
- Pure Node compiled class constant-pool inspection confirms plus Iterable overload; `compiled-plus-control.json`. Root research memo and retained bytecode corroborate checkcast Iterable at PC225 and plus(Collection,Iterable) at PC228.
- Codebase-memory project `reef-calcify-session-8c6f`, generation2026-10-05T07:02:27Z: new owner untracked, Rate/Broker metadata changed, PartitionCut metadata matched; complete targeted source fallback used. Graph not completeness proof.

## Open Questions And Residual Risks

New compact runtime owner/history hash equality, seven physical stages, fresh49 E3 acceptance and source/build-qualified actual cohort remain unverified in this review. Previous source evidence remains scoped. Sampled heap and finite diagnostic do not establish ordinary upper admission/rate/native/RSS/SQL/API capacity. Cold activation still reconstructs full committed history/state; bounded cohort does not qualify large recovery shape. Retention publication/current doc reconciliation must finish before PR delivery.

## Verdict

**Not ready.** Frozen27-path candidate has new failing negative-control test. No further actionable runtime blocker identified. Source-level readiness only after fixture correction and newly frozen verification; actual runtime acceptance remains separate regardless.

## Recommended Next Actions

Accept P2 fixture finding; preserve exact failure; correct explicit singleton append; rerun whole financial suite and appropriate independent review under initiating task's authorized next-attempt process. Complete fresh source/build/current49/bootstrap/actual-cohort checks before accepting compact executable. Finish owner docs/retention pass before delivery.

Attempt2 Cycle3of3 exhausted. Reviewer starts no further instance and does not reset count or edit source. Initiating task must research correction and obtain/use explicit authority for any new attempt; unfavorable verdict alone does not authorize review-loop replacement.
