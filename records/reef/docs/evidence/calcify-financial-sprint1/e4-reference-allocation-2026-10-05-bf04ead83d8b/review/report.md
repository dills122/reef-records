# Pure Reference allocation profile review

Verdict: **Ready**, scoped to isolated allocation research and proposed evidence supplement. No blocking findings within stated scope.

Review instance: one independent pure-cost method/results review. Separate from three exhausted actual qualification instances; no qualification instance reopened or authorized. Read-only review; no broker launch, Java execution, recompilation, source/class changes, or capacity run. Writes limited to this review directory. Fresh bootstrap supplied by root; author summary already present in target artifacts, so fully blind first pass unavailable. Independent-review skill used for evidence/claim reconciliation; no additional reviewer spawned.

## Findings

No actionable blocking findings. Root prospective phrasing confirmed: same 2,101 pre-parsed complete histories; two warmups plus five measured repetitions per arm; sequential ordinary then canonical-leaf; accept median 2,244,541,400 versus 2,370,007,696 bytes (+5.59%); final owner digest 66,991,464 versus 7,431,576 bytes (-88.91%); per-repetition combined allocation medians 2,311,532,864 versus 2,377,439,272 bytes (+2.85%). Combined median computed from each repetition's sum, not assumed additive generally.

## Plan review

Profile meets bounded research objective: frozen Reference implementations run on identical finite committed histories, with final semantic owner and history-chain parity checked on all fourteen iterations. Preparation/extraction/result closure preserve source/build provenance and failures. This evaluates implementation-specific single-thread allocation for accept plus one final digest. Does not qualify ordinary driver, compact driver, retention behavior, throughput, capacity, or safe upper cost. Supplement manifest remains proposal with publicationAuthorizedByRoot=false; Ready concerns evidence quality, not publication authorization.

## Author-claim reconciliation

| Claim | Evidence | Status |
| --- | --- | --- |
| Same complete histories and resources | extract.mjs, inspected raw verifier, independent Python record checksum/before-delta reconstruction, read-only raw pair replay | Confirmed: exact extracted histories; 2,100 envelopes; 2,101 records; opening balances/policy match; owner and chain equal |
| Two warmups and five measured repetitions each | Profile.java iteration -2 through 4; profile-result.json fourteen records | Confirmed: -2/-1 warmup, 0 through 4 measured each arm |
| Correct allocation scope | Profile.java start/accept-end/final-end thread counters, frozen Reference accept and digest source | Confirmed with boundaries below |
| Frozen implementation provenance | prepare.py/close.py, source/class manifests, classmaps, jar hashes, Java binary hash, supplement file hashes | Confirmed all inspected hashes/sizes and map associations; no simple-name collisions |
| Summary arithmetic | independent recomputation of all four metrics' arrays/min/max/median; stdout/result equality | Confirmed |
| Failed first launcher retained | failed1 source/exit/stderr/stdout | Confirmed: missing baseline ownerDigest lookup; no successful allocation result claimed for failed launcher |

## Verification performed

Non-mutating Python check validated every listed supplement hash/size, both snapshot manifests and source/class members (33/92 ordinary, 36/97 compact), exact classmap associations, 48 dependency jar hashes/classpath order, and Java binary hash. Independently reconstructed owner from documented empty-owner initial state plus complete deltas, verified every unsigned record checksum, sequence, prior sequence/checksum, final owner SHA-256 and chain. First reviewer reconstruction omitted initial zero/empty/null fields and failed a before-delta assertion; corrected reviewer initializer only, then checks passed. Correction recorded in checks.json.

Read-only Node check imported inspected inspect-raw.mjs, reran pairRaw and inspectRaw against bootstrap-attempt3/bootstrap-compact1, compared extracted history.json by exact deep equality, and compared pair-validation.json. Passed. Verifier checks raw envelopes, full histories, reconstructed owners, publication/member journals and opening resources; neither broker nor driver executed.

Independent result check verified successful exit, empty success stderr, profile stdout equals JSON result, fourteen positive recorded observations, exact warmup/iteration sets, owner/checksum/count parity, and every summary statistic. Final checks pass; machine-readable evidence in checks.json.

## Measurement boundaries and residual limits

- ThreadMXBean counter targets current platform thread; all inspected accept and digest operations synchronous. Background compiler/GC/other-thread allocations and native memory absent from this counter.
- Reference construction, class loading/method discovery before iteration, and shared JSON parsing occur before start counter. Compact constructor's owner/mapper allocation excluded. Mapper lazy cache work inside accept remains included; ordinary class-local mapper warmed/reused across iterations, compact per-owner mapper fresh per Reference. This matches respective implementation behavior but does not normalize mapper lifecycle.
- accept interval includes iteration over pre-parsed history, reflective accept invocation/varargs and implementation canonicalization/checksums. Final digest interval includes boundary plumbing, reflection, plus ordinary getOwner reflection. Overhead neither separately calibrated nor subtracted. End-of-iteration parity checks, record-map creation and serialization occur after final counter and are excluded.
- Financial package classes child-loaded independently for each arm; dependency jars parent-shared, Reference objects fresh per iteration. Source map keyed by simple class name has no observed collisions. Loader/classmapper setup symmetric in mechanism; shared dependency/JIT state and fixed ordinary-first order not randomized or isolated by JVM. Timing is descriptive only; two warmups do not prove all compilation/cache transients finished.
- Five measured repeats in one JVM, one finite fixture, -Xms128m/-Xmx768m. Gross allocated bytes are cumulative churn, can exceed heap limit, and are neither retained heap nor peak occupancy. Results establish observed costs for this profile only. No actual driver sampled-heap cause, retained-memory upper bound, safe ordinary/capacity authorization, workload-rate claim, or broader performance claim follows.

## Recommended next actions

May retain profile plus this report/checks as explicitly bounded cost-research evidence. Preserve observed accept increase alongside final-digest decrease and combined increase. Any broader qualification remains outside this verdict and exhausted actual-review loop.
