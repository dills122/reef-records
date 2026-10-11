# Fresh Review Bootstrap

Review instance: 1 of 3. Unit O0D.

## Review Objective
Review documentation reconciliation against current source, contracts, Git history and retained evidence. Assess O0 documentation corrections from overnight session plan, accuracy of current/historical boundaries and retention checks. Read-only review; no fixes or new reviewer dispatch.

## Repository And Worktree
/Users/dsteele/.codex/worktrees/fa2b-0041/reef

## Base, Head, Branch, And Dirty State
Base/head at freeze: 51cd90eee43d257bad4f973fc9bd81f273bb4ef7.
Branch: codex/calcify-p3-overnight-2026-10-09.
Working-tree boundary only. freeze.json records exact path SHA256/size; frozen.diff records patch; dirty-state.txt captures other ongoing changes. Check identities before review. Unrelated ongoing changes excluded, not hidden.

## In-Scope Commits And Paths
No new commits. Review only six documentation paths plus manager-owned retained inventory correction:
- docs/README.md
- docs/RECORDS_RETENTION.md
- docs/work/CALCIFY_PHASE2_IMPLEMENTATION.md
- docs/work/CALCIFY_SYSTEM_ARCHITECTURE_RFC.md
- docs/evidence/calcify-financial-sprint1/README.md
- docs/work/handoffs/2026-10-04-calcify-financial-sprint1-recovery.md
- docs/records/retained-evidence.json

## Canonical Requirements And Plan
AGENTS.md, docs/AI_CONTEXT.md, docs/ENGINEERING_DELIVERY_POLICY.md, docs/RECORDS_RETENTION.md; docs/work/CALCIFY_OVERNIGHT_SESSION_PLAN.md documentation-review correction rows and O0 scope. Current behavior contracts in contracts/calcify/README.md; current source/tests and immutable evidence are ground truth. WORK_PLAN execution status is context, outside diff scope.

## Explicit Exclusions
No source, runtime, API, protobuf, database, accepted ADR or deployment edits. Other workers' spec/source changes, manager WORK_PLAN launch entry and overnight plan publication are excluded. Do not adopt RFC financial authority, relabel measured target failures, reopen exhausted prior review budgets or delete originals. No runtime qualification rerun for prose. Review packets themselves are operational artifacts, not product claims.

## Verification Commands Available To Reviewer
- git diff --check -- <in-scope paths>
- bun scripts/ci/check-records-retention.mjs
- Git show/log and direct source/test/evidence reads relevant to changed claims.
- Local file/heading link check; verify immutable original URLs retained.
No need for broker, DB, Docker or production tests. Graph reef-main is September30 at another root; coverage for relevant newer paths stale/not tracked. Read exact source for material claims.

## Author Explanation Location Or Delivery Step
Record preliminary concerns after bootstrap/diff/source inspection BEFORE reading author.md in this directory. Then read author.md as testimony and reconcile claims. Produce read-only report in this directory or return report text to manager; do not edit reviewed files.

Use $independent-review in reviewer mode. This is review instance 1 of 3. Work from the Fresh Review Bootstrap first and record a preliminary review before reading the Author Explanation. Then verify the explanation against the repository, review both implementation and plan, run proportionate non-mutating checks, and return an evidence-backed verdict. Do not implement fixes, create further review instances, or split work into new workstreams.
