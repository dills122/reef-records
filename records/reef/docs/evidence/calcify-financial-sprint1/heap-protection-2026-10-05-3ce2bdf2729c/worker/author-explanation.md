# Author Explanation

## Intent And Success Criteria

M3H protects existing test-only rate harness from knowingly oversized heap workloads and observed sampled heap failures. Known retained estimate must fit strictly below floor(effective max×4/5); supported finite counts and conservative upper costs required. Missing legacy calibration averages cannot authorize real load. Runtime rechecks actual max/baseline/identities before setup and warm workload, then sampled guard remains through result-only replay and final staging/publication. Every failure stays sticky and prevents measurement/parity success publication. No claim of full E4 readiness, capacity or scientifically measured conservative costs.

## Plan-To-Implementation Traceability

Implemented finite BigInt/checked Long estimate, fixed80% refusal at equality, actual cap binding, baseline checks, before-load raw provenance verification, broker-free actual capability, dedicated sensor, actual lifecycle/replay/wait checkpoints, artifact suppression and exceptional sensor cleanup. Supported counts include timed+aged settled identities and separate pending capture cohort; baseline+transient+replay reserves additive. Disk-derived age reduction unchanged; heap overrun blocks instead of shrinking. Original1m proposal remains in aged policy diagnostics.

Raw conservative review artifact added at parent's explicit requirement: schema/verdict, raw bounds SHA, candidate/fixture/config/financial build/ordered classpath digest, finite support counts, derivation and scope must match separately hashed bytes. Review SHA lives outside bounds to avoid circular hashes. Raw fixture verification added so capability cannot simply echo claimed fixture hash. Ordered classpath byte digest added after parent agreed changed Kafka/Jackson dependencies can invalidate cost evidence. No dependency changes.

Excluded durable ACK recovery/physical collector/full calibration/native envelope/rate ladder remain excluded. No real bound artifact created. Synthetic pure fixtures and negative direct-child fixtures never measured/reviewed costs; local controls with deliberately forged Ready strings only test mechanical provenance and actual recheck refusal.

## Technical Approach And Flow

`preparePolicy` retains existing E3/calibration/disk/indexed-write/count gates and adds required heap schema; complete upper-cost formula checked exactly. Capability maximum and authorized cap fixed independently; larger actual/request maximum refuses. Estimates/supports/baseline/equality reject before freeze. Validation-only synthetic fixtures exercise pure policy tests; executable verification refuses their flag.

`runAdapter` verifies frozen policy hash then raw bound/capability/review/fixture bytes from owned policy directory (real paths, so escaping symlinks refuse). Real launcher pinned to installed Java21 executable, exact `-Xms128m -Xmx768m -cp ... FinancialRateProbe run ... config` structure; calibration equivalent structure. Option environment removes `JAVA_TOOL_OPTIONS`, `_JAVA_OPTIONS`, `JDK_JAVA_OPTIONS`, `CLASSPATH`. Broker-free capability subprocess gets same JVM/classpath/config, hashes actual fixture/config/class content and reports actual VM/max/used. Timeout15s→TERM→KILL after2s; output64KiB bounded, raw attempted command/exit/log retained. Fresh capability revalidates identity/max/baseline before load child. Main-load external process-tree supervision remains separate E4 gap.

Actual child repeats frozen policy hash (run), raw owned evidence, review scope, raw fixture/config, compiled financial build, ordered classpath content, VM version/vendor/arguments and finite arithmetic. `FinancialHeapGuard.start` samples actual `Runtime.maxMemory` and MXBean used before config application, state/client/topic setup. Lower actual max recomputes stricter limit; unauthorized larger max and later change refuse. Guard repeats warm baseline after streams startup and after producer construction before aging/pending/timed workload. Retained aged state is not mistaken for fixed warmed baseline.

Dedicated daemon heap sensor samples every250ms independently of physical sampler, stale age5s; main checkpoints also refresh at key boundaries. First sensor exception/invalid snapshot/staleness/max change/breach retained. Startup and source-capacity waits poll guard; flush uses actual `heapAwait` seam with25ms main checks, interruptible operation and bounded join. Normal producer close15s; heap-failed close zero-duration. Existing streams close remains15s; sensor active throughout worker close. Replay consumer poll and every record use actual shared `heapReplayBatch`; guards before/after owner digest/replay and final staging.

