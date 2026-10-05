# Applied heap protection component — bounded stretch plan

Readonly plan, 2026-10-05. E3 external3/activation2 passed per parent; core24/golden20/final review still prerequisite. No E3 acceptance verdict inferred. Parent budgets ≤75m implementation/focused tests +≤45m independent review/docs. No source edits, builds, Docker or agents in this preparation; only this ignored plan written. Concurrent changes preserved.

**Feasible with narrow outcome:** applied heap admission/runtime protection component; existing calibration/load policies lacking conservative heap evidence stay BLOCKED. No complete E4-R1, useful-rate pass, capacity claim, native-memory bound, durable ACK membership or physical-byte closure. If expectation includes producing measured trustworthy identity/pending bounds or running large rate arms in this timebox, component cannot meet that broader outcome; defer.

## Ownership

- `/Users/dsteele/.codex/worktrees/8c6f/reef/scripts/dev/calcify-financial/rate-proof.mjs`: additive heap evidence contract, exact checked estimate, before-load admission, raw heap-evidence hash/provenance validation at executable boundary.
- `/Users/dsteele/.codex/worktrees/8c6f/reef/scripts/dev/calcify-financial/rate-proof.test.mjs`: RED controls and regression checks; fabricated fixture data labelled validation-only.
- `/Users/dsteele/.codex/worktrees/8c6f/reef/services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialRateProbe.kt`: broker-free capability mode, runtime observed max/baseline binding, lifecycle guard before load through result-only replay, heap evidence output fields. Existing ACK/count/physical semantics unchanged.
- Proposed new `/Users/dsteele/.codex/worktrees/8c6f/reef/services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialHeapGuard.kt` and `/Users/dsteele/.codex/worktrees/8c6f/reef/services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialHeapGuardTest.kt`: pure arithmetic/snapshot validation, sticky failure and guard lifecycle controls with injected sensor/clock. No new dependency, source-store design or production code.
- Parent owns concise work-plan/evidence/handoff update and retention no-op/archive assessment. Accepted E3 source frozen read-only; no FinancialBrokerProbe/CommittedCut/PartitionCut, supervisor or fault-matrix edits.

Current scoped source SHA256 unchanged from readiness report:

| Source | SHA256 |
| --- | --- |
| `/Users/dsteele/.codex/worktrees/8c6f/reef/scripts/dev/calcify-financial/rate-proof.mjs` | `cf65b30a5364f7c48df661f4a703d9a43165518c475a8caf3076d66a8d791ecb` |
| `/Users/dsteele/.codex/worktrees/8c6f/reef/scripts/dev/calcify-financial/rate-proof.test.mjs` | `5ce2d093706c666d49075ae1af386a4f96182a1ef9fe9ad0c517a70d287778e3` |
| `/Users/dsteele/.codex/worktrees/8c6f/reef/services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialRateProbe.kt` | `b5df60cbf2a10a1f5257d5eaf5db4aa419aff7b8d72b4d8a28a307fa886972c6` |

Graph project/root/generation and exact-path coverage from prior report still apply; scripts excluded, direct source read required. Read current RateProbe lines175–332 again; no structural expansion. Graph current index_status ready at `2026-10-05T03:42:21Z`; best-effort only.

## Contract: protective evidence, no invented bounds

Planner request gains required `heap` evidence for **run** policy, not optional advisory fields. Suggested small schema `financial-heap-admission-v1`:

