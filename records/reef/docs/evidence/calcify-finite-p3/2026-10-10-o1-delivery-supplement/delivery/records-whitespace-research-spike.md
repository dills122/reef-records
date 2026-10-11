# Bounded delivery diagnostic research spike

Two failed diagnostic assumptions preserved: archive-wide whitespace check treats
original unified patch context as authored indentation; text-mode subprocess
decoding assumes every diagnostic is UTF-8 despite raw synthetic protobuf bytes.
No product/source or archive blob changed. Both are diagnostic scope/encoding
failures, not archive integrity failures. Full36624record integrity/hygiene and
4tests already passed. All230new imported SHA256/bytes still match manifest.

Read-only reproduction captures exact stdout/stderr bytes in
records-original-patch-whitespace.log, exit2. Scoped authored INDEX/provenance/
manifest whitespace exit0. Against unchanged fetched1419b7e0, all231records/
manifest paths A; no M/D/R/C. Archive policy requires preserving imported bytes,
so normalizing patch context or protobuf is invalid. Minimal correction: scope
whitespace to authored metadata and keep raw diagnostics binary-safe.

Return gate met: import exact hashes unchanged; authored metadata clean; complete
archive tests pass; append-only identity established. Manager accepts diagnostic
correction, may commit/publish archive. O1 code untouched; no review counter reset.
Initial push before commit contained original1419b7e0 only, no record import; next
fast-forward publishes validated actual commit. Hosted exact-base gate still required.
