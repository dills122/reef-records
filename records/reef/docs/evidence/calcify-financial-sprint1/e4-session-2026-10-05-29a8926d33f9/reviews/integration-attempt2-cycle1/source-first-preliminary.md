# Source-first preliminary review

Review instance: 1 of 3; E4 integration Attempt 2, cycle 1.

Independent source-first pass; author report/research memo not yet read. Neutral parent bootstrap disclosed failed runtime admission and numeric-boundary challenge; this disclosure limits blindness on that narrow issue. No implementation conversation inherited.

Scope: exact24 paths in review-preparation/source-frozen-attempt2-cycle1.json, each SHA256 verified equal. Base/HEAD29a8926d33f9e2dc7278a1676a6fa3272628de3c; branchcodex/calcify-e4-readiness; dirty tracked/untracked implementation present. Five tracked owner-doc drafts excluded from delivery judgment. Operator files/run artifacts outside frozen source excluded.

Read AGENTS.md, AI_CONTEXT.md, documentation map, canonical planning/requirements.md, current WORK_PLAN E4/E3/heap sections, Kotlin/repository steering, delivery policy, relevant RFC replay/proof context and throughput ledger. Inspected all integrated component source, changed-path diffs, bootstrap/physical/journal/supervisor/rate tests.

Preliminary findings: no demonstrated actionable defect. Checked strict numeric conversion in validateBootstrapCapability: frozen IntNode/actual LongNode compare only after integral/range validation, exact805306368 pin preserved. Journal source facts/index/witness/publication forced in batches; callbacks/forced frontier/controller admissions separate; historical membership disk-backed, original clocks scoped, no recovered admissions fabricated. Bootstrap actual worker/observer/replay consumes durable journal. Physical exact topics/UUID/replicas and actual Admin rows separate from allocated du; unknown category/RSS/native/CPU explicit. Owned-group supervisor starts before main JVM and continues through close/recovery/publication.

Concerns pending reconciliation:
- Actual fresh bootstrap and current-candidate49-arm proof must be repeated after numeric code/build change. Tests prove validation seams, not successful live diagnostic.
- Runtime primary/recovery bootstrapGuard paths must retain raw candidate/E3/classpath/config binding. Cross-language raw artifact shapes require final scrutiny.
- Fixed bootstrap is empirical; source pipeline sends bounded async cohort in order. Need reconcile canonical wording serial1000-trade with actual scope rather than infer single-in-flight semantics.
- Conventional calibrate/run still retain legacy logical-byte aggregate helpers. Ensure no new bootstrap assessment promotes those to measured allocated category cost.
- New JVM restores existing state directory, certifies full cut before activation, publishes no fresh economic result. Distinguish this from cold new-directory restore and rate-arm restart certification.

Verification: node --test scripts/dev/calcify-financial/bootstrap-calibration.test.mjs scripts/dev/calcify-financial/physical-adapter.test.mjs scripts/dev/calcify-financial/physical-evidence.test.mjs scripts/dev/calcify-financial/proof-supervisor.test.mjs scripts/dev/calcify-financial/rate-proof.test.mjs scripts/dev/calcify-financial/rate-supervision.test.mjs:125/125 pass, zero failures/skips,9.338s. git diff --check29a8926d:pass. No Gradle/build/broker workload executed; root owns active build and later workload.
