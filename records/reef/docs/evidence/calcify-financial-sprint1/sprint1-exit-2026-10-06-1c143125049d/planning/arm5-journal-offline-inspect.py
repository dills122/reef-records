# Read-only closed-journal forensic reader; does not instantiate mutating recovery.
import pathlib,json,hashlib,struct,base64,collections
root=pathlib.Path('.planning/calcify-sprint1-exit-2026-10-06/arm5');j=root/'journal'
def sha_file(p):
 h=hashlib.sha256()
 with p.open('rb') as f:
  while b:=f.read(65536):h.update(b)
 return h.hexdigest()
files={p.name:{'bytes':p.stat().st_size,'sha256':sha_file(p)} for p in j.iterdir() if p.is_file()}
header=json.loads((j/'scope.json').read_text());scope=header['scope'];scopehash=header['scopeSha256']
assert hashlib.sha256(json.dumps(scope,separators=(',',':')).encode()).hexdigest()==scopehash
assert files['publications.bin']==files['publication-witness.bin']
def frame(f,pos):
 f.seek(pos);n=struct.unpack('>i',f.read(4))[0];assert 1<=n<=4096
 b=f.read(n);assert len(b)==n;digest=hashlib.sha256(b).digest();assert f.read(32)==digest
 return json.loads(b),pos+n+36,digest.hex()
count=0;dataPos=0;pubPos=0;dataChain='GENESIS';pubChain='GENESIS';physical=-1;bytesByKind=collections.Counter();counts=collections.Counter();maxByKind=collections.Counter();firstOffer=None;lastOffer=None;firstCallback=None;lastCallback=None;markerCount=0;firstMember=None;lastMember=None
with (j/'publications.bin').open('rb') as pub,(j/'members.bin').open('rb') as data,(j/'ordinal-index.bin').open('rb') as index:
 while pubPos<files['publications.bin']['bytes']:
  marker,pubNext,pubHash=frame(pub,pubPos);assert marker['scopeSha256']==scopehash and marker['priorSha256']==pubChain and marker['firstOrdinal']==count
  end=marker['publishedCount'];assert count<end<=6000000 and end-count<=256
  while count<end:
   assert struct.unpack('>qq',index.read(16))==(dataPos,pubPos)
   m,nextPos,mhash=frame(data,dataPos);assert m['ordinal']==count and m['offset']>physical and m['priorSha256']==dataChain and m['clockScope']==marker['clockScope']
   assert all(m[k]==v for k,v in scope.items() if k in m)
   b=base64.b64decode(m['payloadBase64'],validate=True);assert len(b)==m['bytes'] and hashlib.sha256(b).hexdigest()==m['payloadSha256'] and len(b)<=1024
   payload=json.loads(b);assert payload['inputOrdinal']==count and payload['domain']==scope['domain'] and payload['mode']=='EXECUTE'
   kind='CAPTURE' if count%2==0 else 'SETTLE';assert m['kind']==kind and m['phase']=='timed' and m['trade']==count//2 and payload['input']['kind']==kind and payload['input']['payload']['executionId']==f'timed-{count//2}'
   execution=f'timed-{count//2}'
   expected={'executionId':execution,'runId':'e4','venueSessionId':'venue','instrumentId':'ACME'}
   if kind=='CAPTURE':expected.update({'buyOrderId':f'buyer-{execution}','sellOrderId':f'seller-{execution}','buyerAccount':'buyer','sellerAccount':'seller','cashAsset':'USD_NANO','securityAsset':'ACME_SHARE','quantity':'1','priceNanos':'10000000','dueTick':'0'})
   else:expected['attempt']='1'
   assert payload=={'domain':'hot','mode':'EXECUTE','inputOrdinal':count,'input':{'namespace':'financial-e4','domain':'hot','actionId':f'{execution}-{kind}','kind':kind,'payload':expected}}
   counts[kind]+=1;bytesByKind[kind]+=len(b);maxByKind[kind]=max(maxByKind[kind],len(b))
   if firstOffer is None:firstOffer=m['offeredNano'];firstCallback=m['callbackNano'];firstMember=m
   lastOffer=m['offeredNano'];lastCallback=m['callbackNano'];lastMember=m
   dataChain=mhash;physical=m['offset'];dataPos=nextPos;count+=1
  assert marker['dataEnd']==dataPos and marker['indexEnd']==count*16 and marker['lastPhysicalOffset']==physical and marker['dataSha256']==dataChain
  pubPos=pubNext;pubChain=pubHash;markerCount+=1
 assert pubPos==files['publications.bin']['bytes']
