# Independent review

Review instance: 5 of 6. Base97924e15642826a687db935a219d7927ae649ac8 → headf75b5d6187b631d5d608a24b883df6c57478b151. Branch codex/calcify-sprint1-experiments. HEAD verified before/after; only untracked .planning/. Entire25changed paths reviewed, including code, tests, wiring, focused checkpoint, recovery provenance, inventory and active handoff. Source read-only; own artifacts only instance-5. Neutral bootstrap first; preliminary.md recorded before author packet or earlier reports. No inherited author conversation; author rationale treated as testimony.

## Findings

No new actionable defect established in frozen implementation. Latest physical-byte override defect corrected: rate-proof.mjs physicalTradeBudget requires positive safe measured numerator/denominator, safe derived ceil(mean)*2, and positive safe optional override >= floor; preparePolicy blocks invalid budget and exported estimateAged refuses it. Regression cases include undersized, fractional, string/null, nonfinite and unsafe values plus valid equal/higher overrides. Independent current48-test run passes.

Previously corrected timeout and assessor-count paths also supported by source/tests: FinancialBrokerProbe.workerProperties sets producer-prefixed transaction.timeout.ms120000 with commit.interval.ms60000, RF3/EOS and fail handlers preserved. Actual StreamsConfig regression uses same helper. assessMeasurement checks each cumulative deadline counter against final cut, bounds offers by frozen workload, and treats pending as gauge. No further source correction requested for bounded regeneration.

Qualification gaps below remain real blockers to full RFC sprint completion and E4 load eligibility; they are explicitly deferred implementation/evidence, not closed by this verdict.

## Plan Review

RFC6/8/10.1 scope preserved. E1a implements exact two-asset unreserved gross DvP, independent BigInteger accounting, bounded indexed hot mutations, complete history/checkpoint replay and separate business/delivery state. Tests cover20cases/52inputs,300seeded traces/19,200prefixes, different delivery/yield/group schedules, malformed/typed identities, signed64 arithmetic boundaries and deliberately missing staging/duplicate discharge/one-leg mutation. Replay/control source independently inspected; unit success cannot prove broker EOS.

E1b models own-hold transfer/consume, cash/security units, competition/withdrawal and unmatched cancellation ownership. Proposed policy remains subject to owner acceptance; no live reservation activation claim. E2 supplies156finite/128seeded symbolic cases plus explicit access-bypass mutants and resource/closure checks; assumptions restrict manifests/source ordering/fairness/history. No universal liveness, actual gateway or physical heap claim.

E3 implemented runner arms are happy/prefix restart/fresh suffix, golden cases, each enumerated semantic mutation crash, forward/serialization failure, local-state loss, staged-phase loss and result-only reconstruction. Source manifests bind UUID, physical offsets, payloads and contiguous logical membership; startup certifies domain histories, coverage and semantic store agreement. Independent observer derives expected business effects/staging from accepted inputs and rejects omissions. Full RFC fault/activation matrix remains incomplete: majority outage, stale owner takeover/resume, committed-before-controller-ack, actual production failure and exact A10/B27 activation/catch-up. Generic mixed-age refusal is narrower evidence than requested exact mixed-age cohort.

E4 actual adapter/ref does bounded known-key accounting and same-clock sampled latency with conservative deadline counts, but startup preflight heap/off-heap budget, real calibration, durable ACK registry, complete encoded technical telemetry and full E3 prerequisite remain open. Heap draft intentionally unapplied. SQL/API seam and full useful-path capacity unknown. No architecture pivot needed to regenerate existing bounded arms; heavy pivot not established.

Docs accurately preserve908c3e54 historical failure/proof and immutable archive links. They require post-signoff checkpoint update after new proof; sourcef75 corrections must never overwrite908c failures as passes. Production routes/events/storage/contracts untouched; test JSON remains experimental, not new accepted inter-service authority. Retention inventory changed only focused topic entries.

## Author-Claim Reconciliation

