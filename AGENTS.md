# AGENTS

Start at README.md and docs/ARCHIVE_POLICY.md. This repository stores Reef history, not active product code or execution plans.

- Preserve imported bytes, failed attempts, corrections, timestamps and measurement scope. Add correction notes separately; never rewrite originals.
- `records/reef/` owns immutable imported files. `manifests/` owns append-only provenance. `INDEX.md` owns navigation. `scripts/` owns archive checks.
- Source paths, byte counts and SHA-256 must match manifests. No symlinks, secrets, build caches or live database exports.
- Keep current code, contracts, decisions, operating docs and focused current verification summaries and executable fixtures in Reef; bulk evidence belongs here. Preserve fixtures used by current scripts.
- Reef feature/fix/refactor completion includes code/docs/evidence and affected guidance/overview updates, then supersession pass. Import older topic records after promoting still-live facts/tasks to Reef owners; keep current planning/session/ramp-up and system/design context in Reef.
- Historical lookup searches index/manifests and parses relevant originals plus corrections. Return path, archive/source commit, scope and limits; verify present implications in Reef. Do not treat archived checklists as active work or copy bulk history back into Reef.
- Use `codex/` feature branches and PRs after initial empty-repository bootstrap. Never remove Reef sources until destination is committed, pushed and checksum-verified.
- Checks: `python3 scripts/check_records.py`; `python3 -m unittest discover -s tests`. No dependency install or product build.
- Keep AI Central light: base steering only, no language profiles or skill bundles. Shared source is local, never vendored.
