# Independent OCR config recovery review

Review instance: 2 of 3. Same approved config recovery flow; no reset. O1 cap remains 3 of 3 exhausted. Fresh reviewer context; neutral bootstrap read first, preliminary ledger written before author explanation. No earlier review judgment read. Earlier review cache used only for primary upstream selector and provenance, independently checked against pinned tree blob.

## Findings

No actionable findings. Supported updater opt-out correctly applied to sole pinned Action step before first CLI invocation. Complete four-path config recovery remains narrow and coherent.

Scope independently reconstructed: `/private/tmp/reef-ocr-config-20261010`, branch `codex/ocr-pin-disable-auto-update`, original trusted base `e69e62ada42c633b81f90ccf178680973b398b0c`, HEAD/merged first fix `ed76dd6b196731c454c0868f966424c491f33954`, plus frozen three-path dirty follow-up. Four owned file hashes match `owned-files.json`; actual Git combined patch SHA256 `c5d1d34957fe53bdb8abf650dad4886bf818798ea71200710255932206e21fdb`; dirty delta SHA256 `cb30366b9624477c880b749a56772df80aef4c10b4da99cc4e148c1e9771fccf`. Rule unchanged since first merged fix. Planning artifacts untracked and excluded from source target. Final source recheck passed.

Material implementation evidence:

- `.github/workflows/open-code-review-pilot.yml:26-30`: immutable action SHA `bccbc15f785269400735d5255540c231e6c02b6d`, step `env: OCR_NO_UPDATE: '1'`, npm version `1.12.9`. Outer step environment belongs to composite execution and is inherited by subprocesses; pinned inner Action env maps do not overwrite this key. Install script selects exact OCR_VERSION/package version; action runs npm install, then first `ocr version`, then multiple config commands, then review. No new wrapper, PR-code step or mutable dependency pin.
- Primary pinned npm `bin/ocr.js:89-109`: nonempty `OCR_NO_UPDATE` bypasses detached updater launch; native child still receives environment at lines112-115. `scripts/update.js:138-159`: absent opt-out, updater reads installed version, fetches registry latest and globally installs newer package. VM witness executes actual frozen launcher source with mocked filesystem/process/spawn only: default updater+native, opt-out native only. This proves branch behavior; it does not reproduce runner/package interleaving.
- `.opencodereview/rule.json:3`: exclusion confined to generated Calcify Java namespace. Pinned `internal/agent/selection.go:70-101` gates binary/secret, user exclusion, user include, extension/default paths in that order. Includes remain bypasses, not whitelist. `selectFiles:43-62` retains separate deletion and size gates. Pinned `system_rules.go:231-261` uses case-insensitive doublestar matching. Original fixture48 → modeled17 retained/31 excluded, seven service tests still included. All31 excluded paths independently read from original review head `1dee92a64cc86e58ae5fcff98f9f6118533e2bfd` and contain protobuf generated marker. Hosted selection/size gate not rerun.
- Workflow model, medium effort, concurrency2,45min timeout, trusted-base event/checkout, opt-in condition, least privileges, checkpoint mode and artifact policy preserved. Pinned action `action.yml:410-432` checks out trusted base and fetches head Git objects. `action.yml:833-846,870-895` fingerprints local rule, actual version and budget; rule/budget changes invalidate prior checkpoint equivalence. No new PR-source execution or secret handling.
- `scripts/dev/ci-workflow-hardening.test.mjs:169-224`: trust and pin checks retained; exact step opt-out/count, budget and generated-only boundaries enforced. Prefix helper is intentionally bounded to current literal `/**` rules; actual selector source inspected separately. Actual two updater assertions accept frozen workflow and reject previous merged workflow, empty value and duplicate declaration.
- `docs/CI_OPERATIONS.md:85-89`: owner explains generated exclusion, retained source/tests/contracts, opt-out before CLI calls and coverage limits. Budget lift500000 →1500000 does not establish provider cost ceiling or completed review. Pinned agent uses estimate gate before group dispatch, round checks and main-loop stopping; in-flight work can overrun. Documentation correctly requires selected/completed/failed counts.

## Plan Review

Approved recovery implemented as full bounded unit: original generated coverage reduction/budget lift plus follow-up preventing launcher from replacing installed pin. No product/source/API/scenario change, no altered model/effort/concurrency/security gate, no architecture pivot. Small local YAML/JSON/test/owner-doc changes fit repository conventions and delivery policy.

Regression coverage appropriate for config change; existing test file reused. Exact workflow byte comparison confirms only budget and updater env differ from original base; dirty delta only updater env. Generated source remains subject to existing regeneration/drift/additive/golden checks; new OCR exclusion does not waive those gates.

Delivery sequence remains sound: independent review → actual required CI on follow-up → trusted-base merge → separately authorized hosted PR485 review → inspect executed pin and full expected coverage. Review verdict does not satisfy later hosted acceptance. User-approved merge remains manager-owned. No review-cap reset, additional reviewer or workstream created.

Retention no-op reasonable: continuously maintained pilot owner paragraph updated, dated link remains scoped, no standalone tracked record superseded by three-path follow-up. Active delivery packets remain session evidence; manager still owns final PR/handoff retention statement and any evidence publication required at closure. Broader runtime/guidance/contracts do not change; no mechanical overview edits needed.

## Author-Claim Reconciliation

