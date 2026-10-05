import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.node.*;
import com.reef.platform.calcify.financial.*;
import java.nio.file.*;
class BoundaryCheck {
 public static void main(String[] args) throws Exception {
  var json=new ObjectMapper(); var f=json.readTree(Files.readString(Path.of("../../docs/evidence/calcify-financial-sprint1/fixtures.json")));
  for(String label:new String[]{"attempt-overflow","due-overflow","fund-overflow","missing-action-id","clock-overflow","invalid-with-missing-policy","staged-malformed"}){
   var k=new FinancialKernel(f.get("cases").get(0).get("genesisBalances"),f.get("policy"),true);
   var o=new FinancialOracle(f.get("cases").get(0).get("genesisBalances"),f.get("policy"));
   var capture=f.get("cases").get(0).get("steps").get(0).get("input").deepCopy();
   JsonNode input=capture;
   if(label.equals("attempt-overflow")){k.execute(capture,true);o.execute(capture); input=f.get("cases").get(0).get("steps").get(1).get("input").deepCopy(); ((ObjectNode)input.get("payload")).put("attempt","9223372036854775808");}
   if(label.equals("due-overflow"))((ObjectNode)input.get("payload")).put("dueTick","9223372036854775808");
   if(label.equals("fund-overflow"))input=json.readTree("{\"namespace\":\"sprint1\",\"domain\":\"domain-1\",\"actionId\":\"fund\",\"kind\":\"FUND\",\"payload\":{\"account\":\"buyer\",\"asset\":\"USD_NANO\",\"amount\":\"9223372036854775808\",\"authority\":\"opening-resource-owner\"}}");
   if(label.equals("clock-overflow"))input=json.readTree("{\"namespace\":\"sprint1\",\"domain\":\"domain-1\",\"actionId\":\"clock-overflow\",\"kind\":\"CLOCK\",\"payload\":{\"tick\":\"9223372036854775808\"}}");
   if(label.equals("invalid-with-missing-policy")){((ObjectNode)input).put("requestedPolicy","missing-policy");((ObjectNode)input.get("payload")).put("quantity","NaN");}
   if(label.equals("missing-action-id"))((ObjectNode)input).put("actionId","");
   if(label.equals("staged-malformed")){k.execute(capture,true);o.execute(capture); var clock=json.readTree("{\"namespace\":\"sprint1\",\"domain\":\"domain-1\",\"actionId\":\"clock\",\"kind\":\"CLOCK\",\"payload\":{\"tick\":\"1\"}}");k.execute(clock,true);o.execute(clock); input=capture.deepCopy();((ObjectNode)input).put("actionId","bad-capture");((ObjectNode)input.get("payload")).put("quantity","NaN");}
   if(label.equals("staged-malformed")){System.out.println(label+" oracle="+o.execute(input).get("disposition"));}
   try{var a=k.execute(input,true);var e=o.execute(input);System.out.println(label+" kernel="+a.get("disposition")+" oracle="+e.get("disposition"));try{o.assertMatches(k.businessView(),label);System.out.println("parity=true");}catch(AssertionError ex){System.out.println("parity=false "+ex.getMessage());}}catch(Exception ex){System.out.println(label+" throws="+ex);}
  }
 }
}
