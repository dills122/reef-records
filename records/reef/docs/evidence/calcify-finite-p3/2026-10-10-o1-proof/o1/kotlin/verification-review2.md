# O1 Kotlin/protobuf correction verification — review 2 of 3

Final source frozen; no author readiness verdict. Exact scoped identity in handoff-identity.json and freeze-manifest.json. Source aggregate `0d01e5fa0b4f8efc0f2a21a1a7bab906951701286b04cf642ce538ed373ea26c` (46paths), patch `27900babf75aedd8946df58a45ddee6884a91e0f52df058a438a7c3ef3f103c7` (1129494bytes),43 compiled-class hashes checked before/after final probes. Only five authorized correction paths changed versus review1. Proto/generated/Go/source fixtures unchanged. Original target/receipts preserved; new receipt names distinct.

## Red reproduction before correction

Review1RestoreProbe.java is exact reviewer source SHA2568c55c775c94406348f1d803f1f1c8ca541dcbe82b8b85f1a850d97613e4b13b2. review1-reproduction.json retains full Java21 argv/classpath/cwd/exit0, -Xmx192m. review1-reproduction.log SHA2566143ca41872a649721f3fd869211e1152abeb60815b750d22f3f9a5ed9a82d1e matches reviewer final log: five accepted invalid restores, appended root accepted, prefixClosed=true/outcomeCount1/resume1. These are behavioral red observations, not failing test-run status. Research map/options/negative matrix retained before authorized source correction.

## Green finite and final regression

`JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home ./services/platform-runtime/gradlew --no-daemon -p services/platform-runtime test --tests 'com.reef.platform.calcify.FiniteLifecycle*'`

Candidate1 exit0/29tests/0failure/errors,21s, gradle-review1-correction-finite.log + review1-correction-finite-results.json + candidate1 identity. Final additional matrix exit0/31tests/0failure/errors,44s, gradle-review1-correction-finite-final.log + review1-correction-finite-final-results.json. Eight additional test methods versus review1; parameterized matrices execute many independent recomputed receipt/source mutations inside those methods.

`FINITE_CAPTURE_EVIDENCE=/Users/dsteele/.codex/worktrees/fa2b-0041/reef/.planning/calcify-p3-overnight/o1/kotlin/capture-wire-review2 JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home ./services/platform-runtime/gradlew --no-daemon -p services/platform-runtime test --tests 'com.reef.platform.calcify.*'`

Final exit0,213tests/0failures/0errors/0skips. gradle-review1-correction-calcify-final.log and review1-correction-calcify-final-results.json retain exact reports/hashes. Gradle elapsed1h07m35s; XML aggregate4048.535s; longest unchanged reports FinancialKernelTest2948.568s, FinancialRateReferenceTest1067.989s, FinancialOracleTest22.248s. Delay observed, cause not established; no performance claim or repeated broad build. This is final frozen receipt, earlier205/204/203 green runs remain candidate history. Serial Java21 Gradle cache escalations authorized; no concurrent Gradle or broker start.

## Independent probe parity and encoded boundary

review1-correction-probe-final.json/log use exact original reviewer source/argv with corrected bytecode; exit0, all five restored contradictions REFUSED and trailing root REFUSED_TRAILING_JSON, no ACCEPTED output. Five cases: profileprice, foreignrun, foreignsource, blank executions, wrong cancel result. Additional isolated result/semantic tests avoid combined invalid-field masking.

state-cap-probe-review2-command.json/log: Java21 -Xmx192m source-mode StateCapProbe.java (SHA256ef8d51503b07c7dde9162f1e65469cc901efa94e492ddfd6e8f00ac409b74795), exit0; encoded6307840 accepted,6307841 refused before initialize returns; unchanged original checkpoint, no topology/output. Padding diagnostic-only, source facts retained. Exact cap hard guard, not proof every legitimate allowed maximum envelope/fanout fits or physical memory fits.

## Source/wire and compatibility

Source JSONL24809bytes SHA2561a8cf1c8c769e3e2bf32fa80792f36da206f07e6e27ab4bbbc9511c925fb1811; payload value sum24797 excludes12newlines. Actual Go Processor.ProcessOnce 12records,8applied,4rejected,3trades,6units,15members,5orders; model identities p3-run/p3-session/buyer/seller explicitly accepted parameterization. Paired legacy16647bytes SHA256bdd4df11f562ba2f4dd217168a3e81e60f96fa4c3fa4a25c01e75830dda26506. Current final fixture checkpoint65419bytes; capture envelope sum29930. Golden first1658bytes, multi-fill7390bytes unchanged. Canonical finite budget260bytes SHA2566d49b6dd66e9cfa099e7b1c3cd02c9c275a9bf401d92069aace9634b5b4feee3 independently Python generated and Kotlin checked. Phase1links21/23bytes and P0canonical bytes unchanged. No additional generation; manager prior additive/generated drift gate retained for unchanged proto outputs.

## State reservation and limits

Configured state guard6307840 = completed receipts2097152 + first-capture batch copies2097152 + order/dependency allowance1048576 + source suffix/identity allowance1048576 + binding/control16384. Component guards:16source/completed+suffix,16batches,8orders,128execution IDs,1window,1outcome/8trades,64KiBsource/128KiBcapture,1MiBsource total/2MiBcapture total. Enforceable encoded cap before output/write or restore; observed checkpoint size is one fixture snapshot, not sum of writes/RSS or worst case. O2 must prove allowed producer/fanout fit and full-state changelog/request/restore/topic/broker/native bounds; model producer request cap currently output-sized captureBytes+1024, must not be inherited blindly for6.3MiBstate.

## Other checks and delivery

`git diff --check` exit0. `bun scripts/ci/check-records-retention.mjs` exit0,520 archived files checked. Source/compiled hashes unchanged after final regression/probes. Active new evidence retained for current combined review; no superseded published record created by this half. Manager sole Git writer/final delivery and archive owner. Live activation remains explicitly unavailable; no EOS broker restart, durable binding/ingress/isolation/authentication, financial adoption or throughput qualification. Request combined fresh review instance2of3; one consumed, two remain; no reset or split.
