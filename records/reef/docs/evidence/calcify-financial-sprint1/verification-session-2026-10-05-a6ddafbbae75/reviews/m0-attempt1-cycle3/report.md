# Independent guard review — cycle3

Review instance: 3 of 3. M0Attempt1 final cycle. Frozen two-file source scope;
read-only review except ignored review artifacts. Preliminary ledger recorded
before author explanation and prior reports. Initiating task/bootstrap disclosed
prior defects and proposed fix,so completely blind repair review unavailable.

## Findings

No actionable findings remain in reviewed supervisor/test scope.

Prior P1 startup freshness/cadence remains closed: observer rechecks sample age
after persistence,prelaunch and each loop; periodic start anchored to previous
sample timestamp with200ms lead (`proof-supervisor.mjs:117-140`). Elapsed-time,
clock-jump,slow-launch and actual asynchronous polling controls pass.

Prior P2 late successful completion now closed: bounded helper supplies abort
signal and absolute performance deadline (`proof-supervisor.mjs:102-106,156-157`).
Actual adapter writes temp data with signal,checks signal plus elapsed deadline,
then calls synchronous atomic local rename in same JavaScript turn
(`proof-supervisor.mjs:258-267`). Timed-out async preparation cannot later publish;
deadline gate also catches elapsed continuations before delayed timer dispatch.
There is no asynchronous rename in flight to publish after reported abort.

Journal entry changed to explicitly provisional PROOF_READY before publication
(`proof-supervisor.mjs:153-155`). Finish failure records PROOF_ABORT and returns
failed result; successful final publication has no subsequent asynchronous
evidence operation inside superviseProof. Completion criterion remains committed
handshake plus verified actual CLIexit0,actual wrapper exit0 and final sample;
READY alone cannot complete proof. CLI journal close remains after returned result,
so consumers must still observe actual CLI termination as stipulated.

Publication timing contract deliberately narrowed. Async preparation deadline
defaults1000ms; synchronous commit/event-loop/kernel stalls have no strict
end-to-end1000ms guarantee. This limitation is explicit,accepted in bootstrap,
and demonstrated by1050ms synchronous commit control producing coherent success
without timeout callback interleaving. No impossible issued-syscall cancellation
requirement imposed.

## Plan Review

Small operational/test-only supervisor fits scripts ownership. Canonical
`docs/evidence/calcify-financial-sprint1/broker-profile.json` agrees with fixed
9GiB abort/10GiB hard allocation,20GiB guest floor,256MiB raw cap and5second sampled
window. Exact threshold/invalid-state tests pass. Neither sampling nor proof
timing establishes continuous peak,performance or capacity.

Frozen `session8c6f-smoke1-supervisor.json` pins three full container IDs,expected
Compose/project/test labels,images and named data volumes;wrapper argv/cwd/new
output path fixed. Frozen3GiB stopped-rp1 reservation explicitly asserts exclusive
writers and bounds target while running. Stopped accounting remains conservative
reservation,not measured stopped size. Source verifies metadata before exact-ID
stop and never deletes volumes. Two healthy running peers required.

Actual wrapper exit0 precedes final validated sample;owned process-group and
registered-broker cleanup precede completion. Cleanup errors suppress success.
Actual owned STOP/TERM-resistant descendant controls cover active and exited
leaders;unrelated sentinel survives. Descendants escaping process group remain
out of scope. No heavy pivot indicated.

Ready gate applies to root's next bounded live integration,not completed live
proof. Root still owns actual Docker timing,registration/volume exclusivity and
proof evidence. Broader delivery/retention pass remains root-owned;active ignored
review artifacts preserve all prior reports/failures without archive churn.

## Author-Claim Reconciliation

| Author claim | Evidence inspected | Status | Review consequence |
| --- | --- | --- | --- |
| Async temp data preparation is bounded/cancellable before final publication | bounded102-106;finish258-267;actual adapter delayed-write test281-295 | Confirmed | Timeout leaves final marker absent;abort journal observed |
| Absolute elapsed deadline catches blocked continuation before timer callback | finish262;test296-309 | Confirmed | Expired preparation cannot publish even before timer dispatch |
| Final publication synchronous and indivisible relative to timeout callbacks | renameSync267;tests270-280,311-327 | Confirmed | Prior async-rename-in-flight defect closed |
| PROOF_READY provisional;no async postpublication evidence write in supervisor | supervise153-164;CLI281-283 | Confirmed in stated scope | Actual CLIexit0 still authoritative;READY alone insufficient |
| Strict1second end-to-end guarantee intentionally excluded | source263-266;1050ms sync control | Confirmed | Accepted operational limitation retained |
| Original26controls retained plus4 actual adapter regressions | test source and independent full-suite invocation | Confirmed30/30 | Covers previous timing/process defects plus new commit boundary |
| Historical RED reproduced previous late marker and4regressions | m0-cycle3-rename-red.log;focused-corrected-red.log | Consistent retained evidence | Historical runs inspected,not rerun against old source |
| Frozen exact resources and3GiB exclusive-writer reservation supplied | root manifest;validatePreflight/validateSample;adapter inspect/stop | Confirmed as frozen premise | Live exclusivity remains operational assumption to verify |

## Verification Performed

- Branch `codex/calcify-planning-readiness`;HEAD/base
  `a6ddafbbae750693e227985f054be2d26716ae84`;worktree
  `/Users/dsteele/.codex/worktrees/8c6f/reef`. Dirty/untracked unrelated changes
  inspected and excluded. Reviewed scripts untracked relative to base.
- SHA256 matches packet before/after:supervisor
  `150722f9b26a61971db04084146979c9938795ff5e3f113811de984f614db1d5`;
  tests `c88c84479fab5ecbc2c87e6f6d4b3920cf31be8bbdc96ef08bb44b64a1b10fdc`.
- `node --test scripts/dev/calcify-financial/proof-supervisor.test.mjs`:exit0,
  30tests/30passes/0failures/0skips,8.081seconds TAP duration. Includes2 real owned
  process-tree controls and4 real adapter filesystem publication controls;
  Docker outputs injected. Log:`node-test-default.log`. Default sandbox sufficed.
- `node --check scripts/dev/calcify-financial/proof-supervisor.mjs` and
  `node --check scripts/dev/calcify-financial/proof-supervisor.test.mjs`:both exit0.
- `git check-ignore` confirms ignored preliminary evidence. No live Docker,
  source edits,staging,commits,subagents or further review instances.

## Open Questions And Residual Risks

Async deadline enforcement needs functioning event loop;synchronous filesystem
commit may stall. Final sample precedes small terminal metadata,so leave raw
budget margin. Samples cannot establish continuous peak. Retained-PGID cleanup
excludes setsid/daemonized escape;SIGKILL/host failure prevents cleanup. Frozen
stopped reservation requires exclusive writers. Actual owned Docker integration
not executed here. These are disclosed scope limits,not remaining code findings.

## Verdict

**Ready** for supervised bounded correctness proof under frozen ownership and
accepted publication contract. No live proof or performance/capacity sign-off.

## Recommended Next Actions

Root may run frozen exact-owned Docker smoke,then bounded proof only after smoke
and resource preflight pass. Require actual supervisor CLIexit0,committed final
handshake,wrapper exit0 and final validated sample;preserve original failure and
review logs. Review instance3of3 exhausted;no further M0Attempt1 instance started.
