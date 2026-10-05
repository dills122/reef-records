# ACK component independent review

Review instance: 1 of 3. Attempt 1. Preliminary ledger recorded before author report.

## Findings

No actionable defects found in frozen ACK helper/test or reviewed live caller/counter binding.

P2 integration dependency: unchanged `FinancialBrokerProbe.init`, acceptedMembers fallback at line219, eagerly materializes full recovered ACK JSON prefix from disk provider. Managed restart with growing published membership thus retains full ACK list. Root accepts ownership of lazy bounded-access adapter and focused activation test before whole E4-A acceptance. Existing complete coverage/history/state restoration remains separate heap cost; do not claim complete activation constant memory. This finding does not block narrower journal/helper plus live-caller candidate verdict.

## Plan Review

E4-A component matches bounded queue/raw payload/frame/batch, complete disk-prefix integrity recovery, source UUID/run/domain/partition/raw hash, logical contiguous ordinal versus increasing physical holes, separate callback/data-force/publication-force/admission clocks, sticky failure, close and final-publication health checks. Actual rate topology and observer consume durable membership. Admissions arise after four forces and controller notification; CAPTURE decisions need no future SETTLE pair gate. Event deadline counts update at event processing rather than late drain snapshot.

Whole E4-A remains incomplete: root-owned lazy activation, actual RF3 managed restart and complete source/history/state agreement proof pending. E4-B/C accounting, frozen load and capacity claims excluded. Result-only replay correctly labeled. Four channel forces per batch explicit; batch collection at most10ms does not establish end-to-end force/admission latency bound.

## Author-Claim Reconciliation

| Claim | Evidence | Status | Consequence |
| --- | --- | --- | --- |
| Bounded RAM journal; old prefix available on demand | ArrayBlockingQueue; bounded Callback/Frame; recover streaming; member index reads; old-prefix test | Confirmed | Journal component meets requirement |
| Live main financial work binds durable membership | RateProbe topology lambda, observer member lookup, callback metadata validation, onPublished admission | Confirmed | More than helper-only wiring |
| Four forces; actual clocks; no old admission recreation | publish data/index/witness/publication force sequence; telemetry; member controllerAdmissionNano null; no recovered notifications | Confirmed | Live frontier clocks distinguished from old unknown notifications |
| Missing/corrupt/torn prefix rejected before writer/activation | init recover before writer start; index/member/marker chains; mutation tests | Confirmed | Single-component corruption/valid suffix loss fail closed |
| Four actual process crashes | Test ProcessBuilder java child, bounded wait, exit77 and matching stage assertions; passing final XML testcase | Confirmed within retained test execution | Broker-free abrupt-process proof; RF3/EOS restore unverified |
| 72 final financial tests pass | Seven retained XML suites and final receipt/log | Confirmed | Eight ACK tests included; no exclusions/skips |
| Full managed activation bounded membership and actual RF3 recovery | Author explicitly defers; source eager membership list remains | Unverified/pending | Whole E4-A cannot be Ready |

## Verification Performed

Read AGENTS, AI_CONTEXT, doc map, canonical E4 requirements, source/tests before author testimony; exact diff versus29a8926d33f9e2dc7278a1676a6fa3272628de3c; branch codex/calcify-e4-readiness, unrelated shared dirty paths preserved. `git diff --check -- services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialRateProbe.kt`: pass. Parsed retained final XML directly:72 tests,0 failures,0 errors,0 skips across7 suites. Final log/receipt reports exit0 for JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home ./gradlew test --tests 'com.reef.platform.calcify.financial.*'. Reviewer did not rerun Gradle, load, Docker or dependencies because heap worker owns compiler.

Frozen journal SHA256a1600cadef1962822ea5d7bcbe32436ce5133d685f22624faa61f83a590fc933 and test85127a857336a2f42193083354e7fb2533e22f1595392b38aa117a1a9e1d6a08 match supplied freeze. Reviewed RateProbe current SHA256ab0fe88e9570da93790ce946fb23dff39ef93caaa5725629c863fbdbd7e901fc; retained final suite predates root's HeapArtifactSnapshot Map value nullable-only change. Source inspection sees no ACK behavior difference from suite target; changed current complete candidate still needs root combined verification.

## Open Questions And Residual Risks

Journal witness rejects independent component rollback. Coordinated rollback of all components to mutually valid earlier prefix remains outside fault model, without external immutable anchor. Witness-force-before-primary crash fails closed, reducing availability but preventing ambiguous activation. Live lookup frontier exposed after notification; publication physically forced before controller counts. Original data-force/callback clock scope retained; old controller admission not reconstructed.

Journal logical cap default256MiB remains separate from encoded proof cap256MiB; root must account allocated bytes and retained tails in owned resource envelope. Actual broker throughput, fsync latency and RF3 restart remain unmeasured by these controls.

## Verdict

Ready — frozen journal/helper/test and actual live RateProbe ACK lookup/observer/admission binding only. Whole E4-A pending lazy activation and actual managed restart; whole E4 session/capacity not certified.

## Recommended Next Actions

Root completes lazy recovered membership adapter, focused activation check, exact allocated journal registry/resource supervision and actual RF3 managed restart. Review combined runtime candidate after those source changes; preserve this narrower verdict and prior test provenance.
