# Independent review

Review instance: 1 of 3.

Frozen target: base97924e15642826a687db935a219d7927ae649ac8 → head35a20cc933d42fd6ec751d63011aa3d40b72ff0a, branchcodex/calcify-sprint1-experiments. Tracked source clean. All21 changed paths inspected, including recovered draft patch, CI/Make wiring, script checker, recovery manifest/handoff and board. Author explanation read only after preliminary.md saved. No inherited author conversation, source fixes, additional reviewers or broker actions.

## Findings

### P2 — Identical rejected input retry diverges in accounting oracle

Evidence: `services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialOracle.kt:56`, `FinancialKernel.kt:84`; executable `checklog-counterexamples.log`.

Scenario: frozen valid CAPTURE input changed to quantity `"NaN"`, submitted twice under same action identity. First delivery returns INVALID_INPUT in both implementations. Second returns PRIOR_RESULT in kernel but ACTION_CONFLICT in oracle because prior digest comparison excludes invalidNormalization even though fallback canonical digest matches. Oracle advances business sequence/dedup instead of preserving prior decision/context.

Impact: independent observer rejects valid idempotent rejection history; frozen/generated suites miss malformed identical retries. This directly affects E1a retry/error-path proof and E3 observer trust.

Smallest correction: deduplicate matching fallback digest independently of normalization success; add regression asserting unchanged full business state, prior policy context and no extra history/business sequence after second rejected delivery.

### P2 — Oracle funding omits signed64 opening-account debit bound

Evidence: `services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialOracle.kt:149`; kernel `FinancialKernel.kt:219`; executable `checklog-counterexamples.log`.

Scenario: valid genesis buyerCash=9223372036854775807, sellerCash=0. Authorized FUND2 cash to seller. Seller credit fits; opening-resource debit becomes−9223372036854775809. Kernel returns BALANCE_OVERFLOW without effects; oracle returns FUNDED and mutates out-of-range opening balance.

Impact: BigInteger reference preserves conservation yet accepts forbidden signed64 financial state; independent agreement fails on explicit overflow boundary.

Smallest correction: independently check both credited balance and opening debit against signed64 bounds before any oracle mutation; cover cash and shares with exact-boundary/one-unit-overflow cases.

### P2 — Kernel and oracle disagree on zero-price input contract

Evidence: `services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialOracle.kt:86` and `FinancialKernel.kt:154`; executable `checklog-counterexamples.log`.

Scenario: valid frozen CAPTURE with priceNanos="0", quantity5. Kernel accepts CAPTURED with zero cash residual; oracle returns INVALID_INPUT and creates no obligation.

Impact: accepted-input and economic semantics differ between implementation and reference, so input readiness/invalid-input proofs cannot rely on currently positive-only generated traces.

Smallest correction: explicitly freeze zero-price rule, implement same documented boundary independently in kernel/oracle, add zero/negative/positive price regression. No wider financial policy change needed.

### P2 — Default broker proof storage repeats recovered evidence-loss failure

Evidence: `scripts/dev/calcify-financial/broker-proof.mjs:16`; recovery handoff Immediate Next Actions3; author acknowledges unsafe default.

Scenario: operator invokes any runner mode without CALCIFY_FINANCIAL_PROOF_DIR; raw attempt, source/build hashes, plans and results go to `/private/tmp/reef-sprint1-proof/broker/<run>`, where original proof was lost.

Impact: source recovery has persistent home but authoritative proof remains ephemeral by default, contrary to explicit recovery/retention requirement.

Smallest correction: persistent repository-owned unique proof directory default, or refuse actual runs absent explicit persistent path. Keep existing exclusive filenames/attempt logs; preserve raw successful and failed attempts for later Records publication. Explicit persistent override suffices for interim execution.

## Plan Review

RFC remains proposed; review scope is test-only source readiness plus credible next proofs. Kernel separates business/delivery state, bounded deltas and indexed identities/due work; oracle avoids kernel economic/validation/replay calls. Replay, every-record cuts, checkpoint suffix, wire integer equivalence, staging omission and duplicate/one-leg controls cover important invariant failures. CI/Make add model tests; explicit Node syntax command matches Bun-execution concern.

E1a frozen20cases/52inputs and generated300×64 prefixes provide useful coverage, but four findings require focused source corrections before broad proof sign-off. E1b remains proposed ownership policy; E2 finite source-prefix/credit models state manifest/access/fairness and symbolic-byte assumptions, not universal live liveness.

E3 implementation/runner only covers bounded internal mutation/forward/serde and recovery families. Production exception, one-broker outage, stale-owner takeover, committed-output/ack ambiguity and exact A10/B27 activation remain explicit open gates. Restore binds topic UUID/accepted membership and partition certificates; coverage-head/referenced-history validation still needs targeted adversarial proof. Existing result-only mixed-age sequence refusal must not stand in for complete qualified owner activation. Recovery process RUNNING and certified catch-up are separate signals; first fresh result remains a measurement gate.

E4 real adapter uses shared topology, fixed gross-DvP independent delta reference and monotonic timestamps; model policy separates deadline/final counts and fails late producer/drain/rate/parity issues. Unfinished heap guard, RAM ACK recovery and technical store-byte instrumentation remain actual preconditions/limitations. E4 output deliberately includes gaps and cannot presently earn PASS_DIAGNOSTIC. Do not run large fresh/aged arms until heap sizing and E3 correctness gate complete. Optional SQL seam defer is consistent with time-permitting scope.

