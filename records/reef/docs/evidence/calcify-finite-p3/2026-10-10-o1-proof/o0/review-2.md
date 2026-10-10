# O0 source contract independent review

Review instance: 2 of 3. Planning-only target; no implementation or live proof reviewed.

## Preliminary blind ledger — recorded before author explanation

Frozen spec SHA256 `eec721aa60c1b64a7bada0a973b7b5d4e77510454e9e853fcd8a6a6f8f7c6739`; frozen patch SHA256 `a5da8d8937c1f31948d6867b0389bbf2442a5f25de0122ef53425ebe01ff500f`. Generated new-file diff hashes identically. HEAD `7aba4d0af`; runtime/contracts/scripts remain identical to `51cd90eee43d257bad4f973fc9bd81f273bb4ef7`. Dirty `docs/WORK_PLAN.md` and untracked planning/spec files excluded except explicit review target. Separate author explanation and earlier review/spike packets not read. Canonical WORK_PLAN status incidentally names earlier policy finding; no earlier rationale or review packet loaded.

| Question | Independent evidence | Preliminary result |
| --- | --- | --- |
| DAY compatibility and fixture economics | Spec lines34–43,175–189; `PlatformCommandParsers.kt:129`; `order_execution.proto:156`; `MatchContextResolver.kt:75`; `service.go:436–474,1094–1107` | DAY supported end to end; modify quantity is total, greater than filled. Fixture yields12 outcomes,3 trades,6 executed units,15 capture members; no incompatibility found. |
| Immutable acceptance/revision semantics | Spec lines47–76,92–128; `processor.go:145–155,506–607`; `MatchContextResolver.kt:30–40,91–109` | Actual missing modify/cancel economics correctly identified. Optional new typed fact and separate capture state are credible bounded extensions. Business rejection must distinguish attempted `acceptedOrder` payload from actual successful `accepted` result; current producer includes attempted submit facts on rejected submits. No contradictory implementation claim found. |
| Logical source bound and closure | Spec lines21–27,138–169,284–311; RFC §5.2; `runner.go:182`; `kafka.go:481–545`; `CalcifyResolverRuntime.kt:42,62` | Atomic matcher event/command-offset commit supports at most one committed source record per command publication. Finite runtime must pin transactional Redpanda path, batch1 and read-committed capture; nontransactional NATS fallback cannot inherit same argument. Full fetched-suffix reserve and complete-record windows avoid paused future-header dependency. Physical aborted records/amplification expressly remain preflight concerns. |
| Durable ingress and restore | Spec lines193–282,305–311; `StreamCommandIntake.kt:204–237`; `PlatformHttpServer.kt:2554–2610,2640–2674`; `service_snapshot.go:164–179,318–321` | Existing seam gaps correctly identified. Budget-row transaction, before-send charge, UNKNOWN stop, old-writer fencing and bound-snapshot identity are implementable proposals; live/store acceptance remains O2 gate. |
| Fault/restore accounting | Spec lines293–310 | Must retain malformed record and barrier without claiming completed coverage; future implementation should distinguish broker resume position from completed frontier. Existing text separates positions and disallows partial checkpoint/output; no present blocking gap established. |
| Dispatch and proof boundary | Spec lines313–349; overnight plan O0/O1/O2 and adverse acceptance rows | O1 fact/capture proof separated from O2 activation/producer restore; O3–O5 remain queued. No P3 completion or whole-process capacity claim. |

Preliminary actionable findings: none established. Candidate residuals above require author reconciliation, not assumed failure. Provisional verdict: Ready with non-blocking follow-ups, limited to O0 planning acceptance; runtime readiness unproved.

## Findings

No actionable findings remain within frozen O0 planning target. No P0/P1/P2/P3 defect established. Requirements expressly leave implementation and live verification to gated successors; their absence does not contradict O0 completion.

DAY policy is compatible with current canonical input path: `services/platform-runtime/src/main/kotlin/com/reef/platform/api/PlatformCommandParsers.kt:129`, `contracts/proto/order_execution.proto:156`, and `services/platform-runtime/src/main/kotlin/com/reef/platform/calcify/MatchContextResolver.kt:75`. Matcher uses ordinary resting path unless IOC residual handling applies; modify rejects total quantity at/below filled quantity and rematches when price/priority changes (`services/matching-engine/internal/app/service.go:295`, `:436`, `:464`). Frozen fixture has consistent lifecycle counts and funding notional. No new TIF enum or agreed architecture replacement needed.

