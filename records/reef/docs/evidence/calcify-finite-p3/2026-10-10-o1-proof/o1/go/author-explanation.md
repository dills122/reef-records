# O1 Go producer author explanation

Component of one combined O1 delivery; not independently accepted. Base
45211653d2f5b59dd25f4a4db42883881b4d6eb1. Owned10-file diff and SHA256 manifest
in owned.patch/owned-files.json; generated contracts owned by Kotlin counterpart.
Reviewer starts neutral packet/actual source before reading this explanation.

## Problem and implementation

Existing VenueEventBatch preserves trades and submit acceptedOrder facts but omits
decoded amend/cancel attempted economics and metadata. Zero-trade commands therefore
cannot form complete lifecycle capture. Add optional typed lifecycleCommand pointer
at outcome tail; producer copies already decoded Submit/Modify/Cancel fields after
existing route assignment. New domain object has version/profile/binding digest,
complete command/routing/ownership/trace/cause/correlation/actor/time fields and
exactly one typed submit/modify/cancel payload. Existing full semantic checksum
automatically binds new object; old mode omits pointer with omitempty.

No book scan or matching rule change. Domain strings retain exact raw spelling.
All DTOs supply participant/account directly. Only Submit supplies currency;
Modify/Cancel asset context belongs to capture's immutable acceptance/binding.
Rejected Submit's attempted acceptedOrder payload remains intact; typed command is
attempt evidence, not success. Decode poison/unsupported command retain existing
poison outcome without invented typed fact, so strict capture faults evidence.

Public profile-hash accessor returns existing v1 hash without exposing mutable
profile or changing canonical struct/hash/snapshot bytes. Constructor caches hash
only for explicit valid model mode. Invalid enabled config stops before fetch and
matching. Runtime env defaults off; enabled requires profile, lowercase SHA256 and
batch1. StartRunner additionally requires transactional Redpanda then refuses live
activation. RestoreCommitted also refuses enabled mode. These intentional gates
prevent silent interpretation of old history before O2 durable registration and
bound restore; no attestation flag permits bypass. O2 owns gate replacement.

## Fixture and compatibility evidence

Before producer code edits, new fixture helper exercised actual ProcessOnce and
captured original12-line legacy JSONL from runtime unchanged at base. Fixed metadata,
DAY/Open sameUTCday and actual matching create8accepted/4rejected/3trades/6units/5IDs.
Frozen spec run/session are parameterized to p3-run/p3-session; manifest pins exact
profile/hash/accounts/topic names and explicitly model-only binding. Sequence,
budgets and economics unchanged. Lifecycle capture member count remains15.

Original legacy file16647 bytes, SHA256
bdd4df11f562ba2f4dd217168a3e81e60f96fa4c3fa4a25c01e75830dda26506;
test pins both size/digest after changes. Paired typed file24809 bytes, SHA256
1a8cf1c8c769e3e2bf32fa80792f36da206f07e6e27ab4bbbc9511c925fb1811.
Manifest supplies command payloads, per-line checksums/digests, counts, gap vector
and ownership mapping; Kotlin promotes exact files without Go edits there.
Removing typed pointer and recomputing checksums yields byte-identical legacy
batches. Existing checksum goldens untouched and whole-module tests cover them.

Focused tests assert every promised metadata field, payload oneof/routing, amended
total quantities after partial fill, source ownership, raw numeric spelling,
checksum mutations including zero-trade amend/cancel, rejected attempted submit,
poison absence, atomic failed publication rollback and deterministic retry,
invalid startup config and live/unbound replay refusal. Public identity test pins
pre-existing canonical v1 bytes/hash and absence behavior.

## Failures, research reentry and limitations

Three bounded research spikes retained; combined O1 review counter remains0of3:

1. Fixture helper assumed fakeSource honors batchSize, then mistaken fetched flag.
   Source check found helper clears complete supplied slice and has no flag;
   explicit one-delivery setup fixed both. Original red outputs transcribed in
   fixture-harness-spike-1.md; legacy capture occurred only after green repair.
2. Poison helper accepts map[string]string; initial map[string]any compile failed.
   Source check used literal fakeDelivery bytes. Retry test then assumed failed
   fakePublisher attempt is recorded; inspected fakeAtomicPublisher records both
   attempts, corrected observation with actual processor atomic branch. Red logs
   retained focused-tests-red-2.log/focused-tests-red-3.log and spike2 report.
3. Whole-module sandbox run denied healthcheck/gRPC ephemeral loopback listeners.
   Source/log spike3 confirmed bind restriction; auto-review approved same authorized
   regression outside sandbox. Original all-tests-sandbox-red.log retained; retry
   passed. No production code workaround, broker/container start or scope reset.

Focused tests, whole module, app/stream race and vet passed with Go1.26.9; exact
commands/exit/log/source hashes in verification packet. Final generated additive
contract recheck recorded separately. Model publishers/command sources prove
producer branch behavior, not real broker atomic/crash guarantees. O2 durable
activation, admission/audit budgeting, ACL/bypass fences, UNKNOWN handling and
snapshot/replay binding remain mandatory. O3 finance/O4 SQL/O5 end-to-end unproved.

README owner context updated. Retention no-op: active implementation/context only,
no standalone historical record superseded or archive deleted. Manager owns work
plan, combined independent review, generator drift and Git integration.
