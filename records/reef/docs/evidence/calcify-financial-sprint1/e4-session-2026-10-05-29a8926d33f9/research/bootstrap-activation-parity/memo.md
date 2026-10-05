# Child managed-activation count round-trip correction

October5,2026. Read-only research; no source/build/JVM/broker/run actions. New evidence after Attempt2cycle1Ready and actual diagnostic failure; planned follow-up is Attempt2cycle2, not new counter. Current execution source/build identified by parent6b756...; this memo does not rebind full current candidate. Ordinary retained-envelope refusal preserved.

## Actual finding and prior research miss

Prior research/bootstrap-capability-roundtrip/memo.md numeric-equality audit explicitly checked parent recovery result asLong counts but **missed child onActivation summary equality**. That audit was incomplete; retain it as dated report and use this explicit correction. Failed raw is bootstrap-attempt2/proof/managed-recovery/stderr.log (not earlier Attempt1 path): Streams ProcessorNode initialization failed with BOOTSTRAP_MANAGED_ACTIVATION_PARITY at FinancialRateProbe587, propagating managed recovery failed600. Request raw managed-recovery/request.json contains historyRecords2101, parent ownerSHA/history checksum and sourceUUID/bootstrapSHA.

FinancialKernel.historySequence277 returns Long. Child callback585–588 constructs summary with node(mapOf(historyRecords to owner.historySequence()...)); Jackson valueToTree retains LongNode. Request written from parent Long expectedHistory then read from raw JSON in child567 defaults to IntNode at2101. Direct JsonNode comparison summary[historyRecords]==request[historyRecords] is false even when both integral values2101. Prior isolated actual51CP Jackson reproduction already proved LongNode-vs-IntNode equality false; no new JVM reproduction run under this scope. Type guarantee follows declared Long producer and default parser behavior; exact2101 raw request confirms small integral parse case.

This expression has ownerSHA and history checksum checks before count via short-circuit AND. Failure receipt emits no summary before assertion, so **cannot infer actual owner/hash parity or sole runtime cause**. Numeric width comparison would inevitably refuse equal2101 once earlier hash predicates pass; real mismatch in those earlier predicates can also fail same assertion. Parent progress2100inputs/2101history/1000settled and child journal recovered2100 were reported by initiator; raw request proves requested history2101, child source enforces journal count before callback. No successful activation, result-only replay or completed bootstrap proof claimed.

## Smallest patch recommendation and focused controls

Extract/use narrow internal actual-callback parity helper if needed for tests. Independently validate summary and request historyRecords with FinancialHeapBounds.integer(node,"historyRecords"); require validated counts equal AND equal fixed2101 for1000settled+100pending bootstrap. Keep BOOTSTRAP_MANAGED_ACTIVATION_PARITY for unequal/unauthorized integral counts; integer shape errors may retain HEAP_INVALID_historyRecords. Preserve exact ownerSHA and historyChecksum JsonNode/textual comparisons, cut.ordinal2099L and equality against last published journal.member(2099) offset, sourceUUID/bootstrapSHA scope and journal2100before callback. No all-number normalization, mapper global config, permissive asLong replacement, relaxed owner hash or authority change.

TDD RED: construct actual-like summary via ObjectMapper.valueToTree(mapOf(historyRecords to2101L)) and request by write/read raw JSON; assert actual summary LongNode/request IntNode, exercise same helper called by actual onActivation. Old expression rejects matching valid tuple; new path accepts exact count/hash/ordinal/offset. Actual wiring test verifies callback invokes helper before activation.set(summary)/managed-activation-parity. No test claims full real managed recovery pass merely from helper.

Negatives: history2100or2102 mismatch; both counts equal unauthorized2100; missing/null/text"2101"/decimal2101.0/zero/negative/out-of-Long-range/aboveMAX_SAFE_INTEGER; reject altered ownerSHA, historyChecksum, ordinal2098or2100, last-member offset mismatch or null cut. Mutation controls must change one field at a time and assert named failure. Existing sourceUUID/bootstrapSHA and journal count failures remain. Successful width tolerance restricted to strictly integral field; different economic identity never normalized.

Run focused helper/wiring/bootstrap tests then whole financial regression and exact Node validation as parent policy requires; refresh candidate/source/build/classpath and relevant E3 receipts before actual retry. Independent Attempt2cycle2 review must evaluate corrected callback and regression controls. Compact reference work waits for completed baseline; this fix changes bootstrap adapter validation only.

## Remaining numeric-boundary source audit

Bounded source read: RateProbe bootstrap limits/count/capability/E3 binding/broker scope, recovery child/parent, observer/result replay; PhysicalInventory freeze/inventory/snapshot/checkpoint; PartitionCut reconstruct. No claim unrelated code exhaustively checked. Evidence observations below separate guaranteed width bug from permissive numeric conversion.

| Site | In-memory/parsed types and comparison | Width conclusion |
| --- | --- | --- |
| Capability max | RuntimeLong vs parsedInt; revised strict integer helper | Original bug corrected by prior patch; no broadened identity equality |
| Child activation summary historyRecords | historySequenceLong vs parsed requestInt; direct equality | Confirmed remaining width refusal; patch selected |
| Child ordinal/offset | Cut Long? compared to2099L and journal offset.asLong | Long value comparison, no JsonNode-width mismatch; preserve |
| Parent parsed recovery summary/count/PID | asLong against Long/PID constants | No node-width mismatch; existing permissive shape conversion separate concern, not cause proven here |
| Bootstrap limits | parsed static JSON literal vs parsed raw request | Small integral limits parse Int on both sides; exact equality retained |
| Fixed bootstrap counts | FinancialHeapBounds.integer against1000L/100L/2100L/2101L | Strict integral value path already correct |
| Review/spec sample counts and raw identity | Parsed raw vs parsed raw | Same numeric parse width; retain exact raw SHA and semantic equality |
| E3 arms | valueToTree Kotlin Int24/20/4/1 vs parsed Int | No guaranteed Long/Int mismatch |
| Broker scope nodes and endpoint pins | Admin Node.id/port Int; expectedasInt values; parsed same smallInt | Exact broker cluster/host/port equality unchanged |
| Compiled/source hashes | Text values in map/parsed raw | No numeric comparison |
| Physical topic assignment/partition/replica checks | Kafka TopicPartition.partition/Node.id Int; manifest copied/parsed Int; expected JsonNode subtree | No Long producer for equality fields; byte/timeLong fields checked via value/range, not whole node identity |
| Physical artifact identity | schema/runId strings | Numeric inventory sizes/windows not direct parsed-vs-currentLong equality gate |
| Host clock | parsed sampledAtMs strict integral/range and longValue bracket | No node-width comparison; separate origins explicitly scoped |
| PartitionCut heads/frontiers | configured sequence0L vs parsed head compared canonical JSON; number helper for actual counters | Numeric canonical text/value comparison handles width; owner restored historySequence compared helper number |
| Reference expected delta/journals | independent expected objects compare canonical strings; record seq/priorSeq.asLong values | No direct numeric JsonNode-width equality gate identified |
| Result-only final parity | Long counters and owner digest/chain strings | No type-width equality identified |

No other guaranteed LongNode-vs-IntNode bootstrap/recovery/physical equality identified in this bounded audit. This is source-based finding, not executed proof all paths pass. Actual baseline rerun remains required; previously hidden semantic/hash/recovery faults may emerge after count gate fixed. Retain exact failed receipts and report incomplete attempt honestly.
