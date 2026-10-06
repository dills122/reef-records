# Empirical timed policy independent review

Review instance: 1 of 3. Historical E4 review/qualification counts unchanged; not reopened.

Frozen target: base/HEAD `863503ec23c27f33ecea14fd82724fe28f96d308`, branch `codex/calcify-sprint1-exit-2026-10-06`; seven working-tree paths listed in policy-author/after.json. SHA-256 of review.patch `34bb96f43925ac29162621074c61bab3bdd9fb9fc84967f2eaf00433ee2bb5fe`. All seven hashes matched before/after reviewer checks. Parent WORK_PLAN and other planning edits excluded. Concrete arm1/frozen files inspected after preliminary ledger, extending policy preparation evidence without changing source boundary.

Neutral bootstrap and repository requirements read before code/tests; preliminary.md saved before author-explanation.md. No inherited implementation conversation. Read-only source review; only own report/control artifacts and generated test outputs written. No source edit, commit, load, topic creation, broker mutation or extra review instance.

## Findings

### P2 — Reject unsupported measurement schema before reporting target outcome

Evidence: `scripts/dev/calcify-financial/rate-proof.mjs:105`, `:119`, `:120`; `assessMeasurement` early schema return at `:323`. Reproduction retained in wrong-schema-input.json and wrong-schema-output.json beside report.

Scenario: call assessDiagnostic with actual frozen policy and artifact whose schema is `unexpected-schema`, empirical purpose/hash/heap envelope match, deadline decided=settled=1, restore.records=300001 and ACK publishedMembers=300000. assessMeasurement returns early with MEASUREMENT_ARTIFACT_REQUIRED gap, skipping provenance/stage/deadline/parity validation. assessDiagnostic sees no failure and emits `result=LIMITED`, `failures=[]`, `usefulRateOutcome=TARGET_MET`, despite only one claimed deadline settlement and missing ordinary evidence.

Impact: delivered assessor can falsely report useful-rate target on unsupported/incomplete measurement. Exact Kotlin producer emits supported schema, so defect does not show frozen arm unsafe or economic logic broken; it does break honest evidence reporting requirement and needs small correction before delivering assessor.

Smallest correction: require supported measurement schema at empirical assessment boundary; classify invalid/missing artifact as failure or unknown and compute useful-rate outcome only after validated deadline counts. Add negative control for wrong/missing schema, preserving actual deadline miss and unchanged empirical LIMITED/capacity=false semantics. No harness optimization or benchmark expansion needed.

No other confirmed actionable defect in frozen policy/code boundary.

## Plan Review

Fixed fresh2500 trades/s ×60s =150000 unique trades,300000 CAPTURE/SETTLE actions; exact prefunding1500000000000 cash nanos and150000 shares. Distinct empirical schema/status/mode, 4GiB Java21 max, strict sampled80% stop,2GiB ACK journal,10GiB disk budget,20GiB guest-free floor. Request cannot supply conservative heap object, estimate or capacity promotion. Ordinary/bootstrap retain768MiB bounds and1000/100 bootstrap counts. Supplied mutation controls reject cohort, budget and prefunding changes.

Shared paced core retains durable ACK admission, individual monotonic deadline counts, complete live owner/history/economic checks and complete committed-result replay. Postdrain totals cannot replace deadline rates. Expected300001 history records and300000 published ACK members checked. Finite bootstrap client/parser limits intentionally apply to empirical mode; code changes these test settings, not economic algorithm or production financial authority.

Concrete supervisor argv/config maps exact three host categories and RF3 cluster registry; pinned wrapper finite30min,9GiB abort/10GiB hard allocation,20GiB guest-free floor and256MiB raw-proof cap. Broker-free reviewer validation passes. Actual live health/disk preflight remains parent execution responsibility; no review claim from merely matching configuration.

No aged/repeat arm, no new managed restart qualification, no conservative upper, no production/full-path capacity claim. E4 question remains scoped synthetic hot-domain financial adapter useful rate. Measurement priority respected; no architecture pivot or harness optimization proposed. Parent owns final docs/delivery/retention pass; not certified by this code review.

## Author-Claim Reconciliation

