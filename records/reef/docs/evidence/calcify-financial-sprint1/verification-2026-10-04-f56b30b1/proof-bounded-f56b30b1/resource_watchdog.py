"""Bounded resource observer; supervisor owns probe process groups independently."""
import datetime, json, os, pathlib, shlex, signal, subprocess, sys, time
root = pathlib.Path(__file__).resolve().parent
project = 'reef-calcify-financial-s1-bounded'
expected = {'broker-core', 'broker-golden'}
compose = ['docker', 'compose', '-p', project, '-f', 'docs/evidence/calcify-financial-sprint1/broker.compose.yml', 'stop']

def record(row):
    row['utc'] = datetime.datetime.now(datetime.timezone.utc).isoformat()
    with (root / 'resource-snapshots.jsonl').open('a') as out:
        out.write(json.dumps(row) + '\n'); out.flush(); os.fsync(out.fileno())

def stop_owned():
    result = {'nodePids': [], 'financialJavaPids': [], 'errors': [], 'volumesPreserved': True}
    # Probe termination must not depend on Docker accepting stop.
    try:
        output = subprocess.check_output(['ps', '-axo', 'pid=,ppid=,command='], text=True, timeout=5)
        rows = []
        for line in output.splitlines():
            parts = line.strip().split(None, 2)
            if len(parts) == 3:
                rows.append((int(parts[0]), int(parts[1]), parts[2]))
        parents = []
        for pid, _, cmd in rows:
            try: args = shlex.split(cmd)
            except ValueError: continue
            if len(args) > 2 and pathlib.Path(args[1]).name == 'run_checks.py' and args[2] in expected:
                proof_marker = 'CALCIFY_FINANCIAL_PROOF_DIR=' + str(root / args[2])
                run_marker = 'CALCIFY_FINANCIAL_RUN_ID=bounded-f56b30b1-' + args[2].removeprefix('broker-')
                if proof_marker in args and run_marker in args: parents.append(pid)
        nodes = [pid for pid, ppid, cmd in rows if ppid in parents and 'broker-proof.mjs' in cmd]
        java = [pid for pid, ppid, cmd in rows if ppid in nodes and 'com.reef.platform.calcify.financial.FinancialBrokerProbe' in cmd and 'financial-s1-97924e15-bounded-f56b30b1-' in cmd]
        for pid in java + nodes:
            try: os.kill(pid, signal.SIGTERM)
            except ProcessLookupError: pass
            except OSError as error: result['errors'].append(repr(error))
        result.update(nodePids=nodes, financialJavaPids=java)
    except Exception as error:
        result['errors'].append('process cleanup: ' + repr(error))
    try:
        stopped = subprocess.run(compose, capture_output=True, text=True, timeout=15, check=True)
        result['brokerStop'] = {'exitCode': stopped.returncode, 'stdout': stopped.stdout, 'stderr': stopped.stderr}
    except Exception as error:
        result['errors'].append('broker cleanup: ' + repr(error))
    return result

def abort(reason, error=None):
    # Retain original cause before any cleanup can fail.
    row = {'result': reason, 'error': repr(error) if error else None}
    try: record(row)
    finally:
        cleanup = stop_owned()
        record({'result': 'CLEANUP', 'cause': reason, 'cleanup': cleanup})
    return 1

def sample():
    sizes, commands = [], []
    for i in range(3):
        cmd = ['docker', 'exec', f'{project}-rp{i}-1', 'du', '-sk', '/var/lib/redpanda/data']
        out = subprocess.check_output(cmd, text=True, timeout=5)
        size = int(out.split()[0]) * 1024
        if size < 0: raise ValueError('negative allocated bytes')
        sizes.append(size); commands.append({'argv': cmd, 'stdout': out})
    cmd = ['docker', 'exec', f'{project}-rp0-1', 'df', '-k', '/var/lib/redpanda/data']
    out = subprocess.check_output(cmd, text=True, timeout=5)
    commands.append({'argv': cmd, 'stdout': out})
    free = int(out.splitlines()[-1].split()[3]) * 1024
    if free < 0: raise ValueError('negative free bytes')
    raw = sum(f.stat().st_size for f in root.rglob('*') if f.is_file())
    completed = []
    attempts = root / 'attempts.jsonl'
    if attempts.exists():
        completed = [json.loads(line)['name'] for line in attempts.read_text().splitlines() if line.strip()]
    return {'projectAllocatedBytes': sum(sizes), 'guestFreeBytes': free, 'rawProofBytes': raw, 'commands': commands, 'completed': completed, 'scope': '5s samples, not continuous peak; broker dirs include internal topics; VM overhead excluded'}

def main():
    def interrupted(signum, frame): raise InterruptedError(f'signal {signum}')
    signal.signal(signal.SIGTERM, interrupted); signal.signal(signal.SIGINT, interrupted)
    try:
        while True:
            row = sample(); record(row)
            if row['projectAllocatedBytes'] >= 9 * 1024**3 or row['guestFreeBytes'] < 20 * 1024**3 or row['rawProofBytes'] >= 256 * 1024**2:
                return abort('BUDGET_ABORT')
            heartbeat = root / 'watchdog-heartbeat.json'
            temp = heartbeat.with_suffix('.tmp')
            temp.write_text(json.dumps({'monotonic': time.monotonic()})); temp.replace(heartbeat)
            if expected.issubset(row['completed']):
                record({'result': 'CHECKS_FINISHED'}); return 0
            time.sleep(5)
    except Exception as error:
        return abort('MONITOR_ABORT', error)

if __name__ == '__main__': sys.exit(main())
