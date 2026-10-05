# Independent guard review

Review instance: 1 of 3. M0Attempt1 cycle1.

## Findings

**P1 — Recheck sample freshness before launch and anchor initial cadence.**

`scripts/dev/calcify-financial/proof-supervisor.mjs:117-118` validates heartbeat before evidence write. Line124 launches without checking age again; line125 schedules first periodic observation five seconds after launch rather than five seconds from initial sample timestamp. Valid monitor4400ms plus valid evidence write900ms yields sample age5300ms at launch, yet final result `ok:true`. Valid initial monitor4000ms yields observation-start timestamps10000,19000: first gap9000ms, again `ok:true`. Both durations fit individual4500ms monitor/1000ms journal limits. Existing tests advance clock only in polling sleep, so omit this failure path.

Impact: configured five-second fail-closed observer gate can admit wrapper using stale resource baseline and create longer initial blind interval, weakening resource abort guarantees before live proof.

Smallest correction: enforce heartbeat freshness after evidence persistence and immediately before launch; derive first periodic deadline from actual initial sample timestamp, with missed-deadline handling rather than resetting cadence after work. Add fake elapsed-time controls for slow monitor plus journal and slow initial monitor alone. Define timing against sampled resource window explicitly; retain sampled/noncontinuous limitation.

Executable evidence: `node .planning/calcify-session-2026-10-04/reviews/m0-attempt1-cycle1/adversarial-controls.mjs` outputs:

```json
{"control":"launch-with-stale-initial-sample","resultOk":true,"launchAgeMs":5300,"sampleStarts":[10000,15500]}
{"control":"first-periodic-sample-gap","resultOk":true,"sampleStarts":[10000,19000,23200],"firstGapMs":9000}
```

**P2 — Bound completion-handshake write.**

`scripts/dev/calcify-financial/proof-supervisor.mjs:150` awaits `deps.finish(result)` without timeout. Production `finish` writes and renames completion file at247-249. A hung operation leaves CLI pending forever after wrapper deadline and cleanup. Same executable evidence races supervisor against50ms with never-resolving finish and returns `still-pending`; existing journal-hang test covers `record` only.

Smallest correction: apply existing bounded-write helper to completion operation; timeout must return failed result and leave completion handshake absent. Add hanging/throwing finish controls. Resource/process cleanup already precedes this await, so risk is liveness/evidence handling rather than ongoing wrapper load.

## Plan Review

Scope appropriate: reusable test-only supervisor under operational scripts, isolated from production runtime. Fixed9GiB abort/10GiB hard allocation, guest20GiB floor, raw256MiB cap match canonical `docs/evidence/calcify-financial-sprint1/broker-profile.json`. Observer identity, exact full IDs and Compose labels, optional image/volume pinning, conservative stopped accounting, two healthy peers, actual exit zero and final observation implemented.

Fresh broker `preflight.json` appropriately gates pinned profile/configuration:8MiB segment properties, config readback without invalid/unknown entries or restart need, worker60s commit/120s producer timeout, exact three resource IDs, scope and budget attribution. It is not supervisor schema and cannot itself authorize execution: root must construct and freeze wrapper argv/cwd/new output directory, expected labels/mounts, exact3GiB stopped-target reservation and explicit exclusively owned target volume/no-other-writers premise before launch. Stopped reservation remains evidenced assumption, not measured allocation. Live adapter integration remains root-owned and unexecuted here.

No heavy pivot required. Local timing fixes preserve approach; material behavior fixes warrant next independent instance within existing3-instance limit. Delivery/retention obligations belong broader author/root work; review artifacts remain ignored session evidence.

## Author-Claim Reconciliation

Blind first pass possible and recorded in `preliminary.md` before author explanation.

| Author claim | Evidence inspected | Status | Consequence |
| --- | --- | --- | --- |
| Immutable full IDs/labels, exact owned stop, preserved volumes | validatePreflight, inspect, stopBrokers; focused controls | Confirmed | No unrelated Docker deletion path |
| Resource sampling every5seconds; fail-closed observer | lines117-125,217; elapsed-time adversarial controls | Contradicted for startup timing | P1 blocker |
| Monitor4500ms, command1500ms, journal1000ms caps | bounded and Docker options | Confirmed | Caps individually do not bound combined initial heartbeat age |
| Actual exit zero precedes final sample and completion | status handler, superviseProof, success/final-failure tests | Confirmed | Completion timeout remains missing |
| Detached group cleanup handles STOP/TERM resistance and exited leader; sentinel survives | launchOwnedWrapper; two independently executed process-tree tests | Confirmed in tested retained-PGID cases | Daemonization/setsid escape remains explicitly unsupported |
|18 tests pass | reviewer Node invocation | Confirmed18/18 | Tests omit elapsed monitor/journal time and hanging finish |
| Root supplies3GiB reservation/exclusive-volume premise | author explanation and neutral bootstrap | Unverified execution input | Must be present in frozen supervisor manifest before live use |
| No live Docker adapter run by author | explanation; reviewer performed mocked adapter only | Consistent with inspected evidence | Root integration still required |

## Verification Performed

- `git rev-parse --show-toplevel`, branch and HEAD: exact named worktree, `codex/calcify-planning-readiness`, `a6ddafbbae750693e227985f054be2d26716ae84`.
- Git status inspected; unrelated dirty/new files excluded. Both scope files untracked additions relative to base.
- `node --test scripts/dev/calcify-financial/proof-supervisor.test.mjs`:18/18 pass, including2 real owned process controls; no elevation required for reviewer invocation. No Docker load/container operation performed.
- Independent elapsed-time and completion-hang controls: all3 assertions pass, reproducing defects described above.
- Source SHA256: supervisor `cf473ee6ad9fcc3785a70b0065c9f2fdb54bf26a984f0f5ed8f21ba45f5eda99`; tests `0ebc6b9a5a4e70b313184737f42f1c57981382efc7bd98848165006a231a38f1`.

## Open Questions And Residual Risks

Five-second samples cannot establish continuous peaks or performance/capacity. Final resource sample precedes small terminal metadata writes; leave margin below raw cap in execution inputs. Process cleanup assumes descendants retain owned PGID; supervisor SIGKILL/host failure cannot execute cleanup. Actual Docker command timing and live stopped-target accounting still require bounded root integration with frozen ownership manifest. Generic evidence string validation does not itself prove exclusive ownership or reservation geometry.

## Verdict

**Not ready** for safe supervised correctness proof until startup freshness/cadence fix and bounded completion write verified. No performance claim.

## Recommended Next Actions

Original worker fixes two local timing paths with focused regression controls. Root freezes updated source hashes and starts instance2 of3 after checks pass. Preserve root-owned Docker/fault gate; no workstream split or heavy pivot needed.
