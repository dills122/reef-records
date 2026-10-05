# Review commands

Review instance: 3 of 3. All paths relative to frozen worktree unless specified.

```sh
git rev-parse HEAD
git status --short
git log --oneline 97924e15642826a687db935a219d7927ae649ac8..HEAD
git diff --name-only 97924e15642826a687db935a219d7927ae649ac8..HEAD
git diff --check 97924e15642826a687db935a219d7927ae649ac8..HEAD
node --test scripts/dev/calcify-financial/reservation-model.test.mjs scripts/dev/calcify-financial/gate-model.test.mjs scripts/dev/calcify-financial/rate-proof.test.mjs
node scripts/dev/calcify-financial/freeze-fixtures.mjs --check
node .planning/sprint1-review/instance-3/rate-cut-consistency.mjs
cd services/platform-runtime
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home ./gradlew test --tests 'com.reef.platform.calcify.financial.FinancialKernelTest' --tests 'com.reef.platform.calcify.financial.FinancialOracleTest' --rerun-tasks
/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home/bin/java -Xms128m -Xmx768m -cp 'build/classes/kotlin/test:build/classes/kotlin/main:build/classes/java/main:build/resolver-probe-deps/*' com.reef.platform.calcify.financial.FinancialRateProbe self-check ../../docs/evidence/calcify-financial-sprint1/fixtures.json
/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home/bin/java -cp 'build/classes/kotlin/test:build/classes/kotlin/main:build/classes/java/main:build/resolver-probe-deps/*' ../../.planning/sprint1-review/instance-3/BoundaryCheck.java
/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home/bin/java -cp 'build/classes/kotlin/test:build/classes/kotlin/main:build/classes/java/main:build/resolver-probe-deps/*' ../../.planning/sprint1-review/instance-3/ResolutionBoundary.java
```

Stdout/stderr retained in named report logs; Gradle run authorized outside sandbox for cache, Java21. Historical source hash verification uses `git show 06911bcf:<path>` versus recovery manifest, keeping historical and current values separate.
