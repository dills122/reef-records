from pathlib import Path
from datetime import datetime, timezone
import hashlib,json,subprocess,sys
r=Path(__file__).resolve().parent
attempt=r/'evidence'/sys.argv[1]
attempt.mkdir()
manifest={str(p.relative_to(r)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(r.glob('src/**/*.kt'))}
manifest['build.gradle.kts']=hashlib.sha256((r/'build.gradle.kts').read_bytes()).hexdigest()
(attempt/'source-hashes.json').write_text(json.dumps(manifest,indent=2)+'\n')
cmd=[str(r.parents[2]/'services/platform-runtime/gradlew'),'-p',str(r),'--offline','--no-daemon','run']
receipt={'command':cmd,'startUtc':datetime.now(timezone.utc).isoformat(),'scope':'isolated ignored standalone project; no root Gradle compilation'}
(attempt/'receipt.json').write_text(json.dumps(receipt,indent=2)+'\n')
with (attempt/'stdout-stderr.log').open('w') as out:
 result=subprocess.run(cmd,stdout=out,stderr=subprocess.STDOUT)
receipt.update(endUtc=datetime.now(timezone.utc).isoformat(),exitCode=result.returncode)
(attempt/'receipt.json').write_text(json.dumps(receipt,indent=2)+'\n')
print(json.dumps(receipt));sys.exit(result.returncode)
