# Fresh Review Bootstrap

Review instance: 7 of 7. Human approved additional round and bounded closure plan: "Okay that sounds good lets do it". Six previous instances counted, no reset. No additional reviewer or new workstream.

## Review Objective
Review full recovered Calcify sprint1 implementation/plan and corrected operational guard. Determine explicit readiness for supervised small pilot, then complete implemented24core/20golden matrix if pilot resource gate passes. No production/capacity/fullRFC sign-off. Read code/spec/tests before author evidence.

## Repository And Worktree
/Users/dsteele/repos/reef/.worktrees/calcify-sprint1-experiments

## Base, Head, Branch, And Dirty State
Base97924e15642826a687db935a219d7927ae649ac8; headf22b2f852a3aa1b14bd52a36f828f3e5cceb351f; branchcodex/calcify-sprint1-experiments. Committed source/docs pushed; untracked .planning contains operational helpers and review/raw evidence. Own source boundary scope-manifest.json SHA256; verify all bytes before/after. Primary dirty checkout excluded. Bulk stored only Records, no binaries/cache/session logs.

## In-Scope Commits And Paths
Entire diffbase→head:
.github/workflows/ci.yml
Makefile
docs/WORK_PLAN.md
docs/evidence/calcify-financial-sprint1/README.md
docs/evidence/calcify-financial-sprint1/broker-profile.json
docs/evidence/calcify-financial-sprint1/recovery.json
docs/evidence/calcify-financial-sprint1/verification.json
docs/records/retained-evidence.json
docs/work/CALCIFY_SYSTEM_ARCHITECTURE_RFC.md
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

Additional operational working-tree files in scope-manifest.json: resource_watchdog.py,supervise_checks.py,run_checks.py,watchdog_controls.py,guard_process_tree_controls.py under .planning/sprint1-proof-bounded. Treat executable plan as scope, not production source. Verify registration/ownership, command deadlines, observation errors, log-write errors, abort/cleanup, process tree escalation, observer supervision, completion handshake and project isolation. Profile8MiB JSON is reviewed config.

## Canonical Requirements And Plan
AGENTS.md; docs/AI_CONTEXT.md; docs/README.md; docs/WORK_PLAN.md; RFC §§6,8,10.1; ENGINEERING_DELIVERY_POLICY.md; RECORDS_RETENTION.md; Kotlin/repository steering; fixtures.json/broker.compose.yml/broker-profile.json. Closure plan: supervised two happy/restart correctness arms in separate bounded-pilot cluster, record active allocation before/after/during, conservatively forecast remaining44arms and compare9GiBabort/10GiBbudget/20GiBfree/256MiBraw; full matrix only if headroom. Stop pilot and preservevolumes, then fresh empty bounded cluster, same8MiB profile/readback. Separate cluster UUIDs prevent namespace leakage; pilot uses same two registered runID strings in isolatedcluster. Every attempt retained. No capacity load.

## Explicit Exclusions
Primarycheckout unrelated changes; private recovery sessions; caches/binaries; live authority/cutover. FullE3 matrix/E4 qualification known gaps must remain explicit, not excluded from plan assessment. No live broker changes/probes during reviewer pass. Do not alter source/plan or dispatch more agents.

## Verification Commands Available To Reviewer
node --test scripts/dev/calcify-financial/reservation-model.test.mjs scripts/dev/calcify-financial/gate-model.test.mjs scripts/dev/calcify-financial/rate-proof.test.mjs
node scripts/dev/calcify-financial/freeze-fixtures.mjs --check
python3 -B .planning/sprint1-proof-bounded/watchdog_controls.py
Real disposable process-tree controls may run outside sandbox; no Docker/ps scan/unrelated signals. Uses exact owned PID-only ps status and Java21 compile into transient directory, mocked observer resource sampling/Compose; coordinate with parent before running so no simultaneous process control. Prior source+fullmodule evidence available after preliminary. No broker or rate loads. Graphreef-calcify-sprint1-experiments generation2026-10-03T18:01:15Z stale deletedtmp; scripts excluded/Kotlinmissing. Parent list_projects/check_index_coverage done; focused source fallback, no negative graph claims.

## Author Explanation Location Or Delivery Step
Siblingauthor.md. Do not read until source/spec/tests inspected and preliminary.md written. Prior reviews/retest evidence only afterward. Own review directory preliminary/report/raw checks only; read-only source.

Use $independent-review in reviewer mode. This is review instance7of7. Work from Fresh Review Bootstrap first and record preliminary review before reading Author Explanation. Then verify explanation against repository, review implementation and plan, run proportionate non-mutating checks, return evidence-backed verdict. Do not implement fixes, create further review instances or split workstreams. Return report to parent. Heavy pivot/cap exhaustion requires human gate.
