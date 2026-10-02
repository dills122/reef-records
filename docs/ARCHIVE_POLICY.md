# Archive policy

Reef keeps current code, contracts, accepted decisions, operational docs, active plans and latest complete evidence bundle per topic. Older attempts, superseded plans, dated audits and historic reports move here. A latest bundle includes required fixtures, manifests, correction notes and run companions; retain failures when latest attempt failed. Age alone does not identify superseded active work.

## Import protocol

1. Check source Git state; select tracked historical files and inspect active references and script consumers. Do not sweep ignored local directories.
2. Copy exact bytes to `records/reef/<original-path>`. Existing destination with different hash is a conflict, not an overwrite.
3. Add `manifests/<date>-<import-name>.json` with schema version 1, source repository URL and exact 40-character commit, selection policy, and unique file entries (`source_path`, `archive_path`, `bytes`, `sha256`, `reason`).
4. Run integrity, hygiene and append-only checks; commit and push import. Verify remote commit contains destination blobs matching manifest before removing source files.
5. Repair active Reef links to immutable archive commit URLs, add relocation inventory and retention index, and check references. Keep immutable source manifests unchanged; relocation inventory resolves old paths.
6. Land archive before corresponding Reef removal PR. Rollback restores files from pinned archive commit after hash checks.

Imports are append-only. Existing files and manifest entries cannot change or disappear. Corrections are new notes linked from index; original success and failure claims remain intact. Original relative Markdown links refer to source checkout at recorded commit; generated index links both archived bytes and original source context.

Do not import credentials, personal/account data, live state, ignored artifacts, dependencies or build output. Synthetic fixtures already tracked in Reef are eligible. CI's recognizable credential scan is a guard, not proof that arbitrary data is safe.

Git removal reduces current checkout size. Existing Reef Git history retains old blobs; history rewriting requires a separate explicit task.
