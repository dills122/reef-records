# Guard review bootstrap — cycle3

Root requests final fresh M0Attempt1 review instance3of3. Preserve prior counters,
reports and logs. Review scope only supervisor module and focused tests; no Docker
command/load or new resource container. Current broker proof remains gated.

Files:
- `scripts/dev/calcify-financial/proof-supervisor.mjs`
- `scripts/dev/calcify-financial/proof-supervisor.test.mjs`

Required contract: exact3 full Docker IDs/project/service labels and frozen
wrapper argv/cwd/new output; 9GiB abort/10GiB hard disk, 20GiB guest floor,
256MiB raw cap; strict5second freshness with approved200ms early sampling;
owned process-group/registered broker shutdown, retained volumes; actual wrapper
exit0/final sample and coherent completion evidence. Target STOP uses evidenced
root-supplied3GiB reservation and two healthy peers; no measured stopped-size claim.

Current publication contract intentionally narrows timing guarantee: asynchronous
temporary data preparation/cancellation bounded1second, final abort/deadline gate
followed by synchronous atomic local rename. Sync filesystem syscall/Node/kernel
stall cannot have strict end-to-end1second bound. Root accepted this local tradeoff.
Prior cycle2 P2: async rename in flight could publish late successful marker after
timeout; review should assess actual adapter commit and journal evidence consistency.

Review current source independently before separate author explanation. Prior
reports/control available in `reviews/m0-attempt1-cycle1/` and
`reviews/m0-attempt1-cycle2/`; original report untouched. Focused command:
`node --test scripts/dev/calcify-financial/proof-supervisor.test.mjs`.
Suite30controls, original26 retained. Docker adapter commands injected; two real
owned process controls and real asynchronous timing control. No live Docker use.

Frozen SHA256:
- supervisor `150722f9b26a61971db04084146979c9938795ff5e3f113811de984f614db1d5`
- tests `c88c84479fab5ecbc2c87e6f6d4b3920cf31be8bbdc96ef08bb44b64a1b10fdc`

Separate reconciliation file: `author-explanation-cycle3.md`.
