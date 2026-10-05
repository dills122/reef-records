import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.node.*;
import com.reef.platform.calcify.financial.*;
import java.nio.file.*;
class ResolutionBoundary { public static void main(String[] args) throws Exception {
 var json=new ObjectMapper();var f=json.readTree(Files.readString(Path.of("../../docs/evidence/calcify-financial-sprint1/fixtures.json")));
 for(var variant:new String[]{"numeric-execution","partial-tuple","numeric-clock-action","numeric-work-id"}) {
  var c=f.get("cases").get(0);var kernel=new FinancialKernel(c.get("genesisBalances"),f.get("policy"),true);var oracle=new FinancialOracle(c.get("genesisBalances"),f.get("policy"));
  var capture=(ObjectNode)c.get("steps").get(0).get("input").deepCopy();((ObjectNode)capture.get("payload")).put("executionId","17");kernel.execute(capture,true);oracle.execute(capture);
  ObjectNode request;
  if(variant.startsWith("numeric-clock")||variant.startsWith("numeric-work")){
   var clock=(ObjectNode)json.readTree("{\"namespace\":\"sprint1\",\"domain\":\"domain-1\",\"actionId\":\"17\",\"kind\":\"CLOCK\",\"payload\":{\"tick\":\"1\"}}");kernel.execute(clock,true);oracle.execute(clock);
   request=(ObjectNode)json.readTree("{\"namespace\":\"sprint1\",\"domain\":\"domain-1\",\"actionId\":\"continue\",\"kind\":\"CONTINUE\",\"payload\":{\"workId\":\"17\",\"clockAction\":\"17\"}}");((ObjectNode)request.get("payload")).put(variant.equals("numeric-clock-action")?"clockAction":"workId",17);
  }else{request=(ObjectNode)c.get("steps").get(1).get("input").deepCopy();var payload=(ObjectNode)request.get("payload");payload.put("executionId","17");if(variant.equals("numeric-execution"))payload.put("executionId",17);else{payload.put("runId","other");payload.remove("venueSessionId");payload.remove("instrumentId");}}
  var actual=kernel.execute(request,true);var expected=oracle.execute(request);System.out.println(variant+" kernel="+actual.get("disposition")+" oracle="+expected.get("disposition"));try{oracle.assertMatches(kernel.businessView(),variant);System.out.println("parity=true");}catch(AssertionError error){System.out.println("parity=false");}
 }}}
