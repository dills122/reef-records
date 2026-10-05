# Independent review

Review instance: 3 of 3.

Frozen target: base `97924e15642826a687db935a219d7927ae649ac8` → head `908c3e54583cb812b074fe66160c42f0bcbd4921`, branch `codex/calcify-sprint1-experiments`. Entire recovered code/config/test scope reviewed, including surrounding contracts and all 22 changed paths. Tracked tree clean before/after review; untracked `.planning/` plus Gradle-generated `services/platform-runtime/.kotlin/`. No source edits, commits, broker/load calls, new reviewer or workstream.

Neutral bootstrap, canonical requirements, tests and implementation read before preliminary ledger persisted. Author packet and earlier reports/responses/checks read afterward. Blind ledger wording “entire 22-path diff inspected” refers to code/config/test pass plus scope inventory; recovery manifest/handoff provenance reconciliation completed after ledger, before verdict. No inherited implementation conversation.

## Findings

### P2 — Rate assessor accepts deadline totals above later final totals

Evidence: `scripts/dev/calcify-financial/rate-proof.mjs:88` validates cuts independently; `:97` checks deadline lower bound; `:98` checks exact final counts. No cross-cut upper bound. Retained executable payload in `rate-cut-consistency.mjs`; raw control/counterexample in `rate-cut-consistency.log`.

Scenario: frozen 2,500/s ×60s policy expects150,000 unique timed trades. Valid unit-control measurement passes. Change only earlier deadline offered/admitted/decided/settled counts to300,000, leaving final counts150,000 and pending0. Assessor still returns `PASS_DIAGNOSTIC`, no gaps/failures, and5,000/s. Earlier cumulative unique counts cannot exceed later final totals. These are fabricated assessor unit inputs, never measured benchmark evidence.

Impact: inconsistent measurement artifact can overstate useful rate and pass validation. Source hash/parity fields do not catch this arithmetic contradiction. Existing tests cover within-cut consistency and late drain, not cross-cut monotonic counts.

Smallest correction: reject deadline offered/admitted/decided/settled above corresponding final cumulative count; bound deadline offered by frozen expected membership. Do not require pending monotonicity, since settlements legitimately reduce pending. Add count-snapshot regression with unchanged control.

Disposition: **open**, owner parent/E4 gate. Parent explicitly defers correction before E4 pass claims: actual adapter already emits `LIMITED` gaps, E3 prerequisite unfinished, no E4 load/capacity claim authorized by this verdict. Non-blocking for E1/E2 authoritative proof regeneration and bounded E3 continuation; blocking for treating assessor as sound E4 pass gate. No source change during review.

No additional actionable E1/E2 or bounded E3 source blocker demonstrated. Prior seven accepted findings no longer reproduce in reviewed scope. This statement does not claim exhaustive correctness beyond inspected contracts and executed cases.

## Plan Review

RFC remains proposed architecture and bounded proof plan, not accepted production authority. Change remains test-only. E1a kernel emits bounded semantic deltas, exact two-asset postings, original-context dedup, indexed execution/due-work access, typed invalid outcomes and separate delivery staging. Unexpected failures propagate; expected invalid requests discard planned mutations. JSON history/checkpoint recovery preserves integer values and pending owner state. Independent BigInteger reference does not call kernel economics/validation/replay; complete business-prefix comparison and negative controls meaningfully test economics and reconstruction.

E1b models proposed holds/priority/transfer/cancel/withdrawal separately for cash and securities. Owner policy acceptance and live source/lifecycle integration remain open. E2 finite models retain explicit manifests, dependencies, wire capacities, bypass/access assumptions, tombstones and atomic whole-model checkpoint. Exhaustive156 and seeded128 cases pass within finite assumptions; neither proves deployed liveness or heap/broker buffering limits.

E3 adapter uses same kernel and persistent EOS topology, known-key delta writes, history/source coverage/certificates, and independent read-committed expectations. Controller implements core/golden/recovery subsets. Declared majority-broker loss, stale owner takeover, committed-output/ACK ambiguity and producer failures are not dispatched; production injection exists but controller does not select it. Reconstruction checks result-only sequence cuts, not complete A10/B27 activation or managed unavailable-changelog reactivation. Startup input UUID/membership and semantic/history comparisons help, but complete required namespace registration, actual topic/deployed settings, certificate/history adversarial proof, real transaction rollback/fencing and no-republish behavior require experiment evidence. Cold restore scans retained history; full memory/restore cost remains measurement work.

E4 real producer/observer shares E3 topology and independently derives fixed gross-DvP deltas. Nonbroker self-check validates40 prefixes against full oracle and detects journal mutation. Actual adapter deliberately emits missing technical encoded bytes, RAM ACK recovery, shared-JVM CPU scope and framework-read gaps; assessor returns LIMITED for these gaps. Heap-sizing guard is unapplied draft, not implemented protection. Disk sizing does not bound retained identity/reference/kernel heap. Large fresh/aged loads remain blocked pending sizing, E3 correctness, calibration and resource preflight. Current P2 also blocks diagnostic pass claims. Optional SQL seam defer matches RFC; total useful-path capacity remains unknown.

CI/Make add model tests; explicit Node syntax invocation prevents Bun --check from executing script bodies. Fixture CLI accurately narrows its check to frozen input stability. Recovery hashes retain original recovery checkpoint facts; current corrected source hashes recorded separately. Persistent broker proof default fixes ephemeral path. Required full proof/Records publication, inventory refresh and owner-board update remain delivery work. Handoff language suggesting further fresh-context review must not reset existing3of3 cap.

## Author-Claim Reconciliation

