import datetime,hashlib,json,pathlib,re,subprocess
work=pathlib.Path.cwd();root=work/'.planning/sprint1-proof-bounded'
core=json.loads((root/'broker-core/results.json').read_text())['results'];golden=json.loads((root/'broker-golden/results.json').read_text())['results'];assert len(core)==24 and len(golden)==20
assert len(set(r['name'] for r in core))==24 and {r['name'] for r in golden}=={'golden-'+str(i) for i in range(20)}
assert len([r for r in core if r['name'].startswith('mutation-')])==19
for row in core+golden:
 assert row['after']['pass'],row['name']
 assert row['isolated']
 reconstruction=next(r['isolatedReconstruction'] for r in row['isolated'] if 'isolatedReconstruction' in r)
 assert all(reconstruction[k] for k in ['mixedAgeRefused','missingHistoryRefused','repairFromCompleteHistory']),row['name']
 reconstructed=next(r['result'] for r in row['isolated'] if 'result' in r)
 assert reconstructed['pass'] and reconstructed['readCommittedOracle'],row['name']
 if row['fault']:assert row['before']['coveredInputs']==0,row['name']
rows=[json.loads(x) for x in (root/'resource-snapshots.jsonl').read_text().splitlines()]
assert any(r.get('result')=='SUPERVISED_CHECKS_FINISHED' for r in rows) and any(r.get('result')=='CHECKS_FINISHED' for r in rows)
assert not any('ABORT' in r.get('result','') for r in rows)
samples=[r for r in rows if 'projectAllocatedBytes' in r]
assert max(r['projectAllocatedBytes'] for r in samples)<9*1024**3
assert min(r['guestFreeBytes'] for r in samples)>=20*1024**3
attempts=[json.loads(x) for x in (root/'attempts.jsonl').read_text().splitlines()];assert next(r for r in attempts if r['name']=='supervised-matrix')['exitCode']==0
plan1=json.loads((root/'broker-core/plan.json').read_text());plan2=json.loads((root/'broker-golden/plan.json').read_text());assert len(plan1['mutationBoundaries'])==19 and plan2['goldenCases']==20
scope=json.loads((work/'.planning/sprint1-review/instance-7/scope-manifest.json').read_text());assert all(hashlib.sha256((work/r['path']).read_bytes()).hexdigest()==r['sha256'] for r in scope['operationalWorkingTree'])
for name in ['source-manifest.json','build-manifest.json']:
 obj=json.loads((work/'.planning/sprint1-proof-3435d7b0'/name).read_text());items=obj.get('sourceFiles',obj.get('classesAndDependencies'));assert all(hashlib.sha256((work/r['path']).read_bytes()).hexdigest()==r['sha256'] for r in items)
node=(root/'post-review-node-ci.stdout.log').read_text();counts={key:int(re.search(r'^# '+key+r' (\d+)$',node,re.M)[1]) for key in ['tests','pass','fail','skipped']};assert counts=={'tests':154,'pass':154,'fail':0,'skipped':0}
coverage=re.search(r'^# all files\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)\s*\|\s*([\d.]+)',node,re.M)
(root/'node-ci-summary.json').write_text(json.dumps({'counts':counts,'coveragePercent':dict(zip(['lines','branches','functions'],map(float,coverage.groups()))),'scope':'Exact31-file Node CI command; coverage includes testfiles/previousscripts, not product-widecoverage'},indent=2)+'\n')
settings=json.loads((root/'final-topic-metadata.stdout.log').read_text());assert len(settings)==132
settings_rows=[]
for entry in settings:
 s=entry['summary'];cfg={r['key']:r['value'] for r in entry['configs']}
 assert s['partitions']==1 and s['replicas']==3 and not s['error']
 assert cfg['write.caching']=='false' and int(cfg['segment.bytes'])==8388608
 assert cfg.get('min.insync.replicas') in (None,'2')
 settings_rows.append({'topic':s['name'],'partitions':1,'replicas':3,'writeCaching':False,'segmentBytes':8388608,'cleanupPolicy':cfg['cleanup.policy'],'retentionMs':cfg['retention.ms'],'requestedKafkaMinISR':2,'reportedKafkaMinISR':cfg.get('min.insync.replicas'),'redpandaRF3RaftQuorum':2,'quorumScope':'Protocol documentation inference, not empirical majority-outagefaultproof'})
