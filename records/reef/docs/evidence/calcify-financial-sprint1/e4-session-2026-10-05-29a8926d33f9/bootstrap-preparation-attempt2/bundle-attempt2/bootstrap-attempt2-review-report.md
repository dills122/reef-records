# E4 integrated independent engineering review

Review instance: 1 of 3. Attempt 2, cycle 1. Verdict: **Ready**, scoped to frozen test-only diagnostic code and plan for bounded execution. No financial capacity, conservative heap-cost, production authority or full E4 acceptance verdict.

## Findings

No actionable findings identified in frozen integrated24-path source. Preliminary source-first ledger retained separately in `source-first-preliminary.md`; author explanation and research memo read afterward. Neutral bootstrap disclosed failed runtime admission and numeric-boundary challenge, so that narrow issue was not blind. No implementation conversation, prior reviewer verdict or prior Ready conclusion inherited.

### Scope and ground truth

Repository `/Users/dsteele/.codex/worktrees/8c6f/reef`; branch `codex/calcify-e4-readiness`; base and HEAD `29a8926d33f9e2dc7278a1676a6fa3272628de3c`. Reviewed explicit dirty working-tree boundary, not committed HEAD alone. All24 SHA256 values in `.planning/calcify-e4-session-2026-10-05/review-preparation/source-frozen-attempt2-cycle1.json` match, both before and after review.

Frozen scope: CI workflow; bootstrap-calibration implementation/tests; broker-proof runner; physical-adapter implementation/tests; physical-evidence implementation/tests; proof-supervisor implementation/tests; rate-proof implementation/tests; rate-supervision implementation/tests; FinancialAckJournal implementation/tests; FinancialBootstrapProbeTest; FinancialBrokerProbe implementation/tests; FinancialHeapGuard implementation/tests; FinancialPhysicalInventory implementation/tests; FinancialRateProbe.

Five tracked owner-doc drafts read for context but excluded from final delivery judgment: docs/README.md, docs/WORK_PLAN.md, docs/evidence/calcify-financial-sprint1/README.md, docs/work/CALCIFY_SYSTEM_ARCHITECTURE_RFC.md, docs/work/handoffs/2026-10-04-calcify-financial-sprint1-recovery.md. Ignored operator setup, prototype, old run evidence and report files excluded from integrated source. Review report writes only; no source, plan, build, Git stage or commit mutation.

### Material implementation checks

