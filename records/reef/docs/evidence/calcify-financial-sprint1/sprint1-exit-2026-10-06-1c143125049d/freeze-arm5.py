from pathlib import Path
import json,hashlib,subprocess,os
r=Path(__file__).resolve().parent;old=r/'arm4/frozen';arm=r/'arm5';f=arm/'frozen';f.mkdir(parents=True);(arm/'store').mkdir();(arm/'journal').mkdir();root=r.parent.parent
j=lambda p:json.loads(p.read_text());sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();save=lambda p,d:p.write_text(json.dumps(d,indent=2)+'\n')
node='/Users/dsteele/.local/share/fnm/node-versions/v22.22.1/installation/bin/node';java='/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home/bin/java';cp=':'.join(j(r/'classpath-entry-locations.json'));cls='com.reef.platform.calcify.financial.FinancialRateProbe';reg=j(r/'broker3/registration.json')['registeredResources'];bootstrap=reg['bootstrapServers'];profile='financial-empirical-heap8-disk16-v1';env=dict(os.environ)
for k in ('JAVA_TOOL_OPTIONS','_JAVA_OPTIONS','JDK_JAVA_OPTIONS','CLASSPATH'):env.pop(k,None)
def run(name,argv):
 p=subprocess.run(argv,cwd=root,env=env,capture_output=True,text=True);save(f/(name+'-command.json'),{'argv':argv,'returncode':p.returncode,'stdout':p.stdout,'stderr':p.stderr});assert p.returncode==0,(name,p.stderr[-2000:]);return p.stdout
scope=json.loads(run('broker-scope',[java,'-Xms128m','-Xmx8g','-cp',cp,cls,'broker-scope',bootstrap]))
cfg=j(old/'config.json');cfg['registeredResources']=reg;cfg['brokerScope']=scope;cfg['ownedRoot']=str(arm);cfg['stateDir']=str(arm/'store');cfg['ackJournalDir']=str(arm/'journal');cfg['proofDir']=str(arm/'proof')
for x in cfg['localResources']:x['path']=str(arm/('journal' if x['id']=='journal' else x['id']))
save(f/'config.json',cfg);save(f/'config.template.json',cfg)
for name in ('fixture.json','correctness-compatibility.json','prior-e3-correctness.json'):(f/name).write_bytes((old/name).read_bytes())
cap=run('capability',[java,'-Xms128m','-Xmx8g','-cp',cp,cls,'heap-capability','863503ec23c27f33ecea14fd82724fe28f96d308',str(f/'fixture.json'),str(f/'config.json')]);(f/'capability.json').write_text(cap);c=json.loads(cap);assert c['maxHeapBytes']==8589934592
req=j(old/'request.json');req['capability']=c;req['capabilityEvidenceSha256']=sha(f/'capability.json');req['resourceProfile']=profile;save(f/'request.json',req)
(f/'policy.json').write_text(run('freeze',[node,str(root/'scripts/dev/calcify-financial/rate-proof.mjs'),'freeze-diagnostic',str(f/'request.json')]))
a=j(old/'adapter.json');a['args']=[java][0:0]+['-Xms128m','-Xmx8g','-cp',cp,cls,'diagnostic-run',bootstrap,'financial-s1-exit-timed3',str(f/'config.json')];a['command']=java
s=j(old/'supervisor.json');s['registeredResources']=reg;s['hostLocalResources']={'ownedRoot':str(arm),'paths':cfg['localResources']};s['wrapper']['argv']=[java,*a['args'],'--financial-rate-policy',str(f/'policy.json'),'--financial-rate-measurement',str(arm/'proof/measurement.json')];s['wrapper']['cwd']=str(root);s['wrapper']['outputDir']=str(arm/'proof/supervision');s['resourceProfile']=profile;s['resourcePolicyBinding']={'resourceProfile':profile,'diskBudgetBytes':17179869184,'policySha256':j(f/'policy.json')['policySha256']};s.pop('budgets',None);save(f/'supervisor.json',s);a['supervisorEvidenceSha256']=sha(f/'supervisor.json');save(f/'adapter.json',a)
print(json.dumps({'policySha256':j(f/'policy.json')['policySha256'],'configSha256':sha(f/'config.json'),'buildSha256':c['buildSha256'],'clusterId':scope['clusterId'],'maxHeapBytes':c['maxHeapBytes']}))
