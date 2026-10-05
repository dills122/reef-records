# Fresh E4 owned RF3 rig handoff

Setup ready2026-10-05T14:06:47.146Z. Project reef-calcify-e4-session-8c6f, new network10.254.249.0/24, ports39492/39592/39692. No financial topics initialized, no payload workload, build or dependency changes. Existing exited RF3 project and volumes preserved; full Image/Mounts/State/RestartCount exact before/after comparison succeeded.

Frozen paths in this directory: broker.compose.yml, pinned-network.compose.yml, profile.json, registration.json, preflight.json. Bootstrap `127.0.0.1:39492,127.0.0.1:39592,127.0.0.1:39692`. SHA256SUMS records profile/config/helper/preflight identities.

| Broker | Actual container ID | Named volume |
| --- | --- | --- |
|0/rp0|e35648ab23ef4ac6d37e1e82b938eb4a370150221de20942bedb393d75af39af|reef-calcify-e4-session-8c6f_rp0-data|
|1/rp1|2753163a664f440f59a139b1c09ddc4312edddf4145e8f8bc9217672c1742f4e|reef-calcify-e4-session-8c6f_rp1-data|
|2/rp2|841231db0a0bd1bde6b7a33976f43f7950753c9bbc91782c7675b97a384de81f|reef-calcify-e4-session-8c6f_rp2-data|

Pinned imageID sha256:0ceda3e98968e814705a75569063c7dc64ce74c1345681624f47bd8d6a6eb3c6; existing local immutable RepoDigest redpandadata/redpanda@sha256:9e83cfa99278f30d0133271c26bf670cd69c94ffa6ba0b42830dd0c3bd9dcfd9. Actual mount per broker `/var/lib/redpanda/data`, read/write volume only. Cgroup limits2GiB memory/1CPU per broker. Compose project/service and reef.test=calcify-financial-sprint1 labels verified. Actual cluster broker IDs0/1/2 and internal hosts rp0/rp1/rp2 read from rpk cluster info, cluster redpanda.1c792c9e-2f81-49d9-891a-23069d3e144d.

All three log_segment_size/compacted_log_segment_size/transaction_coordinator_log_segment_size=8388608 set and read back via each broker. Config version5, three rows false restart/empty invalid/empty unknown. transaction_max_timeout_ms=900000 compatible with120000 producer timeout. Strict root supervisor must still validate fresh profile/config/resources before Admin init or payload work.

Ready resource sample allocated151179264bytes (50393088 eachbroker), guest-free97316110336bytes, raw proof1624404bytes. Actual raw inspect/du/df/config/cluster receipts have exact command/time/input/output hashes. These are samples, not continuous peak or physical source/changelog category evidence. No logical replica inventory yet because no financial topics exist.

## Startup watch and takeover

Bootstrap-watch.mjs process running under exec session12150. Root explicitly accepted responsibility for process polling and takeover. Setup-only exception: fresh created registered resources before start, unknown initial guest-free and not-running allocation explicit null; maximum30seconds startup. First sample showed all three unmeasured IDs/guest-free null. Actual first guest df48ms after first observed Running, 1179ms after watcher start. Recorded samples before handoff had maximum span167ms, maximum start gap1169ms. Once healthy, watch requires all brokers healthy/running, exact image/mount/labels/no restarts; no further startup grace. Guard9GiB abort/10GiB hard,20GiB guest-free,256MiB aggregate raw,5seconds freshness reused unchanged. Any error/deadline stops only exact new IDs after ownership recheck and preserves volumes.

Current bootstrap watch fixed20-minute deadline59629940+1200000=60829940 host-monotonic-ms (roughly14:26:35UTC). Root writes watch-handoff.json `{accepted:true}` only after next strict monitor records actual fresh sample; current process exits without stopping brokers after explicit handoff. Failure path stops new rig. Do not leave live rig unwatched.

Prepared strict extension idle-watch.mjs: reuses existing proof-supervisor.validatePreflight/validateSample/dockerDependencies; no startup exception. Syntax checked only, not executed. Invoke with fresh absolute directory directly under broker-e4 named idle-<name>:

```sh
node /Users/dsteele/.codex/worktrees/8c6f/reef/.planning/calcify-e4-session-2026-10-05/broker-e4/idle-watch.mjs /Users/dsteele/.codex/worktrees/8c6f/reef/.planning/calcify-e4-session-2026-10-05/broker-e4/idle-review-1
```

Extension lasts maximum20minutes, requires all exact registered brokers healthy immediately, records full command receipts and aggregate broker-e4 raw proof byte scope, scans every roughly4seconds with same fixed budgets/freshness. Wait for idle-ready.json actual strict first sample, then write original watch-handoff.json. Before next extension/runtime monitor replaces idle watcher, record actual next monitor sample then write idle-review-1/idle-handoff.json `{accepted:true}`. Timeout/error/interruption stops only new registered brokers; successful explicit handoff preserves running brokers. No payload or topic operations performed by extension. Root must watch newly launched process output/exit and verify fresh ready artifact; helper syntax check does not certify actual takeover.

## Attempts/corrections retained

1. Original prepare.mjs: fresh namespace/volumes absent, image/ports checked; default Docker address pools fully subnetted, create failed. Complete failure008-create.json preserved. Docker partially created all three named volumes despite CLI failure; no containers started.
2. Dedicated subnet overlay prepared. prepare-attempt2.mjs refused unexpectedly present volumes, preserving retry receipts.
3. prepare-attempt3.mjs checks new-volume project/test labels, first own failed-create timestamp and no existing volume consumers. Refused Docker CreatedAt second-resolution timestamp versus precise create start; no action.
4. prepare-attempt4.mjs correctly compares same second-resolution timestamp scope, preserves original absent/create receipts, verifies exact project/volume labels and zero consumers. New network and three stopped containers created; registration.json actual IDs frozen before start.
5. First bootstrap-watch import path used four parent levels instead of three; module resolution failed before Docker invocation/start. Original source preserved bootstrap-watch-attempt1.mjs. Corrected path reused existing budgets; actual successful watcher started exact registered three IDs, measured boot resources and read back profile. No broker start attempt occurred in prior failures.

Read-only local source call was blocked by grep/read-count hook once and retried as targeted read; no structural graph queries needed for excluded scripts. No host/container/network/volume broad sweep, prune, reset, removal or action against prior rig. Only exact new project namespace and exact generated volumes inspected/created, then exact full IDs started/observed. Docker daemon rejected default pool exhaustion; explicit new subnet accepted with daemon overlap validation.

Setup readiness excludes E4 independent component/integration Ready, durability/restart proof, payload calibration, native/CPU/SQL/API capacity, category allocation and financial production authority. Root owns all later workload gates, documentation/evidence publication and retention. Preserve complete setup attempts and raw samples/receipts in final Records bundle.
