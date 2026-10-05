# Reviewable finite compact lower-bound proposal

October5,2026. Supplement to memo.md. No product edits/build/workload/new application JVM; readonly installed javap and src.zip inspection performed as requested. Draft helper remains proposed and unbound to new candidate. **No new executable lower-refusal verdict issued. No conservative upper derived.**

## Fresh String/backing-array evidence now closed at library level

Installed Kotlin stdlib SequencesKt___SequencesKt.joinToString bytecodePC36 creates new StringBuilder,PC61 invokes StringBuilder.toString. CollectionsKt___CollectionsKt.joinToString does samePC36/61 for array branch (JsonNode iterable). Draft helper canonical’s object branch uses sequence joinToString, array branch iterable joinToString. All five counted top-level retained values are nonempty objects/arrays, so final retained String returned by builder path even if child scalar serializer reuses temporary values.

Installed JDK21 StringBuilder.toString bytecode/source creates new String(this). String(StringBuilder) calls String(AbstractStringBuilder,Void); Latin1 branch Arrays.copyOfRange(value,0,length), UTF16 branch copies2×length or creates compressed bytes. No String.intern call in these paths. Nonempty canonical leaves therefore have fresh String objects and fresh backing arrays from each completed call. Structurally they escape into owner category map. Repeated equal obligation/effects contents do not by themselves share arrays. HotSpot StringDeduplication can change array-sharing afterward; disabled flag is necessary for per-trade repeat arrays in this formula. Java does not automatically intern arbitrary newly built String values.

Jackson BaseJsonNode.toString delegates InternalNodeMapper/ObjectWriter.writeValueAsString; ObjectWriter creates new SegmentedStringWriter each call, getAndClear delegates TextBuffer.contentsAsString. TextBuffer uses new String from chars or StringBuilder and can cache result within its TextBuffer, so do not claim every Jackson temporary path is independent without scope. This does not weaken five final aggregate String lower: top-level object/array Kotlin joinToString always finishes through fresh copying builder. ObjectNode creates LinkedHashMap and deepCopy recursively creates new mutable node/map. Receipts saved String/StringBuilder/Kotlin/BaseJsonNode/InternalNodeMapper/ObjectWriter/SegmentedStringWriter/TextBuffer/ObjectNode javap; installed source archive and library hashes in layout-source-evidence.json.

String instance fields from actual javap: byte[]value reference4B, int hash4B, byte coder1B, boolean hashIsZero1B with12B compressed header =>22rounded8=24B. byte[] header12+length4=16B; Latin1 at leastLbytes, rounded8. Prior saved flags CompactStrings=true, UseStringDeduplication=false, compressed oop/class pointers=true, alignment8. Those receipts are historical premises, not newly observed compact candidate VM. Actual new launcher must bind before refusal. Candidate helper compiled call-sites must match inspected source/library bytes; not asserted here.

## Exact finite value lengths and consequence

five-values-derivation.json records complete canonical minima from declared source generator/fixture. Zero64digit placeholder represents exact64hex digest length, not empirical digest values. Closed scenario fixed namespacefinancial-e4/domainhot/runIde4/venue/ACME; quantity1/price10000000/due0/attempt1; policy kernel=e1-gross-v1/schema=e1-v1/policy=gross-p1/reference=assets-r1/rounding=EXACT/fees=NONE/reservation=UNRESERVED; context adds logicalTick0/domainhot. TimedIDs0..149999 have decimal lengths1..6; minimum timed-0 applies all. Payload executionId,buyOrderId,sellOrderId each length increases by digit growth; JSON escaping adds no shorter representation. Sorted-key compact object JSON preserves quotes/numeric strings and fixed field counts.

Minimum lengths: execution298, settled obligation59, CAPTUREdedup291, SETTLEdedup290, four effect legs231ASCII bytes. Five String+array minima344+104+336+336+272=1392B/trade. Unchanged kernel61entries/10ObjectNodes2680B; compact9map entries360B. Conditional lower4432B/trade;150000*4432=664800000B >644245094 by20554906. Larger digits only increase execution value length; omittedkeys/scalars/tables/index/client/transient/native costs cannot reduce bound. No payload sample/average×multiplier used.

