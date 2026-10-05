import com.fasterxml.jackson.databind.*;
import java.util.*;
var mapper = new ObjectMapper();
JsonNode actual = mapper.valueToTree(Map.of("maxHeapBytes",805306368L));
JsonNode frozen = mapper.readTree(mapper.writeValueAsBytes(actual));
System.out.println("ACTUAL_TYPE="+actual.get("maxHeapBytes").getClass().getSimpleName());
System.out.println("FROZEN_TYPE="+frozen.get("maxHeapBytes").getClass().getSimpleName());
System.out.println("NODE_EQUAL="+actual.get("maxHeapBytes").equals(frozen.get("maxHeapBytes")));
System.out.println("STRICT_INTEGRAL_VALUE_EQUAL="+(actual.get("maxHeapBytes").isIntegralNumber() && frozen.get("maxHeapBytes").isIntegralNumber() && actual.get("maxHeapBytes").canConvertToLong() && frozen.get("maxHeapBytes").canConvertToLong() && actual.get("maxHeapBytes").longValue()==frozen.get("maxHeapBytes").longValue()));
/exit
