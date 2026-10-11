# Kotlin OCR finding alignment spike

Pinned source: `dcb106c4ddd5ccda60df7c8e6411fca88ef5be14`; inspected tracked source equals HEAD, tracked diff empty. Target: three Kotlin comments in `ocr-hosted-comments-observed-v2.json` from hosted full review result. Research only; no product, Git, provider or review-cap changes. No independent engineering review/verdict.

| OCR comment | Disposition | Evidence | Smallest fix |
| --- | --- | --- | --- |
| 4238498605: null source record allegedly mishandled rather than retained/skipped | False-positive against accepted O1 policy | Existing catch retains null-as-empty at exact offset, faults lane, leaves successful frontier unchanged; targeted topology probe confirms | None required; explicit null branch could improve reason text, but suggested branch duplicates current retain behavior |
| 4238498608: restore allegedly omits suffix history guard/state validation | False-positive | Existing requiredEnd includes maximum retained suffix resume offset; unconditional validateState executes before return; existing and probe undercoverage/invalid-state cases reject | None; suggested added validation duplicates line30 |
| 4238498613: sorted parties allegedly erase side assignment | False-positive | Each sorted mapping serializes side byte; reorder equal, side swap produces different canonical bytes/hash; golden remains exact | None; suggested parties iteration would violate frozen canonical ordering |

## Null source policy and actual behavior

