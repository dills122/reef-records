# M0 recovery research spike1 — Attempt2 input

2026-10-05. Read-only source/receipt research; only this ignored artifact added.
No implementation, tests, Docker calls/loads, reviews, commits or new agents.
Exact checkout `/Users/dsteele/.codex/worktrees/8c6f/reef`; baseline
`a6ddafbbae750693e227985f054be2d26716ae84`, dirty implementation retained.

M0Attempt1 used all three independent cycles: Not ready, Not ready, Ready.
Cycle3 was scoped code readiness for next bounded live integration, never live
campaign completion. Actual campaign2 reopens M0 on new recovery regression.
Preserve all Attempt1 counts/reports; next code work belongs to Attempt2 under
current user session policy in `ledger.json`, not silent cycle4 or reset.

## Root cause and observed limits

Source `proof-supervisor.mjs:236` rejects every running broker unless Docker
health is `healthy`, before resource measurement. `validateSample:81-85` repeats
same assumption. Intentional target STOP allowed separately at `232-234` and
`87-89`; transition from STOP to running/starting absent. Wrapper already polls
health after exact-ID START for up to30seconds (`broker-proof.mjs:170-181`), while
parent observer continues every5seconds. Parent sees normal restart bootstrap,
aborts, kills owned wrapper group and stops registered brokers. Waiting only in
wrapper cannot fix parent guard's stricter concurrent observation.

Retained evidence root:
`.planning/calcify-session-2026-10-04/runs/session8c6f-external2/`.

| Fact | Exact retained evidence |
| --- | --- |
| First3 arms saved | `proof/results.json` contains producer-failure, committed-output-before-controller-ack, stale-owner-resume-after-takeover; expected aborted producer arm has zero coverage, subsequent recovery/idle pass |
| Majority prefix4 valid | `proof/0031-observe-prefix.stdout.log`, nested `result`: pass=true, readCommittedOracle=true, coveredInputs=4, offsets=[1,2,3,4], end=6 |
| Exact target STOP | `proof/docker-attempts.jsonl` line2: command starts04:05:13.577Z, finishes04:05:13.829Z, code0; exact registered rp1 ID |
| Stopped barrier | Docker receipt line3, inspect04:05:13.830–13.854Z: rp1 exited/nonrunning, rp0/rp2 running/healthy, no pause/restarting |
| Last good parent sample | `resource-samples.jsonl` line26: sampledAtMs120047.653333, persisted UTC04:05:18.325Z; target stopped with3,221,225,472byte conservative reservation, peers healthy with683,528,192 and681,803,776 measured bytes; total4,586,557,440; guest free96,175,009,792; raw683,375 |
| Majority full8 completed during STOP | `proof/0033-observe.stdout.log`: nested result pass=true, readCommittedOracle=true, coveredInputs=8, offsets=[1,2,3,4,7,8,9,10], end=12. Wrapper control flow checks full8 and same prefix before still-stopped inspect and START |
| Target still stopped before START | Docker line4 inspect04:05:21.608–21.638Z: target exited, peers healthy |
| Exact target START | Docker line6 starts04:05:21.668Z, finishes04:05:21.761Z, code0 |
| Target starting directly observed | Docker line7 inspect04:05:21.762–21.789Z: target running/starting, StartedAt04:05:21.693320802Z, FailingStreak0, no paused/restarting. Lines8–11 repeat starting with healthy peers; last ends04:05:22.956Z |
| Guard abort | `resource-samples.jsonl` line27 UTC04:05:23.437Z: PROOF_ABORT, `Error: broker not healthy/running`, wrapperStatus=null, cleanupErrors=[], volumesPreserved=true. Supervisor stdout agrees |
| Cleanup preceded target first probe | `broker-states-after-abort.jsonl`: all3 exited; target FinishedAt04:05:23.245779553Z. Target health log contains only checks before restart, last04:05:11.061660755Z. Peers last check interrupted with exit137 around04:05:23.242Z |

Correction to initial root hypothesis: target running/starting is directly
observed in wrapper inspect receipts, not solely inferred. Exact failed parent
inspect snapshot was never recorded, so cannot prove which container/condition
triggered parent assertion from that snapshot. Contemporaneous wrapper receipts,
unchanged peer start times, parent error and first-probe timing strongly support
target bootstrap rejection. Avoid claiming exact parent snapshot recovered.
Stopped containers report health=unhealthy even with old successful logs;
stopped accounting must use lifecycle/authorization, not old health history.

Observed frozen healthcheck: CMD `rpk cluster info -X brokers=127.0.0.1:9092`,
interval3seconds, timeout2seconds, retries30, no start_period/start_interval.
Target first post-restart probe normally due around04:05:24.693Z. Actual
scheduling can be late; target stopped roughly1.45seconds before nominal first
probe. No target recovery time observed; no full majority restart success claim.

