# Contributing

Use feature branches and pull requests. Keep records byte-identical and add provenance before publishing. Follow [archive policy](docs/ARCHIVE_POLICY.md).

Run:

```sh
python3 scripts/check_records.py
python3 -m unittest discover -s tests
python3 scripts/check_records.py --base origin/main
```

Last command checks append-only behavior against fetched base. CI requires Archive integrity and Repository hygiene. No runtime application dependencies. Update INDEX.md with archive and original-source links for each import. Record corrections separately.

AI Central source: shared `$HOME/.ai-central`, revision `9043d45fcbfc56a8efbc4db13b149760fa833c8e`; base profile, no bundles. Setup preview/apply: `$HOME/.ai-central/scripts/setup-ai-context.sh <checkout> --yes --mode link --profiles base --bundles none --dry-run` (omit `--dry-run` to apply). Project-owned AGENTS.md and two steering files are customized real files; source and skills are not committed.
