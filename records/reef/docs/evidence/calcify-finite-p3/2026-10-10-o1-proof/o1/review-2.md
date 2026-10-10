# Combined O1 independent engineering review

Review instance: 2 of 3. Combined56-path delivery unit; no component verdicts. Neutral bootstrap first; blind preliminary ledger recorded before combined/component author explanations and review1 report. Fresh reviewer context had scope/test pointers, no author rationale.

## Findings

### P2 — Certified replay restores invalid or duplicate physical member IDs

Evidence: `services/platform-runtime/src/main/kotlin/com/reef/platform/calcify/FiniteLifecycleCaptureProcessor.kt:150–154`, `FiniteLifecycleReducer.validateCertifiedHistory`, replay branch. `FiniteLifecycleCaptureRuntime.initializeModel` and subsequent `reduce` both rely on this validator.

Trigger: Reduce actual12-record Go fixture; append identical multi-fill batch at offset12. Alter only new physical replay trade member ID: COMMAND or UNSPECIFIED kind, within-outcome ordinal99, flattened ordinal99, outcome ordinal99, wrong command ID, or exact ID of replay command member. Keep `replay_of` and original economic facts unchanged. Recompute envelope content digest and exact capture-byte counter. First batch certificate remains original and valid. All seven separate altered checkpoints accepted by `initializeModel`; subsequent offset13 source reduction also succeeds and emits `prefix_closed=true`, preserving invalid history. Valid prefix/replay controls accepted.

Cause: Replay comparison clears command/outcome source fields for lane check, then replaces entire replay member ID with original ID before equality. This discards kind, ordinals, command identity and duplicate-ID differences. New physical replay ID never compared with deterministic ID fresh reducer constructs from original member plus new physical source.

Impact: Certified restore accepts impossible structured member identities, including two members sharing one physical ID. O0 exact member identity/ordinal and changed-history refusal guarantees fail within O1 model. Correct trade/result semantic gates do not cover replay branch. Live refusal limits operational exposure; O1 restore criterion still unmet.

Smallest correction: Construct expected replay ID from original member ID with new source coordinates and original outcome ordinal/command ID, then require exact equality before normalization. Retain original fact/replay-of equality. Add isolated mutations above with recomputed digest/counters; assert restore and subsequent reduce refuse without mutation. Valid identical replay still closes and leaves orders/fills unchanged. Local correction; no architecture pivot or scope split needed.

## Plan Review

Source-prefix plan sound within O1 scope: every full source record handled, valid empty record closes, submit/amend/cancel zero-trade outcomes retained, immutable acceptance distinct from current revision/effect, complete trade/execution pairs and prior dependencies, conservation/current-limit/terminal checks, legal numeric offset gaps, physical no-op replay and certified batch replay. Finite logical/count/serialized guards and raw bounded fault suffix keep successful cut separate from retained fault input. Whole-record validation precedes output/store; state re-read removes ahead-of-store decoded cache. Tests cover meaningful malformed, replay, caps, rollback and reopen behavior.

Review1 P1 nested result/trade restore gap and P2 trailing-JSON gap corrected in five frozen paths; Go/proto/generated/source fixture scope unchanged. Shared acceptance/result/trade/order transition checks fit existing architecture. Replay ID finding above prevents complete O1 restore acceptance.

O2 durable registration, canonical ingress/accounting, writer/auth isolation, actual topic/history correspondence, full-state broker/changelog/request/fetch fit and process-restart qualification remain open. Go StartRunner/RestoreCommitted and Kotlin run refuse live activation. No missing O2 proof relabeled O1 defect. O3–O5 remain dependent on accepted predecessors.

Operational plan clarification retains review cap, failure evidence, bounded research and heavy-pivot human gate. User-authorized O1 continuation supersedes old overnight deadline for this pass; stale deadline text in author packet grants no acceptance waiver. No O2 started.

Owner contracts, source fixtures and README updated. Current new evidence remains active; component retention no-op reasonable. Manager owns final owner-board/guidance/retention publication and final PR range verification; review does not complete that delivery pass. Parent reports upstream infra-only dependency bump, outside frozen56 paths; review remains against explicit base45211653 target, no merge/rebase.

## Author-Claim Reconciliation

