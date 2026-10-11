# OCR config author explanation

## Intent and plan

PR485 hosted OCR selected 48 but completed 0: grouping used 1863 tokens, first
estimated group 896928 exceeded literal 500000 budget. User approved narrow trusted
base fix, independent config review and actual CI before merge, then new hosted
review of unchanged Calcify head. No identical retry or fourth O1 internal review.

## Approach and responsibilities

Workflow changes only budget 500000 to 1500000. Model, medium effort, concurrency 2,
action/npm pins, ready/label guard, trusted trigger, 45-minute timeout, permissions,
secret reference, no PR execution, sticky/incremental/checkpoint behavior unchanged.
Exact baseline workflow comparison passes.

Rule adds only generated Calcify Java directory exclusion. Existing Go/Kotlin test
includes, docs/reports excludes and default language rules unchanged. Generated Go
already excluded by built-in rule. Original handcrafted selection retains all 17:
9 Go, 6 Kotlin, 2 contracts, including 7 tests. Generated regeneration/additive/drift
and golden gates remain required; exclusion does not waive these tests.

Existing CI hardening OCR block pins literal budget, effort, trust conditions and
rule array; tests all 17 handcrafted paths, representative generated Java exclusions
and another domain's Java remains reviewable. Surrounding assertions unchanged.
Focused Bun fixture matches all 48 original hosted paths, confirms 31 generated
excluded, 17 retained, 7 test include overrides and only budget bytes changed in
workflow. CI Operations pilot paragraph updates policy and partial coverage warning.
No service/runtime/contract changes.

## Evidence and self-audit

Old guard expected deepEqual failed after config change, before guard update; red
retained. Updated full CI hardening green. Script surface checked 280 scripts:
268 Node and 11 shell checks, one existing Deno TS syntax skip. Twelve required
result/container driver tests passed. Actionlint, focused 48-to-17 selection and
diff checks passed. Commands/log/source hashes retained. No OCR/provider/secret
access, network calls or product tests during implementation. Config checks do not
establish actual hosted review completion.

Graph positive guard lead only: reef-main September 30, different checkout, guard
metadata changed. Current source establishes conclusions; no completeness claim.
Four implementation files frozen, manager sole Git writer. Retention no-op: live
owner paragraph updated; no superseded record copied or deleted. Active receipts
needed for delivery; manager owns final publication/retention and PR range checks.

## Limits and challenge points

Remaining byte-quarter cost proxy 749316 is neither exact BPE nor billing. Budget
1500000 gives headroom but cannot guarantee 17/17 completion or hard dollar cap.
In-flight/final-round work can exceed threshold. Actual hosted manifest must prove
expected selection and range, completed/reused coverage, no failed/waived handcrafted
items. Exit 0 alone insufficient. Rule/budget fingerprint change forces full range.
Actual CI, approved base merge and new trusted trigger remain manager gates.
No author Ready verdict or merge claim.

Challenge narrow exclusion, include bypass semantics, fixture provenance and soft
budget. Original CLI version 1.12.9 versus result metadata 1.12.13 mismatch remains
explicit research limit; pins unchanged, no inferred upgrade. Findings return for
Accept/Dispute/Defer and bounded corrections; complete config unit default cap 3.
