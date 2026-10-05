# M1 Attempt1 independent review

Review instance: 1 of 3. Exact skill: `/Users/dsteele/.ai-central/templates/skills/first-party/independent-review/SKILL.md`. Fresh blind first pass completed before author explanation; preliminary ledger: `../m1-review-cycle1-preliminary.md`.

Scope: five files in `../m1-author/source-sha256.txt`, baseline/head `a6ddafbbae750693e227985f054be2d26716ae84`, branch `codex/calcify-planning-readiness`. Initial and final SHA256 checks match all five pinned values. No scope drift observed. Six documentation changes and concurrent partition-cut/supervisor work excluded. No source edits, staging, commits, live broker runs, Docker commands, or Gradle runs performed.

## Findings

**P2 — Reject signalled worker exit at readiness barrier.** `scripts/dev/calcify-financial/broker-proof.mjs:109` checks `spawnError` and `child.exitCode`, omitting `child.signalCode`. Node reports signal termination as `exitCode === null`, with non-null `signalCode`. If restart emits RUNNING/catchup receipts then dies by SIGKILL before readiness poll, `ready()` still accepts retained receipts at line111. Idle restart then reads existing committed output, so assertions in `scripts/dev/calcify-financial/lib/external-faults.mjs:65`, `:72`, `:81`, and `:91` can report successful restart while replacement process is dead. This defect predates new slice in shared helper, but new external proof relies on its fail-closed liveness barrier.

Reproduction: extracted exact `ready()` source into Node VM; supplied `worker.child={exitCode:null,signalCode:'SIGKILL'}` and retained `{frameworkRunningMs:1},{certifiedCatchupDomains:2}` rows. Function returned; output `{"readyAcceptedDeadWorker":true,"exitCode":null,"signalCode":"SIGKILL"}`. Smallest correction: reject non-null `signalCode` alongside exitCode/spawnError and add regression proving stale readiness receipts cannot override terminated child. Root accepted finding and elected to fix before supervised execution.

No other actionable defects established within pinned scope. Preliminary concerns about producer rejection source and stale rejection classification remain live-evidence checks, not speculative findings.

## Plan Review

RFC §§6.3/8.1/10.1 support bounded test-only adapter, complete abort/replay, committed-prefix recovery, observed stale-owner rejection, and majority availability. Four external arms now executable with deterministic named seams and independent read-committed barriers. Financial kernel/oracle unchanged; default topology API retained. Actual source checkpoints, owner cuts and physical output offset vectors improve recovery evidence. Ownership checks constrain daemon mutations to three registered full IDs with matching project/test labels, distinct service labels and health; target restoration runs in finally, with ownership-only precheck allowing recovery when peers are sick.

Controller ACK boundary is explicit experiment controller file boundary, after committed-output observation and before ACK persistence. Stale-owner case uses distinct state directory and requires replacement full history before old process resumes. Source-prefix abort observation and fresh process recovery prevent treating serializer success or a commit request as transaction completion.

Scope is code readiness for supervised proof, not E3 closure. Managed partition-cut helper integration, resource supervisor, actual RF3 fault receipts, docs/evidence/retention completion remain root-owned and outside this pass. No heavy pivot needed; correction local and plan remains sound.

## Author-Claim Reconciliation

| Author claim | Evidence inspected | Status | Review consequence |
| --- | --- | --- | --- |
| Four external arms actually dispatch broker/process adapters | broker-proof.mjs:171–195,230–232; external-faults.mjs:56–94 | Confirmed in code; live unverified | Execution path present; actual fault outcomes pending |
| B settlement exceeds producer limit after preceding forwards; actual producer rejection recorded | FinancialBrokerProbe.kt:143–160,310–326,523,531–540; BrokerProbeTest:23–34 | Confirmed seam/config; actual broker path unverified | Live receipt must identify expected B result rejection after earlier forwards, exit1 and zero abort output |
| Committed-before-controller-ACK queries old prefix before fresh suffix | external-faults.mjs:68–74; broker-proof.mjs:173,189–190 | Confirmed | Controller boundary explicit; readiness finding applies to restart |
| Stale owner resumes after takeover and requires producer/group rejection | FinancialBrokerProbe.kt:313–317; external-faults.mjs:76–82,48–49; broker-proof.mjs:177–188 | Confirmed controls; live unverified | Retain exception class/cause/resource and before/after offsets; distinguish observed rejection from timeout inference |
| Majority target-only outage and finally restoration preserve unrelated resources | broker-proof.mjs:146–169; external-faults.mjs:10–33,84–94 | Confirmed code and negative tests | Live daemon receipts still required |
| Idle restart retains exact output/source cuts and checkpoint | external-faults.mjs:34–46; FinancialBrokerProbe.kt:359–368,387 | Assertions confirmed; worker liveness contradicted | Fix signalCode guard before proof |
| Financial Node set65/65 and Kotlin2/2 | Reviewer rerun65/65; worker full Gradle success log, pinned compile hashes, summary | Node confirmed; Kotlin recorded-only | Original Kotlin XML unavailable after shared build overwrite; fresh retained XML needed in integrated verification |
| No live broker proof performed by author | No live receipts claimed in packet | Confirmed packet limitation | No E3 closure claim permitted |

## Verification Performed

- `node --test scripts/dev/calcify-financial/broker-proof.test.mjs`: 11 pass,0 fail.
- `node --test scripts/dev/calcify-financial/broker-proof.test.mjs scripts/dev/calcify-financial/gate-model.test.mjs scripts/dev/calcify-financial/rate-proof.test.mjs scripts/dev/calcify-financial/record-attempt.test.mjs scripts/dev/calcify-financial/reservation-model.test.mjs`: 65 pass,0 fail.
- `node --check scripts/dev/calcify-financial/broker-proof.mjs`: exit0.
- Exact-source VM readiness replay: accepted signal-killed worker, confirming finding.
- Initial/final `shasum -a 256` over five target files: match pinned packet.
- Recorded Java21 offline Gradle log: BUILD SUCCESSFUL12s; `kotlin-green-summary.json`: tests2/failures0/errors0/skipped0. Compile snapshot hashes match reviewed Kotlin files. Original test XML absent; parent confirmed not retained and plans integrated rerun with immediate XML retention. Reviewer did not rerun Gradle or infer stronger coverage from absent XML.

## Open Questions And Residual Risks

Live RF3 timing remains unverified: oversized producer seam, restoration after aborted transaction, majority outage election, actual stale-owner exception path. Focused tests exercise controller contracts through dependency mocks, not full OS/Docker adapters. Replacement group takeover/transaction-expiry combination may vary under pinned client/broker config; fail-closed actual exception requirement means false timeout-only success is avoided, but receipt classification still needs review. Preserve exact source/classes/JAR/image/config pins and raw failed attempts. No cluster-loss, power-loss, capacity or production-authority guarantee follows.

## Verdict

**Not ready** for supervised proof at current pinned snapshot: restart liveness barrier can accept dead worker, violating required early-exit fail-closed evidence. Small guard/regression fixes finding; remaining implementation appears suitable for bounded supervised execution. E3 final closure remains pending actual live proofs and root integration/retention pass.

## Recommended Next Actions

1. Root fix signalCode readiness guard with focused negative regression; retain RED/GREEN receipts.
2. Root complete pending integration and retain fresh Kotlin XML immediately; refresh five-file/combined review hashes.
3. Root decide next bounded fresh review instance within current3-instance budget. No additional reviewer or workstream dispatched here.
4. After readiness approval and resource guard, run supervised pinned RF3 matrix, retain actual rejection/offset/oracle/daemon receipts, then assess E3 closure.
