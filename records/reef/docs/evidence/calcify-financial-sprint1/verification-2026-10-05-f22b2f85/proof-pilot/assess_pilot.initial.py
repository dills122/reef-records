import json,pathlib,subprocess,time
root=pathlib.Path(__file__).resolve().parent
project='reef-calcify-financial-s1-bounded-pilot';topics=[]
for line in (root/'topic-list.stdout.log').read_text().splitlines()[1:]:
 fields=line.split()
 if fields: assert fields[1:]==['1','3'];topics.append(fields[0])
assert len(topics)==6
configs=[]
for index,topic in enumerate(topics):
 argv=['docker','exec',project+'-rp0-1','rpk','topic','describe',topic,'-c']
 result=subprocess.run(argv,capture_output=True,text=True,timeout=15)
 (root/f'topic-{index}-config.stdout.log').write_text(result.stdout);(root/f'topic-{index}-config.stderr.log').write_text(result.stderr)
 assert result.returncode==0
 entries={line.split()[0]:line.split()[1] for line in result.stdout.splitlines() if len(line.split())>=2}
 assert entries['min.insync.replicas']=='2',entries
 assert entries['write.caching']=='false',entries
 assert int(entries['segment.bytes'])==8388608,entries
 configs.append({'topic':topic,'partitions':1,'replicas':3,'minISR':2,'writeCaching':False,'segmentBytes':8388608,'argv':argv})
allocated_by_arm={'core':0,'golden':0};tx_parts=[]
for i in range(3):
 argv=['docker','exec',project+f'-rp{i}-1','du','-k','-d','3','/var/lib/redpanda/data']
 result=subprocess.run(argv,capture_output=True,text=True,timeout=15);assert result.returncode==0
 (root/f'active-layout-rp{i}.stdout.log').write_text(result.stdout)
 topic_rows=[]
 for line in result.stdout.splitlines():
  size,path=line.split('\t');p=pathlib.PurePosixPath(path)
  if p.parent.as_posix()=='/var/lib/redpanda/data/kafka':
   for arm in allocated_by_arm:
    if p.name.startswith('financial-s1-97924e15-bounded-f56b30b1-'+arm+'-happy-'):
     allocated_by_arm[arm]+=int(size)*1024;topic_rows.append(path)
  if p.parent.as_posix()=='/var/lib/redpanda/data/kafka_internal/tx':tx_parts.append((i,p.name))
 assert len(topic_rows)==6
assert len(tx_parts)==150 # 50 coordinator partitions,3 replicas observed
rows=[json.loads(line) for line in (root/'resource-snapshots.jsonl').read_text().splitlines()]
samples=[row for row in rows if 'projectAllocatedBytes' in row]
assert samples and any(r.get('result')=='CHECKS_FINISHED' for r in rows) and any(r.get('result')=='SUPERVISED_CHECKS_FINISHED' for r in rows)
peak=max(r['projectAllocatedBytes'] for r in samples);max_arm=max(allocated_by_arm.values())
# Keep whole pilot peak as shared allowance, including pilot arm bytes. Add2x
# observed maximum complete arm allocation for ALL44matrixarms (double counts
# pilot arms intentionally); coordinator already has all50partitions/RF3 allocated.
forecast=peak+2*max_arm*44
raw=sum(f.stat().st_size for f in root.rglob('*') if f.is_file())
forecast_raw=raw+2*max(sum(f.stat().st_size for f in (root/('broker-'+a)).rglob('*') if f.is_file()) for a in ['core','golden'])*44
free=min(r['guestFreeBytes'] for r in samples)
result={'result':'PASS' if forecast<9*1024**3 and free-forecast>=20*1024**3 and forecast_raw<256*1024**2 else 'BLOCKED','pilotArms':2,'pilotPeakSampledAllocatedBytes':peak,'perArmAllocatedBytes':allocated_by_arm,'maxPerArmBytes':max_arm,'safetyMultiplier':2,'plannedMatrixArms':44,'forecastAllocatedBytes':forecast,'abortAllocatedBytes':9*1024**3,'configuredBudgetBytes':10*1024**3,'minObservedGuestFreeBytes':free,'forecastFreeBytesLowerBound':free-forecast,'minimumFreeBytes':20*1024**3,'rawProofBytes':raw,'forecastRawBytes':forecast_raw,'rawBudgetBytes':256*1024**2,'coordinatorPartitionsObserved':50,'coordinatorReplicaDirsObserved':150,'formula':'Whole activepilot peak (no stoppedfootprint/subtraction) + 2*max observed fullarm allocation acrossall3replicas*44; rawforecast analogous. Includes alreadyallocated50txn partitions; doublesallplannedperarmtopic/changelogcost. Forecast is assumption, not empirical fullmatrixpass; liveguard remains required.','scope':'Synthetic correctness only;5s samples not continuouspeak; no capacity claim','topicConfigs':configs}
(root/'resource-gate.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps({k:v for k,v in result.items() if k!='topicConfigs'}));assert result['result']=='PASS'
