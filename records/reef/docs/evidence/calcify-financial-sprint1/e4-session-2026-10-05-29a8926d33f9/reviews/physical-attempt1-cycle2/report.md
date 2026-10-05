# E4-B physical collector cycle2 independent review

Review instance: 2 of 3; attempt1 cycle2. Verdict: **Ready**, scoped to two-file collector candidate. No integrated E4-B, live RF3 receipt or capacity qualification implied.

## Findings

No actionable findings remain in scoped source/tests. All four cycle1 P2 findings closed:

- Normalized logical inventory now binds to parsed finite canonical describeTopics and describeLogDirs receipts. Exact frozen requests, topic UUID/partition/replica assignments, broker set, log-dir errors, finite selected replicas and logical sizes checked. Recomputed hash cannot hide semantic mismatch.
- Nonempty categoryMappings refused. Source/changelog/output category allocation remains unknown/null; arbitrary hashed mapping text never promotes measurement.
- Missing local categories explicit unknown/null; registered measured0 remains distinct. Aggregate scope explicitly limited to registered paths.
- Validator enforces exact supported unknown RSS/native/CPU values; invented measured telemetry rejected.

## Plan Review

E4-B collector boundary now covers exact three owned broker IDs/images/labels/named mounts; finite exact RF3 topic identities; actual raw-to-normalized logical inventory correspondence; measured per-broker root and registered local du allocation; explicit unknown category/native/RSS/CPU scope; freshness/deadline/error/raw-budget guards; signed reclamation with no fabricated per-trade cost. Changes local, test-only, no production behavior or architecture pivot.

Canonical requirements still require root-owned actual Admin serialization/collector invocation and actual supervised RF3 receipt proof. This component consumes supplied raw API records; it cannot authenticate fabricated input origin. Frozen adapter source/build/provenance and live verification must establish actual-response origin. Category-specific allocation deliberately unavailable until verified directory mapping exists. These are explicit integrated gates, not claimed as component completion.

## Author-Claim Reconciliation

| Author cycle2 claim | Evidence | Result |
| --- | --- | --- |
| All four P2 findings accepted and closed | source,18 controls, independent previous-failure probes | Confirmed |
| Exact two Admin operations derive normalized inventory | validateInventory; normalized-size mutant, missing replica/error/duplicate log-dir/topic-error probes | Confirmed |
| Nonempty category mapping refused | freezePhysicalManifest, old arbitrary-path reproduction | Confirmed |
| Missing local categories unknown, measured0 distinct | summaries, empty/partial/zero controls | Confirmed |
| Unsupported telemetry rejected | validatePhysicalEvidence, prior invented measurement reproduction | Confirmed |
| Frozen lower budget bounded by existing256MiB threshold | freezePhysicalManifest/collector/validator;1024-byte refusal control | Confirmed |
| Prior RED12/17, first GREEN16/17, corrected GREEN18/18 | cycle2-red-review-findings.txt, cycle2-green-attempt1.txt, cycle2-green-attempt2.txt | Confirmed |
| Actual Admin adapter/live collection not completed | scoped two files and explicit handoff limits | Confirmed limitation |

## Verification Performed

Source-first cycle2 inspection and preliminary message before revised author handoff read. Inherited cycle1 reviewer context intentionally retained for bounded remediation cycle; this is not another fresh independent reviewer instance.

- Frozen implementation SHA256 `3591634ab38f7a6d6e65663ba14d1a2a99641549e04777010ecf7e3c42672a54`; tests `52c69bc8d10e305abb64e9c575c7de3e8806d6cd6ea1edb735b9b130366ad865`. Verified before/after review.
- `node --test scripts/dev/calcify-financial/physical-evidence.test.mjs`:18/18 pass.
- `node .planning/calcify-e4-session-2026-10-05/reviews/physical-attempt1-cycle2/review-probes.mjs`: four prior P2 scenarios closed; additional rehashed raw missing-replica, replica-error, duplicate-logDir and topic-error cases reject.
- Worker red/green/freeze/syntax receipts inspected. No unexecuted tests credited.
- Scoped source/tests unchanged. No Docker, Kotlin/build/dependency, staging/commit or root supervisor/runtime review performed.

## Open Questions And Residual Risks

Actual bounded collection latency/overhead unmeasured. Root adapter must serialize actual Admin objects, preserve errors and clock scope, and supply finite canonical JSON requested by collector. Receipt schema is test-only capture representation, not Kafka's wire representation. Root integration must preserve raw proof budget for retained live/failure artifacts. Source/changelog/output physical category encoding, native/CPU telemetry, SQL/API and full-system capacity remain unknown/excluded. No mock control establishes actual broker resource measurement.

## Verdict

**Ready** for collector component candidate at stated source hashes. Integrated E4-B remains pending actual root-owned adapter and supervised live receipts.

## Recommended Next Actions

Root integrate exact frozen component and canonical raw producer, execute bounded owned RF3 verification, retain every attempt/correction, update owner docs and retention. Material changes to this component after freeze require review within remaining cycle allowance; no further cycle needed for unchanged candidate.