- **Numeric capability boundary:** FinancialRateProbe.kt410–416 uses FinancialHeapBounds.integer on frozen/actual maxHeapBytes separately, then exact numerical equality and exact805306368 authorization. Default raw JSON IntNode versus actual Runtime LongNode round trip now accepted intentionally. Missing, text, decimal, nonpositive, beyondLong and beyondMAX_SAFE values remain rejected. Source/config/build/classpath/fixture/vendor/version/orderedentries retain structural comparison; actual VM arguments stay exactly `-Xms128m,-Xmx768m` at444. Actual bootstrapGuard calls tested helper at445. No global coercion or enlarged heap limit.
- **ACK journal:** bounded16384 queue, bounded256 batch,1KiB raw member,4KiB frame and aggregate byte cap. Contiguous logical ordinals and strictly increasing physical offsets allow holes. Source facts, index, independent witness and publication forced before notifications. Controller admission time derives from live notification; recovered notices never replay. Published history validation precedes writer activation; bounded on-demand old-prefix lookup feeds actual hot processor, observer and cold activation. Tests include real process halt boundaries, sticky exhaustion, corrupt/torn/missing files and recovered provider/topology use.
- **Physical evidence:** finite owned topics, UUID/partition/RF3 assignments and exact replica set derive from actual Admin replies with raw receipts. Logical replica lengths stay distinct from broker/local allocated KiB. Exact3 broker IDs/image/labels/mounts and local store/journal/proof paths validated; replica/mount/identity drift fails. Unsupported allocated category attribution and RSS/native/CPU remain unknown. Signed delta retains reclamation; bootstrap assessment does not promote legacy logical helpers to allocated category cost.
- **Supervision:** exact command/config/supervisor registry, loopback endpoint pins and actual Docker binding verified before load. Owned process group launched only after fresh prelaunch observation. Resource watcher covers startup, load, drain, close, managed child, replay and JVM artifact publication; stale/error/budget paths kill owned group and stop only registered brokers, preserving volumes. Added host allocations join existing9GiB abort/10GiB hard/20GiB guest-free/256MiB raw caps. Sentinel/process-tree controls exercised by reviewer Node suite.
- **Bootstrap/raw49 binding:** fixed1000-settled+100-pending, no aged or rate arm; empirical status cannot authorize conventional heap bounds. Raw candidate source coverage/hash, fixture/config, full capability/classpath identity, exact successful49-arm plans/results and complete bounded sorted proof-file inventories required. Current compiled Financial classes/dependency hashes compared with selected E3 plans; direct Kotlin entry also rechecks raw source/E3/build. Old candidate proof cannot authorize changed current build.
- **Restore/parity:** primary observer validates every ordered read-committed result against durable input member and independent BigInteger known-key delta reference. Close success required before new child JVM. Child reopens journal, certifies full managed activation cut against expected owner/history/ordinal/physical offset, and records zero replayed admissions and unknown old admission times. Child restores existing state directory; this is actual new-JVM managed restart, not a new-directory cold-loss claim. Complete committed result cut replay follows separately and rechecks all expected business inputs/history/state. No fresh economic input on recovery; firstFreshResult remains null.
- **Deadline accounting:** offered/callback/forced admission/decision/settlement remain separate. CAPTURE may decide before paired SETTLE admission; count checker permits that transient stage order while forbidding settled beyond admission/offered. Individual event times, not late sampling/drain, own deadline counters.

## Plan Review

Canonical `.planning/calcify-e4-session-2026-10-05/planning/requirements.md` remains authority. AGENTS invariants and current docs separate proposed financial architecture from test-only proofs.

E4-A/B/C code implements recoverable bounded membership, raw physical resource evidence, watched owned processes and finite empirical bootstrap. This establishes code readiness for those gates; execution acceptance still needs current source/build proof and actual frozen workload. Strict sampled heap remains observational, with explicit sudden-allocation/native limitations; no invented multiplier or empirical average becomes conservative bound.

E4-D remains open: regenerate same-candidate49 after changed class/source inventory, freeze new exact capability/config identities, execute1000-settled/100-pending diagnostic and validate seven physical checkpoints plus managed restart/result replay. Ordinary2.5k/5k/10k and fresh/aged300s ladder require legitimate conventional admission; predecessor150k retained-model refusal cannot be bypassed by empirical bootstrap. No rate or latency transfer from historical resolver/D7 scope. Canonical serial wording interpreted consistently with PLAN serial experiment arms; actual bounded ordered async source pipeline disclosed, not single-in-flight commit assumption.

Root still owes delivery/owner-doc/evidence/retention pass. Five drafts excluded, so this review grants no documentation publication/completion approval. No architecture pivot, new workstream or additional review dispatch required for this code fix.

## Author-Claim Reconciliation

