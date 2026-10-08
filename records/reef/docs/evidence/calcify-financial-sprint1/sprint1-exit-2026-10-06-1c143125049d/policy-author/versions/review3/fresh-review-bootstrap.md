# Fresh Review Bootstrap

Review instance: 3 of 3. Scope: new empirical timed policy only; existing qualification/review counts unchanged.

## Review Objective
Final resource-permission change: fixed named empirical14GiB abort/16GiB hard, ordinary/bootstrap9/10 remain unchanged. Failedarm3 original evidence retained; no optimization. Scope now10paths pinnedbyafter.json.
Review1 P2 assessor fix preserved; new14/16 empirical disk permission is material addition for finalreview3. Prior originalreview1 andreview2 packets retained in versions/review1 andversions/review2.
Assess finite fresh 2500 trades/s × 60 seconds diagnostic under fixed 4 GiB JVM budget. Verify correctness/replay checks preserved and empirical policy cannot enter or replace conservative ordinary/bootstrap policy.

## Repository And Worktree
/Users/dsteele/.codex/worktrees/8c6f/reef

## Base, Head, Branch, And Dirty State
Base/head `863503ec23c27f33ecea14fd82724fe28f96d308`; branch `codex/calcify-sprint1-exit-2026-10-06`. Working-tree implementation; no authored commits. Current scope pinned by `after.json` and `review.patch` (SHA-256 fe1401c15ec1e79ea8158bda053f2e5a3f1d04650a67bb664a6b8a905c08487e). Parent edits to docs/WORK_PLAN.md and parent .planning artifacts excluded. Generated .kotlin/build output excluded.

## In-Scope Commits And Paths
No commits. Paths:
- scripts/dev/calcify-financial/proof-supervisor.mjs
- scripts/dev/calcify-financial/proof-supervisor.test.mjs
- scripts/dev/calcify-financial/rate-supervision.test.mjs
- scripts/dev/calcify-financial/rate-proof.mjs
- scripts/dev/calcify-financial/rate-proof.test.mjs
- scripts/dev/calcify-financial/rate-supervision.mjs
- services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialHeapGuard.kt
- services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialHeapGuardTest.kt
- services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialRateProbe.kt
- services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialRateReferenceTest.kt

## Canonical Requirements And Plan
AGENTS.md; docs/work/CALCIFY_SYSTEM_ARCHITECTURE_RFC.md E4 useful-rate/storage experiment; existing rate-proof.mjs conservative policy and bootstrap-calibration.mjs empirical fixed cohort are compatibility boundaries. User directs reasonable explicit resources rather than harness memory optimization. One fresh fixed arm only, empirical stop conditions, no capacity/upper-bound/recovery qualification.

## Explicit Exclusions
Kernel, FinancialBrokerProbe managed adapter, Reference optimization, financial runtime/public API/authority, bootstrap seven-stage recovery machinery, aged/repeat arms, conservative heap derivation, live experiment execution and parent docs/delivery.

## Verification Commands Available To Reviewer
`node --test scripts/dev/calcify-financial/rate-proof.test.mjs scripts/dev/calcify-financial/rate-supervision.test.mjs scripts/dev/calcify-financial/proof-supervisor.test.mjs`
`JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home services/platform-runtime/gradlew -p services/platform-runtime test --tests '*FinancialHeapGuardTest' --tests '*FinancialRateReferenceTest' --console=plain`
`JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home services/platform-runtime/gradlew -p services/platform-runtime test --tests '*FinancialBootstrapProbeTest' --console=plain`
`git diff --check`
Inspect source hashes and test receipts in this directory; do not run broker load in review.

## Author Explanation Location Or Delivery Step
Read `author-explanation.md` after recording preliminary findings.

Use $independent-review in reviewer mode. This is review instance 3 of 3. Work from the Fresh Review Bootstrap first and record a preliminary review before reading the Author Explanation. Then verify the explanation against the repository, review both the implementation and its plan, run proportionate non-mutating checks, and return an evidence-backed verdict. Do not implement fixes, create further review instances, or split the work into new workstreams.
