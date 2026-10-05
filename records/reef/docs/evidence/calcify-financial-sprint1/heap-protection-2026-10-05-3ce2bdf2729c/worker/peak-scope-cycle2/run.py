import subprocess,sys,time,json,pathlib,hashlib,datetime,shutil,os
root=pathlib.Path.cwd(); out=root/'.planning/calcify-heap-protection-2026-10-05/worker/peak-scope-cycle2'; label=sys.argv[1]; cmd=sys.argv[2:]
paths=['scripts/dev/calcify-financial/rate-proof.mjs','scripts/dev/calcify-financial/rate-proof.test.mjs','services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialRateProbe.kt','services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialHeapGuard.kt','services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/financial/FinancialHeapGuardTest.kt']
before={p:hashlib.sha256((root/p).read_bytes()).hexdigest() for p in paths if (root/p).exists()}
start=datetime.datetime.now(datetime.timezone.utc).isoformat(); t=time.monotonic()
env=os.environ.copy(); env['JAVA_HOME']='/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home'
with (out/(label+'.log')).open('w') as f: result=subprocess.run(cmd,stdout=f,stderr=subprocess.STDOUT,env=env)
receipt={'label':label,'command':cmd,'cwd':str(root),'JAVA_HOME':env['JAVA_HOME'],'startedAt':start,'elapsedSeconds':time.monotonic()-t,'exit':result.returncode,'sourceSha256':{p:hashlib.sha256((root/p).read_bytes()).hexdigest() for p in paths if (root/p).exists()}}
receipt['sourceBeforeSha256']=before; receipt['sourceUnchangedDuringCommand']=before==receipt['sourceSha256']; receipt['sourceSha256Scope']='post-run snapshot'
xml=root/'services/platform-runtime/build/test-results/test'
if xml.exists() and any('gradlew' in arg for arg in cmd) and '> Task :test UP-TO-DATE' not in (out/(label+'.log')).read_text():
 dest=out/(label+'-xml'); dest.mkdir(exist_ok=True)
 for p in xml.glob('TEST-*FinancialHeapGuardTest.xml'): shutil.copy2(p,dest/p.name)
(out/(label+'.json')).write_text(json.dumps(receipt,indent=2)+'\n'); print(json.dumps(receipt)); print((out/(label+'.log')).read_text()[-4500:]); sys.exit(result.returncode)
