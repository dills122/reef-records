# M3H Attempt1 cycle1 independent review

Review instance: 1 of 3. Target: explicit working tree on codex/calcify-heap-protection, baseline/HEAD3ce2bdf2729c884b0efd77d0a56808a0a6eb7d96. Six frozen paths verified before/after. Blind pass completed and preliminary.md saved before worker/parent author packets. Source/docs read-only; only reviewer receipts/controls written. No commits, staging, Docker, broker load or additional agents.

## Findings

**P2 — Export peak scope in measurement instead of leaving final samples implicit.**

Evidence: FinancialRateProbe.kt:457–460 captures resources.heapPeakBytes and heapObservation before serializing and calling publish; FinancialHeapGuard.kt:147 and157 subsequently refresh heap during final-result and final-artifact-staged stages. Those samples update guard peak but supplied contents already exist. No emitted scope field explains cutoff; telemetry limitation names sampling/native/OOM caveats, not this omitted phase.

Failing scenario: final staged write raises sampled used heap from50 to700 while remaining below800 limit. Real compiled guard control published valid JSON heapPeakBytes50 while final guard telemetry reported700, three samples. Exact compile/run/output retained in peak-scope-control-corrected.json and PeakScopeControl.java. Initial control accidentally escaped JSON quotes; initial receipt/source preserved separately, corrected valid-JSON control reproduces same numeric mismatch.

Impact: exported peak understates guard's observed lifetime peak; consumers cannot distinguish result-assembly telemetry from final-stage protection. Breach suppression remains correct; this does not authorize capacity or unsafe load.

Smallest correction: emit explicit peak scope such as through-result-assembly for both peak fields, documenting final serialization/staging samples protect publication but are excluded from exported peak. Alternatively assemble final telemetry after final sample with a publication design preserving sticky failure. Add regression checking chosen scope/peak semantics. Bounded non-blocking follow-up for component acceptance; fix scope before using exported peak as complete lifecycle resource evidence.

No P0/P1 findings. No change requested to accepted E3 code or production runtime.

## Plan Review

Bounded plan coherently implemented. JS BigInt and Kotlin checked Long include baseline+(timed+aged)×identity+pending×pendingCost+transient+replay; finite support and unsafe numbers refuse, equality at80% refuses. Original aged1m proposal preserved; heap overrun blocks without new shrink policy. Legacy average identityHeapBytes cannot qualify required upper-bound fields.

Executable boundary checks raw owned bounds/capability/review/fixture bytes and hashes, exact candidate/config/build/ordered classpath identities and finite scope. Installed Java21, fixed128m/768m flags and sanitized option environment enforce independent cap. Broker-free capability occurs before load; actual child rechecks identities and initial actual baseline before state/client/topic setup. Warm baselines precede first aging/timed sends. Dedicated sensor starts before setup; remains active through workload, cleanup, owner digest and result-only replay, with sticky error/staleness/max/breach refusal. Shared real replay/flush/lifecycle seams are wired into main. Staged parity/measurement publication prevents success after failure and rolls back auxiliary parity if main move fails.

Peak reporting deviates from natural lifetime interpretation; author admits cutoff. Correction above makes scope explicit. Sensor closes after final staged sample before atomic moves, a sensible finite publication boundary; staged contents already allocated. This provides sampled protection, not continuous/OOM safety.

ACK/count/physical semantics unchanged in inspected diff; four LIMITED gaps and capacityQualification=false remain. No changes to production authority/API/schema, FinancialBrokerProbe, CommittedCut, PartitionCut or kernel/oracle. Full E4/capacity, durable ACK recovery, physical-byte qualification, native/RSS and supervisor work correctly excluded.

Current board says In progress, consistent with pending owner acceptance. Required checkpoint/handoff sync and exact-byte Records publication remain parent completion steps after verdict; this review does not certify them as executed.

## Author-Claim Reconciliation

| Claim | Evidence | Status / consequence |
| --- | --- | --- |
| Exact conservative finite estimate and lower/higher actual cap checks | Both implementations, explicit172/800 vectors,37 Node tests,18 Kotlin tests | Confirmed; arithmetic protects declared finite envelope |
| Raw reviewed scope and classpath/config/build binding | JS verifyHeapEvidence/pinnedHeapAdapter, Kotlin heapGuard/heapCapability; direct child mismatch controls | Confirmed mechanical scope/byte consistency; no scientific truth/authentication inferred |
| Actual Java21 capability805306368 bytes, pinned flags, fixture/config/build/CP identities | Worker original + parent after-broad comparison + reviewer actual JVM rerun | Confirmed; used heap32954088 reviewer snapshot varies normally |
| Child baseline recheck precedes setup even with forged stored used=0 | Worker actual child exit1/log; main source order; state/output absence | Confirmed, negative fixture only |
| Dedicated sensor through replay; sticky failure blocks publication | Main checkpoints and seams, fresh18-test XML, blocked wait/replay/staging controls | Confirmed within broker-free/seam scope |
| Every phase test proves actual main lifecycle | Phase-string loop calls shared wrapper, not live main phase runner | Narrower evidence; static wiring verified, live broker lifecycle unexecuted |
| Exported peak stops at assembly while later guard samples still protect writes | Source and reviewer50→700 control | Confirmed limitation; emitted scope missing, P2 above |
| TDD failures and mistakes preserved | RED Node2 failures, RED Kotlin1 fresh XML, reflection/environment and stale-XML correction | Confirmed observed failures; early snapshots post-run only |
| Final broad CI stable and passed | Parent exact command summaries/logs,437 before/after maps, six actual financial XML files | Confirmed63/63 and229/229; original sandbox228/229 failure retained |
| Current real policies remain blocked | Missing/validation-only evidence paths; no real scientific bounds/review produced | Confirmed for current supplied evidence; future cost acceptance remains independent owner gate |

