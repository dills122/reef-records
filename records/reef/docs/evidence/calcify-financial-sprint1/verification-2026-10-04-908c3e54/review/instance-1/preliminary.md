# Preliminary independent review

Review instance: 1 of 3. Blind source/spec/test pass complete before reading author.md.

Frozen head35a20cc933d42fd6ec751d63011aa3d40b72ff0a/base97924e15642826a687db935a219d7927ae649ac8 verified; tracked tree clean, .planning untracked. Actual21 changed paths match bootstrap. Inspected all changed implementation/tests/configuration/documents plus RFC6/8/10.1, instructions, language/repository steering, delivery/retention policy and immutable fixtures.

Codebase Memory list_projects/check_index_coverage/search_graph used. Available project points at deleted old /tmp checkout, October3 generation, excludes scripts and finds no Financial symbols; all in-scope source read directly. No structural completeness claim from graph.

Concerns before author rationale:

1. FinancialOracle CAPTURE line87 uses positive price; kernel line161 permits zero. Oracle FUND checks upper credited balance but misses signed64 lower opening-resource debit and individual amount bound. Invalid-normalization retry also bypasses oracle prior-result branch while kernel deduplicates. These make edge-case independent agreement incomplete; verify executable counterexamples before verdict.
2. Broker coverage restore verifies history references' checksums/source but does not explicitly bind each coverage headAfter to its referenced suffix or cumulative input semantics. Source gap in certified-cut proof needs careful review; current historical claims explicitly unqualified.
3. E3 runner leaves production-error/broker-outage/takeover/controller-ack matrix absent; E4 lacks retained heap gate and emits LIMITED gaps deliberately. Ordinary remaining experiment work, no replacement architecture implied.
4. Broker runner defaults proof path to /private/tmp despite recovered-proof loss; recovery handoff explicitly requires persistent override. Correct before authoritative reruns.

Checks: Node38/38 pass, fixture --check passes52 inputs/20 cases unchanged hash fee7eead368d2ef2927aad1e53877907a4d74f9762b696d20f7e5575b1361e6d. No live broker actions, Gradle build, source changes, or other review instance.

Preliminary stance: isolated experiment code largely coherent; edge-case oracle contract likely needs focused fix before trusted broad proof. Final stance pending author reconciliation and bounded executable checks.
