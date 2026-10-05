// Reviewer-only control. Source untouched; Docker commands injected; all file writes confined to own temp directory.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { syncBuiltinESMExports } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { performance } from 'node:perf_hooks';
import { validatePreflight, superviseProof, dockerDependencies } from '/Users/dsteele/.codex/worktrees/8c6f/reef/scripts/dev/calcify-financial/proof-supervisor.mjs';
const root = await fs.mkdtemp(join(tmpdir(), 'calcify-review-late-rename-'));
const p = validatePreflight({schema:'calcify-proof-supervisor-v1',registeredResources:{
  project:'reef-calcify-review-late-rename',containers:[1,2,3].map(n=>({id:String(n).repeat(64),labels:{
  'com.docker.compose.project':'reef-calcify-review-late-rename','com.docker.compose.service':`rp${n}`}}))},
  wrapper:{argv:['/usr/bin/true'],cwd:root,outputDir:join(root,'proof'),timeoutMs:60000}});
const rows=p.registeredResources.containers.map(c=>({Id:c.id,Config:{Labels:c.labels},State:{Running:true,Health:{Status:'healthy'}}}));
const execute=async (_,argv)=>({stdout:argv[0]==='inspect'?JSON.stringify(rows):argv.includes('du')?
 '1048576\t/var/lib/redpanda/data\n':argv.includes('df')?
 'Filesystem 1024-blocks Used Available Capacity Mounted on\n/dev/disk 50000000 1000000 40000000 2% /var/lib/redpanda/data\n':''});
const deps=dockerDependencies(p,{execute,now:()=>performance.now()});
deps.launch=async()=>({status:()=>({code:0,signal:null}),stop:async()=>{}});
const originalRename=fs.rename;
let renameStarted=false;
fs.rename=async(...args)=>{renameStarted=true;await new Promise(resolve=>setTimeout(resolve,1250));return originalRename(...args);};
syncBuiltinESMExports();
try {
 const result=await superviseProof(p,deps);
 assert.equal(renameStarted,true); assert.equal(result.ok,false); assert.match(result.error,/completion evidence write timeout/);
 await new Promise(resolve=>setTimeout(resolve,500));
 const artifact=JSON.parse(await fs.readFile(join(p.wrapper.outputDir,'supervisor-finished.json'),'utf8'));
 assert.equal(artifact.ok,true);
 console.log(JSON.stringify({control:'rename-already-issued-before-timeout',returnedOk:result.ok,error:result.error,
  lateFinishedArtifactOk:artifact.ok,wrapperStatus:artifact.wrapperStatus,outputDir:p.wrapper.outputDir}));
} finally {fs.rename=originalRename;syncBuiltinESMExports();await deps.close();}
