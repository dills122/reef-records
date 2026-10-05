# Independent review

Review instance: 2 of 3.

Frozen target: base97924e15642826a687db935a219d7927ae649ac8 → head5843ad5b02c21fd94db5598f05a503a785d8e251, branchcodex/calcify-sprint1-experiments. Tracked source clean; .planning/ untracked. All22 changed paths inspected, plus RFC6/8/10.1, frozen fixture contract, tests and repository/language/boundary/delivery guidance. Preliminary persisted before author.md, then instance1 report/response reconciled. No inherited author history, source mutation, broker action or additional reviewer.

## Findings

### P2 — Oracle omits consumed-integer bounds and disagrees on overflow outcomes

Evidence: `services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialOracle.kt:86`, `:116`, `:148`, `:161`; kernel `FinancialKernel.kt:155`, `:182`, `:218`, `:228`. Executable `BoundaryCheck.java`; raw `boundary-final.log`.

Scenario: valid frozen case0 CAPTURE followed by SETTLE with attempt="9223372036854775808". Kernel rejects AMOUNT_OVERFLOW without effects; oracle accepts SETTLED, creates out-of-range attempt identity and transfers50USD/5shares. Separate CAPTURE dueTick, FUND amount and CLOCK tick set to same value return kernel AMOUNT_OVERFLOW versus oracle INVALID_INPUT, BALANCE_OVERFLOW and INVALID_INPUT respectively. Amount-only cases conserve balances but disposition/dedup/digest disagree.

Contract: frozen fixtures.json17–18 signed64 storage and checked intermediate; RFC6.3 validates identities/versions/amounts/overflow before mutations; RFC10.1 E1a requires checked overflow and independent agreement after every business prefix. Kernel explicitly bounds consumed ordinal/time/funding values. Existing correction bounds funding result balances, but not input amount or other consumed fields.

Impact: independent observer cannot validate legitimate rejection records and reference permits prohibited settlement attempt. Passing positive/in-range fixtures does not prove error-path accounting contract.

Smallest correction: independently implement consumed numeric field range checks and disposition precedence, before oracle economics. Cover exact maximum, maximum+1, invalid sign, retry and preserved owner state for CAPTURE dueTick, SETTLE attempt, FUND amount and CLOCK tick. Avoid importing kernel validation into reference. If ordinal range intended to differ, freeze that contract explicitly and align both implementations before proof.

### P2 — Oracle accepts empty action identity and orders invalid-input validation after policy lookup

Evidence: `FinancialOracle.kt:42`, `:74–76`; kernel `FinancialKernel.kt:103–106`; fixtures.json48. Executable `BoundaryCheck.java`; raw `boundary-final.log`.

Scenario: frozen case0 CAPTURE with actionId="" returns kernel INVALID_INPUT versus oracle CAPTURED, creating execution, pending obligation, due work and versions under empty action key. CAPTURE quantity="NaN" plus requestedPolicy="missing-policy" returns kernel INVALID_INPUT versus oracle MISSING_POLICY.

Contract: frozen normalization requires required absence rejection and empty identifier rejection. RFC6.3 requires identity validation before managed mutation; RFC10.1 includes missing payload/policy and terminal disposition proof. Kernel rejects invalid normalization/empty namespace/domain/actionId before selecting missing policy, after prior-result/conflict lookup.

Impact: reference accepts state change forbidden by declared input boundary, and combined error paths produce inconsistent durable dedup/context/digests. Current generated valid envelopes miss these cases.

Smallest correction: implement independent envelope identity/type checks and matching invalid-input versus missing-policy precedence while preserving existing original-result and action-conflict precedence. Add empty/missing identity and combined malformed/missing-policy regressions. Identity normalization remains exact; do not trim or silently replace IDs.

### P2 — Malformed input during active clock phase aborts rather than entering durable staging

Evidence: `FinancialKernel.kt:74–76`, `:242–243`; oracle `FinancialOracle.kt:54`; broker `FinancialBrokerProbe.kt:266–268` dispatch and `:424–432` staging digest. Executable `BoundaryCheck.java`; raw `boundary-final.log`.

