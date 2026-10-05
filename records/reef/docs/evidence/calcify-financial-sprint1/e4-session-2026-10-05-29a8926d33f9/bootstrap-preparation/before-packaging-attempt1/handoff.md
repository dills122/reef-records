# Bootstrap preparation operator handoff

Worker owns ignored bootstrap-preparation only. Builder prepared, not run. No tracked source edits, broker commands, topics or payload. Existing frozen source/capability/config/review/E3 files untouched. Synthetic refusal controls and Node syntax check pass; controls do not validate actual proof or measured resources.

Deterministic source identity:18 Financial*.kt sorted full paths, then8 Node helpers in bootstrap-calibration.mjs required-list order. candidateSha2565cb4cf59c099736a77eb63fe8fe690fa954901e25fd7e1eed072726c2596aa8d. JSON.stringify(sourceSha256) insertion order retained in preparation-pins.json. Base/sourceHead29a8926d33f9e2dc7278a1676a6fa3272628de3c. Frozen cycle3 source24 SHA6534a59eb4149ae7299bb767c6b74c88beb947a06f0a32f4fd4837c1bd5fc766; accepted E3 execution manifest SHAe40f4cbf595f54a33444772efeb056bf554bf506371df69c4bd558053b3f9afb. Capability rawd684b5318d6c12e1e5933c0b4c0e31a6eb1f226d79d70d53f5c14ab7a60d6e59, build2dfdc070a90dc940792cce59cd27b00e2612d4d947f9d3b44efe71ca2d590e6e, CP2bf9c7bd2ea516e3e5121f5990e2c6b13a85a4424e4f133bf9e44855ad33eb59. Ready report SHA5d539376d7afd8bb5e9bf252200859693d036d511703eeaa5b52b1df58c3c9b3.

Root must first confirm actual successful49 proof, supervisor CLI exit0, wrapper status success and cleanup completed. Root writes e3-closed-confirmation.json outside raw proofRoot with these actual fields:

```json
{
  "schema": "calcify-e3-closed-confirmation-v1",
  "confirmedBy": "root",
  "cliExitCode": 0,
  "writersClosed": true,
  "cleanupClosed": true,
  "proofRoot": "/Users/dsteele/.codex/worktrees/8c6f/reef/.planning/calcify-e4-session-2026-10-05/bootstrap-attempt1/e3-current-candidate",
  "executionManifestSha256": "e40f4cbf595f54a33444772efeb056bf554bf506371df69c4bd558053b3f9afb",
  "supervisorFinishedSha256": "REPLACE_WITH_ACTUAL_FINISHED_RAW_SHA256",
  "wrapperStatusSha256": "REPLACE_WITH_ACTUAL_WRAPPER_STATUS_RAW_SHA256"
}
```

Example above is schema instruction only; placeholders must come from actual closed files and root process completion. No confirmation file created by worker. Builder refuses unsuccessful or incomplete closure, wrong manifests, missing/stale source/CP/config bytes, incomplete/wrong49 arm set, wrong broker, raw tree changes, special/symlink raw files, perfile>8MiB/total>256MiB/entries>65536/depth>64, existing bundle or bootstrap UNIQUE_OUT. It rechecks full raw tree before output creation. Actual closure additionally depends on explicit root testimony because filesystem alone cannot prove all writers closed.

After confirmation only:

```sh
/Users/dsteele/.local/share/fnm/node-versions/v22.22.1/installation/bin/node /Users/dsteele/.codex/worktrees/8c6f/reef/.planning/calcify-e4-session-2026-10-05/bootstrap-preparation/build-inputs.mjs --closed-e3-confirmation /Users/dsteele/.codex/worktrees/8c6f/reef/.planning/calcify-e4-session-2026-10-05/bootstrap-preparation/e3-closed-confirmation.json --bundle /Users/dsteele/.codex/worktrees/8c6f/reef/.planning/calcify-e4-session-2026-10-05/bootstrap-preparation/bundle-attempt1
```

