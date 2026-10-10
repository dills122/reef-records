# O1 capture author explanation

Author testimony, not independent verdict. Neutral scope in `neutral-bootstrap.md`.

## Intent and success criteria

Existing verified-led resolver skips zero-trade source records and does not retain
amendment economics. Separate opt-in full-record capture represents every finite
command outcome and nested trade, exact source facts and dependencies. Actual Go
fixture must produce12 closed records/15 members/3 trades/6 units; original accepted
economics remain immutable while current revisions/effects evolve. Rejections do
not mutate orders. Missing or contradictory required source/restore history faults.

## Plan trace and flow

O0 full source-prefix policy retained: source batch is one complete window; no header
or seal topics and no verified-link demand. Source checksum/type/binding/result shape
validated before reduction. Pure reducer operates immutable state copy, creates
command revision before nested trades, applies ordered fill/effect updates, builds
bounded capture envelope, then validates proposed complete checkpoint. Processor
forwards envelope and writes managed state in Streams EOS topology. Infrastructure
forward/store failure propagates; semantic fault stores bounded raw suffix and lane
barrier with successful coverage/economics unchanged. Logical input retention may
advance input checkpoint only with explicit suffix accounting; overflow aborts.

## Components

`FiniteLifecycleContract.kt`: capped budgets, separate canonical finite budget bytes,
immutable model binding identity, strict duplicated-key/type/kind/scoped source parser,
protobuf adapters, semantic/body/raw and envelope digests. Existing source checksum
and MatchContextResolver acceptance/trade conversion reused without edits. Canonical
execution facts copied including maker/taker roles. Participant/account decoded;
Modify/Cancel context uses original acceptance/binding, never injected command currency.

`FiniteLifecycleCaptureProcessor.kt`: pure record reducer; bounded original acceptance,
current revision/filled/terminal/effect state; execution/batch/physical replay evidence;
ordered command/trade members; bounded complete receipts; certificate reconstruction
checks order/effect/dependency/execution/batch/counter/frontier completeness on restore
and reduction. Managed model processor re-reads store each invocation, keeps no cache,
retains fault suffix, and never catches infrastructure errors as semantic success.

`FiniteLifecycleCaptureRuntime.kt`: explicit model Genesis/Restore/history inputs,
binding/version/history gates, EOS/read-committed/no-offset-reset/no-compression model
configuration. `run()` explicitly refuses live activation pending O2. No main/tool
entrypoint or default bootstrap modification.

Protobuf fields added after existing messages, old messages/packages/options unchanged.
Capture contains typed attempted command, explicit disposition/result, structured
member/revision/dependency IDs and source provenance, declared counts/bytes/digests,
successful frontier/resume and prefix closure. Trade members contain canonical pair
of ExecutionCreated facts. Managed checkpoint embeds bounded receipts, orders,
executions, batches, fault suffix and exact model binding identity. No maps.

## Choices and invariants

Complete synchronous record window gives one finite atomic validation unit; full
managed protobuf state avoids cache invalidation ambiguity. Explicit bounded history
duplication costs encoded state but makes missing dependency/checkpoint history
detectable without canonical-history scans. Counts and total serialized state capped;
state is rebuildable projection, source remains matching authority. Receipt rebuild
work is bounded by16 records×9 members; this is model cost, no new live hot-path claim.

Identical physical replay no-op. Identical batch/checksum at new physical offset
emits explicit REPLAY dispositions/new coverage without second mutation. Execution
reuse outside identical certified batch replay faults before state/output. Existing
21/23-byte Phase1 links, finite-source-v1 profile bytes/hash and old fixtures preserved.
Same-lane source order uses actual offsets, accepts gaps, forbids regression.

## Verification and limits

Exact final commands/counts/logs/hashes in `verification.md` and freeze manifest.
Initial focused candidate14 tests green; expanded candidate19 tests green before
final strict acceptance/engine/checkpoint self-audit. Paired legacy fixture byte/hash
checked. Source fixture real Go ProcessOnce; goldens first submit/multi-fill actual
capture output. Budget bytes independently generated with Python big-endian framing
before Kotlin golden check (260 bytes, digest documented in contract).
Final frozen candidate: Gradle exit 0, 205 tests / 0 failures / 23 new tests, 3m54s.
Historical completed-source contradiction now retains explicit raw barrier while
successful coverage and order state stay unchanged; dedicated reopened-model test
exercises this case. Final source aggregate SHA256
`6cbbd03874336027f3b887f64499f555431cc1d82887c209745a93612ffd449a`;
owned patch SHA256 `4b254e46a29fe846dc41c969dad23bcc214736cbcda85559d5b5a7980e1c18db`.
Java21 model byte-boundary probe exit 0: encoded state cap 6307840 bytes accepted,
one-over 6307841 refused before initialize returns, original checkpoint unchanged,
no topology/output invoked. Probe source/commands/scoped compiled identities retained.
Observed values: source payload sum 24797 bytes excluding JSONL newlines, capture
envelope sum 29930 bytes, final checkpoint 65419 bytes. No state-write sum, maximum
or physical memory claim. Full encoded-state reservation map in `verification.md`.

Model rollback test restores managed bytes after ahead-state reduction, then feeds
same actual source at next physical offset; no cache survives. Reopen test initializes
fresh TopologyTestDriver from certified checkpoint and replays actual completed source
before identical new-offset batch replay. These prove model/cache behavior, not actual
broker commit/abort/changelog recovery. Missing/changed binding/history/counters/order
effects/member rows refuse initialization. Physical fetched-batch/RSS bounds, producer
ACL/direct transport fencing, durable mode/binding registration and exact transaction
restart remain O2. Financial disposition/atomic SQL/funding/repair remain O3 onward.

Fixture IDs use `p3-run`/`p3-session`/buyer/seller names pinned in actual manifest;
semantic sequence/budgets match O0, manager accepted fixture parameterization.
No source history hand-authored to substitute for real processor facts.

## Costs, deferrals and challenge points

Managed receipts plus first-batch copies duplicate bounded data; state encoded ceiling
6307840 bytes, not RSS. Validation repeats bounded receipt reconstruction each record;
future live qualification must measure cost and required physical clients/changelog
inventory. Hard capture caps prevent broad profile use; this is initial isolated finite
policy only. Model binding encoding is explicitly internal rebuildable identity;
durable O2 identity/version contract still needs review. No live activation attestation
boolean/string accepted. External record retention/board/overview integration owned
by manager; archive no-op for new active implementation/evidence, no superseded topic
records removed here. Check negative restore completeness, exact replay dispositions,
whole-record atomicity, original fact compatibility and model/live boundary closely.
