# Preliminary independent review
Review instance: 2 of 3.

Blind implementation/spec/test inspection completed before author.md and instance-1 artifacts.
Scope verified HEAD5843ad5b02c21fd94db5598f05a503a785d8e251 versus base97924e15642826a687db935a219d7927ae649ac8; branch codex/calcify-sprint1-experiments; tracked clean, .planning/ untracked only. All 22 changed paths inspected (source, tests, recovery manifest, guidance/config and retained draft included).

Kernel provides exact checked BigInteger economics, independent oracle, delta reconstruction and staged delivery state. Corrected numeric JSON normalization, malformed retry, funding opening debit and zero-price semantics appear coherent. Node models explicitly symbolic; credit closure backed by frozen finite source and bypass bounds, no live gate claim.

Preliminary concerns requiring reconciliation:
1. E3 harness external matrix declared but not dispatched: majority outage, stale owner takeover, committed output/ack and producer failures. Result-only reconstruction is isolated certification, not missing-changelog managed reactivation. Not full E3 acceptance.
2. E4 measurement emits explicit gaps and null encodedTechnicalBytes, so current executable cannot earn PASS_DIAGNOSTIC. Heap budget/guard absent; in-memory kernel+reference state grows with domain identities, so calibration/disk bounds do not certify aged memory fit. Draft retained, not applied.
3. Oracle normalization and integer validation are constrained to fixture shape; missing envelope identity and out-of-range attempt/funding values outside existing traces may diverge. Determine whether source readiness must include these or explicitly bound experiment input contract.
4. Kernel stage normalizes before recording; malformed numeric input during continuation throws rather than recording terminal disposition. No existing fixture covers rejected input staging. P1a malformed-after-checkpoint coverage remains limited to present frozen cases.
5. E3 normal restart restores from full store history, which costs linear memory/time; acceptable bounded correctness probe, not evidence for rate indexed-access claims.

No blocker established yet against narrow objective: regenerate authoritative proof and continue bounded synthetic experiments. E1/E2 require fresh executed evidence; production/full-sprint qualification excluded. Graph paths missing freshness and script subtree excluded; direct source fallback used.

Executed Node --test reservation/gate/rate suites and fixture --check; raw outputs retained here. Kotlin focused regressions next.
