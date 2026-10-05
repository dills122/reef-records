"""Mock-only controls: no Docker, ps or process signals reach host."""
import importlib.util, json, pathlib, subprocess, tempfile, time, unittest
from unittest.mock import patch, Mock
import resource_watchdog as guard
import supervise_checks as supervisor

class Controls(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root_patch = patch.object(guard, 'root', pathlib.Path(self.temp.name)); self.root_patch.start()
    def tearDown(self):
        self.root_patch.stop(); self.temp.cleanup()
    def rows(self):
        return [json.loads(line) for line in (guard.root / 'resource-snapshots.jsonl').read_text().splitlines()]
    def ps(self):
        return f'100 1 python3 /proof/run_checks.py broker-core -- env CALCIFY_FINANCIAL_PROOF_DIR={guard.root}/broker-core CALCIFY_FINANCIAL_RUN_ID=bounded-f56b30b1-core node broker-proof.mjs\n101 100 node broker-proof.mjs\n102 101 java com.reef.platform.calcify.financial.FinancialBrokerProbe financial-s1-97924e15-bounded-f56b30b1-core\n200 1 python3 /proof/run_checks.py broker-core -- env CALCIFY_FINANCIAL_PROOF_DIR=/foreign/broker-core CALCIFY_FINANCIAL_RUN_ID=bounded-f56b30b1-core node broker-proof.mjs\n201 200 node broker-proof.mjs\n202 201 java com.reef.platform.calcify.financial.FinancialBrokerProbe financial-s1-97924e15-bounded-f56b30b1-core\n'
    def main_failure(self, error):
        def fake(argv, **kwargs):
            self.assertEqual(kwargs['timeout'], 5)
            if argv[0] == 'ps': return self.ps()
            raise error
        with patch.object(guard.subprocess, 'check_output', side_effect=fake), patch.object(guard.subprocess, 'run', return_value=Mock(returncode=0, stdout='', stderr='')) as stop, patch.object(guard.os, 'kill') as kill, patch.object(guard.signal, 'signal'):
            self.assertEqual(guard.main(), 1)
            self.assertEqual([call.args[0] for call in kill.call_args_list], [102, 101])
            self.assertEqual(stop.call_args.kwargs['timeout'], 15)
        self.assertEqual(self.rows()[0]['result'], 'MONITOR_ABORT')
        self.assertEqual(self.rows()[1]['result'], 'CLEANUP')
    def test_sampling_command_failure(self): self.main_failure(subprocess.CalledProcessError(1, ['docker']))
    def test_sampling_timeout(self): self.main_failure(subprocess.TimeoutExpired(['docker'], 5))
    def test_sampling_parse_failure(self):
        def fake(argv, **kwargs): return self.ps() if argv[0] == 'ps' else 'bogus'
        with patch.object(guard.subprocess, 'check_output', side_effect=fake), patch.object(guard.subprocess, 'run', return_value=Mock(returncode=0, stdout='', stderr='')), patch.object(guard.os, 'kill') as kill, patch.object(guard.signal, 'signal'):
            self.assertEqual(guard.main(), 1); self.assertEqual(kill.call_count, 2)
        self.assertEqual(self.rows()[0]['result'], 'MONITOR_ABORT')
    def test_stop_failure_preserves_abort_and_owned_signals(self):
        sample = {'projectAllocatedBytes': 10*1024**3, 'guestFreeBytes': 30*1024**3, 'rawProofBytes': 1, 'completed': []}
        with patch.object(guard, 'sample', return_value=sample), patch.object(guard.subprocess, 'check_output', return_value=self.ps()), patch.object(guard.subprocess, 'run', side_effect=subprocess.CalledProcessError(1, ['docker'])), patch.object(guard.os, 'kill') as kill, patch.object(guard.signal, 'signal'):
            self.assertEqual(guard.main(), 1); self.assertEqual([c.args[0] for c in kill.call_args_list], [102, 101])
        rows = self.rows(); self.assertEqual(rows[1]['result'], 'BUDGET_ABORT'); self.assertTrue(rows[2]['cleanup']['errors'])
    def test_ps_failure_still_attempts_broker_stop(self):
        with patch.object(guard.subprocess, 'check_output', side_effect=subprocess.TimeoutExpired(['ps'],5)), patch.object(guard.subprocess, 'run', return_value=Mock(returncode=0, stdout='', stderr='')) as stop:
            result = guard.stop_owned()
        self.assertEqual(stop.call_count, 1); self.assertTrue(result['errors'])
    def test_watcher_disappearance_stops_registered_groups_even_ps_and_docker_fail(self):
        watcher = Mock(pid=500); watcher.poll.return_value = None
        core = Mock(pid=501); core.poll.return_value = None
        golden = Mock(pid=502); golden.poll.return_value = None
        (guard.root / 'watchdog-heartbeat.json').write_text('{}')
        with patch.object(supervisor.subprocess, 'Popen', side_effect=[watcher,core,golden]), patch.object(pathlib.Path, 'unlink'), patch.object(supervisor, 'watcher_healthy', side_effect=[None,None,None,RuntimeError('observer disappeared')]), patch.object(supervisor, 'terminate_group') as groups, patch.object(guard, 'stop_owned', return_value={'errors':['ps timeout','docker stop failed']}) as cleanup:
            self.assertEqual(supervisor.run([['core'],['golden']]), 1)
        self.assertEqual([c.args[0].pid for c in groups.call_args_list], [501,502,500]); self.assertEqual(cleanup.call_count,1)
        self.assertEqual(self.rows()[0]['result'],'SUPERVISOR_ABORT'); self.assertEqual(self.rows()[1]['result'],'SUPERVISOR_CLEANUP')
    def test_one_group_cleanup_failure_does_not_skip_other_groups_or_brokers(self):
        watcher=Mock(pid=500); watcher.poll.return_value=1
        with patch.object(supervisor.subprocess,'Popen',return_value=watcher), patch.object(supervisor,'terminate_group',side_effect=PermissionError('mock signal failure')), patch.object(guard,'stop_owned',return_value={'errors':[]}) as cleanup:
            self.assertEqual(supervisor.run([['core'],['golden']]),1)
        self.assertEqual(cleanup.call_count,1); self.assertEqual(self.rows()[-1]['groupErrors'][0]['pid'],500)
    def test_stale_heartbeat_rejected(self):
        watcher = Mock(); watcher.poll.return_value = None
        (guard.root / 'watchdog-heartbeat.json').write_text(json.dumps({'monotonic':time.monotonic()-31}))
        with self.assertRaises(RuntimeError): supervisor.watcher_healthy(watcher, time.monotonic()-40)
    def test_dead_observer_rejected(self):
        watcher=Mock(); watcher.poll.return_value=1
        with self.assertRaises(RuntimeError): supervisor.watcher_healthy(watcher,time.monotonic())
    def test_group_term_escalates_kill(self):
        process=Mock(pid=123)
        with patch.object(supervisor.os,'killpg') as signals, patch.object(supervisor.time,'sleep'):
            supervisor.terminate_group(process)
        self.assertEqual([c.args[1] for c in signals.call_args_list], [guard.signal.SIGTERM,guard.signal.SIGKILL])
    def test_observer_waits_for_supervisor_completion_handshake(self):
        row={'projectAllocatedBytes':1,'guestFreeBytes':30*1024**3,'rawProofBytes':1,'completed':['broker-core','broker-golden']}
        def release(seconds): (guard.root/'supervisor-finished.json').write_text(json.dumps({'exitCodes':[0,0]}))
        with patch.object(guard,'sample',return_value=row) as samples, patch.object(guard.time,'sleep',side_effect=release),patch.object(guard.signal,'signal'):
            self.assertEqual(guard.main(),0)
        self.assertEqual(samples.call_count,2); self.assertEqual(self.rows()[-1]['result'],'CHECKS_FINISHED')
    def test_supervisor_releases_observer_only_after_both_wrapper_exits(self):
        watcher=Mock(pid=500); watcher.poll.return_value=None; watcher.wait.return_value=0
        core=Mock(pid=501,returncode=0);core.poll.return_value=0
        golden=Mock(pid=502,returncode=0);golden.poll.return_value=0
        (guard.root/'watchdog-heartbeat.json').write_text('{}')
        with patch.object(supervisor.subprocess,'Popen',side_effect=[watcher,core,golden]),patch.object(pathlib.Path,'unlink'),patch.object(supervisor,'watcher_healthy'):
            self.assertEqual(supervisor.run([['core'],['golden']]),0)
        self.assertEqual(json.loads((guard.root/'supervisor-finished.json').read_text())['exitCodes'],[0,0]);self.assertEqual(self.rows()[-1]['result'],'SUPERVISED_CHECKS_FINISHED')
    def test_guest_free_floor_aborts(self):
        row={'projectAllocatedBytes':1,'guestFreeBytes':19*1024**3,'rawProofBytes':1,'completed':[]}
        with patch.object(guard,'sample',return_value=row),patch.object(guard,'stop_owned',return_value={'errors':[]}) as cleanup,patch.object(guard.signal,'signal'):
            self.assertEqual(guard.main(),1)
        self.assertEqual(cleanup.call_count,1);self.assertEqual(self.rows()[1]['result'],'BUDGET_ABORT')
    def test_raw_proof_limit_aborts(self):
        row={'projectAllocatedBytes':1,'guestFreeBytes':30*1024**3,'rawProofBytes':256*1024**2,'completed':[]}
        with patch.object(guard,'sample',return_value=row),patch.object(guard,'stop_owned',return_value={'errors':[]}) as cleanup,patch.object(guard.signal,'signal'):
            self.assertEqual(guard.main(),1)
        self.assertEqual(cleanup.call_count,1);self.assertEqual(self.rows()[1]['result'],'BUDGET_ABORT')
    def test_abort_log_write_failure_still_cleans(self):
        with patch.object(guard,'record',side_effect=OSError('disk full')),patch.object(guard,'stop_owned',return_value={'errors':[]}) as cleanup:
            with self.assertRaises(OSError):guard.abort('MONITOR_ABORT',RuntimeError('sampling failed'))
        self.assertEqual(cleanup.call_count,1)
    def test_supervisor_abort_log_write_failure_still_cleans(self):
        watcher=Mock(pid=500);watcher.poll.return_value=1
        with patch.object(supervisor.subprocess,'Popen',return_value=watcher),patch.object(guard,'record',side_effect=OSError('disk full')),patch.object(supervisor,'terminate_group') as groups,patch.object(guard,'stop_owned',return_value={'errors':[]}) as cleanup:
            with self.assertRaises(OSError):supervisor.run([['core'],['golden']])
        self.assertEqual(groups.call_count,1);self.assertEqual(cleanup.call_count,1)
    def test_malformed_heartbeat_rejected(self):
        watcher=Mock();watcher.poll.return_value=None
        (guard.root/'watchdog-heartbeat.json').write_text('invalid')
        with self.assertRaises(ValueError):supervisor.watcher_healthy(watcher,time.monotonic())
    def test_invalid_completion_fails_closed(self):
        row={'projectAllocatedBytes':1,'guestFreeBytes':30*1024**3,'rawProofBytes':1,'completed':['broker-core','broker-golden']}
        (guard.root/'supervisor-finished.json').write_text(json.dumps({'exitCodes':[0,1]}))
        with patch.object(guard,'sample',return_value=row),patch.object(guard,'stop_owned',return_value={'errors':[]}) as cleanup,patch.object(guard.signal,'signal'):
            self.assertEqual(guard.main(),1)
        self.assertEqual(cleanup.call_count,1);self.assertEqual(self.rows()[-2]['result'],'MONITOR_ABORT')
    def test_df_parse_failure(self):
        def fake(argv,**kwargs): return self.ps() if argv[0]=='ps' else ('1 data' if 'du' in argv else 'bad df')
        with patch.object(guard.subprocess,'check_output',side_effect=fake), patch.object(guard.subprocess,'run',return_value=Mock(returncode=0,stdout='',stderr='')), patch.object(guard.os,'kill'),patch.object(guard.signal,'signal'):
            self.assertEqual(guard.main(),1)
        self.assertEqual(self.rows()[0]['result'],'MONITOR_ABORT')

if __name__ == '__main__': unittest.main(verbosity=2)
