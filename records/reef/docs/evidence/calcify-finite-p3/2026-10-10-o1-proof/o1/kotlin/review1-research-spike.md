# Review 1 bounded research spike

Scope: read-only diagnosis and temporary Java21 model probe. Combined review instance 1 of 3 consumed; report Not ready. No counter reset, source correction, proto generation, Go edits, Gradle build or live activation. Earlier frozen target and all receipts remain preserved in `../review1-target/` and original Kotlin evidence files.

## Reproduction and identity

Repeated exact reviewer Java source from `../review-1-verification.json` using retained compiled source identity and same Java21 `-Xmx192m` classpath. Source-mode argv/cwd/exit and hashes saved in `review1-reproduction.json`; code saved in `Review1RestoreProbe.java`; stdout/stderr in `review1-reproduction.log`. Exit 0. Source SHA256 `8c55c775c94406348f1d803f1f1c8ca541dcbe82b8b85f1a850d97613e4b13b2`; log SHA256 `6143ca41872a649721f3fd869211e1152abeb60815b750d22f3f9a5ed9a82d1e`, identical to reviewer final probe.

Observed five invalid restore variants accepted: out-of-profile trade price, foreign run, foreign source offset, two blank execution facts, and cancel result with wrong order/engine/time. Observed appended second JSON root accepted by parse and reduce: prefixClosed=true, outcomeCount=1, resume=1. No topology/live broker invoked in this reproduction.

All 46 frozen owned implementation files match aggregate `6cbbd03874336027f3b887f64499f555431cc1d82887c209745a93612ffd449a`. All 43 recorded compiled-class hashes match. These are bounded checks, not whole-classpath provenance certification. Prior final205/0failure receipt remains historical candidate evidence; it does not refute these failures.

## Requirement and failure map

Canonical `docs/work/CALCIFY_FINITE_P3_SOURCE_CONTRACT.md`, Capture state/source-prefix closure/restore: complete-record validation before output/checkpoint; invalid member retains lane fault without partial coverage; missing/changed dependencies and incompatible certified cuts refuse restore. Implementation map O1 explicitly requires missing/changed/duplicate/cross-run members, atomic malformed record and abort/restore parity.

| Requirement / facts | Fresh source validation | Frozen reconstruction gap | Proposed shared gate |
| --- | --- | --- | --- |
| Result order/time, required event/result fields | Contract.parse lines135–142 and accepted/rejected builders lines245–248 | Rejected branch and accepted modify/cancel certify presence/disposition without result field semantics | Validate result text/time/order against typed command for both paths; accepted engine identity against immutable submit acceptance or retained row |
| Immutable accepted submit fact | Contract.parse lines161–177; acceptedFact adapter; reducer submit cap checks | Reconstruction repeats most equalities but uses separate implementation | Extract typed acceptance consistency checks shared by parse and reconstruction; retain mandatory raw-field presence checks in JSON decoder |
| Trade run/instrument/currency and source provenance | MatchContextResolver.parseBatch/resolve; reducer lines90–111 | Reconstruction lines249–255 checks deps/fills only | Shared typed trade check: exact source equals member source, bound run/scope, correct command order/time; resolve against exact current buy/sell acceptances |
| Current limits, profile caps and multiplication | Reducer amount/Math.multiplyExact/current limits | Reconstruction only quantity cap/conservation | Shared reducer helper for accepted economic/trade constraints; both paths use exact current limits, positive bounded price/quantity and checked notional |
| Source execution membership/economics/roles | Contract.parse lines147–160 | Reconstruction requires count2 only | Shared pair helper: required text/valid timestamp, distinct IDs, exact buy/sell pair, MAKER/TAKER pair and source side suffixes; exact trade qty/price/currency/instrument/time |
| Trade attached to accepted outcome/command | Decoder rejects rejected/cancel trades; reducer ties trade to command | Reconstruction member may carry independently changed command/outcome status/payload hash | Group ordered receipt members by command outcome; require trade command/status/payload hash matches preceding command, accepted non-cancel outcome; no foreign result/revision/acceptance fields |
| Closed one-value JSON source | Strict duplicate parser; checked checksum and adapters read first root | No parser EOF requirement; later roots ignored while raw bytes counted | Require one object root and EOF after optional whitespace using strict mapper trailing-token refusal or explicit parser.nextToken check before checksum/adapters |

Graph lookup was attempted per codebase-memory policy: reef-main index2026-09-30; exact new Kotlin paths missing, existing MatchContextResolver not tracked; broad symbol search did not establish target. Current exact source reads supply above map. One read hook interruption retried successfully; no knowledge gap remains for proposed bounded correction.

## Accepted versus rejected economic policy

