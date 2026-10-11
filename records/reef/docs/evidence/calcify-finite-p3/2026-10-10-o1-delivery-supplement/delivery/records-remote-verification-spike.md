# Bounded remote tree verification alignment

Initial repository-wide recursive GitHub tree response reported truncated=true;
first verifier stopped before importing an incomplete path inventory. No archive
bytes changed, no verification success claimed. Root commit/tree identity matched.

Minimal correction: resolve exact proof subtree using nonrecursive ancestor trees,
require untruncated subtree recursive response, resolve three metadata files through
nonrecursive parent trees. Then verify each expected blob OID, decoded remote bytes,
size and SHA256 against committed manifest/local files. Full repository unrelated
records excluded from this new-import check; no weaker partial-tree acceptance.

Return gate: all230 imported records plus manifest/provenance/INDEX verified from
remote objects; actual successful receipt required before owner links finalized.
O1 source unchanged; no review reset or product scope change.

Return gate passed: cbf2413db33dc7cb65c339cbc51e0eb98c2633f3/tree3bf5b59ba38a7a2d790ebf23c989448eb16b2401, all230records/7002941bytes plus3metadata paths verified from199unique decoded remote blobs. remote-verification.json retains exact paths.
