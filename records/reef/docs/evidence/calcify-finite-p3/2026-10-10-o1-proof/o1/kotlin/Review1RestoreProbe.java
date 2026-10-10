import com.reef.platform.calcify.*;
import reef.contracts.calcify.v1.*;
import java.nio.file.*;
import java.util.*;
class RestoreProbe {
 static FiniteLifecycleBinding binding;
 static FiniteLifecycleStateV1 original;
 static FiniteLifecycleStateV1 replace(int i, FiniteLifecycleCaptureV1 raw) {
   var changed=raw.toBuilder().setContentDigest(FiniteLifecycleContract.INSTANCE.digest(raw)).build();
   var b=original.toBuilder().setCompletedRecords(i,changed);
   for(int n=0;n<b.getBatchesCount();n++) if(b.getBatches(n).getBatchId().equals(changed.getSource().getBatchId()))
     b.setBatches(n,b.getBatches(n).toBuilder().setFirstCapture(changed));
   long size=0; for(var r:b.getCompletedRecordsList()) size+=r.getSerializedSize();
   return b.setCaptureBytes(size).build();
 }
 static void probe(String name,int index,FiniteLifecycleCaptureV1 raw) {
   var state=replace(index,raw);
   try { FiniteLifecycleCaptureRuntime.INSTANCE.initializeModel(binding,new FiniteLifecycleStartCut.Restore(state,0,12),null);
     System.out.println("ACCEPTED_INVALID "+name);
   } catch(IllegalArgumentException ex) {System.out.println("REFUSED "+name+" "+ex.getMessage());}
 }
 public static void main(String[] args) throws Exception {
   Class<?> fixtures=Class.forName("com.reef.platform.calcify.FiniteLifecycleFixtures"); Object fixture=fixtures.getField("INSTANCE").get(null);
   binding=(FiniteLifecycleBinding)fixtures.getMethod("binding$default",fixtures,FiniteLifecycleBudget.class,int.class,Object.class).invoke(null,fixture,null,1,null);
   original=(FiniteLifecycleStateV1)fixtures.getMethod("sequence$default",fixtures,List.class,int.class,Object.class).invoke(null,fixture,null,1,null);
   var record=original.getCompletedRecords(2); var member=record.getMembers(1); var trade=member.getTrade();
   probe("trade-price-outside-profile",2,record.toBuilder().setMembers(1,member.toBuilder().setTrade(trade.toBuilder().setFact(trade.getFact().toBuilder().setPrice(trade.getFact().getPrice().toBuilder().setNanos("999999999999"))))).build());
   probe("trade-foreign-run",2,record.toBuilder().setMembers(1,member.toBuilder().setTrade(trade.toBuilder().setRunId("foreign-run"))).build());
   probe("trade-foreign-source",2,record.toBuilder().setMembers(1,member.toBuilder().setTrade(trade.toBuilder().setSource(trade.getSource().toBuilder().setSourceOffset(999)))).build());
   probe("duplicate-blank-execution-facts",2,record.toBuilder().setMembers(1,member.toBuilder().clearExecutions().addExecutions(reef.contracts.orderexecution.v1.ExecutionCreated.getDefaultInstance()).addExecutions(reef.contracts.orderexecution.v1.ExecutionCreated.getDefaultInstance())).build());
   var cancel=original.getCompletedRecords(4); var command=cancel.getMembers(0);
   probe("cancel-wrong-engine-and-order",4,cancel.toBuilder().setMembers(0,command.toBuilder().setAccepted(command.getAccepted().toBuilder().setOrderId("wrong-order").setEngineOrderId("wrong-engine").setOccurredAt("wrong-time"))).build());
   var first=Files.readAllLines(Path.of("../../contracts/calcify/finite-lifecycle-source-v1.jsonl")).get(0);
   try {FiniteLifecycleContract.INSTANCE.parse((first+" {} ").getBytes(java.nio.charset.StandardCharsets.UTF_8),binding,0);System.out.println("ACCEPTED_TRAILING_JSON"); var reduction=FiniteLifecycleReducer.INSTANCE.reduce(FiniteLifecycleContract.INSTANCE.genesis(binding),(first+" {} ").getBytes(java.nio.charset.StandardCharsets.UTF_8),0,1,binding); System.out.println("TRAILING_JSON_CAPTURE prefixClosed="+reduction.getEnvelope().getPrefixClosed()+" outcomeCount="+reduction.getEnvelope().getOutcomeCount()+" resume="+reduction.getState().getResumeOffset());}
   catch(Exception ex) {System.out.println("REFUSED_TRAILING_JSON "+ex.getMessage());}
 }
}
