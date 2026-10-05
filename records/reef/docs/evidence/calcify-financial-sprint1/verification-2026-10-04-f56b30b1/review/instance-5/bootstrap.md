# Fresh Review Bootstrap

Review instance: 5 of 6. Human authorized further rounds October4; parent extended total limit6, counting prior3. Do not change limit or dispatch other reviewers.

## Review Objective
Review ALL recovered Calcify sprint1 code and implementation plan plus latest fixes. Determine source correctness and readiness to regenerate E1/E2/bounded E3 proof. Distinguish implemented probe arms from full RFC qualification. Inspect every materially changed path; no production/sprint/capacity PASS requested.

## Repository And Worktree
/Users/dsteele/repos/reef/.worktrees/calcify-sprint1-experiments

## Base, Head, Branch, And Dirty State
Base 97924e15642826a687db935a219d7927ae649ac8; head f75b5d6187b631d5d608a24b883df6c57478b151; branch codex/calcify-sprint1-experiments. Source committed/pushed for durability. Untracked .planning/ holds recovery logs, raw review/proof and this packet; excluded private sessions/cache are not source. Primary checkout unrelated dirty changes excluded. Verify current state yourself. Documents at622e59dc report prior proof head908c3e54 and are dated history, pending new post-signoff checkpoint. Do not treat prior failures as newly passing evidence.

## In-Scope Commits And Paths
Entire diff base→head, including recovery, boundary corrections, focused checkpoint and latest3435d7b0 config/count and f75b5d61 byte-calibration changes:

.github/workflows/ci.yml
Makefile
docs/WORK_PLAN.md
docs/evidence/calcify-financial-sprint1/README.md
docs/evidence/calcify-financial-sprint1/recovery.json
docs/evidence/calcify-financial-sprint1/verification.json
docs/records/retained-evidence.json
docs/work/handoffs/2026-10-04-calcify-financial-sprint1-recovery.md
docs/work/handoffs/calcify-sprint1-unfinished-heap-guard.patch
scripts/dev/calcify-financial/broker-proof.mjs
scripts/dev/calcify-financial/freeze-fixtures.mjs
scripts/dev/calcify-financial/gate-model.mjs
scripts/dev/calcify-financial/gate-model.test.mjs
scripts/dev/calcify-financial/rate-proof.mjs
scripts/dev/calcify-financial/rate-proof.test.mjs
scripts/dev/calcify-financial/reservation-model.mjs
scripts/dev/calcify-financial/reservation-model.test.mjs
scripts/dev/script-surface-check.mjs
services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialBrokerProbe.kt
services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialBrokerProbeTest.kt
services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialKernel.kt
services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialKernelTest.kt
services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialOracle.kt
services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialOracleTest.kt
services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialRateProbe.kt

## Canonical Requirements And Plan
AGENTS.md; docs/AI_CONTEXT.md; docs/README.md; docs/WORK_PLAN.md; docs/work/CALCIFY_SYSTEM_ARCHITECTURE_RFC.md §§6,8,10.1; docs/ENGINEERING_DELIVERY_POLICY.md; docs/RECORDS_RETENTION.md; applicable Kotlin/repository/inter-service boundary steering. Frozen fixtures docs/evidence/calcify-financial-sprint1/fixtures.json and broker.compose.yml. Codebase graph project reef-calcify-sprint1-experiments generation2026-10-03T18:01:15Z references deleted tmp checkout; broker path missing, scripts excluded. Use focused source fallback, record limitation; no graph absence claims.

## Explicit Exclusions
Unrelated primary checkout, private recovery session logs, build caches, production authority/cutover; no live broker changes/loads during review. Heap guard draft intentionally unapplied; assess coverage truthfully. Existing source known-gaps are in scope for verdict; no hiding incomplete E3/E4 by narrower review units.

## Verification Commands Available To Reviewer
Node --test scripts/dev/calcify-financial/reservation-model.test.mjs scripts/dev/calcify-financial/gate-model.test.mjs scripts/dev/calcify-financial/rate-proof.test.mjs.
Java21 /Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home; gradlew --no-daemon test --tests 'com.reef.platform.calcify.financial.*' --console=plain, only after parent grants Gradle slot (currently free). Financial Kotlin code identical to reviewed3435; previous27 financial test evidence available after preliminary. Select proportionate checks; parent will perform full module retest after sign-off. Coordinate exclusive build; outside sandbox for cache. No actual broker/adapter side effects. Read-only checks plus local temporary counterexamples permitted. Capture raw commands/output only in this review directory.

## Author Explanation Location Or Delivery Step
Sibling author.md. DO NOT read until inspecting source/spec/tests and writing preliminary.md. Prior instance reports and author-checks-extended only after preliminary. Own only preliminary/report/proof artifacts; source read-only.

Use $independent-review in reviewer mode. This is review instance 5 of 6. Work from Fresh Review Bootstrap first and record a preliminary review before reading the Author Explanation. Then verify explanation against repository, review code and plan, run proportionate non-mutating checks, return evidence-backed verdict. Do not implement fixes, create further review instances or split workstreams. Return report to parent; heavy pivot requires stop/human decision.
