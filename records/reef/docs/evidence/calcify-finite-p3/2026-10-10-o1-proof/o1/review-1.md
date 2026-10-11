# Combined O1 independent review

Review instance: 1 of 3. Frozen combined unit, not component approvals.

## Findings

### P1 — Restored receipts bypass source semantic validation

Evidence: `services/platform-runtime/src/main/kotlin/com/reef/platform/calcify/FiniteLifecycleCaptureProcessor.kt:249–255`, `validateCertifiedHistory`; command branches at235–242. `FiniteLifecycleCaptureRuntime.initializeModel` certifies checkpoint through this validator.

Scenario: Start from actual12-record fixture checkpoint. Change first trade receipt price to999999999999 (cap100000000000), or trade.runId toforeign-run, or trade.source.sourceOffset to999, or replace both ExecutionCreated facts with blank default messages. Recompute affected envelope content digest, update matching first-batch certificate and exact capture-byte total. Orders, revisions, fills, previous effects, execution-ID set, binding and frontier stay unchanged. Every variant accepted by initializeModel. Separately change accepted cancel result order/engine/time towrong values; same bookkeeping update also accepted.

Direct parser/reducer would refuse these contradictions. Certified reconstruction instead validates trade dependencies, existence of two execution messages and filled units; omits trade price/current limits, run/source/instrument/currency/timestamp, execution identities/economics/roles and command relationship. Modify/cancel accepted result identity also omitted. SHA256 recomputation proves internally consistent encoding, not semantic correctness. Existing malformed-checkpoint tests similarly recompute digest, so certification cannot rely on digest being unforgeable testimony.

Impact: O1 restore returns PREFIX_CLOSED receipts containing source facts impossible under direct source path; claimed changed-history refusal and semantic replay parity fail. Subsequent reduce revalidates using same weak checker and preserves invalid history. Live refusal limits operational exposure, but does not satisfy O1 model restore guarantee.

Smallest correction: Share source/result/trade semantic checks with receipt reconstruction; validate full nested trade provenance/economics/execution facts against member command and current dependencies, plus accepted/rejected result identities. Add changed receipt tests with recomputed digest/certificate/counters; assert initialize refuses without mutation. No architecture pivot needed.

### P2 — Trailing JSON silently omitted from closed source coverage

Evidence: `services/platform-runtime/src/main/kotlin/com/reef/platform/calcify/FiniteLifecycleContract.kt:113`, `parse`. Strict mapper enables duplicate detection but does not require end-of-input; existing JsonCodec/checksum parser also reads first root only.

Scenario: Append ` {} ` to checksum-valid first real Go source value. FiniteLifecycleContract.parse succeeds; reduce emits prefix_closed=true, outcome_count=1, resume_offset=1. Full raw source byte count/digest includes second JSON object, while semantic checksum and member extraction ignore it. No checksum change required.

Impact: Malformed full source value gets successful coverage instead of atomic lane fault. Extra root can contain unrepresented facts; full-record acceptance contract newly exposes inherited helper limitation.

Smallest correction: Require exactly one root object and EOF after optional whitespace (for example strict mapper trailing-token refusal). Test second object, second scalar and trailing garbage through reducer/topology; assert no envelope/frontier mutation and retained bounded fault suffix. Whitespace-only suffix remains legal.

## Plan Review

Source-prefix plan sound and followed within declared O1 boundary: one complete source record/window, actual zero-trade closure, immutable acceptance versus revisions/effects, ordered nested trades, structured provenance, finite managed state and suffix accounting. Exact fixture12outcomes/8applied/4rejected/3trades/6units/15members/5orders established by current tests. Physical gaps/replay and model rollback/reopen exercised.

O1 incomplete at semantic restore and malformed full-record gates above. No heavy pivot, no scope split or new review stream warranted. Bounded fixes fit existing producer/contract/capture unit. O2 ingress/durable binding/authenticated writer isolation/physical limits/snapshot and live transaction restart properly excluded and explicitly refused. O3–O5 still dependent on accepted predecessors.

Owner docs/fixtures/contracts updated; manager WORK_PLAN/.planning excluded from56-path freeze. Component archive no-op applies only active new context; final manager delivery/retention publication remains open, as combined explanation states. No missing live qualification converted into O1 finding.

## Author-Claim Reconciliation

