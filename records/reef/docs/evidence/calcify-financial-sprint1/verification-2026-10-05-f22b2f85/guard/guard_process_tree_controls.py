"""Owned disposable wrapper/Node/Java trees; observer/Compose simulated."""
import json, os, pathlib, shutil, subprocess, sys, tempfile, time
from unittest.mock import patch
import resource_watchdog as guard
import supervise_checks as supervisor
real_popen = subprocess.Popen
java_home = pathlib.Path('/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home')

def dead(pid):
    probe=subprocess.run(['ps','-p',str(pid),'-o','stat='],capture_output=True,text=True,timeout=5)
    return not probe.stdout.strip() or probe.stdout.strip().startswith('Z')

results=[]
for scenario in ['observer-death','abort-log-write-failure']:
    with tempfile.TemporaryDirectory(prefix='calcify-owned-control-') as temp,patch.object(guard,'root',pathlib.Path(temp)):
        root=guard.root
        (root/'Waiter.java').write_text('public class Waiter { public static void main(String[] args) throws Exception { Thread.sleep(120000); } }\n')
        subprocess.run([str(java_home/'bin/javac'),str(root/'Waiter.java')],check=True,capture_output=True,timeout=30)
        (root/'stubborn.py').write_text('import signal,time\nsignal.signal(signal.SIGTERM,signal.SIG_IGN)\ntime.sleep(120)\n')
        (root/'node.mjs').write_text("import {spawn} from 'node:child_process';import {writeFileSync} from 'node:fs';\nprocess.on('SIGTERM',()=>{});\nconst java=spawn(process.argv[2],['-cp',process.argv[3],'Waiter']);const stubborn=spawn(process.argv[4],['-B',process.argv[5]]);\nwriteFileSync(process.argv[6],JSON.stringify({node:process.pid,java:java.pid,stubborn:stubborn.pid}));setInterval(()=>{},1000);\n")
        (root/'wrapper.py').write_text('import subprocess,sys\np=subprocess.Popen(sys.argv[1:]);sys.exit(p.wait())\n')
        (root/'observer.py').write_text("import json,pathlib,sys,time\nr=pathlib.Path(sys.argv[1]);start=time.monotonic()\nwhile True:\n p=r/'watchdog-heartbeat.json';t=p.with_suffix('.tmp');t.write_text(json.dumps({'monotonic':time.monotonic()}));t.replace(p)\n if all((r/(x+'.json')).exists() for x in ['core','golden']):time.sleep(0.6);sys.exit(1)\n if time.monotonic()-start>20:sys.exit(2)\n time.sleep(0.1)\n")
        foreign=real_popen([sys.executable,'-c','import time;time.sleep(120)'],start_new_session=True)
        owned=[];cleanup=[];record=guard.record
        def spawn(argv,**kwargs):
            if len(argv)>1 and argv[1].endswith('resource_watchdog.py'):argv=[sys.executable,'-B',str(root/'observer.py'),str(root)]
            child=real_popen(argv,**kwargs);owned.append(child);return child
        def fail_record(row):
            if scenario=='abort-log-write-failure' and row['result']=='SUPERVISOR_ABORT':raise OSError('injected abort log disk-full')
            return record(row)
        commands=[[sys.executable,'-B',str(root/'wrapper.py'),shutil.which('node'),str(root/'node.mjs'),str(java_home/'bin/java'),str(root),sys.executable,str(root/'stubborn.py'),str(root/(name+'.json'))] for name in ['core','golden']]
        started=time.monotonic();raised=None
        try:
            with patch.object(supervisor.subprocess,'Popen',side_effect=spawn),patch.object(guard,'stop_owned',side_effect=lambda:cleanup.append(True) or {'errors':[],'dockerExecuted':False}),patch.object(guard,'record',side_effect=fail_record):
                try:exit_code=supervisor.run(commands)
                except OSError as error:exit_code=None;raised=str(error)
            leaves=[]
            for name in ['core','golden']:leaves+=list(json.loads((root/(name+'.json')).read_text()).values())
            deadline=time.monotonic()+5
            while not all(dead(pid) for pid in leaves) and time.monotonic()<deadline:time.sleep(0.1)
            assert len(owned)==3 and all(p.poll() is not None for p in owned)
            assert all(dead(pid) for pid in leaves),leaves
            assert foreign.poll() is None,'unrelated sentinel terminated'
            assert cleanup
            rows=[json.loads(line) for line in (root/'resource-snapshots.jsonl').read_text().splitlines()]
            assert rows[-1]['result']=='SUPERVISOR_CLEANUP' and rows[-1]['groupErrors']==[],rows
            if scenario=='observer-death':assert exit_code==1 and raised is None
            else:assert raised=='injected abort log disk-full'
            results.append({'scenario':scenario,'result':'PASS','ownedGroups':3,'wrapperNodeJavaTrees':2,'leafProcesses':6,'allLeavesDead':True,'foreignSentinelAlive':True,'groupErrors':[],'abortLogError':raised,'elapsedSeconds':round(time.monotonic()-started,3),'scope':'Real own process trees/Java/SIGTERM-resistant Node+Python leaves; observer resource sampling and Docker cleanup simulated; exact owned PID-only ps status checks'})
        finally:
            for child in owned:
                supervisor.terminate_group(child)
            supervisor.terminate_group(foreign)
print(json.dumps({'controls':results,'passed':len(results),'failures':0}))
