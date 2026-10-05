# M1 Attempt1 preliminary independent review

Review instance: 1 of 3. Reviewer read exact skill and neutral bootstrap, then repository instructions, RFC §§6.3/8.1/10.1, Kotlin steering, five pinned files and their baseline diff/tests. Author explanation not yet read.

Scope baseline/head a6ddafbbae750693e227985f054be2d26716ae84; branch codex/calcify-planning-readiness. Five SHA256 values match source-sha256.txt on first inspection. Six modified docs and parallel proof-supervisor/partition-cut files excluded.

Observed implementation: all four arms dispatch real adapters; oversized B settlement occurs before commit request after preceding output forwards; observer reconstructs result authority plus checks input group checkpoint range; committed-before-controller-ACK queries read-committed prefix before kill, queries unchanged prefix after restart before fresh suffix; stale owner pauses after writes/before forward and resumes only after replacement full-prefix observation with producer/group failure requirement; outage validates exact three IDs/project/reef.test/distinct service labels/health before mutation, starts registered target in finally with ownership-only precheck.

Preliminary concerns to verify before final verdict:
- ready() only checks exitCode and spawnError, not signalCode; killed process may leave RUNNING/catchup markers and be mistaken for ready. Existing helper behavior reused by new fault arms; exact consequence needs failure scenario assessment.
- producer failure marker does not explicitly require target result topic or earlier successful send evidence; inspect actual serialized fixture sizes and producer rejection paths before treating this as defect.
- stale-owner exception allowlist includes transaction-state errors, so proof supports observed producer rejection after takeover; distinguish group-generation/producer-epoch cause from timeout alone in final live receipts.
- Node mocks verify arm ordering/assertions; do not exercise OS process adapter and Docker adapter. Live proof remains mandatory.

Executed focused command: node --test scripts/dev/calcify-financial/broker-proof.test.mjs, 11/11 pass. Kotlin recorded BUILD SUCCESSFUL found; XML path in default build absent, locating recorded artifact next. No Gradle/live/Docker run.
