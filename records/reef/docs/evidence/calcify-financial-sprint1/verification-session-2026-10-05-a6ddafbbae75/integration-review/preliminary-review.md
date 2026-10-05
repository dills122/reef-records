# Preliminary independent review

Review instance: M1 Attempt1 cycle2 of3; M2 Attempt1 cycle1 of3. Joint fresh pass.

Scope: nine frozen SHA-256 files all match bootstrap. Branch/head/base confirmed. Six documentation edits and proof-supervisor excluded as specified. Source remains unedited. Blind source/test/RFC/WORK_PLAN pass completed before author explanation. Bootstrap included verification and high-level implementation claims; those were treated as leads, not author rationale.

Ledger:
- Mandatory FinancialProcessor.init routes restored c/h/s and cert/0 through FinancialPartitionCut.validateActivation. Helper reconstructs exact accepted ordinal prefix, separate physical source offsets, source UUID, authority digest, owner chains, configured genesis, and persistent semantic-state equality. Offline tests target mixed A10/B27, missing A+5, malformed cuts, authority/source mismatch, staged/phase/dedup state loss. No confirmed correctness defect found in first pass.
- FinancialCommittedCut.build derives isolated certificate/state from committed observer outputs and reuses startup verifier. Exact quartet runner seeds four real funding inputs, refuses mixed request/missing history, restores fresh local state with original app/result topics, and checks physical prefix/end/group checkpoint before funding suffix16/28. Live execution remains unverified.
- Four external arms invoke concrete producer/process/broker adapters and observed barriers. Ownership checks bound broker outage to registered full IDs/labels; finally attempts restore target after post-stop failure. Actual fencing/producer exceptions must remain live gates.
- ready() checks signalCode before trusting old receipt rows; focused VM test executes actual readiness helper. No confirmed residual signal-dead acceptance defect.
- Graph scope coverage stale/untracked/excluded; direct source reads used for all nine files. No exhaustive graph claim.

Residual checks before verdict: execute proportionate Node suite; inspect retained Kotlin XML; verify author claims; inspect prior M1 finding only after blind ledger. Actual RF3 timings, takeover/fencing, producer failure, UUID/topic profile, and cleanup owned by root live-proof gate. No code fix or heavy pivot indicated at preliminary stage.