Typed binding/scope/order-ID/participant/account/oneof/policy and bounded explicit text checks remain unconditional. Rejected attempted quantity/price are recorded as decoded strings; they are not accepted economic state. Do not apply positive numeric profile caps or filled/current-limit conditions to rejected attempts. Rejections require valid structured rejection identity/code/reason/time, zero trade/execution membership and zero order/revision/fill mutation. Rejected submit's producer `acceptedOrder` object is attempted metadata and remains unindexed, as actual fixture record10 demonstrates. Accepted submit/modify and every trade require positive bounded integer economics and checked notional; accepted cancel requires exact existing open order engine identity. This separation is essential to avoid converting legitimate rejected attempts into lane faults.

## Minimal remediation options

Selected proposal: small shared typed-fact validators in existing owned `FiniteLifecycleContract.kt` plus one shared current-order trade/economics helper in `FiniteLifecycleCaptureProcessor.kt`. Fresh parse/reduction and bounded receipt reconstruction call those same helpers. Keep raw JSON mandatory-field/duplicate/checksum guards at decode boundary. Reconstructed outcome groups certify identical command/result/trade semantics without replaying a synthetic JSON source or introducing caches. Maintain explicit typed receipt shape/member order/dependency/counter reconstruction and existing encoded caps.

Rejected alternative: duplicate additional checks only inside restore. Quick but repeats current cause of semantic drift. Rejected alternative: save/reparse raw successful source history or alter protobuf shape. Larger state/contract change, unnecessary for these findings and outside requested bounded correction. Durable correspondence to real source history remains O2; shared semantic checks do not make recomputed hashes authenticated testimony.

## Negative test matrix for authorized correction

All receipt mutations recompute affected envelope digest, first-batch certificate and exact capture-byte counter so refusal proves semantic validation, not stale bookkeeping. Retain original immutable state bytes and assert initializeModel refuses without mutation; exercise validateState through reduce on bad state as well.

| Test group | Negative cases | Required positive control |
| --- | --- | --- |
| Result parity | accepted submit/modify/cancel wrong order, engine or time; missing/blank event; rejected wrong order/time/blank code/reason; contradictory member result fields | Actual12-record restore unchanged; valid rejected missing-order/terminal/duplicate cases retained |
| Trade profile/current state | price cap+1, nonnumeric/zero/negative qty/price, buy/sell current-limit violations, wrong instrument/currency/run, unrelated command/time; self/terminal/missing dependency | Actual3 trades/6units with immutable acceptance and current revisions unchanged |
| Full provenance / parent outcome | nested source offset/topic/UUID/generation/partition/batch/checksum/ordinal/command changed; trade member command/payload hash/status differs; trade attached to rejected/cancel outcome | Exact nested source and original typed command equality; batch replay retains original facts through replay links |
| Executions | blank/default facts, missing/duplicate IDs, wrong event/order/instrument/qty/price/currency/time, duplicate/missing maker/taker role, wrong side suffix | Actual Go execution pair byte-identical and maker/taker source roles retained |
| Rejected attempted economics | rejected submit/modify attempted0/negative/noninteger/out-of-cap text accepted within typed shape; same values under accepted status refused | Rejection remains zero financial/order mutation; checkpoint restores attempted text unchanged |
| Full JSON value | second object, second scalar, trailing garbage; parser/reducer/topology | Whitespace suffix legal. Malformed value produces no envelope; successful frontier/resume/orders/execution IDs unchanged; exact raw bounded suffix plus lane barrier retained |
| Atomic later-member failure | bad second trade/execution in actual multi-fill source, also reopened checkpoint | No partial member output or dependency/fill mutation; preserve existing abort/reopen/cache tests |

Tests may be parameterized to cover related changes without implementation-mirroring fixtures. Actual Go source remains authoritative positive fixture. No source/proto fixture bytes need regeneration.

## Return gate

Both formal findings accepted. Research complete; no architecture pivot, new feature or source edits. Request manager acceptance of this narrow correction and exclusive Java21 Gradle lease before implementation/test run. Proposed correction ownership: two existing owned new Kotlin source files, corresponding finite tests, contracts/calcify README only if guarantees need clarification, and Kotlin evidence packets. No Go/proto/generated changes. Run affected finite tests, rerun exact review probe expecting refusals, then Calcify regression after final source freeze; preserve red reproduction and green correction receipts separately. Manager owns fresh combined review instance2of3 only after updated frozen target and author/neutral evidence; maximum3 unchanged. Live activation remains refused. Remaining O2 history authenticity and physical reservations stay explicit boundaries.

Downstream O2 reservation note from manager: current modelProperties producer max.request.size is captureBytes+1024, while complete managed checkpoint cap is6,307,840 bytes. Live Streams changelog producer, restore fetch, topic and broker limits must account for full state value. O2 owns physical fit and final configuration proof; no correction-scope expansion here.