for name,r in files.items():assert (j/name).stat().st_size==r['bytes'] and sha_file(j/name)==r['sha256']
r={'scope':scope,'rawFiles':files,'publicationMarkerCount':markerCount,'validatedPublishedMembers':count,'pairedPublishedSettleInputs':counts['SETTLE'],'unpairedCaptureInput':counts['CAPTURE']-counts['SETTLE'],'sourcePayloadBytes':dict(bytesByKind),'sourcePayloadMaxBytes':dict(maxByKind),'sourcePayloadAverageBytes':{k:bytesByKind[k]/counts[k] for k in counts},'offeredClockSpanMs':(lastOffer-firstOffer)/1e6,'callbackClockSpanMs':(lastCallback-firstCallback)/1e6,'publishedDataBytes':dataPos,'unpublishedDataTailBytes':files['members.bin']['bytes']-dataPos,'unpublishedIndexTailBytes':files['ordinal-index.bin']['bytes']-count*16,'firstPublishedMember':{k:firstMember[k] for k in ['ordinal','offset','offeredNano','callbackNano','clockScope']},'lastPublishedMember':{k:lastMember[k] for k in ['ordinal','offset','offeredNano','callbackNano','clockScope']},'sourcePrefixChecks':'Full frame SHA/chain + mirrored publication witness + ordinal index + payload SHA + topic/run/domain/physical order + paired exact synthetic source input verified; raw files unchanged before/after read','limitations':['Source publication only, not business settlement or read_committed result parity','No persisted controller admission notification nano or timedStart/deadline cut; no deadline stage counts/rates reconstructed','Journal checks alone do not certify settlement, result-only replay or new managed restart','No broker read or RocksDB opening performed']}
measurement=json.loads((root/'proof/measurement.json').read_text());ack=measurement['ackJournal']
assert count==300000 and counts['CAPTURE']==counts['SETTLE']==150000 and dataPos==files['members.bin']['bytes'] and files['ordinal-index.bin']['bytes']==count*16
assert ack['scope']==scope and ack['publishedMembers']==count and ack['queueSize']==0
for key,name in [('dataSha256','members.bin'),('publicationSha256','publications.bin'),('publicationWitnessSha256','publication-witness.bin')]:assert ack[key]==files[name]['sha256']
assert ack['logicalBytes']==sum(v['bytes'] for v in files.values()) and measurement['resources']['encodedInputBytes']==sum(bytesByKind.values())
r['measurementComparison']={'ackJournalHashesExact':True,'scopeExact':True,'publishedMembersExact':True,'queueSizeZero':True,'logicalBytesExact':True,'encodedInputBytesExact':True,'measurementSha256':sha_file(root/'proof/measurement.json'),'measurementDeadline':measurement['deadline'],'measurementFinal':measurement['final'],'deadlineScope':'Copied published measurement; not reconstructed from journal offer/callback clocks'}
r['sourcePrefixChecks']='Full frame SHA/chain + mirrored publication witness + ordinal index + payload SHA + topic/run/domain/physical order + exact complete synthetic source input verified; raw files unchanged before/after read'
out=pathlib.Path('.planning/calcify-sprint1-exit-2026-10-06/planning/arm5-journal-offline-findings.json');out.write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({k:v for k,v in r.items() if k not in ['rawFiles','firstPublishedMember','lastPublishedMember','limitations']}))
