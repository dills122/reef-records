// Broker-free current candidate inventory; no acceptance or proof claim.
import assert from 'node:assert/strict';
import {readFile,readdir,writeFile} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
const dir=path.resolve(import.meta.dirname),root=path.resolve(dir,'../../..'),session=path.dirname(dir);
async function hash(p){const h=createHash('sha256');for await(const b of createReadStream(p))h.update(b);return h.digest('hex');}
const template=JSON.parse(await readFile(path.join(dir,'preparation-pins.template.json')));
const freezePath=path.join(session,'review-preparation/source-frozen-attempt3-cycle1.json'),freeze=JSON.parse(await readFile(freezePath));
assert.equal(Object.keys(freeze.paths??{}).length,27);for(const [n,h]of Object.entries(freeze.paths))assert.equal(await hash(path.join(root,n)),h);
const prefix='services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/';
const financial=(await readdir(path.join(root,prefix))).filter(n=>/^Financial.*\.kt$/.test(n)).sort();
const runners=Object.keys(template.sourceSha256).filter(n=>n.endsWith('.mjs'));assert.equal(runners.length,8);
const sourceSha256={};for(const n of [...financial.map(n=>prefix+n),...runners])sourceSha256[n]=await hash(path.join(root,n));
const candidateSha256=createHash('sha256').update(JSON.stringify(sourceSha256)).digest('hex');
const candidate={schema:'financial-candidate-source-v1',sourceRoot:root,sourceHead:freeze.base,sourceSha256,candidateSha256};
await writeFile(path.join(dir,'candidate-draft.json'),JSON.stringify(candidate,null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({prepared:true,acceptedCandidate:false,candidateSha256,financialFiles:financial.length,nodeRunners:runners.length,freezeSha256:await hash(freezePath),actualLoadExecuted:false}));
