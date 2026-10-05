"""Real owned OS processes; simulated observer, no brokers/Docker/ps actions."""
import json,pathlib,subprocess,sys,tempfile,time
from unittest.mock import patch
import resource_watchdog as guard
import supervise_checks as supervisor
real_popen = subprocess.Popen
owned = []
with tempfile.TemporaryDirectory() as temp,patch.object(guard,'root',pathlib.Path(temp)):
    observer = guard.root/'observer.py'
    observer.write_text("import json,pathlib,time,sys\np=pathlib.Path(sys.argv[1])\nfor _ in range(5):\n t=p.with_suffix('.tmp');t.write_text(json.dumps({'monotonic':time.monotonic()}));t.replace(p);time.sleep(0.2)\nsys.exit(1)\n")
    def spawn(argv,**kwargs):
        if len(argv)>1 and argv[1].endswith('resource_watchdog.py'):
            argv=[sys.executable,'-B',str(observer),str(guard.root/'watchdog-heartbeat.json')]
        process=real_popen(argv,**kwargs);owned.append(process);return process
    cleanup=[]
    start=time.monotonic()
    try:
        with patch.object(supervisor.subprocess,'Popen',side_effect=spawn),patch.object(guard,'stop_owned',side_effect=lambda:cleanup.append('simulated broker cleanup') or {'errors':[],'dockerExecuted':False}):
            code=supervisor.run([[sys.executable,'-c','import time;time.sleep(120)']]*2)
        exits=[p.poll() for p in owned]
        assert code==1 and len(owned)==3 and all(x is not None for x in exits), (code,exits)
        assert exits[1:]==[-15,-15], exits
        rows=[json.loads(line) for line in (guard.root/'resource-snapshots.jsonl').read_text().splitlines()]
        assert rows[0]['result']=='SUPERVISOR_ABORT' and cleanup
        assert rows[-1]['groupErrors']==[],rows
        print(json.dumps({'result':'PASS','scenario':'Real observer exits1; real supervisor terminates its two owned process groups','exitCodes':exits,'supervisorExitCode':code,'elapsedSeconds':round(time.monotonic()-start,3),'rows':rows,'scope':'OS process cleanup exercised; observer resource sampling simulated; Docker/ps/brokers not executed'}))
    finally:
        for p in owned:
            if p.poll() is None: supervisor.terminate_group(p)