## Plan Review

O0 satisfies required membership, replay identity, finite logical budgets, closure, durable ingress and restore design coverage:

- Complete committed record/window with prefix dependencies and full suffix reserve addresses future-header closure deadlock; numeric offset gaps handled as positions, not missing records (spec lines21–27,138–165,299–303).
- Original acceptance remains immutable; amend revisions precede nested fills; both order effect pointers advance per trade; cancel/reject semantics distinguish lifecycle transition from finance (spec lines92–112). Actual cancel returns generic accepted result, correctly captured by gap analysis (`services/matching-engine/internal/app/service.go:362`).
- Member provenance differs from business execution identity; certified duplicate batch replay suppresses revision/fill mutation while advancing physical coverage (spec lines114–128). Batch1 plus transactional matching path supports16 committed records for16 possible command publications (`services/matching-engine/internal/streamdirect/runner.go:182`; `services/matching-engine/internal/streamdirect/kafka.go:524–545`).
- Durable finite adapter locks one keyed budget row; every possible send charged before invocation; uncertainty stops admission and retains drain; replacement send requires bounded reconciliation and fencing (spec lines241–282). Existing separate reserve/marker operations and guardrail-before-reserve audit are accurately identified as integration work (`services/platform-runtime/src/main/kotlin/com/reef/platform/api/StreamCommandIntake.kt:204–237`; `services/platform-runtime/src/main/kotlin/com/reef/platform/api/PlatformHttpServer.kt:2558`, `:2610`, `:2653–2673`).
- Separate versioned budget and lifecycle-mode snapshot binding preserve frozen P0 canonical bytes and mode-off snapshots; changed/missing binding, history or accounting refuses restore (spec lines211–239,305–311; `services/matching-engine/internal/app/calcify_source_profile.go:84–92`; `services/matching-engine/internal/app/service_snapshot.go:164–179`, `:318–321`).
- Alternate ingress and arbitrary broker writers require enforceable denial, not launcher naming or attestation (spec lines193–209). O1/O2 acceptance includes adverse replay, failed publication, concurrent last-token reservation, restored cuts and isolation. O3–O5 retain distinct dependency gates and authority boundaries (spec lines313–343).

No heavy pivot needed from reviewed design. Atomic row locking, controlled uncertainty stop, separate capture module and optional snapshot binding fit existing seams. Actual feasibility remains O2 implementation/live gate; if those checks fail, manager must return bounded evidence and human decision gate instead of weakening contract.

## Author-Claim Reconciliation

Author explanation read only after preliminary ledger persisted. Earlier attempt/review/spike files remain unread; author explanation describes earlier response, which does not substitute for this source check.

| Author claim | Evidence inspected | Status | Review consequence |
| --- | --- | --- | --- |
| O0 changes prose only; no runtime gate passed | Exact new-file patch/hash; Git target and runtime diff; spec lines3–11,340–349 | Confirmed | Verdict applies to planning dispatch only. |
| Existing verified-led resolver cannot supply zero-trade closure | `MatchContextResolver.kt:23–62`; `CalcifyResolverProcessor.kt:51–129`; compact links contract | Confirmed | Separate prefix topology justified. |
| Optional typed fact participates in existing semantic checksum; old absent field can preserve bytes | `processor.go:145–155,397–408`; `semantic_checksum.go:24–49`; `CalcifyContract.kt:101–128` | Confirmed as implementable approach | Cross-language absent/new goldens still mandatory O1 acceptance; no future checksum result presumed. |
| DAY correction fits existing API/protobuf/resolver and matcher lifecycle | Canonical parser/protobuf/resolver reads above; `service.go:295–315,390–474` | Confirmed | Earlier mismatch does not persist in frozen target. |
| Managed EOS patterns exist but capture/restore still need tests | `CalcifyResolverRuntime.kt:42,59–68`; `CalcifyResolverProcessor.kt:125–146`; spec lines284–311 | Confirmed | Reuse architecture, retain dedicated cache/abort and cut tests. |
| Current durable intake needs transactional finite integration | `StreamCommandIntake.kt:204–237`; `PlatformHttpServer.kt:2519–2677`; spec lines241–282 | Confirmed | No claim current store already provides finite admission. |
| Lifecycle mode binding affects recovery even with same matching state | `processor.go:303–322`; `service_snapshot.go:164–179,318–321`; spec lines230–239 | Confirmed | O2 producer snapshot and canonical replay binding cannot be omitted. |
| Prior focused DAY tests and retention520 passed | Test definitions inspected; prior command logs not loaded/rerun | Unverified execution | No passing-test claim incorporated into verdict. Prose review supported by current source. |
| ACL/listener containment and whole-process resource bound remain open | Spec lines154–173,193–209,278–282; author risks | Confirmed | No live readiness or capacity transfer from planning acceptance. |

