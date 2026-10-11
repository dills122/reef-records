import json,re,statistics,datetime
from pathlib import Path
root=Path(__file__).parent
def size(text):
 match=re.fullmatch(r'([0-9.]+)(B|kB|KB|MB|GB|KiB|MiB|GiB)',text.strip());assert match,text
 factors={'B':1,'kB':1000,'KB':1000,'MB':1000000,'GB':1000000000,'KiB':1024,'MiB':1024**2,'GiB':1024**3}
 return float(match[1])*factors[match[2]]
def analyze(path):
 result=json.loads((path/'capture/results.json').read_text());origin=result['loadSpawnEpochMs']
 rows=[json.loads(s) for s in (path/'resources.jsonl').read_text().splitlines()];disk=[json.loads(s) for s in (path/'disk.jsonl').read_text().splitlines()]
 phases=[]
 for lo,hi in [(0,60),(60,150),(150,180),(180,300),(0,300)]:
  selected=[r for r in rows if lo<=(r['epochMs']-origin)/1000<hi];roles={};sums=[]
  for r in selected:
   cpus=[]
   for s in r['stats']:
    name=s['Name'].removeprefix('reef-calcify-contention-20261011-')
    if name.startswith('financial-'):name='financial'
    values=roles.setdefault(name,{'cpu':[],'memory':[]});cpu=float(s['CPUPerc'].rstrip('%'));cpus.append(cpu);values['cpu'].append(cpu);values['memory'].append(size(s['MemUsage'].split(' / ')[0]))
   sums.append(sum(cpus))
  phases.append({'startSeconds':lo,'endSeconds':hi,'samples':len(selected),'namedCpuPercentSampleMean':statistics.mean(sums) if sums else None,'namedCpuPercentSampleMax':max(sums) if sums else None,'roles':{k:{'cpuPercentSampleMean':statistics.mean(v['cpu']),'cpuPercentSampleMax':max(v['cpu']),'memoryBytesSampleMax':max(v['memory'])} for k,v in roles.items()}})
 health=[];seen=set()
 for line in (path/'live-health.jsonl').read_text().splitlines():
  d=json.loads(line);st=next(x['state'] for x in d['states'] if x['role']=='calcify-resolver');seen.add(st.get('StartedAt'));logs=st.get('Health',{}).get('Log',[]);state=None
  if logs:
   try:state=json.loads(logs[-1]['Output']).get('state')
   except ValueError:state='not-json'
  key=(st.get('StartedAt'),state)
  if not health or key!=(health[-1]['startedAt'],health[-1]['state']):health.append({'epochMs':d['epochMs'],'relativeSeconds':(d['epochMs']-origin)/1000,'startedAt':key[0],'state':key[1]})
 finances=[]
 for f in sorted(path.glob('financial-*-timestamped.log')):
  for line in f.read_text().splitlines():
   timestamp,_,body=line.partition(' ')
   try:d=json.loads(body)
   except ValueError:continue
   if 'committedTrades' not in d and 'nextTrade' not in d:continue
   dt=datetime.datetime.fromisoformat(timestamp.replace('Z','+00:00'));when=dt.timestamp()*1000
   finances.append({'epochMs':when,'relativeSeconds':(when-origin)/1000,'count':d.get('committedTrades',d.get('nextTrade')),'kind':'ready' if d.get('ready') else 'progress','restoreMs':d.get('restoreMs')})
 finances.sort(key=lambda r:r['epochMs']);bounds=[]
 for boundary in [60,150,180,300]:
  before=[x for x in finances if x['relativeSeconds']<=boundary];after=[x for x in finances if x['relativeSeconds']>=boundary]
  bounds.append({'second':boundary,'countLower':before[-1]['count'] if before else 0,'countUpper':after[0]['count'] if after else None,'lowerSampleSeconds':before[-1]['relativeSeconds'] if before else None,'upperSampleSeconds':after[0]['relativeSeconds'] if after else None})
 return {'phases':phases,'minGuestFreeBytes':min(r['availableBytes'] for r in disk),'resourceSampleCount':len(rows),'healthTransitions':health,'resolverStartedAtValues':sorted(x for x in seen if x),'financialWallClockCoverageBounds':bounds,'financialRestore': [x for x in finances if x['kind']=='ready'],'resourceScope':'Rounded sampled named-container Docker stats; excludes observers/host load driver; not CPU time, continuous peaks or whole-host utilization','financialTimingScope':'Docker wall-clock log receipt versus host epoch; no synchronized-clock error bound; diagnostic committed-count brackets, not monotonic throughput qualification'}
comparison={'treatment':analyze(Path('/private/tmp/calcify-contention-20261011/aged-run-02')),'control':analyze(root/'run')}
(root/'resource-comparison.json').write_text(json.dumps(comparison,indent=2)+'\n')
print(json.dumps({name:{'free':data['minGuestFreeBytes'],'health':data['healthTransitions'],'financial':data['financialWallClockCoverageBounds']} for name,data in comparison.items()}))
