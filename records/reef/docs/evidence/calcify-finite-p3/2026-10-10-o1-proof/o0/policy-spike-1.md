# O0 policy alignment spike1

Trigger: O0 review1of3 `Not ready`, P2 frozen GTC fixture cannot pass canonical
boundary. Research-only source/test spike; no code or policy expansion. Failed
target/patch/packets/review preserved under `attempt1/`. Review counter unchanged.
Baseline code51cd90eee, documentation HEAD7aba4d0a; no runtime edits during spike.

## Reproduced failure and source map

Static call-path reproduction: submit with `timeInForce=GTC` reaches
`PlatformHttpServer.prepareApiV1Mutation` validation at2459 before stream intake.
`PlatformCommandParsers.parseAndValidateApiV1Command` at129 allows only DAY/IOC;
invalid result maps to HTTP400 `VALIDATION_ERROR` at2463–2469. No finite reservation
or command publication occurs. This is inspected control flow, not live HTTP probe.
`contracts/proto/order_execution.proto:154–158` declares only unspecified/DAY/IOC.
`MatchContextResolver.kt:75` maps only DAY/IOC, so even raw source GTC cannot reuse
existing accepted-fact decoder. Raw engine/broker path would evade required boundary.

| Path | Current behavior | Finite consequence |
| --- | --- | --- |
| Canonical API validator | DAY/IOC only; hidden LIMIT alias allowed | Choose supported DAY, no enum expansion |
| Stream command fixture/decoder | JSON `DAY`, existing processor SubmitOrder decode | DAY remains same canonical source representation |
| Matching SubmitOrder | `service.go:295–310`: only IOC residual cancels; otherwise resting entry retained and status refreshed | DAY may rest/fill/amend/cancel in fixture |
| Modify/Cancel session guards | `service.go:723–760`: submit/modify require Open; cancel refuses Closed; default Open | Pin Open session for entire declared fixture |
| Accepted-order/source resolver | Immutable fact time-in-force maps DAY to protobuf DAY | Existing contract/read compatibility retained |

No DAY clock/expiry transition occurs in inspected SubmitOrder path: residual
DAY order takes resting branch; timestamp is command's explicit occurredAt.
This is bounded path evidence, not repository-wide expiry capability claim.
Freeze all12 source commands within one UTC day and seconds-long fixture, with
session Open, no close/expiry/admin transition and no other writer to run. Unexpected
external lifecycle command/source must retain evidence and stop declared scope.
Do not claim DAY means perpetual order lifetime or that session closure is supported.

Existing finite P0 manual fixture `calcify_source_profile_test.go:31` uses DAY;
`TestCalcifySourceLifecycleAndTerminalIdentitySurviveRestore` covers zero-trade
submit/amend/cancel, amendment fill, terminal-ID rejection and snapshot restore.
Stream fixture `calcify_source_profile_test.go:45` uses DAY;
`TestCalcifyP0CanonicalCommandPathAndReplay` exercises real processor path/replay.

## Failed assumption and options

Author assumed familiar GTC policy existed across Reef boundary; inspected Go
string command model alone did not establish API/protobuf/source compatibility.
Requirement permits smallest supported finite policy; no requested GTC capability.

1. DAY, Open session, one-day fixed source timestamps and no implicit expiry input:
   supported existing boundary/proto/source; smallest correction, recommended.
2. Add GTC throughout API/protobuf/transport/resolver: broad compatibility work,
   beyond required overnight source policy; reject for this task.
3. Bypass API using raw engine/broker GTC: violates canonical ingress; reject.

## Executed checks and preserved failure

Initial focused Go command:
`GOTOOLCHAIN=go1.26.9 go test ./internal/app ./internal/streamdirect -run 'TestCalcify(SourceLifecycleAndTerminalIdentitySurviveRestore|P0CanonicalCommandPathAndReplay)$' -count=1`
failed exit1: default `/Users/dsteele/Library/Caches/go-build` sandbox access denied
for both packages. Login shell also emitted `(eval):5: parse error near end`.
No assertion failure; no source change. Failure retained here rather than discarded.

Retry same tests with login shell disabled and writable cache:
`GOCACHE=/private/tmp/calcify-p3-o0-policy-gocache GOTOOLCHAIN=go1.26.9 go test ./internal/app ./internal/streamdirect -run 'TestCalcify(SourceLifecycleAndTerminalIdentitySurviveRestore|P0CanonicalCommandPathAndReplay)$' -count=1`
exit0: app0.261s, streamdirect0.294s. These prove existing DAY lifecycle/replay only;
new12-command capture and financial path remain unimplemented. No live broker/HTTP,
expiry process, SQL or new source schema tested.

## Return gate and test plan

Manager validates DAY correction against accepted requirements. Change spec and O1
team handoff consistently; retain attempt1 hashes/report, refresh candidate/packets,
rerun prose checks, request fresh O0 review2of3. No cap reset or dependent code before
Ready. O1 tests exact12 commands/3 executions/15 members with DAY through real
producer; O2 proves canonical API admission/fences, unchanged DAY enum compatibility,
session/time freeze, no unknown expiry source and bound/restored mode. Required
unknown/unsupported lifecycle fault behavior remains intact. No architecture pivot.
