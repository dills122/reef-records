# Independent integrated E3 engineering review

Review instances: M1 Attempt1 cycle3/3; M2 Attempt1 cycle2/3; M0 Attempt2 cycle3/3 integrated live acceptance.

Frozen target: `/Users/dsteele/.codex/worktrees/8c6f/reef`, `codex/calcify-planning-readiness`, base/HEAD `a6ddafbbae750693e227985f054be2d26716ae84` plus bootstrap scoped dirty/untracked changes. All14 operational/CI/test pins and9 current-owner pins match at start and finish. Blind source/plan pass saved in `preliminary.md` before author packet delivered. Independent review followed user-named skill; source/docs untouched. Checks and report confined to ignored `final2-review/`.

## Findings

No actionable findings. Source, focused tests, actual raw candidate receipts and current owner wording support bounded test-only E3 acceptance. Archive publication/delivery remains pending root-owned gate; this verdict does not certify its completion.

Concrete acceptance evidence:

- `runs/session8c6f-external3/proof/0004-worker.stdout.log`: actual results-producer `RecordTooLargeException`,134306 serialized bytes versus131072 limit. Raw observer shows0 committed outputs after abort despite physical frames; fresh worker completes8 and idle restart preserves same physical result prefix/end, owner heads and input checkpoint.
- `committed-output-before-controller-ack-fault-boundary.json` preserves controller ACK false after prefix4 read-committed result; actual worker SIGKILL follows. Restored prefix offsets1–4/end6/group9 remain exact, fresh suffix alone adds outputs; controller ACK written after final observation.
- `0020-worker.stdout.log`/`process-signals.jsonl`: original owner pauses ordinal4/physical10 before forward, whole-process SIGSTOP; replacement produces full8 before SIGCONT/resume. Actual `ProducerFencedException` comes from results producer. Takeover/after/idle offsets/end/heads/checkpoints remain exact; no elapsed-time-only fencing inference. Stale-owner commit1000ms/transaction30000ms differs explicitly from default60000/120000.
- Majority arm daemon observations show exact registered target exited and two healthy running peers; accepted fresh full8 observed while target stopped. STOP/stopped/START/recovered grants and actual Docker receipts agree. Recovery target new generation carries successful fresh health probe; no retry renewing deadline.
- `runs/session8c6f-activation2/proof/0006-reconstruct-prefix.stdout.log`: actual committed quartet reconstructs A15/B27, rejects isolated A10/B27 semantic activation request and missing `h/A/00000000000000000003` (A+5); complete state restores exactly. Mandatory worker startup calls same full c/h/s/source/authority helper before kernel activation. New state directory, same app/changelog restore returns two certified owners, ordinal3/physical7, unchanged result offsets1–4/end6/group checkpoint9. Fresh suffix emits only offsets7–8, ends10, balances A16/B28; source group13 stays distinct from logical ordinal5/physical11. No injected mixed managed-store claim.
- All24 core and20 golden arms have raw oracle-complete outputs and actual isolated complete-history/refusal observations, not only derived pass flags. Mutation0–18, forward and serializer crash arms show zero visible aborted outputs, then recovery. Local-state-loss and staged-phase-loss complete; golden cases preserve exact idle output history. Each observer checks independent economic oracle, record chain/deltas, accepted input membership, staged queue/cursors and final phase completion.

## Plan Review

RFC6.3/8.1/E3 requirements covered within agreed bounded RF3 test scope: transaction rollback, fault matrix, exact economic/history agreement, once-only identities, source-bound cut, unavailable history refusal and no old-output republication. Shared verifier replaces duplicated restoration logic; oracle remains separate. Logical ordinal, source physical offset, owner sequence, result-log physical offset and framework group checkpoint retain distinct meanings. No production source, API/event/storage contract or accepted authority changes; test-only adapter and proof tools own new behavior.

Current WORK_PLAN, checkpoint, handoff, navigation, phase/discovery/RFC owners describe candidate acceptance pending review/publication and preserve historical scope. D7 production-flow reference remains separately scoped RF1 standing liquidity; financial capacity remains LIMITED. Delivery/records policy requires root to publish/verify exact full bundle, update immutable references/inventory, then complete retention. This review does not waive that requirement.

## Author-Claim Reconciliation