Both parity and measurement bytes stage in unique temporary files. Final sampled check runs while sensor active; sensor stops/joins, final failure check succeeds, then atomic moves publish parity and measurement. Failure deletes temporary files and any newly moved auxiliary parity if main publication fails. Early guard close refuses replay. Final post-publication lifecycle return checks sticky failure without falsely declaring dormant closed sensor stale.

## Changed-Component Walkthrough

`rate-proof.mjs`: heap contract/checked estimate; raw evidence and reviewed scope; frozen launcher and sanitized environment; actual pre-load capability capture; diagnostic assessor requires valid heap lifecycle observation. Existing counts/ACK/physical/latency semantics retained.

`rate-proof.test.mjs`: existing24 controls retained with explicit validation-only heap contract; missing/oversized RED cases plus numeric/equality/overflow/count/provenance/launcher/timeout/symlink/diagnostic guard controls.37 tests.

`FinancialHeapGuard.kt`: finite upper costs, strict integer JSON fields, checked estimate/limit; sampled sticky sensor; startup/warm baseline; bounded cleanup; staged two-artifact publication.

`FinancialRateProbe.kt`: actual capability and rechecked child evidence; shared real lifecycle/replay/flush seams and checkpoints; guard observations emitted. Existing real calibration `identityHeapBytes` remains average, never promoted to upper bound. Existing four LIMITED gaps and capacityQualification=false retained.

`FinancialHeapGuardTest.kt`:18 broker-free tests covering arithmetic/JSON/overflow/lower/higher max/equality, actual lifecycle setup/send refusal, sticky GC/error/staleness/max-change, independent sensor during physical stall, actual result-only replay after worker close, blocked flush interruption, premature close refusal, final staging failure and successful publication. Actual main missing heap policy test proves no state/client path reached.

## Decisions And Rejected Alternatives

No automatic heap shrink: easier to assess bounded rejection while preserving original aged proposal. No average×arbitrary-margin conversion: cannot prove conservative finite upper costs. No shared physical/heap sensor: slow broker admin calls would stop heap cadence. No external supervisor redesign: existing E4 ownership/gaps unchanged. No synchronous hot-path durable state changes; test-only periodic MXBean checks/flush waiting affect diagnostic measurement and candidate hashes explicitly.

Launcher remains intentionally session-local macOS path. Linux hosted unit tests use pure/fake sensors and refusal before launcher/client setup. Real execution elsewhere blocks until explicit new independently pinned launcher policy; arbitrary adapter fallback would weaken actual cap binding. Classpath digest includes ordered absolute entry paths, streamed file/jar hashes and sorted directory resources; relocation/order/content changes invalidate bound identity. Build digest covers all compiled Financial*.class, including nested/test classes. This is conservative scope coupling, not portable signed build attestation.

## Invariants And Boundary Conditions

No accepted E3 code modified; no production API/runtime path changes. Existing exact financial count/ACK definitions and current physical telemetry preserved. Native/client/RocksDB RSS unknown; heap fit alone never asserts total memory safety. Sudden allocation can outrun250ms samples or OOM before graceful refusal. Max observed peak is sampled, never continuous guarantee. Real load/calibration cannot run with absent/legacy/validation-only conservative evidence.

Raw review provenance establishes byte/scope agreement, not scientific truth or reviewer authentication. Independent owner review must justify supplied derivation and covered workload. No real conservative review exists here; fabricated finite controls cannot fill that gap. SourceHead in actual capability echoes supplied accepted baseline3ce2bdf metadata; dirty source hashes and actual compiled/classpath bytes separately frozen. Do not infer compiled candidate equals clean baseline.

## Verification Performed And Results

RED Node `red-node`:2/2 expected failures; missing/oversized legacy policies returned FROZEN. RED Kotlin `red-kotlin-authorized`:1 expected failure, missing actual lifecycle seam; actual XML retained. Initial `red-kotlin` sandbox cache-lock write failed before Gradle task; full receipt retained. First integrated Kotlin reflection check failed because internal method JVM name mangled; stronger direct behavior tests replaced it, not runtime-bug inference.

