# Calcify P3 first useful path — author acceptance matrix

Read-only source audit and existing RFC reconciliation, October 6, 2026. Author planning evidence only; no independent review verdict. No runtime load/tests executed for this audit. No source or owner-document edits.

**P3 means complete finite venue→financial decision→SQL→existing API path.** E4 diagnosis informs resource configuration and binding bottleneck; E4 does not approve authority cutover or finish P3.

Proposed smallest coherent slice: isolated opt-in run, one instrument/cash asset/security asset, two explicitly identified accounts, journaled opening resources, unreserved gross DvP, deterministic source-prefix admission, one funding/new-attempt repair, one PostgreSQL financial bundle and existing authenticated settlement reads. Legacy retains its own runs/accounts. No reservations, external effects, netting, migration or throughput SLO claim.

| Boundary | Existing implementation | Required P3 work / finite acceptance |
|---|---|---|
| Real source intake and matching | Durable command intake, matching outcomes, run-scoped books and retained order index. | Real submit/match plus amend/cancel with zero trades. Correct run/session/instrument provenance; no dropped executions; retry unchanged command produces no duplicate effects. |
| P0 acceptance lifetime | Duplicate `(run,order)` rejected while record retained; bounded retention permits reuse after eviction. | **Proposed bounded alternative: retention0**, finite declared order/run count, resource preflight, snapshot configuration binding. Prove reuse rejection after fill/cancel and separate-process restore; different runs may reuse raw ID. Does not establish retention-independent no-reuse. |
| Trade context | Production Phase1/2 emits `MatchContextResolvedV1`; immutable acceptance and trade facts/provenance available. | Consume real resolved records; stable matcher execution identity plus run/session/instrument scope; duplicate context harmless, conflicting same identity fails. Exact source-vs-resolved membership. |
| Lifecycle/coverage | Relevant source outcomes already exist; production resolver’s verified-led demand reading does **not** emit every lifecycle fact or complete coverage manifest. | New versioned lifecycle/progress envelope and source-slice manifest. Enumerate trade and zero-trade members, revisions/dependencies, explicit disposition per member; duplicate/out-of-order deliveries close exact membership once. |
| Source-prefix gate | Executable E2 model only. | Freeze allowed source ordering, maximum slice/fanout/bytes/poll suffix and full completion/seal reservation. At high water, drain admitted closure before new slices. Restore mid-window retains membership/frontier; future-window burst cannot block admitted seal. Declare head-of-line isolation limit. Invalid/unsupported ordering fails before admitting uncloseable window. |
| Ordered financial admission | Test-only synthetic input fixtures. | Durable common order for captures, funding and repair; stable namespace/domain/action keys and normalized digests. Same key/request returns original disposition; changed request conflicts. Acknowledgement after configured durable acceptance. No arbitrary API-clock order. |
| Financial kernel/adapter | Test-only kernel/oracle and real-broker E3 adapter; bounded recovery evidence. | Promote/adapt reviewed semantics into runtime packaging; retain P1 tests. Real successful cash/security exchange: four balanced legs, one obligation discharge. Insufficient cash/shares produces pending plus failed attempt, zero partial leg. New funding and distinct attempt settles once; old retry remains deduplicated. |
| SQL bundle | Production legacy settlement fact store/materializer exists; Phase1 receipt SQL is locator arrival only. | Consume committed financial decisions. One transaction validates projector epoch, unique identity/digest, expected entity versions, writes journal/trade/account/obligation/exception bundle and exact history checkpoint. Crash after SQL commit/before broker ACK replays once; stale projector rejected; conflicting digest fails. Bounded batches, no per-decision full-history scan. |
| Existing API/read progress | Authenticated settlement facts/obligations/ledger routes and legacy projections exist. | Read coupled bundle plus business-progress token from one statement/shared repeatable-read snapshot. Staging-only history advances delivery checkpoint but not financial business version. Lag returns explicit pending/stale behavior. Verify exact expected rows and API balances/obligation state before and after repair. |
| Recovery/retention | E3 synthetic certified-cut proof, immutable source and result history. | End-to-end restart restores source gate/admission/owner/SQL checkpoints without duplicate execution/effects or old result republication. Missing promised history refuses activation; finite disk/source/history availability preflight. |
| Measurement | E4 component experiments underway; no assembled path result. | Record stage lag/byte/write costs and settled/pending counts for this finite slice. No10k qualification until unchanged complete required path and owner-frozen workload/SLO envelope. |

## Dependencies and explicit owner choices

