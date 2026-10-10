# Independent OCR config review

Review instance: 1 of 3. User-approved config delivery unit. Separate Calcify O1 internal cap remains 3 of 3 exhausted. Blind preliminary recorded before author explanation or interpreted research. No fixes, new reviewers, source/Git mutations, provider/secret access or network writes.

## Findings

No actionable findings. Frozen branch `codex/ocr-calcify-review-budget`, base/HEAD `e69e62ada42c633b81f90ccf178680973b398b0c`, four dirty tracked paths and patch SHA256 `3e721f170b1d32034e7683202a60a5c4a59b2935461532fbc61cabc6321ab786` match handoff. Source-before/source-after receipts prove owned bytes unchanged. Untracked `.planning/` remains visible and outside implementation scope.

- `.github/workflows/open-code-review-pilot.yml:38`: only budget literal changes `500000` -> `1500000`; independent byte comparison allows exactly replacement. Model/effort/concurrency, action/CLI pins, trusted `pull_request_target`, label/draft/event guard, permissions/secret reference, 45-minute timeout, sticky/incremental/checkpoint and artifact behavior unchanged.
- `.opencodereview/rule.json:3`: exact generated Calcify Java `v1` subtree excluded. Includes, docs/reports exclusions and empty language-rule overrides unchanged. Neighboring Java domains/version paths, Go/Kotlin and schema paths survive.
- `scripts/dev/ci-workflow-hardening.test.mjs:179-222`: added literal policy/trust assertions plus generated examples and all 17 retained paths. Exact rule-array assertion rejects broader/missing exclusions or removed includes. Prefix helper accurately handles current three literal `directory/**` patterns; it is not a general glob evaluator. Independent Bun glob checks and upstream selector inspection cover review semantics without expanding repository test surface.
- `docs/CI_OPERATIONS.md:89`: owner paragraph reflects exclusion/budget, retained handwritten/schema reviewability, unchanged generated governance gates, partial coverage/exit-status limit and checkpoint invalidation. No runtime/contract/generated implementation changes.

## Plan Review

Approved narrow plan implemented: generated Java exclusion, soft 1,500,000 budget, focused OCR test and owner paragraph updates. Source/proto/generated Calcify behavior excluded from config unit; product tests unnecessary for this frozen config-only patch. Existing trusted execution and CI/governance paths preserved.

Plan ordering sound: manager obtains CI for exact config head before trusted-base merge; only landed trusted workflow/rules affect PR485 retry. Actual hosted manifest must validate range and selection/completion afterward. Config review does not satisfy those later gates or reopen O1 internal review.

Delivery/retention: continuously maintained owner paragraph updated; no superseded standalone record removed/restored. No-op rationale in author packet fits retention policy. Manager owns final PR no-op record and active receipt publication/retention. No system/API/event/scenario guidance changes required for review configuration.

## Author-Claim Reconciliation

| Claim | Evidence | Status / consequence |
| --- | --- | --- |
| Original hosted selection 48, completed 0, grouping 1,863; first estimated group 896,928 rejected by 500,000 | Raw cached `failed-result.json`: 48 selected/failed(budget), no completed/reused; warning projected 898,791 | Confirmed; prior exit/summary cannot establish coverage |
| Exclusion projects 17 retained / 31 Java omitted / seven tests kept | Fixture selected paths match raw manifest; independent Bun glob arithmetic and default-exclusion checks | Confirmed projection, not new OCR run |
| Includes bypass defaults, not whitelist; generated Go defaults unchanged | Pinned upstream `selection.go:68-101`, `system_rules.go` FileFilter, default pattern JSON; seven tests match both include and default exclusion | Confirmed; exclude wins before include; binary/secret gates precede both; diff-size gate remains |
| Trust and review axes unchanged | Frozen diff and exact workflow-byte comparison | Confirmed; no new security/execution boundary |
| Rule/budget change forces full checkpoint range | Pinned `action.yml:738-746,833-890`: budget and local-rule digest fingerprinted; `:203-211` describes fail-closed config change | Confirmed; existing checkpoint behavior preserved |
| Budget does not guarantee completion/cost ceiling | Pinned Action input, agent dispatch/between-round gates and estimate heuristics | Confirmed; in-flight/final work can exceed threshold; actual usage required |
| Remaining proxy 749,316 establishes headroom | Author explicitly calls byte-quarter proxy, not BPE/billing; upstream estimate labels rough floor and tool inflation | Numerical proxy not independently recalculated; no dollar/completion claim accepted and no code/docs dependency on exact proxy |
| Claimed focused checks passed | Independent reruns plus author raw log SHA256 checks | Confirmed; actual hosted execution not claimed |

## Verification Performed

All exit 0; own raw logs and hashes in `verification.json`:

- `node scripts/dev/ci-workflow-hardening.test.mjs`
- `node scripts/dev/script-surface-check.mjs`: 280 scripts, 268 Node/11 shell syntax checks; existing Deno TS syntax skip.
- `node --test scripts/ci/check-required-results.test.mjs scripts/ci/build-container.test.mjs`: 12 tests, zero failures/skips.
- `actionlint .github/workflows/open-code-review-pilot.yml`
- `git diff --check`
- `bun .planning/ocr-config-delivery/review1/focused-coverage-check.mjs`: raw fixture provenance, 17/31/7 glob projection, test default bypass, generated Go default, neighboring path boundaries and exact workflow budget-only comparison.

Source hashes/diff checked before and after. Cited cached upstream source blobs independently matched immutable `bccbc15f785269400735d5255540c231e6c02b6d` tree. Additional immutable public [selector source](https://raw.githubusercontent.com/alibaba/open-code-review/bccbc15f785269400735d5255540c231e6c02b6d/internal/agent/selection.go) fetched into own receipt, Git blob `771c616f9c21f475eb9895aec49fa6d0b1924f13` verified. Initial web cache miss and sandbox DNS failure corrected with authorized read-only public fetch; no provider or secret involved.

Serena manual read. Codebase-memory project list and coverage used: exact temporary root unindexed; nearest `reef` graph September 28 at different checkout, four paths freshness missing. Frozen direct source/diff fallback establishes conclusions; graph makes no exhaustive coverage claim.

## Open Questions And Residual Risks

Soft budget/headroom and selected set predict feasibility, not completion. No exact tokenizer/provider billing or actual OCR preview/run performed. Original result metadata reports v1.12.13 while workflow CLI pin is 1.12.9; retained discrepancy, no inferred upgrade. Pin and semantics were checked against exact Action source; manager must capture actual executable version on retry.

Generated Java still excluded from AI review after future manual edits inside generated subtree; regeneration/additive/drift/golden checks remain necessary. Unchanged default filters omit generated Go and some fixtures; config unit makes no whole-PR coverage claim.

## Verdict

**Ready** — frozen four-path config patch ready for manager's CI gate. Verdict covers implementation and narrow accepted plan; does not assert CI/merge success, PR485 hosted coverage, O1 readiness or billing ceiling.

## Recommended Next Actions

Manager accept/dispute/defer report; preserve same frozen patch in config PR, obtain required CI, merge trusted base only after gate, then authorized PR485 retry. Verify trusted config/pins/version and exact full range; compare expected retained set to actual selected/completed/reused/failed/waived items. Any partial handwritten coverage remains explicit delivery gap. No further review instance dispatched.
