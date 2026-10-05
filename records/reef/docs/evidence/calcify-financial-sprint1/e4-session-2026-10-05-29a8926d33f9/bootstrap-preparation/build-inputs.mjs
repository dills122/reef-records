// Preparation only: no process spawn, broker operation, topic creation or load.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile,writeFile,readdir,lstat,realpath,mkdir} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {BOOTSTRAP,E3_SCOPE,freezeBootstrap} from '../../../scripts/dev/calcify-financial/bootstrap-calibration.mjs';
import {validatePreflight,BUDGETS} from '../../../scripts/dev/calcify-financial/proof-supervisor.mjs';
import {validateRateSupervisor,validateBootstrapRuntime} from '../../../scripts/dev/calcify-financial/rate-supervision.mjs';
import {EXTERNAL_ARMS} from '../../../scripts/dev/calcify-financial/lib/external-faults.mjs';
import {directoryFiles} from '../e3-preparation/wrapper.mjs';
import {verifyPackage} from './verify-package.mjs';

const dir=path.resolve(import.meta.dirname),root=path.resolve(dir,'../../..'),session=path.dirname(dir);
const frozen=path.join(session,'bootstrap-attempt1/frozen'),proofRoot=path.join(session,'bootstrap-attempt1/e3-current-candidate');
const packagedRoot=path.join(session,'bootstrap-attempt1/e3-packaged-candidate');
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const jsonHash=value=>sha(JSON.stringify(value));
const jsonBytes=value=>Buffer.from(JSON.stringify(value,null,2)+'\n');
const bounds={file:8*1024**2,total:256*1024**2,entries:65536,depth:64};
async function bytes(file,max=bounds.file){const s=await lstat(file);assert(s.isFile()&&!s.isSymbolicLink()&&s.size<=max,'bounded ordinary file required');return readFile(file);}
async function read(file,max){return JSON.parse(await bytes(file,max));}
async function fileHash(file){const h=createHash('sha256');for await(const b of createReadStream(file))h.update(b);return h.digest('hex');}

export function validateClosure(confirmation,finished,status,executionSha){
 assert.equal(confirmation.schema,'calcify-e3-closed-confirmation-v1');
 assert.equal(confirmation.confirmedBy,'root');assert.equal(confirmation.cliExitCode,0);
 assert.equal(confirmation.writersClosed,true);assert.equal(confirmation.cleanupClosed,true);
 assert.equal(confirmation.proofRoot,proofRoot);assert.equal(confirmation.executionManifestSha256,executionSha);
 assert.equal(finished.ok,true);assert.equal(finished.error,null);assert.deepEqual(finished.cleanupErrors,[]);
 assert.equal(finished.volumesPreserved,true);assert.equal(finished.wrapperStatus?.code,0);assert.equal(finished.wrapperStatus?.signal,null);
 assert.equal(status.schema,'calcify-e3-serial-wrapper-result-v1');assert.equal(status.ok,true);assert.equal(status.error,null);
 assert.equal(status.totalResults,49);assert.equal(status.manifestSha256,executionSha);
 assert(Number.isFinite(status.startedAtMs)&&Number.isFinite(status.completedAtMs)&&status.completedAtMs>=status.startedAtMs,'invalid actual wrapper window');
 assert.deepEqual(status.results.map(r=>[r.mode,r.runId,r.results,r.directory]),[
  ['run-external','e4-current-external1',4,path.join(proofRoot,'external')],['run-core','e4-current-core1',24,path.join(proofRoot,'core')],
  ['run-golden','e4-current-golden1',20,path.join(proofRoot,'golden')],['run-activation','e4-current-activation1',1,path.join(proofRoot,'activation')]]);
}