## Verification Performed

Executed non-mutating checks:

- `git status --short`, `git log -5 --oneline`, `git branch --show-current`, `git rev-parse HEAD`: branch matches bootstrap; HEAD `7aba4d0afda117d861df49f0c663c84c31a96476`; unrelated dirty planning/doc state preserved.
- `shasum -a 256 docs/work/CALCIFY_FINITE_P3_SOURCE_CONTRACT.md .planning/calcify-p3-overnight/o0/source-contract.patch`: exact frozen hashes, rechecked after reconciliation.
- `git diff --no-index /dev/null docs/work/CALCIFY_FINITE_P3_SOURCE_CONTRACT.md | shasum -a 256`: exact frozen patch hash `a5da8d8937c1f31948d6867b0389bbf2442a5f25de0122ef53425ebe01ff500f`.
- `git diff --name-only 51cd90eee43d257bad4f973fc9bd81f273bb4ef7 -- services contracts scripts`: no output; unchanged runtime baseline.
- `git diff --check`: exit0.
- Python local Markdown target check:5 local links,0 missing. Fragment anchors not mechanically validated.
- Codebase-memory `index_status`, bounded `search_graph`,11-path `check_index_coverage`: generation2026-09-30 at `/Users/dsteele/repos/reef`, different checkout; changed/not-tracked paths read directly in current worktree. Graph supplied positive leads only; no exhaustive graph claim.
- Serena manual read; active language server Svelte, bounded current Go/Kotlin source reads used.

Two exploratory shell reads returned nonzero because unmatched Zsh source globs/missing guessed filenames; explicit `rg --files`/known-path reads then recovered relevant evidence. No claim those failed reads passed. No runtime suite, live broker, SQL integration, throughput test, topic mutation or external write executed. Sole artifact mutation: this leased review report.

## Open Questions And Residual Risks

Residual implementation obligations already covered by acceptance design:

- Pin finite launch to transactional Redpanda matching runner, batch1 and read-committed capture. NATS publication/redelivery semantics cannot inherit16-source-record argument; physical aborted transaction history and fetch amplification need preflight inventory.
- On invalid record, retain exact evidence and lane barrier while completed frontier stays before record. Any durable resume beyond faulty record must retain equivalent pending/fault accounting; do not let Streams offset commit masquerade as completed coverage.
- Preserve existing distinction between attempted rejected-submit `result.acceptedOrder` payload and actual successful `result.accepted`; source table forbids success contradiction, not attempted command evidence.
- O2 must prove guardrail audit shares finite bound, publish-state races and late acknowledgements preserve reservations, old writers fenced before replacement, complete restore binding and actual bypass denial. No optimistic availability guarantee under UNKNOWN.
- Physical broker/native/JVM limits, live transaction/restart behavior and future financial/SQL cut compatibility remain unproved. O1 model tests cannot discharge these gates.

## Verdict

**Ready** for O0 planning acceptance and gated O1 dispatch. No implementation/live readiness or completed P3 claim. Review instance2of3 consumed; one instance remains under existing cap. Review budget cannot restart through spike, replacement or renamed unit.

## Recommended Next Actions

Manager records acceptance, then leases O1 producer/capture implementation and tests defined in frozen map. Keep O2 activation/producer restore and downstream financial/SQL gates closed until predecessor implementation reviews and required live evidence pass. Any material architecture/scope pivot returns initiating task and human approval gate; reviewer starts no new workstream or review instance.
