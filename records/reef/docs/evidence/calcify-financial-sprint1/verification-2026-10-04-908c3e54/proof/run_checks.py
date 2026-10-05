import argparse, datetime, hashlib, json, os, pathlib, subprocess, time
p = argparse.ArgumentParser()
p.add_argument("name")
p.add_argument("--cwd", default=".")
p.add_argument("command", nargs=argparse.REMAINDER)
a = p.parse_args()
root = pathlib.Path(os.environ.get("CALCIFY_PROOF_CAPTURE_DIR", pathlib.Path(__file__).resolve().parent)).resolve()
root.mkdir(parents=True, exist_ok=True)
command = a.command[1:] if a.command and a.command[0] == "--" else a.command
started = datetime.datetime.now(datetime.timezone.utc).isoformat()
t0 = time.monotonic()
with (root / (a.name + ".stdout.log")).open("xb") as out, (root / (a.name + ".stderr.log")).open("xb") as err:
    result = subprocess.run(command, cwd=a.cwd, stdout=out, stderr=err)
entry = {"name":a.name, "command":command, "cwd":str(pathlib.Path(a.cwd).resolve()), "startedUtc":started, "elapsedSeconds":round(time.monotonic()-t0,3), "exitCode":result.returncode}
for field in ["stdout", "stderr"]:
    file = root / (a.name + "." + field + ".log")
    entry[field] = {"path":file.name,"bytes":file.stat().st_size,"sha256":hashlib.sha256(file.read_bytes()).hexdigest()}
with (root / "attempts.jsonl").open("a") as log:
    log.write(json.dumps(entry)+"\n")
print(json.dumps(entry))
raise SystemExit(result.returncode)
