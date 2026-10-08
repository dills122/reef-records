# Arm5 lifecycle source audit

Scope: read-only source audit during active arm5; no process attach, profiler, load, test or source edits. Current source authority; graph coverage degraded. Parent reports start03:06:14Z,41samples by03:09:26Z,10.9GB allocation below14GiB guard. Resource samples cannot identify exact active phase.

## Prefix complexity

Actual diagnostic observer (`FinancialRateProbe.kt:788–807`) parses each committed result, validates contiguous input ordinal and durable source membership/offset/input, then calls `Reference.accept` for every history record. Reference independently computes bounded CAPTURE/SETTLE economic changes, validates every before/after delta and journal leg, dedup membership, sequence/prior checksum, and checksum of that single record (`:85–147`). Known-key owner reads/writes; no complete owner materialization/digest per input.

Expensive unit control differs: `FinancialRateReferenceTest.kt:59–84` compares `digest(kernel.ownerView())` and `reference.ownerDigest()` after each of2100 actions. Repeated growing full-owner scans yield quadratic aggregate prefix work (sorting adds factors). Its observed55sec/few-minute duration must not be multiplied by150 to estimate actual150000-trade arm. Explicit40-prefix self-check is separate CLI mode, not called by diagnostic-run.

Actual main computes complete owner digest only after live workers close (`FinancialRateProbe.kt:895`), then clears that reference and builds independent result-only replay. One second full digest follows complete replay (`:954`). `FinancialCanonicalLeafOwner.kt:54–72` sorts category leaf keys then streams canonical leaf bytes: O(K log K) key-sort work plus O(B) encoded bytes per complete digest; O(K) temporary key references. Record validation remains bounded work per current history record; two full passes over300001 histories (live observer and replay), rather than repeated scans of complete prior history.

## Expected phases and finite waits

1. Startup KafkaStreams RUNNING wait60sec. Fresh-arm before-load producer flush120sec and empty coverage wait120sec; no aged cohort. Setup elapsed time precedes timed clock.
2. Pace150000 trade offers at intended2500/s, send CAPTURE and SETTLE for300000 source actions. Semaphore16384 bounds unmatched suffix; each permit acquisition waits at most10sec. Producer max.block10sec/delivery30sec. Main still attempts complete frozen cohort if pipeline is slower than intended rate; send loop can therefore extend beyond60sec. Deadline counters accrue at individual events only.
3. After complete send loop and at least60sec timed window, producer flush max120sec, then observer/durable-journal full coverage wait max120sec. Finalcounts/drain remain separate from60sec deadline counters. Finaldrain begins at producer-flush completion, not timed deadline.
4. Shutdown caps: producer close15sec, observer join5sec, sampler join15sec, KafkaStreams close15sec, journal writer join5sec. These are individual API/join caps; not guaranteed cumulative55sec delay. Journal checks failure after closing handles.
5. One complete independent owner digest; capture history count/chain; clear reference; GC. No separate local wall timeout for digest/GC.
6. Read-committed result-only replay to captured exclusive committed result offset. Require exact300000 inputs/300001 history records, contiguous ordinals, expected source action per input, complete independent economics/history checks. Poll loop bounded5min (`:941–952`). One final complete owner digest plus exact count/chain equality. Digest/finalization can extend beyond replay-loop cap, under outer supervisor.
7. Journal telemetry hashes retained journal files; construct parity/measurement artifacts; heap-guarded publication. No separate local wall timeout for file hashing/owner digest/publication. Frozen arm5 supervisor timeout1800000ms (30min) bounds complete wrapper execution with resource/lifecycle guards.

Diagnostic does not execute bootstrap-only separate-JVM managed recovery branch. Result-only replay is verified in this arm; old E3 managed proof scope remains separate.

Three-plus minutes without final measurement is compatible with complete-cohort sending/backpressure, drain and later full replay. Source alone gives phase bounds, not current phase or predicted completion time. No final deadline/rate/parity claims until complete artifact publication.

## Completed arm5 observation

Parent reports wrapper PROOF_READY exit0, assessment CLIexit1 target miss; published measurement deadline settled63104/final150000, producer132040ms, finaldrain8139ms, complete300001-history replay98545ms. These observations confirm complete-cohort backpressure plus bounded final replay. Source audit above remains unchanged. Final producer totals are not60sec rates.