export function validateArm(kind,count,plan,result,identity){
 assert.equal(plan.schema,'financial-e3-plan-v1');assert.equal(plan.fixtureSha256,identity.fixtureSha256);
 assert.equal(plan.broker,identity.broker);assert.equal(plan.classpath,identity.classpath);
 assert.deepEqual(plan.compiledHashes,identity.compiledHashes);assert.deepEqual(plan.sourceHashes,identity.sourceHashes);assert.deepEqual(plan.runnerHashes,identity.runnerHashes);
 let names;
 if(kind==='core'){assert.equal(plan.mutationBoundaries.length,19);names=['happy',...plan.mutationBoundaries.map(r=>`mutation-${r.index}`),'forward','serialization','local-state-loss','staged-phase-loss'];}
 else if(kind==='golden')names=Array.from({length:20},(_,i)=>`golden-${i}`);
 else if(kind==='external'){assert.deepEqual(plan.externalMatrix,EXTERNAL_ARMS);names=EXTERNAL_ARMS.map(r=>r.name);}
 else {assert.equal(kind,'activation');names=['activation-quartet'];}
 assert.equal(new Set(names).size,count);assert.equal(result.prefix,plan.prefix);assert.equal(result.results.length,count);
 assert.deepEqual(result.results.map(r=>r.name).sort(),names.sort());
 assert(result.results.every(r=>r.after?.pass===true&&r.topic===`${plan.prefix}-${r.name}`&&(kind!=='activation'||r.before?.pass===true&&r.idle?.pass===true)),'actual successful arm set required');
}

async function inventory(rawRoot){
 assert.equal(await realpath(rawRoot),rawRoot);const files=[];let entries=0,total=0;
 async function walk(dir,depth=0){assert(depth<=bounds.depth);for(const name of await readdir(dir)){
  assert(++entries<=bounds.entries);const file=path.join(dir,name),s=await lstat(file);assert(!s.isSymbolicLink(),'raw symlink rejected');
  if(s.isDirectory())await walk(file,depth+1);else{assert(s.isFile()&&s.size<=bounds.file,'raw file type/size');total+=s.size;assert(total<=bounds.total);files.push({path:file,sizeBytes:s.size,sha256:await fileHash(file)});}
 }}await walk(rawRoot);files.sort((a,b)=>a.path<b.path?-1:a.path>b.path?1:0);assert(files.length<=4096,'Kotlin raw file count bound');return files;
}

async function compiled(cap){
 const hashes={};let total=0;
 async function add(file){const s=await lstat(file);assert(s.isFile()&&!s.isSymbolicLink()&&s.size<=512*1024**2);total+=s.size;assert(total<=2*1024**3);hashes[file]=await fileHash(file);}
 for(const entry of cap.classpathEntries){if(entry.endsWith('.jar'))await add(entry);else{
  const d=path.join(entry,'com/reef/platform/calcify/financial');let names;
  try{names=await readdir(d);}catch(e){if(e.code==='ENOENT'||e.code==='ENOTDIR')continue;throw e;}
  for(const name of names.filter(n=>/^Financial.*\.class$/.test(n)).sort())await add(path.join(d,name));
 }}assert(Object.keys(hashes).some(p=>path.basename(p)==='FinancialRateProbe.class'));return hashes;
}

