# Independent review — M0 Attempt2

Review instance: 2 of 3. Attempt1 three cycles preserved. Fresh reviewer began with neutral bootstrap and canonical research/source/tests; wrote preliminary.md before reading author explanation or prior review findings. Scope: five frozen operational files, root CI two-line wiring and three ignored controlled-caller adjuncts. Base/HEAD a6ddafbbae750693e227985f054be2d26716ae84; branch codex/calcify-planning-readiness. Unrelated dirty docs, record-attempt and Kotlin changes excluded and preserved. No source edits, Docker calls/build loads, commits, new reviewers or fixes performed.

## Findings

**No actionable blocking defect found; no P0–P3 finding established.** Previous flag-pair and smoke-acceptance findings corrected and independently exercised. No architecture pivot needed. Verdict limited to bounded live proof execution, not acceptance of an unexecuted proof.

Scope change explicitly recorded: root changed only freeze_supervisor.py evidence-description string during review, from stopped-only reservation wording to stable3GiB charge throughout fault mode. Initial/bootstrap hash 6fd17ff2528edd3353fb2c2b42d49cea35704f829b6c809c72ed970f76326e97 retained; final hash 07a4f112f956f4aa2a5e2290ec94d3674e0f8699497303113c318321b3b4500c. Reviewer reversed only that string in memory and recovered original hash exactly. No command/field/behavior delta. adjunct-revision.json and source-final.json preserve explicit revision; do not claim all nine initial/final hashes matched. Other eight paths unchanged.

## Plan Review

Canonical research/m0-recovery-spike1/report.md ten acceptance groups reviewed against full source/tests. proof-supervisor.mjs:69–72 requires exactly one literal --fault-phase-directory adjacent to frozen directory; missing, wrong, incomplete and duplicate pairs fail focused test at259. Phase-aware scheduling at17,203,240,250 selects nominal1000ms only RECOVERING, retains200ms lead and5000ms authoritative freshness at87–90. Test272 exercises actual adapter/file protocol: three-second recovery emits parent starting rows27600/28400/29200, grant26800, fixed deadline56800; healthy/stopped/recovered periodic gaps4800ms. Nominal recovery gap800ms reflects lead; not hard1second monitor latency promise.

State machine at123–187 consumes fresh daemon observations, requires actual STOPPED barrier before START, pins peer generations and one target restart generation, rejects unknown/unhealthy/paused/restarting/dead or repeated generation, requires successful post-StartedAt probe. Grant anchored at START authorization before mutation; deadline checked around monitoring, persistence, authorization evidence and ACK publication at207–240. Cached validation remains pure. Wrapper actual adapter broker-proof.mjs:157–194 waits grants, bounds mutation using remaining grant and never retries failed START; external-faults.mjs:194–201 restores only when START not attempted.

Target charge fixed3GiB in every fault-enabled running sample; actual bounded du mandatory including starting, stopped actual null plus conservative reservation (supervisor:353–375). Original9GiB abort/10GiB hard/20GiB guest floor/256MiB raw/5second freshness unchanged. Healthy initial/prelaunch and final-after-wrapper-exit samples remain. Owned process-group cleanup and ownership-checked exact-ID Docker stop operate independently from failed diagnostic write at258–279,285–307,390–406. PROOF_READY provisional; final healthy completed cycle, cleanup, committed marker and actual CLIexit0 required.

Root fault_smoke.mjs:40–42 now rejects missing startingSeen before recovered request/publication. Separate parent journal starting/du requirement remains essential: wrapper receipt alone cannot demonstrate parent allowance. freeze_supervisor.py derives frozen protocol/resource pins and correct argv; root writer inventory broker/exclusive-volume-writers-recovery-smoke1.json records sole registered daemon container per named volume. Host/outside-writer absence remains operational premise, not universal proof.

## Author-Claim Reconciliation

