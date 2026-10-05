# Current candidate E3 serial recipe author note

Prepared only. No Docker/resource mutation, topic init, broker probe invocation, payload workload, compile, dependency or tracked source edit. Ownership ignored e3-preparation subtree only. Parent required fresh cycle2 integrated Ready and final same-source compile/freeze before execution.

## Frozen recipe shape

Supervisor: supervisor.recipe.json. Derived broker profile: broker-preflight.recipe.json. Executable wrapper: wrapper.mjs. Root draft: execution-manifest.draft.json. Root final manifest target outside proof tree: `.planning/calcify-e4-session-2026-10-05/bootstrap-attempt1/frozen/e3-execution-manifest.json`.

Proof root `.planning/calcify-e4-session-2026-10-05/bootstrap-attempt1/e3-current-candidate` remains absent. Supervisor wrapper.outputDir equals whole proof root; supervisor creates it exclusively. Phase directory proofRoot/broker-fault. This uses existing recursive raw monitor over entire proof tree, with all four mode outputs, supervisor resource evidence, wrapper.stdout.log/wrapper.stderr.log, wrapper-command.json, wrapper-attempts.jsonl and wrapper-status.json included. No nested output outside raw-budget scope. No hostLocalResources added: existing E3 small temporary RocksDB directories under/private/tmp remain unregistered original correctness-scope limitation, not invented store/heap/native bound or capacity evidence.

Serial mode order and isolated proof directories:

| Mode | Run ID | Proof directory | Expected results |
| --- | --- | --- | --- |
|run-external|e4-current-external1|external|4|
|run-core|e4-current-core1|core|24|
|run-golden|e4-current-golden1|golden|20|
|run-activation|e4-current-activation1|activation|1|

Total49 original/current E3 correctness arms. Root current broker-proof.mjs direct-jar plan fix present in checksums; no wildcard CP. Child broker runner retains source/oracle/history/state checks. Wrapper separately requires expected actual results length and final actual pass marker for each mode, then49 aggregate. Counts do not replace complete child raw/oracle examination or strict supervisor successful handshake.

## Resource/fault ownership

Exact E4 project/three actual ID-image-label-mount objects reused from broker-e4/preflight.json as registeredResources and externalBrokerFault.resources. Target brokerId1/container2753163a664f440f59a139b1c09ddc4312edddf4145e8f8bc9217672c1742f4e only. Existing fixed3GiB reservation throughout fault-enabled proof, actual running du<=3GiB; stopped allocation explicitly unknown. No bootstrap footprint promoted to bound. Original setup/config facts dated; actual current identities/generations/health/free/allocation measured by strict supervisor.

One authorized stop/stopped/start/recovered cycle, maxCycles1, stop30s/recovery30s, runId=e4-current-external1, Node22.22.1/darwin/libuv1.51.0 pinned. Outer frozen argv contains exactly one literal adjacent `--fault-phase-directory <absolute proofRoot/broker-fault>` pair. Wrapper passes pair only run-external child; later core/golden/activation receive no fault flag. Single outer supervisor retains recovered generation through subsequent modes and stops only registered new brokers during cleanup, preserving volumes. Prior rig excluded. Existing supervisor detached wrapper creates owned process group; four child runners/Java descendants inherit it, no separate detached groups. Outer total timeout30minutes. Guard9GiB abort/10GiB hard/20GiB guest-free/256MiB raw/5seconds freshness unchanged.

## Environment and source/build pins

Outer wrapper starts via `/usr/bin/env -i`, explicit PATH/TMPDIR/LANG/LC_ALL, canonical actual Node executable. Each child constructed from allowlist only: PATH containing actual Node and known Docker/system paths, JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home, TMPDIR=/private/tmp, LANG/LC_ALL=C, explicit broker/bootstrap, run ID, preflight, proof directory and ordered CP. Inherited NODE_OPTIONS/JAVA_TOOL_OPTIONS/_JAVA_OPTIONS/JDK_JAVA_OPTIONS/JAVA_OPTS/GRADLE_OPTS absent. Java binary bytes pinned. No shell interpolation.

