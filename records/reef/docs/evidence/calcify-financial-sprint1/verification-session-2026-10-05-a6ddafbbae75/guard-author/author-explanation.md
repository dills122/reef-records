# Guard author explanation

Implementation exports frozen-manifest validation, sample validation, injectable
supervision, detached owned-group launch, and bounded Docker adapter. CLI:
`node scripts/dev/calcify-financial/proof-supervisor.mjs --preflight /absolute/frozen-supervisor.json`

Manifest schema `calcify-proof-supervisor-v1` separates wrapper ownership from
broker-profile schema. Required `registeredResources.project`, `containers[3]`
with full Docker `id` and expected `labels`; optional `imageId` and
`volumes[{name,destination}]`. Required `wrapper.argv` with absolute executable,
`cwd`, newly-created `outputDir`, positive `timeoutMs`. Optional
`externalBrokerFault.targetContainer`, `stoppedAllocatedBytesUpperBound`,
`evidence`; optional fault `composeProject`/`containers` checked against registry.
Root supplies frozen3GiB stopped-target reservation with exclusive-volume premise.

Docker adapter inspects identities and metadata every sample. Running broker du
failures abort; only explicitly registered exited target uses conservative bound.
Guest free sampled through healthy running peer. Docker observer commands capped
at1.5seconds, combined observer capped4.5seconds, journal write capped1second.
Wrapper status checked every200milliseconds; resource sampling every5seconds.
Completion sample occurs after actual exit zero. Process and broker stop execute
independently, before terminal record and `supervisor-finished.json`. Cleanup uses
owned negative-PID process group with CONT/TERM/250ms/KILL, idempotent stop handle;
does not scan/discover arbitrary processes. Broker stop addresses exact IDs;
Docker inspect validates ownership first. No prune/delete/down/reset commands.

TDD evidence:
- `node-red.log`: module missing, expected RED.
- `node-green-attempt1.log`:13 controls pass, success-file ordering assertion and
  real group control fail. Sandbox blocks group signal; failed teardown left
  own sentinel67093. Exact PID verified via elevated ps and terminated.
- `node-green-elevated-attempt2.log`:13 pass/1 fail. Immediate post-SIGKILL pid
  assertion raced delivery/reap; repeated finally cleanup masked initial failure
  with EPERM while group disappeared. Standalone elevated owned-group trace
  verified stopped orphan leaf/owned PGID and CONT/TERM/KILL success.
- `node-green-elevated-attempt3.log`:14/14 pass after idempotent stop/bounded reap
  poll; no process-discovery fallback.
- `node-adapter-red.log`:2 expected failures before injectable Docker executor.
- `node-green-elevated-final.log`:18/18 pass;16 mocked/adapter controls plus2 real
  process controls. Real controls cover observer-failure active wrapper/STOP leaf
  and exited wrapper/stopped resistant orphan leaf; separate sentinel survives.

Exact final test command:
`node --test scripts/dev/calcify-financial/proof-supervisor.test.mjs > .planning/calcify-session-2026-10-04/guard-author/node-green-elevated-final.log 2>&1`
Node22.22.1. Syntax checks pass for both modules.

Limits: no live Docker adapter run performed by author; root owns integration.
Stopped-target3GiB reservation is frozen assumption supplied with evidence,
not empirical stopped-volume measurement. Resource values are sampled, not
continuous peaks. Final sample precedes small terminal metadata writes. Process
ownership assumes wrappers/children retain spawned process group; intentional
daemonization/setsid escape unsupported. Supervisor process SIGKILL/host failure
cannot run cleanup. CLI executable path configurable with `CALCIFY_DOCKER_BIN`.
Tests and adapter create temporary proof files, preserve them, and remove no data.
