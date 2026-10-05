# Receipt scope correction

Initial runner captured `sourceSha256` after subprocess completed. Those hashes are post-run source snapshots; no before/during immutability claim. Subsequent receipts add `sourceBeforeSha256` and equality, still no claim against edits restored within command interval.

`first-node-xml/TEST-com.reef.platform.calcify.financial.FinancialHeapGuardTest.xml` copied stale Kotlin RED XML during Node-only run. Preserved original. It is snapshot-only, not an executed Kotlin result and not Kotlin GREEN. Node first-node log alone proves 26/26 intermediate Node controls. Final runner copies FinancialHeapGuardTest XML only for a newly executed Gradle test task, excluding UP-TO-DATE.

First Kotlin correction: `first-kotlin` compiles implementation but original reflection test expected unmangled JVM name for internal Kotlin method. Failure retained; no runtime source-defect claim. Direct behavior tests replace reflection-only test.