Concern about forged review strings reduced to documented trust boundary: raw review requires owned exact bytes, bound SHA and matching finite derivation/scope. This proves consistency, not independent scientific judgment. Canonical acceptance supplies actual independent bound-owner review as external process; no signature requirement inferred. Synthetic Ready fixtures do not establish real costs.

## Verification Performed

- `node --test scripts/dev/calcify-financial/rate-proof.test.mjs`: actual exit0,37tests/37pass, no skips/failures. reviewer-node.log/exit.
- `env -u JAVA_TOOL_OPTIONS -u _JAVA_OPTIONS -u JDK_JAVA_OPTIONS -u CLASSPATH JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home services/platform-runtime/gradlew --no-daemon -p services/platform-runtime --offline test --tests com.reef.platform.calcify.financial.FinancialHeapGuardTest --console=plain`: initial sandbox cache-lock denial before task, exit1 preserved; same authorized command exit0,10tasks/4executed/6up-to-date. Actual test task executed; copied XML18tests/0failures/errors/skips, timestamp06:47:46.026Z. No parent Gradle overlapped.
- Pinned actual JVM heap-capability command retained exactly in capability-command.json; exit0, max805306368, flags/version/vendor/source metadata/fixture/config/build/classpath all match original raw capability. reviewer-capability.stdout/stderr/exit/comparison retained.
- Direct actual child controls forge internally self-consistent raw configSha256/buildSha256/classpathSha256 separately while retaining impossible1-byte baseline fallback. Each actual child exits1 with matching HEAP_IDENTITY_MISMATCH before setup; measurement/parity absent. Exact commands/results reviewer-child-identity-controls.json. No broker path reached.
- Real compiled guard final-peak control: javac and Java exit0; exported50 versus final700. Exact commands/output and source retained; synthetic values only.
- Independently parsed parent financial1 XML:63tests/0failures/errors/skips across6files; actual log10tasks/10executed. Parent financial1 and exact NodeCI node-ci2-authorized actual exits0;437source maps identical before/after. Node actual229/229. Original node-ci1 exit1,228pass/1mock HTTP127.0.0.1 listen EPERM failure retained. parent-receipt-verification.json records commands/counts/maps.
- Actual RED receipts inspected: Node2/2 expected FROZEN-versus-BLOCKED failures; Kotlin1test/1failure fresh06:10:59.868Z XML. No stale Node-copied XML counted as Kotlin success.
- `git diff --check`: exit0. Branch/base/status verified; tracked four changed files plus two new guard sources, no unrelated source edits. Generated .kotlin marker absent at final status; no manual deletion by reviewer.
- Graph ready generation06:41:13UTC; Kotlin exact paths metadata_match; scripts/docs excluded and read directly. Narrow graph symbol query empty, source fallback used; no exhaustive graph claim.

## Open Questions And Residual Risks

Live startup/warm producer heap, broker cleanup behavior, full load and cost/reserve scientific adequacy unmeasured. Main setup Admin futures and producer.send retain Kafka blocking/timeouts; guard detects independently, but refusal propagates when call returns. heapAwait specifically covers flush and main waits now poll. No immediate abort/process-tree/no-leaked-broker-thread claim accepted; full supervisor remains deferred.

Phase-string tests alone cannot detect removal of particular main checkpoints. Static review confirms current wiring; actual shared replay/wait controls are stronger. Add targeted orchestration sensitivity when live harness evolves, without expanding this component into broker qualification.

Classpath identity includes absolute paths and all financial test classes; rebuild/relocation/changed dependency/resource bytes invalidate cost evidence. SourceHead echoes supplied accepted baseline metadata; dirty source hashes plus actual compiled byte digests bind candidate separately. No clean-baseline compilation claim.

Current synthetic cost data never establishes conservative bound. Before future real load, independent owner must approve derivation/finite coverage/reserves against exact raw bound artifact, plus separately close remaining E4 prerequisites. Sampling can miss sudden allocation; native/RSS unbounded; OOM guarantee excluded.

## Verdict

**Ready with non-blocking follow-ups**, for bounded applied heap admission/runtime-protection component only. P2 exported-peak scope needs explicit correction before peak evidence is treated as complete lifecycle telemetry. Current real policies remain blocked; no full E4/capacity or scientific bound acceptance.

## Recommended Next Actions

Parent respond to P2 with Accept, Dispute with evidence, or Defer with owner/rationale. Prefer small explicit emitted-scope correction. If source behavior materially changes, fresh cycle2 review required, retaining cycle1 and max3cycle limit. Parent finish owner/evidence/handoff and unique Records publication before delivery; acceptance/publication receipts remain outside this review's completed claims.
