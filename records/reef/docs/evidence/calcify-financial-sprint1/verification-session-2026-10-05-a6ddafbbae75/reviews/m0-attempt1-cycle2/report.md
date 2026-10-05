# Independent guard review — cycle2

Review instance: 2 of 3. M0Attempt1. Frozen source inspected before separate author explanation and prior report. Parent dispatch disclosed prior finding titles/fix claims; full blindness to those concerns unavailable. Preliminary independent ledger retained in `preliminary.md`.

## Findings

**P2 — Completion timeout can leave late successful handshake.**

`scripts/dev/calcify-financial/proof-supervisor.mjs:154-156` bounds completion and returns failed result after1000ms. Adapter `finish` at252-256 writes serialized successful result to temporary file, checks cancellation at255, then awaits asynchronous noncancellable `rename`. Timeout after rename dispatch aborts signal, but rename neither receives signal nor rechecks terminal state. Pending rename can subsequently publish `supervisor-finished.json` containing `ok:true` despite returned `ok:false`/CLI exit1. Journal already records `PROOF_COMPLETE` at153 before completion succeeds. This violates prior review's explicit absence-on-timeout handshake criterion; shutdown/liveness part of priorP2 is fixed.

Failing scenario: temp data write succeeds promptly; final rename starts before1second deadline but finishes after it. Reproduced against actual Docker adapter `finish`, with injected Docker outputs and delayed filesystem rename completion1250ms. Production1000ms completion limit retained. No source edit or live Docker call. Control returns:

```json
{"control":"rename-already-issued-before-timeout","returnedOk":false,"error":"evidence write failed: Error: completion evidence write timeout/stale observer","lateFinishedArtifactOk":true,"wrapperStatus":{"code":0,"signal":null}}
```

Evidence: `late-rename-control.mjs`, `late-rename-control.log`. Control injects filesystem delay to model queued/stalled asynchronous rename; does not claim observed host filesystem stall. Source/imports otherwise unchanged. Existing delayed-write test212-223 stops before publication and misses rename-in-flight case.

Impact: contradictory terminal evidence may misidentify failed supervision as completed proof. Actual CLI remains exit1; consumers requiring verified CLI exit0 are protected. No continuing broker load: owned process/broker cleanup precedes finish. Severity staysP2, but failed handshake criterion blocks current readiness gate.

Smallest correction: bounded/abortable temporary data write, then final cancellation/deadline gate and synchronous atomic publication can make publication indivisible with JavaScript timeout callback. Once bounded phase fails, no continuation may publish. Keep success journal entry consistent with terminal outcome; add pending-publication regression against actual adapter, alongside delayed-data-write regression. This is a possible narrow correction, with explicit tradeoff: synchronous filesystem publication can block event loop on stalled filesystem, so it cannot honestly promise strict1second end-to-end liveness. Bound asynchronous data preparation and describe short synchronous commit phase separately if chosen.

If strict end-to-end1second liveness remains mandatory, asynchronous rename cannot be made cancellable merely by passing/checking AbortSignal. Use explicit provisional publication plus authoritative terminal success/abort protocol and require consumers to reject provisional/late markers when finish timed out; strict absence of any asynchronously issued rename is impossible without changing that protocol. Do not require impossible cancellation of filesystem syscall already in flight. Root chooses local publication contract; no workstream/architecture pivot indicated. Root should not infer proof completion from existing marker or PROOF_COMPLETE journal entry alone.

## Plan Review

Operational supervisor scope fits scripts ownership and bounded test-only proof. No runtime/business/API contracts changed in reviewed two-file scope. Frozen broker profile fixes9GiB abort/10GiB hard allocation, guest20GiB floor, raw256MiB; code matches exact thresholds and rejects invalid/unhealthy/stale samples. Sample starts anchored to prior timestamp with200ms lead; post-journal validation and loop/prelaunch checks close prior initial5300ms and9000ms gaps. Five-second maximum remains sampled/start-based; monitor itself bounded4500ms and individual Docker commands1500ms. No continuous peak/performance qualification implied.

Exact full IDs/expected labels plus frozen image/volume checks limit broker cleanup; registered Docker stop preserves volumes. Independent owned process-group cleanup covers stopped TERM-resistant descendants and leader exit; actual real-process tests pass with unrelated sentinel alive. Wrapper exit0/no signal precedes final validated sample, cleanup and handshake. Cleanup errors suppress success.

