# Heap CI portability correction, worker handoff

Source writers stopped. Only rate-proof.mjs and rate-proof.test.mjs changed; source-freeze.json binds original committed and final bytes. Parent owns exact CI, integrated checks, full component independent review cycle 3, docs, retention and publication. Original cycle 1/2 receipts and archived evidence untouched.

## Change and scope

Both runAdapter and calibrateAdapter now call same capacityLockPath() with no caller arguments. Resolver preserves fixed /private/tmp/reef-financial-rate-capacity.lock on darwin; other platforms use Node tmpdir() plus same fixed filename. Pure resolver accepts platform/temp inputs for unit controls only. Public executable call signatures unchanged; callers cannot select per-load lock. Exclusive wx creation, stale-lock refusal and close/unlink behavior unchanged. Session-local pinned macOS Java21 launcher unchanged; this fix allows Linux broker-free validation to reach existing refusal gates, not Linux real-load qualification.

## Actual verification

- hosted-original-node-ci.log: byte copy of original hosted PR475 Linux Node CI failure. Two admission tests expected RAW_EVIDENCE_HASH/PINNED_LAUNCHER but hit ENOENT at missing /private/tmp lock parent. Original outside original frozen bundle; hash recorded.
- red-missing-lock-parent.{json,log}: actual copied-source RED, unchanged tests, only two lock literals redirected to unique nonexistent owned parent. Exit 1, two expected-refusal assertions fail ENOENT. red-copy-scope.json describes instrumentation; actual host remains macOS.
- red-platform-lock-resolver.{json,log}: actual tracked-source TDD RED, exit 1, new test fails because capacityLockPath missing.
- green-node.{json,log}: actual tracked source Node suite, exit 0, 38/38. Both prior admission controls still reach intended refusals.
- green-linux-platform-copy.{json,log}: copied-source broker-free Linux branch control, exit 0, 38/38. Only process.platform overridden to linux before module body; explicit owned TMPDIR. linux-platform-green-scope.json hashes original/copy bytes and states limitation. This is not actual Linux host evidence. Tests exercise production resolver/callers and original rejection controls with that branch selected.

Every command receipt captures exact argv, cwd, start, elapsed, exit, before/after five-source hashes and equality. Node runs do not copy Kotlin XML. No Kotlin build, runtime capability recapture, broker/client/topic/load or Docker; three Kotlin sources and compiled capability identities unaffected by this JavaScript-only correction.

## Review explanation

Minimal shared resolver repairs platform-dependent lock parent without weakening serial-load exclusion or adding caller override. Pure controls cover darwin, Linux default /tmp, Linux alternative temporary root and current runtime default. Instrumented copied-source run verifies actual runAdapter rejection paths when default platform branch selects Linux temporary root. Inspect two-source-delta.patch and all five frozen hashes; full component review must include original heap protection and cycle 2 peak-scope fixes. Current task does not reset review count or qualify real calibration costs/E4 readiness.
