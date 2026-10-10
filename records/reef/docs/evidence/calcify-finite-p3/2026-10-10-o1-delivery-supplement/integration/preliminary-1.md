# Preliminary integration review

Review instance: 1 of 3, separately declared final integration/delivery unit. O1 internal counter remains 3 of 3 exhausted.

## Independence
Read neutral-bootstrap-1.md, canonical accepted source contract/session plan, applicable repository instructions, current implementation/contracts/tests and owner docs before author-explanation-1.md or interpreted component reports/spikes. No implementation history inherited. Bootstrap discloses earlier unit readiness and boundaries; no prior finding reports digested yet.

## Ground truth
- HEAD `0a7df6f85c1f8636fdb74177afc49fa3eb14d8bd`, branch `codex/calcify-p3-overnight-2026-10-09`, actual merge base against target `e69e62ada42c633b81f90ccf178680973b398b0c`: `51cd90eee43d257bad4f973fc9bd81f273bb4ef7`.
- Three complete PR-range commits: O0D `7aba4d0af`, accepted O0 `45211653d`, O1 `0a7df6f85`. Target branch's five extra infra-only changes outside O1, absent reviewed diff.
- Every 70-path target-1.json SHA256 matches current bytes. All 67 tracked changed paths accounted; remaining three manifest paths are new checkpoint README, retention receipt and overnight handoff.
- Six tracked dirty docs, untracked `.planning/`, new `docs/evidence/calcify-finite-p3/` tree, retention receipt and handoff disclosed. Bulk proof subtree and scratch planning excluded from normal PR target; manager must explicitly stage 70 paths only.
- `git diff --check 51cd90eee` passes. No Git/source/network/broker/container mutations performed.

## Preliminary findings ledger
No actionable P0/P1/P2/P3 defect established in initial pass.

1. O1 boundary consistent: Go opt-in source field omitted in legacy mode; StartRunner and committed lifecycle replay refuse live activation; Kotlin runtime.run unconditionally refuses. Current contracts/owner docs state model-only, open durable ingress/binding/isolation/restart/resource/financial gates.
2. Capture path validates entire source record, copies immutable state and then forwards/stores; managed store reread avoids ahead-of-checkpoint cache. Fresh and certified history share attempted-command/result/trade semantics; replay uses deterministic member equality. Test sources cover fixture/zero trade, replay/malformed inputs, restore and compatibility; no test execution credited yet.
3. Current board/overview/checkpoint and resumed handoff preserve original missed deadline, unaccepted candidate and later O1 acceptance without relabeling old test scope or full P3 completion.
4. Plan/runtime differences explicitly deferred: model binding supplied by caller, producer request smaller than full state cap, broker EOS/process restart/SQL/ACL/durable history unproved. These remain activation gates, not defects against accepted O1 delivery slice.
5. Retention/readiness still to verify: publication manifest paths+hashes against exact local Records commit, append-only import, closed vs active selection, claim receipts and relative links. Records PR unmerged; Reef PR/OCR/hosted CI pending, no inferred pass.

## Verification limits
Graph-first lookup used installed codebase-memory: reef-main generation 2026-09-30T21:14:17Z roots different checkout. FiniteLifecycle lookup returned zero; coverage showed new Kotlin files missing and changed Go processor. All material new/changed runtime paths inspected directly; graph absence not treated as source absence. No Gradle lease, no slow financial harness, no 2GiB archive rescan. Next step author reconciliation and proportionate hash/link/retention checks.
