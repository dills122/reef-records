# Independent integrated E3 code review

Review instance: M1 Attempt1 cycle2 of3; M2 Attempt1 cycle1 of3. Joint fresh pass.

Skill: `/Users/dsteele/.ai-central/templates/skills/first-party/independent-review/SKILL.md`. Blind pass recorded in `preliminary-review.md` before reading `author.json` or prior M1 report. Neutral bootstrap necessarily supplied acceptance and test summaries; author rationale remained separate. Nine exact source hashes match bootstrap at entry and exit. Branch `codex/calcify-planning-readiness`; base and HEAD `a6ddafbbae750693e227985f054be2d26716ae84`. Working-tree scope includes three tracked edits and six untracked files, all pinned; six existing documentation edits and concurrent proof-supervisor excluded. No source changes, staging, commits, additional reviewers, Docker operations, or Gradle execution.

## Findings

No actionable findings within frozen scope. Prior M1 cycle1 P2 readiness defect closed: `broker-proof.mjs:117` rejects non-null signalCode before consulting retained RUNNING/catchup receipts; `broker-proof.test.mjs:11` extracts actual helper and proves SIGKILL rejection. Reviewer rerun passes.

## Plan Review

RFC §§6.3/8.1/10.1 and current WORK_PLAN support bounded test-only E3 extension. Test-only helpers preserve kernel/oracle and public production behavior. `FinancialBrokerProbe.kt:202–221` now scans restored c/h/s once and calls mandatory `FinancialPartitionCut.validateActivation` before populating kernels. Helper certifies accepted logical prefix separately from increasing physical offsets, UUID/authority, owner history heads and causation; it compares first history to configured genesis, replays full owner chains, and compares complete semantic state. Pending/phase/staging/dedup fields are included through all persisted deltas. Existing hot processing retains known-key reads/writes; no new hot-path scan found.

`FinancialCommittedCut.kt:11–52` checks committed outputs against accepted source positions and independent OutputVerifier, then builds coverage/history/state and invokes identical activation helper. `FinancialBrokerProbe.kt:335–361` constructs actual committed-output quartet, checks A15/B27, refuses isolated mixed A10/B27 and missing A+5. `broker-proof.mjs:204–219` restores new local directory using original application/output history, checks old physical prefix/end/group checkpoint, then demands fresh suffix16/28. Refusal branch is explicitly isolated activation request, not injected corrupt RocksDB/changelog state. This is faithful to bounded proposal; no production authority redesign required.

External matrix covers actual oversized producer seam; kill between observed committed output and controller ACK; paused stale owner/replacement/resumption with real producer/group exception; one registered broker stopped while majority commits. `external-faults.mjs:56–94` requires observed barriers rather than elapsed-time success. `broker-proof.mjs:154–177` checks exact registered full container IDs/project/test labels and attempts target restoration in finally through ownership-only precheck. Shared supervisor/resource gate remains separate required approval, outside this report.

Scope is readiness to execute supervised proof. E3 final closure, docs/evidence integration and delivery/retention pass remain root-owned after actual proof. No heavy pivot needed.

## Author-Claim Reconciliation

