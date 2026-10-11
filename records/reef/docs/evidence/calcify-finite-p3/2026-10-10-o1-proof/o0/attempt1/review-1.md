# Independent O0 review

Review instance: 1 of 3. Planning source-contract review only.

## Preliminary ledger — before author explanation

Target SHA256 verified: source spec `41a96468b8a9dd700934432587e1095d5b8bfd11adb727f9f367bc460e104d2a`; patch `733fccc1ed815996f41b3e860359fe235fee02d7d7af4e7ec763bb199bd65a7a`. HEAD `7aba4d0af`; branch `codex/calcify-p3-overnight-2026-10-09`. HEAD versus runtime baseline `51cd90eee43d257bad4f973fc9bd81f273bb4ef7` changes documentation only. Dirty scope includes untracked `.planning/` and target spec; no runtime edits observed.

Blind first pass possible: neutral bootstrap, current requirements/spec and bounded source reads inspected before author explanation. Author rationale not yet read.

- Candidate P2: spec line34 freezes GTC fixture policy, while public request validator permits only DAY/IOC (`PlatformCommandParsers.kt:129`), existing protobuf TimeInForce has no GTC (`order_execution.proto:154–158`), resolver accepted-fact parser faults GTC (`MatchContextResolver.kt:75`). Same API/manual path requirement at spec187–190 therefore has unsupported policy unless new contract/API changes are deliberately included. Small correction appears DAY fixture policy; no heavy pivot needed.
- No candidate defect found in source-prefix closure design: single complete record/window, separately reserved fetched suffix, actual-record offset frontier, immutable acceptance/revision/effect separation and zero-trade coverage match current gaps.
- Remaining checks: quantify typed fact versus old checksum compatibility, verify snapshot/binding and publisher uncertainty seams; reconcile author claims without treating planned acceptance as implementation proof.

Graph `reef-main` generation `2026-09-30T21:14:17Z`, root `/Users/dsteele/repos/reef`, different checkout. Positive symbol leads only; exact-path coverage checked10 paths, most changed/not tracked. Current source reads used. Serena symbolic overview attempted; Go unavailable with active Svelte server, so bounded source fallback used.

## Findings

**P2 — Frozen GTC policy cannot enter canonical API path.** `docs/work/CALCIFY_FINITE_P3_SOURCE_CONTRACT.md:34` permits GTC only. Spec187–190 requires manual/API/simulator commands through same durable intake. `PlatformHttpServer.kt:2235` prepares request before choosing StreamAck at2249; preparation calls public command validation at2459. `PlatformCommandParsers.kt:129` admits only DAY/IOC, so fixture submit with GTC returns validation error before finite adapter or matching. Existing protocol also exposes only DAY/IOC (`contracts/proto/order_execution.proto:154–158`), and existing accepted-fact parser rejects GTC (`MatchContextResolver.kt:75`). Result: proposed fixture cannot prove required venue→source→read flow through existing boundary; raw broker/engine submission would bypass required ingress path. Smallest correction: pin DAY for finite fixture/policy, keep IOC/FOK excluded and keep fixture within declared active session. If GTC is deliberate, explicitly include new API/protobuf/transport/reader compatibility requirements and leases before dispatch. Current contract does neither. Defect bounded; no heavy pivot required for DAY correction.

No other actionable findings found within reviewed planning target. This does not approve unimplemented O1/O2 runtime behavior.

## Plan Review

- Scope matches RFC§5.1/5.2/5.3,§8.1 and P3: isolated opt-in unreserved gross DvP, immutable source facts, durable common financial order, later atomic SQL/read and funding/repair. Existing financial authority retained. No production migration or capacity qualification implied.
- Source-prefix design avoids unreachable separate seals: one complete source batch/window, dependencies in prior prefix or earlier members, full closure reservation and separate worst-case fetched suffix. Numeric offset gaps explicitly legal. One declared lane accepts head-of-line blocking. Invalid/unsupported executed records retain evidence and stop scope.
- Lifecycle contract covers zero-trade submit/modify/cancel, structured rejection including absent targets, immutable acceptance, economic revision before nested fills, previous-effect chains, terminal state and whole-record validation. Identical physical replay versus same-batch replay at new offset distinguished; reused execution outside certified batch replay faults before duplicate fill accumulation.
- Fixture arithmetic independently checked:12 commands,8 successful lifecycle operations,4 rejections,3 trades,6 units,5 retained identities,15 command/trade members. Modify total quantity4 after1 filled leaves3 before cancellation, matching `service.go:436–459`. No amended acceptance overwrite proposed.
- Budget separates32 recorded attempts,16 possible sends, serialized command/source/capture/journal bounds and reserved controls. Budget-row lock and attempt/intake transaction fit existing keyed Postgres seam; not implemented at baseline. Ambiguous publication stops new admission rather than reclaiming possible append. Old-writer fencing plus bounded offline/startup reconciliation required before replacement send; new send charged separately. Alternate durable modes, direct engine mutations and direct broker producers must be fenced, with actual denial proof.
- Optional source fact fits existing full-body semantic checksum; absent `omitempty` field can preserve old bytes. P0 profile struct/hash remains separate from new budget canonical encoding. Producer mode identity affects recovery; O2 explicitly owns optional snapshot binding and command-replay activation proof. Missing/incompatible history must refuse rather than infer genesis or reset counters.
- O1→O2→O3→O4→O5 gates remain ordered. O1 is contract/capture checkpoint; O2 adds real ingress, restore/isolation and measured actual statement/lock costs. O3 serialized/physical budgets and O4 object authorization are explicit later acceptance gates. No concealed outbox or durable-credit pivot. Timeboxes cannot establish implementation feasibility; smaller reviewed prefix remains valid fallback.
- Required correction above must precede O1 dispatch. New golden budget bytes/hash, capture wire encoding, final physical inventory and live isolation/recovery proof remain implementation deliverables rather than O0 completion claims.