| Author claim | Inspected evidence | Status | Consequence |
| --- | --- | --- | --- |
| Complete four actual external faults | Raw worker, observer, signal, Docker and result receipts for external3; live control ordering checked against runner | Confirmed | M1 bounded live acceptance |
| Exact quartet refusal/repair and actual new-directory restore | Raw reconstruct-prefix, worker certificates, before/idle/after observer results and attempts state directories | Confirmed | M2 bounded activation acceptance; isolated refusal scope explicit |
| Parent-observed starting/du and fixed recovery guard | Smoke11 samples including4 starting; external38 samples including4 starting; raw inspect, matching du bytes, all8 phase artifacts per run | Confirmed | M0 integrated live acceptance |
| Same source/build/fixture across candidate arms | Each actual plan compared directly;3 runner/11 financial source/97 compiled hashes rehashed current bytes; fixture fee7eead368d2ef2927aad1e53877907a4d74f9762b696d20f7e5575b1361e6d | Confirmed | No transfer from historical software cohort |
| Financial45 and exact Node216 | Five retained XML suites45/0 failures/errors/skips; actual Gradle exit0/build-success log; raw Node216/0 failures/skips and actual exit0;38 direct before/after hashes match current bytes | Confirmed | Fresh broad rebuild unnecessary for this read-only review |
| Earlier failures/corrections retained | external1/2 raw PROOF_ABORT and only3 completed arms each; legacy35 relocated files rehashed; CI1 original hash+timing correction; summary scope correction | Confirmed | Partial prior campaigns never upgraded to full acceptance |
| Accounted fault maximum4844015616 differs measured running sum2430259200 | Raw target fixed3221225472 reservation, actual du and peer measurements | Confirmed | Accounted bound must not become measured/continuous peak |
| Serial correctness903.766s versus historical474.917s not causal A/B | Actual candidate attempts468.764+435.002, unchanged candidate hashes but reused volumes/prior attempts; owners explicitly scope comparison | Confirmed | No throughput/regression attribution |
| Archive publication complete | Packet/current owners explicitly pending | Unverified/pending | Root-owned delivery gate remains |

## Verification Performed

- Fresh `node --test scripts/dev/calcify-financial/record-attempt.test.mjs scripts/dev/calcify-financial/broker-proof.test.mjs scripts/dev/calcify-financial/proof-supervisor.test.mjs`:60/60,0 failures/skips, actual exit0. Includes real process-group controls, actual adapter/file protocol, deadline/journal/completion failure and cancellation controls.
- Fresh `node .planning/calcify-session-2026-10-04/integration-review/final2-review/check-receipts.mjs`: actual raw journals/results/build pins checked, exit0. Retained reproducible `receipt-check.json`. Validates all49 candidate arms' raw final results and isolated rows, all246 sample rows, matching raw inspect/lifecycle and exact du-byte receipts, sample resource budgets and consecutive sample-start maximum4815ms. Completion markers and independent recorder CLI exit0 verified for smoke/external/activation/core/golden.
- Additional raw external prefix/fencing/outage and quartet assertions pass; all44 control fault-abort/complete-history checks pass. All four candidate plans have identical3/11/97 hashes; each current source/compiled dependency rehashed.
- CI216 raw log and command matched current workflow test list; direct before/after38 pins current. Retained financial45 XML and actual Java21 offline Gradle success reviewed; no new build/Docker/load run.
- All35 legacy recorder relocation hashes/byte counts checked; original CI1 attribution record matches pinned SHA. Actual post-golden daemon inspection shows3 exact owned containers exited, with3 named data volumes retained.
- `git diff --check` passes; branch/HEAD/dirty scope verified. Codebase-memory graph project/freshness/coverage used; scripts excluded, Kotlin graph best-effort, direct source fallback used. No graph completeness claim.

## Open Questions And Residual Risks

Resource evidence sampled only; inspect/du are separate observations. Fixed fault reservation remains conservative bound; VM overhead and outside host writers excluded. Daemon mount inventory supports exact registered volume owners at recorded boundary, not universal absence of outside writers. Local synchronous final-publication syscall, Node scheduling and kernel/filesystem stalls lack strict wall-clock guarantee; documented async cancellation and commit boundary are tested. Target recovery smoke carries no financial workload. RF3 worker/broker fault correctness does not prove full cluster/power-loss durability, production availability, reservation-owner acceptance or matcher identity. E4 applied heap guard, recoverable ACK membership, physical-byte calibration and capacity remain open. No new live load qualification run in this review.

## Verdict

**Ready** for frozen integrated bounded E3 source/plan/live acceptance: M0 Attempt2 cycle3, M1 Attempt1 cycle3 and M2 Attempt1 cycle2. No actionable findings. Publication and final delivery sign-off remain pending separate root-owned gate; no production authority or financial throughput promotion.

## Recommended Next Actions

Root: record milestone verdicts, publish full exact-byte evidence/reviews/failures/corrections into Records, verify immutable destination, repair current references and inventories, complete retention pass. Continue E4 only under its explicit remaining acceptance gates. This reviewer starts no further review instance; M0 Attempt2 and M1 Attempt1 cycle budgets exhausted; M2 Attempt1 has one remaining cycle subject to material change and initiating task decision.