Remaining gates need local corrections and staged experiment work within agreed architecture. No heavy pivot, replacement architecture or new workstream required by this review. Recovery/handoff documentation accurately distinguishes original lost proof from fresh compile/model checks. Records publication remains delivery work; source recovery does not claim completed sprint acceptance.

## Author-Claim Reconciliation

| Author claim | Evidence inspected | Status | Review consequence |
| --- | --- | --- | --- |
| Test-only change, no production authority | Actual diff, source paths, topology entrypoints | Confirmed | Bounded regression blast radius |
| Independent accounting and semantic reconstruction | FinancialOracle/Test, KernelTest, OutputVerifier | Confirmed structurally; edge-case defects found | Correct findings before full source sign-off |
| Bounded known-key hot writes, retained-latest kernel | FinancialProcessor.process, Changes/append, retainHistory=false | Confirmed | Cold full retained-history scans remain explicit cost |
| E3 partial, full external/mixed-age matrix unfinished | Runner dispatch, reconstruct sequence controls, RFC10.1 | Confirmed | Source gate cannot certify E3 acceptance |
| E4 heap/ACK/store-byte gaps | preparePolicy, FinancialRateProbe measurement gaps, draft patch | Confirmed | Keep large arms blocked and measurements limited |
| Finite gates only, source-prefix preference qualified | GateModel bounds/exploreSmall/runSeeded/report | Confirmed | No deployed liveness inference |
| Original proof lost; fresh38 Node/compile only | recovery.json/handoff and local checks | Confirmed | New proof provenance separate from historical reports |
| Proof default unsafe until overridden | broker-proof.mjs:16 | Confirmed | Finding4; persistent override required immediately |

## Verification Performed

`git rev-parse HEAD`, `git status --short`, `git diff --stat 97924e15642826a687db935a219d7927ae649ac8..HEAD`, `git diff --check 97924e15..HEAD`: exact scope verified; diff whitespace clean.

`node --test scripts/dev/calcify-financial/reservation-model.test.mjs scripts/dev/calcify-financial/gate-model.test.mjs scripts/dev/calcify-financial/rate-proof.test.mjs`:38passed,0failed; `node-tests.log`.

`node scripts/dev/calcify-financial/freeze-fixtures.mjs --check`:20cases/52inputs; SHA256fee7eead368d2ef2927aad1e53877907a4d74f9762b696d20f7e5575b1361e6d unchanged.

Java21 source launcher against freshly recompiled frozen-source classes, `checklog.java`: three deterministic counterexamples above, with separate invalid retry first/second cuts; `checklog-counterexamples.log`. FinancialRateProbe `self-check` against fixtures:40prefixes, independent full oracle parity and one-leg mutant rejection; `checklog-rate-selfcheck.log`. No broker connection in either command.

Coordinated `JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home ./gradlew --no-daemon test --tests 'com.reef.platform.calcify.financial.FinancialKernelTest' --tests 'com.reef.platform.calcify.financial.FinancialOracleTest' --rerun-tasks`: BUILD SUCCESSFUL3m19s;15tests passed,0failures/errors/skips, including fresh main/test Kotlin compilation. Raw `checklog-gradle.log`, totals `checklog-junit-summary.json`. Tests pass despite three demonstrated out-of-suite counterexamples. Generated untracked `services/platform-runtime/.kotlin/` noted to parent; no tracked source change. Recovery manifest17 hashes independently checked,0mismatches.

Codebase Memory list_projects/check_index_coverage/search_graph used. Registered sprint1 project points at old `/private/tmp` checkout, October3 index; scripts excluded and Financial search returns no symbols. Exact frozen source fallback used for all implementation. No unavailable graph coverage claim. All commands/log artifacts local; no remote documentation or broker actions needed.

## Open Questions And Residual Risks

- Freeze explicit zero-price boundary before aligning reference. Proposed synthetic policy must not silently become live venue policy.
- Current retained-history/owner JSON memory costs need measured sizing and draft heap guard implementation before large E4 arms.
- Certified-cut binding, exact snapshot activation, real EOS/fencing/restore behavior remain unproved by model/unit successes.
- Raw authoritative proof publication/immutable Records verification remains necessary at delivery. Review artifacts and caches do not replace full broker proof.

## Verdict

**Not ready** for sign-off on all recovered source and authoritative broad proof. Focused accounting-oracle correctness fixes needed. Existing successful model/frozen tests remain valid within their exercised inputs; E3/E4 incompletion is openly scoped experiment work, not evidence requiring architecture replacement.

## Recommended Next Actions

1. Author respond Accept/Dispute with evidence/Defer with owner and rationale per finding.
2. Correct oracle retry/bounds and freeze zero-price rule; add focused independent regressions. Fix persistent proof default or enforce explicit persistent override before new runs.
3. Material behavioral correction warrants fresh independent instance2of3, within existing review limit.
4. After source sign-off, regenerate uniquely retained Node/JUnit/self-check proof, then complete E3 happy/fault/certified-cut gates before calibrated E4 load. Preserve LIMITED/failed attempts and separate readiness/experiment coverage/full RFC acceptance.
