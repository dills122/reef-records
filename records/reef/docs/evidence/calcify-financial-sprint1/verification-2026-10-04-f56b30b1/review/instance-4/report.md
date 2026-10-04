# Independent review report

Review instance: 4 of 6. Full recovered code and plan reviewed, base97924e15642826a687db935a219d7927ae649ac8→head3435d7b0e5a21c8212bcabe18b60dd6196cf1bbc. Branch codex/calcify-sprint1-experiments. HEAD exact before/after; only untracked .planning/. Source read-only; reviewer owns instance-4 artifacts. Neutral bootstrap first; preliminary.md written before author.md. Earlier review reports not used to derive findings.

## Findings

**P2 — Validate physical-byte override before freezing E4 policy.** `scripts/dev/calcify-financial/rate-proof.mjs:32` selects `calibration.maxPhysicalBytesPerTrade` without validation; `preparePolicy:47–50` checks other calibration fields but excludes override. Frozen sample containing1trade/200000physical bytes, valid other fields and2500/s×60s arm yields default400000bytes/trade and60002001024fixed bytes, correctly BLOCKED. Adding override0 changes estimate to102001024bytes and status FROZEN; override−1,0.5,1 and JSON string`"bogus"` also freeze. String yields NaN estimates (serialized null), bypassing both comparisons at63–64. Even positive integer1 understates measured average200000. All controls fabricated validator inputs, no benchmark/load claim.

Impact: caller can freeze runnable fresh E4 policy for known over-budget cohort or invalid budget arithmetic; runtime disk sampler cannot substitute for admission preflight. Existing E3/heap/ACK gates mean no currently qualified load, so defect does not block E1/E2 or bounded E3 proof regeneration. Must fix before E4 preflight/load.

Smallest credible correction: validate optional override as positive safe integer and reject values below calibrated per-trade lower bound; retain documented conservative margin unless higher override has explicit measured justification. Check computed budget values are finite/nonnegative before FROZEN. Add control regressions for zero, negative, fractional, string and positive below calibrated mean, plus valid conservative override. Reproducer and raw outputs: `calibration-counterexample.mjs`, `calibration-family.stdout.log`, `calibration-family.stderr.log`, `calibration-family.exit` here. Required calibration quantity/byte fields, producer/observer quantities/times and preflight base/free byte fields rejected53 invalid numeric controls; no other guard bypass found in same family.

No new confirmed actionable defect blocks E1/E2/bounded E3 proof. Known incomplete gates below remain delivery blockers for full RFC qualification, explicitly excluded from Ready scope.

## Plan Review

- E1a: implemented test-only unreserved gross DvP matches RFC6/10.1: journaled opening resources, checked wide intermediates, same-scope dedup/conflicts, typed identities, missing/invalid input outcomes, logical phase barrier, durable staging and full owner reconstruction. Kernel changes planned before append/evolve; economic/resource rejection retains no planned partial effects. Indexed execution/due access and lean projection avoid per-trade whole-domain scans on broker path; complete cold recovery still scans bounded experiment history.
- Independent oracle owns separate BigInteger economics/state; frozen20cases/52inputs checked against both models. Seeded300×64input traces compare19200business prefixes. Replay/checkpoint/history-cut tests, transport schedule comparisons, malformed-stage recovery, omission/duplicate-discharge/one-leg controls cover material contract. Full venue identity/lifecycle and reservations remain unproved.
- E1b: isolated cash/security proposal covers own-hold transfer, competing owner, residual, cancellation and withdrawal; owner policy acceptance remains open. No live financial hold activation inferred.
- E2: source-prefix and credits share frozen manifests/wire budgets. Finite156+seeded128cases include FIFO/access, high-water/fetched suffix, dependencies, grant retry/epoch, timeout without fencing and tombstones. Explicit source-fact waits and symbolic history/fairness assumptions preserved; models do not certify deployed gateway liveness or whole-process memory.
- E3: source ACK manifest includes topic UUID, physical offsets and payload hashes; managed adapter stores bounded semantic deltas/history and per-partition coverage/certificate in same EOS output transaction. Restore checks full contiguous source membership/owner-history frontiers, semantic store equality and original authority. Observer dispatches accepted inputs through independent oracle including zero-record duplicate delivery/staging. Runner implements happy/prefix-restart, golden, mutation/forward/serialization, local-loss and staged-phase controls. Full producer failure, committed-before-ACK, majority outage, stale-owner takeover and exact mixed-age activation matrix remain incomplete. Result-only reconstruction verifies isolated in-memory cuts; actual rebuilt-worker activation absent.
- E4: preparation/assessment and real same-kernel adapter implemented, yet no full E3 prerequisite, heap preflight only unapplied draft, ACK membership RAM-only, technical bytes incomplete and same-JVM CPU scope limited. Adapter explicitly emits gaps/LIMITED. Calibration and useful-rate results unavailable. New override finding adds preflight correction. No SQL seam/capacity qualification.
- CI/Make include new Node suites; script-surface change invokes Node executable for JS checks. Fixture generator truthfully separates shape/hash validation from kernel correctness. Changed recovery/verification/retention files preserve exact historical source/evidence and archived raw-failure links; current docs cite908c3e54 checkpoint, not latest source qualification. Fresh sign-off/proof requires new dated owner checkpoint and retention pass. Production contracts/steering unaffected by test-only scope; no architectural pivot needed.

