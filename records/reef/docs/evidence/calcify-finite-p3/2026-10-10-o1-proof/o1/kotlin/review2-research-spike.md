# Review 2 bounded replay-invariants research spike

Formal completed report `../review-2.md`: Not ready, P2 certified replay identity gap. Combined review2of3 consumed; one remains. Read-only spike began after report publication; source remains frozen, no Gradle, source/proto/Go edit, broker or Git mutation. Manager review2 target preserved at `../review2-target/`. Independent-review author response only; no readiness verdict.

## Reproduction and frozen identity

Exact final reviewer Java21 source copied into owned `Review2ResearchProbe.java`, SHA256 `64ffa96adb37eef14da051d2be180ff25d6d4df092e440779143801bdd9e1434`. Ran recorded source-mode argv/classpath/cwd with `-Xmx192m`; exit0. Full argv, command time, source/log hashes in `review2-reproduction.json`; output in `review2-reproduction.log`.

All seven isolated replay variants accepted by initializeModel; next offset13 reduction also emits prefixClosed=true: COMMAND kind, UNSPECIFIED kind, within-outcome99, flattened99, outcome99, wrong command ID, exact duplicate replay command member ID. Each changes only physical replay member ID and recomputes envelope digest/exact capture counter; original first-batch certificate and replay-of unchanged. Valid prefix/replay controls pass. Original five semantic and seven trailing-value probes continue to refuse; whitespace and managed suffix/frontier controls pass. SLF4J no-provider notice retained separately; no failure inferred from notice. Source46 hashes and scoped43 compiled hashes match current freeze, no drift.

## Failure and requirement map

Accepted source contract lines101–104 defines structured physical command/trade IDs and exact ordinals; lines116–128 distinguishes changed repeat, new physical coverage, certified identical batch REPLAY and no repeated fill mutation. State/restore section requires complete once-represented member history and refusal on changed/incompatible state. O1 acceptance explicitly includes missing/changed/duplicate/cross-run members and replay/restore parity.

Fresh reducer lines39–42 builds new physical ID by cloning first.id and replacing source coordinates with batch source plus original outcomeOrdinal/commandId. It then copies original complete member body, sets dispositionREPLAY and replayOf=first.id. Restored branch lines150–154 checks source lane with command/outcome fields cleared, then overwrites entire member.id with first.id before body comparison. Kind, both trade ordinals, outcome and command identity, and duplicate-ID changes are therefore discarded. This is same normalization failure demonstrated by seven probes; no architecture ambiguity.

Existing fresh non-replay history certification validates original member ordering, typed facts and dependency/effect transitions. Existing replay record certification checks same batch checksum, outcome/trade/member counts, lane/cut/frontier/schema/digests/caps and later exact managed order/batch/execution/counter reconstruction. These checks should stay intact. Internal digests are consistency checks only; durable source authenticity remains O2.

## Complete replay invariants

| Surface | Required invariant | Current status / proposed assurance |
| --- | --- | --- |
| Replay record cut | Bound topic/topicUUID/generation/partition; actual monotonically increasing offset, valid resume, source command empty/outcome0; exact frontier, schema, closed prefix and finite counts/bytes/digests | Existing record/state guards retained; tests should independently mutate every physical source field, frontier/resume/schema/count/digest and exact counters |
| Batch origin | Same first batchID/checksum, same ordered member/outcome/trade counts; earliest certified first receipt remains origin | Existing batch/history checks retained; no rewriting origin or treating later replay as new acceptance |
| New physical member ID | Exactly first.id kind/within/flat ordinals, source with current record batch/lane/offset and first outcomeOrdinal/commandId | Currently incomplete; compare exact deterministic fresh replay construction |
| Per-record / cross-record uniqueness | First certified IDs unique by command/trade kind and strict ordinals; cloning at unique new physical offset preserves distinct IDs; no duplicate command/trade identity | Exact deterministic ID comparison plus existing certified first order/unique record offsets provides this; assert IDs distinct in valid model controls and duplicate swaps refuse |
| Disposition / replay link | REPLAY and exact first.id replayOf; no missing/foreign/rebased link | Existing checks retained by exact member equality |
| Typed command and result | Every field/oneof/schema/profile/binding/run/session/instrument/party/account/metadata/time/status/payloadHash equals original member; accepted/rejected results unchanged | Existing normalized body comparison checks these; expected full member equality retains them without discarding ID |
| Original trade and executions | Exact original run/source/trade IDs/economics/currency/time/order roles and both complete execution facts, including source maker/taker attribution | Copy original facts unchanged. Nested trade source intentionally stays original physical occurrence; changing it to replay physical coordinates is invalid. No re-resolving/reapplying fill at later source |
| Dependencies / revisions / effects | Exact original acceptance, revision, previous effects and current dependency economics within member; no new or omitted mutation fields | Expected member equality retains every original repeated/optional field, including order and presence |
| State effects | Replayed record advances physical coverage/raw-byte/capture-byte accounting only; order acceptances/revisions/fills/terminal/effects/execution set and origin batch certificate unchanged | Existing reducer/state reconstruction continues no-mutation path; valid prefix/replay/multiple replay/gap/reopen controls assert exact economic state |
| Unknown/extra member fields | Later replay cannot introduce arbitrary extra ID/body fields compared with fresh constructor output | Full protobuf member equality checks all retained fields/presence, avoiding an allow-list that can miss future additive fields |

