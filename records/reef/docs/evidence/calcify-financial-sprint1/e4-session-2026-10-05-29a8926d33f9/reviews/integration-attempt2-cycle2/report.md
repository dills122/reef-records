# Whole integrated E4 independent engineering review

Review instance: Attempt 2, cycle 2 of 3. No review-count reset. Verdict: **Ready** for source-level bounded diagnostic candidate. Actual runtime qualification remains pending and is not covered by this verdict.

## Findings

No actionable P1/P2/P3 source findings found in frozen whole patch. Review did not implement source fixes, run Gradle/compiler/JVM/broker commands, or alter shared runtime state.

Scope reconstructed from baseline `29a8926d33f9e2dc7278a1676a6fa3272628de3c`, branch `codex/calcify-e4-readiness`, current tracked diff, untracked new implementation/test files, and frozen 24-path SHA256 manifest. All 24 hashes matched before and after review. Tracked owner-doc changes reviewed alongside source. Initial untracked `.kotlin/` output was build/cache material outside source target, not implementation; absent at final status read. Source-first preliminary sent to root before reading author packet; no earlier author conversation or review report used as evidence for acceptance.

Important checks:

- `FinancialAckJournal.kt`: bounded FIFO callback queue, 1KiB payloads, bounded batches/frames and aggregate storage; source UUID/run/domain/partition identity and strictly increasing physical offsets; data/index/witness/publication force ordering before live admission notifications and membership visibility. Recovery validates complete publication prefix, independent witness and indexed member chains; unpublished tails preserved, published corruption refuses activation. Original clocks retained under old scope; controller admission times remain unknown and notifications never replay.
- `FinancialBrokerProbe.kt:196`: cold activation membership is lazy disk lookup rather than second fully retained JSON membership prefix. Existing certified-cut validation stays authoritative; activation callback follows validated owners.
- `FinancialRateProbe.kt:419`: both actual and frozen activation history counts use strict integral parser; equal count must be 2101, ordinal must be 2099, physical offset must equal journal member offset. Owner and history checksum comparisons remain exact. Null ordinal/offset fail equality. `FinancialRateProbe.kt:595` writes unique raw activation summary before asserting parity, permitting future failures to expose actual cut evidence.
- `FinancialRateProbe.kt:654` and surrounding flow: callback success remains distinct from durable controller admission; topology waits for forced membership. Independent observer checks source input, history chain, complete deltas and exact prefix; result-only replay consumes complete frozen read-committed cut. Separate child JVM validates recovered membership/certified owner before parent success artifact can publish.
- `FinancialPhysicalInventory.kt` and `physical-evidence.mjs`: actual Admin reply value objects retained and independently derive finite exact topic UUID/RF3 replica inventory. Kafka logical replica lengths are separate from allocated `du` blocks. Broker-root and registered local allocations remain scoped; category allocation and unsupported native/RSS/CPU stay unknown. Signed deltas preserve reclamation. Actual host clock covering brackets avoid treating JVM and Node origins as equal.
- `proof-supervisor.mjs` and `rate-supervision.mjs`: literal registered broker endpoints bind actual Docker port inspection and actual cluster identity; store/journal/proof paths are canonical, owned and nonoverlapping. Existing owned process group and resource supervision includes host allocations, bounded output/time windows and fail-closed cleanup. Authorizing capability is frozen to actual source/build/classpath/config/VM and current-candidate complete E3 raw proof.
- `FinancialHeapGuard.kt`: fixed 1000/100/0 diagnostic is explicit sampled profile; null estimate and no conservative upper-cost/capacity claim. Ordinary conservative heap profile still requires supported bounded costs. Sticky observed failures and guard lifecycle protect successful artifact publication.

## Plan Review

RFC E4 continuation explicitly adds finite diagnostic before ordinary ladder, after E3 correctness. Implementation preserves agreed test-only kernel/managed adapter and independent oracle/history/recovery responsibilities. No production routes, command/event contracts, financial authority, reservation-owner decision, matcher identity or SQL cutover change. Matching/API deterministic invariants remain outside altered runtime surfaces.

Source covers prerequisite ownership/supervision, durable membership, sampled heap boundaries, physical checkpoint evidence, complete result replay and separate JVM recovery. Actual current-build 49-arm RF3/EOS rerun plus seven-checkpoint diagnostic is still required by executable gates and owner docs. Small fixed bootstrap is not evidence for ordinary rate ladder. Retained-owner representation/cost question remains separate planned work; no pivot proposed or authorized by review.