| Author claim | Evidence inspected | Status | Consequence |
| --- | --- | --- | --- |
| Test-only, no financial authority cutover | Full diff, src/test paths and isolated namespace guards | Confirmed | No production-readiness inference |
| Rejected retries, opening debit and zero-price corrections | Oracle execute/funding/capture; focused tests and complete suite | Confirmed | Instance1 scenarios closed |
| Consumed signed64 bounds and invalid identity precedence | Oracle input branches; Kernel/Oracle boundary tests; boundary-recheck.log | Confirmed | Instance2 numeric/identity scenarios closed |
| Malformed pending staging survives replay then rejects | Kernel stage/drain; independent OutputVerifier; malformed staging and omission controls | Confirmed in source/tests | Real broker staged recovery remains unrun |
| Typed IDs and textual/scoped settlement locators | Raw key framing, resolve, reference matching; resolution-recheck.log and13 source scenarios | Confirmed | No coercion alias in exercised cases |
| Independent economics/full owner reconstruction | Oracle assertMatches, every-cut/wire/checkpoint tests, observer negative controls | Confirmed on executed inputs |26 passing tests do not certify real EOS |
| Bounded hot deltas, lean latest record | Changes/append, retainHistory=false, FinancialProcessor.process | Confirmed | Unique state and cold history still grow |
| E3/E4 partial and unqualified | Runner dispatch, probe outputs, RFC10.1 | Confirmed | Continuation scope constrained above |
| E4 assessor validates rate/counts | assessMeasurement; new cross-cut counterexample | Partly contradicted | P2 retained open before E4 pass gate |
| Original proof lost, exact source recovery retained | recovery.json;17 hashes checked against06911bcf | Confirmed historical manifest consistency | New proof separate; original execution logs unrecoverable here |
| Author focused8/11 checks pass | Source regressions, author artifacts after blind ledger, fresh reviewer26/11 checks | Independently confirmed relevant behavior | Author testimony not substituted for reviewer execution |

## Verification Performed

Exact commands in `commands.md`. Review evidence retained here only.

- Git HEAD/base/path/commit/status checks and `git diff --check`: exact frozen scope, no tracked changes, no whitespace error.
- Node three model suites:38 tests passed,0 failures/skips; `node-models.log`. Gate tests execute156 exhaustive and128 seeded model scenarios.
- Fixture `--check`:20 cases/52 inputs, SHA256 `fee7eead368d2ef2927aad1e53877907a4d74f9762b696d20f7e5575b1361e6d`; `fixtures.log`.
- Coordinated Java21 Gradle `test --tests FinancialKernelTest --tests FinancialOracleTest --rerun-tasks`: BUILD SUCCESSFUL2m44s, fresh main/test compile. Kernel14 + Oracle12 =26 tests,0 failures/errors/skips. `gradle-financial.log`, both original XML files and `junit-summary.json`. Generated test coverage includes300 seeded traces/19,200 input prefixes, every-history/checkpoint cuts, wire/staging schedules, all added boundary tests and mutation controls.
- Freshly compiled nonbroker rate `self-check`:40 prefixes, independent full oracle, one-leg mutant rejected; `rate-selfcheck.log`.
- Prior seven boundary and four locator executable scenarios rerun against current compiled classes:11 parity=true, no throws/divergences; `BoundaryCheck.java`, `ResolutionBoundary.java`, `boundary-recheck.log`, `resolution-recheck.log`. These harnesses report parity; suite assertions separately enforce regression expectations.
- Assessor control/cross-cut counterexample executed: both PASS, counterexample reports impossible5,000/s; payload/log retained. Initial review-harness relative import failed, corrected within review artifact only; `rate-cut-import-failure.txt` preserves correction.
- Historical17 source hashes checked at recovery06911bcf:0 mismatches; current corrected hashes retained in `source-hashes.json`.

Codebase Memory index_status/check_index_coverage used: index rooted in different checkout with missing new-path freshness. Exact source fallback used throughout; no graph completeness claims or reindex mutation. No broker, calibration, load, actual topic setting or external qualification verification executed.

## Open Questions And Residual Risks

Full E3 fault/certified-cut matrix, missing-history activation and first-fresh-result measurements remain unresolved. E4 heap guard, real calibration, complete telemetry/restart membership and P2 remain unresolved. Native/client/decoded buffering and growing retained state require resource sizing, not only bounded individual decisions. Real source/matcher identity integration and reservation ownership policy remain pending. Lost original proof cannot be reclassified as retained evidence. Records publication/inventory completion must preserve failed attempts alongside successful fresh proof.

## Verdict

**Ready with non-blocking follow-ups** for reviewed corrected E1/E2 source, authoritative proof regeneration, and bounded E3 experiment continuation within existing small synthetic cohorts. Entire recovered code was inspected; this verdict does **not** certify entire sprint runnable/complete. E4 assessor P2 remains open and blocks E4 diagnostic pass claims; heap/resource gates block large loads. Full E3/E4 qualification, production readiness, architecture acceptance and capacity claims remain unavailable.

## Recommended Next Actions

1. Parent record P2 defer with E4 owner/rationale and retain exact counterexample. Correct before E4 diagnostic pass gate; no new review instance authorized.
2. Regenerate authoritative exact-head proof with persistent unique attempt storage; distinguish this reviewer verification from post-signoff experiment evidence. Verify isolated broker prerequisites before bounded E3 happy/core/recovery arms.
3. Complete remaining E3 matrix/certified activation before E4; implement heap/resource gates and assessor correction before large timed arms. Preserve LIMITED/failed results and source/config scope.
4. Update current checkpoint/owner board and publish complete proof/review/correction bundle through Records retention protocol.

Review cap reached:3of3. No further instance or count reset. No heavy architecture pivot required; parent/user own remaining gates and any material later scope change.