| Claim | Evidence | Status / consequence |
| --- | --- | --- |
| Distinct empirical4GiB permission preserves ordinary/bootstrap conservative gate | freezeDiagnostic, diagnosticGuard, Profile.EmpiricalTimed; separation controls; focused tests | Confirmed. No global gate increase. |
| Exact resource/cohort/provenance mutations refuse | Frozen policy plus raw config/evidence/source checks; six reviewer mutation controls | Confirmed for inspected boundary. |
| Actual current compiled capability pinned | Reviewer broker-free captureHeapCapability; verifyDiagnosticEvidence with returned capability | Confirmed build0260518e… and classpath706c2ba1…; max4294967296, flags-Xms128m/-Xmx4g. |
| Prior bounded49 E3 compatibility for unchanged kernel/adapter; new probe/build differs | prior-e3-correctness.json raw hash; prior executed e3-execution-manifest.json checksums; current bytes | Confirmed source compatibility. Prior baseline29a8926d alone differs for BrokerProbe; actual prior dirty-source manifest matches6f7d8993… and kernel9f76e879…. No same-new-build49-arm recertification claimed. |
| Complete owner/history and result-only replay retained | Observer Reference.accept; final kernel-prefix owner/history comparison; expectedInput replay/complete cut; assessDiagnostic history/member counts | Confirmed statically; finite unit/regression checks pass. No actual150k workload performed by reviewer. |
| Sampled breach/staleness remains sticky through publication | FinancialHeapGuard.refresh/checkpoint/publish; empirical guard test; existing lifecycle tests | Confirmed. Sudden allocation/native/RSS protection not guaranteed. |
| Useful rate independently reports honest deadline result | assessDiagnostic plus passing valid/missed controls | Contradicted for unsupported schema: findingP2. |
| No live experiment by author | Author packet; parent prep identified separately | No live result relied upon by reviewer. |

## Verification Performed

- `node --test scripts/dev/calcify-financial/rate-proof.test.mjs scripts/dev/calcify-financial/rate-supervision.test.mjs`:51 tests passed,0 failed.
- `JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home services/platform-runtime/gradlew -p services/platform-runtime test --tests '*FinancialHeapGuardTest' --tests '*FinancialRateReferenceTest' --tests '*FinancialBootstrapProbeTest' --console=plain`: initial sandbox attempt failed Gradle wrapper cache lock permission; cache-access retry BUILD SUCCESSFUL in1m2s. XML counts HeapGuard26,RateReference6,BootstrapProbe10;0 skipped/failures/errors. Test classes compile UP-TO-DATE; frozen compiled capability independently matched afterward.
- `git diff --check`: pass.
- Actual arm1/frozen: verifyDiagnosticEvidence, validateRateSupervisor, validateBootstrapRuntime: pass; separate fresh broker-free JVM capability capture exited0 and actual immutable capability matched.
- Frozen source hashes and review.patch digest: pass.
- Prior correctness receipt hash and prior executed kernel/adapter source checksum comparison: pass.
- Six cross-binding negative controls: pass; retained cross-binding-controls.json.
- Wrong-schema reporting negative control: defect reproduced; exact input/output retained. Not benchmark evidence.

Graph skill coverage checked projectreef-calcify-session-8c6f, generation2026-10-05T07:02:27Z. Scripts excluded/not tracked; Kotlin metadata_changed. Direct source fallback used; no completeness or absence claim from stale graph.

## Open Questions And Residual Risks

4GiB explicit operational budget does not prove cohort fits. Guard samples250ms, stale threshold5s; allocations can outrun it. Native memory and broker CPU remain unqualified. Result resources measure same-JVM producer/worker/observer; CPU cutoff includes drain while derived cpuEquivalentCores divides by scheduled60s, so describe as CPU cost per scheduled window rather than observed instantaneous cores. Probe diskPeak scope covers broker/state; supervisor separately covers journal/proof allocation. These inherited scope limits require honest run narrative, not redesign before diagnostic.

Diagnostic source compatibility marker is reviewed source-based reuse, not independent same-build E3 evidence. Executable validates marker bytes/current hashes but does not traverse prior proof manifest. Concrete reviewed marker/proof hash/source manifest match; unsupported future reuse should receive its own review. Historical E3 full qualification unchanged.

Actual topic/durability readback and runtime health not exercised; parent must retain actual run configuration, resources, attempts, exact deadline/final rates and gaps. Successful empirical assessment remains LIMITED; no capacity qualification. Existing supervision regression mode arrays omit diagnostic-run, but new mode condition inspected and concrete runtime/supervisor mapping exercised; adding it while fixing finding is proportionate.

## Verdict

**Not ready** for delivery of new empirical policy assessor: oneP2 false reporting defect. Core frozen diagnostic launch/resource/correctness boundary otherwise supported by inspected source, actual prepared evidence and broker-free checks. No evidence requires conservative retained upper, new recovery qualification, additional benchmark arm or heavier pivot.

## Recommended Next Actions

Accept and fix schema/outcome defect; add minimal negative control; preserve this frozen report and reproduction. Parent decides bounded instance2 after source boundary changes, within new policy limit3. Continue authorized fresh measurement once corrected policy boundary accepted; retain all results and limits, then parent delivery/retention pass.
