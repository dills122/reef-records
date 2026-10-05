// Broker-free preparation only. Does not create proofRoot or invoke probes.
import assert from 'node:assert/strict';
import {readFile,writeFile,lstat,readdir} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve,join,dirname} from 'node:path';
import {MODES,directoryFiles,validateExecutionManifest} from './wrapper.mjs';
import {validatePreflight,BUDGETS} from '../../../scripts/dev/calcify-financial/proof-supervisor.mjs';
import {validateRegistration,assertPhaseClock} from '../../../scripts/dev/calcify-financial/lib/external-faults.mjs';
const dir=resolve(import.meta.dirname),repositoryRoot=resolve(dir,'../../..'),session=dirname(dir);
const proofRoot=join(session,'bootstrap-compact1/e3-current-candidate'),phaseRoot=join(proofRoot,'broker-fault');
try{await lstat(proofRoot);throw Error('reserved proof root already exists; never reuse');}catch(error){if(error.code!=='ENOENT')throw error;}
const capabilityPath=join(session,'bootstrap-compact1/frozen/capability.json'),capability=JSON.parse(await readFile(capabilityPath,'utf8'));
const actualProfilePath=resolve(process.env.CALCIFY_COMPACT1_PROFILE??join(session,'broker-e4-compact1/preflight.json')),actualProfile=JSON.parse(await readFile(actualProfilePath,'utf8'));
// E3 legacy fault wrapper registry omits endpoint-only bootstrap fields;
// fresh endpoint identities remain pinned in original profile hash and top-level bootstrapServers.
const registeredResources={...actualProfile.registeredResources,containers:actualProfile.registeredResources.containers.map(({hostKafkaEndpoint,...c})=>c)};
delete registeredResources.bootstrapServers;
const containers=registeredResources.containers,target=containers.find(c=>c.brokerId===1);
assert.equal(registeredResources.project,'reef-calcify-e4-compact1-8c6f');assert(target);
assert.equal(actualProfile.registeredResources.bootstrapServers,'127.0.0.1:40392,127.0.0.1:40492,127.0.0.1:40592','fresh compact1 endpoints required');
const phaseProtocol={schema:'calcify-broker-fault-phase-v1',runId:MODES[0].runId,maxCycles:1,recoveryTimeoutMs:30000,stopTimeoutMs:30000,directory:phaseRoot,clock:{platform:'darwin',node:'22.22.1',uv:'1.51.0'}};
const externalBrokerFault={composeProject:registeredResources.project,containers:containers.map(c=>c.id),targetContainer:target.id,resources:containers,stoppedAllocatedBytesUpperBound:3*1024**3,
 phaseProtocol,evidence:'Existing frozen3GiB target reservation throughout fault-enabled E3 proof; actual running du must stay<=3GiB. Stopped actual allocation unknown. New named data volumes exclusively owned with no outside writers. Charge is bound, not physical measurement or startup calibration.'};
validateRegistration(externalBrokerFault);assertPhaseClock(phaseProtocol);
const sha=data=>createHash('sha256').update(data).digest('hex');
async function hash(path){const h=createHash('sha256');for await(const bytes of createReadStream(path))h.update(bytes);return h.digest('hex');}
const preflight={...actualProfile,externalBrokerFault,derivedFromProfileSha256:await hash(actualProfilePath),derivedFaultRunId:MODES[0].runId,
 originalProfileFactsScope:'Setup hardware/config/image/node identities retained as dated facts. Actual current health/generations/allocation/guest-free come from fresh strict supervisor; no bootstrap sample or prior footprint is current bound.'};
