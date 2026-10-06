# Independent Review — Fixed8GiB Empirical Resource Permission

Review instance: 4 of 4. Prior1–3 preserved. Explicit human extension in `../../review4-authorization.json`; configured cap exhausted after this instance. No further instance dispatched or recommended.

## Findings

No actionable findings. Ten-path implementation reviewed from neutral bootstrap; preliminary ledger persisted before author explanation. Source read-only; artifacts written only beneath `reviews/policy4/`.

Frozen target: base/head `863503ec23c27f33ecea14fd82724fe28f96d308`, branch `codex/calcify-sprint1-exit-2026-10-06`, working-tree patch SHA256 `da8ad0e573c9d4a17a4da81c425401b08a34f4d3c04b8f301ec4061c1564117b`. Ten live hashes match `policy-author/after.json`; complete manifest in [target check](target-check.json). Scope includes entire empirical implementation, not merely8GiB delta. Parent-owned dirty docs/untracked planning/evidence/generated build excluded from code target, acknowledged explicitly.

## Plan Review

Canonical RFC E4 useful-rate/storage question and explicit larger-resource direction permit finite empirical experiment while conservative qualification remains blocked. Named `financial-empirical-heap8-disk16-v1` implements exact8GiB JVM/16GiB disk permission without changing Financial Kernel/BrokerProbe/Reference algorithms. Prior49-arm correctness is compatibility evidence for unchanged kernel/managed adapter only; new build/config/heap do not inherit new timed-cohort recovery qualification.

Plan-to-code evidence:

- `rate-proof.mjs:41–80`: ordinary768MiB remains fixed; unnamed/old disk16 diagnostic stays4GiB; new name alone selects exact `-Xmx8g`/8589934592B. Freeze rejects custom profiles, alternate flags/max, conservative/capacity promotion, changed arm and kernel/adapter mismatch. Fixed150000 trades,60 seconds,fresh,2GiB journal and finite exact prefunding retained.
- `rate-proof.mjs:82–168`: owned raw capability/correctness/fixture evidence checked, config/source hashes checked, second actual JVM capability capture checked before supervised payload, all capacity entry points retain shared exclusive lock. Assessment fails invalid schema/provenance and wrong profile heap, checks complete300000 actions/300001 histories and cannot grant capacity; deadline counts and final drain remain separate.
- `rate-supervision.mjs:34–95`, `proof-supervisor.mjs:13–40,163–210`: exact new/old flags selected by named profile, supervisor/policy digest and hard ceiling agree, three owned paths/actual broker registration remain required; ordinary/bootstrap/fault/custom caller cannot borrow new allocation permission.14GiB abort/16GiB hard apply only named diagnostic; generic9/10GiB,20GiB free floor,256MiB raw cap and five-second resource cadence retained.
- `FinancialHeapGuard.kt:83–90,132–157,169–205,208–231`: explicit authorized max must be4or8GiB and equal actual sensor maximum; exact80% threshold,250ms heap sampling,<5s freshness, sticky breach and atomic publication retained. Conservative bound calculation unchanged.
- `FinancialRateProbe.kt:248–302,695–756,785–819,849–888,938–991`: frozen policy/raw capability/source/config checks, exact flags/max, finite genesis funding, durable journal membership before worker execution, full owner/history parity and complete committed result-only replay remain. Diagnostic reports sampled heap permission and `managedRestartVerified=false`; separate bootstrap restart only runs in bootstrap mode.

Parent owns actual rig freeze/load, outcome analysis, docs and Records completion. Current active docs retain pre-authorization wording; parent must promote authorization/outcome during already-authorized delivery pass. No API/event/storage/production financial behavior changes in this target, hence no contract migration required.

## Author-Claim Reconciliation

Author packet read only after [preliminary ledger](preliminary.md). Packet SHA256 `dc18f05571c994e521701d0acfbab9d6510a595fd8191630b9719c234fbe951f`.

