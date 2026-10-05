"""Own spawned groups; stop probes if observer exits, stalls, or fails."""
import json, os, pathlib, signal, subprocess, sys, time
import resource_watchdog as guard


def terminate_group(process):
    # Every process is our Popen child with start_new_session=True.
    for sig in (signal.SIGTERM, signal.SIGKILL):
        try: os.killpg(process.pid, sig)
        except ProcessLookupError: return
        if sig == signal.SIGTERM: time.sleep(0.5)
    try: process.wait(timeout=5)
    except subprocess.TimeoutExpired: pass


def watcher_healthy(watcher, started):
    if watcher.poll() is not None: raise RuntimeError('observer exited before proof finished')
    heartbeat = json.loads((guard.root / 'watchdog-heartbeat.json').read_text())
    stamp = heartbeat['monotonic']
    if not isinstance(stamp, (int, float)) or stamp < started or not 0 <= time.monotonic() - stamp <= 30:
        raise RuntimeError('observer heartbeat stale/invalid')


def run(commands):
    children, watcher = [], None
    started = time.monotonic()
    (guard.root / 'watchdog-heartbeat.json').unlink(missing_ok=True)
    (guard.root / 'supervisor-finished.json').unlink(missing_ok=True)
    try:
        watcher = subprocess.Popen([sys.executable, str(guard.root / 'resource_watchdog.py')], start_new_session=True)
        deadline = started + 30
        while not (guard.root / 'watchdog-heartbeat.json').exists():
            if watcher.poll() is not None or time.monotonic() >= deadline: raise RuntimeError('observer startup failed')
            time.sleep(0.2)
        watcher_healthy(watcher, started)
        for command in commands:
            watcher_healthy(watcher, started)
            children.append(subprocess.Popen(command, start_new_session=True))
        while any(child.poll() is None for child in children):
            if any(child.poll() not in (None, 0) for child in children): raise RuntimeError('probe failed')
            watcher_healthy(watcher, started); time.sleep(0.2)
        if any(child.returncode != 0 for child in children): raise RuntimeError('probe failed')
        # Release observer only after wrappers have actually exited successfully.
        finished = guard.root / 'supervisor-finished.json'
        temporary = finished.with_suffix('.tmp')
        temporary.write_text(json.dumps({'exitCodes': [child.returncode for child in children]}))
        temporary.replace(finished)
        if watcher.wait(timeout=30) != 0: raise RuntimeError('observer final sample failed')
        guard.record({'result': 'SUPERVISED_CHECKS_FINISHED'}); return 0
    except BaseException as error:
        try: guard.record({'result': 'SUPERVISOR_ABORT', 'error': repr(error)})
        finally:
            group_errors = []
            for child in children + ([watcher] if watcher is not None else []):
                try: terminate_group(child)
                except Exception as group_error: group_errors.append({'pid': child.pid, 'error': repr(group_error)})
            cleanup = guard.stop_owned()
            guard.record({'result': 'SUPERVISOR_CLEANUP', 'groupErrors': group_errors, 'cleanup': cleanup})
        return 1


def main():
    commands = json.loads(pathlib.Path(sys.argv[1]).read_text())
    # Fixed two correctness wrappers; exact absolute proof/run ownership markers.
    if len(commands) != 2: raise ValueError('two correctness commands required')
    names = set()
    for argv in commands:
        if not isinstance(argv, list) or not all(isinstance(x, str) for x in argv) or len(argv) < 4:
            raise ValueError('invalid command')
        name = argv[2]; names.add(name)
        if argv[0] != sys.executable or pathlib.Path(argv[1]).resolve() != guard.root / 'run_checks.py' or name not in guard.expected:
            raise ValueError('unregistered wrapper')
        markers = ['CALCIFY_FINANCIAL_PROOF_DIR=' + str(guard.root / name), 'CALCIFY_FINANCIAL_RUN_ID=bounded-f56b30b1-' + name.removeprefix('broker-')]
        if not all(marker in argv for marker in markers): raise ValueError('missing exact ownership markers')
    if names != guard.expected: raise ValueError('duplicate/missing proof command')
    def interrupted(signum, frame): raise InterruptedError(f'signal {signum}')
    signal.signal(signal.SIGINT, interrupted); signal.signal(signal.SIGTERM, interrupted)
    return run(commands)

if __name__ == '__main__': sys.exit(main())