const brokerPreflightPath=join(dir,'broker-preflight.recipe.json');await writeFile(brokerPreflightPath,JSON.stringify(preflight,null,2)+'\n',{flag:'wx'});
const nodePath=process.execPath,javaHome='/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home',brokerRunnerPath=join(repositoryRoot,'scripts/dev/calcify-financial/broker-proof.mjs');
const classpathEntries=capability.classpathEntries;assert.equal(classpathEntries.length,51);assert.equal(classpathEntries.filter(p=>p.endsWith('.jar')).length,48);
const financialPrefix='services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/';
const financialNames=(await readdir(join(repositoryRoot,financialPrefix))).filter(n=>/^Financial.*\.kt$/.test(n)).sort();
assert(financialNames.length>0);
const sources=[...financialNames.map(n=>financialPrefix+n),"scripts/dev/calcify-financial/rate-proof.mjs","scripts/dev/calcify-financial/bootstrap-calibration.mjs","scripts/dev/calcify-financial/rate-supervision.mjs","scripts/dev/calcify-financial/broker-proof.mjs","scripts/dev/calcify-financial/proof-supervisor.mjs","scripts/dev/calcify-financial/physical-evidence.mjs","scripts/dev/calcify-financial/physical-adapter.mjs","scripts/dev/calcify-financial/lib/external-faults.mjs",'docs/evidence/calcify-financial-sprint1/fixtures.json'];
const checksumPaths=[...sources.map(p=>join(repositoryRoot,p)),join(dir,'wrapper.mjs'),nodePath,join(javaHome,'bin/java'),...classpathEntries.filter(p=>p.endsWith('.jar'))];
const checksums=Object.fromEntries(await Promise.all(checksumPaths.map(async p=>[p,await hash(p)])));
const directoryChecksums=await Promise.all(classpathEntries.slice(0,3).map(async path=>({path,files:await directoryFiles(path)})));
const scope='49 serial current-candidate E3 RF3/EOS correctness arms only: external4/core24/golden20/activation1; full source/oracle/state/history assertions inherited from current broker probe; original small /private/tmp RocksDB directories unregistered; no E4 resource/capacity/heap-bootstrap qualification';
const executionManifest={schema:'calcify-e3-execution-freeze-v1',acceptedCandidate:false,repositoryRoot,proofRoot,nodePath,javaHome,brokerPreflightPath,brokerPreflightSha256:await hash(brokerPreflightPath),brokerRunnerPath,
 classpathEntries,checksums,directoryChecksums,modes:MODES,scope,preparedUtc:new Date().toISOString(),capabilityPath,capabilityFileSha256:await hash(capabilityPath),priorCapabilityClasspathSha256:capability.classpathSha256,
 acceptanceGate:'Root whole Attempt2 cycle3 independent Ready for integrated owner helper, final same-source compile, refreshed source/build/classpath pins and frozen execution manifest outside proofRoot; not authorized by acceptedCandidate false draft'};
const draftPath=join(dir,'execution-manifest.draft.json');await writeFile(draftPath,JSON.stringify(executionManifest,null,2)+'\n',{flag:'wx'});
const manifestPath=join(session,'bootstrap-compact1/frozen/e3-execution-manifest.json'); // root creates after accepted final compilation
const wrapperPath=join(dir,'wrapper.mjs');
const argv=['/usr/bin/env','-i',`PATH=${dirname(nodePath)}:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin`,'TMPDIR=/private/tmp','LANG=C','LC_ALL=C',nodePath,wrapperPath,
 '--execution-manifest',manifestPath,'--fault-phase-directory',phaseRoot];
const supervisor={schema:'calcify-proof-supervisor-v1',registeredResources,wrapper:{argv,cwd:repositoryRoot,outputDir:proofRoot,timeoutMs:1800000},externalBrokerFault,
 profileSha256:await hash(brokerPreflightPath),scope,budgets:BUDGETS,rootExecutionManifestPath:manifestPath,executionDraftPath:draftPath,
 proofAllocationScope:'Full proofRoot recursively contains all four mode raw outputs, wrapper logs/status and phase protocol. No fake local-store/journal resources; original small state dirs outside aggregate remain explicit correctness-scope limitation.'};
validatePreflight(supervisor);validateExecutionManifest({...executionManifest,acceptedCandidate:true},phaseRoot);
const supervisorPath=join(dir,'supervisor.recipe.json');await writeFile(supervisorPath,JSON.stringify(supervisor,null,2)+'\n',{flag:'wx'});
await writeFile(join(dir,'preparation-result.json'),JSON.stringify({prepared:true,executed:false,proofRootCreated:false,draftPath,supervisorPath,brokerPreflightPath,jarCount:48,classpathEntryCount:51,expectedResults:49,
 supervisorValidation:'PASS',registrationValidation:'PASS',phaseClockValidation:'PASS',draftExecutionValidation:'PASS only when root acceptance field supplied for pure schema control',scope},null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({prepared:true,supervisorPath,draftPath,brokerPreflightPath,proofRoot,jarCount:48}));
