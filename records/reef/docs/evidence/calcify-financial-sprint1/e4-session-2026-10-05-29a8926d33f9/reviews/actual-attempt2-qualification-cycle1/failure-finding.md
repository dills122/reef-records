# Actual diagnostic failure finding

Review instance: 1 of 3. Same actual qualification cycle; actual execution candidate Attempt2.

P2 — Compare managed activation history count as strict integral value.

`FinancialRateProbe.kt:587-588` compares `summary["historyRecords"] == request["historyRecords"]` as `JsonNode`. Summary uses `node(...)` / default `ObjectMapper.valueToTree` at line43 over `owner.historySequence(): Long` (`FinancialKernel.kt:277`). Request serialized by parent at line838 then parsed by child at line568; retained actual request contains integer2101. Within Int range, default parsed representation differs from Long summary. Existing pinned Jackson2.22.3 bytecode independently inspected with read-only `javap`: `IntNode.equals` requires `instanceof IntNode`; `LongNode.equals` requires `instanceof LongNode`. Therefore semantically equal2101 can fail this parity predicate.

Actual child `proof/managed-recovery/stderr.log` raises `BOOTSTRAP_MANAGED_ACTIVATION_PARITY` at line587 during processor init. Parent `proof/supervision/wrapper.stderr.log` raises `BOOTSTRAP_MANAGED_PROCESS_FAILED` at line853. Five physical checkpoints retained; `managed-recovery/result.json`, final `bootstrap.json`, after-managed-restart and after-result-only-restore checkpoints absent. New-JVM activation summary is set only after combined predicate, so raw failure does not establish owner digest/history checksum/ordinal/source-offset parity. Width-sensitive equality is sufficient defect even if other clauses would also refuse; no claim made that correcting it guarantees full recovery.

Smallest correction: require integral numeric node convertible without loss, compare history count by exact integral value; preserve refusal for fractional, string, null, missing or out-of-range input. Add focused regression passing serialized2101 against Long-produced2101 and rejecting invalid forms. Repeat full fresh finite cohort/new-JVM activation and remaining checkpoints on newly frozen candidate; prior failed run retained independently. No patch implemented by reviewer.

Verdict direction: Not ready for actual bounded diagnostic qualification. Prior actual49/lossless-export prerequisite clearance remains valid for its pinned candidate.
