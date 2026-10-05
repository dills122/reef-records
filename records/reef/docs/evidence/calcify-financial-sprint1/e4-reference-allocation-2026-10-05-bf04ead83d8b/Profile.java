import com.fasterxml.jackson.databind.*;
import java.nio.file.*;
import java.lang.reflect.*;
import java.lang.management.*;
import java.util.*;
public class Profile {
 static class FinancialLoader extends ClassLoader {
  final JsonNode map; FinancialLoader(JsonNode map) { super(Profile.class.getClassLoader());this.map=map; }
  protected Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException {
   synchronized(getClassLoadingLock(name)) {
    if(!name.startsWith("com.reef.platform.calcify.financial."))return super.loadClass(name,resolve);
    Class<?> c=findLoadedClass(name);
    if(c==null) { String simple=name.substring(name.lastIndexOf('.')+1);JsonNode p=map.get(simple);if(p==null)throw new ClassNotFoundException(name);
     try{byte[] b=Files.readAllBytes(Path.of(p.asText()));c=defineClass(name,b,0,b.length);}catch(Exception e){throw new ClassNotFoundException(name,e);}}
    if(resolve)resolveClass(c);return c;
   }
  }
 }
 static final ObjectMapper json=new ObjectMapper();
 public static void main(String[] args)throws Exception {
  Path dir=Path.of(args[0]);JsonNode maps=json.readTree(dir.resolve("classmaps.json").toFile()), input=json.readTree(dir.resolve("inputs.json").toFile()),history=json.readTree(dir.resolve("history.json").toFile());
  if(history.size()!=2101)throw new AssertionError("history count");
  var bean=(com.sun.management.ThreadMXBean)ManagementFactory.getThreadMXBean();if(!bean.isThreadAllocatedMemorySupported())throw new AssertionError("allocation unsupported");bean.setThreadAllocatedMemoryEnabled(true);long tid=Thread.currentThread().threadId();
  List<Object> records=new ArrayList<>();
  for(int arm=0;arm<2;arm++) {
   FinancialLoader loader=new FinancialLoader(maps.get(arm));Class<?> c=loader.loadClass("com.reef.platform.calcify.financial.FinancialRateProbe$Reference");
   Constructor<?> ctor=c.getDeclaredConstructor(JsonNode.class,JsonNode.class);ctor.setAccessible(true);
   Method accept=c.getDeclaredMethod("accept",JsonNode.class),chain=c.getDeclaredMethod("getChain"),count=c.getDeclaredMethod("getHistoryRecords");Method digest;Object digestTarget=null;Method getOwner=null;
   if(arm==0){Class<?> outer=loader.loadClass("com.reef.platform.calcify.financial.FinancialRateProbe");digest=outer.getDeclaredMethod("digest",JsonNode.class);digestTarget=outer.getField("INSTANCE").get(null);getOwner=c.getDeclaredMethod("getOwner");getOwner.setAccessible(true);}else digest=c.getDeclaredMethod("ownerDigest");
   for(Method m:List.of(accept,digest,chain,count))m.setAccessible(true);
   for(int iteration=-2;iteration<5;iteration++) {
    Object ref=ctor.newInstance(input.get("balances"),input.get("policy"));
    long startBytes=bean.getThreadAllocatedBytes(tid),start=System.nanoTime();
    for(JsonNode rec:history)accept.invoke(ref,rec);
    long acceptEndBytes=bean.getThreadAllocatedBytes(tid),acceptEnd=System.nanoTime();Object sha=arm==0?digest.invoke(digestTarget,getOwner.invoke(ref)):digest.invoke(ref);long endBytes=bean.getThreadAllocatedBytes(tid),end=System.nanoTime();
    if(!input.get("ownerSha256").asText().equals(sha)||!input.get("historyChecksum").asText().equals(chain.invoke(ref))||((Number)count.invoke(ref)).longValue()!=2101)throw new AssertionError("parity arm="+arm+" iteration="+iteration);
    records.add(Map.of("arm",arm==0?"ordinary-reference":"canonical-leaf-reference","iteration",iteration,"warmup",iteration<0,"acceptAllocatedBytes",acceptEndBytes-startBytes,"finalOwnerDigestAllocatedBytes",endBytes-acceptEndBytes,"acceptElapsedNanos",acceptEnd-start,"digestElapsedNanos",end-acceptEnd,"ownerSha256",sha,"historyRecords",2101,"historyChecksum",chain.invoke(ref)));
   }
  }
  var result=new LinkedHashMap<String,Object>();result.put("schema","isolated-financial-reference-thread-allocation-profile-v1");result.put("javaVersion",System.getProperty("java.version"));result.put("javaVendor",System.getProperty("java.vendor"));result.put("vmArguments",ManagementFactory.getRuntimeMXBean().getInputArguments());result.put("threadAllocatedMemoryEnabled",bean.isThreadAllocatedMemoryEnabled());result.put("records",records);result.put("scope","Single-thread Reference accept of identical pre-parsed committed 2101 histories plus one final ownerDigest; reflective invocation included; construction/data parsing excluded; two warmups and five repetitions per arm. No Kafka, kernel, driver, GC-retained heap, native memory, workload rate or upper-cost inference.");
  json.writerWithDefaultPrettyPrinter().writeValue(dir.resolve("profile-result.json").toFile(),result);System.out.println(json.writeValueAsString(result));
 }
}
