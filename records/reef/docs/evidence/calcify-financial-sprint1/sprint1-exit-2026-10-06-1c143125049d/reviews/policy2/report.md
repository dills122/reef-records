# Independent timed-policy review

Review instance: 2 of 3. Verdict: Ready.

## Findings

No actionable findings remain in frozen seven-path scope. Review1 P2 assessor schema/outcome defect fixed: unsupported/missing schema, null measurement and mismatched scope/provenance yield FAIL_DIAGNOSTIC plus UNKNOWN; valid missed deadline reports actual1250/s and TARGET_MISSED despite full final drain. Complete valid deadline counts/parity required before TARGET_MET.

Preliminary blind pass recorded in preliminary.md before reading author-explanation.md. Reviewer received neutral request naming prior finding category, without author rationale. Base/head863503ec23c27f33ecea14fd82724fe28f96d308, branch codex/calcify-sprint1-exit-2026-10-06 verified. All seven after.json hashes match actual files. PatchSHA256c442e47659025e60335e28f3930c9bad74d219c17f4565dad7efb1881b513138 verified. Only rate-proof.mjs and its test differ from review1 hashes. Parent WORK_PLAN and other planning artifacts excluded.

## Plan Review

E4 RFC useful-rate/storage criteria inspected. Authorized narrower empirical alternative pins one fresh2500×60 arm,150000 trades,300000CAPTURE/SETTLE actions, exact prefunding,4GiBJava heap,2GiB journal,10GiB disk budget. Ordinary conservative admission and bootstrap1000/100/768MiB remain separate; no lower-bound or sampled evidence promoted into retained upper/capacity qualification. Existing durable ACK membership, independent complete economics/history and result-only replay remain in shared run core; exact300000members/300001history enforced. Aged/repeat, managed timed-cohort restart, SQL and production authority excluded explicitly. This verdict covers implementation/launch readiness for bounded diagnostic, not E4 capacity acceptance or actual measured result.

Concrete arm1/frozen2 artifacts checked: policy hash3c5988a407b2a597692bf106047c87dcd7a4d74a3c351a0becb565abf7bcdbe9, owned raw capability/correctness/fixture evidence and config/source digests valid. Adapter exact command matches supervisor wrapper argv including classpath, frozen2 paths and proof output. Supervisor raw hash, finite budget/resource pins and runtime broker/local directory mapping validate. Fixture policy equals runtime policy. Prior49-arm raw evidence digest matches compatibility marker, whose scope honestly limits reuse to unchanged Kernel/Broker source. Fresh broker-free Java capability recheck independently matches pinned build/classpath/config/source/Java/maxheap; no broker workload executed.

## Author-Claim Reconciliation

| Claim | Evidence | Status / consequence |
| --- | --- | --- |
| Review1 malformed-schema false target fixed | assessDiagnostic and Node regression cases | Confirmed; closedP2 |
| Conservative/bootstrap boundaries preserved | launcher/profile constructors, unchanged path checks, frozen mutation tests | Confirmed |
| Fixed cohort/source/raw capability bound | freezeDiagnostic, verifyDiagnosticEvidence, Kotlin diagnosticGuard; frozen2 actual recheck | Confirmed |
| Deadline throughput differs from eventual drain | supported1250/s miss test and assessor fixed60s arithmetic | Confirmed |
| Kotlin unchanged,42 prior tests passed | all four Kotlin hashes equal review1; retained Gradle receipts and verification.json | Confirmed retained evidence; not rerun |
| No capacity/recovery qualification granted | LIMITED output, false flags, explicit gaps and compatibility marker | Confirmed |

## Verification Performed

