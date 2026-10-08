# Preliminary review
Review instance: 1 of 3. Author explanation not yet read. Frozen scope verified against after.json/review.patch, branch and HEAD.

No confirmed defect yet. Concerns to reconcile:
- New correctness raw marker validates PASS and kernel/managed-adapter source hashes, unlike bootstrap full E3 candidate/build/manifest checks. Verify intentional source-based reuse and actual proof receipt binding.
- Diagnostic uses bounded bootstrap clients and parse checks, ordinary measurement path. Verify complete 300000 action ACKs, 300001 histories, owner parity and replay remain mandatory.
- Diagnostic reuses assessment by synthetic conservative shape, then strips conservative heap checks. Check malformed/missing telemetry cannot claim useful-rate success; empirical result stays LIMITED.
- Fixed 4GiB heap stop uses 80% sampled threshold with sticky failures. No finite upper claim; native/RSS remains observation.
- Timed CPU scope includes post-deadline drain; inspect stage/report labeling. Fresh single-arm run needs explicit finite supervised resource budget and actual config/capability receipt; current preparation excluded from freeze.

Initial check: node --test rate-proof.test.mjs rate-supervision.test.mjs: 51 tests passed, zero failed. Graph generation 2026-10-05T07:02:27Z: scripts excluded; Kotlin metadata_changed. Direct source fallback used; no graph absence claim.
