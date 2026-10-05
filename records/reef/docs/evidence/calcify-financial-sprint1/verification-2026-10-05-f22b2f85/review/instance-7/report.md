# Independent review report

Review instance: 7 of 7. Final human-authorized round; prior six counted. Neutral bootstrap/source/spec/tests inspected and preliminary.md written before sibling author packet or prior reports. Source read-only; no fixes, extra reviewer/workstream, broker changes or capacity loads.

## Findings

**No new actionable findings.** Prior review6 operational P1 closed for requested supervised bounded proof: `.planning/sprint1-proof-bounded/resource_watchdog.py` bounds observations and project stop, aborts on exceptions and threshold breaches, records cause before cleanup, and retains cleanup errors. `supervise_checks.py` independently owns sessions/groups, requires current observer heartbeat, fails on observer death/stall/probe failure, escalates surviving groups after reaping leader, and runs cleanup even when abort-log write fails. Successful completion requires both wrappers exit0, explicit completion handshake and successful final observer sample. Independently executed mock and real process controls support these paths.

No production/capacity/full-RFC acceptance follows. Open E3/E4 qualification gates are material boundaries, explicitly disclosed rather than disguised as completed acceptance.

## Plan Review

Verified repository/worktree and base97924e15642826a687db935a219d7927ae649ac8 → headf22b2f852a3aa1b14bd52a36f828f3e5cceb351f; branchcodex/calcify-sprint1-experiments; actual diff27files and untracked.planning. Five operational helpers exactly match scope-manifest.json before/after review. Unrelated primary checkout excluded.

RFC§§6,8,10.1 and source/tests align on test-only synthetic unreserved gross-DvP. Kernel uses exact checked integer arithmetic, indexed execution/due state, bounded complete deltas/history, stable action identity, staged delivery and replay. Separate oracle owns normalization/accounting, full business comparisons and mutation controls. E1b holds remain proposed policy. E2 records finite exploration/fairness/access/retention assumptions; symbolic model supports bounded comparison, not universal liveness or physical heap qualification. CI/Make run introduced model tests; no production route/event/schema/financial authority change.

E3 implemented24core/20golden arms include two-domain shared-partition happy/restart,19 semantic mutations, forward/serialization failures, local-state loss and staged-phase loss. Independent read-committed observer derives expected source decisions, verifies complete histories/staging and owner parity; reconstruction refuses missing/mixed cuts. Current synthetic cut controls do not substitute for full A10/B27 certified activation. Majority loss, stale owner, producer failure and committed-before-controller-ACK remain separate unimplemented/unqualified matrix requirements. Prior default-profile partial arms stay BUDGET_ABORT overall.

Approved closure sequence fits bounded diagnostic objective: supervised two happy/restart pilot arms in isolated pilot project; active allocation samples before/during/after; conservative forecast for44implemented arms against9GiB abort/10GiB configured budget,20GiB guest-free floor and256MiB raw cap. Stop pilot preserving volumes before fresh bounded matrix cluster binds same ports; retain different cluster UUIDs and exact8MiB profile readback for both. Full matrix only after pilot resource gate passes. Five-second samples cannot certify continuous peak or hard10GiB ceiling; forecast must use active allocation, not reclaimed stopped footprint. Tiny pilot is a gate input, not full-size empirical proof; supervisor/watchdog must remain active through matrix.

E4 assessment correctly rejects impossible cumulative cuts and invalid/undersized byte overrides. Actual rate probe retains unresolved heap guard, durable ACK membership, physical calibration and telemetry gaps; no E4 load eligibility or SQL/full useful-path qualification. No architectural pivot needed for requested bounded closure.

Tracked WORK_PLAN/evidence/handoff remain dated6of6 checkpoint. Author bootstrap correctly supersedes review-limit state; parent must refresh owner docs/evidence after final7verdict and actual attempts, preserve prior reports/failures, and publish complete latest bundle in Records before product handoff/PR. This is ordinary completion work, not pilot blocker.

## Author-Claim Reconciliation

