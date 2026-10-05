# Author Explanation

## Intent And Success Criteria

Actual Attempt1 campaign aborted during authorized target restart because guard
rejected normal Docker running/starting. Wrapper health wait alone could not
protect concurrent parent observer. Attempt2 adds one bounded authorization and
observation cycle without broadening acceptance for peers or arbitrary restarts.
Code acceptance remains subject to fresh review and root's real Docker smoke.

## Plan-To-Implementation Traceability

Research `research/m0-recovery-spike1/report.md` state/phase/accounting plan
implemented across existing test operations. Original30 guard controls retained,
plus integrated cycle, ten research groups and explicit old-predicate restriction
mutation. Existing broker12 controls retained, three added. Deadline/persistence,
malformed identity/artifacts, wrong generation, peer faults, du, stale IO,
incomplete cycle and failed diagnostic writing exercised. Runtime/public contracts
unchanged. Root owns frozen per-run manifests, later live smoke and owner docs.

## Technical Approach And Flow

Parent creates unique output and fixed child protocol directory. Wrapper writes
immutable request1 stop; parent fresh-inspects all three identities/resources,
records authorization and publishes ACK1. Exact-ID STOP occurs only afterward.
Wrapper verifies stopped target and healthy peers, writes request2 stopped;
parent directly observes stopped barrier and publishes ACK2. Wrapper completes
existing stopped-oracle work, requests start3; parent inspects stopped state,
anchors deadline and ACKs START before wrapper mutates. START latency consumes
same30seconds. Starting observations keep same reservation and execute du;
healthy observation must belong to one new generation and carry successful
post-start probe. Request4 recovered receives final observed recovery ACK.
Actual wrapper exit0, final fresh sample, owned cleanup and committed completion
marker remain required; journal PROOF_READY is provisional.

Requests/ACKs use run/cycle/seq/action/target identities. Re-reading consumed
artifacts is idempotent; mutations, gaps, unexpected files, symlinks and bad
identities fail. Authorization state lives only in parent. Cached sample checks
do not advance generation or lifecycle. Phase IO cannot hold observer indefinitely.

## Changed-Component Walkthrough

- proof-supervisor.mjs: validates frozen profile, owns phase state transitions,
  authoritative deadline, fresh adapter observations, sample/accounting checks,
  bounded IO, abort diagnostic retention, exact broker/group cleanup and completion.
- lib/external-faults.mjs: small fixed-file helpers/client, pinned host monotonic
  clock, exact registration/inspection validation, no failed START retry.
- broker-proof.mjs: parses frozen protocol flag, coordinates grants before exact
  mutation, uses fixed grant deadline, fails peer/identity problems promptly.
- Two tests: fake adapter plus real file/client integrated cycle and boundary
  controls; actual own-process cleanup/sentinel controls remain.

## Decisions And Rejected Alternatives

Stopped barrier ACK handles outage shorter than regular sampling period without
inventing prior observed STOP. Generic unhealthy grace, inference from starting,
resetting deadline after START, catch-all health retry and sampling suspension
would weaken admission. Fixed four-request files avoid service/event framework.
No new container created for volume measurement. Same-host pinned native hrtime
selected to supply identical deadline value to parent/wrapper; Node22.22.1 native
method delegates libuv1.51.0 Darwin mach_continuous_time, supporting host-origin
inference. Primary source links in clock-primary-sources.md. Actual clock checked
against frozen runtime; injected clock/runtime controls permit deterministic CI.

## Invariants And Boundary Conditions

All IDs/labels/images/mounts exact. Peers healthy, unchanged StartedAt/RestartCount
every fresh inspect. Target starting only after one START grant; second generation,
return to stopped after running, target unhealthy or recovered starting fails.
Deadline checked every loop and after monitor/persistence/ACK; it never renews.
Target3GiB is charge/reservation, not measured stopped allocation. Running du
required and <=bound. Other budgets/freshness original values retained. New raw
rejected inspect retained where available; phase/IO failures annotate last
completed inspect scope rather than claim missing exact failed daemon snapshot.
Diagnostic writing bounded independently from cleanup, so failure cannot defer
owned group/broker stop. Stopped own group receives CONT before TERM/KILL;
leader exit does not exempt stubborn owned group descendants.

## Verification Performed And Results

Focused exact command in bootstrap: final56/56,0errors/skips; five syntax checks
pass. All Docker calls injected; real process controls own temporary child groups
and sentinel. Full frozen receipt `focused-frozen-green.log`. Other receipts:

- protocol-red.log: old implementation lacks protocol directory, fails ENOENT.
  This receipt does not demonstrate old health predicate at starting.
- starting-restriction-mutant.log: temp source copy restores old healthy-only
  predicate in new adapter, actual ordered healthy->stopped->starting cycle fails
  specifically at starting. Single-predicate mutation, not full old-source RED.
- protocol-green-attempt1.log: implementation passed cycle but assertion missed
  short starting interval; test corrected to hold two fresh starting samples.
- protocol-green-attempt2.log: integrated actual adapter/client cycle passes.
- research-groups-green-attempt1.log: boundary harness omitted parent deadline
  check,10/11; harness corrected, production check already present.
- research-groups-green-attempt2.log:11/11 research groups+restriction mutation.
- broker-green-initial.log12/12, broker-green-final.log15/15.
- focused-green-attempt1.log and focused-frozen-green.log56/56 each; second receipt
  corresponds exactly to frozen five-file hashes in bootstrap.

Positive integrated test records healthy=false during starting, actual du,
stable3GiB charge, fresh stopped barrier, one new generation, healthy post-start
probe, four ACKs and successful final sample. Adversarial tests fail at relevant
adapter/protocol boundaries; no live fault/recovery duration claim.

## Risks, Tradeoffs, And Maintenance Costs

Operations module gains fixed protocol/state knowledge and compatibility requires
new per-run manifest and argv flag. Frozen host/runtime pin intentionally narrows
fault-mode deployment; Linux CI injects runtime/clock and tests actual process
groups locally but does not prove Darwin fault-clock portability. File protocol
assumes cooperating owned processes; no cryptographic defense against malicious
same-user writer. Exclusive target-volume/no other-writer premise operational.
Snapshot inspect/du not atomic across brokers; unavailable/racy du aborts safely.
Sampling cannot prove continuous health/peak or every transient external fault.

## Deviations, Deferrals, And Known Gaps

Starting RED scope corrected explicitly above. Research generation/health plan
retained; no heavy pivot. STOPPED dwell bounded by existing total wrapper timeout,
not newly invented smaller dwell. Strict async1second write/cancellation bound
does not bound synchronous local rename syscall or Node/kernel/host stalls.
Cancellation/deadline gate followed by sync rename prevents late async success
publication timer race. Host SIGKILL/stall can prevent cleanup; group cleanup
covers descendants staying in owned group, not deliberate group escape. Final
resource sample precedes small terminal metadata; raw-output margin still needed.
No cross-host clock guarantee, live Docker proof, broad CI or code readiness
self-certification by author. Root owns delivery/retention pass and source-scope
alignment with new live runs; no historical receipts removed or overwritten.

## Challenge Points For The Reviewer

Verify phase publication/deadline edges, immutability replay handling, observation
provenance, generation/old-probe checks, mandatory du during starting, cleanup
despite evidence failure, and fixed failed-START behavior against actual tests.
Inspect complete modules and research plan, not only this rationale. Assess
pinned clock inference and Linux CI process controls; validate root-owned smoke
and frozen profile derivation as adjunct caller. Source frozen pending review.