Owner docs consistently report failed prior diagnostic, pending corrected candidate proof and no successful diagnostic/rate qualification. Required completion/retention publication and source PR remain delivery work owned by root, not satisfied by source-readiness verdict.

## Author-Claim Reconciliation

| Author claim | Evidence inspected | Status | Consequence |
| --- | --- | --- | --- |
| Activation LongNode/IntNode count equality caused semantic failure | Actual RED XML9 tests/1 failure at `validateBootstrapActivation`; current round-trip regression and strict parser source | Confirmed | Correction accepts valid widths and preserves exact numeric contract |
| New helper preserves hashes, exact2099 ordinal and journal offset; null cut fails | Helper, actual callback wiring, regression negative controls | Confirmed | No broadened activation acceptance |
| Raw activation summary precedes parity assertion | `bootstrapRecovery` actual `onActivation` callback | Confirmed | Failed future activation retains cut evidence |
| Current financial suite succeeds99/99 | Root completed Gradle log and nine copied XML suites, independently summed99/0/0; receipt sourceStable | Confirmed after packet's original pending statement | Unit/topology/code verification only; no broker qualification transfer |
| Prior actual proof cannot transfer to corrected executable candidate | Current E3 source/build/compiled/config binding in Node and Kotlin, owner-doc pending status | Confirmed | Current rig proof remains mandatory |
| No production authority/ordinary capacity/conservative upper cost claim | Whole source diff, runtime schemas, RFC and owner docs | Confirmed | Ready limited to bounded diagnostic source |
| Final Records/source PR publication pending | Author packet and owner docs | Unverified externally, explicitly pending | Final delivery/retention must finish before root declares task complete |

## Verification Performed

1. Read `AGENTS.md`, independent-review skill, AI context/documentation map, task-relevant RFC E3/E4 and recovery contracts, current work/evidence/handoff docs, delivery/retention policy, Kotlin steering. Reconstructed whole patch from source before author packet.
2. Verified all frozen24 path SHA256 hashes twice. Verified baseline/branch and explicit dirty source boundary. `git diff --check` passed.
3. Independently ran `node --test scripts/dev/calcify-financial/*.test.mjs`:170 tests,170 pass,0 fail/skip/cancel; raw log retained locally. Includes harness model, bootstrap, physical inventory/adapter, supervisor and rate controls. This is Calcify directory suite, not entire hosted Node CI list.
4. Read root `combined-financial-attempt2-cycle2.log`: build successful. Independently summed copied XML suite counts:99 tests,0 failures,0 errors. Root executed build/test command; reviewer did not duplicate JVM/build activity. Bootstrap regression9/9 passes; ACK8, heap25, physical11 and remaining kernel/oracle/cut/topology tests included.
5. Read actual semantic RED `activation-count-red3.xml`:9 tests,1 failure in LongNode-to-raw-IntNode activation regression. Earlier compile-error/stale-XML artifacts were not accepted as semantic RED.
6. Saved source checks and raw receipt SHA256s in `verification.json`. No actual current-candidate broker or diagnostic command executed by reviewer.

## Open Questions And Residual Risks

- Current corrected candidate actual 49-arm correctness, activation owner/hash/offset agreement, seven physical checkpoints, fresh child process recovery and final bootstrap validator remain unobserved. Passing unit seam cannot prove them. Prior actual qualification failure remains failure.
- Sampled heap protection cannot guarantee avoiding transient OOM; diagnostic expressly lacks conservative upper costs. Physical category bytes and unsupported process telemetry remain unknown. No capacity claim follows from finite sample.
- Actual child recovery proves separate process/certified activation with managed local state. E3 local-state-loss/changelog fault evidence remains separately required; no cluster power-loss or administrative deletion guarantee inferred.
- Root still owns final evidence/retention publication, remote byte verification, current status refresh and source PR packaging. Review did not verify new archive publication.

## Verdict

**Ready** — whole frozen source patch suitable for authorized bounded diagnostic execution. No actionable source findings remain. **Actual current-candidate runtime qualification pending; no qualification or final delivery sign-off.**

## Recommended Next Actions

Root accept source verdict; preserve original RED/failure evidence; run unchanged frozen current-candidate49 and fixed diagnostic under registered supervisor. Retain actual activation-attempt summary and all success/failure/raw receipts. Evaluate actual result independently, refresh current evidence/docs, then complete delivery/retention pass. Further material source changes require remaining Attempt2 cycle3 review within existing limit; no reset or additional workstream implied.
