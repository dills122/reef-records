// Manual operator preparation after watched setup/Admin readback; no Docker/probe launch.
import assert from 'node:assert/strict';
import {readFile,writeFile,lstat,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';import path from 'node:path';
import {validatePreflight} from '../../../scripts/dev/calcify-financial/proof-supervisor.mjs';
const dir=path.resolve(import.meta.dirname),session=path.dirname(dir),frozen=path.join(session,'bootstrap-compact1/frozen'),broker=path.join(session,'broker-e4-compact1');
const [templateRaw,preflightRaw,scopeRaw]=await Promise.all(['config.template.json',path.join(broker,'preflight.json'),path.join(broker,'broker-scope.json')].map(p=>readFile(path.isAbsolute(p)?p:path.join(frozen,p))));
const config=JSON.parse(templateRaw),preflight=JSON.parse(preflightRaw),scope=JSON.parse(scopeRaw),registry=preflight.registeredResources;
assert.equal(registry.project,'reef-calcify-e4-compact1-8c6f');assert.equal(registry.bootstrapServers,'127.0.0.1:40392,127.0.0.1:40492,127.0.0.1:40592');
assert.equal(scope.schema,'financial-broker-scope-v1');assert.equal(scope.metadataSource,'actual AdminClient describeCluster');assert.equal(scope.bootstrapServers,registry.bootstrapServers);assert(typeof scope.clusterId==='string'&&scope.clusterId.length>0);
assert.deepEqual(scope.brokers,registry.containers.map(c=>({id:c.brokerId,host:c.hostKafkaEndpoint.host,port:c.hostKafkaEndpoint.port})));
assert.equal(preflight.state,'HEALTHY_PROFILE_READ_BACK');config.registeredResources=registry;config.brokerScope=scope;
const supervisor={schema:'calcify-proof-supervisor-v1',registeredResources:registry,hostLocalResources:{ownedRoot:config.ownedRoot,paths:config.localResources},wrapper:{argv:['/usr/bin/true'],cwd:path.resolve(dir,'../../..'),outputDir:path.join(config.proofDir,'supervision'),timeoutMs:1800000}};validatePreflight(supervisor);
for(const p of [config.stateDir,config.ackJournalDir,config.proofDir])await assert.rejects(lstat(p),{code:'ENOENT'},'future local paths must not already exist');
for(const p of [config.stateDir,config.ackJournalDir])await mkdir(p,{recursive:false});
const raw=Buffer.from(JSON.stringify(config,null,2)+'\n'),out=path.join(frozen,'config.json');await writeFile(out,raw,{flag:'wx'});
const sha=b=>createHash('sha256').update(b).digest('hex');const receipt={schema:'calcify-bootstrap-config-binding-v1',actualLoadExecuted:false,configPath:out,configSha256:sha(raw),profilePath:path.join(broker,'preflight.json'),profileSha256:sha(preflightRaw),brokerScopePath:path.join(broker,'broker-scope.json'),brokerScopeSha256:sha(scopeRaw),stateAndJournalCreatedEmpty:true,proofAbsent:true};await writeFile(path.join(dir,'config-binding.json'),JSON.stringify(receipt,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(receipt));
