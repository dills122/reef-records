# O1 producer/capture JSON coordination proposal

Agreement packet for manager/Go/Kotlin owners after accepted O0. No code yet.
Freeze agreed field names in additive protobuf/source contract before fixtures.
This implements frozen O0 shape; durable binding activation/recovery remains O2.

Identity provenance checked against `internal/domain/order.go` and canonical
`PlatformCommandParsers.kt`: all three Go DTOs carry decoded participantId and
accountId; canonical API requires both for Submit/Modify/Cancel. Submit alone
carries decoded currency; Modify/Cancel DTOs have no currency. Copy ownership
directly, then validate against immutable finite binding participant/account/side
mapping. Missing ownership is not filled from actor, free text or book scans.
Modify/Cancel currency stays absent from typed command; capture derives retained
order quote/base assets from immutable acceptance plus validated finite instrument
binding. Absent-target rejection records declared binding context without claiming
retained order economics. Submit currency must equal frozen quote asset. Immutable
config provides validation/context only; it must not overwrite decoded identities.

## Optional source outcome field

`CommandOutcomeFact.lifecycleCommand`: absent/omitted when lifecycle mode off;
present object when explicit mode on and supported command decoded. Go pointer plus
`omitempty`; absent mode must retain exact old source bytes/checksum. Do not add
new field to frozen finite-source-v1 profile struct.

Suggested new typed object `OrderLifecycleCommandV1`:

| Field | JSON type / rule | Source |
| --- | --- | --- |
| schema | string `calcify-order-lifecycle-command-v1` | Fixed version |
| sourceProfileHash | string64 lowercase SHA256 hex | Existing normalized P0 profile hash, read-only accessor/cache |
| finiteBindingDigest | string64 lowercase SHA256 hex | Separate configured frozen binding; O2 verifies durable registration |
| commandType | string SubmitOrder / ModifyOrder / CancelOrder | Existing decoded command kind; explicit protobuf enum adapter |
| commandId | nonempty string≤128 UTF-8 bytes | Exact decoded command ID |
| runId, venueSessionId, instrumentId, orderId | strings≤128 bytes; nonempty for valid finite member | Exact routed values used by matching |
| participantId, accountId | strings≤128 bytes | Exact decoded ownership; finite mapped-role validation |
| traceId, causationId, correlationId, actorId | strings≤128 bytes | Preserve decoded canonical metadata, including legitimate empty optional context; do not invent after source |
| occurredAt | explicit RFC3339 string≤128 bytes | Exact decoded command time, no wall-clock fallback |
| submit | typed object, only for SubmitOrder | Fields below |
| modify | typed object, only for ModifyOrder | Fields below |
| cancel | typed object, only for CancelOrder | Fields below |

Exactly one kind payload matches commandType. No untyped maps or duplicate kind
payloads. All producer-known fields explicit. Source parser checks JSON types,
schema/digests and duplicated fields before producing capture; protobuf uses typed
kind enum/oneof and monetary strings consistent with existing order contracts.

Submit payload: `clientOrderId` string; `side` BUY/SELL; `orderType` LIMIT or
LIMIT_HIDDEN; `quantityUnits` and `limitPrice` strings; `currency` string USD;
`timeInForce` string DAY. Modify payload: new total `quantityUnits`, new
`limitPrice`, both strings. Cancel payload: `reason` string≤128 bytes, empty allowed
if canonical command has none. Preserve attempted quantity/price text; validate
positive signed64 numeric value and profile caps for successful mutation. New
fixture uses plain decimal strings. Do not rewrite old accepted facts/source
checksums to normalize aliases or numeric spelling.

Producer copies routed Modify/Cancel session/instrument after existing routing
assignment, not an unrelated raw body claim. Original exact payload remains bound
by outer payloadHash/registered command history. Typed fact records actual attempted
command used by matcher; it cannot itself reconstruct overwritten raw request bytes.

## Required equality and result checks

Before indexing/reduction, compare outer commandType/commandId/runId/instrumentId/
orderId with typed fact. Compare typed run/session/instrument to expected frozen
binding, profile digest to configured expected P0 digest and finite digest to
expected binding. Compare command outcome status against result accepted/rejected
exclusive shape; accepted/rejected order IDs must match typed target.

Successful submit also compares typed ownership/economics/time/client identity to
`result.acceptedOrder`, plus accepted event order/engine ID/time equality as existing
resolver does. Preserve raw source spellings first; any deliberate alias equivalence
belongs to documented adapter only (LIMIT_HIDDEN maps to LIMIT protobuf behavior).
Typed side must match declared participant/account role. Modify/cancel compare
ownership/scope to retained immutable acceptance and previous revision/effect.

Do not index `result.acceptedOrder` merely because field exists: existing Go helper
can attach attempted economics to a rejected submit. Genuine immutable acceptance
requires accepted SubmitOrder status plus accepted event and no rejection. Domain
rejection retains explicit member disposition and no state mutation. Missing typed
fact, wrong digest/version, mixed scope, unsupported poison or contradictory
accepted/rejected/trade shape faults whole source record with no partial output.

## Exact fixture outputs to exchange

Go owner emits new actual processor fixture under manager-granted O1 path, suggested
`.planning/calcify-p3-overnight/o1/go/finite-lifecycle-source-v1.jsonl`. One JSON
VenueEventBatch per line, twelve lines, batch size1, real `Processor.processDelivery`
and batch construction with deterministic clock/command inputs. Use frozen spec
sequence, mapped parties, DAY, session Open and timestamps03:00:00–03:00:11Z on
2026-10-10. Fixed command IDs `p3-cmd-01`…`p3-cmd-12`, traces per command, explicit
actor/correlation/causation. Configure fixture command/source topics consistently.
Keep matcher assigned partition0 and source generation1 metadata in sidecar.

Sidecar `finite-lifecycle-source-v1-manifest.json` supplies P0 input and canonical
profile hash, lifecycle config/schema and fixture-only binding digest, topic names,
mode, command sequence, logical physical offsets (including test gap vector),
expected12 outcomes/8 applied/4 rejected/3 trades/6 units/15 members/5 identities,
per-line batch ID/semantic checksum/UTF-8 bytes/SHA256 and whole-file SHA256.
Fixture-only binding is explicitly model input, not evidence of durable registration.
Kotlin capture tests add actual provenance/topic-ID test values separately; live
broker UUID verification is O2, never inferred from fixture text.

Also emit paired `legacy-source-v1.jsonl` for same processor inputs with lifecycle
mode off, plus checksum/byte receipt against existing unchanged legacy golden
vectors and original fixture files. Do not rewrite baseline fixture/checksum files.
New schema on changes new semantic body/hash; off omits field exactly. Tests mutate
only lifecycle quantity/routing/digest and assert checksum/decoder rejection.
Publish failure rollback/retry uses existing producer path; source restart activation
under changed mode/binding remains O2 gate, not established by this fixture.

Kotlin/proto owner alone promotes agreed small JSONL/manifest under
`contracts/calcify/` and owns golden capture wire bytes/expected member records.
Go owner must not edit promoted/generated files. Capture tests consume exact Go
JSONL, no hand-authored substitute that avoids real zero-trade generic results.
Tests vary poll batching/offset gaps, replay identical batch at new physical offset,
changed repeat, zero-trade records, source/member faults and store restoration.
Both owners freeze before combined O1 review; generator/additive checks manager
serialized. No divergent shared schema or separate review-count budgets.
