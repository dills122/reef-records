# Preliminary source assessment

Review instance: packaging Attempt1 cycle1 of3. Separate artifact-packaging milestone; prior whole-code Attempt1 cycle3 remains closed and unchanged.

Scope: read-only engineering/provenance assessment of existing bootstrap gates and proposed lossless E3 evidence export. No E4 qualification judgment. Branch codex/calcify-e4-readiness; current dirty source includes 24 frozen implementation paths described by handoff; no edits to source/config/runtime. Reviewer knew high-level packaging idea before inspection; fully blind assessment impossible. Preliminary recorded before worker implementation/proposal inspection.

Source evidence:
- scripts/dev/calcify-financial/bootstrap-calibration.mjs verifyCurrentE3Evidence, lines123-219: manifest/root identity; exact recursively enumerated sorted file set; per-file 8MiB checksum bound, total256MiB; selected plan/result exact source, runners, current compiled/classpath, broker, fixture and successful arm-set binding. Resource JSONL is only a hashed file, not semantically parsed.
- services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialRateProbe.kt validateBootstrapCorrectness, lines317-409: same per-file8MiB/total256MiB gates, exact file enumeration, same-candidate/source/current-compiled binding; selected plan/result bytes determine arm acceptance. Kotlin file count4096 is stricter than Node65536 and manifest receipt helper is1MiB, stricter than Node8MiB.
- proof-supervisor.mjs lines420-488: resource journal append+sync; successful finish atomic publication; journal close separate. Export must follow wrapper exit/supervisor finalization plus all49 successful arm proof, not use provisional running snapshot.
- Work plan explicitly separates code readiness from49-arm E3 and1000/100 diagnostic acceptance.

Observed running original:570 files,27,071,597 total bytes; resource-samples.jsonl21,982,661 bytes only oversize file at snapshot. No supervisor-finished.json at root. Running sizes provisional; no actual acceptance.

Preliminary judgment: existing direct raw root cannot pass either gate due per-file bound. New sibling lossless export is compatible with unchanged gates and scientifically defensible if represented as export rather than original raw tree. Selected plans/results must retain exact bytes, same sibling layout and all original identities. Chunk segmentation does not change source/build/candidate or require rerun by itself.

Required proof before acceptance:
1. Original closed tree and original full manifest preserved unchanged; terminal completion and all49 arms independently checked.
2. Every original file represented exactly once; ordinary files copied byte-for-byte; oversize resource JSONL mapped to ordered contiguous opaque byte chunks, no omission/overlap/normalization. Reassembly total/hash equals original full-file size/hash.
3. Distinct original-root/original-manifest identity versus bundle-root/bundle-manifest identity. Never claim bundle manifest is original manifest.
4. Independent streamed reassembly and reverse-completeness machine check; preserve executable/check receipt and bind its bytes, mappings, original and bundle manifest identities in correctness evidence.
5. Node and Kotlin existing gates pass actual packaged input; count<=4096, manifest<=1MiB, allfiles<=8MiB, total<=256MiB, no symlinks and exact enumerated sets.

Current code automatically verifies bundle completeness/hash and selected financial semantics only. It does NOT automatically validate chunk mapping, original-tree completeness or reconstruct resource journal; those claims require separate operator/export validation. No automatic end-to-end provenance claim from existing gate success alone.

Verdict: Unable to verify actual artifact while original proof RUNNING and export absent. Source fix/new candidate not inherently required for transparent lossless closed-proof export; actual export readiness pending implementation and closed proof inspection.