| Author claim | Evidence inspected | Status | Consequence |
| --- | --- | --- | --- |
| E1 accounting/replay and E2 bounded model implemented | Kernel/Oracle/model source and tests; current Node48, prior27 financial XML on identical Kotlin | Confirmed for experimental bounds | Supports proof regeneration; excludes production/universal proof |
| Timeout fix preserves60s grouping | workerProperties and FinancialBrokerProbeTest; actual StreamsConfig prior XML | Confirmed source/config regression | Real broker proof still required |
| Count rollback and offer overrun rejected | assessMeasurement and individual stage regressions | Confirmed | Previous fabricated false-pass closed |
| Optional byte budget guarded conservatively | physicalTradeBudget; current22rate tests within48 models | Confirmed | Invalid overrides cannot freeze policy |
| Kotlin identical to independently tested3435 | git diff3435d7b0→f75b5d61 services/platform-runtime empty; raw3XMLs/log | Confirmed | Reuse executed27test evidence with explicit provenance |
| Current actual broker preflight permits120s timeout | broker-preflight-f75b5d61.json reports broker max900000 and matching source/image/compose | Artifact inspected; live state unverified in this review | Parent must preserve/recheck actual runtime provenance when running |
| E3/E4 incomplete; heap guard only draft | runner externalMatrix, reconstruction implementation, rate gaps and unapplied patch | Confirmed | No full sprint/capacity/load sign-off |
| Prior raw proof archived exactly in Records | Local checkpoint/recovery/inventory cite immutable archive | Remote bytes unverified in this read-only review | Rely on retained archive verification only within stated dated scope |

## Verification Performed

Current executed checks, outputs retained in this directory:

- `node --test scripts/dev/calcify-financial/reservation-model.test.mjs scripts/dev/calcify-financial/gate-model.test.mjs scripts/dev/calcify-financial/rate-proof.test.mjs`:48tests/48pass/0fail; node-tests.log.
- `node scripts/dev/calcify-financial/freeze-fixtures.mjs --check`:20cases/52inputs, unchanged SHA256fee7eead368d2ef2927aad1e53877907a4d74f9762b696d20f7e5575b1361e6d; fixture-check.log.
- From services/platform-runtime, Java21 FinancialRateProbe `self-check` with existing test/main classes and resolver-probe-deps:exit0,40prefixes, independent full oracle, one-leg mutant rejected; rate-selfcheck.log. No broker calls/load.
- `git diff --check 97924e15 f75b5d61`:clean. `git diff 3435d7b0 f75b5d61 -- services/platform-runtime`:empty.

Prior executed evidence inspected after preliminary: instance-4 Gradle log BUILD SUCCESSFUL in2m28s; JUnit3suites/27tests/0fail/errors/skips (14kernel,12oracle,1broker-config). Exit-capture wrapper failed after successful Gradle because zsh status read-only; did not invent process exit. Kotlin unchanged, so no duplicate Gradle invocation. Parent plans full module retest after sign-off. Author byte-guard red20pass/2fail then green22pass/0fail confirms failure sensitivity; current independent model run establishes final result.

Graph status/coverage checked: generation2026-10-03T18:01:15Z rooted at deleted/private/tmp checkout; broker freshness missing, scripts excluded. Focused source fallback used throughout. No graph absence/exhaustive impact claim.

## Open Questions And Residual Risks

Real broker startup/crash/restore remains unexecuted atf75 by reviewer;120s transaction timeout must remain within observed broker maximum, and runner60s readiness/90s command caps can fail/kill attempts before broker120s timeout. Preserve failures and timing scope. Controller may regenerate existing bounded arms under exact frozen build/config; may not claim full E3 matrix from them. Rate adapter retains growing semantic state in heap and full durable history in store; disk floor fix alone does not establish heap/native feasibility. Do not start E4 loads before remaining correctness/calibration/resource gates. No independent remote archive audit, DB integration or matcher identity lifecycle proof.

## Verdict

**Ready with non-blocking follow-ups** for E1/E2 and bounded E3 proof regeneration atf75b5d6187b631d5d608a24b883df6c57478b151. Entire recovered implementation/plan considered; readiness limited by explicit RFC acceptance gaps, not narrower review unit. **Full sprint qualification, E4 load/capacity and production cutover remain not ready.** No new source defect or heavy pivot established. Review count remains5of6; no additional reviewer spawned or authorized here.

## Recommended Next Actions

1. Parent full retest, then regenerate existing bounded happy/golden/recovery/core arms from frozenf75; retain build hashes/runtime config/provenance and every failure.
2. Record achieved E3 subset separately from unresolved full matrix; keep E4 load blocked until explicit heap/calibration/ACK/correctness gates close.
3. Update focused checkpoint/WORK_PLAN/active handoff and Records evidence after proof; preserve dated908c historical failures and source-specific assertions.