Frozen root manifest `session8c6f-smoke1-supervisor.json` supplies three exact registered brokers and /usr/bin/true smoke wrapper with fresh output directory, timeout1800000ms. Optional stopped rp1 reservation3GiB explicitly asserts exclusive writers, and running target samples reject allocations above reservation. Reservation premise remains operational assumption, not measured stopped allocation. Root-owned actual Docker timing/resource integration remains unexecuted reviewer scope and follows readiness fix.

No heavy pivot. One local terminal-publication defect remains. Retention/delivery pass belongs broader root integration; ignored active review artifacts retained and original instance1 report unchanged.

## Author-Claim Reconciliation

| Author claim | Evidence inspected | Status | Consequence |
| --- | --- | --- | --- |
| Freshness rechecked after journal and before launch/loop | observe119-120; supervise125-132; tests153-180 | Confirmed | PriorP1 closed |
| Cadence anchored timestamp with200ms early start, strict5seconds | lines128-140; fake slow monitor/jitter and real asynchronous test198-210 | Confirmed in covered controls | Normal first periodic gap4800–5000ms; delayed poll fails closed |
| Completion bounded1second, failure returned after cleanup | bounded102-106; finish154-156; hang/throw tests181-189 | Confirmed | PriorP2 liveness portion closed |
| AbortSignal prevents publication after delayed data write | adapter254-255; test212-223 | Confirmed for data-write phase | Rename-in-flight remains unprotected |
| Timeout leaves completion absent | priorP2 criterion; adapter256; independent delayed-rename control | Contradicted | CurrentP2 blocker |
|26controls including own STOP tree/sentinel pass | reviewer Node invocation | Confirmed26/26 | Passing suite lacks pending rename scenario |
| Frozen3GiB reservation/exclusive-volume premise supplied | root manifest and validateSample84-89 | Confirmed as frozen premise | Live premise cannot be proven by evidence string |
| No live Docker author integration; root owns it | source injection tests, explanation, bootstrap | Consistent | Reviewer performed no Docker command |

## Verification Performed

- Branch `codex/calcify-planning-readiness`; HEAD/base `a6ddafbbae750693e227985f054be2d26716ae84`; exact worktree `/Users/dsteele/.codex/worktrees/8c6f/reef`. Dirty/untracked unrelated paths inspected and excluded.
- Frozen SHA256 before/after: supervisor `1e94c67365237ff5ca4a0c18bd941070309c927b1f86a929f7a91ed97f24bd4a`; tests `63fb458b246caef2a85ea6279e2874fe8293b839df84cf75c43751555d86cee6`.
- `node --test scripts/dev/calcify-financial/proof-supervisor.test.mjs`:26/26 pass,0fail,6.515seconds. Default sandbox sufficient; no elevation requested. Log `node-test-default.log`.
- `node .planning/calcify-session-2026-10-04/reviews/m0-attempt1-cycle2/late-rename-control.mjs`: exits0, assertions reproduce failed result followed by late successful completion artifact. Injected filesystem delay and Docker adapter only. Real file operations confined to own temporary output; source unchanged.
- `git check-ignore` confirms review artifacts ignored. No staging, commits, source edits, Docker load/control, subagents or further review instances.

## Open Questions And Residual Risks

Root requires verified supervisor CLI exit0, actual wrapper exit0, final validated sample and coherent completion handshake. Current failed marker cannot serve independent proof. Final resource sample precedes terminal metadata; leave raw-budget margin as existing disclosed limit. Samples do not prove continuous peak. Retained-PGID descendant assumption excludes daemonized/setsid escape. Host loss/SIGKILL prevents cleanup. Actual Docker timing, stopped target premise and volume exclusivity remain root-owned bounded integration checks.

## Verdict

**Not ready** for supervised correctness proof until late success publication and terminal evidence consistency fixed. Prior initial freshness/cadence issue closed. No performance/capacity claim.

## Recommended Next Actions

Author responds Accept/Dispute with evidence/Defer. Apply narrow completion-publication fix and regression; preserve old logs/report. Root freezes hashes and uses final allowed independent instance3of3 for materially changed terminal behavior. No further reviewer spawned here. Keep actual Docker smoke gated until Ready verdict.
