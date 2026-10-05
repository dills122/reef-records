# Independent finite retained-heap review

Review instance: 1 of 3. Heap attempt 1, cycle 1. October 5, 2026.

## Findings

**P1: unchanged smallest E4 arm cannot fit strict used-heap envelope under pinned model premises.** 150,000 settled executions require two simultaneously live economic owners. Installed-layout retained lower: 804,000,000 bytes, exceeding 644,245,094-byte strict limit by 159,754,906 bytes. Entries-only lower: 732,000,000 bytes, independently exceeding limit by 87,754,906 bytes. Successful complete settlement/state parity cannot bypass this final live-state requirement. This is finite heap-envelope rejection, not measured rate-capacity failure.

No source defect finding or proposed fix within readonly scope. Changing retention or observer representation requires new candidate and correctness review; shortening duration or raising heap does not satisfy original arm.

## Scope and independence

Initiator identifies branch codex/calcify-e4-readiness and FinancialKernel baseline 29a8926d33f9e2dc7278a1676a6fa3272628de3c. Git inspection explicitly excluded. Actual reviewed file/JVM/jar hashes preserved in source-runtime-sha256.txt. Kernel and BrokerProbe hashes match author worksheet; RateProbe hash differs, reflecting current ACK candidate. Whole-file hash frozen at inspection, with relevant generator/Reference/worker-close semantics independently read.

Blind source pass completed and preliminary ledger sent to initiator before reading author worksheet/recommendations. Reconstructed actual fixture count: 61 entries/10 objects per owner, not author's generic minimum 49-entry model. Author model then read and reconciled. Review source-only for Financial code; no Financial build/class-to-source assertion, Gradle, broker, dependencies, Git mutation, sizing agent, product source edits, or new VM layout flags. Review artifacts only written.

Codebase-memory skill used: project reef-calcify-session-8c6f, generation 2026-10-05T07:02:27Z. Kernel coverage metadata_match; RateProbe metadata_changed. Graph is positive lead only; complete relevant source inspected directly for stale RateProbe.

## Retained cardinality

Exact generator: FinancialRateProbe.kt action(), lines 62–71. One hot domain, execution timed-ID; unique CAPTURE/SETTLE action IDs; quantity 1, price 10,000,000 nanos, dueTick 0, attempt 1. Policy canonical fixture: docs/evidence/calcify-financial-sprint1/fixtures.json /policy, exactly kernel/schema/policy/reference/rounding/fees/reservation. Each decision context adds logicalTick/domain: nine fields; selected policy replaces existing policy key.

Per settled execution, per owner:

| Structure | Outer entries | Child entries | ObjectNodes |
| --- | ---: | ---: | ---: |
| executions | 1 | 13 payload | 1 |
| obligations | 1 | 3 settled obligation | 1 |
| workflows, instructions, attempts, versions | 4 | 0 | 0 |
| dedup CAPTURE + SETTLE | 2 | 6 rows + 18 contexts | 4 |
| effects SETTLE | 1 | 12 four legs | 4 |
| Total | 9 | 52 | 10 |

61 entries are distinct map-node instances. An entry shared key/String/value does not share entry identity across maps. Two actions produce two distinct dedup rows/contexts; four legs produce four objects. Account balance and account version maps remain fixed-size and are deliberately omitted. dueQueue is removed on settlement and omitted. No duplicate root map/ObjectNode count; root maps are nine entries in shared per-category containers, whose container overhead is omitted. effects array overhead also omitted.

## Aliasing and lifecycle proof

FinancialKernel.kt constructor/process/capture/settle/evolve: state private owner; process creates policy.deepCopy context for each new action; Changes.put deepCopies mutable containers; evolve deepCopies after containers into state. CAPTURE retains normalized 13-field payload and obligation. SETTLE replaces obligation with settled 3-field object, adds one attempt and four 3-field effect legs; prior execution/dedup remain. Scalar deepCopy may share immutable values; formula counts none.

retainHistory=false only prevents records.add in append; it does not prune executions, dedup, obligations, effects or other counted state. latestRecord is one bounded additional graph and omitted. executionIndex extra map/set is omitted.

FinancialBrokerProbe.kt FinancialProcessor.kernels (line 197), getOrPut (243–245), close (289): live processor owns hot kernel until close clears kernels. Installed Kafka 4.3.1 ProcessorNode has final processor field and invokes Processor.close in close (bytecode receipt). Normal fresh arm does not prune/rebuild owners per trade; abnormal task failure/restart cannot count as successful unchanged arm. Streams remains active through drain and final sampling.

