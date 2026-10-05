import {inspectRaw,pairRaw} from '/Users/dsteele/.codex/worktrees/8c6f/reef/.planning/calcify-e4-session-2026-10-05/reviews/actual-compact-qualification-instance3/inspect-raw.mjs';
import {writeFile} from 'node:fs/promises';
const base='/Users/dsteele/.codex/worktrees/8c6f/reef/.planning/calcify-e4-session-2026-10-05/';
const p=await pairRaw(base+'bootstrap-attempt3',base+'bootstrap-compact1');
const a=await inspectRaw(base+'bootstrap-attempt3');
await writeFile('/private/tmp/calcify-e4-reference-allocation-profile/history.json',JSON.stringify(a.h.records));
await writeFile('/private/tmp/calcify-e4-reference-allocation-profile/inputs.json',JSON.stringify({balances:{buyerCash:'11000000000',sellerCash:'0',buyerShares:'0',sellerShares:'1100'},policy:a.config.policy,ownerSha256:p.ownerSha256,historyChecksum:p.historyChecksum}));
await writeFile('/private/tmp/calcify-e4-reference-allocation-profile/pair-validation.json',JSON.stringify(p,null,2));
console.log(JSON.stringify(p));
