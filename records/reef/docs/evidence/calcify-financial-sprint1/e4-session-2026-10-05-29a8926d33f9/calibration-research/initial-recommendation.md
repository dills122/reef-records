# E4-C first recommendation — October 5, 2026

Research-only. Baseline `29a8926d33f9e2dc7278a1676a6fa3272628de3c`; active concurrent ACK/physical/wrapper edits require fresh candidate hashes. No product edits, builds, broker loads, dependencies or commits performed. JDK version/flags and installed class bytecode inspected only.

**Implement narrow finite diagnostic bootstrap today. Keep existing conservative calibrate/run gate intact.** Freeze separate `financial-calibration-bootstrap-v1` request and explicit bootstrap command; initial exact cohort 1,000 settled trades +100 CAPTURE-only pending trades =2,100 source actions, 2,101 history records including genesis. Emit `EMPIRICAL_BOUNDED_DIAGNOSTIC`, never `READY_CONSERVATIVE_BOUND`. Run serially under capacity lock and external whole-lifecycle resource supervisor. Same `-Xms128m -Xmx768m`, strict used-heap80% guard, actual max/identity binding and sticky breach through replay/publication. No synthesized upper costs or fake review receipt passed to `heapGuard`.

Count and byte caps create finite experiment scope; they do not mathematically guarantee heap fit. Explicit bootstrap authorizes measured diagnostic risk. `-Xmx` limits Java heap, not native/RSS; sampled guard can lose race to allocation. Default production-like admission remains blocked until independent owner accepts actual model-supported costs. If requirement is mathematical heap safety for every allocation, diagnostic bootstrap alone does not meet it.

## Decision-critical ladder stop

Smallest proposed arm retains150,000 settled identities in worker kernel and independent Reference simultaneously before worker close. Source currently retains full JSON economics in both owners. Conditional lower-bound derivation:

| Per-owner retained structure per settled identity | Minimum entries |
| --- | ---: |
| Root maps: execution, obligation, workflow, instruction, attempt, version, two dedup, effect |9|
| CAPTURE payload |13|
| Obligation |3|
| Two dedup rows |6|
| Two contexts: at least policy, logicalTick, domain |6|
| Four effect legs ×asset/account/amount |12|
| Total distinct map entries |49|

Each owner also retains10 distinct ObjectNodes: payload1, obligation1, dedup2, contexts2, effect legs4. Installed Jackson2.22.3 constructor bytecode creates LinkedHashMap; deepCopy creates new containers/map entries. Installed JDK21 class fields: LinkedHashMap.Entry five references+int; ObjectNode two references including inherited nodeFactory. Observed launcher VM: compressed oops/class pointers,8-byte alignment, HotSpot64-bit21+35-LTS-2513. Expected minimum Entry40B/ObjectNode24B gives:

`2 * (49*40 +10*24) =4,400 bytes/settled identity`

`150,000*4,400 =660,000,000 bytes >floor(805,306,368*4/5)=644,245,094 bytes`.

This excludes map objects, backing tables, every string/value node, executionIndex, due state, baseline, source journal buffers, Kafka and replay. Exact fixture policy currently seven keys => nine context keys => still larger. **Candidate review must verify exact layout and non-sharing before using as certified rejection proof.** This is lower bound, never upper-cost admission artifact. It strongly predicts all unchanged60s ladder arms cannot pass strict768MiB policy. Do not increase heap or shorten60s then call original ladder passed. Bounded1,000/100 cost diagnostic remains useful; full E4 rate-capacity closure may require explicit retained-state architecture change.

## Bootstrap mechanics to freeze before implementation

