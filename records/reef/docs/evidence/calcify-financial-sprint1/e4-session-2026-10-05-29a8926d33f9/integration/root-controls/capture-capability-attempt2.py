import json,sys,subprocess,pathlib,datetime,hashlib,os
r=pathlib.Path(__file__).resolve().parents[2]
old=json.loads((r/"bootstrap-attempt1/proof/heap-capability-attempt.json").read_text())
fixture,config,out=map(lambda p:pathlib.Path(p).resolve(),sys.argv[1:4])
assert fixture.is_file() and config.is_file() and not out.exists()
args=old["args"][:-2]+[str(fixture),str(config)]
env={k:v for k,v in os.environ.items() if k not in {"JAVA_TOOL_OPTIONS","_JAVA_OPTIONS","JDK_JAVA_OPTIONS","CLASSPATH"}}
start=datetime.datetime.now(datetime.timezone.utc).isoformat()
p=subprocess.run([old["command"],*args],capture_output=True,text=True,env=env)
receipt={"command":old["command"],"args":args,"startedUtc":start,"endedUtc":datetime.datetime.now(datetime.timezone.utc).isoformat(),"code":p.returncode,"stdout":p.stdout,"stderr":p.stderr}
raw=json.dumps(receipt,indent=2)+"\n"
out.with_name(out.name+".command-receipt.json").write_text(raw)
assert p.returncode==0,p.stderr
cap=json.loads(p.stdout.strip().splitlines()[-1]);assert cap["maxHeapBytes"]==805306368
assert cap["vmArguments"]==["-Xms128m","-Xmx768m"]
out.write_text(json.dumps(cap,indent=2)+"\n")
print(json.dumps({"path":str(out),"sha256":hashlib.sha256(out.read_bytes()).hexdigest(),"buildSha256":cap["buildSha256"],"classpathSha256":cap["classpathSha256"]}))
