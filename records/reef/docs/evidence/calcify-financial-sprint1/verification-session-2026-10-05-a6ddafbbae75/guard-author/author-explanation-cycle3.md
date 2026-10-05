# Guard author explanation — cycle3

Cycle2 P2 accepted. Exact independent1250ms async rename control rerun before source
fix: failed result/late successful artifact reproduced in `m0-cycle3-rename-red.log`.
No live Docker calls; actual adapter file operations confined to own temporary dirs.

Minimal fix: existing bounded helper supplies absolute performance deadline and
AbortSignal. Adapter temp data write remains asynchronous/cancellable, followed by
abort and elapsed-deadline gates. Final publication uses synchronous atomic local
`renameSync`, sharing same uninterrupted JS turn with gate. Once async preparation
times out, continuation cannot publish. Deadline gate also catches elapsed write
continuation when timeout callback delayed by event-loop work.

Journal before publication now records `PROOF_READY`, explicitly provisional,
rather than premature `PROOF_COMPLETE`. Finish failure records bounded `PROOF_ABORT`.
No asynchronous evidence operation follows successful publication inside supervisor,
so completed commit cannot be relabeled failed by later journal operation. Root
completion criterion: verified CLI exit0 plus valid committed handshake, actual
wrapper exit0 and final sample; READY journal alone insufficient.

Explicit limitation:1second bound covers async preparation/cancellation, not strict
end-to-end syscall latency. Sync rename filesystem/kernel stall or broader Node stall
can block event loop. No timer callback can interleave gate/rename; control deliberately
blocks commit1050ms under production1000ms preparation budget and returns consistent
success. Root accepted narrow local tradeoff; module comments disclose it. No new
provisional-consumer architecture or daemon process-discovery cleanup introduced.

TDD evidence preserved:
- `m0-cycle3-rename-red.log`: exact independent1250ms control reproduces defect.
- `m0-cycle3-focused-red.log`: first4controls fail; author test fixture incorrectly
  prepared output twice. Corrected fixture without deleting/reusing any proof dir.
- `m0-cycle3-focused-corrected-red.log`:4 genuine failures after fixture correction.
- `m0-cycle3-focused-green.log`:4/4 adapter controls after local fix.
- `m0-cycle3-frozen-green.log`:29/30; test-only10ms normal filesystem evidence cap
  too short. Production budget unchanged; first async-rename control now uses exact
  production1000ms cap/1250ms injected delay. Other fs controls use100ms caps and
 150ms/125ms deliberate delays, plus explicit write-start assertion.
- `m0-cycle3-frozen-green2.log`:30/30 pass, original26 retained. Runtime8.059seconds.

Four added controls use actual adapter: no async-rename dispatch with1250ms delay;
timed-out temp write leaves no completion and records abort; blocked write continuation
fails elapsed deadline without marker; sync commit excludes timer callback interleave.
Only own STOP/process-group tests elevated. No broker/daemon command executed.

Frozen command:
`node --test scripts/dev/calcify-financial/proof-supervisor.test.mjs > .planning/calcify-session-2026-10-04/guard-author/m0-cycle3-frozen-green2.log 2>&1`
Node22.22.1; syntax checks both modules pass.

Frozen SHA256 supervisor `150722f9b26a61971db04084146979c9938795ff5e3f113811de984f614db1d5`;
tests `c88c84479fab5ecbc2c87e6f6d4b3920cf31be8bbdc96ef08bb44b64a1b10fdc`.

Prior disclosed limits retained: sampled/noncontinuous resources, final sample before
small terminal metadata; stopped reservation frozen premise; retained-PGID children
only; SIGKILL/host loss prevents cleanup; root owns live Docker integration.