FinancialRateProbe.kt Reference.owner and accept (79–153): independent owner starts empty, CAPTURE retains parsed result record payload; writes deepCopy into owner. Worker publishes String JSON (BrokerProbe 275); observer reads result through json.readTree (RateProbe observer loop). Distinct serialization/parse path and recursive mutable deepCopy prevent worker/observer ObjectNode or map-entry sharing. Seven-key policy source may be shared immutable input, but each retained mutable context is copied; policy/scalar sharing is excluded from lower.

RateProbe constructs reference before streams startup, observer updates it throughout workload, waitCovered drains complete source count, and only then finally closes streams. reference.owner.removeAll occurs after workers-closed and owner digest. Thus immediately before streams.close, both complete states are simultaneously resident. Replay replaces Reference only after old owner is cleared; no third owner assumed. JIT cannot discard reference state needed for later digest or live kernel needed for continued processing.

## Installed layout premises

Installed Oracle HotSpot 64-bit 21+35-LTS-2513, observed with same -Xms128m -Xmx768m plus PrintFlagsFinal diagnostic output: actual MaxHeapSize 805306368; UseCompressedOops=true; UseCompressedClassPointers=true; ObjectAlignmentInBytes=8. PrintFlagsFinal only exposes flags; no layout flag changed. Installed Jackson2.22.3 and Kafka4.3.1 match build.gradle.kts declarations; exact jar hashes in receipt.

JDK javap: HashMap.Node fields int hash plus key/value/next refs; LinkedHashMap.Entry adds before/after refs. Header12 + int4 + five compressed refs20 =36, rounded to eight => minimum40 bytes. Hash-collision tree nodes may be larger and cannot weaken lower. Jackson javap: ObjectNode _children ref, inherited ContainerNode _nodeFactory ref; remaining ancestors have no instance fields. Header12+8=20, rounded =>24. Constructor creates new LinkedHashMap; deepCopy creates new ObjectNode and inserts each key/child into fresh map. All counted mutable objects escape into retained owner, preventing scalar replacement of these objects.

HotSpot layout premise also checked against release-tag primary source [OpenJDK jdk-21+35 oop.hpp](https://raw.githubusercontent.com/openjdk/jdk/jdk-21%2B35/src/hotspot/share/oops/oop.hpp) and [oop.inline.hpp](https://raw.githubusercontent.com/openjdk/jdk/jdk-21%2B35/src/hotspot/share/oops/oop.inline.hpp): mark word and compressed klass metadata model. Upstream release source supports installed implementation model, not proof Oracle binaries are bit-identical. Installed VM hash/version/flags bind conditional application. No empirical getObjectSize or heap histogram asserted.

## Arithmetic and author-claim reconciliation

Actual fixture: 2*(61*40+10*24)=5360 bytes/trade; 150000*5360=804000000. Stronger minimal proof omits ObjectNodes: 2*61*40=4880; 150000*4880=732000000. Strict limit floor(805306368*4/5)=644245094. Both exceed limit. All heap baseline, map headers/tables, scalar nodes/strings, clients, record buffers, transient garbage, history/latest record, replay/cold-recovery, native memory omitted; adding any cannot rescue arm.

Author 49-entry minimum/4400-byte model confirmed as deliberately weaker generic-context model; actual fixture yields 61 entries/5360. Author two-owner overlap and retention claims confirmed. Author unknown upper bound/native/peak terms confirmed unresolved. Author sourceHashes partly stale: RateProbe changed; no reuse of worksheet hash as candidate identity.

## Plan review and verdict

**REJECTED_FINITE_HEAP_ENVELOPE**, conditional on reviewed source semantics, exact seven-key policy, complete 150000 unique settled executions in one live hot domain, two owner retention through streams.close, and installed HotSpot21 layout premises. Original 2500×60 arm cannot pass full retained-state strict80%-of-768MiB requirement. Larger unchanged fresh arms also contain at least same required retained cohort; they are no more admissible under same premises. No upper costs minted; no READY_CONSERVATIVE_BOUND; no rate knee or measured throughput claimed. A 1000/100 diagnostic is outside rejection scope and has no heap-fit guarantee from this lower model.

**Residual limits:** compiled Financial bytecode/source binding not verified; actual executable capability/classpath/config manifest must match before applying rejection to an executable candidate. JVM layout/owner retention/policy/identity shape changes invalidate model. Other E4 gates remain outside scope. Required completion retention pass is no-op for source/contracts/docs because review performed no product change; parent owns final archive/publication of review receipts.

Recommended next action: bind this scoped rejection to final candidate manifest; preserve finite diagnostic evidence separately; stop original ladder. Any retained-state representation change needs explicit parent decision and new proof rather than inferred approval from this review.
