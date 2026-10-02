# Archive policy

Reef keeps current code, contracts, accepted decisions, operational docs, active plans and latest complete evidence bundle per topic. Older attempts, superseded plans, dated audits and historic reports move here. A latest bundle includes required fixtures, manifests, correction notes and run companions; retain failures when latest attempt failed. Age alone does not identify superseded active work.

## Import protocol

Import is completion step for each Reef feature, fix, refactor or code-working session, after implementation/tests/contracts/docs/latest evidence and affected guidance/overview updates. Review touched topic for superseded plans, reports, research, handoffs and older evidence. No-op pass records why nothing is superseded; no artificial snapshot of continuously maintained code/docs is required.

Before import, extract still-live tasks and current-system facts from mixed records into Reef owners. Reef keeps only material needed for active planning, session understanding, onboarding, current system/design, operations and latest complete verification. Preserve latest failed attempt, necessary fixtures and correction companions; do not select only favorable results or archive active dependencies by age alone.

1. Check source Git state; select tracked historical files and inspect active references and script consumers. Do not sweep ignored local directories.
2. Copy exact bytes to `records/reef/<original-path>`. Existing destination with different hash is a conflict, not an overwrite.
3. Add `manifests/<date>-<import-name>.json` with schema version 1, source repository URL and exact 40-character commit, selection policy, and unique file entries (`source_path`, `archive_path`, `bytes`, `sha256`, `reason`).
4. Run integrity, hygiene and append-only checks; commit and push import. Verify remote commit contains destination blobs matching manifest before removing source files.
5. Repair active Reef links to immutable archive commit URLs, add relocation inventory and retention index, and check references. Keep immutable source manifests unchanged; relocation inventory resolves old paths.
6. Land archive before corresponding Reef removal PR. Rollback restores files from pinned archive commit after hash checks.

Imports are append-only. Existing files and manifest entries cannot change or disappear. Corrections are new notes linked from index; original success and failure claims remain intact. Original relative Markdown links refer to source checkout at recorded commit; generated index links both archived bytes and original source context.

Do not import credentials, personal/account data, live state, ignored artifacts, dependencies or build output. Synthetic fixtures already tracked in Reef are eligible. CI's recognizable credential scan is a guard, not proof that arbitrary data is safe.

Git removal reduces current checkout size. Existing Reef Git history retains old blobs; history rewriting requires a separate explicit task.

## Answering historical questions

Search index/manifests by original path, topic, date, run ID or source commit. Read only relevant original records and accompanying corrections; parse their stated configuration, results and limitations. Cite archive path/commit and original source commit. Historical scope is evidence of its recorded run or design, not current Reef behavior, approved architecture or open work. Verify current implications against Reef source/tests/contracts/accepted decisions and latest evidence.

Keep bulk history here. When relevant lesson becomes part of current work, promote concise verified fact into Reef owner with archive citation. If required history is unavailable, report missing evidence and its impact instead of inventing claims.
