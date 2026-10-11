# OCR install failure spike

## Outcome

Supported recovery: set `OCR_NO_UPDATE: '1'` on pinned composite action step, before its first `ocr version` subprocess. Preserve action SHA bccbc15f785269400735d5255540c231e6c02b6d, npm version 1.12.9, merged 1,500,000 soft token budget, concurrency 2, rule exclusions, trusted-base execution and all test/review gates. Proposed unapplied two-line patch: `proposed-trusted-base.patch`. No identical retry recommended.

## Exact observed failure and limits

PR 485 head dcb106c4ddd5ccda60df7c8e6411fca88ef5be14; run 38068796768/job 114261793571. Backend log is untruncated. Install added two packages, then version subprocess printed v1.12.9. Several Configure OCR subprocesses succeeded. Next launcher failed requiring ../scripts/platform from global package bin/ocr.js, exit 1, MODULE_NOT_FOUND. Cleanup terminated detached node and `npm i @alibaba-` processes. Range resolution and Run OCR never ran: zero substantive review coverage in this attempt, not a 17-file failure verdict.

Verified pinned package contains scripts/platform.js. npm 1.12.9 tarball SHA512 integrity matches registry metadata. Published launcher, updater and platform files byte-match pinned upstream commit. Launcher line 89 starts detached update.js unless OCR_NO_UPDATE is nonempty. Updater line 164 invokes npm i -g package@latest, changing globally installed package while native/config subprocesses continue. This concurrency hazard is directly established by source; observed orphan installer plus missing package module strongly supports replacement race as failure cause. Log does not capture npm rename/unlink operations, so precise filesystem interleaving remains inferred. Earlier install 1.12.9 versus result-manifest 1.12.13 discrepancy is consistent with this path, not separately proven.

## Primary evidence

- [Pinned launcher](https://github.com/alibaba/open-code-review/blob/bccbc15f785269400735d5255540c231e6c02b6d/bin/ocr.js): top-level platform require; OCR_NO_UPDATE gate; detached updater; native child inherits env.
- [Pinned updater](https://github.com/alibaba/open-code-review/blob/bccbc15f785269400735d5255540c231e6c02b6d/scripts/update.js): registry latest lookup and global npm replacement.
- [Pinned action](https://github.com/alibaba/open-code-review/blob/bccbc15f785269400735d5255540c231e6c02b6d/action.yml): install invokes ocr version, configure invokes repeated CLI subprocesses; no OCR_NO_UPDATE override. Caller step env inherited by composite run steps.
- [Pinned tests](https://github.com/alibaba/open-code-review/blob/bccbc15f785269400735d5255540c231e6c02b6d/bin/ocr.test.js): launcher tests use OCR_NO_UPDATE=1.
- [Published npm 1.12.9 metadata](https://registry.npmjs.org/@alibaba-group%2Fopen-code-review/1.12.9), retained metadata/tarball/file inventory and integrity proof.

## Bounded verification and delivery scope

Offline VM proof executes published launcher with mocked process, filesystem and child_process only: no actual child processes, provider calls, network, install or credential reads. Default environment records two launches (detached updater and native); OCR_NO_UPDATE=1 records native only and inherited env. Node22.23.3 exit0. Two preliminary harness syntax failures and bounded CommonJS framing correction retained in harness-correction.md.

Follow-up source scope: workflow step env, existing OCR workflow test block, existing CI_OPERATIONS pilot paragraph. Rule remains merged/read-only. Fresh independent config review instance 2 of 3 required; no reset. Original config review1/PR486 merge remains accepted. O1 independent review cap3 of3 unchanged. Ordinary CI must pass before trusted-base merge, then manager initiates fresh PR485 label event. Hosted logs must show installed and actual review version1.12.9 and no detached npm updater. Result manifest must establish all17 handcrafted selected paths completed with31 generated Java excluded and no failed/unreviewed selected paths; budget/ordinaryCI success alone insufficient. Actual retry cost and coverage remain unknown until hosted result.

No product source, workflow, rule or Git changes performed in this research. No provider or secret access. Saved proposal only; manager approved routine follow-up within existing recovery scope.
