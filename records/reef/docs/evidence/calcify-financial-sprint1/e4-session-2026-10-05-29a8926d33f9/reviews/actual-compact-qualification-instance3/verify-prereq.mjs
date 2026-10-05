import assert from 'node:assert/strict';
import {readFile,readdir,lstat,writeFile} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
const session=path.resolve('.planning/calcify-e4-session-2026-10-05'),repo=process.cwd(),json=async f=>JSON.parse(await readFile(path.resolve(session,f)));
const hash=async f=>{const h=createHash('sha256');for await(const b of createReadStream(f))h.update(b);return h.digest('hex');};
const cap=await json('bootstrap-compact1/frozen/capability.json'),candidate=await json('bootstrap-preparation-compact1/candidate-draft.json'),pins=await json('bootstrap-preparation-compact1/preparation-pins.json'),snapshot=await json('candidate-source-snapshots/attempt3-cycle1/manifest.json'),freeze=await json('review-preparation/source-frozen-attempt3-cycle1.json'),execution=await json('bootstrap-compact1/frozen/e3-execution-manifest.json');
assert.equal(pins.rootCodeReviewAttempt,3);assert.equal(pins.rootCodeReviewCycle,1);assert.equal(freeze.attempt,3);assert.equal(freeze.cycle,1);
for(const [name,want]of Object.entries(candidate.sourceSha256))assert.equal(await hash(path.join(repo,name)),want,name);
for(const [name,want]of Object.entries(freeze.paths))assert.equal(await hash(path.join(repo,name)),want,name);
assert.equal(createHash('sha256').update(JSON.stringify(candidate.sourceSha256)).digest('hex'),candidate.candidateSha256);assert.deepEqual(pins.sourceSha256,candidate.sourceSha256);
for(const row of [...snapshot.source,...snapshot.compiled]){assert.equal((await lstat(row.originalPath)).size,row.sizeBytes);assert.equal((await lstat(row.snapshotPath)).size,row.sizeBytes);assert.equal(await hash(row.originalPath),row.sha256,row.originalPath);assert.equal(await hash(row.snapshotPath),row.sha256,row.snapshotPath);}
const classDir=path.join(cap.classpathEntries[0],'com/reef/platform/calcify/financial'),classes=(await readdir(classDir)).filter(n=>/^Financial.*\.class$/.test(n)).sort(),build=createHash('sha256');
for(const name of classes){build.update(name);build.update(Buffer.from([0]));build.update(await readFile(path.join(classDir,name)));}
assert.equal(build.digest('hex'),cap.buildSha256);assert.equal(classes.length,snapshot.compiled.length);
const cp=createHash('sha256');const part=v=>{cp.update(v);cp.update(Buffer.from([0]));};
async function files(dir){const result=[];for(const name of await readdir(dir)){const f=path.join(dir,name),s=await lstat(f);assert(!s.isSymbolicLink());if(s.isDirectory())result.push(...await files(f));else if(s.isFile())result.push(f);}return result.sort();}
for(const entry of cap.classpathEntries){part(entry);const s=await lstat(entry);if(s.isDirectory()){for(const file of await files(entry)){part(path.relative(entry,file));part(await hash(file));}}else part(await hash(entry));}
assert.equal(cp.digest('hex'),cap.classpathSha256);assert.equal(await hash(path.join(session,'bootstrap-compact1/frozen/config.json')),cap.configSha256);assert.equal(await hash(path.join(session,'bootstrap-compact1/frozen/bootstrap-fixtures.json')),cap.fixtureSha256);
for(const key of ['buildSha256','classpathSha256'])assert.equal(pins[key],cap[key]);assert.deepEqual(execution.classpathEntries,cap.classpathEntries);
const receipt=await json('root-controls/combined-financial-attempt3-cycle1.receipt.json');assert.equal(receipt.sourceFreezeSha256,await hash(path.join(session,receipt.sourceFreezePath.replace(/^\.planning\/calcify-e4-session-2026-10-05\//,''))));assert.deepEqual(receipt.totals,{tests:109,failures:0,errors:0,skipped:0});
const totals={tests:0,failures:0,errors:0,skipped:0};for(const row of receipt.xml){assert.equal(await hash(path.resolve(repo,row.path)),row.sha256);const raw=await readFile(path.resolve(repo,row.path),'utf8'),head=raw.match(/<testsuite\b[^>]+>/)[0];for(const key of Object.keys(totals))totals[key]+=Number(head.match(new RegExp(key+'="(\\d+)"'))[1]);}assert.deepEqual(totals,receipt.totals);
const output={schema:'independent-current-compact-prerequisites-v1',pass:true,sourceFreezePaths:Object.keys(freeze.paths).length,candidateSourcePaths:Object.keys(candidate.sourceSha256).length,snapshotSource:snapshot.source.length,compiledClasses:classes.length,classpathEntries:cap.classpathEntries.length,candidateSha256:candidate.candidateSha256,buildSha256:cap.buildSha256,classpathSha256:cap.classpathSha256,configSha256:cap.configSha256,fixtureSha256:cap.fixtureSha256,financialTests:totals,scope:'Independent current source/snapshot/compiled/build/ordered classpath/config/fixture/XML reconciliation; actual new49 and bootstrap gates pending'};
console.log(JSON.stringify(output,null,2));
