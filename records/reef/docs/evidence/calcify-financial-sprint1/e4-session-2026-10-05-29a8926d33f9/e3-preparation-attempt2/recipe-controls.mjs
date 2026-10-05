import assert from 'node:assert/strict';
import {readFile,lstat} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {validateExecutionManifest} from './wrapper.mjs';
import {validatePreflight,BUDGETS} from '../../../scripts/dev/calcify-financial/proof-supervisor.mjs';
const dir=resolve(import.meta.dirname),draft=JSON.parse(await readFile(join(dir,'execution-manifest.draft.json'),'utf8')),supervisor=JSON.parse(await readFile(join(dir,'supervisor.recipe.json'),'utf8'));
const phase=supervisor.externalBrokerFault.phaseProtocol.directory;
validatePreflight(supervisor);validateExecutionManifest({...draft,acceptedCandidate:true},phase);assert.throws(()=>validateExecutionManifest(draft,phase),/acceptance/);
for(const mutate of [m=>m.classpathEntries[3]+='*',m=>m.classpathEntries.pop(),m=>m.modes[0].expectedResults=3,m=>m.classpathEntries[1]=m.classpathEntries[0]]){
 const m=structuredClone(draft);m.acceptedCandidate=true;mutate(m);assert.throws(()=>validateExecutionManifest(m,phase));
}
for(const mutate of [p=>p.wrapper.argv.splice(p.wrapper.argv.indexOf('--fault-phase-directory'),2),p=>p.externalBrokerFault.phaseProtocol.maxCycles=2,
 p=>p.externalBrokerFault.targetContainer='f'.repeat(64),p=>p.externalBrokerFault.stoppedAllocatedBytesUpperBound=1,p=>p.externalBrokerFault.resources[0].imageId='sha256:'+'f'.repeat(64)]){
 const p=structuredClone(supervisor);mutate(p);assert.throws(()=>validatePreflight(p));
}
assert.equal(supervisor.wrapper.outputDir,draft.proofRoot);assert.equal(supervisor.wrapper.timeoutMs,1800000);assert.equal(supervisor.wrapper.argv.filter(a=>a==='--fault-phase-directory').length,1);
assert.equal(BUDGETS.abortAllocatedBytes,9*1024**3);assert.equal(BUDGETS.hardAllocatedBytes,10*1024**3);assert.equal(BUDGETS.guestFreeBytesFloor,20*1024**3);assert.equal(BUDGETS.rawProofBytes,256*1024**2);assert.equal(BUDGETS.sampleIntervalMs,5000);
await assert.rejects(lstat(draft.proofRoot),{code:'ENOENT'});
console.log(JSON.stringify({pass:true,scope:'broker-free schema/clock/budget/CP/refusal controls only',actualProbeExecuted:false,proofRootCreated:false,expectedResults:49}));