| Claim | Evidence | Status / consequence |
| --- | --- | --- |
| Two operational refinements, remaining three operational files unchanged | Source/bootstrap hashes; supervisor69–72,203,240,250; full tests | Confirmed. |
| Refinement RED0/2 then GREEN2/2; initial GREEN harness dwell repaired without source change | refinement-red.log, refinement-green-attempt1.log, refinement-green.log; fresh focused run | Confirmed retained failures and corrected controls. RED demonstrates flag missing exception and zero parent starting rows; no live timing inference. |
| Focused58 and actual-body smoke2 pass | Fresh executed-checks.json and stdout/stderr | Confirmed58/58 and2/2, actualexit0, zero fails/skips/cancels. |
| CI2 exact command216/216 and captures before/after subprocess match | run_ci_node.py, exact-command.json, source-before/after.json, summary.json, raw attempt logs | Confirmed. Workflow argv independently parsed/matched; all38 captured paths match each other and current checkout. |
| Prior CI1 while-running hash attribution corrected separately | source-boundary-correction.json and original current-source-boundary.json SHA7d81cee28797400bcb22d79c333a1fbca49b36082d74c6578e7d8ceb6458982a | Confirmed original preserved/hash checked. CI1 was post-run capture; no pre-run hash capture claimed. |
| No live smoke/E3/capacity result yet | Scope/exclusions and absence of live proof in reviewed controls | Confirmed limitation; injected evidence establishes code behavior only. |

## Verification Performed

- Fresh node --test scripts/dev/calcify-financial/proof-supervisor.test.mjs scripts/dev/calcify-financial/broker-proof.test.mjs: actualexit0,58tests/pass58,fail0,cancelled0,skipped0,9380.395833ms. Actual own stopped-leaf/leader-exit process-group controls passed; unrelated sentinel survived. Docker injected.
- Fresh node .planning/calcify-session-2026-10-04/smoke-driver-controls.mjs: actualexit0,2/2,112.491291ms. Actual driver body refuses immediate healthy/no-starting and accepts starting then healthy. No Docker invoked.
- Five operational node --check commands pass. Runtime observed darwin/Node22.22.1/libuv1.51.0 matches frozen clock pin; no portable-clock guarantee inferred.
- Retained CI2 raw TAP216tests/pass216/fail0/cancelled0/skipped0,9313.643583ms, empty stderr; summary actualExitCode0. Captures05:04:43.431705 and05:04:52.892608 enclose subprocess in inspected helper; attempt metadata05:04:43.362–05:04:52.900. Reviewer verified receipts, did not rerun broad CI.
- source-before.json, source-after.json, source-final.json and adjunct-revision.json record exact SHA256 boundary. Five operational and CI/smoke/control hashes match bootstrap after review; sole adjunct sentence revision explicit above.
- Codebase-memory Verify coverage: exact project reef-calcify-session-8c6f ready, generation2026-10-05T03:42:21Z. Scripts excluded, CI metadata changed, adjunct coverage incomplete/ignored. All scoped source read directly; no graph absence/completeness claim.

## Open Questions And Residual Risks

No live Docker proof run by reviewer. Next run must directly record parent fault.phase=RECOVERING, target lifecycle.Health.Status=starting, healthy=false, allocationMode=reserved-fault-target, allocatedBytes3221225472, finite actual measuredAllocatedBytes<=3221225472 and corresponding target du receipt. Also require fixed30second grant, one target generation, healthy peers/final parent sample, committed finish marker, preserved volumes and actual CLIexit0. Faster nominal cadence improves observation chance; cannot force short starting transition or prove continuous peak/health. Failed/missed-starting run remains failed gate, not evidence to reuse for success.

Existing host/event-loop/kernel/synchronous-rename stalls, escaping process groups and external writers limit universal cleanup/liveness claims. Inspect/du separate, no atomic cross-container snapshot. Final resource sample precedes small terminal metadata; raw margin required. Full external matrix still needs all four actual arm results and post-restart committed-prefix/end-offset agreement. No full E3 or capacity claim warranted. Delivery/retention root-owned; reviewer no-op: ignored active review artifacts only, no tracked source/docs/contracts changes or historical deletions.

## Verdict

**Ready for bounded live proof.** Equivalent skill verdict Ready scoped solely to next controlled exact-owned smoke; actual parent starting/du and final completion evidence remain acceptance gates. No live completion, E3 signoff or capacity qualification granted.

## Recommended Next Actions

Root retain explicit adjunct revision, refreeze current manifest/source boundary and exclusive writer premise, execute bounded exact-owned smoke, retain every outcome. Check parent starting/du and committed success gates before proceeding to external campaign. No additional review instance created here; Attempt2 instance3 remains only if material changes justify it.
