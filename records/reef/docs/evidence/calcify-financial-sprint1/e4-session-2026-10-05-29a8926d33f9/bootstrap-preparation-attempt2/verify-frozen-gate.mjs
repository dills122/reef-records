import {readFile} from "node:fs/promises";
import {verifyBootstrapEvidence} from "../../../scripts/dev/calcify-financial/bootstrap-calibration.mjs";
const requestPath="/Users/dsteele/.codex/worktrees/8c6f/reef/.planning/calcify-e4-session-2026-10-05/bootstrap-attempt2/frozen/bootstrap-request.json";
const configPath="/Users/dsteele/.codex/worktrees/8c6f/reef/.planning/calcify-e4-session-2026-10-05/bootstrap-attempt2/frozen/config.json";
const request=JSON.parse(await readFile(requestPath,"utf8"));
await verifyBootstrapEvidence(request,requestPath,configPath);
console.log("BOOTSTRAP_FROZEN_EVIDENCE_PASS");