- Runtime capability: actual `Runtime.getRuntime().maxMemory()` and MXBean used heap, JVM version/vendor, exact effective VM arguments, source/class/build/config/fixture identity. Authorized heap cap independently pinned by launcher; request cannot raise effective max. Bind by minimum of authorized cap, verified capability max and child actual max; actual larger-than-authorized maximum fails rather than loosens cap. Unknown/nonpositive/unbounded max fails.
- Conservative finite workload bound: `identityHeapBytesUpper`, `pendingHeapBytesUpper`, `baselineHeapBytesUpper`, `transientHeapReserveBytes`, `replayHeapReserveBytes`, `supportedIdentities`, `supportedPendingItems`, exact candidate/config/fixture identifiers, evidence path/hash and explicit scope. Finite supported counts prevent unproved extrapolation. Include worker kernel + independent observer/reference heap in identity cost; pending capture includes execution/obligation/dedup/due state. Reserve covers bounded suffix/client/decoded objects and temporary full-owner copy/hash/replay overlap. Native RocksDB/client RSS not inferred from heap numbers.
- Required bound artifact hash resolves owned/raw evidence with matching candidate/config/fixture and counts. Hash alone proves bytes, not scientifically conservative bound. Artifact must identify derivation, finite covered workload and explicit margins. Review accepts derivation separately. Synthetic unit fixtures may model this contract but never become measured calibration evidence.

Current RateProbe line291 `identityHeapBytes` is post-GC average, line323 simply exports it; `pendingHeapBytes` absent, bounds/provenance absent. **Reject legacy calibration as sufficient heap evidence.** Do not rename average to upper bound or multiply by arbitrary safety factor and imply proof. Small component can be fully implemented/tested while every current real load remains blocked awaiting later heap evidence.

Check integer arithmetic with BigInt/checked Long before converting to JSON-safe integer. Count `timedTrades` retained settled identities + aged settled identities; pending capture cohort separately. Estimate:

`estimatedHeap = baselineUpper + (timedTrades + agedIdentities) * identityUpper + pendingItems * pendingUpper + transientReserve + replayReserve`

`admissionLimit = floor(min(authorizedMax, capabilityMax, childActualMax) * 4 / 5)`

80% is proposed frozen protection threshold, not historical guard or capacity objective. Runtime guard threshold same limit. Baseline measured before load must fit frozen baseline upper bound; warm startup baseline check occurs before aging/timed sends. Initial preflight checks execute before topic creation; broker setup may change baseline, so warm check repeats before workload. Never use exact equality between capability baseline and later JVM baseline: startup varies. Raw observed used/max values retained with stage/timestamp; repeated baseline or child-max mismatch fails closed.

Existing disk reduction remains explicit. If aged heap exceeds envelope, smallest implementation either blocks aged arm or computes additional finite heap cap while retaining proposed1m estimate and reduced scope. **Prefer block aged arm in75m slice**; no new auto-shrinking algorithm needed. Fresh arm exceeding envelope blocks. No unexplained change to disk-derived age or original fixture.

## Runtime application through replay

Current RateProbe sampler line264 samples used heap; line265 blocks on physical API; line295 stops sampler before replay299–318. Add dedicated heap-only guard, independent of disk sampler. Otherwise slow physical API defeats heap-check cadence. Avoid generic supervisor redesign.

Guard pure core validates snapshot, computes checked limit and records sticky first failure. Lightweight polling e.g250ms with dedicated bounded executor; lifecycle managed in outer `try/finally` covering startup, preflight, aging, timed sends, drain, close, result-only restore and final artifact write. Thread must stop/join in final cleanup; sensor exception sets failure. Sticky failure never clears after GC. Invalid used/max, used≥limit, stale snapshot or actual max changing outside frozen binding fails.

Main checkpoints check sticky failure and refresh/check heap before topic creation, before aging/timed load, each bounded send/wait batch, before/after owner digest/deep copy, before replay allocation, every replay poll/record batch and before writing success-like output. Observer propagates failure through existing fatal mechanism. Startup/drain bounded waits poll failure rather than waiting60/120s blindly. Error exits nonzero; wrapper preserves logs and no measurement claims successful parity/pass after guard failure. Existing result output gaps stay intact.

Do not describe250ms sampled guard as continuous maximum or guaranteed OOM prevention: sudden allocation can outrun observation; JVM max remains actual hard heap limit, process may OOM before graceful error. Component acceptance is known unsafe preflight rejection plus fail-closed sampled breach/error handling and sticky no-success result through replay. External process-tree/resource supervision remains existing open E4 integration; heap slice cannot claim wrapper teardown proof or RSS/native safety.