export async function build(confirmationPath,bundle,packageReceiptPath){
 assert(path.isAbsolute(confirmationPath)&&path.resolve(confirmationPath)===confirmationPath);
 assert(path.isAbsolute(bundle)&&path.resolve(bundle)===bundle&&path.dirname(bundle)===dir,'bundle must be new worker-owned direct child');
 assert.equal(await realpath(dir),dir,'worker preparation root must be canonical');
 const pins=await read(path.join(dir,'preparation-pins.json'));
 const configPath=path.join(frozen,'config.json'),capPath=path.join(frozen,'capability.json'),reportPath=path.join(session,'reviews/integration-attempt1-cycle3/report.md');
 const freezePath=path.join(session,'review-preparation/source-frozen-cycle3.json'),executionPath=path.join(frozen,'e3-execution-manifest.json');
 assert.equal(await fileHash(capPath),pins.capabilitySha256);assert.equal(await fileHash(reportPath),pins.reviewReportSha256);
 assert.equal(await fileHash(freezePath),pins.freezeSha256);assert.equal(await fileHash(executionPath),pins.executionManifestSha256);
 const sourceFreeze=await read(freezePath),execution=await read(executionPath),cap=await read(capPath),config=await read(configPath);
 assert.equal(execution.acceptedCandidate,true);assert.equal(cap.buildSha256,pins.buildSha256);assert.equal(cap.classpathSha256,pins.classpathSha256);
 assert.equal(cap.sourceHead,pins.sourceHead);assert.equal(await fileHash(configPath),cap.configSha256);
 // Freeze file format is intentionally asserted against current retained cycle3 JSON.
 const frozenSources=sourceFreeze.paths;
 assert.equal(sourceFreeze.base,pins.sourceHead);assert.equal(Object.keys(frozenSources??{}).length,24,'cycle3 exact source24 required');
 for(const [name,digest]of Object.entries(frozenSources))assert.equal(await fileHash(path.join(root,name)),digest,`cycle3 drift: ${name}`);
 for(const [file,digest]of Object.entries(execution.checksums))assert.equal(await fileHash(file),digest,`E3 file drift: ${file}`);
 for(const d of execution.directoryChecksums)assert.deepEqual(await directoryFiles(d.path),d.files,`CP tree drift: ${d.path}`);
 for(const [name,digest]of Object.entries(pins.sourceSha256))assert.equal(await fileHash(path.join(root,name)),digest,`candidate drift: ${name}`);
 assert.equal(jsonHash(pins.sourceSha256),pins.candidateSha256);
 const requiredFinancial=(await readdir(path.join(root,'services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial'))).filter(n=>/^Financial.*\.kt$/.test(n)).sort();
 assert.deepEqual(Object.keys(pins.sourceSha256).filter(n=>n.endsWith('.kt')).map(n=>path.basename(n)),requiredFinancial,'financial source set drift');
 const finishedPath=path.join(proofRoot,'supervisor-finished.json'),statusPath=path.join(proofRoot,'wrapper-status.json');
 const confirmationRaw=await bytes(confirmationPath,1024**2),confirmation=JSON.parse(confirmationRaw),finished=await read(finishedPath),status=await read(statusPath);
 validateClosure(confirmation,finished,status,pins.executionManifestSha256);
 assert.equal(confirmation.supervisorFinishedSha256,await fileHash(finishedPath));assert.equal(confirmation.wrapperStatusSha256,await fileHash(statusPath));
 // Root confirmation stays outside sealed raw tree. Never hash a writer's active tree.
 assert(!confirmationPath.startsWith(proofRoot+path.sep));
 assert(path.isAbsolute(packageReceiptPath)&&path.dirname(packageReceiptPath)===dir,'package receipt must be root/operator-reviewed worker-owned file');
 const packageReceiptRaw=await bytes(packageReceiptPath,1024**2),packageReceipt=JSON.parse(packageReceiptRaw),verifiedPackage=await verifyPackage(proofRoot,packagedRoot);
 assert.deepEqual(packageReceipt,verifiedPackage,'independent lossless package receipt changed');assert.equal(verifiedPackage.closedConfirmationSha256,sha(confirmationRaw));
 const files=await inventory(packagedRoot),candidate={schema:'financial-candidate-source-v1',sourceRoot:root,sourceHead:pins.sourceHead,sourceSha256:pins.sourceSha256,candidateSha256:pins.candidateSha256};
 const candidateRaw=jsonBytes(candidate),fixturePath=path.join(root,'docs/evidence/calcify-financial-sprint1/fixtures.json'),fixtureRaw=await bytes(fixturePath,1024**2);
 assert.equal(sha(fixtureRaw),cap.fixtureSha256);
 const arms={core:24,golden:20,external:4,activation:1},plans={};
 const sourceHashes=Object.fromEntries(Object.entries(pins.sourceSha256).filter(([name])=>name.endsWith('.kt')).map(([name,digest])=>[path.basename(name),digest]));
 const runnerHashes=Object.fromEntries(['broker-proof.mjs','lib/external-faults.mjs','proof-supervisor.mjs'].map(name=>[`scripts/dev/calcify-financial/${name}`,pins.sourceSha256[`scripts/dev/calcify-financial/${name}`]]));
 const identity={fixtureSha256:cap.fixtureSha256,broker:config.registeredResources.bootstrapServers,classpath:cap.classpathEntries.join(path.delimiter),compiledHashes:await compiled(cap),sourceHashes,runnerHashes};
 for(const [kind,count]of Object.entries(arms)){
  const planPath=path.join(packagedRoot,kind,'plan.json'),resultPath=path.join(packagedRoot,kind,'results.json');
  assert(files.some(f=>f.path===planPath)&&files.some(f=>f.path===resultPath));
  validateArm(kind,count,await read(planPath),await read(resultPath),identity);plans[kind]=await fileHash(planPath);
  const actual=status.results.find(r=>r.directory===path.join(proofRoot,kind));assert.equal(actual.resultsSha256,await fileHash(resultPath));
 }
 assert.deepEqual(await inventory(packagedRoot),files,'raw writer/hash drift during validation');
 // Two layers deliberately avoid circular evidence hashing: marker lacks its own evidenceSha256.
 const packaging={originalProofRoot:proofRoot,packagedProofRoot:packagedRoot,originalManifestSha256:verifiedPackage.originalManifestSha256,packagingManifestSha256:verifiedPackage.packagingManifestSha256,packagingVerificationSha256:sha(packageReceiptRaw)};
 const outer={schema:'financial-e3-outer-closure-v1',proofRoot,...packaging,cliExitCode:0,writersClosed:true,cleanupClosed:true,supervisorFinishedSha256:await fileHash(finishedPath),wrapperStatusSha256:await fileHash(statusPath),executionManifestSha256:pins.executionManifestSha256,closedConfirmationSha256:sha(confirmationRaw)};
 const outerRaw=jsonBytes(outer),common={sourceHead:pins.sourceHead,candidateSha256:pins.candidateSha256,fixtureSha256:cap.fixtureSha256,buildSha256:cap.buildSha256,classpathSha256:cap.classpathSha256,plannedBootstrapConfigSha256:cap.configSha256,arms,e3PlanSha256:plans};
 const proof={schema:'financial-e3-proof-manifest-v1',...common,...packaging,proofRoot:packagedRoot,files,outerEvidenceSha256:sha(outerRaw)};
 const proofRaw=jsonBytes(proof);assert(proofRaw.length<=1024**2,'Kotlin raw manifest1MiB bound');
 const marker={schema:'financial-e3-correctness-binding-v1',result:'PASS',scope:E3_SCOPE,...common,...packaging,sourceCandidateEvidenceSha256:sha(candidateRaw),proofManifestSha256:sha(proofRaw),outerEvidenceSha256:sha(outerRaw)};
 const markerRaw=jsonBytes(marker);
 const review={schema:'financial-bootstrap-review-v1',verdict:'READY_BOUNDED_DIAGNOSTIC',candidateSha256:pins.candidateSha256,limitsSha256:BOOTSTRAP.limitsSha256,fixtureSha256:cap.fixtureSha256,configSha256:cap.configSha256,buildSha256:cap.buildSha256,classpathSha256:cap.classpathSha256,sampleTrades:1000,pendingSample:100,agedIdentities:0,reportEvidencePath:'bootstrap-cycle3-review-report.md',reportEvidenceSha256:pins.reviewReportSha256,scope:'Bounded1000+100 empirical diagnostic; actual raw49 prerequisite, no capacity or conservative retained heap qualification'};
 const reviewRaw=jsonBytes(review),capRaw=await bytes(capPath,1024**2);
 const request=freezeBootstrap({...BOOTSTRAP,sourceActions:2100,historyRecords:2101,sourceHead:pins.sourceHead,fixtureSha256:cap.fixtureSha256,candidateSha256:pins.candidateSha256,capability:cap,review,
  correctness:{...marker,evidenceSha256:sha(markerRaw)},capabilityEvidencePath:'capability.json',capabilityEvidenceSha256:sha(capRaw),reviewEvidencePath:'bootstrap-review.json',reviewEvidenceSha256:sha(reviewRaw),candidateEvidencePath:'bootstrap-candidate.json',candidateEvidenceSha256:sha(candidateRaw),fixtureEvidencePath:'bootstrap-fixtures.json',correctnessEvidencePath:'e3-current-correctness.json',correctnessProofManifestEvidencePath:'e3-current-proof-manifest.json',correctnessProofRoot:packagedRoot});
 const requestPath=path.join(frozen,'bootstrap-request.json'),artifact=path.join(config.proofDir,'bootstrap.json');
 const command=path.join(execution.javaHome,'bin/java'),args=['-Xms128m','-Xmx768m','-cp',cap.classpathEntries.join(path.delimiter),'com.reef.platform.calcify.financial.FinancialRateProbe','bootstrap-calibrate',config.registeredResources.bootstrapServers,'financial-s1-e4-bootstrap-attempt1',configPath];
 const launched=[...args,'--financial-calibration-bootstrap-request',requestPath,'--financial-calibration-bootstrap',artifact];
 const supervisor={schema:'calcify-proof-supervisor-v1',registeredResources:config.registeredResources,hostLocalResources:{ownedRoot:config.ownedRoot,paths:config.localResources},wrapper:{argv:[command,...launched],cwd:root,outputDir:path.join(config.proofDir,'supervision'),timeoutMs:1800000},budgets:BUDGETS,scope:'Finite1000 settled+100 pending diagnostic; owned3 brokers/local3 categories; no fault/startup grace/rate qualification'};
 validatePreflight(supervisor);validateRateSupervisor(supervisor,command,launched,config.proofDir);validateBootstrapRuntime(config,supervisor,config.proofDir,args[6]);
 const supervisorRaw=jsonBytes(supervisor),adapter={command,args,supervisorEvidencePath:'bootstrap-supervisor.json',supervisorEvidenceSha256:sha(supervisorRaw)};
 try{await lstat(config.proofDir);throw Error('bootstrap UNIQUE_OUT already exists; no deletion or reuse');}catch(error){if(error.code!=='ENOENT')throw error;}
 const outputs={'bootstrap-candidate.json':candidateRaw,'bootstrap-review.json':reviewRaw,'bootstrap-cycle3-review-report.md':await bytes(reportPath,1024**2),'capability.json':capRaw,'bootstrap-fixtures.json':fixtureRaw,'e3-current-proof-manifest.json':proofRaw,'e3-current-correctness.json':markerRaw,'e3-current-outer-closure.json':outerRaw,'e3-closed-confirmation.json':confirmationRaw,'e3-lossless-package-verification.json':packageReceiptRaw,'bootstrap-request.json':jsonBytes(request),'bootstrap-supervisor.json':supervisorRaw,'bootstrap-adapter.json':jsonBytes(adapter)};
 const outputBytes=Object.values(outputs).reduce((n,b)=>n+b.length,0);
 // Include actual receipt plus prospective staged+frozen copies in retained-raw bound.
 assert(verifiedPackage.combinedRetainedRawBytes+packageReceiptRaw.length+outputBytes*2<=256*1024**2,'combined originals/package/receipt/staged+frozen inputs raw bound');
 const receipt={schema:'calcify-bootstrap-prepared-bundle-v1',actualLoadExecuted:false,proofResults:49,proofRoot:packagedRoot,...packaging,proofFiles:files.length,proofBytes:files.reduce((n,f)=>n+f.sizeBytes,0),combinedRawWithProspectiveFrozenCopiesUpperBytes:verifiedPackage.combinedRetainedRawBytes+packageReceiptRaw.length+outputBytes*2,candidateSha256:pins.candidateSha256,bootstrapSha256:request.bootstrapSha256,files:Object.entries(outputs).map(([name,raw])=>({name,sizeBytes:raw.length,sha256:sha(raw),target:path.join(frozen,name)})),targetRequestPath:requestPath,uniqueOutput:config.proofDir,operatorGate:'Root copies exact staged bytes, invokes verifyBootstrapEvidence against frozen request/config broker-free, then separately supervised restart+fresh strict health before load'};
 const receiptRaw=jsonBytes(receipt);assert(receipt.combinedRawWithProspectiveFrozenCopiesUpperBytes+receiptRaw.length<=256*1024**2);
 // All reads/gates complete before creating new output. Failed outputs are retained.
 await mkdir(bundle);for(const [name,raw]of Object.entries(outputs))await writeFile(path.join(bundle,name),raw,{flag:'wx'});
 await writeFile(path.join(bundle,'prepared-bundle.json'),receiptRaw,{flag:'wx'});return receipt;
}

if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 assert.equal(process.argv.length,8,'--closed-e3-confirmation ABS --bundle NEW_ABS --package-receipt ABS required');assert.equal(process.argv[2],'--closed-e3-confirmation');assert.equal(process.argv[4],'--bundle');assert.equal(process.argv[6],'--package-receipt');
 console.log(JSON.stringify(await build(process.argv[3],process.argv[5],process.argv[7])));
}
