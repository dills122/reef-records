# Preliminary independent review
Review instance: attempt 3 of 3, cycle 1 of 3. Counts retain prior attempts; no reset.

Scope: whole dirty E4 patch at baseline 29a8926d33f9e2dc7278a1676a6fa3272628de3c; frozen 27 code paths verified with zero hash drift. Tracked owner-document changes included. No author packet read. Blind first pass partially constrained because bootstrap already carried author claims and earlier result summaries; those claims are unverified testimony.

Source inspected: ACK journal and recovery/publication ordering; whole FinancialRateProbe including compact actual Reference and parent/child/replay path; canonical leaf owner and focused tests; broker activation membership and callback changes; heap profile changes; bootstrap calibration admission/result validators; rate adapter supervision; physical adapter/inventory/evidence; CI list and current RFC/board contract.

Preliminary findings: no concrete P1/P2 source defect identified. Previous duplicate-cut overload correction now constructs List<JsonNode> with history + listOf(history.last()); exact IllegalArgumentException/message asserted. No broadening of production/reference exception handling. Reference accept checks complete known-key delta, journal, sequence and checksum before owner writes. Owner retains String leaves, hashes complete canonical owner without full decoded materialization; businessView materialization appears only finite selfCheck/tests, not observer actions.

Remaining checks: reconcile supplied author packet after this ledger, inspect current build/test receipt and complete suite, finish ACK and supervisor failure-path test scrutiny, retain final source hash check. Same-candidate49 and real compact diagnostic are pending and excluded from readiness proof here. Existing old-source actual run cannot transfer. Conservative cost derivation, native/RSS bounds, ordinary/aged rates, SQL/API, production authority, final retention publication and delivery remain unverified.

Executed checks: git branch/base/status; SHA256 of all27 frozen paths. Pure Node six-file focused control suite running; no JVM/compiler/build/broker/workload started by reviewer.
