# Archive quality gates

Run `python3 scripts/check_records.py` and `python3 -m unittest discover -s tests`. PR CI checks source paths, byte counts, hashes, complete inventory, append-only imports, unsafe filenames, symlinks and recognizable credential patterns. Test validator failure paths when validation changes. Never execute imported scripts or logs.