1. Candidate source/build/orderedCP/config/fixture hashes, actual Java executable bytes/version/vendor, exact VM arguments and object-layout flags. Recompute after current ACK/physical changes. New state directory, unique test-owned topics and source UUID; never reuse old restored state during bootstrap.
2. Counts fixed1,000/100; one hot domain; only existing CAPTURE/SETTLE generators; exact prefunding1,100 shares and11,000,000,000 cash nanos. No aged population, no rate-arm selection. Source<=1,024 bytes; existing kernel unsigned decision<=65,536 bytes/64 changes (checksum adds78 encoded bytes). Expected input ordinal count2,100 and final timed counters1,000/1,000/1,000/1,000/0; pending cohort reported separately100, no credit to timed useful rate.
3. Explicit client buffers: source producer16MiB/batch64KiB unchanged; Streams internal producer similarly pin buffer/batch/request/compression/in-flight; observer+replay+Streams consumers poll128/fetch1MiB/partition-fetch1MiB; Streams buffered.records.per.partition128. Actual broker topic max.message.bytes must close oversized-first-batch exception. Candidate/config must bind these changed limits; numbers operational caps, not heap bounds. No retention/cache/profile change during timed comparisons.
4. Derive result byte envelope from maximum two65,614-byte checksummed history rows plus exact wrapper/key/offset/ordinal encoding; reject before JSON tree parse and before sink serialize admission where possible. Request max1MiB and broker topic max.message.bytes1MiB sufficient after exact wrapper calculation. Result batch limits bound encoded buffering only; decoded heap remains separate. Source raw cap256MiB must include durable journal/raw encoded evidence unless scope explicitly redefined and justified. At existing history envelope,2,101*65,614=137,855,014 encoded history bytes before wrappers/source/journal; finite budget needs explicit overhead sum, not assumed fit.
5. Dedicated sticky sampled heap sensor through startup, send, drain, worker/client close, result-only replay and publication; fail>=644,245,094 bytes if actual max768MiB. Bootstrap should have separate observation schema/constructor config so arbitrary operational budgets cannot be confused with FinancialHeapBounds conservative costs. Runtime baseline ceiling is operational stop threshold; record actual warmed samples, never call maximum observed baseline proved universal upper.
6. Parent wrapper: whole child process group wall timeout/TERM/KILL/wait; broker volume baseline and delta disk monitor, raw-file cap; preserve failure/logs; do not publish success output after stale sensor/missing physical/disk sample. Existing broker baseline5.46GiB excluded only under explicit delta metric; total growth threshold9GiB retains headroom below10GiB cap. No native RSS proof from JVM flags; measure RSS and enforce separately if current owner budget permits.
7. One measured trial then independent raw evidence review. Subsequent diagnostic at same finite counts can pace producer at2.5k/5k/10k offered trades/s to find driver knee, but runs finish in<1s and cannot substitute60s useful-path ladder. At1000 samples producer/observer rate values are burst covering rates, not sustained qualification.

## Counts correction requirement

Live `admitted`=whole timed pair durably journal-published and visible to controller at event time. `decided`=CAPTURE result observed read_committed. CAPTURE can precede SETTLE durability/notification. Valid sequence: offered1 →CAPTURE durable →CAPTURE result(decided1,admitted0,settled0,pending1) →SETTLE durable/controller notice(admitted1) →SETTLE result(settled1,pending0). Existing `admitted>=decided` rejects valid intermediate cut. Proposed frozen inequalities: offered>=admitted, offered>=decided, decided>=settled, admitted>=settled, decided=settled+pending; final all exact expected unchanged. Need actual injected probe trace and synchronized event cutoff tests before correction. Recovered durable prefix lacks old callback/controller time; never backfill deadline admission.

## Primary sources checked October5, 2026

- [JDK21 Instrumentation](https://docs.oracle.com/en/java/javase/21/docs/api/java.instrument/java/lang/instrument/Instrumentation.html#getObjectSize(java.lang.Object)): getObjectSize implementation-specific approximation; not conservative upper guarantee. An optional no-transform sizing agent would change launcher VM arguments and require separate diagnostic identity, not silent admission reuse.
- [JDK21 jcmd](https://docs.oracle.com/en/java/javase/21/docs/specs/man/jcmd.html): histogram/heap dump inspect heap; high impact; heap dump requests full GC unless all requested. Collect only outside rate interval. Histogram lacks root ownership and is not graph proof. JFR samples do not enumerate all live objects.
- [Kafka4.3 producer configs](https://kafka.apache.org/43/configuration/producer-configs/#buffer.memory): buffer.memory does not cap all producer memory. [Consumer configs](https://kafka.apache.org/43/configuration/consumer-configs/#fetch.max.bytes): fetch bounds oversized-first-batch exception; max.poll.records does not bound fetch cache. [Streams memory guidance](https://kafka.apache.org/43/streams/developer-guide/memory-mgmt/): consumer and decoded buffering indirect; native RocksDB separate. Installed Kafka4.3.1/Jackson2.22.3/RocksDBJNI10.1.3 inspected; older3.9 search results not candidate authority.
- [OpenJDK21u object header source](https://github.com/openjdk/jdk21u/blob/master/src/hotspot/share/oops/oop.hpp): implementation model lead; exact installed Oracle21+35 layout still must bind and verify. Installed class-field and constructor bytecode outputs retained next to this report. Master source is reference, not exact build assertion.

Architecture recommendation ready for parent decision. No scientifically defensible finite upper costs minted by this spike; model/review obligations below remain critical before conventional conservative admission.
