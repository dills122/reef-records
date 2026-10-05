# M1 E3 external faults — neutral review bootstrap

Baseline a6ddafbbae750693e227985f054be2d26716ae84. Branch codex/calcify-planning-readiness. Read AGENTS.md and docs/AI_CONTEXT.md; Kotlin steering; RFC sections6.3/8.1/10.1. Fresh independent review requested by parent; historical cap7 remains distinct. Parent owns review-cycle budget and live resources.

Scope exactly five files in source-sha256.txt. Other parallel work includes managed partition-cut helper and proof supervisor; prior6 doc changes predate this slice. Review current source and tests independently before reading author-explanation.md. Default topology interface must remain usable by FinancialRateProbe. No financial kernel/oracle edit or public behavior change intended.

Review questions:
- Does run-external actually execute all four fault arms with deterministic barriers and observed faults?
- Does production fault reach actual producer rejection after prior forwards, leave no visible transaction outputs, then restart from committed source membership?
- Is committed-before-controller-ACK boundary real and recoverable through query before fresh work?
- Can stopped stale process resume after takeover, and does evidence prove actual broker producer/group rejection rather than elapsed-time inference?
- Do daemon controls target only exact three registered full IDs with project/service/reef.test labels and healthchecks, restore target in finally, preserve unrelated resources?
- Are economic output prefix, oracle state, committed group checkpoint and exact end offsets consistent? Aborted physical frames may advance broker end during fencing; idle restart may not.
- Are subprocess failure, early exit, barrier timeout and ownership changes fail-closed?

Evidence: raw Node RED/GREEN receipts in this folder, source-sha256.txt; parent owns Kotlin RED receipt and author GREEN links. Unit/Node success is not broker EOS proof. Parent must execute supervised pinned RF3 arms before E3 completion claim.
