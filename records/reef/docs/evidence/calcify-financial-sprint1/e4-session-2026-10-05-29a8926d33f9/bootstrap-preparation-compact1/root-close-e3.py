import json, pathlib, hashlib, subprocess, datetime, sys
assert sys.argv[1:] == ["--observed-cli-exit", "0"], "root observed terminal CLI0 required"
dir = pathlib.Path(__file__).resolve().parent
session = dir.parent
proof = session / "bootstrap-compact1/e3-current-candidate"
hashfile = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
finished_path = proof / "supervisor-finished.json"
status_path = proof / "wrapper-status.json"
finished = json.loads(finished_path.read_text())
status = json.loads(status_path.read_text())
assert finished["ok"] is True and finished["error"] is None and finished["cleanupErrors"] == []
assert finished["volumesPreserved"] is True and finished["wrapperStatus"]["code"] == 0
assert status["ok"] is True and status["totalResults"] == 49 and status["error"] is None
execution = session / "bootstrap-compact1/frozen/e3-execution-manifest.json"
assert status["manifestSha256"] == hashfile(execution)
recipe = json.loads((session / "e3-preparation-compact1/supervisor.recipe.json").read_text())
ids = [x["id"] for x in recipe["registeredResources"]["containers"]]
argv = ["docker", "inspect", *ids]
actual = subprocess.run(argv, capture_output=True)
raw_path = dir / "e3-cleanup-inspect.raw.json"
envelope_path = dir / "e3-cleanup-inspect.command.json"
assert not raw_path.exists() and not envelope_path.exists()
envelope_path.write_text(json.dumps({"argv":argv,"code":actual.returncode,"stdout":actual.stdout.decode(),"stderr":actual.stderr.decode()},indent=2)+"\n")
assert actual.returncode == 0
raw_path.write_bytes(actual.stdout)
containers = json.loads(actual.stdout)
assert {x["Id"] for x in containers} == set(ids) and all(not x["State"]["Running"] and x["State"]["Status"] == "exited" for x in containers)
closure = {"schema":"calcify-e3-closed-confirmation-v1","confirmedBy":"root","utc":datetime.datetime.now(datetime.timezone.utc).isoformat(),"cliExitCode":0,"writersClosed":True,"cleanupClosed":True,"proofRoot":str(proof),"executionManifestSha256":hashfile(execution),"supervisorFinishedSha256":hashfile(finished_path),"wrapperStatusSha256":hashfile(status_path),"cleanupInspectionSha256":hashfile(raw_path),"cleanupInspectionPath":str(raw_path),"receiptEnvelopePath":str(envelope_path),"scope":"Actual compact candidate49 RF3/EOS correctness; all original writers closed and exact3 exited volumes preserved; no bootstrap,rate,costupper qualification"}
closure_path = dir / "e3-closed-confirmation.json"
assert not closure_path.exists()
closure_path.write_text(json.dumps(closure,indent=2)+"\n")
rows = [json.loads(x) for x in (proof / "resource-samples.jsonl").read_text().splitlines()]
observations = [x for x in rows if "containers" in x]
fully = [x for x in observations if len(x["containers"]) == 3 and all(isinstance(c.get("measuredAllocatedBytes"),int) and not isinstance(c.get("measuredAllocatedBytes"),bool) for c in x["containers"])]
measurement = {"schema":"calcify-e3-closed-measurement-v1","journalRows":len(rows),"resourceObservations":len(observations),"fullyActualAll3Observations":len(fully),"maxProjectChargedBytes":max(x["projectAllocatedBytes"] for x in observations),"maxFullyMeasuredAll3BrokerBytes":max(sum(c["measuredAllocatedBytes"] for c in x["containers"]) for x in fully),"minGuestFreeBytes":min(x["guestFreeBytes"] for x in observations),"correctnessWrapperElapsedMs":status["completedAtMs"]-status["startedAtMs"],"sourceJournalSha256":hashfile(proof / "resource-samples.jsonl"),"scope":"Correctness only; charged project includes fixed3GiB target reservation, fully measured all3 distinct; lifecycle rows not resource observations; native,RSS,CPU,causal rates unknown"}
(dir / "e3-closed-measurement.json").write_text(json.dumps(measurement,indent=2)+"\n")
print(json.dumps({"closure":str(closure_path),"sha256":hashfile(closure_path),"measurement":measurement}))