Scenario: case0 CAPTURE leaves due work; CLOCK tick1 opens DRAIN_DUE. Submit distinct CAPTURE action bad-capture with quantity="NaN". Oracle reports STAGED; kernel throws IllegalArgumentException from stage(normalize(input)). Same malformed request without active phase returns terminal INVALID_INPUT through process fallback digest.

Contract: RFC6.4 requires durable bounded staging while phase drains, checkpoint advancement only with reconstructible pending input, and later terminal disposition without overtaking phase. RFC10.1 tests missing required payload/policy after checkpoint advancement. Expected invalid input is typed decision under6.3; arbitrary normalization failure is not unexpected infrastructure failure.

Impact: identical input outcome depends on active phase, worker treats expected malformed request as fatal and repeatedly encounters poison source on restart; no durable pending authority exists to drain/reject after due phase. Existing staging tests only exercise normalizable envelopes.

Smallest correction: stage malformed bounded envelope with canonical fallback digest consistent with process; deduplicate pending identity, preserve phase order, reconstruct queue and drain to terminal INVALID_INPUT. Observer independent staging digest must support same malformed boundary without throwing. Add staged malformed numeric/missing-payload replay/checkpoint/duplicate/phase completion tests; retain resource envelope enforcement.

## Plan Review

Original instance1 findings corrected: identical malformed retry uses fallback digest; both funding legs bounded; zero-price synthetic rule explicit and independent reference aligned; broker proof default now persistent .planning/calcify-financial-proof/broker/<run>. New focused regressions pass3/3. No prior finding remains unresolved in its original scenario.

E1a pure checked economics, indexed identities/due queue, bounded deltas and replay/checkpoints remain sound on exercised frozen traces. Independent full state comparison and negative controls meaningful. Findings above are local input-validation/staging defects in same planned architecture; they block broad source sign-off, not evidence of heavy pivot. Author can regenerate valid-fixture diagnostics but must not claim full P1a error-path proof until corrected.

E1b reservation implementation remains proposed model: own/other holds, transfer ownership, cancellation and withdrawals exercised separately for cash/security. Live reservation policy still requires owner acceptance. E2 finite exact-wire models cover explicit manifests/bypass/capacities/fairness; exhaustive156 and seeded128 schedules tested. Source-prefix preference qualified; no deployed liveness/whole-process memory inference.

E3 runner partially implements mutation/forward/serde/recovery/golden families using same adapter and RF3/EOS settings. Declared external matrix not dispatched: majority broker outage, stale owner takeover, committed output/ack and producer failure. Production exception injection exists but runner does not select it. Result-only reconstruction certifies sequence cuts, not exact A10/B27 owner activation or managed missing-changelog reactivation. Topic settings/runtime/version/fencing/rollback and source-certificate adversarial binding need real proof. Full cold store-history replay remains measured cost, not hot indexed execution proof.

E4 real adapter uses same topology, bounded ACK registry, independent fixed gross-DvP delta reference and monotonic timestamps; model policy separates deadline and final rates. Current executable emits gaps/null technical encoded bytes, so cannot earn PASS_DIAGNOSTIC. Heap guard retained only draft; no aged memory budget certified. RAM ACK membership restart gap remains. E3 full correctness, actual producer/observer/byte calibration and heap sizing must precede large fresh/aged arms. Optional SQL seam deferral matches time-permitting scope. No full10k/600s,7.5k/900s or live-path qualification.

Recovery manifest remains historical source-restoration evidence; fixed oracle/runner hashes appropriately differ after correction. WORK_PLAN and handoff disclose original proof loss and partial implementation. Evidence inventory refresh/Records publication remain parent-owned delivery work; do not relabel E0 or original lost attempts as fresh proof.

## Author-Claim Reconciliation

