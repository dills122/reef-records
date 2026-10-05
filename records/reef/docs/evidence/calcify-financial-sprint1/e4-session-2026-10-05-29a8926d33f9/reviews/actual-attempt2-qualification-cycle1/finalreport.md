# Actual Attempt2 diagnostic qualification review

Review instance: 1 of 3. Actual qualification/operator milestone Attempt1, actual execution candidate Attempt2. Same cycle includes preliminary, prerequisite clearance and failed diagnostic review. Separate whole-code Attempt2 cycle1 Ready remains dated code evidence.

## Findings

**P2 — Use strict integral value equality for managed activation history count.** Frozen `FinancialRateProbe.kt:587-588` compares `summary["historyRecords"] == request["historyRecords"]`. Summary produced by default `ObjectMapper.valueToTree` at line43 over `FinancialKernel.historySequence(): Long` (line277); child reads serialized request with default `ObjectMapper.readTree` at line568. Retained request contains integer2101, within Int range. Pinned Jackson2.22.3 bytecode confirms `IntNode.equals` and `LongNode.equals` require their own node classes. Equal2101 values across this process/serialization boundary can therefore fail comparison.

Observed failure matches this gate: child `bootstrap-attempt2/proof/managed-recovery/stderr.log` raises `BOOTSTRAP_MANAGED_ACTIVATION_PARITY` at line587 during real KafkaStreams processor initialization. Parent `proof/supervision/wrapper.stderr.log` raises `BOOTSTRAP_MANAGED_PROCESS_FAILED` at line853. Summary published only after combined owner/hash/history/ordinal/offset predicate succeeds; no child result exists. Thus actual owner/hash/source-cut parity remains unverified, even though numeric equality defect is established. No inference that fixing numeric comparison alone guarantees recovery.

Smallest correction: validate history count as integral numeric node with lossless conversion, then compare exact integer value; reject fractional/string/null/missing/out-of-range forms. Add serialization-boundary regression for parsed2101 versus Long-produced2101 plus refusal controls. Rerun fresh finite cohort, real new-JVM activation, result-only replay and all seven checkpoints on newly frozen candidate. Reviewer implements no fixes. Detailed evidence in `failure-finding.md` and `jackson-integral-equals.bytecode.txt`.

## Plan Review

Operator scope follows bounded canonical E4 prerequisites. Fresh exact49-arm proof and byte-preserving export pass; frozen13 input gate passes. Unique roots/run IDs preserve previous originals. Corrected cleanup binding and withdrawn old-count correction remain explicit separate artifacts. No operator source defect or architecture pivot established.

Actual diagnostic reaches retained warmed, before-settled, after-settled, after-pending and workers-closed physical snapshots, then fails managed restart. Seven-checkpoint acceptance, full strict oracle/history/state/journal/source agreement, final empirical artifact and managed recovery remain incomplete. These omissions follow actual failure, rather than merely planned not-yet-generated proof. Production authority/reservation/live matcher, SQL/API/full-system capacity and ordinary rate ladder remain excluded.

Review froze candidate `ff091a94a9b826b34010f9245719d14e13b53eb82f4fa4e721743ff31df3db8f`, source HEAD/base `29a8926d33f9e2dc7278a1676a6fa3272628de3c`, build `6b75608d82ab7e952dc27fdd38783b993740ae0d5d0810142c193bc4fea405d2`, CP `2c18b7a673503c831d0d8f5c009ba36a717e02251c6e273ff81c54ca069d19c2`. Preserved33 source/92 compiled financial snapshots verify exact candidate and actual49 plan hashes. Later live working-tree regression/fix work outside review boundary; line references above apply preserved source.

## Author-Claim Reconciliation

Blind preliminary saved before prerequisite author packet. Failure finding saved before final `AUTHOR_ACTUAL_ATTEMPT2_FAILURE.md` read. Both author packets reconciled against source/raw evidence; rationale not treated as proof.

