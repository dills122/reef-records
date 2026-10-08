# Independent empirical timed policy review
Review instance: 3 of 3. Final instance; no count reset or further review spawned.

## Findings
No actionable implementation findings. Blind preliminary recorded in preliminary.md before author-explanation.md read.
Scope verified: base/HEAD 863503ec23c27f33ecea14fd82724fe28f96d308, branch codex/calcify-sprint1-exit-2026-10-06, ten current files match policy-author/after.json, frozen patch SHA-256 fe1401c15ec1e79ea8158bda053f2e5a3f1d04650a67bb664a6b8a905c08487e. Parent docs and planning changes excluded.

## Plan Review
Code implements fixed fresh2500 trades/s ×60s=150000 trades, exact prefunding,300000 ACK actions/300001 histories,4GiB JVM and2GiB ACK journal. No aged/repeat cohort or new managed-restart qualification. Fixed financial-empirical-disk16-v1 permits14GiB sampled abort/16GiB hard ceiling; absent profile retains9GiB abort/10GiB hard. Guestfree20GiB, raw256MiB and sample cadence unchanged.
Ordinary conservative768MiB and bootstrap1000/100/768MiB remain separate. Sampled empirical guard stops at80%4GiB, requires exact max, preserves sticky breach through publication. Deterministic economic/history/replay core retained; kernel and managed adapter unchanged in frozen patch. Actual run, delivery/docs and retention owned by parent, beyond implementation verdict.

## Author-Claim Reconciliation
| Claim | Evidence | Status | Consequence |
| --- | --- | --- | --- |
| Empirical14/16 isolated from generic9/10 | proof-supervisor.mjs resourceBudgets/validateSample; profile rejection tests | Confirmed | No global budget relaxation |
| Named permission bound to actual frozen policy | rate-supervision.mjs validateRateResourcePolicy and superviseRateAdapter; policy digest/profile/hard-budget tests | Confirmed | Prelaunch policy/supervisor disagreement refuses |
| Exact Java21/-Xmx4g diagnostic wrapper only | resourceBudgets; pinnedHeapAdapter; Kotlin diagnosticGuard | Confirmed | Ordinary/bootstrap/new arbitrary heap rejected |
| Fresh150k/60s,2GiB journal immutable | freezeDiagnostic; validateDiagnosticPolicy; rehashed mutation tests | Confirmed | Fixed finite admission |
| No conservative upper/capacity/new restart | HeapGuard empirical telemetry; probe output/gaps; assessDiagnostic LIMITED | Confirmed | Evidence remains diagnostic |
| Actual deadline rates independent of eventual drain | assessDiagnostic and unsupported-schema/missed-target controls | Confirmed | Malformed scope UNKNOWN;1250/s miss remains miss |
| Independent Node102/102; author Kotlin42/42 | node-focused.log; frozen author Kotlin review3 XML/log | Confirmed | Node rerun locally; Kotlin receipts inspected, not rerun |

Earlier paragraphs in author explanation describe earlier10GiB stage; final resource-permission section explicitly supersedes selected-profile budget while preserving absent-profile behavior. Earlier evidence not silently reinterpreted.

## Verification Performed
- node --test scripts/dev/calcify-financial/rate-proof.test.mjs scripts/dev/calcify-financial/rate-supervision.test.mjs scripts/dev/calcify-financial/proof-supervisor.test.mjs:102/102 PASS,0 failures/skips (node-focused.log).
- git diff --check:PASS.
- Current ten source SHA-256 hashes against after.json:10/10 MATCH.
- Frozen review.patch SHA-256:matches supplied digest.
- Kotlin receipt inspection:FinancialHeapGuardTest26, FinancialRateReferenceTest6, FinancialBootstrapProbeTest10; zero failures/errors/skips. No Gradle or broker load executed by reviewer; avoids current parent suite/capability freeze interference.

## Open Questions And Residual Risks
Sampled heap/disk protection cannot guarantee continuous peaks; native/RSS/broker memory outside heap guard.16GiB permission does not guarantee timed target or successful complete drain. Encoded technical bytes and brokerCPU remain unmeasured; new timed managed restart unqualified. Concrete arm4 frozen envelope inspected with read-only executable validators and raw registration receipts. No live-run success inferred. Parent completion/retention pass remains required.

## Verdict
Ready — frozen empirical timed policy implementation and concrete arm4/frozen envelope. Parent waits full financial suite closure before live load; no live-run success inferred.

## Recommended Next Actions
Parent verify concrete frozen run identities and registration before one authorized fresh diagnostic; retain failedarm3 under original9/10 policy; report deadline miss separately from eventual parity/drain. Final review3of3 cap reached; no further review instance starts.

## Concrete Arm4 Envelope
Read-only executable verification PASS (arm4-check.log): verifyDiagnosticEvidence, validateRateSupervisor, validateRateResourcePolicy, validateBootstrapRuntime. Raw capability/broker-scope command receipts returncode0; frozen config cluster redpanda.c89cb3ea-9e69-480d-9529-a6ab634ab34c. Policy4498a13ea289d8470c3d051c1998d802cdfba2f6e3b8dc61d8ae7629081a5455; config77772830966c37a4bb6388a52aaf450e40a9222dcc69ababbad08563e6c2daa1; build004260ede2a67a4ec625525d35d4a3a17699c76a4efac1569b88b526d5be4f96. Actual wrapper and adapter digest agree; selected fixed14/16GiB,20GiB free,256MiB raw. Prior E3 copied raw digest matches compatibility marker. Canonical store/journal empty at review. broker2/preflight.json and registration.json equal exact supervisor registry; preflight HEALTHY_PROFILE_READ_BACK, baseline151179264, guestfree90188587008. Raw create-012-created-inspect.json exitCode0 binds all three registered container IDs/images/labels/named data mounts. Frozen envelope permission retained separate from generic setup9/10 budgets. No compile/load/source edits.
