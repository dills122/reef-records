# E4-C acceptance and finite-proof design

October5, 2026; research/design only. Complements initial-recommendation.md. Source snapshot baseline29a8926d; concurrent workers own source edits. No broker/build/test execution here. Existing Node/Kotlin heap tests are prior-component evidence, not tests of proposals below.

## Critical architecture and implementation order

1. Root chooses separate diagnostic bootstrap as explicit experiment acceptance. Existing `calibrateAdapter` and `FinancialRateProbe.heapGuard` reject missing conservative evidence today; preserve behavior for existing command modes. New bootstrap command cannot emit reusable FROZEN rate policy. `EMPIRICAL_BOUNDED_DIAGNOSTIC` records may feed disk/driver estimates only after uncertainty checks; conservative heap admission rejects schema. Empirical mean remains labelled mean.
2. ACK worker owns RateProbe send/membership/result lookup/counters; ask worker to add deterministic held-SETTLE trace and synchronized cutoff counters. Root integrates bootstrap selection only after worker finishes RateProbe. Physical worker owns collector and raw allocated evidence. Root owns wrapper/unique directories/manifests, outer supervision, CLI/bootstrap schema and new diagnostic test helper. FinancialKernel/BrokerProbe economic/replay logic stays frozen in bootstrap slice.
3. Shared heap protection should distinguish strategy at type/API level. `ConservativeAdmission` validates existing FinancialHeapBounds and preflight estimate. `DiagnosticEnvelope` validates exact counts/source/result caps and actual max/baseline operational ceiling; exposes no identityUpper, pendingUpper, estimatedHeapBytes or READY_CONSERVATIVE_BOUND. Shared dedicated sampler/checkpoint/lifecycle core may serve both. Existing constructor/tests remain unchanged behavior; diagnostic factory requires separate sealed manifest/verdict. Do not pass arbitrary placeholder FinancialHeapBounds values to current constructor simply to reuse guard.
4. Reject uncontrolled config: source/Stream producer, main/restore/observer consumers, topic max batch, decoded output cap, same exact topics and clients. Install no JOL/framework/profiler product dependency. Embedded JFR API optional and tagged diagnostic; not needed for first measured costs.
5. Freeze manifests after all RateProbe/ACK changes and focused compile. Compute sourceHead (committed candidate, plus working-tree/build provenance if candidate uncommitted), fixture/config raw hashes, all Financial classes, ordered CP/resource hashes, Java executable and relevant VM implementation bytes. Current heapCapability sourceHead supplied by caller is not by itself proof source classes compiled from that commit; retain exact build command/clean source receipt and owner review. Java identity currently vendor/version plus flags; physical source/JDK executable checks add assurance without pretending prior schema covers them.
6. Run broker-free capability first, verify max768MiB/pinned args and non-bootstrap conservative policies still blocked. Then one bootstrap under total lifecycle envelope. Preserve all successes/failures; exact input/raw/parity/source frontier agreement. If OOM/stale sensor/unknown allocated component/force failure/parity failure/timeout occurs, no calibration artifact considered valid; preserve raw attempt and diagnosed cause.
7. Independently review bootstrap results/limits. Independently review source-model lower bound. If lower bound certifies smallest arm cannot fit, record immutable candidate rejection (`REJECTED_FINITE_HEAP_ENVELOPE`) and do not start ladder. Continue aligned retention/observer-state design only with explicit proposal/review; any changed owner representation is new candidate requiring correctness proof and new calibration.

## Minimum acceptance test matrix

