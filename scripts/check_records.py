#!/usr/bin/env python3
"""Verify immutable imports without executing imported content."""
import argparse
import hashlib
import json
import re
import subprocess
from pathlib import Path, PurePosixPath

ROOT = Path(__file__).resolve().parents[1]


def safe_path(value):
    if not isinstance(value, str) or not value or '\\' in value:
        raise ValueError(f'invalid path: {value!r}')
    path = PurePosixPath(value)
    if path.is_absolute() or '..' in path.parts or str(path) != value:
        raise ValueError(f'unsafe path: {value!r}')
    return path


def inventory(root):
    root = root.resolve()
    result = {}
    for manifest in sorted((root / 'manifests').glob('*.json')):
        data = json.loads(manifest.read_text())
        if data['schema_version'] != 1 or not re.fullmatch(r'[0-9a-f]{40}', data['source_commit']):
            raise ValueError(f'invalid provenance: {manifest}')
        if data['source_repository'] != 'https://github.com/dills122/reef':
            raise ValueError(f'unexpected source: {manifest}')
        if not data['selection_policy'] or not data['files']:
            raise ValueError(f'missing selection/files: {manifest}')
        for entry in data['files']:
            source = str(safe_path(entry['source_path']))
            target = str(safe_path(entry['archive_path']))
            if target != 'records/reef/' + source or target in result:
                raise ValueError(f'duplicate or mismatched destination: {target}')
            if not entry['reason'] or not re.fullmatch(r'[0-9a-f]{64}', entry['sha256']):
                raise ValueError(f'invalid file metadata: {target}')
            if type(entry['bytes']) is not int or entry['bytes'] < 0:
                raise ValueError(f'invalid size: {target}')
            path = root / target
            if path.is_symlink() or not path.is_file() or any((root / Path(*Path(target).parts[:i])).is_symlink() for i in range(1, len(Path(target).parts))):
                raise ValueError(f'missing or symlinked record: {target}')
            content = path.read_bytes()
            if len(content) != entry['bytes'] or hashlib.sha256(content).hexdigest() != entry['sha256']:
                raise ValueError(f'changed record: {target}')
            result[target] = entry
    actual = {str(p.relative_to(root)) for p in (root / 'records').rglob('*') if p.is_file() or p.is_symlink()}
    if actual != set(result):
        raise ValueError(f'unmanifested/missing records: {sorted(actual ^ set(result))}')
    return result


def append_only(root, base):
    paths = subprocess.check_output(['git', 'ls-tree', '-r', '--name-only', base, '--', 'records', 'manifests'], cwd=root).decode().splitlines()
    for name in paths:
        original = subprocess.check_output(['git', 'show', f'{base}:{name}'], cwd=root)
        path = root / name
        if not path.is_file() or path.read_bytes() != original:
            raise ValueError(f'existing import changed or removed: {name}')


SECRET_PATTERNS = [
    rb'-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----',
    rb'\b(?:gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{70,})\b',
    rb'\b(?:AKIA|ASIA)[A-Z0-9]{16}\b',
    rb'\bxox[baprs]-[A-Za-z0-9-]{20,}\b',
]


def hygiene(root):
    paths = subprocess.check_output(['git', 'ls-files', '-z', '--cached', '--others', '--exclude-standard'], cwd=root).decode().split('\0')
    for name in filter(None, paths):
        path = root / name
        if path.is_symlink():
            raise ValueError(f'symlink: {name}')
        if path.name == '.env' or path.name.startswith('.env.') or path.suffix in {'.pem', '.key', '.jfr'}:
            raise ValueError(f'private/generated file: {name}')
        if any(part in {'node_modules', '__pycache__', '.terraform'} for part in path.parts):
            raise ValueError(f'generated directory: {name}')
        if path.stat().st_size > 50 * 1024 * 1024:
            raise ValueError(f'file over 50 MiB; split/package import explicitly: {name}')
        content = path.read_bytes()
        if any(re.search(pattern, content) for pattern in SECRET_PATTERNS):
            raise ValueError(f'recognizable credential pattern in {name}; inspect privately')
    for name in ['README.md', 'INDEX.md', 'CONTRIBUTING.md', 'AGENTS.md', 'SECURITY.md', 'docs/ARCHIVE_POLICY.md']:
        text = (root / name).read_text()
        if re.search(r'\{\{[A-Z_]+\}\}', text):
            raise ValueError(f'unfilled template: {name}')
        for target in re.findall(r'\[[^\]]*\]\(([^)]+)\)', text):
            if re.match(r'[a-z]+:', target):
                continue
            resolved = (root / name).parent / target.split('#')[0]
            if not resolved.exists():
                raise ValueError(f'broken active link: {name}: {target}')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--mode', choices=['all', 'integrity', 'hygiene'], default='all')
    parser.add_argument('--base', help='Git base ref for append-only verification')
    args = parser.parse_args()
    if args.mode in {'all', 'integrity'}:
        records = inventory(ROOT)
        if args.base:
            append_only(ROOT, args.base)
        print(f'Archive integrity passed: {len(records)} records')
    if args.mode in {'all', 'hygiene'}:
        hygiene(ROOT)
        print('Repository hygiene passed')


if __name__ == '__main__':
    main()
