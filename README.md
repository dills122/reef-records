# Reef Records

Historical documents, research, plans and run evidence from [Reef](https://github.com/dills122/reef). Current code, contracts, operating docs and latest complete evidence bundles belong in Reef.

## Browse and verify

- [Archive index](INDEX.md) lists imports and source paths.
- [Archive policy](docs/ARCHIVE_POLICY.md) defines retention and migration.
- [Contributing](CONTRIBUTING.md) describes checks and import workflow.
- [AI context](AGENTS.md) keeps archive edits small and evidence immutable.

Run `python3 scripts/check_records.py` and `python3 -m unittest discover -s tests` with Python 3.11 or newer. No package install required.

Original files live under `records/reef/` with source-relative paths preserved. Import manifests record source commit, destination, byte count and SHA-256. Original Markdown links and embedded filesystem paths are historical facts: follow source-commit links in index for original context. Do not rewrite evidence to repair old links.
