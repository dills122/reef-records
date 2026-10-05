import com.fasterxml.jackson.databind.*;
import com.reef.platform.calcify.financial.*;
import java.nio.file.*;
ObjectMapper mapper = new ObjectMapper();
JsonNode actual = FinancialRateProbe.INSTANCE.heapCapability$platform_runtime_test("29a8926d33f9e2dc7278a1676a6fa3272628de3c", Path.of("/Users/dsteele/.codex/worktrees/8c6f/reef/.planning/calcify-e4-session-2026-10-05/bootstrap-attempt2/frozen/fixtures.json"), Path.of("/Users/dsteele/.codex/worktrees/8c6f/reef/.planning/calcify-e4-session-2026-10-05/bootstrap-attempt2/frozen/config.json"));
JsonNode frozen = mapper.readTree(mapper.writeValueAsBytes(actual));
System.out.println("ACTUAL_NODE="+actual.get("maxHeapBytes").getClass().getSimpleName());
System.out.println("FROZEN_NODE="+frozen.get("maxHeapBytes").getClass().getSimpleName());
FinancialRateProbe.INSTANCE.validateBootstrapCapability$platform_runtime_test(frozen, actual);
System.out.println("ACTUAL_CAPABILITY_ROUNDTRIP_PASS");
/exit
