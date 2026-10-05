# Independent review report

Review instance: 6 of 6. Final authorized round; prior five counted. Blind source/spec/tests pass recorded in preliminary.md before author packet. No fixes, additional reviewers, brokers or loads dispatched.

## Findings

**P1 — Fail closed when resource monitoring or broker cleanup fails.** `.planning/sprint1-proof-bounded/resource_watchdog.py:33` and `:36` run unbounded `check_output`; parse, raw-size and attempts JSON reads also escape outer loop without cleanup. Transient Docker error/hang removes protection while broker-core/broker-golden wrappers continue. At `:8`, unbounded `compose stop(check=True)` precedes owned probe signals and, at `:44`, cleanup precedes writing BUDGET_ABORT. A failed stop prevents both termination and abort row. Two mocked controls reproduce CalledProcessError with zero owned signals; sampling control invokes no cleanup. Previous real allocation abort makes this material to next execution, despite smaller segment geometry. Smallest correction: bounded sample/stop deadlines, persist fail-closed abort before cleanup, terminate registered probe children in guaranteed cleanup independent of compose outcome, retain each cleanup error, and supervisor that stops run if watcher disappears. Process ownership must remain exact; no global kill/prune. This finding blocks next bounded broker proof, not E1/E2 source correctness.

No additional actionable product-source defect established. Current guard ownership tightened during pass from initial root-name marker to exact proof/run markers; this does not fix failure handling. Frozen operational source SHA256 `1277897cf77a3ce7faa2fc094f7f2f70ae66cac21be4c43184ad5f26b7dcf64f`.

## Plan Review

Entire base97924e15642826a687db935a219d7927ae649ac8→headf56b30b19d00a1033abae44a75435a4e771990e9 inspected; branch codex/calcify-sprint1-experiments; only untracked .planning. 26 changed paths; test-only changes do not modify production API/events/schema or matching authority.

E1 kernel/oracle, bounded history and complete replay/staging cuts, generated prefix/mutation coverage fit RFC10.1 diagnostic requirements. E1b hold transfer/cancel behavior tested but live product approval still open. E2 explicit finite bounds/fairness/history assumptions and credit-access counterexample support symbolic decision only. Neither certifies actual gateway liveness or heap.

E3 happy/golden/core local crash/forward/serialization/restore arms implemented. Broker-majority, stale-owner, committed-before-ack, producer-failure and qualified A10/B27 activation matrix remain open. Reconstruction checks synthetic history cuts; no full authority activation qualification. E4 retains RAM ACK registry/cold history and lacks heap gate/technical-byte instrumentation/calibration proof. No load eligibility or full sprint/capacity/production sign-off.

8MiB segment profile preserves declared RF3/minISR2/write-caching/retention/EOS/grouping. Profile requires fresh-project apply/readback and frozen settings before probe; those live values unverified in this pass. Five-second samples do not guarantee continuous peak or hard10GiB ceiling; stopped footprint cannot substitute for active peak. Correctness concurrency distinct from prohibited concurrent capacity loads. Operational fail-closed issue must close before run.

Checkpoint docs correctly identify old908c3e54 evidence and retain failures; post-proof completion/retention checkpoint still required. No historical claims silently upgraded.

## Author-Claim Reconciliation

| Author claim | Evidence inspected | Status | Consequence |
| --- | --- | --- | --- |
| 18 software/config files unchanged sincef75 | source-manifest.json plus independent SHA256 comparison | Confirmed | Same-code prior runtime evidence reusable with config limitation |
| Latest48model tests pass | independent node-tests.log | Confirmed | Count/byte validation regressions exercised |
|120s producer timeout supports60s grouping | workerProperties and same-helper actual StreamsConfig test | Confirmed source; prior27financial proof | New live broker profile still needs exact preflight |
| Byte overrides cannot undercut conservative floor | physicalTradeBudget/preparePolicy/estimateAged and controls | Confirmed | Invalid/undersized/unsafe values block |
| Prior runtime795reported/775pass/20skip,27financial | junit-summary.json, full-platform-runtime.stdout.log | Confirmed retained proof | Offline guarded DB return is no DB integration evidence |
| PriorNode154 and gate156+128 | nonbroker-check-summary.json, current48model rerun | Confirmed retained proof/current model | No benchmark transfer |
| Prior happy RF3 passed; core/golden aborted | broker-happy.stdout.log, author declared partial abort | Happy confirmed retained proof; full aborted matrix not independently rerun | No new profile broker PASS |
| Watcher reliably stops owned run on budget breach | watchdog source and mocked sampling/stop controls | Contradicted on error paths | P1 blocks bounded proof execution |
| E3/E4 incomplete, heap draft unapplied | RFC, runner externalMatrix, rate gaps, retained draft, dated checkpoints | Confirmed | Full qualification remains blocked |

## Verification Performed

- `node --test scripts/dev/calcify-financial/reservation-model.test.mjs scripts/dev/calcify-financial/gate-model.test.mjs scripts/dev/calcify-financial/rate-proof.test.mjs`:48/48pass,0fail/skip; own node-tests.log.
- `node scripts/dev/calcify-financial/freeze-fixtures.mjs --check`:20cases/52inputs, unchanged SHA256fee7eead368d2ef2927aad1e53877907a4d74f9762b696d20f7e5575b1361e6d.
- `git diff --check 97924e15..f56b30b1`:pass.
- Independent Python SHA256 comparison of all18 source-manifest files:zero mismatches; source-check.json.
- Mock-only Python execution of watchdog using patched subprocess/os.kill, one failed sampling command and one successful over-budget sample followed by failed compose-stop:both exit CalledProcessError,zero owned process signals; watchdog-counterexamples.json. No Docker/ps/signals actually executed.
- Graph list_projects/check_index_coverage: generation2026-10-03T18:01:15Z points deletedtmp checkout; Kotlin freshness missing/scripts excluded. Source fallback; no graph absence assertions.
- Inspected prior full offline platform build/JUnit results rather than repeat expensive identical-source build. No new Gradle, live broker/config changes or loads run in reviewer pass.

## Open Questions And Residual Risks

Exact newprofile application/image/durability/topic/transaction cap readback remains parent preflight responsibility. Sampling cannot prove continuous hard budget; abort/reporting must say sampled. FullE3 matrix and E4 gating remain open. Guard exceptions need explicit fail-closed owner supervision. Historical source docs remain checkpoint908c until honest current evidence published.

## Verdict

**Not ready** for requested bounded E3 rerun as currently guarded. E1/E2 implementation and latest count/byte source fixes have no new actionable findings; one P1 operational guard defect blocks execution. No production/capacity verdict.

## Recommended Next Actions

Return P1 to parent for Accept/Dispute-with-evidence/Defer-with-owner. Close fail-closed guard/supervision gap with mocked failure controls and preserve exact ownership. Final instance6of6 exhausted: do not create replacement/reset count. If remediation materially changes reviewed execution behavior or requires fresh sign-off, parent must surface remaining finding and obtain explicit human review-limit decision. No heavy architecture pivot identified; no new workstreams authorized. Until closure/human decision, no bounded broker rerun under this guard.
