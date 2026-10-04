import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.node.*;
import com.reef.platform.calcify.financial.*;
import java.nio.file.*;
class checklog {
  public static void main(String[] args) throws Exception {
    var json = new ObjectMapper();
    var fixtures = json.readTree(Files.readString(Path.of("../../docs/evidence/calcify-financial-sprint1/fixtures.json")));
    for (String label : new String[]{"zero-price", "invalid-retry", "opening-overflow"}) {
      var opening = fixtures.get("cases").get(0).get("genesisBalances").deepCopy();
      if (label.equals("opening-overflow")) ((ObjectNode)opening).put("buyerCash", "9223372036854775807");
      var kernel = new FinancialKernel(opening, fixtures.get("policy"), true);
      var oracle = new FinancialOracle(opening, fixtures.get("policy"));
      var input = fixtures.get("cases").get(0).get("steps").get(0).get("input").deepCopy();
      if (label.equals("zero-price")) ((ObjectNode)input.get("payload")).put("priceNanos", "0");
      if (label.equals("invalid-retry")) ((ObjectNode)input.get("payload")).put("quantity", "NaN");
      if (label.equals("opening-overflow")) input = json.readTree("{\"namespace\":\"sprint1\",\"domain\":\"domain-1\",\"actionId\":\"fund\",\"kind\":\"FUND\",\"payload\":{\"account\":\"seller\",\"asset\":\"USD_NANO\",\"amount\":\"2\",\"authority\":\"opening-resource-owner\"}}");
      for(int attempt=0; attempt<(label.equals("invalid-retry")?2:1); attempt++) {
        var actual=kernel.execute(input,true); var expected=oracle.execute(input);
        System.out.println(label+" attempt="+attempt+" kernel="+actual.get("disposition")+" oracle="+expected.get("disposition"));
        try { oracle.assertMatches(kernel.businessView(), label); System.out.println("parity=true"); }
        catch(AssertionError ex) { System.out.println("parity=false"); }
      }
    }
  }
}