| Author claim | Evidence inspected | Status | Review consequence |
| --- | --- | --- | --- |
| Equal raw maxHeapBytes failed solely on IntNode/LongNode identity | research raw-comparison.json, JShell stdout, memo; RED copied XML/log | Confirmed | Narrow numerical boundary correction justified |
| Strict parser used, equality and exact768MiB pin retained | FinancialRateProbe.validateBootstrapCapability; FinancialHeapBounds.integer; bootstrap test invalid controls | Confirmed | No weakened authorization/shape validation |
| Actual bootstrapGuard uses corrected seam | FinancialRateProbe.kt443–445 | Confirmed | Regression seam reaches actual launcher path |
| Other identities/raw E3/path/recovery/heap gates preserved | Full integrated source/diff and negative tests; source frozen hashes | Confirmed | Tiny Attempt2 change judged against whole implementation |
| Focused RED8/1 failure then GREEN8/0 | Copied RED/GREEN XML independently summed; full logs available | Confirmed | Test responds to original defect |
| Whole current financial run pending | Root completion receipt/log and nine copied XML | Superseded by confirmed98/98,0fail/0error/0skip | Current-build regression evidence available |
| Prior Node274 and actual49 pass establish previous candidate only | Author report, changed frozen source/build boundary | Confirmed as dated scope; prior run not independently reconstructed | No current-candidate actual proof inherited |
| New rig prepared; actual1000/100 and refreshed49 still pending | Author statement only; operator scope excluded | Unverified operational state | No live diagnostic or broker-state claim |
| Prototype compact observer excluded | git/frozen path inventory | Confirmed scope exclusion | No retained-owner change credited |

## Verification Performed

Reviewer executed:

```
node --test scripts/dev/calcify-financial/bootstrap-calibration.test.mjs scripts/dev/calcify-financial/physical-adapter.test.mjs scripts/dev/calcify-financial/physical-evidence.test.mjs scripts/dev/calcify-financial/proof-supervisor.test.mjs scripts/dev/calcify-financial/rate-proof.test.mjs scripts/dev/calcify-financial/rate-supervision.test.mjs
```

125/125 pass; zero failures/errors/skips/cancellations;9.338s. Includes real local child/process-tree and unrelated sentinel controls; no broker load. `git diff --check 29a8926d`:pass. Independently recomputed all frozen SHA256 values twice:24/24 match.

Root-executed evidence independently inspected and XML summed:

- `integration/root-controls/combined-financial-attempt2-cycle1-xml/receipt.json` plus nine copied TEST XML:98tests,0failures,0errors,0skipped; sourceStable=true. Root log ends BUILD SUCCESSFUL in2m25s, CLI0 reported by root. Reviewer did not launch Gradle or mutate build.
- `integration/root-controls/capability-roundtrip-red-xml`:8tests/1failure/0errors; `capability-roundtrip-green-xml`:8tests/0failures/0errors. Test method constructs Runtime-type Long numeric node, serializes/reparses default mapper Int node, calls actual-used comparison helper. This is narrow boundary test, not complete bootstrapGuard/live broker success.
- Research actual-classpath JShell retained output:ACTUAL_TYPE=LongNode,FROZEN_TYPE=IntNode,NODE_EQUAL=false,STRICT_INTEGRAL_VALUE_EQUAL=true. Reviewer read receipt; did not rerun JShell.

No fresh49 broker matrix, actual bootstrap, rate ladder, whole platform regression, DB integration, native memory or SQL/API capacity check executed by reviewer. Prior Node274 result not converted to reviewer/current execution claim.

## Open Questions And Residual Risks

Actual finite bootstrap may fail legitimately on resource/setup/restore window. Preserve failure receipt and research next aligned bottleneck; this Ready verdict cannot change limits. Actual fresh49 gate must pass changed source/build before workload. Category allocation attribution and native/broker CPU remain unsupported; copied aggregate logical helpers are not bootstrap measured physical costs. Sampled guard cannot guarantee prevention of allocation spikes/OOM. Recovery demonstrates complete managed certified state after restart without new economic work; live catch-up capacity, cold-loss restore and new-result timing remain separately scoped.

Cross-language frozen-schema duplication adds maintenance cost; current exact-limit/effective-client/source-binding tests cover drift. No subjective refactor demand or blocker raised.

## Verdict

**Ready** for frozen test-only integrated code and next bounded execution under unchanged limits. No actionable findings. Full E4 completion and production/capacity qualification not established.

## Recommended Next Actions

Root regenerate same-candidate49 proof and exact frozen capability/config; execute declared1000/100 bootstrap only if existing gates admit. Retain all refusal/failure receipts and assess actual result. Complete owner docs/current evidence/verified retention before delivery. No source fix or further review instance requested by this review.