## Minimal shared correction

Preferred: extract existing fresh replay member construction into private reducer helper `replayMember(first,newBatchSource)`. Fresh replay adds helper result. Certified replay requires `member == replayMember(first,source)` for each ordered member. Helper constructs newSource from current batch source with original outcomeOrdinal/commandId; clones original full ID/body; sets REPLAY and exact replayOf. This is stronger and simpler than fixing only six/seven observed fields or retaining normalization before ID proof. No protobuf/state schema/fixture/budget change; live semantics unchanged. Exact full-member equality covers provenance, economics, dependency/result and field-presence invariants together.

Alternative exact expected ID check plus current normalized-body equality is correct if done before normalization, but duplicates construction and encourages future drift. Explicit duplicate-set checks alone do not constrain wrong kind/ordinals/command. Reparse original source or alter replay architecture unnecessary and outside bounded correction.

## Negative test matrix and positive controls

Use actual Go-derived12-record checkpoint plus identical multi-fill batch at actual later offset. Recompute every changed envelope digest and exact capture counter; keep correct origin certificate. Assert initializeModel AND subsequent reduce refuse without original checkpoint mutation; do not count stale digest failures as semantic tests.

1. Every ID field independently: kindCOMMAND/UNSPECIFIED/unknown numeric, both trade ordinals99 and negative unsigned representation, outcome99/negative, wrong command ID; exact duplicate replay command ID, swapped trade IDs and changed command member ID. Exercise command and both trade members.
2. New member source fields independently: topic, UUID, generation, partition, offset, batchID/checksum, command and outcome; ensure equality to deterministic current record+original fields. Different actual offsets/gaps remain legal; original nested trade source must not be rebased.
3. Replay body/presence: missing/wrong replayOf, wrong disposition, command/run/party/account/metadata/hash/status, accepted/rejected result and optional presence, nested trade provenance/price/currency/time/IDs, execution qty/price/role/identity/count/order, dependencies/revision/previous effect/immutable acceptance; reorder members or mutate declared counts. Full expected equality should refuse each class without altering economic state.
4. Replay record guards: source cut/frontier/resume/schema/count/batch contradiction/digest/accounting mutations; corrupt original first receipt semantic fact remains refused through original shared validators. Root-level changed digest/bookkeeping tests remain separately distinguished from recomputed member semantic changes.
5. Valid controls: actual12records; normal one/multiple replay appended, gap offsets, zero-trade/rejected/empty-record replay, exact source physical no-op; original order/fill/terminal/revision/effect/execution/batch-origin unchanged, counts/coverage and exact output bytes correct. Reopen managed model from replay checkpoint and suppress completed physical re-read; replay later append still creates one new REPLAY envelope with unique IDs.

## Return gate and evidence limits

Finding accepted. Request manager acceptance of narrow shared replay constructor plus adversarial matrix before source edit or Gradle build. Proposed correction ownership: FiniteLifecycleCaptureProcessor.kt, corresponding finite processor/runtime tests, Kotlin evidence packets; README only if identity guarantee needs clarification. No Go/proto/generated/source fixture changes. After authorization: focused tests and exact original reviewer probe must refuse all seven invalid IDs while valid controls and previous corrections remain green; final source freeze and proportionate Calcify regression on frozen bytes; fresh combined review3of3 is final available pass. Manager controls reviewer dispatch, Git and final delivery. No counter reset, scope split or heavy pivot. Model source authentication/resource fit still O2.
