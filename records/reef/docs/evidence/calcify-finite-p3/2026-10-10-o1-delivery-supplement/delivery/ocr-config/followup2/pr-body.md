## Summary
Pinned OCR 1.12.9 starts a detached npm auto-update during version/config commands, which can replace the installed CLI before later subprocesses. The Calcify retry installed 1.12.9, then failed with `Cannot find module ../scripts/platform` while an npm updater remained alive. Set `OCR_NO_UPDATE=1` on the pinned composite-action step so its install, version, config and review commands inherit the opt-out.

## What Changed
- Preserve action and CLI pins, trusted-base execution boundary, model, medium effort, concurrency, timeouts, checkpoint behavior and 1,500,000-token budget established by #486.
- Add a failure-sensitive workflow guard and update pilot operations guidance.

## Validation
- New updater-disable regression failed before workflow correction, then passed.
- Workflow hardening, 280-script surface check, 12 required-results/container helper tests, actionlint and exact 48-to-17 selector witness passed.
- Offline pinned-launcher proof: default starts updater plus native CLI; opt-out starts native CLI only. Exact hosted filesystem interleaving remains inferred.
- Independent config review 2 of 3: Ready, no actionable findings; fresh blind preliminary pass and primary-source verification. Author/manager accept. Hosted required CI remains pending and must pass before merge.

## Scope Notes
Human approved bounded trusted-base OCR recovery and merge after review/CI. This follow-up continues the same config review flow; it does not reset its three-instance limit. Calcify source PR #485 remains unmerged; actual hosted 17-file review coverage remains pending. Retention pass: current owner paragraph updated; dated receipts retained for the O1 delivery supplement; no superseded repository-owned records introduced by this delta.
