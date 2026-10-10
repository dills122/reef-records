import argparse,base64,concurrent.futures,hashlib,json,subprocess
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--commit',required=True);p.add_argument('--manifest',default='manifests/2026-10-10-calcify-finite-p3-o1-proof.json');a=p.parse_args()
r=Path('/private/tmp/reef-records-calcify-p3-20261010');repo='repos/dills122/reef-records';gh='/opt/homebrew/bin/gh'
def api(endpoint):return json.loads(subprocess.check_output([gh,'api',endpoint],text=True))
local_head=subprocess.check_output(['git','rev-parse','HEAD'],cwd=r,text=True).strip();assert local_head==a.commit
local_tree=subprocess.check_output(['git','rev-parse','HEAD^{tree}'],cwd=r,text=True).strip()
c=api(f'{repo}/git/commits/{a.commit}');assert c['sha']==a.commit and c['tree']['sha']==local_tree
tree_cache={}
def entry(path):
 oid=local_tree
 parts=path.split('/')
 for i,part in enumerate(parts):
  if oid not in tree_cache:
   tree=api(f'{repo}/git/trees/{oid}');assert not tree.get('truncated');tree_cache[oid]={x['path']:x for x in tree['tree']}
  e=tree_cache[oid][part]
  if i<len(parts)-1:assert e['type']=='tree';oid=e['sha']
 return e
prefix='records/reef/docs/evidence/calcify-finite-p3/2026-10-10-o1-proof'
subtree=api(f'{repo}/git/trees/{entry(prefix)["sha"]}?recursive=1');assert not subtree.get('truncated');entries={prefix+'/'+x['path']:x for x in subtree['tree']}
m=json.loads((r/a.manifest).read_text());paths=[x['archive_path'] for x in m['files']]+[a.manifest,'docs/imports/2026-10-10-calcify-finite-p3-o1-provenance.md','INDEX.md']
expected={}
for path in paths:
 data=(r/path).read_bytes();oid=subprocess.check_output(['git','rev-parse',f'{a.commit}:{path}'],cwd=r,text=True).strip();e=entries.get(path) or entry(path);assert e['type']=='blob' and e['sha']==oid and e['size']==len(data),path
 expected.setdefault(oid,[]).append({'path':path,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()})
def check(oid):
 b=api(f'{repo}/git/blobs/{oid}');assert b['sha']==oid and b['encoding']=='base64';data=base64.b64decode(b['content']);h=hashlib.sha256(data).hexdigest()
 for row in expected[oid]:assert len(data)==row['bytes'] and h==row['sha256'],row['path']
 return oid
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as ex:
 for i,oid in enumerate(ex.map(check,expected),1):
  if i%25==0 or i==len(expected):print(f'Verified remote blobs {i}/{len(expected)}',flush=True)
receipt={'schema_version':1,'archive_commit':a.commit,'archive_tree':local_tree,'remote_blob_count':len(expected),'verified_paths':paths,'record_count':len(m['files']),'record_bytes':sum(x['bytes'] for x in m['files']),'verification':'GitHub commit/tree identity and decoded remote blob bytes matched exact local committed SHA256/size; credentials never read/printed'}
Path('.planning/calcify-p3-overnight/delivery/remote-verification.json').write_text(json.dumps(receipt,indent=2)+'\n');print(json.dumps({k:v for k,v in receipt.items() if k!='verified_paths'}))
