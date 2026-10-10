import com.reef.platform.calcify.*;
import reef.contracts.calcify.v1.*;
import reef.contracts.orderexecution.v1.*;
import org.apache.kafka.streams.*;
import org.apache.kafka.common.serialization.*;
import java.nio.file.*;
import java.util.*;
import java.security.*;
import com.google.protobuf.ByteString;

class OcrKotlinProbe {
  static void check(boolean ok, String label) { if (!ok) throw new AssertionError(label); }
  static String sha(byte[] b) throws Exception { return HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(b)); }
  static byte[] canonical(FiniteLifecycleBinding b, List<FiniteParty> parties) {
    return b.getBudget().canonical(b.getProfileHash(),b.getPolicy(),b.getRun(),b.getSession(),b.getInstrument(),b.getCurrency(),parties);
  }
  static void refused(String label, Runnable action) {
    try { action.run(); throw new AssertionError("unexpected acceptance: "+label); }
    catch (IllegalArgumentException ex) { System.out.println("REFUSED "+label+" reason="+ex.getMessage()); }
  }
  public static void main(String[] args) throws Exception {
    Class<?> f=Class.forName("com.reef.platform.calcify.FiniteLifecycleFixtures"); Object instance=f.getField("INSTANCE").get(null);
    var binding=(FiniteLifecycleBinding)f.getMethod("binding$default",f,FiniteLifecycleBudget.class,int.class,Object.class).invoke(null,instance,null,1,null);
    var checkpoint=(FiniteLifecycleStateV1)f.getMethod("sequence$default",f,List.class,int.class,Object.class).invoke(null,instance,null,1,null);
    var body=Files.readAllLines(Path.of("../../contracts/calcify/finite-lifecycle-source-v1.jsonl")).get(0).getBytes(java.nio.charset.StandardCharsets.UTF_8);
    byte[] base=canonical(binding,binding.getParties());
    var reversed=new ArrayList<>(binding.getParties()); Collections.reverse(reversed);
    byte[] reorder=canonical(binding,reversed);
    var swapped=binding.getParties().stream().map(p -> new FiniteParty(p.getParticipant(),p.getAccount(),p.getSide()==OrderSide.ORDER_SIDE_BUY?OrderSide.ORDER_SIDE_SELL:OrderSide.ORDER_SIDE_BUY)).toList();
    byte[] sideSwap=canonical(binding,swapped);
    check(Arrays.equals(base,reorder),"party reorder changes canonical bytes");
    check(!Arrays.equals(base,sideSwap),"side swap collapses canonical bytes");
    check(!sha(base).equals(sha(sideSwap)),"side swap collapses hash");
    check(HexFormat.of().formatHex(base).equals(Files.readString(Path.of("../../contracts/calcify/finite-lifecycle-budget-v1.hex")).trim()),"golden bytes mismatch");
    System.out.println("CANONICAL bytes="+base.length+" base="+sha(base)+" reordered="+sha(reorder)+" sideSwapped="+sha(sideSwap));
    var fault=checkpoint.toBuilder().setFault("probe fault").addRetainedSuffix(FiniteLifecycleSuffixV1.newBuilder().setOffset(12).setResumeOffset(13).setPayload(ByteString.copyFrom(body))).build();
    var restored=FiniteLifecycleCaptureRuntime.INSTANCE.initializeModel(binding,new FiniteLifecycleStartCut.Restore(fault,0,13),null);
    check(fault.equals(restored),"fault checkpoint changed");
    System.out.println("RESTORE coveredSuffix exact=true successfulResume="+restored.getResumeOffset()+" suffixResume="+restored.getRetainedSuffix(0).getResumeOffset());
    refused("partially-covered-suffix",()->FiniteLifecycleCaptureRuntime.INSTANCE.initializeModel(binding,new FiniteLifecycleStartCut.Restore(fault,0,12),null));
    var missingBarrier=fault.toBuilder().clearFault().build();
    refused("missing-fault-barrier",()->FiniteLifecycleCaptureRuntime.INSTANCE.initializeModel(binding,new FiniteLifecycleStartCut.Restore(missingBarrier,0,13),null));
    var invalidVersion=fault.toBuilder().clearStateVersion().build();
    refused("invalid-checkpoint-version",()->FiniteLifecycleCaptureRuntime.INSTANCE.initializeModel(binding,new FiniteLifecycleStartCut.Restore(invalidVersion,0,13),null));
    var blocked=new ArrayList<Boolean>();
    var props=FiniteLifecycleCaptureRuntime.INSTANCE.modelProperties(binding,"dummy:1234");
    props.put(StreamsConfig.STATE_DIR_CONFIG,Path.of(args[0],"driver-state").toAbsolutePath().toString());
    try(var driver=new TopologyTestDriver(FiniteLifecycleCaptureProcessor.Companion.modelTopology(binding,new FiniteLifecycleStartCut.Genesis(0,0,16),value -> { blocked.add(value); return kotlin.Unit.INSTANCE; }),props)) {
      var input=driver.createInputTopic(binding.getSourceTopic(),new ByteArraySerializer(),new ByteArraySerializer());
      var output=driver.createOutputTopic(binding.getCaptureTopic(),new ByteArrayDeserializer(),new ByteArrayDeserializer());
      var store=driver.<String,byte[]>getKeyValueStore(FiniteLifecycleCaptureProcessor.STORE);
      input.pipeInput((byte[])null,(byte[])null);
      var nullFault=FiniteLifecycleStateV1.parseFrom(store.get("state"));
      check(!nullFault.getFault().isEmpty(),"null missing fault"); check(nullFault.getRetainedSuffixCount()==1,"null not retained");
      check(nullFault.getRetainedSuffix(0).getOffset()==0&&nullFault.getRetainedSuffix(0).getResumeOffset()==1,"null offset changed");
      check(nullFault.getRetainedSuffix(0).getPayload().isEmpty(),"null payload marker unexpected");
      check(nullFault.getResumeOffset()==0&&nullFault.getCompletedRecordsCount()==0&&!nullFault.hasCompletedFrontier(),"null advanced successful prefix");
      check(output.isEmpty(),"null emitted capture"); check(blocked.get(blocked.size()-1),"null missing lane block");
      System.out.println("NULL_SOURCE fault="+nullFault.getFault()+" suffixCount=1 offset=0 suffixResume=1 payloadBytes=0 successfulResume=0 completed=0 output=0 blocked=true");
      input.pipeInput((byte[])null,body);
      var suffix=FiniteLifecycleStateV1.parseFrom(store.get("state"));
      check(suffix.getRetainedSuffixCount()==2&&suffix.getRetainedSuffix(1).getOffset()==1&&suffix.getRetainedSuffix(1).getPayload().equals(ByteString.copyFrom(body)),"later record lost");
      check(suffix.getResumeOffset()==0&&suffix.getCompletedRecordsCount()==0&&output.isEmpty(),"fault lane resumed");
      System.out.println("NULL_SOURCE subsequentValidRecord suffixCount=2 offset=1 exactPayload=true successfulResume=0 completed=0 output=0");
    }
    new FiniteLifecycleContractTest().finiteBudgetCanonicalBytesAndDigestPinned();
    new FiniteLifecycleCaptureRuntimeTest().restoreRefusesMissingMemberAndRetainsExactFaultBarrierAndSuffix();
    new FiniteLifecycleCaptureProcessorTest().managedTopologyEmitsSameEnvelopesAndRetainsFaultSuffix();
    System.out.println("EXISTING_FOCUSED_TESTS canonicalGolden+restoreFaultSuffix+managedFaultSuffix=PASS");
    System.out.println("ALL_PROBE_ASSERTIONS=PASS");
  }
}