## Author-Claim Reconciliation

Author explanation read only after preliminary ledger persisted.

| Author claim | Evidence inspected | Status | Review consequence |
| --- | --- | --- | --- |
| O0 prepared contract only; no runtime code implemented | Exact frozen new-file patch; HEAD versus51cd90eee name-only diff | Confirmed | Verdict concerns planning, not implemented P3 |
| Existing outcomes lack amended economics/revisions; cancel generic accepted | `processor.go:145–155,484–570`; `service.go:464`; baseline profile tests | Confirmed | Typed attempted fact and reducer revisions needed |
| Full-body checksum validator reusable | `semantic_checksum.go:25–48`; `CalcifyContract.kt:101–116` | Confirmed | Additive optional fact can retain checksum algorithm, requiring golden compatibility tests |
| Verified-led resolver cannot provide all zero-trade lifecycle coverage | `MatchContextResolver.kt:26–63`; `CalcifyResolverProcessor.kt:92–132` demand drain/publish | Confirmed | Separate prefix capture topology appropriate |
| Current intake autocommit/reserve and unpublished retry permit dual-write uncertainty | `StreamCommandIntake.kt:205–240`; `PlatformHttpServer.kt:2638–2680` | Confirmed | O2 atomic row/journal integration plus uncertainty stop required |
| Snapshot optional binding pattern supports separate lifecycle mode identity | `service_snapshot.go:23,172,318–323`; `calcify_source_profile.go:91–100,168–177` | Confirmed as seam, new behavior unimplemented | Producer activation/replay tests remain O2 gate |
| Same API/manual ingress can support frozen fixture | Spec34,187–190; request validator129 and HTTP preparation2459 | Contradicted for GTC policy | P2 correction required |
| Scoped process resources and no live proof claimed | Spec148–167,263–276; author gaps; verification receipt | Confirmed | No whole-process/live acceptance inferred |
| Existing settlement read needs object authorization | `PlatformHttpServer.kt:1776–1786` | Confirmed | O4 cannot infer authorization from route existence |

## Verification Performed

- Read AGENTS, AI context/map, task requirements/overnight plan/current board/RFC sections, relevant Go/Kotlin and transport/boundary steering, contracts/profile fixture and bounded current source.
- `git status --short`, `git log -5 --oneline`, `git rev-parse HEAD`, `git branch --show-current`: target checkout/branch confirmed; HEAD `7aba4d0af`; untracked target and `.planning/` only at review start. `git diff 51cd90eee43d257bad4f973fc9bd81f273bb4ef7 HEAD --name-only`: documentation-only differences, baseline runtime unchanged.
- `shasum -a 256 docs/work/CALCIFY_FINITE_P3_SOURCE_CONTRACT.md .planning/calcify-p3-overnight/o0/source-contract.patch`: both frozen hashes match bootstrap. Python `subprocess.run(['git','diff','--no-index','--','/dev/null',spec])`: exit1 expected for new file; stdout exactly equals frozen patch bytes.
- `git diff --check`: exit0. `git diff --no-index --check /dev/null docs/work/CALCIFY_FINITE_P3_SOURCE_CONTRACT.md`: exit1 for new-file differences, no whitespace diagnostics. Python relative-link existence check: no missing links.
- Graph project/index/symbol lookup and10-path coverage inspected; stale/different checkout treated as provisional. Serena symbolic tool unavailable for Go, current source fallback used. Some exploratory commands named nonexistent paths or shell glob and failed; corrected with actual discovered paths. No absence/exhaustiveness claim relies on those failed checks.
- Author `verification.json` reports retention520 exit0; inspected receipt only, not independently rerun. No runtime tests or live broker/SQL checks executed by reviewer; none necessary for new prose target. Baseline tests cannot establish proposed P3 behavior.

## Open Questions And Residual Risks

Actual Streams fault/abort/cache restoration semantics, physical memory/broker/client bounds, concurrent last-token transaction, producer fencing, real denial tests and coordinated cuts remain runtime proof obligations. Spec calls them out and refuses unsupported activation. Exact new capture schema/canonical digests need focused old/new fixtures before O1 acceptance. O2 complexity may consume remaining overnight budget; fallback cannot weaken admission/restore requirements or claim full P3.

## Verdict

**Not ready.** One real P2 policy/compatibility defect blocks O0 acceptance under overnight plan. Source-prefix design and bounded uncertainty stop otherwise support scoped implementation. No heavy pivot gate requested. Review instance1of3 consumed; two instances remain for whole O0 unit, not resettable through replacement or smaller labels.

## Recommended Next Actions

Initiating developer answers finding `Accept`, `Dispute with evidence`, or `Defer with owner and rationale`. Prefer bounded DAY correction; refresh frozen spec/patch and author packet. Manager decides fresh instance2of3 after material policy change and accepts O0 only when compatibility corrected. Do not dispatch dependent implementation from this verdict.