[Comment](https://github.com/dills122/reef/pull/485#discussion_r4238498605) has conditional premise: “If this topic can carry tombstones”. Accepted source-prefix contract requires every committed source batch and faults unknown/unsupported coverage (`docs/work/CALCIFY_FINITE_P3_SOURCE_CONTRACT.md:21-26,38-39,76-78,293-297`). Valid source value must contain one JSON object (`FiniteLifecycleContract.kt:113-117`). Go producer serializes complete `VenueEventBatch` with `json.Marshal`, supplies `sarama.ByteEncoder(payload)`, never emits null in this path (`services/matching-engine/internal/streamdirect/kafka.go:548-567`). Existing canonical-source reader separately rejects tombstones (`BrokerVenueSourceReader.kt:48-54`). Null record has no contract permitting deletion/no-op coverage.

`FiniteLifecycleCaptureProcessor.kt:301-305` coerces null value to empty bytes, attempts reduction, catches parser's `IllegalArgumentException`, then calls `retain`. `retain` (`310-320`) stores suffix offset/payload/resume, validates complete state and blocks lane. It does not emit capture or change successful `resumeOffset`/completed frontier. Existing fault path also retains subsequent records; overflow aborts rather than certifying dropped input. Claimed uncaught failure/silent recoverable-no-op mishandling does not occur.

Probe: null atoffset0 retained with suffix resume1, payload size0, nonempty fault `invalid/duplicate/trailing source JSON`, successful resume0, completed count0, no completed frontier, no output, block callbacktrue. Subsequent valid record atoffset1 retained byte-exactly; successful prefix remains0. These are managed topology assertions, not broker transaction/restart proof.

Narrow limitation: `FiniteLifecycleSuffixV1` stores bytes, offset and resume (`contracts/proto/calcify.proto:197`); null value and non-null empty value share empty retained payload representation. Neither is valid canonical source. Original broker history remains canonical; O2 owns writer isolation, durable activation and required-history verification (`source contract:193-209,305-311,319-320`; runtime live entrypoint refuses at51-53). Suggested null branch also stores empty bytes and does not add physical null evidence. No newly discovered O1 correctness gap inferred from this representational detail.

## Restore guard and validation

[Comment](https://github.com/dills122/reef/pull/485#discussion_r4238498608) overlooks existing control flow. `FiniteLifecycleCaptureRuntime.kt:24` rejects managed/checkpoint mismatch. Line25 computes max of checkpoint successful resume and **all retained suffix resume offsets**. Line26 requires available source beginning cover genesis and end cover thatmax. Lines30-31 unconditionally validate resulting state before returning.

`FiniteLifecycleReducer.validateState` checks binding/version, count/byte budgets, uniqueness, suffix barrier/order/positions/bytes and successful prefix, then reconstructs certified history (`FiniteLifecycleCaptureProcessor.kt:96-124`). Existing `FiniteLifecycleCaptureRuntimeTest.kt:89-101` already constructs suffix offset12/resume13, restores exactly with availableEnd13, rejects availableEnd12 and rejects reduction while faulted. Other existing tests reject changed binding/history/version (`64-75`).

Probe: state with successful resume12 and retained suffix resume13 restores byte-equivalent with availableEnd13. availableEnd12 rejects `required source history unavailable`; clearing fault rejects `pending fault suffix lacks lane barrier`; clearing version rejects `state binding/version mismatch`. No missing guard proven; suggestion repeats current requiredEnd and adds redundant validation insidebranch.

## Canonical ordering versus side swap

[Comment](https://github.com/dills122/reef/pull/485#discussion_r4238498613) conflates list order with mapping side assignment. `FiniteLifecycleContract.kt:45-50` sorts by participant/account, then serializes each participant/account **and its own side byte**, BUY1/SELL2. Binding requires exactly one buyer and seller (`73-75`); identity includes canonical budget bytes (`81-91`). Frozen plan explicitly requires sorted mappings **plus side byte** (`source contract:211-220`). Changing iteration to unsorted parties would break specified canonicalization.

Existing `FiniteLifecycleContractTest.kt:90-100` asserts reversed mapping list yields equal bytes, pins260-byte golden hex and hash. Targeted probe computes actual production Kotlin canonical bytes, compares golden file, reverses list, then keeps same participant/accounts while exchanging BUY/SELL:

| Input | SHA256 |
| --- | --- |
| Original | `6d49b6dd66e9cfa099e7b1c3cd02c9c275a9bf401d92069aace9634b5b4feee3` |
| Reordered mappings | `6d49b6dd66e9cfa099e7b1c3cd02c9c275a9bf401d92069aace9634b5b4feee3` |
| Swapped side assignments | `b931a7df9e03444d868b4c9821856537240188d5b0c266015c3d7df6a9044ecf` |

Reorder invariance intentional; opposite assignment distinguishable. Source-fact Go/Kotlin golden parity test exists at `FiniteLifecycleContractTest.kt:38-55`; probe reruns budget golden method, not full cross-language suite. No fresh cross-language test claim.

## Commands, provenance and limits

Exact Java21 command and full classpath: [probe-command.json](probe-command.json). Command invokes source launcher with `-Xmx192m`, existing cached production/test classes and dependencies, working directory `services/platform-runtime`. Source [OcrKotlinProbe.java](OcrKotlinProbe.java); output [probe.log](probe.log). Exit0; `ALL_PROBE_ASSERTIONS=PASS`. Three existing test methods directly rerun: `finiteBudgetCanonicalBytesAndDigestPinned`, `restoreRefusesMissingMemberAndRetainsExactFaultBarrierAndSuffix`, `managedTopologyEmitsSameEnvelopesAndRetainsFaultSuffix`; allPASS. No Gradle build, broker or product test changes. [source-scope.json](source-scope.json) records source/class hashes and mtimes; cached classes postdate corresponding source and behavior agrees with inspected current source. Fresh compilation not performed.

Cached-bytecode check exported `javap -c -p` for budget, runtime, processor and reducer, all exit0; [bytecode-commands.json](bytecode-commands.json) records exact commands and class/output hashes. Runtime bytecode calls reducer validateState before return; budget bytecode writes per-party side byte; processor bytecode invokes reduce, catches IllegalArgumentException and invokes retain. These narrow binary paths agree with pinned current source. Cached class provenance is recorded explicitly; no claim that a new compiler run occurred.

Initial command composition retained prior launcher source argument and therefore ran existing `Review2ResearchProbe.java`, not new probe. Exit0; preserved [probe-attempt1-command.json](probe-attempt1-command.json) and [probe-attempt1.log](probe-attempt1.log). No target conclusions use this run. Corrected command removes old source argument; canonical/null/restore assertions above derive only from corrected run.

Existing XML at15:39UTC: Contract5, Processor19, Runtime12 tests, zero failures/errors/skips. These prior suite results provide context only; findings closed through source/contract alignment and narrow reproduced cases.

Graph-first check: installed codebase-memory skill used; project `reef` ready but indexed root `/Users/dsteele/.codex/worktrees/8576/reef`, generation2026-09-28T02:46:53Z. Search `.*FiniteLifecycle.*` returned0; coverage for six exact current source/test files reported freshnessmissing. Supplementary coverage for canonical reader, producer files and proto also missing. Current-source read/grep fallback covers cited paths; no graph absence/completeness inference and no index mutation.

No product changes; retention pass no-op. Active research retained under authorized planning directory for parent triage. No Ready verdict, O2 dispatch, cap reset or additional reviewer.