| Author claim | Evidence inspected | Status / consequence |
| --- | --- | --- |
| Optional typed attempt source fact preserves mode-off bytes and P0 identity | Go producer/config/domain diff, omitempty, accessor, current Go tests, legacy16647-byte fixture and original receipt | Confirmed in scoped source/test evidence. No SQL/book scan or matching algorithm change. |
| Actual Go fixture closes12 outcomes/15 members;8 applied/4 rejected/3 trades/6 units/5 orders | Current fixture/manifest, ProcessOnce tests, independent focused Go and31 Kotlin tests | Confirmed. Model identity parameterization explicit. |
| Fresh and restored result/trade/order semantics shared | Current shared validators/transitions, focused mutation tests, independent five restored semantic probes | Confirmed for original defects and tested cases; replay ID bypass remains separate P2. |
| Replay schema/ordinal semantics retained | Replay validator, independent seven changed-ID probes | Contradicted for new physical replay member IDs; P2. Original facts/replay-of equality and coverage counts do check. |
| Source value requires one object plus optional whitespace | Current strict mapper, independent seven trailing root/scalar/garbage cases, managed suffix/frontier assertions | Confirmed; original review1 P2 corrected. |
| Rejected Submit attempted acceptedOrder metadata never becomes immutable acceptance | Go acceptedOrderFact emits legacy attempt metadata; rejected fixture index9, parser/reducer path and rejected-economics tests | Confirmed. Blind concern about mere rejected acceptedOrder presence closed; no finding for intentional legacy attempt evidence. |
| Final213 Calcify tests green on frozen correction; no broad rerun needed | Retained final JSON30-report totals independently summed, final regression log,43 compiled hashes; fresh focused31 tests | Confirmed as author receipt, not independent213-test rerun. Full log1h07m35s; no timing qualification inferred. |
| Go full/race/vet and additive/generated governance passed | Go verification commands/raw log hashes all match; governance log; review1/review2 manifests show proto/generated unchanged | Confirmed retained receipts. Independent execution limited to focused Go packages; no regeneration/race/vet rerun claimed. |
| Logical encoded cap6307840 and exact boundary probe; physical fit deferred | Budget/state guards, focused cap tests, retained StateCapProbe source/argv/log, explicit model property caveat | Confirmed guard/evidence scope; boundary probe not independently rerun. Maximum valid producer fit/RSS/native/broker cost unqualified. |
| No live activation or financial authority change | Current Go/Kotlin gates, bounded model topology and lack of production capture wiring | Confirmed. |

## Verification Performed

- Read neutral bootstrap, installed independent-review/codebase-memory skills, applicable AGENTS, AI_CONTEXT/docs map, canonical O0/O1/O2 plan, task-relevant steering/delivery/retention, current source/tests. Preliminary ledger at `review-2-preliminary.md` preceded author explanations and prior reviewer report.
- HEAD/base `45211653d2f5b59dd25f4a4db42883881b4d6eb1`; branch `codex/calcify-p3-overnight-2026-10-09`. All56 SHA256 paths match before/after review. Accepted O0 SHA256 matches `eec721aa60c1b64a7bada0a973b7b5d4e77510454e9e853fcd8a6a6f8f7c6739`. Dirty/untracked implementation and manager docs/planning visible, none hidden or overwritten. Review1 path set identical; only five declared correction paths differ.
- Graph project/index/search/coverage: reef-main generation2026-09-30T21:14:17Z, different checkout; finite symbols absent/new paths missing. Current-source fallback for material claims. Serena initial instructions read; active LSP Svelte only. No exhaustive graph inference.
- `GOCACHE=/private/tmp/reef-o1-review2-gocache go test ./internal/app ./internal/streamdirect`, matching-engine cwd: exit0, both packages green. Shell startup emitted unrelated `(eval):5: parse error near end` separately; test subprocess/log green.
- `JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home ./services/platform-runtime/gradlew --no-daemon -p services/platform-runtime test --tests 'com.reef.platform.calcify.FiniteLifecycle*'`: first sandbox exit1 on existing wrapper `.zip.lck` permission; authorized serial retry exit0,15s,31 tests/0failures/0errors/0skips. Exclusive lease released. Failure log retained.
- Reviewer Java21 source-mode `Review2Probe.java`, `-Xmx192m`, exact recorded classpath/argv, platform-runtime cwd: exit0. Seven invalid replay-ID variants accepted and next reduction closes; valid controls accepted; five original semantic variations refuse, including out-of-cap price with internally consistent execution pair. Seven trailing JSON suffixes refuse in parser and reducer. Legal whitespace closes with exact original byte count/hash. Managed topology test assertions executed for bounded exact fault bytes/no output/no successful cut/order/execution/counter changes.
- All43 recorded compiled-class hashes match after focused build/probes. Scope source56 paths unchanged. Probe final source/commands/logs retained; first probe source restored to `Review2Probe-initial.java` with matching original hash, first log kept separately.
- `git diff --check` exit0. Go author raw receipt log hashes all match. Final full author JSON sum213/0failure/0error/0skip,4048.535 aggregate seconds. No full regression, race/vet, proto regeneration, broker/container or live checks rerun.
- One mixed source-read request blocked by PreToolUse counter; smaller bounded read/hash check succeeded after reset. Exact probe commands, source/log hashes, successful/failing test logs and result totals in `review-2-verification.json`, `review-2-probe-final-command.json`, `review-2-focused-results.json`.

## Open Questions And Residual Risks

No scope ambiguity or heavy pivot. Serialized receipts establish internal consistency only; O2 must verify original durable source correspondence and activation. Model producer request cap131072+1024 smaller than allowed full state6307840; explicitly deferred live changelog/request/fetch/topic resource fit must precede activation. Logical caps prove bounded refusal, not every maximum permitted producer/fanout shape fits or physical memory fits. Final manager retention/delivery remains separate.

## Verdict

Not ready.

## Recommended Next Actions

Manager reconcile P2 with owner; bounded replay-ID equality fix and recomputed-digest negative tests. Rerun affected focused checks, freeze combined candidate, then use remaining fresh review instance3of3 if changes material. Preserve prior evidence/counter; no new review dispatched here. O2 remains gated on accepted O1. Heavy pivot or exhausted review cap requires human decision per accepted workflow.
