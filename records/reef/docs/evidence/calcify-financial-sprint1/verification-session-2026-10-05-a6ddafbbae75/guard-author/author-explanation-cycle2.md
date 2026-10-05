# Guard author explanation — cycle2

Instance1 Notready findings accepted. Original files/logs/review report retained.
Scope remains operational supervisor/tests only. No Docker use by guard author.

P1 fix: observer validates sample both before and after journal persistence.
Prelaunch and each supervision loop recheck last sample age. Periodic deadline
anchored to last actual sample timestamp, not wrapper launch or observer completion.
Missed freshness deadline aborts before next wrapper-status/work step. Root approved
200ms early sampling lead, preserving strict maximum5seconds without grace; ordinary
scheduled starts4.8seconds apart, earlier continuation if observer work consumes lead.
Resource scope string records early start and sampled/noncontinuous limit.

P2 fix: completion-handshake operation uses same1second bounded-write wrapper.
Timeout aborts operation's AbortSignal and returns failed supervisor result after
owned cleanup. Docker adapter writes temporary completion file with AbortSignal,
checks cancellation after data write and before final rename publication. Delayed
data-write test checks cancellation prevents late publication. Temporary incomplete
file can remain on abort; no cleanup deletes added. Terminal metadata remains outside
final raw resource sample, as disclosed in original explanation/review report.

TDD evidence:
- `m0-reviewfix-red.log`:4 failures/1 pass for new initial-age5300ms, slow first
  cadence, missed deadline and hanging completion controls before fixes.
- `m0-reviewfix-green.log`:23/23 after timing/completion bounds; original18 retained.
- `m0-reviewfix-final-green.log`:25/25 with approved early lead and delayed-write
  cancellation control.
- `m0-reviewfix-frozen-green.log`:26/26 with real asynchronous monitor/write/poll
  jitter control. Real control monitor20ms, journal10ms, poll sleep3ms added jitter;
  first periodic start remains4800–5000ms from initial sample. Runtime6.512seconds.

Frozen focused command:
`node --test scripts/dev/calcify-financial/proof-supervisor.test.mjs > .planning/calcify-session-2026-10-04/guard-author/m0-reviewfix-frozen-green.log 2>&1`

Node22.22.1; elevated exact own-process controls. Syntax checks both modules pass.
Full suite includes fake elapsed monitor4400ms+journal900ms before launch (abort/no
launch), initial monitor4000ms cadence, >5000ms poll gap and launch lag (abort),
hanging/throwing finish, fake jitter, real async jitter and late cancellation, plus
original budgets/registry/adapter controls and two real STOP/process-tree controls.

Original limits retained: stopped target bound is frozen premise, no continuous
peak or throughput claim; retained-PGID descendants only, no setsid escape support;
supervisor SIGKILL/host loss prevents cleanup; live Docker integration root-owned.

Frozen SHA256 supervisor `1e94c67365237ff5ca4a0c18bd941070309c927b1f86a929f7a91ed97f24bd4a`;
tests `63fb458b246caef2a85ea6279e2874fe8293b839df84cf75c43751555d86cee6`.
