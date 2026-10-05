# Bootstrap heap component independent review

Review instance: 1 of 3. Bootstrap heap attempt1 cycle1. Verdict: **Ready**, scoped component candidate only.

## Findings

No actionable P0–P3 findings in frozen two-file diff. No runtime qualification claim.

## Plan Review

Canonical E4-C and calibration-research/guard-contract.md checked against source. Private primary constructor/private sealed profile keep conservative constructor as existing public entry point. Internal named diagnosticBootstrap gate admits exactly 1000 timed/100 pending/0 aged, without fabricated FinancialHeapBounds. Existing constructor still validates estimate and conservative baseline upper.

Diagnostic path shares actual/capability maximum validation (authorized maximum 768 MiB), stable maximum check, strict integer-floor 80 percent limit, cadence 1–250 ms, freshness strictly below configured ceiling of at most 5 seconds, sticky first breach/stale/sensor failure, dedicated sensor and publication lifecycle. Optional preload ceiling must be positive and below capability limit at factory time, below effective runtime limit at refresh, and observed baseline equality refuses. Field remains operational stop; never relabeled baseline upper evidence.

Separate financial-bootstrap-heap-observation-v1, EMPIRICAL_BOUNDED_DIAGNOSTIC, heapConservativeBound=false and estimatedHeapBytes=null prevent ordinary conservative meaning from being silently assigned. Conservative telemetry schema/values/keys unchanged; nullable map type supports honest diagnostic null. Existing caller snapshot uses nullable observation map already.

Managed restart/client/worker closure/result-only replay phase checks and final publication use existing guard lifecycle. Staged-result failure removes temporary outputs and refuses both artifacts; final close/check remains before atomic move. Component tests exercise worker-close sensor breach, staged failure, healthy publication and lifecycle closure. Actual frozen manifest, build/CP/raw identity, finite payload/client configuration and bootstrap parser/caller remain root-owned integration gates outside review. Component readiness does not satisfy complete E4-C or permit load.

## Author-Claim Reconciliation

Author explanation read only after preliminary source ledger. Root supplied consolidated AUTHOR_REPORT.md; no independent original worker narrative available.

| Author claim | Evidence inspected | Status | Review consequence |
| --- | --- | --- | --- |
| Conservative behavior retained | Public secondary constructor, Conservative branches, unchanged 19-test prefix | Confirmed | Existing semantic guards preserved |
| Exact cohort/private diagnostic factory/no fake bounds | Profile and diagnosticBootstrap | Confirmed | Fixed component opt-in boundary |
| Strict cap/ceiling/shared sticky lifecycle | refresh, baseline, checkpoint, start, publish, close | Confirmed | No diagnostic bypass in component |
| Separate diagnostic telemetry/null estimate | telemetry and JSON assertion test | Confirmed | Explicit empirical semantics |
| 25 passing cases, 19 existing plus six diagnostic | XML, green.log, source prefix comparison | Confirmed as retained execution evidence | No independent rerun performed |
| Actual request/config/runtime integration pending | Factory comment, scope and source | Confirmed | No overall run-readiness verdict |

## Verification Performed

Read AGENTS.md, AI_CONTEXT.md, documentation map, canonical requirements, guard contract, full scoped source/tests and targeted FinancialRateProbe lifecycle/snapshot context. Reviewed exact working-tree diff against baseline 29a8926d33f9e2dc7278a1676a6fa3272628de3c; HEAD equals baseline, branch codex/calcify-e4-readiness. Other dirty/untracked paths excluded.

Executed git diff --check on two scoped files: pass. Python SHA-256 comparison against receipt: both match. Parsed XML: tests=25, failures=0, errors=0, skipped=0; 25 unique test names, six diagnostic tests. Compared baseline test prefix with current prefix: all 19 pre-existing test bodies unchanged. Read green.log: BUILD SUCCESSFUL; compileTestKotlin and test executed. Retained RED is compile failure for missing diagnosticBootstrap. No Gradle/Kotlin rerun because concurrent admin helper owns compilation; no Docker/load/dependency/Git mutation.

Frozen SHA-256:

- FinancialHeapGuard.kt: 06e673ff1b8428a755485313e5514f43ed9635594f62fc23259248fe7a9f484d
- FinancialHeapGuardTest.kt: b398ecd7e41473abe0c4e3930add848d1c37107ada6d0f0ffecf9c3d64d7ddff

## Open Questions And Residual Risks

Sampling can miss sudden allocations and does not bound native/RSS or prevent OOM, already stated in telemetry and contract. Factory validates numeric cohort, not real workload execution or frozen request identity; root must enforce those before calling it. Existing publication implementation/lifecycle reused without new runtime proof. Broader source/config/manifest/collector/supervisor integration and managed restart evidence remain pending.

Receipt was read after source inspection but before preliminary ledger was saved; strict receipt-before-ledger separation missed, disclosed in preliminary.md. Author rationale remained unread until after preliminary ledger. No author acceptance recommendation used as evidence.

## Verdict

**Ready** for frozen heap component candidate. Not bootstrap execution, runtime qualification, capacity qualification, complete E4 readiness or delivery approval.

## Recommended Next Actions

Root integrate factory through separately reviewed frozen bootstrap request/config/client boundary; preserve conventional calibrate/run conservative preflight refusal. Verify broader integrated candidate before any diagnostic load. Root owns docs/evidence/retention completion pass; reviewer edited only assigned review artifacts.