Builder stages12 inputs plus prepared-bundle.json under new worker-owned child. Root copies exact files to bootstrap-attempt1/frozen targets from receipt; capability.json already frozen must remain byte-identical, avoid needless rewrite. Do not place marker or file manifest inside E3 proofRoot: rawmanifest lists every sorted actual E3 file with SHA/size; outer closure evidence separate; marker excludes own evidenceSha256; request adds raw marker SHA. No circular hashes. No writes to E3 proofRoot.

Review JSON verdict READY_BOUNDED_DIAGNOSTIC binds actual report SHA, candidate/fixture/config/build/CP/limits and fixed cohort. Request frozen via current freezeBootstrap,1000 settled100 pending0 aged,2100 source actions2101 history records, no conservative heap or capacity claim. Runtime config remains actual pinned endpoint registry + Admin brokerScope. Supervisor copies registeredResources and ordered localResources exactly; Java21 explicit51-entry CP, sanitized environment, -Xms128m/-Xmx768m, financial-s1-e4-bootstrap-attempt1 prefix, owned process group<=30min, fixed9/10GiB allocated/20GiB guestfree/256MiB raw/5s strict envelope, no broker fault or startup grace. Inner supervisor output proof/supervision; whole config.proofDir watched recursively along with store/journal.

Mandatory broker-free final gate after root copies staged files:

```sh
/Users/dsteele/.local/share/fnm/node-versions/v22.22.1/installation/bin/node --input-type=module -e 'import {readFile} from "node:fs/promises"; import {verifyBootstrapEvidence} from "/Users/dsteele/.codex/worktrees/8c6f/reef/scripts/dev/calcify-financial/bootstrap-calibration.mjs"; const request="/Users/dsteele/.codex/worktrees/8c6f/reef/.planning/calcify-e4-session-2026-10-05/bootstrap-attempt1/frozen/bootstrap-request.json"; const config="/Users/dsteele/.codex/worktrees/8c6f/reef/.planning/calcify-e4-session-2026-10-05/bootstrap-attempt1/frozen/config.json"; await verifyBootstrapEvidence(JSON.parse(await readFile(request,"utf8")),request,config); console.log("BOOTSTRAP_FROZEN_EVIDENCE_PASS");'
```

Request must reside frozen directory for owned-evidence and sibling E3 proofRoot containment checks. Stage directory itself cannot satisfy final containment gate; root owns copying and gate. Any final refusal remains evidence; no auto bypass or source edits.

E3 supervisor cleanup stops owned brokers. Root must separately supervise exact restart with actual current identity/endpoint/config/node/free/du/health receipts and strict ready handoff before bootstrap. Unique bootstrap output must be absent at launch: config.proofDir exact path is bootstrap-attempt1/proof. Existing empty store/journal okay; never delete/precreate/reuse proof. Parent reported proofDir absent before E3, worker did not inspect runtime dirs. Strict rate supervisor cannot restart stopped brokers. Do not leave live rig unwatched while preparing inputs.

After root operational gate only (not executed by worker):

```sh
/usr/bin/env -i PATH=/Users/dsteele/.local/share/fnm/node-versions/v22.22.1/installation/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home TMPDIR=/private/tmp LANG=C LC_ALL=C /Users/dsteele/.local/share/fnm/node-versions/v22.22.1/installation/bin/node /Users/dsteele/.codex/worktrees/8c6f/reef/scripts/dev/calcify-financial/rate-proof.mjs bootstrap-calibrate /Users/dsteele/.codex/worktrees/8c6f/reef/.planning/calcify-e4-session-2026-10-05/bootstrap-attempt1/frozen/bootstrap-request.json /Users/dsteele/.codex/worktrees/8c6f/reef/.planning/calcify-e4-session-2026-10-05/bootstrap-attempt1/frozen/bootstrap-adapter.json /Users/dsteele/.codex/worktrees/8c6f/reef/.planning/calcify-e4-session-2026-10-05/bootstrap-attempt1/proof --authorize-calibration-bootstrap
```

Root owns launch/monitor handoff/complete raw receipts and result assessment. Successful output still bounded empirical diagnostic; changelog allocated attribution and RSS/native/aggregateCPU explicit unknowns. Retention no-op: new ignored active preparation only; all old E3 drafts/failed controls preserved.