| Case | Expected evidence |
| --- | --- |
| Standard calibrate/run without conservative costs | Existing rejection unchanged; no topic/sends |
| Bootstrap counts1001 or pending101/aged>0/rate arm | Refuse before setup; exact manifest1000/100 remains frozen |
| Source>1KiB/result wrapper>derived cap/topic limit mismatch | Refuse before send or parser as applicable; no success artifact |
| JVM actual max too large/smaller changed/extra inherited options/class/config/CP drift | Refuse before broker setup/load |
| Bootstrap raw256MiB/journal/diagnostic receipt exhaustion | Bounded failed attempt, no scalar calibration reuse |
| Heap threshold equality or sticky breach during setup/drain/workerclose/replay/finalwrite | Failed attempt; guard joined; publication absent |
| Missing/stale physical sample or mount/broker UUID/replica drift | Failed/unknown resource evidence, never zero substituted |
| CAPTURE output before SETTLE durable/controller admission | Deadline offered1/admitted0/decided1/settled0/pending1 valid; final all1; recorded actual trace |
| SETTLE result races admission notification | Counter event protocol either delays counting until admission known or retains original event time and coherent cross-stage snapshot; no artificial late credit |
| Admission notification after deadline, result before deadline | Deadline admission remains0; frozen semantic choice and diagnostic limitation recorded; do not stamp recovered prefix with current time |
| Teardown while producer/admin/physical collector blocked | TERM→KILL→wait known owned group; unrelated sentinel alive |
| Bootstrap result-only replay | Records2101/inputs2100; same complete owner/history checksum; pending100 retained separately from timed counters |
| Empirical bootstrap artifact supplied to conservative preparePolicy | Schema/provenance gate refuses; no `READY_CONSERVATIVE_BOUND` fabricated |

Implementation details may alter test seams, not expected economics/counts/duration. Crash before journal force and force-before-publication proof belongs ACK owner and remains separate from bootstrap resource tests.

## What conservative upper evidence must prove

Finite bound is conditional model over pinned implementation and declared constraints, not measured average scaled by arbitrary multiplier. Prove each term independently:

| Bound field | Required derivation |
| --- | --- |
| identityHeapBytesUpper | Maximum retained worker-kernel +observer-reference graph for every settled identity in declared domain/policy/ID-width family. Include executionIndex, two action dedup contexts, effects, versions, container/map/table capacity and resizing overlap. No history list because retainHistory=false, but latest record/copies counted separately. |
| pendingHeapBytesUpper | CAPTURE-only retained owner graph +dueIndex (TreeMap Due/BigInteger/work IDs) and later duplicate/settled coexistence lifecycle. Pending count may coexist with all settled identities. |
| baselineHeapBytesUpper | Explicit operational ceiling enforced at before-setup/warmed-before-aging/producer-warmed stages, plus proven bound for later class/cache/metadata growth. Max of a few observed warm samples alone does not prove all future baseline behavior. |
| transientHeapReserveBytes | Bounded RAM suffix including ACK journal/index/lookups, encoded producer buffers and in-flight requests, socket/JVM data structures, result/consumer fetch caches, decoded batch trees, kernel record/canonical encoding/digest arrays/sorted changes, reference before/after/expected-delta copies, sampler/latency lists and serialization. Buffer.memory alone insufficient; fetch caps have first-batch exception. Account garbage awaiting GC if bound claims used-heap peak. |
| replayHeapReserveBytes | Exact stage overlap: worker close clears kernels, observer reference owner.removeAll before restore, producer/clients closed, yet old map tables/local refs and unreachable objects may remain until GC. Include restore Reference graph, consumer fetch/String/tree/history copies, final owner digest/result serialization, file staging. System.gc requests are not proof immediate reclamation. |
| supportedIdentities/Pending | Exact finite range and maximum strings/long widths/map resize thresholds; conditional state counts2I+P actions. Largest planned fresh/aged combination explicit. Changing IDs/policy/cache/record generator invalidates model. |

Graph census +layout provides live-retained bound. Used-heap includes garbage until reclamation. A rigorous hard peak bound needs either bounded cumulative allocation per finite phase (no assumed GC) or justified VM/collector allocation/reclamation model. Sampling and postGC difference can validate/contradict model; they cannot replace missing peak reserve derivation. Do not call a model conservative while leaving its dominant clients/dead-object peak unspecified.

Source sizes alone do not bound arbitrary decoded complexity. Here generator fields/flat shapes finite: payload13 CAPTURE/5 SETTLE, deterministic phases/ID length capped by finite count, decimal values checked64-bit, fixed policy. Use these actual shapes; do not model arbitrary1KiB JSON inputs then silently accept external content. Kernel's limit64KiB/64changes applies before checksum; checksum adds78 encoded bytes. Checksummed history upper65,614 bytes; wrapper and parser shape must bind same candidate.

## Smallest useful JDK measurement sequence