- node --test scripts/dev/calcify-financial/rate-proof.test.mjs scripts/dev/calcify-financial/rate-supervision.test.mjs:51/51PASS; node.log retained.
- git diff --check:PASS.
- SHA256 reconciliation for seven source/test paths and frozen patch:PASS.
- verifyDiagnosticEvidence, validateRateSupervisor, validateBootstrapRuntime against arm1/frozen2:PASS; launch-validation.log retained.
- Broker-free captureHeapCapability under pinnedJava21 -Xms128m -Xmx4g, then actual capability verification:PASS; capability-recheck.json retained.
- Retained Kotlin HeapGuard26/RateReference6 and BootstrapProbe10 PASS receipts inspected. No Kotlin rerun: unchanged source/test hashes justify prior checks.

## Open Questions And Residual Risks

Sampled80%heap stop cannot guarantee prevention of suddenOOM; native/broker memory outside heapguard. Prior boundedE3 kernel/managed-adapter compatibility evidence does not certify new150k managed restart. Encoded technical bytes and brokerCPU incomplete; all successful diagnostic assessments remainLIMITED. Existing capacity lock and live owned-resource supervisor must remain active at launch; review did not repeat Docker inventory or execute load. Parent owns actual measured evidence, owner docs and retention pass.

## Verdict

Ready for one authorized frozen2 fresh empirical timed diagnostic. No qualification/upper-bound/recovery success inferred. No third review instance needed absent material change; review count remains2of3.

## Recommended Next Actions

Parent may launch exact frozen2 adapter under existing serial owned supervisor, retain raw failures/results and report deadline rates separately from final drain. Complete parent docs/evidence/retention pass after actual outcome.

## Review2 artifact supplement — arm2 path correction

Original arm1 launcher passed relative output argument; canonical runtime validator refused RATE_RUNTIME_LOCAL_REGISTRY_MISMATCH during setup, before supervised payload (initiator report). Expected fail-closed invocation behavior; no code finding. Original attempt retained by parent.

New unique arm2/frozen artifacts validated without new review instance or source edits. All seven reviewed source/test hashes unchanged. Policy workload/resources/source/build match arm1/frozen2 after excluding changed config and capability receipt hashes/used sample. Policy7b608ea2e93a64cc022cd40860d2605110ad1be87c083a7ddf569b29310667de and config99bef7be70f56294901859ffcedc0100b65f92e3fdd7cc8d722934f456a7d175 match. Absolute arm2 policy/config/output paths, owned raw/source evidence, exact supervisor wrapper argv and host/broker registry mapping PASS. Fresh broker-free actual Java capability/build/classpath recheck PASS; arm2-validation.log and arm2-capability.json retained. Corrected intended CLI uses absolute arm2/frozen/policy.json, arm2/frozen/adapter.json and arm2/proof paths. Ready verdict applies to this corrected concrete launch; no load or capacity/recovery result inferred. Review count remains2of3.

## Review2 artifact supplement — arm3 host directory preparation

Arm2 strict-supervisor first-observation refusal (initiator report) required existing registered host store/journal directories; no JVM payload launched. Expected fail-closed resource check; preserve abort/setup-watch evidence as setup failure, no code finding. Brokers restarted with same registered IDs/image/volumes.

Arm3 validation PASS: policy339cee4c38a0ca1061d8084e69f75284fe981e6e97ce57e1eb7365225579218c; configa4e2461b718e753e9ff6ad00ddad77bef3956a071ff38002b01ba2d01ae0761f. Absolute intended CLI paths and exact supervisor/runtime mapping validate. Store/journal directories exist, empty, canonical; unique proof path absent for CLI creation. Raw evidence/currentsource validation and independently recaptured broker-freeJava4GiB build/classpath/config capability PASS. Seven source/test hashes unchanged; policy workload/resources/source/build match arm2 excluding config/receipt changes. Retained broker/restart1 preflight and raw profile readbacks inspected: same registered containers, same clusterId,8MiB segment properties across3brokers,config version5/no restart/invalid/unknown,20GiBfree floor exceeded. No new live Docker inventory or workload executed by reviewer. arm3-validation.log and arm3-capability.json retained. Ready for corrected arm3 concrete launch under existing strict supervisor; review count remains2of3.
