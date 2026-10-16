# Superseded Calcify throughput harnesses and research spikes — October 16, 2026

Source: [Reef `df8695dc29354f5b8d0e1924864797bbd2f3445e`](https://github.com/dills122/reef/tree/df8695dc29354f5b8d0e1924864797bbd2f3445e).
[Manifest](../../manifests/2026-10-16-reef-script-cleanup.json): 19 files, 214895 bytes.

Why: several overlapping ways to bring up and drive the Calcify path existed, and two campaigns ran on the wrong one. The generic full-path smoke builds a per-order PostgreSQL intake profile on the JDK HTTP server with four partitions; the validated 10k profile (October 2, D7) is Netty with in-memory bounded intake and a durable Redpanda ack, sixteen partitions and standing makers. The October 2 campaign first reused the smoke by mistake (recorded in the 10k timebox research note), and the first October 16 full-chain attempt did the same and reported a false ingress limit.

Selected: `calcify-full-path-smoke.mjs`, `calcify-joined-capacity.mjs`, `calcify-verify-existing.mjs`, the four `calcify-resolver/*-check.mjs` runners, and twelve Kotlin research tests (the S0 projector and lane tuning spikes, the S3c/S3d ledger scale and lane-with-ledger spikes, the S5 sharding simulation, the state commitment cost spike and options bench, the re-encoding cost tests, the incremental commitment, ledger scale and projector throughput spikes). None is run by CI or by the supported path.

Not selected, and why: `calcify-direct-bootstrap.mjs`, `calcify-direct-capacity.mjs`, `calcify-fullchain-soak.mjs`, the droplet runner, the scheduled-CI spikes `S0EndToEndCostSpikeTest` and `S4EndToEndSpikeTest` with the `ScaleLedgerPrototype` ledger S4 uses, the capacity-path tests, and everything under `scripts/dev/calcify-financial` (hash-pinned by retained evidence). Reef keeps the executable path; this import keeps how the older numbers and proofs were produced.

Original relative links refer to the source checkout at the recorded commit. No evidence directories, ignored files or live state selected; no capacity claim made.