Preparation reread current actual capability.json after parent final same-source compile. Capability bytes hash/order equality confirmed; current build d17b92729e627f666d6a48bddd544260b95c26281c4df6e65faa28ec7bd5f011 and CP9ea30ddd1b0db05de598047c48eeaca8c75b5a403d88af0beb35c27f813e930e. Explicit51 ordered entries: Kotlin test/main, Java main directories,48 actual jars. Draft records60 file pins (selected E3 source/runner/fixture/wrapper/Node/Java/jars) plus complete three classpath resource trees333/747/99 files. Wrapper streams byte hashes and compares complete directory membership/content before any mode and again before each subsequent mode. Actual broker runner separately emits full Financial*.kt/class/current explicit jar provenance in each child plan.

Draft acceptedCandidate=false intentionally blocks actual wrapper entry. Root owns final accepted manifest after Ready, reviewed final source/build pins and byte comparison against latest capability. Draft timestamp/provenance are preparation facts; do not claim freeze by toggling acceptance alone if any source/build/file changed. Root final manifest remains outside proof root, preventing self-referential proof hashes. Wrapper hashes immutable final manifest only after successful read/pin verification; root should hash completed proof bundle only after all writer processes/streams/supervisor closed.

## Root launch after acceptance/freeze

1. Accept fresh integrated cycle2 Ready and final same-source compiled candidate; check these recipe/helper bytes in final metadata.
2. Publish root-owned final execution manifest at declared target from draft with acceptedCandidate=true, refreshed checked source/node/java/JAR/directory pins and exact derived broker profile hash. No proofRoot precreation. Do not modify original draft or erase earlier preparation records.
3. Start following strict supervisor while current strict idle watcher remains active. After actual first supervisor resource sample confirms healthy owned rig, write current idle watcher handoff marker; handoff must precede authorized E3 broker outage. Root must poll new supervisor own execution session. No overlapping strict idle watcher during intentional stopped-broker phase.

```sh
/usr/bin/env -i PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin TMPDIR=/private/tmp LANG=C LC_ALL=C /Users/dsteele/.local/share/fnm/node-versions/v22.22.1/installation/bin/node /Users/dsteele/.codex/worktrees/8c6f/reef/scripts/dev/calcify-financial/proof-supervisor.mjs --preflight /Users/dsteele/.codex/worktrees/8c6f/reef/.planning/calcify-e4-session-2026-10-05/e3-preparation/supervisor.recipe.json
```

4. Require supervisor CLI exit0 and supervisor-finished.json ok=true; wrapper-status.json ok=true/totalResults49; all four expected result artifacts plus full raw/provenance/history/oracle facts. Phase acknowledgements1..4 exact once. Cleanup broker stopped observation must remain separate from measured active samples. Preserve failure/partial evidence on any block. Successful49 proof does not qualify E4 payload bootstrap, heap bound, financial throughput/capacity or production authority.

## Preparation checks/corrections

- prepare.stdout.log/stderr.log: broker-free recipes generated; existing registry/clock/supervisor validations PASS. Scope fixture/CP hashes actual, no broker execution.
- recipe-controls.stdout.log/stderr.log: positive schema controls, rejected acceptance=false, wildcard/missing/duplicate CP, changed mode count, absent phase flag, maxCycles2, wrong target/charge/resource image; fixed budget invariants and absent proofRoot checked. PASS; no actual probe.
- Wrapper syntax checked. Runner output now awaits complete stdout/stderr pipeline and process close before status/result read.
- prepare-attempt1/ retains first draft/profile/recipe/logs before stream capture hardening/final capability reread. Regenerated latest draft once current wrapper/capability frozen; no historical preparation overwrite or actual execution.
- Initial ignored file search missed ignored files; corrected --hidden/--no-ignore. One local grep-count hook rejection preserved in tool history; direct script source used because scripts graph scope excluded.

Retention no-op for worker scope: all active preparation/correction evidence retained; no tracked standalone superseded records or files removed. Root owns review, actual execution, owner docs/contracts/evidence/Records completion pass.