No new dependency required. Prefer explicit MXBean used/max/CPU telemetry already present; pause off timed interval at after warm, after settled1000, after pending100, after workerclose, after replay. Use matching installed JDK21 `jcmd PID GC.class_histogram` with known owned PID, bounded output/time and raw receipt. It identifies class counts/shallow bytes and tests cardinality/model expectations, not owner graph reachability. `GC.heap_dump` optional, expensive and raw-budget-sensitive; never dump768MiB then pretend256MiB raw proof cap unchanged.

Optional custom no-transform sizing agent can test exactly two lower-bound types (Map.Entry/ObjectNode) in broker-free diagnostic. Official Instrumentation contract calls size approximate; HotSpot21 JVMTI implementation uses object size×wordSize, so pinned VM source/flags can support implementation-specific layout proof. Agent JAR/hash, no transformers, no module/search-path alteration, extra `-javaagent` argument require separate diagnostic launcher identity. Such evidence may validate lower bound/type-model parameters, never silently become production capability under exact two-flag contract. Full reflection graph traversal requires access to JDK internals or explicit model walkers; omissions must fail, not return partial size as upper. Agent traversal itself allocates and must be budgeted.

JFR allocation samples/old-object samples or ThreadMXBean allocated-byte observations identify dominant paths/garbage pressure. Neither proves all object counts nor universal upper allocation per execution. Prefer them only when failed bootstrap needs explanation. [ThreadMXBeanJDK21](https://docs.oracle.com/en/java/javase/21/docs/api/jdk.management/com/sun/management/ThreadMXBean.html) and [InstrumentationJDK21](https://docs.oracle.com/en/java/javase/21/docs/api/java.instrument/java/lang/instrument/Instrumentation.html#getObjectSize(java.lang.Object)); checked October5,2026.

## Independent finite owner review

Reviewer receives exact candidate manifest, source paths/line scope, installed bytecode/VM layout receipts, finite formulas and numerical worksheet, raw bootstrap process/counters/sensor/physical/source receipts, all rejected attempts and explicit unknowns. Fresh context reviewer reproduces counting and arithmetic; checks aliasing, phase overlap, bounds versus samples and actual requested supported range. Outcomes: `READY_CONSERVATIVE_BOUND` only if all fields defensibly derived; `EMPIRICAL_DIAGNOSTIC_ONLY` when limits/samples sound but upper proof incomplete; `REJECTED_FINITE_HEAP_ENVELOPE` for reviewed rejection proof. Hash/verdict/owner identity and review date suffice; cryptographic signature adds no identified threat-control need here.

Expected effort: separate bootstrap manifest/CLI+guard strategy integration60–90m, focused RED/GREEN and raw measurement30–45m, independent review30–45m. Lower-bound validation/review30–60m can run after current source freezes. Full conservative allocation upper proof likely exceeds2h if Kafka/Jackson transient closure unresolved; stop that proof branch on explicit unresolved term, retain bounded measured progress. Avoid broad framework survey. Full60s ladder remains gated by smallest-arm bound, not by available session time.

## Risks and lifecycle

- Calibration at1000 finite sample gives record sizes, allocated-disk deltas and burst driver/reference costs; not peak-rate sustained capacity. Kafka allocation/segment granularity yields noisy non-linear disk per-trade averages; physical owner must preserve baseline/delta uncertainty and churn, never negative delta clamped into cost.
- Changing current buffers makes new config candidate; previous E3 results only transfer to unchanged economic semantics, not changed rate/heap baseline. Bootstrap repeated identically after corrections.
- Observer CPU deliberately includes independent complete-delta verification; driver/probe co-resident with kernel, so burst rates cannot separately prove producer/observer capability at sustained offered rate. Raw phase timing and CPU needed.
- Cold managed restart currently scans persisted coverage/history/state into maps in FinancialProcessor.init; result-only replay closes different path. Aged restart heap can dominate and is outside current owner-only lower formula. Exact managed replay counts/bytes need independent bound before such arm.
- RSS/RocksDB/client native memory separate. JVM768MiB alone says nothing about RSS; disk cap alone says nothing about memory. Native tuning is one later measured variable, not automatic implementation in bootstrap.
- Current7h session can complete useful costs/rejection result and scoped gate engineering even if original ladder refused. No partial60s run relabelled E4 pass; no blanket deferral before finite diagnostic/structural bottleneck evidence.
