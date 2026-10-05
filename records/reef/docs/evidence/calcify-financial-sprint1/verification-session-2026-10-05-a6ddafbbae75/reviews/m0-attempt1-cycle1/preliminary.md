# Preliminary independent ledger

Review instance: 1 of 3. M0Attempt1 cycle1. Recorded before reading author explanation.

Scope root `/Users/dsteele/.codex/worktrees/8c6f/reef`, branch `codex/calcify-planning-readiness`, HEAD/base `a6ddafbbae750693e227985f054be2d26716ae84`. Other dirty files excluded.

Frozen source SHA256: supervisor `cf473ee6ad9fcc3785a70b0065c9f2fdb54bf26a984f0f5ed8f21ba45f5eda99`; tests `0ebc6b9a5a4e70b313184737f42f1c57981382efc7bd98848165006a231a38f1`.

Canonical checks inspected: broker-profile.json budget/5-second requirement; neutral bootstrap exact IDs/labels, own detached group, STOP reservation and exclusive volume assumption, final sample/actual exit zero/handshake. Fresh broker/preflight.json inspected as contextual configuration evidence, not supervisor manifest.

Initial positives: fixed budget constants, full immutable registered IDs/labels, fail-closed startup/periodic/final samples, independent owned-process cleanup concurrent with Docker cleanup, SIGCONT/TERM/KILL regardless of leader exit, exact stop argv and retained volumes.

Concerns to verify:

1. Initial monitor timestamp precedes monitor I/O, but first periodic timer is set after launch to now+5000 (lines117,124-125,217). Slow initial monitor causes first sample gap >5 seconds; no test simulates observation duration.
2. `deps.finish` unbounded (line150), unlike evidence record. Hanging completion write can leave supervision pending indefinitely after cleanup; likely weaker than safety-critical process leak, because cleanup precedes it.
3. `launchOwnedWrapper.stop` sends SIGKILL but confirms leader only, not surviving group members (lines174-176). Normal use should die; child-group reaping/identity limits need explicit evidence.
4. Stopped reservation/evidence accepted generically, with no structured exclusive-writer premise and no exact3GiB requirement (lines59-61). Need reconcile whether frozen execution manifest/root gate supplies these values.
5. Output accounting sampled before completion journal/handshake writes and before own descendants are killed on normal success. Need assess whether post-final writes can produce false completion under raw cap.

No fixes performed. Focused checks pending.
