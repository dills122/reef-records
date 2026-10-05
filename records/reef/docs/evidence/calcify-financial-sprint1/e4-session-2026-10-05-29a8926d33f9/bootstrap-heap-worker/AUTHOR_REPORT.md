# Diagnostic heap profile owner explanation

Scope: FinancialHeapGuard.kt and FinancialHeapGuardTest.kt only. Root integrates actual request/source/build/classpath/client/parser validation and live bootstrap after component review.

Existing public constructor delegates private Conservative(bounds,estimate) profile. Existing baseline-bound, estimated-limit, max-stability, sticky breach/error/freshness and lifecycle/publication behavior retained. New internal diagnosticBootstrap factory requires timed1000/pending100/aged0; private DiagnosticBootstrap profile instantiates no FinancialHeapBounds. Same actual/capability authorized maximum and strict80% sampled limit; optional preload ceiling is operational stop, strictly below effective limit and rejects equality. Diagnostic telemetry schemafinancial-bootstrap-heap-observation-v1, purposeEMPIRICAL_BOUNDED_DIAGNOSTIC, heapConservativeBoundfalse and estimatedHeapBytesnull. Factory itself validates counts/cap/ceiling; root-owned caller validates frozen request, raw identity and finite buffers.

Dedicated sensor continues before setup through closure, replay and staged writes; final healthy check precedes atomic publication. Sampling remains no OOM guarantee; sudden allocation/native/RSS outside heap promise. Ordinary observations remain unchanged.

Validation: missing-factory semantic compile RED retained in red.log; green.log and freshJUnit XML confirm25 tests,0failures/errors/skips (19existing+6diagnostic). Initial normal-cache sandbox denial retained before authorized cache retry. No actual broker/runtime bootstrap executed by worker. Source hashes and command in receipt.json. No economic/source-contract or production behavior changes.