- Source-prefix selection remains recommendation from RFC default; actual allowed source order/closure must be demonstrated.
- Retention0 is proposed configuration-scoped P0 alternative, not accepted infinite-resource policy. Freeze finite run/order lifetime and restore configuration; record memory/disk bounds.
- Reservation fixture remains deferred; first slice unreserved.
- Authority ADR required before live financial authority adoption. Candidate isolation/shadow comparison cannot imply approved log authority or shared writable legacy accounts.
- Availability numeric windows, production topology and capacity/freshness/RTO thresholds remain owner choices.
- SQL/API seam missing from E4 does not block component result; it remains dependency for P3 complete-path pass.
- **Kernel presently hardcodes `buyer`/`seller`, `USD_NANO`/`ACME_SHARE`.** First finite slice can declare exact mapped test accounts/assets; general runtime account support requires explicit adaptation and invariant tests. Do not claim current kernel generic.

## Verified existing filenames

All paths below relative to `/Users/dsteele/.codex/worktrees/8c6f/reef`.

- Contracts: `contracts/proto/calcify.proto` (`MatchContextResolvedV1`, no financial/lifecycle/gate messages); `contracts/proto/order_execution.proto`.
- Runtime foundation: `services/platform-runtime/src/main/kotlin/com/reef/platform/calcify/{CalcifyPipeline,CalcifyResolverRuntime,CalcifyResolverProcessor,MatchContextResolver,BrokerVenueSourceReader,CalcifyReceiptStore}.kt`.
- Packaging: `services/platform-runtime/src/main/kotlin/com/reef/platform/Main.kt:9`; pipeline stages currently extractor/verifier/receipt/resolver.
- Source/identity tests: `services/matching-engine/internal/app/{run_scope_test,terminal_retention_replay_test,terminal_retention_recovery_test}.go`.
- Resolver tests: `services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/{MatchContextResolverTest,CalcifyResolverProcessorTest,CalcifyRunNamespaceTest,CalcifyActualFullFactObserverTest}.kt`.
- Financial proof: same test root `financial/{FinancialKernel,FinancialOracle,FinancialBrokerProbe,FinancialCommittedCut,FinancialPartitionCut}.kt`, corresponding `*Test.kt`; `FinancialKernel.kt:151` fixed accounts/assets.
- Existing models: `scripts/dev/calcify-financial/{gate-model,gate-model.test,reservation-model,reservation-model.test}.mjs`.
- Existing exact economic fixtures: `docs/evidence/calcify-financial-sprint1/fixtures.json`: `two-asset-success`, `insufficient-cash`, `insufficient-shares`, `identical-retry`, `changed-request-same-key`, `paid-obligation-new-action`, `cash-funding-new-attempt`, `security-funding-new-attempt`.
- Legacy SQL surface: `services/platform-runtime/src/main/kotlin/com/reef/platform/application/settlement/{SettlementFactStore,TradeSettlementObligationMaterializer,SettlementLedgerProjection,SettlementObligationProjection}.kt`.
- Legacy tests: corresponding `SettlementFactStoreTest`, `PostgresSettlementFactStoreIntegrationTest`, `TradeSettlementObligationMaterializerTest`, `SettlementLedgerProjectionTest`, `SettlementObligationProjectionTest`.
- Existing routes: `services/platform-runtime/src/main/kotlin/com/reef/platform/api/PlatformHttpServer.kt:999`,`:1011`,`:1023` (`/api/v1/settlement/facts|obligations|ledger/{scenarioRunId}`); `services/platform-runtime/src/main/kotlin/com/reef/platform/api/SettlementAdminGateway.kt:487`,`:502`,`:526`.
- SQL caution: `services/platform-runtime/src/main/kotlin/com/reef/platform/application/settlement/SettlementFactStore.kt:879` loads existing complete run facts before append;`:916` reads multiple tables through connection without establishing shared snapshot. Existing behavior is not new bounded projector/common-snapshot contract.
- RFC authority: `docs/work/CALCIFY_SYSTEM_ARCHITECTURE_RFC.md:205` source extension;`:225` gate;`:489` SQL/API;`:631` P0–P4;`:957` isolated rollout.

Future lifecycle/admission/financial-SQL contract and test filenames **not implemented/not frozen**; do not present guessed names as existing.

Graph project `reef-calcify-session-8c6f`, exact root verified, generation `2026-10-05T07:02:27Z`. Cited indexed source paths checked with `check_index_coverage`: metadata matches, best-effort only. Direct current source reads establish material behavior claims; model/evidence/owner documentation inspected directly. Historical documentation is not treated as current runtime implementation.
