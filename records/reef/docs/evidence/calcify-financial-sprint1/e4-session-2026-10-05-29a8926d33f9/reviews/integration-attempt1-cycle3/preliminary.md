# Preliminary independent E4 review

Review instance: 3 of 3, integration attempt 1. Source inspected before author packet. Task bootstrap disclosed prior finding and intended fixes, so completely blind review impossible; author explanation not yet read.

Scope: 24 frozen paths in source-frozen-cycle3.json; baseline29a8926d33f9e2dc7278a1676a6fa3272628de3c; branch codex/calcify-e4-readiness; tracked/untracked dirty implementation explicitly retained. SHA256 check:24/24 match; no drift.

Canonical requirements: planning/requirements.md under session root. Inspected bootstrap, rate launcher, runtime, durable journal, physical collection/validation, heap guard and supervisor, plus focused tests. No confirmed new blocker at preliminary cut.

Endpoint closure: mandatory launcher/config registry equality; actual Docker port map verified before launch and every sample; actual AdminClient cluster/nodes checked before topic creation/recovery. Raw E3 selected plans now match planned broker string, source and compiled classpath.

Durable ACK closure: bounded queue/batches/indexed cold lookup; publication+witness force gates; recovery streams old prefix and rejects publication corruption/missing files; live main topology and observer use journal. Raw physical receipts retain exact topic UUID/replicas and separate logical length from allocated directory bytes; category/native/CPU unknowns explicit. Bootstrap fixed1000+100 empirical cohort remains unable to authorize conventional heap bounds. Actual new JVM recovery is implemented, distinct from complete result-only replay.

Pending checks: test completion, detailed test coverage/guard teardown inspection, author claim reconciliation. No brokers/payload started. Code-readiness and actual E4 qualification remain separate; raw current-candidate E3 prerequisite and empirical qualification unobserved in this pass.
