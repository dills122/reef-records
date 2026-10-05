# Independent whole E4 integration review

Review instance: 3 of 3; integration attempt1. Final review cycle, no replacement reviewer or extra workstream initiated. Source-first preliminary retained in preliminary.md. Neutral task bootstrap disclosed prior endpoint finding and intended fix; completely blind pass impossible. Author packet read only after preliminary saved.

## Findings

No actionable blocker or new defect found in frozen code. Prior endpoint P1 closed in actual execution path: rate-supervision.mjs validates literal launch broker argument, config scope, full monitored resource registry and local directories before dependencies; proof-supervisor.mjs validates actual raw Docker NetworkSettings.Ports before launch and every sample; FinancialRateProbe.validateBootstrapBrokerScope validates real AdminClient describeCluster cluster ID/nodes before topic creation and recovery. Both raw E3 plan validators bind selected plan broker to planned endpoint string. Tests reject foreign broker argument, moved Docker binding and observed cluster/node drift.

## Plan Review

Canonical session planning/requirements.md reviewed. E4-A journal bounded queue/batches, forced data/index/witness/publication, disk indexed cold prefix lookup, sticky failure, physical offset holes and real main topology/observer binding present. Recovery does not replay controller admission or invent old admission times. Crash subprocess tests distinguish preforce, force-before-publication and publication-before-notification; missing/corrupted/torn published files fail activation.

E4-B finite exact topic UUID/partition/replica manifest, actual Admin raw replies and Docker/du receipts present. Logical replica size separated from broker/local allocated bytes. Seven ordered bootstrap checkpoints retain raw hashes and process receipts; signed physical deltas preserve reclamation. Unproven changelog directory attribution and RSS/native/aggregateCPU remain explicit unknowns.

E4-C owned group and exact broker cleanup envelope reused; startup-before-launch sample and final wrapper-exit sample required, stale/error/unsafe observations fail, unrelated process sentinel control retained. Broker/localStore/controllerJournal/proof allocations join9GiB abort/10GiB hard,20GiB guest-free and256MiB raw envelope. Strict sampled heap remains through startup/drain/close/restart/replay/result staging; empirical bootstrap cannot provide conservative heap bounds or ordinary rate authorization. Fixed effective client/topic limits and1000 settled+100 pending cohort enforced.

E4-D frozen bootstrap includes actual separate Java process plus KafkaStreams activation against durable journal and certified owner/history cut, separate complete read-committed result replay. Conventional rate deadline counters update at individual event times, late drain excluded, producer/observer separate. Finite bootstrap result cannot claim rate/retained-heap qualification. Diagnostic ladder/repeat execution still pending; this review does not qualify E4 or turn synthetic test receipts into raw49 actual E3 correctness.

Plan stays appropriate for bounded diagnostic preparation. Owner docs/latest evidence/retention completion remains root delivery work outside frozen code scope; failed monitor startup retained and does not establish capacity.

## Author-Claim Reconciliation

| Claim | Evidence | Status / consequence |
| --- | --- | --- |
| Launcher/config endpoints and monitored Docker bindings agree | rate-supervision.mjs; proof-supervisor.mjs; controls | Confirmed, closes foreign-cluster exposure |
| Kotlin observes actual cluster before mutation/recovery | FinancialRateProbe brokerScope calls inside both entry paths | Confirmed |
| Current candidate raw49 E3 remains prerequisite | bootstrap-calibration.verifyCurrentE3Evidence; FinancialRateProbe.validateBootstrapCorrectness | Confirmed code gate; actual raw proof not yet observed |
| Bounded ACK, physical receipts, heap and new JVM retained | Journal/main flow/physical collector/bootstrap validator | Confirmed implementation; live diagnostic unexecuted |
| Node125 and focused Kotlin7 pass | Own Node125 run; focused Kotlin XML7/7 | Confirmed |
| Current exact Node suite passes | exact-node-cycle3 command/result/stdout | Confirmed274/274,0failed,0skipped,sourceStable=true |
| Ordinary150k arm refused by structural lower bound | Separate empirical/analysis packet not in frozen24 scope | Unverified here; no ordinary arm approval inferred |
| Brokers stopped after monitor startup failure, no payload | Author packet/root testimony; no live state actions performed | Unverified independently; operational restart still requires frozen supervised plan |

## Verification Performed

- HEAD/base29a8926d33f9e2dc7278a1676a6fa3272628de3c; branch codex/calcify-e4-readiness; tracked/untracked changes preserved.
- SHA256 frozen24 paths:24/24 match, no drift.
- git diff --check:exit0.
- Independently ran node --test for bootstrap-calibration, physical-adapter, physical-evidence, proof-supervisor, rate-proof and rate-supervision:125/125 pass,0fail,0skip.
- Inspected current exact-node-cycle3 command/result/stdout:274/274 pass,exit0,sourceStable=true.
- Inspected current FinancialBootstrapProbeTest XML:7/7,0fail,0error,0skip.
- Inspected final retained combined-financial-cycle3 XML:97/97 pass,0failed,0errors,0skipped; root-controls/combined-financial-cycle3.log retained.
- No brokers or payload started; no source modified. Tests used ordinary temporary fixtures and owned process controls.

## Open Questions And Residual Risks

Live broker/time/storage behavior remains unmeasured for this final candidate. Sampled guards cannot guarantee OOM prevention or continuous peak bounds; code reports limits. Physical category allocation/native/aggregate CPU unknowns remain honest. Actual same-candidate complete E3 proof and successful bootstrap managed restart are executable prerequisites, not current achievements. Existing conventional diagnostic rates cannot be credited by finite bootstrap.

## Verdict

Ready for bounded supervised code diagnostic preparation. Current full financial suite97/97 and exact Node274/274 pass. No E4 qualification verdict:actual raw49 E3,1000+100 calibration, admitted rate ladder and fresh/aged repeats still pending. Maximum3of3 review reached; no further reviewer starts in this attempt.

## Recommended Next Actions

Refresh ignored operator pins against frozen final source/build/config; restart only owned broker IDs under bounded supervisor; execute raw49 E3 proof before finite bootstrap. Preserve every refusal/failure and raw identity. Only later justified conventional arms may seek rate diagnostics; no capacity or conservative retained-heap claim from bootstrap.
