import {readFileSync} from 'node:fs';
import {windowBounds,differenceBounds} from '/Users/dsteele/.codex/worktrees/69c4/reef/scripts/dev/calcify-financial/research/compare-contention.mjs';
const t=JSON.parse(readFileSync('/private/tmp/calcify-contention-20261011/aged-run-02/capture/results.json'));
const c=JSON.parse(readFileSync('/private/tmp/calcify-control-20261011/run/capture/results.json'));
for(const [start,end] of [[0,60],[60,150],[150,180],[180,300],[60,300],[0,180],[0,300]]) {
 const b=(x)=>windowBounds(x.streams.resolved.windows,x.loadSpawnMonotonicMs+start*1000,x.loadSpawnMonotonicMs+end*1000,start===0?0:undefined);
 const a=b(t),d=b(c);console.log(JSON.stringify({start,end,treatment:[a.rateLower,a.rateUpper],control:[d.rateLower,d.rateUpper],difference:differenceBounds(d,a)}));
}
