# Fresh Review Bootstrap

## Review Objective
Review bounded test-only FinancialPartitionCut verifier and actual kernel-generated counterexample tests against Calcify RFC sections6,8,10.1. Inspect code/tests and canonical requirements first, record preliminary findings, then read author explanation. Scope pure cut verifier; parent separately integrates actual startup/live evidence. Review instance1of3 for M2 attempt1; parent controls actual count and may update this neutral packet before dispatch.

## Repository And Worktree
/Users/dsteele/.codex/worktrees/8c6f/reef

## Base, Head, Branch, And Dirty State
Branch codex/calcify-planning-readiness. Baseline a6ddafbbae750693e227985f054be2d26716ae84. Working-tree review includes two untracked files below; no commits/staging by author. Other workers and pre-existing docs changes coexist. Verify actual state before review; do not include unrelated edits silently.

## In-Scope Commits And Paths
- services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialPartitionCut.kt
- services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialPartitionCutTest.kt
- Read-only context: FinancialKernel.kt, FinancialBrokerProbe.kt current c/h/cert/s schemas. Parent may include mandatory init integration separately; this packet alone does not imply integration completed.

## Canonical Requirements And Plan
AGENTS.md, docs/AI_CONTEXT.md, docs/steering/kotlin.md, docs/ENGINEERING_DELIVERY_POLICY.md, docs/work/CALCIFY_SYSTEM_ARCHITECTURE_RFC.md sections6/8/10.1. Plan: shared-partition A+10,B+20,A+5,B+7; mixed A10/B27 activation refuses, complete A15/B27 accepted, missing A+5 required history refuses; strict accepted source membership/sourceUUID/authority/head/history/source causation; complete pending/phase/delivery/dedup semantic state. Physical resume vector captured separately by parent, never inferred from owner sequence or last data offset.

## Explicit Exclusions
Production behavior, kernel/oracle/schema changes, actual Kafka broker fault execution, arbitrary managed persistent state injection, Docker mutations, deployment, commits. Pure fixture tests do not close full E3. Parent owns docs/retention and live startup/suffix/no-republish proof.

## Verification Commands Available To Reviewer
Shared Gradle output requires slot from parent. Java21 offline focused test: JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home ./gradlew test --tests com.reef.platform.calcify.financial.FinancialPartitionCutTest --no-daemon --offline (cwd services/platform-runtime). Use recorder scripts/dev/calcify-financial/record-attempt.mjs with fresh ID if running; preserve failures. m2-author/red-11-tests.xml and red2-13-tests.xml hold RED evidence; parent/raw attempt logs hold complete commands. GREEN session8c6f-m2-green1:13tests0failures7s exit0; source hashes and XML retained m2-author.

## Author Explanation Location Or Delivery Step
.planning/calcify-session-2026-10-04/m2-author/author-explanation.md. Read only after preliminary independent pass.

Use $independent-review in reviewer mode. This is review instance1of3 within M2 attempt1. Work from Fresh Review Bootstrap first and record preliminary review before reading Author Explanation. Then verify explanation against repository, review implementation and plan, run proportionate non-mutating checks, return evidence-backed verdict. Do not implement fixes, create further review instances, or split work into new workstreams.