| Author claim | Evidence inspected | Status | Review consequence |
| --- | --- | --- | --- |
| Actual current49 closed/PASS | Wrapper status/execution hash, all four actual plans/results, full source/CP pins, root confirmation, raw cleanup receipt | Confirmed | Valid prerequisite clearance,49 arms/1,054,051ms |
| Lossless export preserves entire original | Fresh streaming verifier exact814 originals/825 package files, index/whole-file chunk hashes/bijection/before-after original equality | Confirmed | Valid byte-preserving package; failed cleanup-envelope export separately retained |
| Current samples228/all3 measured225; prior report correct | Actual233 rows/five lifecycle rows; explicit measured vs charged bytes | Confirmed current counts; historical correction not needed for this verdict | No old report rewrite or rate comparison |
| Frozen13 inputs and broker-free gate pass | Own staged/frozen hashes and `verifyBootstrapEvidence` | Confirmed | Finite load prerequisite only |
| Diagnostic fails managed activation | Child/parent stack traces, actual recovery request, unpublished result, retained snapshots | Confirmed | Qualification Not ready |
| Parent completed2100 actions/2101 histories before child | Frozen parent guard at line835 requires ordinal2100/expectedHistory2101/settled1000 before actual recorded child launch | Control-flow progression confirmed; complete independent raw replay not performed | Preserve partial progress, do not credit final qualification |
| Numeric width explains whole recovery failure | Frozen producer/reader/comparison source and pinned node-equality bytecode | Defect confirmed; other parity clauses unverified | Fix strict integral comparison, retain full recovery assertions and repeat actual run |
| Failed-run owned brokers exited | Raw root cleanup inspection against config IDs/labels/image/mounts; all three exited/Running=false/RestartCount0 | Confirmed | Owned cleanup observed; volumes mounted/preserved identities, no reviewer broker operations |
| No supervisor-finished exists; do not manufacture closure success | Failed-run tree lacks supervisor-finished; final author packet acknowledges CLI1 and absence | Confirmed | Separate actual cleanup observation from successful outer publication |

## Verification Performed

- `node operator-checks.mjs`: PASS1,304 source/operator/full CP pins,8positive and29negative pure gate assertions. No active raw tree read during first pass.
- Fresh `node verify-package.mjs ABS_ORIGINAL ABS_PACKAGE`: PASS814 originals/38,851,384B;825 package files/39,973,848B;78,825,232B combined. Correct original tree reassembly and exact package file set.
- `node actual-e3-checks.mjs`: PASS140 compiled financial/jar hashes, current source/runner/fixture/broker/CP plan identities,49 after PASS/read-committed oracle declarations/complete input coverage/increasing physical offsets and cleanup stdout equality.
- Own frozen13-copy hash and `verifyBootstrapEvidence`: PASS, bootstrap `db06b9b3f90f6f54c88b3b6735e236aeaa5cc7a54a343640ae55aec3bef7afc1`. Prospective prepared raw sum79,614,334B; failed earlier export additional retained bytes remain explicit artifact.
- Five actual physical snapshots pass historical snapshot-window/raw receipt/identity/replica/allocation validators. Saved `partial-diagnostic-physical-check.json`; these are partial evidence only.
- Read-only `javap` over actual pinned Jackson jar confirms width-sensitive IntNode/LongNode equals; no compiler, build, new load or source mutation.
- Preserved33 source/92 compiled financial snapshot bytes pass own size/hash/candidate checks (`frozen-snapshot-check.json`). Recovery command exact51 CP entries match capability.
- Failed-run raw cleanup inspection verifies exact3 IDs/labels/image/data-volume mounts exited,RestartCount0; SHA `82a53d12a9133edaa6395f05ae4bcf8d5a3b358b57b067d21d2c392fdcbcce02`.

Reviewer check corrections retained in prerequisite report: first exploratory journal filename nonexistent; first measured-sample assertion incorrectly used charged bytes, yielding228; corrected explicit measured bytes yields225. No original artifact changed. Missing `proof/supervision/supervisor-finished.json` observed during failed-run reads; separate actual cleanup inspection verifies exited containers, while successful full outer publication is not claimed.

## Open Questions And Residual Risks

Actual child owner/history checksum/ordinal/source offset not published; cannot claim recovery parity. Final `bootstrap.json`, managed recovery result and final two physical checkpoints absent. Actual source/journal/oracle final agreement unproved for failed cohort. Runtime reaching activation implies preceding journal count guards passed, but reviewer did not independently decode membership binaries or convert those guards into final acceptance.

E3 resource228 observations/225 fully measured samples remain scoped to correctness: maximum charged project6,671,249,408B includes fixed3GiB fault target reservation; maximum measured broker-directory sum5,104,246,784B separate. Stopped target allocation and small E3 temporary stores remain unknown/outside registration. Actual diagnostic partial snapshots separately measure broker/local store/journal/proof allocations; logical replicated bytes retain separate units. RSS/native/CPU explicitly unknown. Sampled bounds are neither continuous peaks nor conservative retained-heap costs. No resource lower-bound refusal, prior code Ready, or partial1000+100 execution authorizes capacity claim.

## Verdict

**Not ready.** Actual bounded diagnostic qualification failed managed activation; required real recovery and seven checkpoints incomplete. Actual49/lossless-export prerequisite clearance remains valid for reviewed candidate and is not rescinded by later diagnostic failure. Whole-code readiness is separate from actual qualification.

## Recommended Next Actions

Root reconcile finding, complete bounded numeric audit/focused correction and relevant whole-code review under existing counters; preserve failed raw journals/state/encoded records/snapshots/cleanup and unpublished activation limitation. Freeze corrected candidate and rerun full bounded diagnostic with actual gates. Subsequent actual qualification review uses instance2of3; no review-counter reset, no further reviewer agents or implementation dispatched.
