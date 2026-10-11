# Calcify aged contention proof — October 11, 2026

Baseline Reef b9a8756e8d0efc5e8b665a5c62da1ab064d01539 plus exact source overlay
in source/. Local-only proof checkpoint makes imported paths Git-tracked; it is
not a production implementation commit or a merged Reef change.

Attempt02 completed: capture/context 10k/s gate FAIL; full source/context and
synthetic financial/SQL integrity PASS. Resolved deadline bounds8106.99–8145.11/s,
3,063,383 eventual exact contexts. 366,625 independently generated financial trades
audited from SQL, including post-load work. Financial inputs are not captured
trades; no production financial authority or full integration qualification.

Read compact-verification.json, aged-run-02/capture/results.json and summary.json,
actual-profile.json plus actual-profile-02.json, plan.json and closure.json.
Attempt01 fails on omitted Compose profiles; its unchanged source and outputs
remain beside attempt02 correction. Smoke and failed setup/build logs retained.
The original summary omits scheduled/dispatched fields because it referenced an
absent loader offeredPairs property; actual loader counters are retained in
capture/results.json and compact-verification.json. No measured rates changed.

All services stopped; named volumes preserved locally. Raw broker topic records,
SQL database and resolver state are NOT exported. Archive supports inspection of
logs, configuration, source hashes and audit receipts, not portable independent
replay of all raw records. Images, binaries, caches and dependencies excluded.
Only synthetic local test credentials reef/reef appear in scoped configs.

Runtime/test classes compiled;17 focused Node tests and script-surface/retention
checks pass. Capacity runner exit1 remains correct measured-failure status.
