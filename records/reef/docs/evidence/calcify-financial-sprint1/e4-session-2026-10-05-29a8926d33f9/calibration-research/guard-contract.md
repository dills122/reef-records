# Root implementation contract — finite bootstrap

October5,2026. Root selected narrow guard refactor; researcher proposes following acceptance. No source implementation here.

## Frozen request

Separate schema `financial-calibration-bootstrap-v1`; CLI mode `bootstrap-calibrate`; authorization token `--authorize-calibration-bootstrap`. Existing `calibrate` and `run` reject missing conservative evidence exactly as before. Manifest includes:

- `purpose: EMPIRICAL_BOUNDED_DIAGNOSTIC`, `capacityQualification:false`, `heapConservativeBound:false`, `estimatedHeapBytes:null`.
- `sampleTrades:1000`, `pendingSample:100`, `agedIdentities:0`, `sourceActions:2100`, `historyRecords:2101`, one namespace/domain, source partition0/RF3/minISR2, exact policies/generator. Values immutable maxima and expected counts; smaller/larger cohort requires new frozen manifest, no runtime shrinking.
- Actual source/build/config/fixture/orderedCP and raw review/request hashes; exact executable/JDK/version/vendor/VM flag identity; input/results topic IDs and finite topic registry bound after creation; fresh local store directory. Pin arbitrary source payload to generator bytes, reject external input/config content not in identity.
- `sourceRecordMaxBytes:1024`, `unsignedHistoryMaxBytes:65536`, `historyChangesMax:64`, `checksummedHistoryMaxBytes:65614`; derive explicit result wrapper cap with bound for first two-record result, decimal offsets/ordinals/topic UUID. Wrapper cap must cover final checksum fields. Prefer tight derived cap, not incorrectly reuse64KiB.
- Explicit producer/Streams producer batch+buffer+request+compression+in-flight limits; main/restore/observer/Streams consumer fetch+partition-fetch+poll limits; topic max.message.bytes and Streams buffered-records limit. Validate effective configs, not only requested JSON. Source1KiB and first-batch oversized exception bounded by same topic/client maximum.
- Owned raw-file cap256MiB includes source journal, raw encoded records, logs and new receipts unless distinct fixed scope justified before execution. Bound callback/error/log counts/output chunks. Reject heap dump/JFR size that bypasses cap.
- Wall deadline and process group cleanup, strict heap threshold, cadence<=250ms/freshness<5s; disk abort9GiB/hard10GiB/guest-free20GiB, exact owned mounts/broker IDs/replica inventory/raw metric receipts. Track total and delta explicitly.
- Optional `preloadOperationalCeilingBytes` is frozen stop policy, never baseline upper evidence. It must be below strict limit and checked after client warm. Choosing it is resource-budget decision; cannot derive scientific baseline upper from observed max. No arbitrary value labelled conservative.

## Private guard profile

Existing public constructor continues taking FinancialHeapBounds and enforcing unchanged conservative preflight estimate/baseline checks. Internal profile sealed/private to prevent public caller opting out:

| Profile | Preflight | Runtime |
| --- | --- | --- |
| Conservative | Existing reviewed estimate/count support/raw hashes, actual max and baseline checks | Existing sticky sampled80% lifecycle |
| Diagnostic1000x100 | Exact bootstrap manifest/review/identity/count/payload/config checks; actual max and operational preload stop | Same sticky sampled80% lifecycle, zero adaptive escalation |

Diagnostic profile does not instantiate FinancialHeapBounds. No placeholder positive cost fields. `estimatedHeapBytes:null` in new `financial-bootstrap-heap-observation-v1`; separate publisher/output assessor rejects schema as conservative evidence. Keep `heapArtifactSnapshot` ordinary-run expectations intact or use explicit mode-aware snapshot; no shared result field quietly changes meaning.

Actual `Runtime.maxMemory()` must remain <=768MiB and stable, normally exactly805,306,368 bytes under pinned Java. Limit=min(authorized,capability,actual)*4/5 checked integer floor; equality rejects. Dedicated heap thread starts before setup and survives managed restart/result-only replay/final serialization. Stale/sensor error/breach sticky. Instrumentation JVM pauses count toward freshness; do not pause guard to accommodate histogram. Every worker/client/restore and publisher phase checks same guard. Final guard close/last check precede success publication, cleanup failure invalidates success-like output.

Diagnostic samples may OOM before graceful threshold detection; fixed JVM limit and external owned-group supervisor retain hard containment. That is explicitly accepted bounded empirical diagnostic risk, not proof all allocations fit80%. Guard contract cannot manufacture upper envelope it does not possess.

## Executable sequence

1. After ACK/physical source merge, focus compile/tests and freeze actual source/build/CP/config/fixture manifest. Broker-free capability on same launcher/environment confirms identity/max.
2. Root independent reviewer checks finite manifest and profile separation. Standard unsupported conservative policy control still blocks before topics; diagnostic test counts/buffer/output limits fail closed.
3. Under shared lock, exact owned broker preflight/resource monitor starts before admin/client setup. New unique test-owned input/results/state objects;3broker registry/UUIDs pinned.
4. Warm clients with no workload; actual heap observations/operational baseline checks recorded. Start1000timed CAPTURE/SETTLE pairs, finite producer/observer timing and exact journal source membership. Drain every action, full semantic/reference/journal parity; raw sample no sustained capacity label.
5. Send100pending CAPTURE-only cohort. Drain, retain pending state and measure scoped delta. Timed final counts remain1000 settled and pending0; separate pending cohort100. Opening resources1100shares/11,000,000,000cashnanos.
6. Managed restart/reopen same bounded store+source journal under active resource guard: kernel activation reads full finite coverage/history/state and recovered journal prefix; source UUID/partition/ordinal/hash facts exact, old controller notification timestamps unknown. No regenerated callbacks and no new economic actions. Record actual read_committed cut, complete owner/history/source proof; this proves different path from result-only replay.
7. Close worker/observer/client, bounded result-only replay same2100source actions/2101histories; reconstructed owner/history matches including100pending. Final staged output publication only after all parity/resource/process checks.
8. Raw independent review issues empirical-only or failure. Model owner independently reviews conditional rejection proof. Standard calibration/run stay blocked absent genuine upper costs. If minimum150k arm lower bound exceeds cap, preserve reviewed refusal, choose aligned retained-state design next.

Order6/7 may require extra seam/harness ownership; do not claim managed restart if only controller journal reopen or result replay performed. Diagnostic result exposes `managedRestartVerified` and `resultOnlyReplayVerified` independently, exact evidence paths/hashes mandatory when true. Root decides run readiness only after all critical owners integrated.

## Non-negotiable failure boundaries

No external fixture may set conservative verdict. No bootstrap result may authorize conventional rate arms. No rate/age auto-expansion. No increased heap. No deadline credit from recovered old ACK or late drain. No source-membership future SETTLE gate imposed on CAPTURE. No unbounded owner snapshots/arrays retained in artifact. No CPU/RSS/native capacity claim from Javaheap/disk fields. No missing physical component zeroed. Any guard/supervisor/parity/journal corruption/error preserves failed attempt and prohibits passing publication.
