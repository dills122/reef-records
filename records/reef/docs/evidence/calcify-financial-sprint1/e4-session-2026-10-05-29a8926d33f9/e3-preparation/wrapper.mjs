// Recipe only: root freezes execution manifest after accepted source/compile.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createReadStream,createWriteStream} from 'node:fs';
import {readFile,writeFile,appendFile,mkdir,lstat,readdir,realpath} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,join,dirname,isAbsolute} from 'node:path';
import {pathToFileURL} from 'node:url';
import {pipeline} from 'node:stream/promises';

export const MODES=Object.freeze([
 {mode:'run-external',runId:'e4-current-external1',directory:'external',expectedResults:4},
 {mode:'run-core',runId:'e4-current-core1',directory:'core',expectedResults:24},
 {mode:'run-golden',runId:'e4-current-golden1',directory:'golden',expectedResults:20},
 {mode:'run-activation',runId:'e4-current-activation1',directory:'activation',expectedResults:1},
]);
const sha=value=>createHash('sha256').update(value).digest('hex');
async function fileHash(path){const h=createHash('sha256');for await(const bytes of createReadStream(path))h.update(bytes);return h.digest('hex');}
export async function directoryFiles(root){
 const rows={};async function visit(path,rel=''){for(const name of (await readdir(path)).sort()){const p=join(path,name),r=rel?`${rel}/${name}`:name,s=await lstat(p);assert(!s.isSymbolicLink(),'classpath symlink unsupported');if(s.isDirectory())await visit(p,r);else{assert(s.isFile(),'classpath special file unsupported');rows[r]=await fileHash(p);}}}await visit(root);return rows;
}
export function validateExecutionManifest(m,phaseDirectory){
 assert.equal(m.schema,'calcify-e3-execution-freeze-v1');assert.equal(m.acceptedCandidate,true,'root final candidate acceptance required');
 for(const key of ['repositoryRoot','proofRoot','nodePath','javaHome','brokerPreflightPath','brokerRunnerPath'])assert(isAbsolute(m[key])&&resolve(m[key])===m[key],`${key} requires canonical absolute path`);
 assert.equal(phaseDirectory,join(m.proofRoot,'broker-fault'));assert.deepEqual(m.modes,MODES);
 assert(Array.isArray(m.classpathEntries)&&m.classpathEntries.length===51&&m.classpathEntries.every(p=>isAbsolute(p)&&!p.includes('*')),'explicit ordered3directory+48jar CP required');
 assert.equal(m.classpathEntries.filter(p=>p.endsWith('.jar')).length,48);assert.equal(new Set(m.classpathEntries).size,51);
 assert.deepEqual(m.classpathEntries.slice(0,3),['build/classes/kotlin/test','build/classes/kotlin/main','build/classes/java/main'].map(p=>join(m.repositoryRoot,'services/platform-runtime',p)));
 assert(/^[a-f0-9]{64}$/.test(m.brokerPreflightSha256));assert(m.checksums&&Object.keys(m.checksums).length>0);
 for(const [path,h]of Object.entries(m.checksums))assert(isAbsolute(path)&&/^[a-f0-9]{64}$/.test(h),'invalid file pin');
 assert(m.classpathEntries.filter(p=>p.endsWith('.jar')).every(p=>m.checksums[p]),'all actual jar bytes require pins');
 assert.equal(m.directoryChecksums.length,3);assert.deepEqual(m.directoryChecksums.map(d=>d.path),m.classpathEntries.slice(0,3));
 assert(m.directoryChecksums.every(d=>d.files&&Object.keys(d.files).length>0),'full CP directory resource inventory required');
 return m;
}
async function verifyPins(m){
 for(const [path,expected]of Object.entries(m.checksums))assert.equal(await fileHash(path),expected,`frozen file changed: ${path}`);
 for(const entry of m.directoryChecksums)assert.deepEqual(await directoryFiles(entry.path),entry.files,`full classpath directory changed: ${entry.path}`);
 assert.equal(await fileHash(m.brokerPreflightPath),m.brokerPreflightSha256,'broker preflight changed');
}
async function run(){
 assert.equal(process.argv.length,6,'--execution-manifest absolute --fault-phase-directory absolute required');
 assert.equal(process.argv[2],'--execution-manifest');assert.equal(process.argv[4],'--fault-phase-directory');
 const manifestPath=process.argv[3],phaseDirectory=process.argv[5];assert(isAbsolute(manifestPath));
 const m=validateExecutionManifest(JSON.parse(await readFile(manifestPath,'utf8')),phaseDirectory);
 assert.equal(process.platform,'darwin');assert.equal(process.versions.node,'22.22.1');assert.equal(process.versions.uv,'1.51.0');assert.equal(process.execPath,m.nodePath);
 assert.equal(await realpath(m.proofRoot),m.proofRoot);assert((await lstat(m.proofRoot)).isDirectory());assert.equal(await realpath(phaseDirectory),phaseDirectory);
 assert(!manifestPath.startsWith(m.proofRoot+'/'),'execution manifest must stay outside proof output tree');
 await verifyPins(m);
 const preflight=JSON.parse(await readFile(m.brokerPreflightPath,'utf8'));
 assert.equal(preflight.externalBrokerFault.phaseProtocol.directory,phaseDirectory);assert.equal(preflight.externalBrokerFault.phaseProtocol.runId,MODES[0].runId);
 const manifestHash=sha(await readFile(manifestPath)),started=Number(process.hrtime.bigint()/1000000n);
 const environment={PATH:`${dirname(m.nodePath)}:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin`,JAVA_HOME:m.javaHome,TMPDIR:'/private/tmp',LANG:'C',LC_ALL:'C',
  CALCIFY_FINANCIAL_BROKER:preflight.bootstrapServers,CALCIFY_FINANCIAL_PREFLIGHT:m.brokerPreflightPath,CALCIFY_FINANCIAL_CLASSPATH:m.classpathEntries.join(':')};
 await writeFile(join(m.proofRoot,'wrapper-command.json'),JSON.stringify({manifestPath,manifestSha256:manifestHash,argv:process.argv,environment,modes:MODES,scope:m.scope},null,2)+'\n',{flag:'wx'});
 const results=[];let failure;
 try{for(const mode of MODES){
  await verifyPins(m);const modeDir=join(m.proofRoot,mode.directory);await mkdir(modeDir); // never reuse outputs
  const argv=[m.brokerRunnerPath,mode.mode,...(mode.mode==='run-external'?['--fault-phase-directory',phaseDirectory]:[])];
  const env={...environment,CALCIFY_FINANCIAL_RUN_ID:mode.runId,CALCIFY_FINANCIAL_PROOF_DIR:modeDir};
  const stdout=createWriteStream(join(modeDir,'runner.stdout.log'),{flags:'wx'}),stderr=createWriteStream(join(modeDir,'runner.stderr.log'),{flags:'wx'});
  const command={mode:mode.mode,runId:mode.runId,executable:m.nodePath,argv,cwd:m.repositoryRoot,environment:env,startedAtMs:Number(process.hrtime.bigint()/1000000n)};
  await appendFile(join(m.proofRoot,'wrapper-attempts.jsonl'),JSON.stringify({stage:'START',...command})+'\n');
  const child=spawn(m.nodePath,argv,{cwd:m.repositoryRoot,env,stdio:['ignore','pipe','pipe']}); // inherit outer owned process group
  const captured=Promise.allSettled([pipeline(child.stdout,stdout),pipeline(child.stderr,stderr)]);
  let spawnError;child.once('error',error=>spawnError=error.message);
  const status=await new Promise(ok=>child.once('close',(code,signal)=>ok({code,signal,...(spawnError?{error:spawnError}:{})})));
  const streams=await captured;assert(streams.every(r=>r.status==='fulfilled'),'complete runner output capture failed');
  await appendFile(join(m.proofRoot,'wrapper-attempts.jsonl'),JSON.stringify({stage:'EXIT',...command,...status,completedAtMs:Number(process.hrtime.bigint()/1000000n)})+'\n');
  assert.equal(status.code,0,`${mode.mode} failed`);assert.equal(status.signal,null);assert.equal(status.error,undefined);
  const proof=JSON.parse(await readFile(join(modeDir,'results.json'),'utf8'));assert.equal(proof.results.length,mode.expectedResults,`${mode.mode} incomplete result count`);
  const last=(await readFile(join(modeDir,'runner.stdout.log'),'utf8')).trim().split('\n').map(line=>{try{return JSON.parse(line);}catch{return null;}}).filter(Boolean).at(-1);
  assert(last?.pass===true&&last.results===mode.expectedResults,`${mode.mode} missing actual final pass marker`);
  results.push({mode:mode.mode,runId:mode.runId,results:proof.results.length,resultsSha256:await fileHash(join(modeDir,'results.json')),directory:modeDir});
 }}catch(error){failure=error;throw error;}
 finally{await writeFile(join(m.proofRoot,'wrapper-status.json'),JSON.stringify({schema:'calcify-e3-serial-wrapper-result-v1',ok:!failure,error:failure?.message??null,manifestSha256:manifestHash,
  startedAtMs:started,completedAtMs:Number(process.hrtime.bigint()/1000000n),results,totalResults:results.reduce((sum,r)=>sum+r.results,0),scope:m.scope},null,2)+'\n',{flag:'wx'});}
 console.log(JSON.stringify({e3Results:49,pass:true,scope:m.scope}));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)await run();
