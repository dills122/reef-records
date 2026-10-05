# Author Explanation

## Intent And Success Criteria

Test-only sprint1 financial kernel/oracle, reservation proposal, finite gates and
real broker/rate adapters. User requested source review before fresh full proof.
Pure models should preserve financial semantics and replay; adapters should enforce
EOS/source coverage and independent observation. Review is source gate, not author
claim that all E3/E4 requirements already pass.

## Plan-To-Implementation Traceability

E0 fixtures exist. E1a kernel/oracle and11+4 JUnit tests implemented; original test
logs lost, so historical15pass report is not retained raw proof. E1b proposal and
E2 finite model implemented. E3 adapter/runner implemented partially; full external
fault matrix and exact mixed-age activation unfinished. E4 real adapter/policy
implemented, heap guard only draft tests; live calibration/load unrun. SQL seam
deferred as optional. All unresolved gates remain in active handoff/work board.

## Technical Approach And Flow

Kernel controls decide/validate/bounded-encode/evolve and emits checksummed deltas.
Separate BigInteger oracle compares complete business prefixes, with independent
full owner reconstruction and staging/history cuts. Broker factory writes known-key
semantic state, history, per-source coverage and partition certificate inside EOS;
observer drives independent expected outcomes from accepted source inputs. Physical
offset gaps allowed only through frozen ordinal/ACK manifest/topicUUID membership.
Rate adapter uses same topology and bounded ACK registry, exact-source streaming
gross-DvP reference and same-JVM offer-to-read-committed clocks.

## Changed-Component Walkthrough

FinancialKernel.kt: indexed balances/identities/due work, bounded records, history,
checkpoint/replay, lean retained-latest-only API. KernelTest: frozen/seeded/replay/
wire/staging/corruption controls. FinancialOracle.kt/Test: independent accounting,
full semantic parity, generated traces and missing-output mutants.
FinancialBrokerProbe.kt + broker-proof.mjs: isolated RF3/EOS transport/persistence,
source coverage, lifecycle/fault runner and read-committed observer.
FinancialRateProbe.kt + rate-proof.mjs/test: real producer/observer calibration and
rate telemetry, provenance/resource/measurement checks; imperfect paths noted below.
reservation-model: own holds/transfers/withdrawal/cancel policy proposal. gate-model:
prefix/credit finite closure/access/resource/fencing exploration. Makefile/CI wires
model tests. Script-surface checker explicitly invokes Node syntax mode because Bun
--check executes bodies; fixture CLI scope text avoids claiming financial proof.
Recovery manifest/handoff distinguish exact restored source from deleted raw proof.

## Decisions And Rejected Alternatives

Reuse pinned Kotlin/JVM, Jackson and Streams4.3.1 dependencies. Kernel numeric JSON
parity compares exact canonical values rather than node classes after serialization.
Source logical ordinal plus actual UUID/ACK locators avoids assuming offsets+1.
Avoid separate E4 persistence path; same factory keeps E3 relevance. Full snapshots
restricted to test/cold recovery; lean hot execution avoids full projections.
Reservation live policy deliberately separate; finite gate result supports prefix
preference without claiming universal liveness or deployed source access.

## Invariants And Boundary Conditions

Atomic two-asset economics, checked units, retries original context/dedup, deterministic
clock/phase-before-funding, bounded deltas/staging, complete replay, missing history
fail closed, EOS output/state/source acceptance, independent observer, truthful
counts/clock scope, stable config/source/fixtures, exclusive capacity arms.
No primary dirty checkout reset; persistent worktree and pushed Git checkpoints.

## Verification Performed And Results

Fresh recovery:17 source/config hashes match reconstructed files;38 Node tests pass;
Java21 compileTestKotlin/resolverProbeDependencies pass42s. Logs persistent in
.planning/sprint1-recovery/verification. No recovered full JUnit rerun yet.
Historical15 JUnit2m30s reported before temporary files disappeared; original XML,
raw attempts and broker hardware proof lost. Recovered source writes available, not
substitute raw experiment evidence. No E3 arm/rate self-check/calibration/load run.