(root/'final-topic-settings.json').write_text(json.dumps({'topics':settings_rows,'count':132,'scope':'ActualtopicRF3/writecaching/segments readback; KafkaISRhintabsentnotfabricated'},indent=2)+'\n')
def command(name,argv):
 result=subprocess.run(argv,capture_output=True,text=True,timeout=15)
 (root/(name+'.stdout.log')).write_text(result.stdout);(root/(name+'.stderr.log')).write_text(result.stderr);assert result.returncode==0
 return result.stdout
allocated=[]
for i in range(3):
 text=command(f'final-layout-rp{i}',['docker','exec',f'reef-calcify-financial-s1-bounded-rp{i}-1','du','-k','-d','3','/var/lib/redpanda/data'])
 allocated.append(int(text.splitlines()[-1].split()[0])*1024)
(root/'final-resource-layout.json').write_text(json.dumps({'allocatedBytesPerReplica':allocated,'totalAllocatedBytes':sum(allocated),'scope':'Live allocatedbrokerdirs afterallarms whileclusterup; distinctfromsamplemaximum and stoppedfootprint'},indent=2)+'\n')
summary={'result':'PASS','utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'sourceHead':'f22b2f852a3aa1b14bd52a36f828f3e5cceb351f','codeSourceHead':'f75b5d6187b631d5d608a24b883df6c57478b151','profileSourceHead':'f56b30b19d00a1033abae44a75435a4e771990e9','review':'7of7 Ready with non-blocking follow-ups; no new actionablefinding; guardP1closed','coreArms':24,'goldenArms':20,'mutationFaults':19,'otherCoreArms':['happy','forward','serialization','local-state-loss','staged-phase-loss'],'allAfterOraclePass':True,'isolatedHistoryChecks':44,'priorFaultsExposedZeroUncommittedOutputs':True,'resourceSamples':len(samples),'maxSampledAllocatedBytes':max(r['projectAllocatedBytes'] for r in samples),'minGuestFreeBytes':min(r['guestFreeBytes'] for r in samples),'maxSampledRawBytes':max(r['rawProofBytes'] for r in samples),'finalLiveAllocatedBytes':sum(allocated),'forecasts':json.loads((work/'.planning/sprint1-proof-bounded-pilot/resource-gate.json').read_text())['forecastAllocatedBytes'],'elapsedSeconds':{r['name']:r['elapsedSeconds'] for r in attempts if r['name'] in {'broker-core','broker-golden','supervised-matrix'}},'topicSettingsVerified':132,'sourceFilesUnchanged':18,'buildFilesUnchanged':89,'guardFilesUnchanged':5,'freshNodeCI':counts,'retainedSameCodePlatform':{'reportedTests':795,'reportedPassed':775,'skips':20,'failures':0,'errors':0,'financialPassed':27,'scope':'Alreadyfreshlyrerunafterreview5; identical18software/89buildhashes independentlyverified7; offlineDBguardedreturns noDBintegrationclaim'},'limitations':['5ssamples notcontinuouspeak/hard10GiBguarantee','Observedcorrectnesstimingnotthroughput/capacitylatency','FullE3majority/staleowner/producerfailure/committed-beforeACK/A10B27activationmatrixstillopen','E4heap/ACK/physicalbyte/calibrationgatesopen; noE4load','No production/cutover/fullRFCsignoff']}
(root/'proof-summary.json').write_text(json.dumps(summary,indent=2)+'\n');print(json.dumps({k:summary[k] for k in ['result','coreArms','goldenArms','maxSampledAllocatedBytes','minGuestFreeBytes','elapsedSeconds']}))