| Author claim | Evidence inspected | Status | Review consequence |
| --- | --- | --- | --- |
| All four instance1 findings corrected | Actual correction diff, new focused JUnit3/3 | Confirmed for original cases | Prior findings closed |
| Exact checked units and independent full oracle | Kernel/oracle/source checks, BoundaryCheck | Contradicted at oversized consumed fields/empty identity | New findings1–2 block broad source proof |
| Reconstructible staged input/phase order | stage/process/drain, replay tests, malformed active-phase check | Confirmed for normalizable inputs; contradicted for malformed request | Finding3 needs local fix and regression |
| Shared RF3/EOS factory and known-key hot writes | FinancialProcessor.process and RateProbe topology | Confirmed structurally | Live transaction/fault proof pending |
| E3 partial, exact external/mixed-age matrix unfinished | broker runner dispatch, isolated reconstruct, RFC10.1 | Confirmed | No E3 qualification |
| E4 heap/ACK/technical bytes gaps | RateProbe output, preparePolicy, draft patch | Confirmed | No large load/source-capacity approval |
| Finite gate preference only | GateModel/tests/report assumptions | Confirmed | No universal/deployed liveness |
| Persistent broker raw proof default | broker-proof.mjs16 | Confirmed | New runs retain repository-owned evidence |
| Original raw proof lost; fresh evidence separate | recovery manifest/handoff/prior report | Confirmed | Regenerate full post-fix proof with exact head |

## Verification Performed

- Git head/status/stat/diff-check against exact base: tracked clean,22 paths, whitespace clean; scope*.log and diff-check.log.
- `node --test scripts/dev/calcify-financial/reservation-model.test.mjs scripts/dev/calcify-financial/gate-model.test.mjs scripts/dev/calcify-financial/rate-proof.test.mjs`:38passed,0failed; node-tests.log/exit.
- `node scripts/dev/calcify-financial/freeze-fixtures.mjs --check`:20cases/52inputs; unchanged SHA256fee7eead368d2ef2927aad1e53877907a4d74f9762b696d20f7e5575b1361e6d; fixture-check.log/exit.
- Coordinated Java21 Gradle focused three newly added FinancialOracleTest regressions: BUILD SUCCESSFUL32s;3tests,0failures/errors/skips, fresh compileTestKotlin. gradle-focused.log/exit, copied TEST-com.reef.platform.calcify.financial.FinancialOracleTest.xml and junit-summary.json. Sole Gradle slot released to parent.
- Java21 source launcher against newly compiled Financial* classes: BoundaryCheck.java reproduces seven named edge scenarios; boundary-final.log/exit. Exit0 means harness ran, not parity pass: six oracle divergence controls plus staging throw demonstrated. Earlier boundary-check*.log outputs retained, including one harmless relative-path edit failure before corrected rerun; no source changes.
- Codebase Memory list_projects/check_index_coverage/search_graph: project points at historical temporary checkout; cited Financial paths missing freshness, script subtree excluded, Financial symbol search empty. Direct focused source reads used; no index-completeness claim or mutation.

Exact commands retained in commands.md. Full JUnit suite and rate self-check not repeated here: instance1 already exercised pre-fix frozen scope; parent owns complete post-fix proof. No broker/calibration/load/remote operations.

## Open Questions And Residual Risks

Expected validation semantics beyond frozen exercised inputs remain broader than generated traces: independent reference must not silently accept type/coercion/required-field cases kernel rejects. Regression additions should cover immediate rejection and durable staging together.

Source UUID/member/certificate/head causation checks present structurally but full fault/recovery invariants require actual RF3 broker and targeted adversarial proof. Large retained identity/owner state memory and full cold history scans require measured limits. Inventory/archive completion must retain failed edge controls as well as later passing proof.

## Verdict

**Not ready** for sign-off on entire recovered source before authoritative proof regeneration. Original four fixes verified; three new P2 input-validation/staging defects reproduced. Valid frozen/model checks pass within exercised scope. Correct local findings before claiming independent E1a agreement and advancing E3 malformed-input/recovery proof.

No heavy pivot, new workstream, review-count reset or production change required. E3/E4 remain partially implemented and unqualified regardless of eventual source verdict.

## Recommended Next Actions

1. Author respond Accept/Dispute with evidence/Defer with owner and rationale for each finding.
2. Align independently consumed numeric bounds and envelope/error precedence; support malformed bounded durable staging and observer digest. Add focused negative/maximum/retry/replay tests within existing frozen contract.
3. Material behavior fixes warrant final independent instance3of3; no replacement or count reset. Parent decides dispatch after fixed frozen scope.
4. After source sign-off, regenerate persistent exact-head model/JUnit/self-check proof; complete E3 real fault/cut matrix before calibrated E4 arms. Keep LIMITED/failed attempts and full-sprint qualification separate.
