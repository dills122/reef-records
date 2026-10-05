# M3H emitted-peak acceptance amendment

Added after Attempt1 cycle1 P2 finding; original requirements unchanged.

Artifact heapObservation.reportedPeakScope and measurement resources.heapPeakScope must state sampled peak captured through result assembly snapshot, excluding final serialization/staged writes. Calibration and measurement both follow same scope. Actual caller captures/reuses one artifact snapshot; generic guard.telemetry() continues to report its sampled lifetime without incorrectly imposing an assembly cutoff.

Regression: valid JSON captures50, healthy final publication sample rises700 below800 limit; exported50 has explicit cutoff for both artifact modes, guard lifetime telemetry700. Protection remains active through final staging; any breach still suppresses success. This correction adds no capacity/native/continuous/OOM promise and does not change guard admission/lifecycle behavior.
