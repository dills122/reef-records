# Fresh Review Bootstrap

Review instance: 1 of 3. Separate user-approved OCR config delivery unit; O1 internal
review cap remains 3 of 3 exhausted. Check narrow pilot coverage/budget fix and
unchanged trusted execution, review and test gates.

Repository/worktree: /private/tmp/reef-ocr-config-20261010
Branch: codex/ocr-calcify-review-budget
Base/HEAD: e69e62ada42c633b81f90ccf178680973b398b0c
Four dirty tracked files pinned by owned-files.json; owned.patch SHA256
3e721f170b1d32034e7683202a60a5c4a59b2935461532fbc61cabc6321ab786. Untracked .planning/ocr-config-delivery/ contains visible
verification/handoff artifacts, excluded from implementation path set.

In scope: .github/workflows/open-code-review-pilot.yml, .opencodereview/rule.json,
scripts/dev/ci-workflow-hardening.test.mjs OCR block only, docs/CI_OPERATIONS.md
pilot paragraph only. Read applicable AGENTS.md, AI_CONTEXT/docs map, pilot owner
section, delivery policy and repository steering. Trusted base and frozen diff
establish exact target. hosted-selection-fixture.json identifies original PR485
range and selected paths; focused result establishes config selection only.

Exclude Calcify source/proto/generated changes, main O1 integration, broker/SQL,
provider/secret access, hosted rerun/posting and Git mutations. No OCR execution.
Proportionate checks available:

```text
node scripts/dev/ci-workflow-hardening.test.mjs
node scripts/dev/script-surface-check.mjs
node --test scripts/ci/check-required-results.test.mjs scripts/ci/build-container.test.mjs
bun .planning/ocr-config-delivery/focused-coverage-check.mjs
actionlint .github/workflows/open-code-review-pilot.yml
git diff --check
```

verification.json retains commands, raw red/green logs and source hashes.
Author explanation separately in author-explanation.md. Record blind preliminary
ledger before reading it. Use $independent-review in reviewer mode, instance 1 of 3.
Check implementation and plan, run proportionate non-mutating checks, return
findings and evidence-backed verdict. Do not fix, dispatch another review, split
scope, mutate Git/network or invoke provider.
