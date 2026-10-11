# Fresh Review Bootstrap

Review instance: 2 of 3. Unit: O0 source contract/alignment.

## Review Objective

Review finite source contract for implementability, scope, compatibility, lifecycle
coverage, bounded closure, durable ingress/restore, acceptance cases and integration
plan. Planning review only; no code implementation or live proof claimed.

## Repository And Worktree

`/Users/dsteele/.codex/worktrees/fa2b-0041/reef`.
Read repository AGENTS, AI context and task-relevant steering; activate Serena and
read manual. Use installed codebase-memory skill for structural exploration, with
source fallback for stale/unsupported coverage. Graph reef-main generationSep30
roots different checkout; current source is authoritative.

## Base, Head, Branch, And Dirty State

Code baseline `51cd90eee43d257bad4f973fc9bd81f273bb4ef7`.
Branch `codex/calcify-p3-overnight-2026-10-09`. Manager may integrate concurrent
independently reviewed documentation while this read-only review runs; verify
current HEAD/history and unchanged baseline code before relying on source.
Target is explicit new-file boundary, not entire dirty worktree.

## In-Scope Commits And Paths

Only `docs/work/CALCIFY_FINITE_P3_SOURCE_CONTRACT.md` and frozen
`.planning/calcify-p3-overnight/o0/source-contract.patch`.
Spec SHA256 `eec721aa60c1b64a7bada0a973b7b5d4e77510454e9e853fcd8a6a6f8f7c6739`.
Patch SHA256 `a5da8d8937c1f31948d6867b0389bbf2442a5f25de0122ef53425ebe01ff500f`.
Patch is `git diff --no-index /dev/null` against new spec, expected exit1.
These review packets accompany target but are not repository runtime requirements.

## Canonical Requirements And Plan

- `docs/work/CALCIFY_OVERNIGHT_SESSION_PLAN.md`: O0/O1/O2 dependencies and gates.
- `docs/WORK_PLAN.md`: current finite P3 scope/status; execution board only.
- `docs/work/CALCIFY_SYSTEM_ARCHITECTURE_RFC.md`: §5.1/5.2/5.3, §8.1, §10 P3, §11.
- `contracts/calcify/README.md`, `contracts/proto/calcify.proto`, finite P0 fixture.
- `docs/steering/inter-service-communication.md`, `external-api-boundary.md`, Go/Kotlin.
- Current Go source profile, streamdirect processor/checksum/snapshot and Kotlin
  Calcify parser/resolver/pipeline, stream intake and HTTP durable-ack code.

## Explicit Exclusions

Concurrent docs reconciliation, session ledger and overnight plan publication are
outside target. No financial authority adoption, production migration, reservations,
netting, external effects, rate qualification, broker startup or mutation. Reviewer
must not edit source/spec, create new streams, reset review cap or dispatch work.

## Verification Commands Available To Reviewer

`git status --short`, `git log -5 --oneline`, `git diff --check`,
`shasum -a 256 docs/work/CALCIFY_FINITE_P3_SOURCE_CONTRACT.md .planning/calcify-p3-overnight/o0/source-contract.patch`.
Bounded source reads and checks for exact claims. No tests required for new prose;
do not convert baseline tests into implementation proof.

## Author Explanation Location Or Delivery Step

First inspect spec, requirements and actual code, record preliminary concerns.
Then read `.planning/calcify-p3-overnight/o0/author-explanation.md`.
Do not load earlier review/spike/attempt1 packets before preliminary pass.
Return report at `.planning/calcify-p3-overnight/o0/review-2.md` if manager grants
that output lease, otherwise return report to manager. Include findings, plan
review, claim reconciliation, executed verification, residual risks and verdict.

Use $independent-review in reviewer mode. This is review instance2of3. Work from
Fresh Review Bootstrap first and record preliminary review before Author
Explanation. Verify explanation against repository, review spec and implementation
plan, run proportionate non-mutating checks and return evidence-backed verdict.
Do not implement fixes, create further review instances or split work into new
workstreams. Heavy pivot returns decision gate; no code implementation claim.
