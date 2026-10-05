// Receipt conversion only; never invokes Docker. Original command envelope remains unchanged.
import assert from 'node:assert/strict';
import {readFile,writeFile,lstat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {assertCleanupInspection} from '../broker-e4-attempt3/operator-safety.mjs';
assert(process.argv.length===6&&process.argv[2]==='--command-receipt'&&process.argv[4]==='--out');
const envelopePath=process.argv[3],output=process.argv[5];for(const p of [envelopePath,output])assert(path.isAbsolute(p)&&path.resolve(p)===p);
const stat=await lstat(envelopePath);assert(stat.isFile()&&!stat.isSymbolicLink()&&stat.size<=1024**2);
const bytes=await readFile(envelopePath),command=JSON.parse(bytes),args=command.args??command.argv;
const config=JSON.parse(await readFile(path.resolve(import.meta.dirname,'../bootstrap-attempt3/frozen/config.json'))),ids=config.registeredResources.containers.map(c=>c.id);
assert(command.executable==='/usr/local/bin/docker'&&command.exitCode===0&&Array.isArray(args)&&args[0]==='inspect'&&args.length===4&&new Set(args.slice(1)).size===3&&ids.every(id=>args.includes(id)),'successful exact cleanup inspect command required');
assert(typeof command.stdout==='string');const raw=Buffer.from(command.stdout),sha=b=>createHash('sha256').update(b).digest('hex');assert(raw.length<=1024**2&&sha(raw)===command.stdoutSha256);
assertCleanupInspection(raw,ids);await writeFile(output,raw,{flag:'wx'});
console.log(JSON.stringify({cleanupInspectionPath:output,cleanupInspectionSha256:sha(raw),cleanupCommandReceiptPath:envelopePath,cleanupCommandReceiptSha256:sha(bytes),sourceEnvelopePreserved:true}));
