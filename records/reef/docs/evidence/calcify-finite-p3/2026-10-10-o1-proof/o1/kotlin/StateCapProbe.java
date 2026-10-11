import com.reef.platform.calcify.*;
import reef.contracts.calcify.v1.FiniteLifecycleStateV1;
import java.nio.file.*;
import java.util.Arrays;

/** Model byte-boundary probe; padding changes diagnostic field only, never source facts. */
class StateCapProbe {
  public static void main(String[] args) throws Exception {
    Class<?> fixtures = Class.forName("com.reef.platform.calcify.FiniteLifecycleFixtures");
    Object fixture = fixtures.getField("INSTANCE").get(null);
    var binding = (FiniteLifecycleBinding) fixtures.getMethod("binding$default",fixtures,
        FiniteLifecycleBudget.class,int.class,Object.class).invoke(null,fixture,null,1,null);
    byte[] original = Files.readAllBytes(Path.of(args[0]));
    var checkpoint = FiniteLifecycleStateV1.parseFrom(original);
    int cap = Math.toIntExact(binding.getBudget().getStateBytes());
    // Tag(1) + length(varint4) at these configured positive lengths.
    int padding = cap - checkpoint.getSerializedSize() - 5;
    var exact = checkpoint.toBuilder().setFault("x".repeat(padding)).build();
    if(exact.getSerializedSize() != cap) throw new AssertionError("exact state boundary mismatch");
    FiniteLifecycleReducer.INSTANCE.validateState(exact,binding);
    var accepted = FiniteLifecycleCaptureRuntime.INSTANCE.initializeModel(binding,
        new FiniteLifecycleStartCut.Restore(exact,0,12),null);
    if(!accepted.equals(exact)) throw new AssertionError("exact restore changed state");
    var over = exact.toBuilder().setFault("x".repeat(padding+1)).build();
    if(over.getSerializedSize() != cap+1) throw new AssertionError("one-over state boundary mismatch");
    boolean refused = false;
    try {
      FiniteLifecycleCaptureRuntime.INSTANCE.initializeModel(binding,
          new FiniteLifecycleStartCut.Restore(over,0,12),null);
    } catch(IllegalArgumentException expected) {
      if(!expected.getMessage().contains("managed state byte budget exceeded")) throw expected;
      refused = true;
    }
    if(!refused || !Arrays.equals(original,checkpoint.toByteArray())) throw new AssertionError("one-over state restore was not atomic");
    System.out.println("PASS exact encoded state="+cap+" bytes; one-over="+(cap+1)+" bytes refused before initialize returns; original checkpoint unchanged; no topology/output invoked");
    System.out.println("Fixture checkpoint="+checkpoint.getSerializedSize()+" bytes; padding diagnostic-only, no source/capture facts replaced; live recovery not claimed");
  }
}
