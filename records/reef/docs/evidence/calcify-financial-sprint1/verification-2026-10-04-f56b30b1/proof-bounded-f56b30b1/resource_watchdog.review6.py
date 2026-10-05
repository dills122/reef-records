import datetime, json, os, pathlib, shlex, signal, subprocess, sys, time
root = pathlib.Path(__file__).resolve().parent
project = "reef-calcify-financial-s1-bounded"
expected = {"broker-core", "broker-golden"}
stop_bytes = 9 * 1024**3

def stop_owned():
    subprocess.run(["docker", "compose", "-p", project, "-f", "docs/evidence/calcify-financial-sprint1/broker.compose.yml", "stop"], check=True, capture_output=True)
    rows = []
    for line in subprocess.check_output(["ps", "-axo", "pid=,ppid=,command="], text=True).splitlines():
        parts = line.strip().split(None, 2)
        if len(parts) == 3: rows.append((int(parts[0]), int(parts[1]), parts[2]))
    parents = []
    for pid, ppid, cmd in rows:
        try: args = shlex.split(cmd)
        except ValueError: continue
        if len(args) > 2 and pathlib.Path(args[1]).name == "run_checks.py" and args[2] in expected:
            proof_marker = "CALCIFY_FINANCIAL_PROOF_DIR=" + str(root / args[2])
            run_marker = "CALCIFY_FINANCIAL_RUN_ID=bounded-f56b30b1-" + args[2].removeprefix("broker-")
            if proof_marker in args and run_marker in args: parents.append(pid)
    nodes = [pid for pid, ppid, cmd in rows if ppid in parents and "broker-proof.mjs" in cmd]
    children = [pid for pid, ppid, cmd in rows if ppid in nodes and "com.reef.platform.calcify.financial.FinancialBrokerProbe" in cmd and "financial-s1-97924e15-bounded-f56b30b1-" in cmd]
    for pid in nodes + children:
        try: os.kill(pid, signal.SIGTERM)
        except ProcessLookupError: pass
    return {"nodePids": nodes, "financialJavaPids": children, "volumesPreserved": True}

while True:
    sizes = []
    commands = []
    for i in range(3):
        cmd = ["docker", "exec", f"{project}-rp{i}-1", "du", "-sk", "/var/lib/redpanda/data"]
        out = subprocess.check_output(cmd, text=True)
        sizes.append(int(out.split()[0]) * 1024); commands.append({"argv": cmd, "stdout": out})
    cmd = ["docker", "exec", f"{project}-rp0-1", "df", "-k", "/var/lib/redpanda/data"]
    out = subprocess.check_output(cmd, text=True); commands.append({"argv": cmd, "stdout": out})
    free = int(out.splitlines()[-1].split()[3]) * 1024
    raw = sum(f.stat().st_size for f in root.rglob("*") if f.is_file())
    completed = []
    if (root / "attempts.jsonl").exists():
        completed = [json.loads(line)["name"] for line in (root / "attempts.jsonl").read_text().splitlines() if line.strip()]
    row = {"utc": datetime.datetime.now(datetime.timezone.utc).isoformat(), "projectAllocatedBytes": sum(sizes), "guestFreeBytes": free, "rawProofBytes": raw, "commands": commands, "scope": "Allocated broker dirs including internal topics; excludes Docker VM overhead; 5s samples not continuous peak"}
    breached = sum(sizes) >= stop_bytes or free < 20 * 1024**3 or raw >= 256 * 1024**2
    if breached: row.update(result="BUDGET_ABORT", cleanup=stop_owned())
    with (root / "resource-snapshots.jsonl").open("a") as f: f.write(json.dumps(row) + "\n")
    if breached: print(json.dumps(row)); sys.exit(1)
    if expected.issubset(completed): print(json.dumps({"result": "CHECKS_FINISHED", "finalSample": row})); break
    time.sleep(5)