Calibration mode may emit capability/observations but cannot mint conservative bound from average. Default calibration request with no applied heap cap/runtime binding rejects; future explicitly frozen small calibration may use count cap and runtime guard as diagnostic to gather evidence, requiring separate authorization. No broker calibration included in this slice.

## Actual launcher/capability check

Readonly command executed during preparation:

`/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home/bin/java -Xms128m -Xmx768m -XshowSettings:vm -version`

Observed: Java21 `21+35-LTS-2513`, HotSpot64-bit Server; Min Heap128.00M, Max Heap768.00M. No broker connection, compile or build. This confirms installed VM honors supplied flags; it does not bind arbitrary adapter or report warmed RateProbe baseline.

Proposed broker-free `heap-capability` mode evaluated before normal argument/config/topic logic in RateProbe.main. Emit JSON actual max/used/VM arguments + class/build/config identity; perform no topic/client creation. Parent freezes exact absolute Java21 executable, `-Xms128m -Xmx768m`, test classpath/class bytes and controlled JVM option environment. Runner capability output must come from same pinned executable/classes/flags as future run. Recheck actual maximum in child; launcher command metadata alone insufficient. Capability run after focused compile allowed in implementation task, no load.

## Deterministic RED cases

1. Current reproducible missing admission: oversized identity/pending cost plus768MiB request still returns FROZEN. New pure check rejects; missing/zero/negative/string/NaN/unsafe bound/max or hash rejects.
2. Child observed max smaller than freeze: recompute lower effective budget and reject before load. Child max larger than authorized launcher cap: reject binding, cannot silently raise. Request metadata cannot substitute actual JVM snapshot.
3. Baseline exceeds baseline upper or80% limit before setup/warm load: refuse before send; mutation spy sees zero topic calls for initial check and zero producer sends for warm check.
4. Exact near-boundary arithmetic: equality at admission limit handled consistently (prefer reject≥); below passes; multiplication/addition overflow/unsupported identity/pending counts reject. Timed+aged+pending counted once. Large fresh case rejects, aged overrun blocks with original proposed1m estimate retained.
5. Forged/missing raw evidence or source/class/config/fixture/count mismatch: executable entrypoint refuses. Legacy average identityHeapBytes and missing pending cost cannot satisfy contract. Synthetic hash fixtures remain validation-only.
6. Runtime used crosses threshold during startup/send/drain/replay; sticky failure blocks artifact publication. Replay test triggers fake sensor breach after first restored batch, proves checks remain active after streams/observer close.
7. Sensor throws, max unknown, snapshot stale: first failure retained; later healthy/GC snapshot does not clear it. Guard closed in exceptional cleanup and no leaked heap polling thread.
8. Heap checker remains callable while mocked physical collector stalls; independent heap sensor failure visible. Tests need no broker. Final legacy accounting/resource gaps preserved; `capacityQualification=false` remains.

Pure helper tests validate runtime arithmetic and sticky lifecycle; a small extracted probe lifecycle seam/test spy validates before-load and replay checkpoints. Do not add broad real Kafka tests for this component. JS tests validate policy integration/provenance and preserve existing rate/count/byte controls. Cross-language estimate vectors shared in test data or repeated explicit finite vectors to prevent formula drift.

## Time budget and stop boundary

Implementation75m:10m RED tests/contracts;20m policy estimate/validation;20m Kotlin pure guard/capability;15m lifecycle/checkpoint wiring;10m focused Node/Kotlin + broker-free capability. Review/docs45m:20m fresh independent review;15m bounded corrections/rerun;10m owner checkpoint/evidence/retention. Parent schedules independent reviewer; researcher spawns none.

Stop/reduce if raw provenance runner integration or lifecycle extraction exceeds budget. Reduced coherent fallback: planner heap admission + broker-free observed capability + pure arithmetic controls, explicitly **runtime application incomplete**; no applied heap component closure. Do not apply tests-only draft or close guard gate without actual probe lifecycle wiring and replay regression. No rate arm permitted by this slice unless separate durable ACK/physical/calibration readiness also closes later.