## Risks, Tradeoffs, And Maintenance Costs

Dense test-only JsonNode code and canonical serialization costs; retained identity
state grows, framework state history writes grow. Cold replay scans retained history.
Finite model byte bounds symbolic. Fixed two-account/two-asset financial scope; RAM
ACK registry managed restart gap. Existing private/tmp proof defaults unsafe for
retention unless overridden, now known defect to fix before execution.

## Deviations, Deferrals, And Known Gaps

Source-coverage head versus referenced history validation needs scrutiny; runner
full real external fault matrix unfinished; current isolated reconstruction is
result-only sequence control rather than complete A10/B27 owner activation. E4 heap
guard unimplemented, technical encoded-store bytes missing; complete managed rate
restart lacking durable ACK reconstruction. Actual RF3/topic settings must be proved.
Reservation policy owner acceptance and matcher identity-source integration open.
Review should identify minimal fixes and code-versus-evidence gates; no forced
ready verdict or pretend full sprint passed.

## Challenge Points For The Reviewer

Economic error paths/limits; independently sensitive full oracle; wire/replay/history
coverage/staging; certificate binding; observer cannot certify omitted/late duplicate
outputs; same-factory aborted cache behavior; E4 source/provenance and resource
checks cannot fabricate permission/pass; raw storage default and file/stream lifecycle;
CI coverage/wiring and experiment commands actually runnable. Review all scope, not
only this list.

## Corrections After Instance1

All four findings accepted. Oracle matching fallback digest now preserves identical
rejected-input retries independently of successful normalization. FUND checks both
credit and opening debit signed64 boundaries before effects. Nonnegative price rule
is explicit for synthetic kernel/oracle, including zero-price transfers. Focused
regressions cover malformed retry/original context, cash/share opening boundaries,
and zero/negative/positive price. Broker proof default now persistent repository
`.planning/calcify-financial-proof/broker/<run>`, retaining exclusive filenames.

No production or architecture change. Original recovered hashes remain historical.
Fresh corrected-source qualification deliberately waits for independent sign-off.
Instance1 ordinary suites passed Node38/JUnit15 but edge counterexamples failed;
complete report/response/raw logs available in sibling instance-1 only after blind
preliminary. Docker daemon unavailable; E3/E4 live runs remain blocked.

## Corrections After Instance2

Three new findings accepted, no pivot. Oracle independently checks consumed numeric
sign/range/disposition before effects; envelope required textual identities before
missing policy after prior/conflict. Raw JsonNode key framing separates invalid typed
identities from valid textual counterparts without changing valid fixture keys.
Kernel stages malformed bounded input with canonical fallback digest; independent
observer supports same fallback, raw type-preserving normalization and action keys.
Pending drain readers safely skip malformed rows until valid continuation drains
phase, then record terminal rejection. Missing actionId retry uses safe projection.

Author additionally reproduced4 execution-resolution divergences and fixed them
independently: textual execution/work/clockAction IDs required; full optional scope
tuple matches exactly, otherwise unique unscoped ID (existing kernel rule).

New regressions exercise16 numeric boundary cases,14 identity/error cases, typed
identity isolation both orders,5 malformed staged envelopes across wire history/
checkpoint replay, full owner/business/dedup/context/phase parity, independent
observer malformed trace with omission/source sensitivity,13 resolution scenarios.
Total financial tests now26; full suite rerun deliberately pending source sign-off.

Author focused checks8/8 pass;11 executable boundary scenarios all parity=true.
First author compile attempt failed due ObjectNode.deepCopy type argument; fixed
and original failed/corrected attempts retained in ../author-checks. These are
pre-review checks, not authoritative post-signoff qualification. Original recovery
hashes stay historical; source checkpoints committed/pushed.

No full E3/E4 qualification. Docker Desktop app installed but daemon stopped;
parent will verify actual isolated broker prerequisites after source sign-off.
Maintained focused README inventory refresh and immutable Records publication
remain required completion work after proof, not hidden production readiness.
