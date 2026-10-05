// Broker-free pin preparation; root explicitly accepts resulting false draft after Ready.
import assert from 'node:assert/strict';
import {readFile,writeFile,lstat,readdir} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
const dir=path.resolve(import.meta.dirname),session=path.dirname(dir),root=path.resolve(dir,'../../..');
assert.equal(process.argv.length,6,'--source-freeze ABS --review-report ABS required');
assert.equal(process.argv[2],'--source-freeze');assert.equal(process.argv[4],'--review-report');
const sourceFreezePath=process.argv[3],reviewReportPath=process.argv[5];
for(const p of [sourceFreezePath,reviewReportPath])assert(path.isAbsolute(p)&&path.resolve(p)===p);
async function digest(p){const s=await lstat(p);assert(s.isFile()&&!s.isSymbolicLink());const h=createHash('sha256');for await(const b of createReadStream(p))h.update(b);return h.digest('hex');}
const frozen=path.join(session,'bootstrap-compact1/frozen'),capPath=path.join(frozen,'capability.json'),executionPath=path.join(frozen,'e3-execution-manifest.json');
const template=JSON.parse(await readFile(path.join(dir,'preparation-pins.template.json'))),cap=JSON.parse(await readFile(capPath)),freeze=JSON.parse(await readFile(sourceFreezePath)),execution=JSON.parse(await readFile(executionPath));
assert.equal(execution.acceptedCandidate,true,'root accepted execution manifest required');
assert.equal(execution.proofRoot,path.join(session,'bootstrap-compact1/e3-current-candidate'));
assert.equal(freeze.base,cap.sourceHead);assert(Object.keys(freeze.paths??{}).length>0,'nonempty root source freeze required');
for(const [name,h]of Object.entries(freeze.paths))assert.equal(await digest(path.join(root,name)),h,`source freeze drift: ${name}`);
const financialPrefix='services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/';
const financialNames=(await readdir(path.join(root,financialPrefix))).filter(n=>/^Financial.*\.kt$/.test(n)).sort();
const nodeNames=Object.keys(template.sourceSha256).filter(n=>n.endsWith('.mjs'));assert.equal(nodeNames.length,8,'explicit eight Node runners required');
const sourceSha256={};for(const name of [...financialNames.map(n=>financialPrefix+n),...nodeNames])sourceSha256[name]=await digest(path.join(root,name));
const pins={...template,acceptedCandidate:false,sourceHead:cap.sourceHead,sourceSha256,candidateSha256:createHash('sha256').update(JSON.stringify(sourceSha256)).digest('hex'),sourceFreezePath,reviewReportPath,frozenSourcePaths:Object.keys(freeze.paths).sort(),
 freezeSha256:await digest(sourceFreezePath),capabilitySha256:await digest(capPath),reviewReportSha256:await digest(reviewReportPath),executionManifestSha256:await digest(executionPath),buildSha256:cap.buildSha256,classpathSha256:cap.classpathSha256};
await writeFile(path.join(dir,'preparation-pins.json'),JSON.stringify(pins,null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({prepared:true,acceptedCandidate:false,pinsPath:path.join(dir,'preparation-pins.json'),candidateSha256:pins.candidateSha256,actualLoadExecuted:false}));
