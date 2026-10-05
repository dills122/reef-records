# Bootstrap capability round-trip refusal

October5,2026. Read-only research before Attempt2 source patch. No product source/config edits, root build/compiler, brokers or workload. Prior retained-model reports preserved. Initiator owns minimal implementation, fresh whole review attempt and actual-run restart.

## Finding and actual evidence

Attempt1 proof/supervision/wrapper.stderr.log records BOOTSTRAP_CAPABILITY_DRIFT field=maxHeapBytes at FinancialRateProbe.bootstrapGuard437, invoked from main641. Main calls guard before config/topic setup/AdminClient (source641 then664–667); this failure precedes topic creation and producer economic payload in this invocation. No successful bootstrap, calibration bytes or capacity result follows. Owned-broker stop described by initiator; this pass did not independently operate or check brokers.

Read bootstrap-attempt1/frozen/capability.json and parse Node proof/heap-capability-attempt.json stdout. Every capability field matches except intentionally changing usedHeapBytes; both maxHeapBytes805306368. Includes source/config/fixture/build/classpath identity, all51ordered classpath entries, Java/vendor/VM arguments and classIdentityScope. raw-comparison.json retains hashes and differing field values. Baseline sourceHead remains supplied baseline, not full candidate equivalence.

Current heapCapability177–200 uses valueToTree(mapOf(... Runtime.getRuntime().maxMemory() ...)), producing LongNode because Kotlin Runtime maximum type Long. Raw JSON round trip with default ObjectMapper reads805306368 as IntNode. bootstrapGuard437 compares JsonNode equality; IntNode and LongNode have unequal node identity despite equal integral value.

Independent isolated JShell on actual51entry classpath reproduced:

```
ACTUAL_TYPE=LongNode
FROZEN_TYPE=IntNode
NODE_EQUAL=false
STRICT_INTEGRAL_VALUE_EQUAL=true
```

Successful command uses installed JDK21 JShell --execution local plus -J--class-path=actualCP and --class-path actualCP; no product compilation or class mutation. Script uses805306368L to reproduce Runtime type and writeValueAsBytes/readTree exact round-trip. Attempt with local execution without JVM classpath failed classloading; default remote execution failed sandbox socket binding. Both failures preserved, not mistaken for passing proof. Final successful logs and command preserved separately.

## Smallest strict correction

Keep sourceHead, fixtureSha256, configSha256, buildSha256, classpathSha256, javaVersion, javaVendor and classpathEntries under exact JsonNode identity equality. Keep exact pinned vmArguments comparison. Remove maxHeapBytes only from that heterogeneous identity loop; parse capability max and current max separately with FinancialHeapBounds.integer(node,"maxHeapBytes"). Require equal validated Long values, reporting BOOTSTRAP_CAPABILITY_DRIFT field=maxHeapBytes for real mismatch. Require actual strict integral value equals AUTHORIZED_MAX805306368, retaining BOOTSTRAP_PINNED_MAX_REQUIRED for unauthorized pinned maximum. Do not use asLong alone, which coerces strings/floats and missing values. Do not globally enable mapper USE_LONG_FOR_INTS, normalize every numeric node, replace structural identity with text or introduce broad equivalent(JsonNode,JsonNode).

FinancialHeapBounds.integer rejects missing/nonintegral/out-of-Long-range/nonpositive/aboveMAX_SAFE_INTEGER nodes. Original strict pinned max constraint retained after valid numeric equality. Different numeric widths may compare equal only for this intentional integral heap field. usedHeapBytes remains intentionally not equality-pinned across JVM observations; existing diagnostic guard samples current used heap and sticky threshold. This change grants no new heap admission or conservative bound.

## Focused TDD recommendation

RED regression must build actual capability via real heapCapability, serialize to raw file/parse request embedding, and enter actual bootstrapGuard until legitimate next gate without numeric-type failure. Frozen max should assert IntNode and in-memory actual LongNode for installed805306368; avoid handcrafting only same-node types. If extracting a tiny internal compare helper improves focused testability, actual bootstrapGuard must invoke it and test actual entry path still covers round trip.

GREEN requires unchanged matching strict integral maxima survive. Negative controls: differing integral maximum; decimal805306368.0; text"805306368"; null/missing; negative/zero; aboveLong range; aboveMAX_SAFE_INTEGER; equal unauthorized integral maximum. Existing nonnumeric drift controls for build/classpath/config/fixture/source/vendor/version/entry order and VM flags must continue refusing. Assert actual mismatch retains drift error and unauthorized equal max retains pinned-max error; invalid shapes may retain FinancialHeapBounds HEAP_INVALID_maxHeapBytes. Preserve next-gate failures as failures, not full bootstrap passes.

Run focused existing bootstrap tests plus whole financial regression; refresh source/build/classpath/candidate and old/current run evidence after patch. Whole Attempt1 cycle3 Ready binds previous source, not this fix; new Attempt2 review needed under parent-approved loop. Replay/ACK/recovery/physical gates remain unchanged. Fresh actualE3 prerequisite may need regeneration against changed candidate/build even though economics untouched. Preserve failed actual Attempt1 raw receipts and classify setup refusal, zero economic payload.

## Other numeric equality sites checked

- bootstrapLimits(): Kotlin parses JSON literal (source260–267), request parsed raw JSON. Current small limits/count values consistently IntNode on both sides. No observed round-trip mismatch; keep exact limits equality at414. Do not coerce it generally.
- validateBootstrapCounts252–258 already uses FinancialHeapBounds.integer against fixed Long expected counts; appropriate strict path.
- E3 marker/manifests/raw review/spec identity compares parsed JSON against parsed JSON, including arms/counts; same serialized integral values parse consistently. No in-memoryLong capability comparison in these paths.
- bootstrap review sampleTrades/pendingSample/agedIdentities461 compares parsed review/spec; matching parsed types. Both raw SHA/semantic equality retained.
- brokerScope actual map constructs Broker.id Int values and Node.port Int; frozen raw broker pins are small integral IntNode. Endpoint port/id equality not generalized; maintain literal host/endpoint/cluster proof.
- recovery parity853 uses asLong against expectedHistory; process IDs/counts currently compared asLong with actual PID/count constants. These are existing separate validation paths; this max fix does not broaden them. Caller-validated recovery/request schemas and raw hashes remain required. Potential general shape hardening is distinct scope, not prerequisite claim here.
- Ordinary heapGuard already parses capability max/used through FinancialHeapBounds.integer (source240–242); unaffected by new bootstrap max check.

No source authority, policy, economic identity, resource limit or model formula changes proposed. Prior ordinary150000-trade retained-envelope refusal remains structural; new source/build requires factual rebind before transferring executable identity.
