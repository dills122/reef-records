# E4-B physical collector independent review

Review instance: 1 of 3 (attempt 1, cycle 1). Verdict: **RevisionsRequired**; skill verdict equivalent: **Not ready**. Scope: collector component source/tests only; integrated E4-B and live financial qualification excluded.

## Findings

1. **P2 — Bind normalized inventory to actual API receipt contents.** `scripts/dev/calcify-financial/physical-evidence.mjs:104-115` validates normalized RF3 rows independently from opaque raw receipt hashes. Existing fixture `raw-api-reply` is not JSON yet passes. Reviewer changed every normalized size to999 while retaining same raw bytes; collection passed with2997 logical bytes. Hashing normalized object at publication does not establish correspondence to API facts. Parse a finite canonical operation-response receipt, derive normalized topics/replicas or compare exact semantic rows/errors/identities to raw contents. Require complete actual topic and log-dir operations; regression should reject changed size/identity or API error with unchanged raw receipt.

2. **P2 — Keep category allocations unknown until raw mapping proves path ownership.** `scripts/dev/calcify-financial/physical-evidence.mjs:72-80,122-126` accepts any evidence text whose hash matches; none binds broker/topic UUID/partition/path to actual directory evidence. Reviewer mapped all expected replicas to `/var/lib/redpanda/data/unrelated` using text `trust me`; source category passed as measured24576 bytes. Opaque independently asserted mapping is insufficient to validate E4-B category measurement. Require structured raw mapping receipt tying exact identities and path to checked actual mapping; until implemented, refuse mappings or retain unknown category. Add mismatched-directory/topic/incarnation controls.

3. **P2 — Omitted local resource categories must remain unknown.** `scripts/dev/calcify-financial/physical-evidence.mjs:66,119-128` permits empty/partial localResources and initializes every category to0. Reviewer empty manifest produced localStore/controllerJournal/proof all0 with no local allocation rows. Missing registration can be mistaken for measured absence; handoff acknowledges this gap. Emit explicit unknown for unregistered categories, or require all three registered categories before complete local-scope summary. Preserve aggregate scope labels and test empty/partial registration.

4. **P2 — Reject unsupported measured telemetry in validator.** `scripts/dev/calcify-financial/physical-evidence.mjs:135-162,176-177` collector initializes RSS/native/CPU unknown, but validator never checks telemetry. Reviewer replaced all with measured values and validation passed without telemetry receipts. Validated evidence can therefore carry invented measurements, conflicting with explicit unknown honesty. Freeze validated telemetry schema to unknown with prescribed reason until process-scoped receipts exist; reject missing/unsupported measured fields. Add mutation controls.

## Plan Review

Canonical E4-B finite manifest, exact RF3 cardinality, per-broker logical lengths distinct from allocated du bytes, frozen identities/images/named mounts, local canonical path checks, command receipts/units/executables, signed reclamation and bounded deadline behavior substantially covered. Findings block trustworthy collector publication. Actual Admin adapter/invocation and actual RF3 collection remain root-owned integration gates; not component scope defects. No live capacity or full-system claim supported.

Existing `docs/evidence/calcify-financial-sprint1/broker-profile.json` and `e3-verification-2026-10-05.json` establish prior resource limits and E3 scope, not evidence that this new collector has run. Raw historical bulk is in Records and was not fetched because review makes no historical comparison or benchmark conclusion.

## Author-Claim Reconciliation

| Claim | Evidence | Status / consequence |
| --- | --- | --- |
| Logical sizes never renamed allocation; negative delta retained | parseAllocatedKiB, summaries, physicalDelta, Node controls | Confirmed |
| Frozen exact resources and command receipts reject ownership drift | inspect and validatePhysicalEvidence, Node controls | Confirmed in tested cases |
| Actual Admin data supplied by caller; no live collector claim | no scoped adapter/invocation, handoff disclosure | Confirmed limitation; integration remains required |
| Raw JSON bytes/hash validates API evidence | validateInventory, opaque fixture and reviewer probe | Contradicted if interpreted as semantic evidence; finding1 |
| Category mapping provenance independently established before freeze | opaque evidence string, arbitrary-path reviewer probe | Unverified externally; validator cannot establish claim; finding2 |
| Omitted categories appear numeric0 | empty-local reviewer probe | Confirmed defect acknowledged in handoff; finding3 |
| RSS/native/CPU remain explicitly unknown | initialization and telemetry mutation probe | Collector defaults confirmed; validation boundary contradicts stronger claim; finding4 |
| Output-overrun control exists in named test | test body and handoff disclosure | Dedicated overflow case absent; no pass claimed for it |

## Verification Performed

- Read applicable AGENTS.md, AI_CONTEXT.md, docs/README.md, delivery/repository conventions, canonical E4 requirements and independent-review skill.
- Verified branch `codex/calcify-e4-readiness`, baseline scope and dirty state; concurrent ACK/supervisor/rate changes excluded. Scoped files untracked.
- Frozen source SHA256 `467755d0301abd7584f30c1400244075c190f89f176151eac75c0f1218db794c`; test SHA256 `47db513044e38f00af1da04caa9f37c3193f54e2546ac5029641c6d0ca931a76` matched.
- `node --test scripts/dev/calcify-financial/physical-evidence.test.mjs`:13/13 pass.
- `node .planning/calcify-e4-session-2026-10-05/reviews/physical-attempt1-cycle1/review-probes.mjs`: four unsupported evidence scenarios accepted, as described above. Script retained for reproduction; all external operations injected. Only existing symlink test touched temp paths.
- Blind preliminary concerns delivered to root before author packet, then retained in preliminary.md. Author explanation read afterward. No code edits, staging, commits, Docker, dependencies or Kotlin builds.

## Open Questions And Residual Risks

Real collector overhead and timeout feasibility with actual finite topic count remain unmeasured. Final serialized raw budget checked, but test named output overrun does not exercise overflow; proportionate regression desirable during fixes. Category encoding/changelog allocation/native/CPU/SQL/API scope unknown. Actual root integration must publish honest bounded live receipt results after component fixes.

## Verdict

**RevisionsRequired**, limited to collector component. No heavy architecture pivot required. Four bounded evidence-contract corrections plus focused controls before next review cycle.

## Recommended Next Actions

Implementation owner respond Accept, Dispute with evidence, or Defer with owner/rationale per finding. Correct same scoped component; fresh re-review for material evidence-contract changes within attempt1 cycle limit. Preserve all failed and corrected controls. Root owns integrated E4-B live receipt verification, docs and retention pass.
