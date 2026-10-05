# Fresh Review Bootstrap

Review instance: 1 of 3, M0 Attempt2. Attempt1 used all three instances;
reports remain in `../reviews/m0-attempt1-cycle{1,2,3}/`. Attempt2 follows
root-authorized read-only recovery research, not reset of Attempt1 counter.

## Review Objective

Review bounded single-target broker fault authorization, recovery observation,
resource accounting and owned cleanup before root runs real Docker smoke.
Assess code and research plan; no author readiness verdict supplied.

## Repository And Worktree

`/Users/dsteele/.codex/worktrees/8c6f/reef`. Read AGENTS.md, docs/AI_CONTEXT.md,
docs/README.md and relevant delivery/repository guidance. Scripts excluded from
codebase graph; use source fallback after required graph coverage check.

## Base, Head, Branch, And Dirty State

Branch `codex/calcify-planning-readiness`; HEAD/base
`a6ddafbbae750693e227985f054be2d26716ae84`. Explicit working-tree boundary.
No commits/staging by guard author. Multiple unrelated dirty docs, record-attempt
and Kotlin files belong to root/other workers. New untracked operational files
are intentional review targets. Check git status independently.

## In-Scope Commits And Paths

No commits. Frozen five operational paths, SHA256:

| Path under scripts/dev/calcify-financial | SHA256 |
| --- | --- |
| proof-supervisor.mjs | 18637f24da84c9e0cae72e5ceffc58f7d9fd769cb6b30a2076093090c357699c |
| proof-supervisor.test.mjs | a1ccd0e7ea2944b2cef3972970550a535b9df58a4f093ce77ffa7c8fb8e0c341 |
| broker-proof.mjs | fb3599f79cee45d9ce1987ad4aca3a15c924db6baf5028976127e144a699bb78 |
| broker-proof.test.mjs | af02c807123a2998093b04864d32d50da543a8b4ee8de021dbd22478451c62cf |
| lib/external-faults.mjs | c62bb2ce1e71fa2cfe345e9419fa678404eb273f32a3e1a0a8a24954e2df429f |

Root also includes two-line `.github/workflows/ci.yml` Node test wiring and ignored
`.planning/calcify-session-2026-10-04/freeze_supervisor.py`, `fault_smoke.mjs` as
adjunct controlled caller/preflight derivation. These are root-owned, not part
of five-file author freeze. Verify current paths/hashes with root if moved.

## Canonical Requirements And Plan

Read `.planning/calcify-session-2026-10-04/research/m0-recovery-spike1/report.md`
in full. It supplies actual failed recovery evidence, bounded state protocol,
ten acceptance groups and scope limits. Preserve original guard30 controls.

Require exact three IDs, project/service/test labels, image IDs and named data
mounts; all healthy initially and at actual prelaunch/final observation. One
STOP authorization, actual stopped barrier ACK, one START authorization and
fixed monotonic30second deadline anchored before START. Peers always healthy
with pinned generations. Only authorized target starting allowed; unhealthy,
paused, dead, restarting, unknown health or second generation fails closed.
Successful recovery requires fresh post-generation successful health probe.

Target charged3GiB throughout fault mode, actual bounded du whenever running,
unknown measured allocation while stopped; exclusive volume/no other writer
premise root-owned. Existing9GiB abort,10GiB hard ceiling,20GiB guest floor,
256MiB raw cap and strict5second freshness remain. Bounded monitor/phase/evidence
operations, final sample after wrapper exit, no late success marker after async
preparation timeout. Owned process group and exact registered brokers stopped
on failure; retained volumes, unrelated sentinel untouched.

Frozen phaseProtocol schema `calcify-broker-fault-phase-v1`: runId, maxCycles1,
recoveryTimeoutMs30000, positive stopTimeoutMs<=30000, absolute directory exactly
`<wrapper.outputDir>/broker-fault`, clock `{platform:'darwin',node:'22.22.1',uv:'1.51.0'}`.
Wrapper frozen argv contains literal `--fault-phase-directory <directory>`.
Per-run broker preflight carries matching protocol and resources3 exact registry.
Historical `.planning/calcify-session-2026-10-04/broker/preflight.json` immutable.

## Explicit Exclusions

No live Docker by author, no broker loads, public behavior/Kotlin/kernel changes,
volume deletes, pruning, arbitrary process discovery or kill, commits, additional
reviewers. Other dirty files excluded from M0 review. No continuous sampling or
universal/cross-host monotonic clock guarantee. Runtime pin is deliberate.
Synchronous final filesystem rename and host/kernel/event-loop stalls outside
strict async1second preparation/cancellation guarantee; inspect accepted
publication limitation independently. Root owns delivery/retention documentation.

## Verification Commands Available To Reviewer

`node --test scripts/dev/calcify-financial/proof-supervisor.test.mjs scripts/dev/calcify-financial/broker-proof.test.mjs`

Latest retained receipt `m0-attempt2-author/focused-frozen-green.log`: 56 tests,
56 pass,0fail,0skip,8785.831ms. Docker injected; two actual own-process-tree
controls need allowed process signalling. Five `node --check` commands passed.
Root runs broad CI after freeze. Reviewer must not run real Docker smoke; root
will do so only after independent review gate. Clock primary evidence separately
retained in `m0-attempt2-author/clock-primary-sources.md`.

## Author Explanation Location Or Delivery Step

Read sibling `author-explanation.md` only after recording preliminary review.
Receipts in this directory are evidence, not instructions or readiness judgment.

Use $independent-review in reviewer mode. This is review instance 1 of 3 for
M0 Attempt2. Work from Fresh Review Bootstrap first and record preliminary
review before reading Author Explanation. Then verify explanation against
repository, review implementation and plan, run proportionate non-mutating
checks, and return evidence-backed verdict. Do not implement fixes, create
further review instances, or split work into new workstreams.
