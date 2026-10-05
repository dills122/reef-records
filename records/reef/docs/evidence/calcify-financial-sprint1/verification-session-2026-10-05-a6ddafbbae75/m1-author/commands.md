# Commands and receipts

Initial Node RED: `node --test scripts/dev/calcify-financial/broker-proof.test.mjs` → module missing,1failed (`node-red.log`).
Incremental RED: same command → restoration9pass/1fail (`node-restore-red.log`); checkpoint10pass/1fail (`node-checkpoint-red.log`); absent-health10pass/1fail (`node-health-red.log`).
Final Node GREEN: `node --test scripts/dev/calcify-financial/broker-proof.test.mjs scripts/dev/calcify-financial/gate-model.test.mjs scripts/dev/calcify-financial/rate-proof.test.mjs scripts/dev/calcify-financial/record-attempt.test.mjs scripts/dev/calcify-financial/reservation-model.test.mjs` →65pass0fail (`node-focused-final3.log`).
Syntax: `node --check scripts/dev/calcify-financial/broker-proof.mjs` → exit0.
Kotlin RED: parent recorder `session8c6f-m1-red`; unresolved outputBytes/BUILDFAILED. Parent-held raw links resolved in integrated review packet.
Live broker: none by worker. Parent supplies frozen exact registered preflight and supervisor, then runs `node scripts/dev/calcify-financial/broker-proof.mjs run-external` under Java21/classes matching plan hashes.

Kotlin GREEN: `JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home node scripts/dev/calcify-financial/record-attempt.mjs session8c6f-m1-green-escalated services/platform-runtime ./gradlew --offline test --tests com.reef.platform.calcify.financial.FinancialBrokerProbeTest --console=plain` → BUILD SUCCESSFUL12s,2tests0failure/error/skip. Raw logs copied into this folder plus original recorder evidence. Original same command un-escalated (`session8c6f-m1-green`) failed sandbox global Gradle ZIP lock write; preserved before elevated retry. Slot synchronized with parent/M2; compile-source-sha256.txt captures all Financial*.kt inputs.
