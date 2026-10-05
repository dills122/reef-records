# Isolated immutable canonical-owner prototype

Scope: only ignored owner-shape-prototype subtree. No tracked source edits, root Gradle compilation, brokers, database, network, or loader. Kotlin2.4.20, Java21; read-only current resolver-probe-deps jars. Standalone build/classes and all logs stay here. Original Kernel and full Oracle copied byte-exact from baseline; baseline/source-manifest.json freezes every current Financial*.kt before adaptation. Full copied draft FinancialRateProbe also compiled independently. Main candidate integration forbidden until root instruction.

## Implementation and bindings

src/main/kotlin/com/reef/platform/calcify/financial/CanonicalLeafOwner.kt stores 13 category maps of String→String and scalar/policy roots as canonical immutable Strings. Every logical leaf remains complete. Known-key get parses fresh touched leaf; contains uses map membership. No full category materialization during normal accept. Root policy remains canonical Object JSON String, root scalar types preserved. Existing null leaf writes delete keys; root null remains present. clear drops all values and roots, matching original removeAll().

Canonical digest streams root keys and category keys sorted lexicographically, JSON-escaped keys, punctuation and already-canonical leaf bytes into SHA256. No complete JSON string, category tree or all-values list. O(N) key-sort references plus per-leaf UTF8 conversion remain temporary allocations. BigInteger economics, request/context digest, semantic delta generation, complete expected-vs-actual delta comparison, grouped journal comparison, sequence/prior-chain and full unsigned-record checksum checks unchanged.

Draft bindings in draft/reference-adaptation.diff (3 context lines): Reference owner→helper; direct contains and known-leaf get; writes→helper.write; finite businessView→explicit materialize; selfCheck ownerDigest; live final ownerDigest+clear; result-only restored ownerDigest. Internal finiteOwnerView visibility exists only for focused finite checks. Full copied draft source is draft/FinancialRateProbe.kt; source hashes frozen in evidence/frozen-source-hashes.json. CompactReferenceFixture extracts same adapted Reference block; LegacyReferenceFixture independently retains original ObjectNode Reference block from snapshot.

## Tests and honest TDD receipts

red.log: meaningful RED genesis canonical digest mismatch with stub digest UNIMPLEMENTED. First sandbox wrapper failed on ~/.gradle lock; first escalated compile used wrong relative dependency path. red.log was overwritten for first three attempts; exact early compile output lost. Reconstructed setup receipt explicitly labels limitation; no claim original early raw logs retained.

green.log: compile failure from test ObjectMapper.textNode API typo. green-2.log: compilation passed, finite parity/replay reached negative controls, test rejected too narrow exception class. Reordered SETTLE before CAPTURE inherits NullPointerException reading missing obligation in both unchanged economics; failure happens before writes. Tests now accept RuntimeException fail-closed rather than falsely claim specific rejection reason. Adapted Reference mechanics remain unchanged.

attempt-4-green: exit0, 2488 checks, 2100 actions/2101 records, 40 full independent Oracle prefixes. Every input verified by legacy and compact complete delta/journal/history validators. Full logical owner and canonical digest checked every40 plus first40/final against legacy and Kernel. 1000 settled +100 pending retained all1100 executions,2100 dedup,1000 effects,1000 attempts,100 due items; CAPTURE13fields/effect4legs checked. Exact complete-history replay after compact clear checked every logical leaf, owner digest, chain and2101count.

attempt-5-full-draft-green adds full draft compilation and structural retained representation checks: all13category maps,9712leaf entries=(1000×9)+(100×7)+12genesis balances/versions, all map keys/values and root values String. Its receipt/log is authority for final result. Each later attempt has exact command/start/end/exit/source hashes. No integration regression/E3/bootstrap receipt transfers from this prototype.

Helper tests cover genesis/empty roots, null fields versus null deletion, numbers versus numeric Strings, escaped/control/Unicode keys, nested arrays/objects, insertion order, constructor/input/read/materialized-copy mutation isolation, clear. Negative controls cover missing/extra delta, wrong before/after, omitted/changed dedup context, journal leg, sequence gap, prior chain/checksum mutation, duplicate economic action, truncated/extra/reordered result cut, same-count altered execution/dedup/effect values. Delta mutants are re-signed so checksum mismatch cannot mask comparison failure; rejected records leave owner/count unchanged where asserted.

## Review questions and limits

Review stored schemas/facts1:1, canonical token parity, alias isolation, hot-path bounded get/contains, complete Reference validation, call-site digest/clear wiring, String/cardinality assumptions. Independent reviewer must inspect copied sources and diff with fresh context; this packet is author testimony.

No retained-byte upper bound, heap fit, allocation/CPU improvement, throughput benefit or ordinary150000 admission established. String headers/backing arrays/maps/key tables, temporary touched parsing/canonicalization, final sorting, fixed ObjectMapper caches, worker graph/client/ACK baseline/native/physical resources remain unbounded here. Lower-bound cardinality reduction is verified only for this generator; all existing caps/arm/source wrapper bounds remain unchanged. Raw wrapper cap caveat follows corrected root research:135324B complete wrapper can exceed65536B unsigned-history allowance. No raw-envelope guarantee inferred.

Retention no-op: active ignored prototype, no tracked documentation/product contract change or superseded record removal. Parent integration, if approved, requires its own current-source build identity, relevant regression/Node/E3 checks, fresh review, docs/evidence/retention and bounded live diagnostic.
