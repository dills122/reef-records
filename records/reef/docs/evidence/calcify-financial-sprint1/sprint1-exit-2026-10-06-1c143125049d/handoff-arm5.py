from pathlib import Path
import json,time,datetime
r=Path(__file__).resolve().parent;s=r/'arm5/proof/supervision/resource-samples.jsonl';w=r/'arm5/proof/supervision/wrapper.stderr.log';deadline=time.monotonic()+60
while time.monotonic()<deadline:
 if s.exists() and w.exists():
  lines=s.read_text().splitlines()
  if lines:
   d=json.loads(lines[0]);assert len(d['containers'])==3 and all(c['running'] and c['healthy'] for c in d['containers']);h={'accepted':True,'utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'strictSupervisorEvidence':str(s),'ownedWrapperLog':str(w),'firstSampleUtc':d.get('utc'),'resourceProfile':'financial-empirical-heap8-disk16-v1','scope':'strict14/16GiB runtime supervisor observed registered broker+hostresources and launched owned8GiB wrapper before handoff'};(r/'broker3/watch-handoff.json').write_text(json.dumps(h,indent=2)+'\n');print(json.dumps(h));break
 time.sleep(.2)
else:raise RuntimeError('strict handoff receipts not present within60s; inspect supervisor failure')