| Author claim | Evidence inspected | Status | Review consequence |
| --- | --- | --- | --- |
| Launcher can background-update exact installed CLI during later invocations | Pinned launcher89-109, updater138-159; npm tarball/primary byte equality; offline VM | Confirmed hazard | Opt-out addresses evidenced source behavior. Exact hosted filesystem interleaving remains inferred. |
| Hosted retry first installed1.12.9 then failed missing `../scripts/platform` | Frozen failure excerpt records version then MODULE_NOT_FOUND | Confirmed observations | Does not by itself prove race causation; no causal certainty added. |
| Step opt-out precedes installer version/config/review and preserves pins | Workflow26-30; pinned composite install/config/review flow; no key overrides | Confirmed configuration/source semantics | Actual hosted env inheritance and executed pin remain unverified operationally. |
| Published npm1.12.9 agrees with pinned source for launcher/updater/platform | Local tarball SHA512 agrees published metadata; npm gitHead; Git blob hashes bind source/tree | Confirmed retained provenance | Public bytes not freshly fetched; no install/provider access. |
| Original selection becomes17 with31 generated exclusions, seven tests preserved | Fixture, independently rerun Bun glob witness, actual pinned selector/source,31 markers at original head | Confirmed config witness | Expected selection only; no claim of actual complete hosted selection or review. |
| New regression first red then green, full focused checks passed | All six author raw-log hashes match verification.json; red assertion shown; independent guard/actionlint and sensitivity checks pass | Confirmed retained evidence and repeated narrow checks | Required-results/build-container12tests and script-surface checks were not independently rerun; passing author logs retained. |
| Research initial harness errors retained; exact interleaving inferred | Author admission; harness source inspected | Harness history not independently audited | No effect on corrected safe VM result or final readiness. |
| Hosted successful OCR remains unverified; CI/base merge/17completed gate still required | No success evidence supplied or asserted; author self-audit and owner coverage warning | Confirmed limitation | Continue authorized delivery; do not mark OCR recovery operationally accepted yet. |
| Retention needs no repository record move for new delta | Three changed paths and continuous owner documentation; retention policy | Confirmed scope rationale | State no-op in PR/handoff; active packet closure still manager responsibility. |

## Verification Performed

Independent commands, all exit0:

- `node scripts/dev/ci-workflow-hardening.test.mjs` — complete CI hardening guard passed.
- `actionlint .github/workflows/open-code-review-pilot.yml` — no diagnostics.
- `node /Users/dsteele/.codex/worktrees/fa2b-0041/reef/.planning/calcify-p3-overnight/delivery/ocr-install-spike/offline-launcher-proof.cjs` — updater suppressed;0provider/0network/0real child calls.
- `bun .planning/ocr-config-delivery/followup2/review2/focused-coverage-check.mjs` — author witness copied only to reviewer directory, output destination adjusted;48→17,31generated excluded,7test includes, exact workflow base/merged byte comparisons.
- `git diff --check` — clean.
- Reviewer inline Node assertion-sensitivity harness — actual two updater assertions reject prior merged/no-opt-out, empty-opt-out and duplicate declaration; current accepted. No owned source mutation.
- Reviewer inline Python provenance/scope checks — owned hashes and patch hashes; npm tarball SHA512; pinned source Git blobs/action/filter/agent/selector;31generated markers at original review head; author log hashes; final owned hashes all pass.

Evidence files: `preliminary-ledger.md`, `scope-check.json`, `upstream-provenance.json`, `reconciliation-checks.json`, `combined.patch`, `new-delta.patch`, `ci-hardening.log`, `actionlint.log`, `offline-launcher.log`, `focused-coverage-check.mjs`, `focused-coverage-result.json`, `focused-coverage.log`, `assertion-sensitivity.log` under this report directory.

## Open Questions And Residual Risks

Actual hosted success not established. Runner/npm/native installation, provider availability, selected/completed/failed/skipped coverage and timeout/budget outcome require authorized hosted evidence after base merge. VM mocked subprocesses do not prove timing or package lifecycle. Exact failure race remains plausible inference. Source-selector inspection plus fixture glob test is not an actual OCR selector run; deletion/size/default filters stay unchanged. Budget is dispatch/round control with possible in-flight overrun; threefold lift may increase permitted spend and still miss full review.

Graph project `reef` points other checkout, generation2026-09-28; `check_index_coverage` freshness missing for all four paths. Current-source fallback used throughout. No graph absence/completeness claims, no reindex. No Git/provider/network mutation, package install, OCR/provider execution, secret access, or source edits. Only own evidence written under followup2/review2.

## Verdict

**Ready** — bounded full four-path config recovery and same-flow three-path updater follow-up ready for authorized delivery with actual CI gate. No readiness claim for hosted PR485 OCR acceptance. Review cap **2 of 3 consumed; one instance remains**, manager decides whether later material correction warrants final instance. O1 cap3of3 unchanged; no reset.

## Recommended Next Actions

Manager retain review receipt, complete actual follow-up CI, merge trusted-base config through approved process, then inspect separately authorized hosted PR485 OCR result for pinned1.12.9, selected17/completed17/failed0 and explained skipped paths before declaring operational recovery accepted. Preserve current failure/race attribution limits and final retention no-op in PR/handoff. No extra review needed absent material implementation change.