Strict conditions: actual one-hot domain completes150000unique successful settlements; worker retained shape unchanged; compact category map keeps all nine leaves per settled identity, five canonical object/array Strings separately constructed/retained; no pooling/dedup/truncation/cache substitutions; two logical owners coexist through timed full drain before close; pinned JVM/library/layout and fixture identities match. Missing any condition yields unsupported/unbound refusal, not upper admission. Later pooling proposal below expressly invalidates1392term; preserve old proof as dated scenario.

## Minimal future layout capability pin proposal

Propose additive capability.layoutFlags object containing **textual** HotSpotDiagnosticMXBean.getVMOption(name).value for exact five names:

```
UseCompressedOops: "true"
UseCompressedClassPointers: "true"
ObjectAlignmentInBytes: "8"
CompactStrings: "true"
UseStringDeduplication: "false"
```

Read from actual launching JVM, freeze raw capability and bind candidate/build/classpath/config/fixture as existing process. Textual values avoid repeat IntNode/LongNode issue; reject unavailable option/bean, missing/extra key, nontextual value, wrong exact supported value and frozen/current map drift with named error. Keep max strict integral helper and exact VM flags. No fabricated fallback value, silent flag override or generic numeric coercion.

At actual bootstrapGuard and ordinary heapGuard entry, validate supported map and exact frozen/current textual values **before constructing/starting guard, Admin/client setup, topics/payload or returning admission**. Child bootstrapRecovery calls same guard, so own actual map must match too. Node execution-boundary validator should require same frozen supported map and actual capability match; proof receipt review includes raw layout map identity. Existing API schema compatibility/additive version choice and new tests need parent decision; this memo patches nothing. A lower refusal need only support reviewed layout; no need claim all other layouts refuse. Changing layout makes formula unsupported pending separate model, not automatic acceptance. READY_CONSERVATIVE_BOUND remains absent even with layout pins.

Focused tests for future capability seam: actual map is textual; JSON round-trip preserves; mutate each supported flag or alignment one at a time; missing/extra/nontextual/unavailable fails before setup. Mock unsupported HotSpot runtime should refuse narrow model explicitly. Check child guard uses same seam. Preserve max/hash/source/VM identity controls and actual E3/new candidate binding. No heap-limit increase.

## Most local next compact mitigation if lower confirmed

Introduce **bounded exact constant-leaf sharing** in FinancialCanonicalLeafOwner, not global String.intern and not deletion/hash substitution. Same fixture has identical canonical settled obligation59B and identical four-leg effects231B for every successful settlement. Retain one immutable canonical String+backing array for each exact constant, validate exact content and appropriate category/shape, reuse same immutable String pointer in every logical leaf entry. Every key, value, canonical digest, materialized owner, delta and history remains unchanged. Changed facts must fail cache match and store distinct canonical value; never normalize unknown values to constant. Cache size fixed2(or separately specified pending third constant), no unbounded vocabulary or new mutable sharing with worker. This is representation-only proposal requiring independently tested new candidate, not execution instruction.

Reusing these two values changes repeated per-trade1392term to1016B plus constant376B once: total minimum3040+1016=4056B/trade;150000*4056+376=608400376B. That revised weak lower falls below gate; **does not prove fit** because large omitted keys/scalars/maps/indexes/baseline/transient/replay costs remain. Kernel alone still refuses300000+, regardless observer constant sharing. No performance gain/rate guarantee claimed; pooling may lower retained bytes but adds match/lookup work.

Tests: exact identity reuse for same constant content across differenttrade IDs, value-isolation on parsed get, mutation of input cannot change constant, changed residual/status/amount/account/asset stores different value and remains exact, all selfCheckprefix/fullOracle/delta/journal/history checks, final/replayed ownerSHA same, complete pending100/settled1000 baseline/new-JVM activation/result replay, no global cache growth beyond declared constants. Digest must emit every logical leaf despite shared stored String. Rebind model to sharing identity and supported scenario; preserve prepool lower as superseded conditional evidence.

Minimum next evidence remains component-wise finite upper inventory and stage liveness from memo.md. Exact local mitigation removes one identified retained cost, but may leave original smallest rung impossible. Baseline semantic/recovery diagnostics pass first; no new workload authorized here.
