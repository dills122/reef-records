# Calcify matched no-cold-restart control — October 11, 2026

Product baseline b9a8756e8d0efc5e8b665a5c62da1ab064d01539; same production images
and source as prior cold-restart treatment. Fresh cohort, generation5, same300s
10,500 offered trades/s,64makers,retention0, financial/SQL start and crash/replay.
Control omits only intended cold resolver restart.

Control capture PASS:10,321.21–10,349.52 full contexts/s; final3,131,951 exact
contexts. Financial/SQL full replay and balances PASS361,075synthetic trades/37
domains, including post-load work. Financial inputs independent of captured trades.
Cold-restart treatment remains failed8,106.99–8,145.11/s; its unchanged originals:
https://github.com/dills122/reef-records/tree/8fedbbe309a75a72a0bd58ba2640cd9c9aa9fb51/records/reef/docs/evidence/calcify-aged-contention/run-2026-10-11-b9a8756e

Read plan.json, actual-profile.json, run/capture/results.json, comparison.json,
resource-comparison.json, comparison-limitations.json and closure.json.
Ranges reflect observation timing, not causal or statistical confidence bounds.
First-minute throughput ranges overlap; control leads before cold-restart time.
Financial progress/recovery prefix, actual fault times, broker/SQL startup,
cache/disk occupancy and minor host/observer overhead differ. No pure cold-restore
cost claim from one sequential pair. Matching sampled4.707GiB; identity lifetime
and recovery reserve remain open contracts. Next proof: retained-state restart.

All owned services stopped after audits; volumes preserved. Raw broker topic
records, SQL database and resolver state are not exported. Images/binaries/build
caches excluded; archived logs and audit receipts do not enable portable replay
of every raw record. Only local synthetic test credentials reef/reef appear.

22 focused Node tests pass; comparison regenerates byte-identically after strict
missing-fault-field rejection. Runtime/probe code unchanged. Source checkpoint
uses alternate Git index, local-only; working branch/index untouched.
