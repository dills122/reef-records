import hashlib
import importlib.util
import json
from pathlib import Path
import subprocess
import tempfile
import unittest

spec = importlib.util.spec_from_file_location('checks', Path(__file__).resolve().parents[1] / 'scripts/check_records.py')
checks = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checks)


class IntegrityTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.file = self.root / 'records/reef/docs/old.md'
        self.file.parent.mkdir(parents=True)
        self.file.write_bytes(b'original\r\n')
        (self.root / '.gitattributes').write_text('records/** -text\n')
        (self.root / 'manifests').mkdir()
        self.manifest = self.root / 'manifests/import.json'
        self.data = {'schema_version': 1, 'source_repository': 'https://github.com/dills122/reef', 'source_commit': 'a' * 40, 'selection_policy': 'superseded', 'files': [{'source_path': 'docs/old.md', 'archive_path': 'records/reef/docs/old.md', 'bytes': 10, 'sha256': hashlib.sha256(self.file.read_bytes()).hexdigest(), 'reason': 'historic'}]}
        self.save()

    def save(self):
        self.manifest.write_text(json.dumps(self.data))

    def test_exact_bytes_and_tampering(self):
        self.assertEqual(len(checks.inventory(self.root)), 1)
        self.file.write_bytes(b'original\n')
        with self.assertRaisesRegex(ValueError, 'changed record'):
            checks.inventory(self.root)

    def test_missing_or_extra_record(self):
        extra = self.file.parent / 'extra.log'
        extra.write_text('extra')
        with self.assertRaisesRegex(ValueError, 'unmanifested'):
            checks.inventory(self.root)
        extra.unlink()
        self.file.unlink()
        with self.assertRaisesRegex(ValueError, 'missing'):
            checks.inventory(self.root)

    def test_traversal_duplicate_and_symlink(self):
        with self.assertRaises(ValueError):
            checks.safe_path('../outside')
        self.data['files'].append(dict(self.data['files'][0]))
        self.save()
        with self.assertRaisesRegex(ValueError, 'duplicate'):
            checks.inventory(self.root)
        self.data['files'].pop()
        self.save()
        self.file.unlink()
        self.file.symlink_to(self.manifest)
        with self.assertRaisesRegex(ValueError, 'symlinked'):
            checks.inventory(self.root)

    def test_append_only_checks_bytes_even_when_manifest_is_updated(self):
        def git(*args):
            return subprocess.run(['git', *args], cwd=self.root, check=True, capture_output=True)
        git('init')
        git('add', '.')
        git('-c', 'commit.gpgsign=false', '-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', 'commit', '-m', 'initial')
        checks.append_only(self.root, 'HEAD')
        self.file.write_bytes(b'rewritten\n')
        self.data['files'][0]['sha256'] = hashlib.sha256(self.file.read_bytes()).hexdigest()
        self.save()
        with self.assertRaisesRegex(ValueError, 'changed or removed'):
            checks.append_only(self.root, 'HEAD')


if __name__ == '__main__':
    unittest.main()