| Author claim | Evidence inspected | Status | Review consequence |
| --- | --- | --- | --- |
| Mandatory startup cut verifies restored c/h/s before active kernels | FinancialBrokerProbe.kt:202–221; FinancialPartitionCut.kt; thirteen helper tests | Confirmed in source; actual broker execution pending | Startup refusal exists; live restore must still succeed under pinned build |
| Source offsets/UUID and group checkpoint remain separate facts | seed metadata offsets at FinancialBrokerProbe.kt:88–99; observer AdminClient group offset at:322–330 | Confirmed | No ordinal=physical offset or offset+1 inferred resume claim |
| Isolated exact quartet builds from read_committed outputs and shares verifier | FinancialCommittedCut.kt; BrokerProbe.kt:335–361; CommittedCutTest | Confirmed code/tests; live unverified | Mixed refusal does not claim corrupt managed-store injection |
| Fresh local restore retains original output history and emits only suffix | broker-proof.mjs:204–219; OutputVerifier ordered prefix check | Assertions confirmed; actual result pending | Retain before/idle/after source and result vectors and16/28 snapshots |
| Four fault arms require actual producer/fencing/majority barriers | external-faults.mjs:56–94; broker-proof.mjs:179–203; BrokerProbe producer decorator and fault serializer | Confirmed code/control tests; actual faults unverified | Live exception class/cause/resource and daemon receipts required |
| Prior readiness signal defect fixed with negative sensitivity | actual-helper regression; original cycle1 finding; retained readiness RED/GREEN | Confirmed | Previous P2 closed |
| Integrated financial44/44 with retained XML | Five XML files, summary, actual Gradle success log151s | Confirmed retained evidence; not rerun by reviewer | No missing-XML limitation for integrated suite |
| Cold scan consolidated; no hot-path scan added | processor init/process and baseline diff | Confirmed bounded source comparison | Full retained-history startup cost remains experiment limit |
| No live proof/financial rate/whole-cluster-loss guarantee claimed | author limits, current board, runner scope strings | Confirmed | Readiness cannot be promoted into E3 closure |

## Verification Performed

- Exact nine-file SHA-256 check at entry and exit: all match bootstrap.
- `node --test scripts/dev/calcify-financial/broker-proof.test.mjs scripts/dev/calcify-financial/gate-model.test.mjs scripts/dev/calcify-financial/rate-proof.test.mjs scripts/dev/calcify-financial/record-attempt.test.mjs scripts/dev/calcify-financial/reservation-model.test.mjs`:66 pass,0 fail,0 skipped.
- `node --check scripts/dev/calcify-financial/broker-proof.mjs` and `node --check scripts/dev/calcify-financial/lib/external-faults.mjs`:exit0.
- Retained integrated XML parsed: BrokerProbe2, CommittedCut3, Kernel14, Oracle12, PartitionCut13; total44, failures0, errors0, skipped0. Actual build log reports151s. Reviewer did not launch shared Gradle.
- Retained PartitionCut RED11/11 and corrected RED13/13, GREEN13/13 XML inspected; CommittedCut RED3 failures and GREEN3 XML/log inspected. These are author-executed sensitivity evidence, not reviewer runs.
- Readiness retained RED/GREEN inspected; exact current helper regression executed in66-test rerun.
- Tracked scope `git diff --check`:exit0.
- Codebase-memory project/index/search/coverage queried. Scripts excluded, Kotlin changed/untracked, no matching helper nodes: all nine exact files read directly; graph absence not used as correctness evidence.

## Open Questions And Residual Risks

Real RF3 outcomes remain pending: oversized send after earlier forwards, aborted output invisibility and recovery, actual stale-owner rejection after replacement completes, majority availability, new-directory changelog restore and exact old-output stability. Node arm tests use dependency mocks; Kotlin tests exercise cut helpers and config/serialization seam, not live OS/Docker/broker integration. Timing-sensitive takeover/transaction-expiry may fail closed under actual pinned image/client. Retain failures rather than editing historical observations; repeat only timing-sensitive boundaries under same build/config. Controller ACK is experiment-controller file boundary. No client API ACK guarantee, administrative topic/power-loss guarantee, capacity claim, or authority cutover follows.

## Verdict

**Ready** for supervised RF3 E3 proof at exact nine-file snapshot, conditional on separate proof-supervisor/resource gate approval and root ownership preflight. This is code readiness only. E3 final closure remains unverified until live proof and final evidence review.

## Recommended Next Actions

1. Root obtain separate supervisor readiness and freeze exact source/classes/JAR/image/profile/ownership manifest.
2. Execute supervised external and activation matrix; retain real exceptions, source/result positions, stable idle vectors,16/28 suffix state, daemon target-stop/restore receipts and resource observations.
3. Integrate docs/current evidence and completion/retention pass, then assess final E3 closure from actual receipts. No further reviewer or workstream started here.