| Author claim | Evidence inspected | Status | Review consequence |
| --- | --- | --- | --- |
| Optional8GiB fixed selection; old4/768 behavior retained | JS launcher/profile checks, Kotlin max selection/guard, new positive/negative tests; entire diff | Confirmed | Resource selection compatible and finite |
| Same150000/60s/fresh/2GiB journal/14–16GiB disk/floors and ownership | JS freeze, Kotlin rehashed-policy checks, supervisor validation/sample; unchanged work/replay loops | Confirmed | No expanded workload or admission bypass |
| No financial algorithm/reference optimization | Entire ten-path diff; `FinancialRateProbe.Reference` unchanged; Kernel and BrokerProbe SHA equal HEAD and arm4 compatibility binding | Confirmed | Reuses unchanged-source correctness only |
| No new managed restart, upper bound or capacity claim | Bootstrap-only recovery branch; diagnostic output/assessment; empirical heap telemetry | Confirmed | Ready scope remains empirical permission |
| Node102 PASS and Kotlin focused successful | Reviewer rerun102/102; retained three JUnit suites total43/43 and BUILD SUCCESSFUL log | Confirmed | Proportionate verification supports implementation readiness |
| Prior cap3 reached; human extension required | Neutral bootstrap and root-recorded human extension to4; prior packets retained | Confirmed, later authorization supersedes historical pending text | This is4of4; no count reset |
| Fresh concrete capability/config/source freeze parent-owned | No next-run concrete frozen envelope yet supplied to reviewer | Unverified for actual next run | Implementation Ready does not certify an unseen rig |

`FinancialKernel.kt` current/base/arm4 SHA256 `9f76e87940d7600dac11bb26aba9ad40e39e7fbf41ec28dc8ab990790f0e637e`; `FinancialBrokerProbe.kt` current/base/arm4 SHA256 `6f7d89934d01a79e54b68ced230adc2d341076573cdd7fa0ca36408b767ae778`. Retained prior49 proof scoped explicitly to core24/golden20/external4/activation1, archive commit `87242fe0415a80a9934846686cd41fc8c08cad6c`. No requalification inferred.

## Verification Performed

Executed reviewer command:

`node --test scripts/dev/calcify-financial/rate-proof.test.mjs scripts/dev/calcify-financial/rate-supervision.test.mjs scripts/dev/calcify-financial/proof-supervisor.test.mjs`

Exit0;102 tests,102 pass,0 fail/cancel/skip/todo. [Focused log](node-focused.log), SHA256 `2e05a0ba474ea3d3c58a507cfc566449f26198b203f2a16d572ee3667adeb630`. Initial attempted redirection failed before command started because reviewer artifact directory absent; directory created in owned scope, command then executed successfully. No failed implementation check concealed.

`git diff --check`: exit0. Live ten-path Git diff and SHA256 recomputed independently; exact frozen match. Kernel/adapter hashes independently compared with HEAD; exact match. No source changes made.

Inspected author-executed Kotlin receipts, not rerun by reviewer:

| Receipt | Tests | Failures/errors/skips | SHA256 |
| --- | --- | --- | --- |
| FinancialHeapGuardTest-heap8.xml |27|0/0/0|`a9d2ed17df9319a8bcdc43f3b09f6728ee46a0b435d843ef3ae3debb41d0bb1a`|
| FinancialRateReferenceTest-heap8.xml |6|0/0/0|`dee0570ce08e1257e11f65936c0cf28fdabd3c2d34b915d137900c4ec2dbb93d`|
| FinancialBootstrapProbeTest-heap8.xml |10|0/0/0|`344d27fedb19a961dbecf3b8650ba2ea31fe4e162c5ba693195a5df62845e956`|

Retained `kotlin-heap8-green.log`: BUILD SUCCESSFUL, SHA256 `abd553ccc20e0257d672553b542c68e73c0ac8ec826bb9ef0a1b139a30768fbe`;27+6+10=43 tests. Initial test-only ObjectNode compile failure retained by author; corrected test call then green receipt inspected. [Reconciliation hashes](reconciliation-evidence.json).

Read prior arm3/arm4 derived outcomes, arm4 raw exception and compatibility/raw prior correctness binding. These show aborted4GiB runs and source-membership upper counts136077/148640; they do not measure actual deadline settlement rate or prove complete parity/replay. No Gradle, broker, live load, commit, push or new review executed by reviewer.

## Open Questions And Residual Risks

Concrete next-run frozen policy/capability/config/adapter/supervisor pending parent preparation. Same-instance supplement may inspect those artifacts without expanding review count or source scope. Actual fresh arm may still breach sampled guards or miss target; resource budget does not prove fit or rate. Sudden allocation can outrun sampled heap protection; native/RSS memory remains unbounded. Encoded/logical/allocated physical metrics have different scopes; broker/native CPU and production useful-path capacity remain unqualified. Existing pending aged/repeat/SQL/API/new-restart qualification unchanged.

## Verdict

**Ready** — reviewed fixed8GiB empirical implementation and plan, exact frozen ten-path patch above. No blocking findings. Verdict permits reviewed resource-selection implementation; it does not certify unseen next-run envelope, runtime capacity, managed restart or experiment outcome.

## Recommended Next Actions

Parent completes fresh concrete envelope and optional same-instance read-only supplement, then already-authorized single finite diagnostic if bindings pass. Preserve original attempts, report observed deadline counters/final drain/parity/replay and all refusals explicitly; promote current authorization/outcome docs and complete Records pass. Review limit4of4 reached; no new independent review starts under current authorization.