| Author claim | Evidence inspected | Status | Review consequence |
| --- | --- | --- | --- |
|18 software hashes match testedf75;89build hashes unchanged|Independent SHA256 checks against source-manifest.json/build-manifest.json; own provenance-check.json|Confirmed|Reuse retained module results for identical software; new live profile remains separate gate|
|795reported module tests/775passes/20skips,27financial|Parsed104 retained JUnit suites:795tests/0failure/0errors/20skips;14kernel/12oracle/1config|Confirmed retained proof|Not rerun by reviewer; offline guarded DB tests not DB integration|
|154Node CI tests,156finite+128seeded model cases|Retained node-ci.stdout.log; own48model test rerun exercises finite/seeded tests|Confirmed retained/current bounded evidence|No runtime throughput or universal-liveness transfer|
|Kernel/oracle independent, replay/staging complete in frozen scope|FinancialKernel/FinancialOracle, replay/oracle tests, broker OutputVerifier and malformed/omission/mutation controls|Confirmed implementation and retained tests|Still synthetic financial scope|
|120s timeout preserves60s grouping|workerProperties and actual StreamsConfig regression retained XML|Confirmed|Actual broker timeout cap/readback still mandatory|
|19mock guard tests pass|Own watchdog-controls.log|Confirmed|Covers observation errors/timeouts/parsing, thresholds, cleanup failures, stale/dead observer, handshake and log errors|
|Observer-death/log-write failure stop real owned trees|Own real-process-controls.log executed after parent coordination outside sandbox|Confirmed2/2|Both wrapper/Node/Java trees and stubborn leaves dead; foreign sentinel alive; no group errors; resource sampling/Compose mocked|
|8MiB pilot profile readback ready; full44can fit|Profile source and parent-produced pilot preflight.json|Readback confirmed retained evidence;44arm fit unverified|Live pilot observations and conservative resource forecast required before matrix; no predicted PASS asserted|
|FullE3/E4 incomplete|RFC requirements, runner externalMatrix, rate probe gaps and retained checkpoint|Confirmed|No production/capacity/fullRFC signoff|

## Verification Performed

- `node --test scripts/dev/calcify-financial/reservation-model.test.mjs scripts/dev/calcify-financial/gate-model.test.mjs scripts/dev/calcify-financial/rate-proof.test.mjs`:48pass/0fail/0skip. Own node-tests.log.
- `node scripts/dev/calcify-financial/freeze-fixtures.mjs --check`:20cases/52inputs; SHA256fee7eead368d2ef2927aad1e53877907a4d74f9762b696d20f7e5575b1361e6d. Own fixtures-check.log.
- `python3 -B .planning/sprint1-proof-bounded/watchdog_controls.py`:19pass. All host Docker/ps/signals mocked. Own watchdog-controls.log.
- `python3 -B .planning/sprint1-proof-bounded/guard_process_tree_controls.py`:2pass outside sandbox after parent coordination. Disposable own wrapper→Node→Java plus SIGTERM-resistant Node/Python leaves; exact owned-PID status only; observer sampling/Compose mocked. Foreign sentinel survives; cleanup groupErrors empty. Own real-process-controls.log.
- Independent source/build manifest SHA256 comparison:18/18software and89/89class/JAR entries unchanged. Retained JUnit parsed104suites/795tests/20skips/0failure/0errors and27financial. Own provenance-check.json. No new Gradle/module/broker run.
- `git diff --check 97924e15642826a687db935a219d7927ae649ac8 HEAD`:pass.
- Parent supplied Codebase Memory coverage generation2026-10-03T18:01:15Z, deletedtmp checkout/scripts excluded/Kotlin missing; skill-required focused source fallback used, no graph absence assertions.

Additional parent-produced preflight inspected after own preliminary/checks: `.planning/sprint1-proof-bounded-pilot/preflight.json` records sourceheadf22, codef75, pilot clusterUUIDredpanda.e2b68c57-c6f1-425b-b061-c1d95647f34e, pinned26.2.3 digest, all three cluster segment properties8388608, config version5 on each node with no restart/invalid/unknown flags,900000msbroker timeout cap,151,191,552baseline allocated bytes and97,434,447,872guest-free bytes. Supports pilot configuration entry gate; retained parent observation, no reviewer live broker command. Fresh final cluster UUID/readback, active pilot growth and44arm forecast still required.

## Open Questions And Residual Risks

Live profile/image/transaction limits/topic durability/guest headroom and separate pilot/matrix cluster UUIDs must be frozen/read back before execution. Watchdog samples are scoped observations and can miss transient peaks; host loss/SIGKILL of supervisor cannot guarantee cleanup. Parent remains operational owner and verifies known probes/project stopped after abort. Real process controls simulate observer/Compose; actual broker behavior remains forthcoming proof.

Matrix resource forecast must conservatively account for topic/changelog/internal segment allocation across44arms and preserve abort margin; do not extrapolate stopped13,537,280bytes. If forecast exceeds gate or live guard aborts, retain failed/limited attempt and stop without claiming matrix PASS. Full E3 fault/activation, E4 heap/ACK/calibration/bytes, live hold policy and matcher integration remain open.

## Verdict

**Ready with non-blocking follow-ups** for explicitly supervised isolated small pilot, then complete implemented24core/20golden matrix **only if pilot resource gate passes** and frozen profile/UUID/readback/headroom gates hold. Prior operational P1 closed by reviewed source and independent controls. No production, capacity, fullE3/E4 or fullRFC sign-off.

## Recommended Next Actions

Parent records finding disposition and7of7 verdict; run approved pilot under exact frozen guard, collect active resource observations, freeze conservative gate decision. If passing, stop pilot preserving volumes, use fresh isolated bounded cluster with same8MiB profile and distinct UUID, execute all44implemented arms under supervision. Preserve every setup/failure/partial attempt; report measured scope honestly. Finish Records publication/integrity verification and focused owner-doc refresh before product PR/handoff. No review instance8 or count reset; any new blocking defect/material architecture change at cap returns human decision gate. No heavy pivot identified.
