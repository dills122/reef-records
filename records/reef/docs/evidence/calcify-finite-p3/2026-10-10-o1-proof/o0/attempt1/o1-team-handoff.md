# O1 team handoff proposal

No code lease active until manager accepts reviewed O0 and dispatches O1. O1 remains
one delivery unit, one combined independent-review counter (maximum3), one manager
integration. Half completion is not O1 acceptance. Both developers preserve others'
edits; no Git mutation, broker startup, live load or unleased shared-file edit.

## Frozen dependencies

Read `docs/work/CALCIFY_FINITE_P3_SOURCE_CONTRACT.md`, frozen O0 spec/patch hashes
in neutral bootstrap, overnight plan O1/O2, contracts and language/boundary steering.
Parent verifies accepted O0 verdict before dispatch. Code baseline51cd90eee;
documentation checkpoint7aba4d0a. O0 author found new typed command facts required:
current accepted modify/cancel generic result cannot reconstruct amendment economics.

## Go producer owner lease proposal

- New `services/matching-engine/internal/domain/calcify_lifecycle.go`.
- `services/matching-engine/internal/streamdirect/processor.go`: typed optional
  outcome fact, processed command data, `processDelivery`/batch propagation.
- `services/matching-engine/internal/streamdirect/config.go` and `runner.go`:
  explicit opt-in lifecycle configuration propagation/startup validation only.
- New focused `internal/streamdirect/calcify_lifecycle_test.go`,
  `calcify_lifecycle_config_test.go`, `calcify_lifecycle_checksum_test.go`.
- `services/matching-engine/internal/app/calcify_source_profile.go`: only exported
  read-only profile identity accessor if needed. Do not change v1 struct/hash rules.
- New focused `internal/app/calcify_source_identity_test.go` if accessor added.
- `services/matching-engine/README.md`: opt-in producer fact/compatibility/test scope.
- O1 Go packet/fixtures under `.planning/calcify-p3-overnight/o1/go/` if manager grants.

Do not edit protobuf/generated sources, Kotlin, source capture contract README,
snapshot implementation, matching algorithms, existing source fixture/checksum
bytes or general ingress adapters. Snapshot/mode binding restore belongs to O2
explicit `service_snapshot.go`/profile/startup lease. Any new config needed for
source proof must remain opt-in; no producer financial/runtime activation claim.

## Kotlin/protobuf capture owner lease proposal

- `contracts/proto/calcify.proto`: additive lifecycle/capture messages, unchanged
  existing fields/packages/options. New source-command fact has explicit version,
  attempted economics and full command metadata; capture members have structured
  identity/dependency/revision/disposition, including exact source provenance.
- `contracts/calcify/README.md` plus new finite lifecycle/budget small fixtures there.
- New main-source `calcify/FiniteLifecycleContract.kt`,
  `FiniteLifecycleCaptureProcessor.kt`, `FiniteLifecycleCaptureRuntime.kt`.
- New corresponding focused contract/processor/runtime tests under
  `services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/`.
- Optional dedicated `src/main/kotlin/com/reef/platform/tools/CalcifyFiniteLifecycleCapture.kt`
  entrypoint only if manager approves; no default production bootstrap wiring.
- Generated `services/matching-engine/internal/transport/grpc/pb/contracts/proto/calcify.pb.go`
  and `services/platform-runtime/src/main/java/reef/contracts/calcify/v1/` output.
- O1 Kotlin packet/fixtures under `.planning/calcify-p3-overnight/o1/kotlin/` if granted.

Do not edit Go domain/processor/config/profile files or API/SQL intake. Read existing
`CalcifySourceBatch.checked`, resolver EOS topology/state patterns; reuse without
modifying `CalcifyPipeline`, `MatchContextResolver`, resolver store namespace or
existing Phase1/2 outputs. If helper visibility/runtime bootstrap needs shared edit,
report exact lease request before touching it. Avoid whole test-harness copy.

## First coordination checkpoint

Before code, both owners agree through manager on embedded JSON field name
`lifecycleCommand` and versioned fact field names/types, profile/binding identity
representation, metadata and typed economics. Suggested schema text
`calcify-order-lifecycle-command-v1`; command types remain SubmitOrder/ModifyOrder/
CancelOrder in current JSON source adapter and map to explicit protobuf enums.
Absent pointer uses `omitempty`; no legacy bytes change. Source producer copies
already-decoded routed command values and trace/cause/correlation/actor/time context.
Kotlin owner defines additive protobuf; Go owner supplies checksum-valid tiny JSONL
from real processor fixture for Kotlin adapter tests, through agreed output path.
Source P0 hash accessor may be exported only after manager lease; no duplicated
canonicalization or silent v1 profile append.

Typed facts plus capture reduction are O1 proof. Budget persistence, actual writer
containment, manual/API fences, producer snapshot mode binding and startup history
registration are O2. O1 parser/capture must refuse missing lifecycle facts/binding
and inconsistent state at declared cut; cannot silently interpret old histories.

## Small acceptance fixture

Use exact12-command/3-execution fixture in frozen spec,8 order-ID cap, positive
integer quantity≤10/price≤100000000000, two isolated participant/accounts, LIMIT/GTC.
Expected8 applied command members,4 rejected command members,3 trade members,
15 total members,5 retained identities,6 executed units. Zero-trade amendment/cancel
after previous fill, multi-fill ordinal mapping and terminal same-run reuse covered.
Use command sequence batch size1; reader poll grouping may vary independently.
Separate adversarial tests cover declared caps/one over, source offset gaps,
cross-run/profile binding, accepted/rejected contradiction, absent/changed members,
identical batch replay at different physical offsets, changed batch replay, missing
dependency/old unbound fact, atomic malformed record and transaction restore parity.

## Generator and test ownership

Kotlin/proto owner alone runs `scripts/generate-proto.sh`: regenerates all Go+Java.
Pinned protoc33.2, Go protobuf plugin1.34.2 and gRPC plugin1.5.1 available. Only Calcify
generated outputs may change; report unrelated drift instead of reverting others'
work. Go owner excludes generated directory and must coordinate compile timing.
Manager runs additive/drift check `scripts/check-proto-additive.sh` with
`GOTOOLCHAIN=go1.26.9` after both halves freeze; no concurrent generation/review.

Go self-check: focused new regressions, `go test ./...`,
`go test -race ./internal/app ./internal/streamdirect`, `go vet ./...` with Go1.26.9.
Kotlin self-check: new contract/processor/runtime tests plus Calcify regression under
Java21, Gradle no-daemon with manager build/memory lease. Baseline182 Calcify tests
passed before code; use as regression reference, not proof of new path.
TopologyTestDriver/model tests establish scoped state/output behavior, not actual
broker transaction/crash recovery. Live evidence belongs to later manager lease/O2.

## Freeze and manager gate

Each developer audits ordering, invalid input, replay, compatibility, byte/count
limits and restore; retains commands/exits/environment/red-green evidence, exact
owned dirty diff/hash, author explanation separate from neutral bootstrap. Initiate
combined O1 independent review through manager after both halves freeze. Reviewer
gets no inherited developer conversation; max3 for combined O1, no reset by halves,
replacement or spike. Material correction needs fresh pass. Flow/scope failure
preserves evidence and triggers focused research spike before retry. Ready halves
still wait combined verdict, contract/generator drift and manager integration.

Retention for new active implementation context: update contract/producer docs and
latest focused evidence; manager owns WORK_PLAN/navigation/retention integration.
No superseded historical record deleted without verified Records publication.