## Author-Claim Reconciliation

| Author claim | Evidence inspected | Status | Review consequence |
| --- | --- | --- | --- |
| Full E1 oracle/replay/staging contracts implemented | Kernel/Oracle and27financial tests; frozen20/52 and generatedTraces | Confirmed for bounded experiment | E1 proof credible; production scope unchanged |
| E1b proposal; E2 finite156+seeded128 symbolic | reservation/gate model+tests and gate-model raw report | Confirmed | Owner acceptance/live gateway proof still required |
| Latest timeout preserves60s grouping and resolves config compatibility | workerProperties producer-prefixed120000; actual StreamsConfig regression | Confirmed locally | Real broker startup/transaction proof still required |
| Latest assessor rejects cumulative rollback/excess offers, pending can drain | rate-proof105–125 and regression suite | Confirmed | Prior counterexample addressed; new calibration override gap remains |
| E3 real adapter/certificate/independent observer implemented | FinancialBrokerProbe topology/process/init/OutputVerifier; runner | Confirmed as implementation | No real broker arms run by reviewer; full failure matrix remains incomplete |
| E4 preparation/assessment/budget gates implemented | preparePolicy/estimateAged and raw fabricated counterexample | Contradicted for complete budget validation | Invalid optional override can freeze over-budget policy; fix P2 |
| No full E3/E4/capacity/SQL PASS; heap/ACK/bytes gaps | source guards/LIMITED output, unapplied patch, dated checkpoint | Confirmed | Blocks loads and full sprint delivery |
| Prior794runtime/144Node and failed broker evidence | historical verification.json/checkpoint only | Unverified independently in this pass | Historical testimony retained; not current-head check claim |
| Actual broker timeout max permits120s | Parent reports900000ms preflight in separate proof directory | Unverified by reviewer | Parent must retain raw deployed preflight with new broker proof |

## Verification Performed

Raw stdout/stderr and copied XML retained in this directory. No live broker or load operation.

1. `node --test scripts/dev/calcify-financial/reservation-model.test.mjs scripts/dev/calcify-financial/gate-model.test.mjs scripts/dev/calcify-financial/rate-proof.test.mjs`:45/45pass,0fail/skips. Original wrapper used read-only zsh`status`; corrected rerun logs/exit0 retained.
2. From services/platform-runtime, `JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home ./gradlew --no-daemon test --tests 'com.reef.platform.calcify.financial.*' --console=plain`: BUILD SUCCESSFUL in2m28s. Copied JUnit3suites/27tests/0fail/errors/skips. Gradle cache outside sandbox. Shell capture failed only after Gradle completion from same read-only`status`; no fabricated process exit assigned. Raw logs plus gradle-summary.json document limitation. Exclusive Gradle slot released after XML copied.
3. `node scripts/dev/calcify-financial/freeze-fixtures.mjs --check`:exit0, unchanged20cases/52inputs, pinned fixture hash.
4. Java21 FinancialRateProbe `self-check` with current compiled test/main classes and resolver-probe-deps:exit0,40prefixes, independent full-oracle agreement and one-leg mutant rejection. No measured rate.
5. `node scripts/dev/calcify-financial/gate-model.mjs`:exit0; finite156/seeded128cases0fail.
6. `node .planning/sprint1-review/instance-4/calibration-counterexample.mjs`:exit0; confirms override defect and53required numeric guard controls.
7. `git diff --check 97924e15 3435d7b0`:exit0.

## Open Questions And Residual Risks

Full E3 broker proof unexecuted here. Local tests cannot prove EOS abort/fencing/changelog restoration. Broker cap, topology/image/headroom/preflight must stay pinned with raw run artifacts. Runner readiness/command/kill budgets are distinct from transaction completion. E3 result/changelog UUID lifecycle and coordinated activation still need full manifest/failure proof. E4 physical calibration/heap/ACK persistence/technical telemetry and SQL cost remain unproved. Historical checkpoint claims are accurately dated; owner must refresh after current source proof. Codebase Memory list_projects/check_index_coverage returned deleted tmp root, missing source freshness and scripts exclusion; focused source fallback used throughout, no graph completeness/absence claims. Remote archive raw proof not re-fetched; local retention inventory inspected only.

## Verdict

**Ready with non-blocking follow-ups**, specifically to regenerate E1/E2 and bounded E3 proof at3435d7b0. E4 P2 correction required before E4 policy/load. Full RFC sprint/E3/E4 qualification remains blocked; no production, capacity or overall sprint PASS. No heavy pivot; no further reviewer spawned. Review count4of6 preserved.

## Recommended Next Actions

Parent reconcile new P2 Accept/Dispute/Defer, implement focused numeric-gate fix if accepted, obtain independent review within existing limit if behavior changes. Retain new broker runs under frozen source/build/preflight; complete missing E3/activation matrix and E4 heap/calibration/ACK/telemetry gates before loads. Update current checkpoint/WORK_PLAN and publish complete raw proof/review in Records with immutable links; retain historical failures unchanged.