| Claim | Evidence | Status / consequence |
| --- | --- | --- |
| Optional typed facts preserve mode-off bytes/P0 v1 hash | Producer diff, app identity test, Go focused packages, paired legacy16647-byte SHA256 fixture | Confirmed within source/test scope. |
| Real Go fixture drives15 members and full zero-trade lifecycle | ProcessOnce tests, fixture/manifest, independent23 Kotlin tests | Confirmed. |
| Whole source shape validated before successful capture | Contract parser and malformed tests; trailing-root probe | Contradicted for trailing bytes; P2. |
| Certified history checks exact dependencies and execution completeness; changed history refuses | validateCertifiedHistory, existing negative restore tests, independent mutation probe | Contradicted for nested semantic facts/results; P1. Structural omissions tested do refuse. |
| No decoded cache; managed rollback/reopen parity | Processor re-reads store; rollback/reopen tests | Confirmed for tested managed-byte model paths; semantic restore gap remains. |
| Finite encoded caps and fault suffix abort | Current budget/state guards, focused cap/high-watermark tests, retained StateCapProbe testimony | Confirmed guard design/tested logical cases. Author exact6307840/6307841 probe inspected, not independently rerun. No physical/RSS/capacity claim. |
|205 Calcify tests green; Go full/race/vet; proto governance | Retained final result JSON30reports/205tests/0failure-errors, final logs, Go receipt log hashes, proto governance log | Recorded author runs confirmed as receipts; independent execution limited below. |
| Live activation remains unavailable | Go StartRunner and RestoreCommitted gates; Kotlin run() | Confirmed; no broker/live recovery qualification. |

## Verification Performed

- Neutral bootstrap first; applicable AGENTS, AI_CONTEXT/map, canonical O0 contract, overnight O1/O2 plan and steering read. Preliminary ledger written before combined and component author explanations.
- HEAD/base45211653d2f5b59dd25f4a4db42883881b4d6eb1; branch codex/calcify-p3-overnight-2026-10-09. All56 combined-files hashes verified before/after review. Canonical source-contract hash equals accepted eec721aa60c1b64a7bada0a973b7b5d4e77510454e9e853fcd8a6a6f8f7c6739. No source/Git/broker changes.
- Codebase-memory project/index/search/coverage: reef-main generation2026-09-30, different checkout; producer metadata changed/new Kotlin missing. Current-source reads for material claims; no exhaustive graph claim.
- `GOCACHE=/private/tmp/reef-o1-review1-gocache go test ./internal/app ./internal/streamdirect`, matching-engine cwd: exit0, both packages pass. Shell login emitted unrelated parse notice; test subprocess results green.
- `JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home ./services/platform-runtime/gradlew --no-daemon -p services/platform-runtime test --tests 'com.reef.platform.calcify.FiniteLifecycle*'`: sandbox exit1 on existing Gradle wrapper lock permission. Exact authorized escalated retry exit0,23tests/0failures/0errors/0skips,9s. Manager exclusive lease used and released. Retained original failure.
- Java21 source-mode `/private/tmp/RestoreProbe.java`, `-Xmx192m`, author documented compiled classpath, platform-runtime cwd: two executed probes exit0. Five independent invalid restored variants accepted; appended second root parsed and reduced to closed prefix. No topology or live broker invoked. Original immutable fixture state retained; source files unchanged.
- All43 author recorded compiled-class hashes match current files after focused build/probe. Probe therefore uses frozen-source bytecode identities, bounded43-path statement only.
- `git diff --check`: exit0. Go receipt logs hash-checked, final205-test author JSON totals independently summed. No full205-test reviewer rerun, race/vet/generated regeneration or live check claimed.

Complete reviewer commands, raw successful/failing logs and bounded probe source retained in `review-1-verification.json`; preliminary observations in `review-1-preliminary.md`. One source read initially blocked by read-call hook; bounded current-source reads retried successfully. Evidence lookup initially used absent Go verification.md; corrected to actual verification.json.

## Open Questions And Residual Risks

No unresolved scope ambiguity or heavy-pivot gate. Self-contained serialized receipts cannot prove correspondence to original source by digest alone; O2 still owns actual durable cut/topic/history certification. O1 must at least restore same semantic guarantees it applies to fresh source, which findings target. Logical guards do not prove worst-case allowed producer input fits envelope, broker/native memory or operational cost; explicit O2 preflight retained. Final manager archive/delivery pass not yet completed.

## Verdict

Not ready.

## Recommended Next Actions

Manager reconcile findings with owners; bounded shared validation/trailing-token fixes plus adversarial restore/full-value tests. Freeze updated combined56-path-or-declared-revised boundary; fresh independent review instance2of3 after material fixes. Preserve failures and review cap; no O2 adoption before accepted O1. No new reviewers dispatched by this review.
