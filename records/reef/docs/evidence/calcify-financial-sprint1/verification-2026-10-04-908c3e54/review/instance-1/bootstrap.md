# Fresh Review Bootstrap

Review instance:1 of3.

## Review Objective

Review ALL recovered Calcify sprint1 code and implementation plan. Determine whether
current implementation is sound enough to regenerate authoritative proof and continue
experiments. Review every changed code/config/test path and relevant surrounding
contracts. Distinguish source readiness, runnable experiment coverage, and full RFC
acceptance: no production or completed-sprint qualification requested. Report defects
and plan gaps without suppressing known unfinished paths.

## Repository And Worktree

/Users/dsteele/repos/reef/.worktrees/calcify-sprint1-experiments

## Base, Head, Branch, And Dirty State

Base97924e15642826a687db935a219d7927ae649ac8.
Head35a20cc933d42fd6ec751d63011aa3d40b72ff0a. Branchcodex/calcify-sprint1-experiments; pushed to origin.
Tracked tree clean at freeze. Untracked .planning/ contains recovery traces, local
verification and these packets; no source boundary hidden there. Unapplied heap
guard test draft also tracked as handoff patch. Primary checkout dirty unrelated
files excluded. Verify current Git state independently.

## In-Scope Commits And Paths

06911bcf source recovery;35a20cc9 verification documentation.

.github/workflows/ci.yml
Makefile
docs/WORK_PLAN.md
docs/evidence/calcify-financial-sprint1/recovery.json
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
services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialKernel.kt
services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialKernelTest.kt
services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialOracle.kt
services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialOracleTest.kt
services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialRateProbe.kt

## Canonical Requirements And Plan

AGENTS.md; docs/AI_CONTEXT.md; docs/README.md; docs/WORK_PLAN.md;
docs/work/CALCIFY_SYSTEM_ARCHITECTURE_RFC.md §§6,8,10.1;
docs/ENGINEERING_DELIVERY_POLICY.md; docs/RECORDS_RETENTION.md;
focused language/boundary steering. Frozen fixture file
docs/evidence/calcify-financial-sprint1/fixtures.json.

## Explicit Exclusions

No production changes/financial-authority cutover. Do not review unrelated primary
working tree or other chats. No new live broker fault/load actions in review. Generated
build caches and raw local trace excluded from source diff, but proof availability
and accuracy of readiness claims are in scope.

## Verification Commands Available To Reviewer

Read-only source and git checks; Node --test reservation/gate/rate tests; existing
focused financial JUnit suite if needed. Coordinate any Gradle run with parent; never
overlap builds. Java21 /Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home;
Gradle outside sandbox for cache. No broker side effects. Save actual command/output
evidence only in this persistent review directory.

## Author Explanation Location Or Delivery Step

Author explanation sibling author.md. DO NOT read until implementation/spec/test
inspection and preliminary findings recorded in preliminary.md. Then reconcile it.
Read-only source: only write preliminary/report artifacts in this review directory.

Use $independent-review in reviewer mode. This is review instance1 of3. Work from
Fresh Review Bootstrap first and record preliminary review before reading Author
Explanation. Then verify explanation against repository, review implementation and
plan, run proportionate non-mutating checks, return evidence-backed verdict. Do not
implement fixes, create further review instances, or split new workstreams.
