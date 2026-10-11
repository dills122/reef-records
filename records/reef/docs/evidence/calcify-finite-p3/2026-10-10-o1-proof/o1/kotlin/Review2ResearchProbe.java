import com.reef.platform.calcify.*;
import reef.contracts.calcify.v1.*;
import reef.contracts.orderexecution.v1.*;
import java.nio.file.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
class Review2Probe {
 static FiniteLifecycleBinding binding;
 static FiniteLifecycleStateV1 original;
 static List<String> lines;
 static byte[] body(int index) { return lines.get(index).getBytes(StandardCharsets.UTF_8); }
 static FiniteLifecycleStateV1 replace(FiniteLifecycleStateV1 state,int index,FiniteLifecycleCaptureV1 raw) {
   var changed=raw.toBuilder().setContentDigest(FiniteLifecycleContract.INSTANCE.digest(raw)).build();
   var b=state.toBuilder().setCompletedRecords(index,changed);
   for(int n=0;n<b.getBatchesCount();n++) if(b.getBatches(n).getFirstCapture().getSource().getSourceOffset()==changed.getSource().getSourceOffset())
     b.setBatches(n,b.getBatches(n).toBuilder().setFirstCapture(changed));
   long size=0; for(var r:b.getCompletedRecordsList()) size+=r.getSerializedSize();
   return b.setCaptureBytes(size).build();
 }
 static void restore(String name,FiniteLifecycleStateV1 state,boolean expectRefused) {
   byte[] before=state.toByteArray();
   boolean refused=false;
   try { var restored=FiniteLifecycleCaptureRuntime.INSTANCE.initializeModel(binding,new FiniteLifecycleStartCut.Restore(state,0,20),null);
     System.out.println("ACCEPTED "+name+" equal="+state.equals(restored));
     if(expectRefused) { var next=FiniteLifecycleReducer.INSTANCE.reduce(restored,body(0),13,14,binding); System.out.println("CONTINUED_INVALID "+name+" prefixClosed="+next.getEnvelope().getPrefixClosed()); }
   } catch(IllegalArgumentException ex) { refused=true; System.out.println("REFUSED "+name+" "+ex.getMessage()); }
   if(!Arrays.equals(before,state.toByteArray())) throw new AssertionError("state mutated");
   if(refused != expectRefused) System.out.println("UNEXPECTED_RESULT "+name+" expectedRefused="+expectRefused);
 }
 public static void main(String[] args) throws Exception {
   Class<?> fixtures=Class.forName("com.reef.platform.calcify.FiniteLifecycleFixtures"); Object fixture=fixtures.getField("INSTANCE").get(null);
   binding=(FiniteLifecycleBinding)fixtures.getMethod("binding$default",fixtures,FiniteLifecycleBudget.class,int.class,Object.class).invoke(null,fixture,null,1,null);
   original=(FiniteLifecycleStateV1)fixtures.getMethod("sequence$default",fixtures,List.class,int.class,Object.class).invoke(null,fixture,null,1,null);
   lines=Files.readAllLines(Path.of("../../contracts/calcify/finite-lifecycle-source-v1.jsonl"));
   restore("valid-prefix",original,false);
   var replay=FiniteLifecycleReducer.INSTANCE.reduce(original,body(2),12,13,binding).getState();
   restore("valid-certified-replay",replay,false);
   var r=replay.getCompletedRecords(12); var m=r.getMembers(1); var id=m.getId();
   var changes=new LinkedHashMap<String,LifecycleMemberIdV1>();
   changes.put("replay-kind",id.toBuilder().setKind(LifecycleMemberKindV1.LIFECYCLE_MEMBER_COMMAND).build());
   changes.put("replay-within-ordinal",id.toBuilder().setWithinOutcomeTradeOrdinal(99).build());
   changes.put("replay-flat-ordinal",id.toBuilder().setFlattenedTradeOrdinal(99).build());
   changes.put("replay-outcome-ordinal",id.toBuilder().setSource(id.getSource().toBuilder().setOutcomeOrdinal(99)).build());
   changes.put("replay-command-id",id.toBuilder().setSource(id.getSource().toBuilder().setCommandId("wrong-command")).build());
   changes.put("replay-kind-unspecified",id.toBuilder().setKind(LifecycleMemberKindV1.LIFECYCLE_MEMBER_UNSPECIFIED).build());
   changes.put("replay-duplicate-command-member-id",r.getMembers(0).getId());
   for(var entry:changes.entrySet()) restore(entry.getKey(),replace(replay,12,r.toBuilder().setMembers(1,m.toBuilder().setId(entry.getValue())).build()),true);
   var t=original.getCompletedRecords(2); var tm=t.getMembers(1);
   restore("trade-foreign-run",replace(original,2,t.toBuilder().setMembers(1,tm.toBuilder().setTrade(tm.getTrade().toBuilder().setRunId("foreign"))).build()),true);
   restore("trade-foreign-source",replace(original,2,t.toBuilder().setMembers(1,tm.toBuilder().setTrade(tm.getTrade().toBuilder().setSource(tm.getTrade().getSource().toBuilder().setSourceOffset(999)))).build()),true);
   restore("trade-blank-executions",replace(original,2,t.toBuilder().setMembers(1,tm.toBuilder().clearExecutions().addExecutions(ExecutionCreated.getDefaultInstance()).addExecutions(ExecutionCreated.getDefaultInstance())).build()),true);
   var cancel=original.getCompletedRecords(4); var cm=cancel.getMembers(0);
   restore("cancel-wrong-order",replace(original,4,cancel.toBuilder().setMembers(0,cm.toBuilder().setAccepted(cm.getAccepted().toBuilder().setOrderId("wrong"))).build()),true);
   var trade=tm.getTrade(); var fact=trade.getFact().toBuilder().setPrice(trade.getFact().getPrice().toBuilder().setNanos("100000000001")).build();
   var high=tm.toBuilder().setTrade(trade.toBuilder().setFact(fact));
   for(int i=0;i<high.getExecutionsCount();i++) high.setExecutions(i,high.getExecutions(i).toBuilder().setExecutionPrice(fact.getPrice()));
   restore("trade-price-cap-with-consistent-pairs",replace(original,2,t.toBuilder().setMembers(1,high).build()),true);
   var good=FiniteLifecycleContract.INSTANCE.genesis(binding);
   for(String suffix:List.of(" {} "," [] "," true "," null "," 42 "," trailing-garbage"," \"text\" ")) {
     var raw=(lines.get(0)+suffix).getBytes(StandardCharsets.UTF_8);
     boolean parse=false,reduce=false;
     try {FiniteLifecycleContract.INSTANCE.parse(raw,binding,0);parse=true;}catch(IllegalArgumentException ex) {}
     try {FiniteLifecycleReducer.INSTANCE.reduce(good,raw,0,1,binding);reduce=true;}catch(IllegalArgumentException ex) {}
     System.out.println("FULL_VALUE suffix="+suffix.trim()+" parseAccepted="+parse+" reduceAccepted="+reduce);
     if(parse||reduce) throw new AssertionError("trailing value accepted");
   }
   var raw=(lines.get(0)+" \r\n\t ").getBytes(StandardCharsets.UTF_8);
   var valid=FiniteLifecycleReducer.INSTANCE.reduce(good,raw,0,1,binding);
   if(!valid.getEnvelope().getPrefixClosed()||valid.getEnvelope().getSourceEncodedBytes()!=raw.length) throw new AssertionError("whitespace full-value failed");
   System.out.println("FULL_VALUE legal-whitespace closed=true bytes="+raw.length+" sourceHashExact="+valid.getEnvelope().getSourceContentDigest().equals(FiniteLifecycleContract.INSTANCE.sha(raw)));
   // Run full malformed source test through managed topology, checking exact suffix/no output.
   new FiniteLifecycleCaptureProcessorTest().trailingRootsScalarsAndGarbageRetainWholeValueWithoutSuccessfulCoverage();
   System.out.println("MANAGED_FULL_VALUE original-suffix-and-frontier-assertions=PASS");
   if(!Arrays.equals(original.toByteArray(),FiniteLifecycleStateV1.parseFrom(original.toByteArray()).toByteArray())) throw new AssertionError("original changed");
 }
}
