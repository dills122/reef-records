from pathlib import Path
import hashlib,json,subprocess,os
root=Path.cwd(); session=root/'.planning/calcify-e4-session-2026-10-05'; out=session/'reviews/heap-model-final-candidate'
def sha(p):
 h=hashlib.sha256()
 with Path(p).open('rb') as f:
  for b in iter(lambda:f.read(65536),b''):h.update(b)
 return h.hexdigest()
def save(n,v): (out/n).write_text(json.dumps(v,indent=2)+'\n')
cap=json.loads((session/'bootstrap-attempt1/frozen/capability.json').read_text()); cmd=json.loads((session/'bootstrap-attempt1/frozen/capability-command.json').read_text())
freeze=json.loads((session/'review-preparation/source-frozen-cycle3.json').read_text()); frozen={p:sha(root/p) for p in freeze['paths']}; assert frozen==freeze['paths']
source_dir=root/'services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial'; sources={str(p.relative_to(root)):sha(p) for p in sorted(source_dir.glob('Financial*.kt'))}
helpers=['rate-proof.mjs','bootstrap-calibration.mjs','rate-supervision.mjs','broker-proof.mjs','proof-supervisor.mjs','physical-evidence.mjs','physical-adapter.mjs','lib/external-faults.mjs']
for n in helpers: p=root/'scripts/dev/calcify-financial'/n; sources[str(p.relative_to(root))]=sha(p)
# Financial source-first ordering followed by mandatory helper order: same JSON UTF8 framing as Node sha(sourceSha256).
candidate=hashlib.sha256(json.dumps(sources,separators=(',',':'),ensure_ascii=False).encode()).hexdigest()
cp=cap['classpathEntries']; classdir=Path(cp[0])/'com/reef/platform/calcify/financial'; md=hashlib.sha256(); classes={}
for p in sorted(classdir.glob('Financial*.class')): md.update(p.name.encode()+b'\0'); md.update(p.read_bytes());classes[p.name]=sha(p)
build=md.hexdigest(); assert build==cap['buildSha256']
cpmd=hashlib.sha256(); cpidentity=[]
def part(x):cpmd.update(x.encode()+b'\0')
for entry in cp:
 p=Path(entry);part(str(p)); row={'path':entry}
 if p.is_dir():
  row['files']=[]
  for file in sorted(x for x in p.rglob('*') if x.is_file()):
   rel=str(file.relative_to(p));s=sha(file);part(rel);part(s);row['files'].append({'path':rel,'sha256':s})
 else:row['sha256']=sha(p);part(row['sha256'])
 cpidentity.append(row)
classpath=cpmd.hexdigest();assert classpath==cap['classpathSha256'];assert ':'.join(cp)==cmd['argv'][4]
assert sha(cmd['argv'][-2])==cap['fixtureSha256'];assert sha(cmd['argv'][-1])==cap['configSha256']
fixture=json.loads(Path(cmd['argv'][-2]).read_text());config=json.loads(Path(cmd['argv'][-1]).read_text());assert fixture['policy']==config['policy'];assert len(config['policy'])==7
java=Path(cmd['argv'][0]); javap=java.parent/'javap';jvm=java.parent.parent/'lib/server/libjvm.dylib'
env=dict(os.environ)
for k in ['JAVA_TOOL_OPTIONS','_JAVA_OPTIONS','JDK_JAVA_OPTIONS','CLASSPATH']:env.pop(k,None)
r=subprocess.run([str(java),'-Xms128m','-Xmx768m','-XX:+PrintFlagsFinal','-version'],capture_output=True,text=True,env=env);assert r.returncode==0;(out/'jdk21-flags.txt').write_text(r.stdout+r.stderr)
for name in ['FinancialRateProbe','FinancialRateProbe$Reference','FinancialKernel','FinancialKernel$Changes','FinancialBrokerProbe$FinancialProcessor']:
 r=subprocess.run([str(javap),'-p','-c','-l','-classpath',':'.join(cp),'com.reef.platform.calcify.financial.'+name],capture_output=True,text=True,env=env);assert r.returncode==0;(out/(name+'.javap.txt')).write_text(r.stdout)
for name in ['java.util.HashMap$Node','java.util.LinkedHashMap$Entry','com.fasterxml.jackson.databind.node.ObjectNode','com.fasterxml.jackson.databind.node.ContainerNode','com.fasterxml.jackson.databind.node.BaseJsonNode','com.fasterxml.jackson.databind.JsonNode']:
 r=subprocess.run([str(javap),'-p','-c','-classpath',':'.join(cp),name],capture_output=True,text=True,env=env);assert r.returncode==0;(out/(name.split('.')[-1]+'.javap.txt')).write_text(r.stdout)
for name in ['FinancialKernel.kt','FinancialRateProbe.kt','FinancialBrokerProbe.kt']:
 p=source_dir/name;(out/(name+'.source-lines.txt')).write_text(''.join(f'{i}: {line}\n' for i,line in enumerate(p.read_text().splitlines(),1)))
identity={'schema':'financial-retained-lower-current-binding-v1','capabilitySha256':sha(session/'bootstrap-attempt1/frozen/capability.json'),'commandSha256':sha(session/'bootstrap-attempt1/frozen/capability-command.json'),'buildSha256':build,'classpathSha256':classpath,'sourceHeadSuppliedBaseline':cap['sourceHead'],'fixtureSha256':cap['fixtureSha256'],'configSha256':cap['configSha256'],'candidateSha256':candidate,'candidateHashScope':'JSON UTF8 compact serialization of sorted Financial*.kt sourceSha256 then required eight helpers in validation order','sourceSha256':sources,'frozenCycle3Paths':frozen,'classSha256':classes,'classpathIdentity':cpidentity,'runtimeSha256':{str(java):sha(java),str(jvm):sha(jvm)},'policyKeys':list(config['policy'])};save('identity.json',identity)
print(json.dumps({k:identity[k] for k in ['buildSha256','classpathSha256','candidateSha256','fixtureSha256','configSha256']}));print('cycle3 paths:',len(frozen),'Financial sources:',len(sources)-8,'classes:',len(classes))
