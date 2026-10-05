# Cycle2 endpoint correction author handoff

Source frozen after corrected GREEN. Ownership: proof-supervisor.mjs/test, rate-supervision.mjs/test, bootstrap-calibration.mjs/test only. No Kotlin, broker, load, dependency, commit or Docker changes by this worker. Parent owns actual broker validation and review readiness.

## Gate behavior

Shared validateBrokerEndpoints(registry, required=false): legacy E3 without bootstrapServers/hostKafkaEndpoint stays unchanged; declared endpoint profiles require exactly3 unique nonnegative broker IDs, unique integer TCP ports1..65535, strict host127.0.0.1, containerPort equal `${hostPort}/tcp`, and literal broker-ID-ordered joined bootstrapServers. E4 calls helper with required=true. This session's strict profile uses one published Kafka port per container; arbitrary wildcard/multiple binding profiles require separate reviewed profile.

validateSample checks sample.rawInspection: exactly3 unique Docker Id rows, matching registry IDs, NetworkSettings.Ports exactlyone containerPort key, exactlyone HostIp127.0.0.1/HostPort frozen string binding. Declared sample summary endpoints cannot substitute for actual Docker rows. Actual dockerDependencies inspect invokes same check before allocation commands and cleanup stop. Supervisor prelaunch and repeated samples therefore validate actual endpoint mappings. Raw rejected inspection remains observation diagnostic.

validateBootstrapRuntime(config, supervisor, output, brokerArgument): existing canonical paths/full registry equality preserved; mandatory endpoint pins; exact args[6] bootstrap literal == supervisor registry == config brokerScope.bootstrapServers. brokerScope requires financial-broker-scope-v1, nonempty clusterId, metadataSource exactly `actual AdminClient describeCluster`, and sorted brokers exact frozen {id,host,port} list. superviseRateAdapter passes actual args[6] before dependencies for run/calibrate/bootstrap-calibrate. Ordinary generic supervisor children remain outside financial config gate. Actual cluster lookup belongs parent Kotlin pretopic/read-only gate; unit metadata is explicitly synthetic.

verifyBootstrapEvidence reads actual bounded/hash-matched raw config and requires same endpoint/scope identities. Each selected E3 plan.broker must equal this raw config registry bootstrapServers. E3 plan fixture/source/runner/compiled/ordered-CP/proof/result gates preserved. Full outer hash rebindings cannot bless foreign/missing E3 broker literal.

## TDD and verification

- `node --test scripts/dev/calcify-financial/rate-supervision.test.mjs`: RED exit1,7tests/1failure, foreign fourth brokerArgument previously ignored; Missing expected exception. Raw cycle2-endpoint-red.log.
- `node --test --test-name-pattern='Kafka' scripts/dev/calcify-financial/proof-supervisor.test.mjs`: RED exit1,2tests/2failures, declared/raw actual endpoint mutations previously accepted. Raw cycle2-rawports-red.log.
- `node --test --test-name-pattern='executable bootstrap' scripts/dev/calcify-financial/bootstrap-calibration.test.mjs`: RED exit1,1test/1failure, foreign E3 plan broker with recomputed outer manifest/marker hashes previously accepted. Raw cycle2-e3-endpoint-red.log.
- First combined run exit1,123/124 passed. New actual factory fixture lacked output directory and failed ENOENT `/tmp/unique-proof`; preserved cycle2-node-green.log. Corrected test owns mkdtemp output with finally cleanup.
- Final `node --test scripts/dev/calcify-financial/proof-supervisor.test.mjs scripts/dev/calcify-financial/rate-supervision.test.mjs scripts/dev/calcify-financial/bootstrap-calibration.test.mjs scripts/dev/calcify-financial/rate-proof.test.mjs scripts/dev/calcify-financial/physical-evidence.test.mjs scripts/dev/calcify-financial/physical-adapter.test.mjs`: exit0,125/125 pass,9258.174667ms. Raw cycle2-node-green-corrected.log. Actual dependency factory mock first accepts exact raw binding, then rejects changed actual HostPort before allocation. All3 actual financial modes reject frozen foreign args before dependency preparation. Strict loopback/port/key/duplicate/missing/source/order/scope/legacy controls included.

Final six source hashes: cycle2-node-source-final.sha256. Before four previously frozen source/test hashes retained in cycle1-node-source-final.sha256; parent cycle2 immutable24 snapshot binds proof-supervisor pair before endpoint correction. No independentReady or managed RF3 recovery claim from these controls. No actual topics/load by worker; parent must refreeze candidate/build/config/review after source updates.
