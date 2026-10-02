# AGENTS

Start at README.md and docs/ARCHIVE_POLICY.md. This repository stores Reef history, not active product code or execution plans.

- Preserve imported bytes, failed attempts, corrections, timestamps and measurement scope. Add correction notes separately; never rewrite originals.
- `records/reef/` owns immutable imported files. `manifests/` owns append-only provenance. `INDEX.md` owns navigation. `scripts/` owns archive checks.
- Source paths, byte counts and SHA-256 must match manifests. No symlinks, secrets, build caches or live database exports.
- Keep current code, contracts, decisions, operating docs and latest complete evidence bundle per topic in Reef. Preserve fixtures used by current scripts.
- Use `codex/` feature branches and PRs after initial empty-repository bootstrap. Never remove Reef sources until destination is committed, pushed and checksum-verified.
- Checks: `python3 scripts/check_records.py`; `python3 -m unittest discover -s tests`. No dependency install or product build.
- Keep AI Central light: base steering only, no language profiles or skill bundles. Shared source is local, never vendored.
