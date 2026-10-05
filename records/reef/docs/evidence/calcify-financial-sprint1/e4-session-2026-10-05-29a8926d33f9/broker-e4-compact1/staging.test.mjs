// Static recipe controls only; never invokes Docker or workload.
import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import path from 'node:path';
const dir=path.resolve(import.meta.dirname),session=path.dirname(dir);
test('all twelve exact prior IDs in create and both watchers, while authorization remains false',async()=>{
 const retry3=JSON.parse(await readFile(path.join(session,'broker-e4-attempt3/registration.json'))).registeredResources.containers.map(c=>c.id);
 const ids=[];for(const name of ['prepare.mjs','bootstrap-watch.mjs','restart-before-e3/restart-watch.mjs']){const text=await readFile(path.join(dir,name),'utf8'),m=/const oldIds=(\[[^;]+\]);/.exec(text);assert(m);const rows=JSON.parse(m[1]);assert.equal(rows.length,12);assert.equal(new Set(rows).size,12);assert(retry3.every(id=>rows.includes(id)));ids.push(rows);}assert.deepEqual(ids[0],ids[1]);assert.deepEqual(ids[0],ids[2]);
 const token=JSON.parse(await readFile(path.join(dir,'setup-authorization.template.json')));assert.equal(token.accepted,false);assert.equal(token.successfulBaselineClosed,false);assert.match(await readFile(path.join(dir,'prepare.mjs'),'utf8'),/authorization.successfulBaselineClosed===true/);
});
test('unique future endpoints/subnet; actual config/capability/proof remain absent',async()=>{
 const profile=JSON.parse(await readFile(path.join(dir,'profile.json')));assert.equal(profile.project,'reef-calcify-e4-compact1-8c6f');assert.equal(profile.bootstrapServers,'127.0.0.1:40392,127.0.0.1:40492,127.0.0.1:40592');assert.match(await readFile(path.join(dir,'pinned-network.compose.yml'),'utf8'),/10\.254\.246\.0\/24/);
 for(const rel of ['frozen/config.json','frozen/capability.json','e3-current-candidate','proof','store','journal'])await assert.rejects(readFile(path.join(session,'bootstrap-compact1',rel)),{code:'ENOENT'});
});