## Same-Instance Concrete-Envelope Supplement

Review instance:4of4, continued after root prepared `arm5/frozen`; no new independent instance. **Ready** for concrete fixed150000-trade/60-second/fresh8GiB arm under reviewed empirical envelope. No payload, Gradle, broker command or source edit executed by reviewer.

Executed read-only [envelope verifier](verify-envelope.mjs): exit0. [Exact result and hashes](concrete-envelope.json), [log](concrete-envelope.log). Checks completed `2026-10-06T03:05:15.936Z`; latest retained healthy raw inspection `2026-10-06T03:05:15.616Z`.

Verified `freezeDiagnostic(request)` equals actual policy; `verifyDiagnosticEvidence`, `validateRateSupervisor`, `validateRateResourcePolicy`, `validateBootstrapRuntime` pass actual command/output. Recomputed current compiled Financial-class and ordered entire classpath byte hashes independently from Kotlin algorithm; equal captured capability. Raw successful capability and broker-scope command stdout/argv match frozen objects. Raw prior49 proof digest and exact fixture/config economic policy match. All10 source hashes and reviewed patch remain unchanged.

Concrete identities:

- Profile `financial-empirical-heap8-disk16-v1`; exact `-Xms128m -Xmx8g`,8589934592B maximum,150000trades/60s/fresh,2GiB journal,14GiB allocation abort/16GiB hard,20GiB free floor,256MiB raw cap,5-second supervisor cadence. Canonical registered store/journal exist and empty; unique proof directory absent before launcher creation.
- Policy canonical-content SHA256 `bb090140bef683b5d8d5e20487853eb71d862e28233583f0ee83a59ac998a587`; policy raw-file SHA256 `751d95935aa2a602a6547332f68c17ef86c9f9e9aa42e0099b1d3401dc02249c`.
- Supervisor raw SHA256 `17d6cf1c0fa982e2b22d35b85b6c3e613aed6170c4161201a7d28ef14ea69903`; adapter raw SHA256 `5601c356463e35d3d55f317b99dfc96b0149102d55248839d7295f90f27efe57`; bound supervisor digest matches adapter.
- Capability raw SHA256 `57532460b294bbdffa5f9a52a659d94d8775815ece34690c6e6fcbc558b3ae52`; current build `2a8dc310c26c5973dcdbbea5f4ac0061a2c296a574e71b253bf47d6c09fe5314`; classpath `90022116d4f2b9705298358286b26893fea72ed8f2afcee5d668f6743d97b1f5`; config `866eca6e3446fc0f723c768a54ae2f5b920a1becfc9bd1fd40986110064f9d84`; fixture `fee7eead368d2ef2927aad1e53877907a4d74f9762b696d20f7e5575b1361e6d`.
- Project `reef-calcify-e4-timed3-8c6f`, cluster `redpanda.ddf9a1f7-1513-4776-b198-a4b776cc609c`, hosts43092/43192/43292. Created and latest healthy raw inspect IDs/images/labels/volumes/endpoints/1CPU/2GiB agree with config/supervisor/preflight/registration. Fresh created volume timestamps and project ownership observed. Preflight guest free82705424384B; setup allocation151179264B. Broker setup profile retains9/10GiB, distinct from actual timed14/16GiB envelope.

Supplement first found copied supervisor descriptive `scope` still saying4GiB while enforcement selected8GiB. Root corrected annotation and refreshed adapter hash before payload; original pre-correction files retained. Final exact8GiB/2GiB/14GiB/16GiB annotation verified. Closed artifact-attribution concern; source and enforcement unchanged, no new review instance.

Setup watcher handoff is intentionally pending execution: root plans strict supervisor launch, first valid raw resource sample plus wrapper-launch receipt, then actual handoff and setup watcher exit. Absence of prelaunch `watch-handoff.json` does not assert completed handoff; no synthetic ownership receipt requested or accepted. Existing setup watcher overlaps initial strict startup only; root must retain firstsample/handoff/watchfinished receipts. This supplement certifies prelaunch bindings and plan, not yet-executed ownership transition or outcome.

Root integration summary subsequently inspected: pinned Node279/279PASS and financial112/112PASS,11 classes,0 failures/errors/skips, source-before/after equal and author-freeze match. These are root-executed receipts; reviewer still ran only prior focused102 and read-only envelope verifier. Runtime fit, target rate, final accounting/history/replay remain empirical unknowns until arm completes or aborts. Readiness does not transfer into capacity or new managed-restart qualification. Cap4of4 remains exhausted.