## Primary sources and version match

- [Docker HEALTHCHECK specification](https://docs.docker.com/reference/dockerfile/#healthcheck): separate health lifecycle, first probe after interval, successful probe establishes healthy. No readiness guarantee from running alone.
- [Moby Docker29.7.2 health implementation](https://github.com/moby/moby/blob/docker-v29.7.2/daemon/health.go), [raw source](https://raw.githubusercontent.com/moby/moby/docker-v29.7.2/daemon/health.go): `initHealthMonitor` resets restart health to Starting and failure streak to0; monitor schedules initial probe using configured interval when start period0; successful probe promotes Healthy. Health logs can retain pre-restart entries. Raw browser view lines187–219,237–259,343–365; repository file corresponding functions authoritative, browser raw line wrapping differs from physical file lines.
- [Pinned Docker29.7.2 Engine API schema](https://raw.githubusercontent.com/moby/moby/docker-v29.7.2/api/swagger.yaml): API1.55; ContainerStart success204 and already-started304, no health barrier. Health has none/starting/healthy/unhealthy. ContainerState exposes Running/Paused/Restarting/StartedAt/FinishedAt; Running can coexist with Paused, so check lifecycle and flags independently. Healthcheck results expose start/end/exit code; use current generation, not retained old successful log.
- [Compose healthcheck specification](https://docs.docker.com/reference/compose-file/services/#healthcheck): overrides image healthcheck using same Docker semantics.
- [Compose5.4.0 start source](https://raw.githubusercontent.com/docker/compose/v5.4.0/pkg/compose/start.go), [Compose start reference](https://docs.docker.com/reference/cli/docker/compose/start/): wait path explicit; plain Docker exact-ID START used here does not wait for healthy. Switching to Compose wait still leaves concurrent parent bootstrap rejection.
- [Docker29.7.2 release notes](https://docs.docker.com/engine/release-notes/29/#2972): version exists, released2026-08-05. Correct source tag `docker-v29.7.2`; initial `v29.7.2` URLs failed, corrected above. Master source initially inspected then replaced with pinned source; design relies on pinned source.

Local frozen receipts match Docker29.7.2, Compose5.4.0, Redpanda26.2.3, image ID
`sha256:0ceda3e98968e814705a75569063c7dc64ce74c1345681624f47bd8d6a6eb3c6`
and repository digest
`redpandadata/redpanda@sha256:9e83cfa99278f30d0133271c26bf670cd69c94ffa6ba0b42830dd0c3bd9dcfd9`.
No image/version/healthcheck/financial configuration change proposed.

## Revised bounded design

Keep operational fix in existing proof supervisor and external-fault adapters.
No matching, Kotlin financial model, durability, API or hot-path change.
Do not globally accept unhealthy running brokers, extend freshness, disable
healthcheck, pause observation or treat container start success as recovery.

Frozen `externalBrokerFault` should declare one target, maxCycles=1,
recoveryTimeoutMs=30000, stopped reservation3GiB and small phase-protocol version.
Require exact registered full IDs, all expected project/service/test labels,
image IDs and named data mounts for this fault-enabled mode; optional registry
fields insufficient for new phase authorization. Input clone remains deeply
frozen. Protocol path/channel fixed within unique supervisor-owned output
directory and passed in frozen wrapper argv, never arbitrary runtime path.

Preferred compact protocol: wrapper requests STOP/START with run/cycle/sequence
identity; supervisor acknowledges authorization before exact Docker mutation.
Use existing local processes plus bounded local files or owned IPC, no service,
general orchestration framework or Docker event-stream requirement. Requests
immutable/atomic; malformed, partial, stale, skipped, wrong-run/target, duplicate
new transition or symlink/outside-path data fails closed. Re-reading already
consumed request is idempotent and cannot regrant time. A retry after failed START
cannot issue another Docker START or reset deadline; wrapper fails and parent
cleanup remains authoritative. Authorization documents intent, not observed
Docker health or financial success.

State machine:

| State | Admission and observations | Exit |
| --- | --- | --- |
| INITIAL/HEALTHY | Initial sample and actual prelaunch sample all3 healthy/running, no paused/restarting/dead; pin initial StartedAt/RestartCount. No preexisting stopped target exception | Fresh authorized single STOP request after committed prefix4; exact identities and current all-healthy resource sample pass |
| STOP_REQUESTED | Target healthy/running while command pending, or exited/nonrunning after intentional STOP; peers always healthy. Bound command transition; do not admit arbitrary target unhealthy while still running | Supervisor directly inspects and records exact target exited plus2healthy peers; ACK stopped barrier |
| STOPPED | Target only exited/nonrunning; no paused/dead/restarting; peers healthy. Full8 oracle and still-stopped barrier stay wrapper-owned | Fresh START request only after observed stopped barrier; supervisor grants one START before mutation |
| RECOVERING | Deadline = supervisor monotonic now at START authorization +30000ms, checked each supervisor tick and after monitor/persistence. Target may remain exited only while authorized START is pending; once running observed, later exited fails. Running target only starting or healthy; unhealthy/missing health/restarting/paused/dead fails immediately. Require one new StartedAt generation consistent with authorized START, reject further changes/restart-count drift | Fresh supervisor inspect healthy in authorized new generation, within deadline; consume grace permanently |
| RECOVERED | All3 healthy/running; same new target generation; no further STOP/starting allowance. Final sample requires RECOVERED when cycle used | Actual wrapper exit0 + final resource sample + cleanup + committed handshake + actual CLIexit0 |

STOP_REQUESTED transition deadline should be frozen and no longer than existing
30second Docker command bound. STOPPED dwell already bounded by wrapper/observer
deadlines; freezing smaller per-arm dwell can be local refinement but requires
recorded value based on existing append/observe command budgets. Never silently
turn recovery into indefinite outage permission. Recovery30seconds includes
START-command latency by anchoring before mutation; timing stronger than current
wrapper30seconds after successful START. Wrapper health waiter should use same
remaining grant deadline and fail on identity/peer errors immediately; current
catch-all health poll temporarily swallows identity/peer failures.

Why ACK/observation matters: samples can miss entire STOP window. Inferring
authorization from immediately previous sampled stopped target would reject valid
short outage, while simply seeing starting can mask an unauthorized restart.
Supervisor STOP-barrier acknowledgement holds wrapper before START until exact
stopped target observed and recorded. Even outage shorter than regular5second
cadence has explicit daemon STOP evidence; no invented sampled outage. Fresh
transition inspect may run through same bounded monitor, retaining resource
heartbeat. Do not serialize long wrapper wait inside supervisor sampling loop.

Pin peer StartedAt/RestartCount after initial observation; any peer restart
fails even if it becomes healthy between regular samples when generation drift
visible. Target allows exactly one new StartedAt after authorized START; changes
during grace cannot refresh deadline. Health log old exit0 entries cannot prove
new generation ready. New healthy observation should retain at least one
post-StartedAt successful probe when available; missing required probe evidence
fails final recovery acceptance. Everyloop validation of cached last sample must
be side-effect free; transitions consume only fresh daemon observations, not
repeated validations. Keep snapshot phase/sequence provenance to avoid validating
old accepted sample against a newly advanced phase as if it were new observation.

Resource accounting: target charge stays3GiB for entire fault-enabled run,
including initial healthy, STOP, starting and recovered phases. Every running
target still executes bounded `du -sk` and stores actual measuredAllocatedBytes;
actual must be<=3GiB. Never claim reservation is measured size. STOP records
unknown actual plus reservation, based on verified exclusive-writer premise.
Peers measured normally. Total charge =3GiB + measured peers; existing9GiB abort,
10GiB hard ceiling,20GiB guest floor,256MiB raw cap unchanged. `df` uses healthy
peer. Unavailable/malformed target du while starting aborts; no measurement-free
grace. Reservation does not establish continuous peak or bound other writers.

Evidence: record inspect capture time, full exact resource identities, raw
Docker lifecycle/health/config/new generation, phase/action sequence, authorization
and fixed deadline, charged versus measured bytes and budget decision. Retain
rejected snapshot in abort evidence before cleanup when available. Observation
or evidence failure still initiates independent process-group and exact-owned
broker stop; failed diagnostic write cannot delay cleanup or publish success.
Capture old/state/new transitions, not only sanitized healthy Boolean.

## Attempt2 TDD and acceptance

Retain existing30 M0 controls and surrounding external-fault controls. First
RED reproduces initial healthy -> authorized STOP -> healthy peers/stopped target
-> authorized START -> target starting with measured bounded du -> healthy,
using actual adapter's injected Docker outputs and supervisor fake monotonic
clock. Current source must fail at starting. Add integration of wrapper protocol
with supervisor authorization; isolated validator-only test insufficient.

Focused controls:

1. Initial target stopped/starting/unhealthy rejects before launch, including
   valid fault declaration; unconfigured target recovery rejects.
2. Permitted one-cycle starting survives multiple fresh samples, stores
   healthy=false and actualdu, charges3GiB, completes only after fresh healthy.
3. Missing regular STOP sample still valid with supervisor stopped-barrier
   observation/ACK; absent STOP authorization/barrier rejects.
4. Wrong target/run/IDs/labels/images/volumes, skipped/replayed mutation,
   malformed phase artifact, missing ACK, symlink/path escape fail closed;
   consumed ACK reread cannot renew token or deadline.
5. Either peer starting/unhealthy/stopped/paused/restarting/dead/missing health
   fails in every phase; changed peer StartedAt/RestartCount fails even healthy.
6. Target unhealthy/restarting/paused/dead/missing health during grace fails;
   second START generation, stop-after-running, or new cycle fails. Healthy then
   starting again fails immediately. Pre-restart successful log cannot certify
   restart health.
7. Exact recovery boundary: healthy observation and persisted acceptance before
   fixed deadline succeeds; starting at/after30000ms, delayed monitor/persistence
   crossing deadline, clock jump or slow START cannot extend it. Repeated fresh
   starting samples never reset anchor. Use monotonic clock, UTC for evidence.
8. Target actualdu exactly3GiB accepted;3GiB+1, nonfinite/negative/malformed/hung
   du rejects. Running target receives execdu in starting and healthy phases;
   stopped target no exec, reservation remains stable. Budget threshold controls
   operate on charged total, including conservative initial reservation.
9. Existing5second maximum sample-start/freshness,200ms lead, post-persistence
   freshness, final sample and record/finish controls retain unchanged semantics
   through protocol waits. Cached validations neither advance state nor mask
   expired recovery. Hung transition evidence/ACK never suspends observer.
10. Wrapper exit0 during STOP/RECOVERING cannot publish success. Abort records
    rejected inspect/phase when available, stops owned group and registered
    brokers, retains volumes. Evidence-write failures and identity failure in
    cleanup still suppress success; unrelated process/container untouched.

After RED/GREEN and Attempt2 review gate: refreeze source hashes/preflight and
unique run ID/output. Bounded exact-owned Docker smoke must include one real
STOP->starting->healthy cycle with preserved volumes, current measureddu and
fixed30second deadline, then full external matrix. Require all4 arm results,
post-restart prefix/end-offset agreement, parent final healthy sample,
PROOF_READY only provisional, committed final marker and actual CLIexit0.
No repeat timing fault unless frozen settings/source unchanged; each failed run
and correction retained. Previous3 successful arms remain scoped evidence.

## Residual limits and pivot assessment

No heavy pivot required: state/authorization/accounting patch stays in test-only
operations. Adding service/event-stream framework, changing healthcheck timing,
broker storage budgets, RF3/minISR/write cache, financial behavior or E4 load
would exceed proposed local fix and need root's user gate.

Samples cannot establish continuous healthy peers, continuous byte peak, absent
brief fault between observations, or universal liveness. Exact generation drift
checks catch visible restart evidence, not all possible external interference.
Exclusive named-volume writer premise remains operational and must be rechecked
at frozen preflight; valid labels alone do not prove exclusive ownership. Docker
inspect plus execdu are separate operations, so no atomic cross-container
snapshot/size guarantee. Race causing unavailable du fails safely and may
produce false abort. Healthcheck metadata readiness plus independent financial
oracle validates stated experiment only, not administrative/power-loss safety.
30seconds is frozen acceptance bound, not measured/predicted recovery time.
Event-loop/kernel/host stalls still limit strict wall-clock abort and synchronous
completion latency; previous cycle3 publication limitation preserved.
Owned-PGID cleanup excludes descendants escaping group; host/SIGKILL failure can
prevent cleanup. Final sample precedes small terminal metadata; keep raw margin.
Research creates no live success or code-ready verdict.

Source hashes inspected (unchanged research scope):

- supervisor: `150722f9b26a61971db04084146979c9938795ff5e3f113811de984f614db1d5`
- supervisor tests: `c88c84479fab5ecbc2c87e6f6d4b3920cf31be8bbdc96ef08bb44b64a1b10fdc`
- external-faults: `262b25df21ca59940be2657019eca772c6ca669f85092b8b31af4ac80630bf06`
- broker-proof: `67bfa1aabb0d67fbe9e44ae6ecd27a7c3b87f865fa380b98914065fa04cc9678`

Codebase-memory Verify tier: exact project ready,index generation
2026-10-05T03:42:21Z. Symbol search0 results; coverage reports scripts excluded.
All four evidence paths read directly; no graph absence/completeness claims.
Required delivery/retention pass no-op: ignored active research only; no tracked
code/contracts/docs changed or superseded records removed. Root owns promoting
accepted design, ledger event, Attempt2 gate and later delivery pass.