Final `final-focused-node`:37/37 exit0, zero failures/skips. Final `final-focused-kotlin`:18/18 exit0, zero failures/errors/skips; fresh actual XML. Five source hashes before/after identical, in `source-freeze.json`. `git diff --check` exit0. Parent broad checks and fresh independent verdict pending.

Actual `actual-heap-capability`:Java21 exit0, actual max805306368 bytes, used32795048 snapshot, exactly pinned flags. Raw fixture SHA fee7eead368d2ef2927aad1e53877907a4d74f9762b696d20f7e5575b1361e6d; config SHA f153d7e7ccdf2587573f0e4522f7ff0896d5007c015865b21db87fa295b58ad0; financial build9afe7aae2dc094089ff20d41450e5c6c7c06258a6dd57ac891175c784dadf67a; ordered classpath55b090d18ab3aacdb8beb7ff531e93b567f8134e3c148a591f3db2b970400834. Raw capability SHA997a5a029e61538bdda02af5aeef13ce97e1e2c3c2575763e19947b90b410145. Independent Python digest recompute matches; full compiled/classpath before/after inventory unchanged. No state directory created.

Actual `actual-child-baseline-refusal`:synthetic impossible1-byte baseline, intentionally forged stored used=0/Ready review, genuine other identities/max/VM args; direct actual child exits1 with `HEAP_BASELINE_BOUND_EXCEEDED stage=before-setup`. State dir, measurement and parity absent. This proves child runtime recheck despite frozen fake scalar evidence; no broker/client/topic step reached, no real costs inferred.

Receipt-scope correction kept separately: early sourceSha256 maps post-run only. Old `first-node-xml` copied stale unrelated Kotlin RED XML; preserved snapshot-only, never Kotlin GREEN. Final runner captures before/after source and copies XML only for executed Gradle tasks. Full commands/exits/timings/logs/XML/corrections in worker receipts; no historical rewrite.

## Risks, Tradeoffs, And Maintenance Costs

Two-language contract needs aligned fields/formula; explicit shared vector172 bytes tests both. New raw artifact/review requirements block all current real policies until valid evidence exists. Absolute launcher/classpath coupling requires explicit future portability work. JVM/build hash scans run before setup and can add transient allocation; baseline checks include actual observed usage. Dedicated sensor and flush task add diagnostic overhead; no throughput claim from tests.

Emitted `heapPeakBytes` and heapObservation snapshot are assembled before final result serialization/file writes. Guard still samples/refuses through staged writes and final publication, but final sampled peak is not retroactively injected into already assembled JSON. Treat exported peak scope as through result assembly; do not claim it measures serialization/write peak. Sudden allocation sampled gap and native/RSS remain open.

External main-load process-tree/resource supervision remains unimplemented. Heap sensor daemon close waits2s and fails publication if still alive; operations ignoring interruption can exceed intended graceful cleanup until their existing bounded client APIs complete. No no-leaked-broker-thread or process-tree guarantee from broker-free tests. Actual broker behavior, warm live startup, calibration sizes and high-age reserve adequacy remain unmeasured.

## Deviations, Deferrals, And Known Gaps

No scientific bound minted or real load authorized. Added exact raw review and classpath provenance within five owned files; no ownership expansion. Parent owns docs/CI/retention/commit/publication and fresh review. Focused Gradle created untracked `.kotlin/sessions/kotlin-compiler-10619347422125041406.salive`; reported separately, no cleanup outside worker five-file ownership. M3H not declared accepted before independent Ready. Total E4 readiness, ACK journal, physical collector/native bounds still open.

## Challenge Points For The Reviewer

Check actual main calls shared seams, before-client and warmed baseline order, sampled failure races through cleanup/replay/publication, two-artifact staging failure semantics, raw review/fixture/classpath exact scope and two-language formula. Inspect sourceHead metadata versus actual dirty build identity distinction. Check exported peak scope and unchanged ACK/count/physical LIMITED gaps. Reject any inferred capacity/readiness/conservative cost claim based only on synthetic controls or capability snapshot.

Use $independent-review in reviewer mode. This is review instance1 of3 for M3H author scope, with parent assigning session attempt/cycle identity. Work from Fresh Review Bootstrap first and record preliminary review before reading Author Explanation. Then verify explanation against repository, review implementation and plan, run proportionate non-mutating checks, and return evidence-backed verdict. Do not implement fixes, create further review instances, or split work into new workstreams.
