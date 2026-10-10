# Preliminary independent review

Review instance: 1 of 3. Combined O1, all56 implementation paths. Author explanation/interpretive receipts not read before this ledger.

## Ground truth

HEAD/base45211653d2f5b59dd25f4a4db42883881b4d6eb1; branch codex/calcify-p3-overnight-2026-10-09. SHA256 all56 combined-files.json paths matches. Actual dirty boundary includes excluded manager WORK_PLAN/.planning only beyond target. Read canonical O0 source contract, overnight plan and component neutral bootstraps; producer/contract/capture/tests current source. Graph reef-main generation2026-09-30 different checkout, producer metadata changed/new Kotlin missing; current source fallback used.

## Preliminary concerns

1. Potential P1/P2 restore-validation defect: FiniteLifecycleReducer.validateCertifiedHistory trade branch validates dependency states and quantity conservation, but does not recheck trade.runId/source/instrument/currency/price/current limits, execution pair IDs/economics/roles, command-to-trade relation or timestamp. Recomputed capture digest may permit contradictory restored receipts. Need bounded temporary mutation probe before final severity.
2. Certified command restoration appears weaker than direct parsing: accepted modify/cancel result engine identity/timestamp and rejected result shape/identity not rechecked. Need probe/classify with first concern.
3. Parser calls strictMapper.readTree then existing parser: trailing JSON behavior warrants narrow check; no finding yet.

## Positive source observations

Producer facts optional/omitempty, immutable P0 hash unchanged; live runner and capture runtime explicitly refuse O2 activation. Actual12-record fixture tests cover15 members, zero-trade coverage, amendment/cancel/rejections, gaps, physical/batch replay, execution conflict, fault suffix/publication caps, rollback/reopen. No decoded cache; whole reduction validates before forward/store. No finding against accepted source-prefix plan direction; O2 live/admission/isolation/recovery remains excluded.

## Planned verification

Manager granted exclusive Java21 lease for focused finite tests plus bounded external probe. Go focused packages with /private/tmp cache. Frozen source stays unchanged; only own reports written.
