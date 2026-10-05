import com.reef.platform.calcify.financial.*;
import java.nio.file.*;
import java.util.concurrent.atomic.AtomicInteger;
public class PeakScopeControl {
 public static void main(String[] args) throws Exception {
  AtomicInteger calls = new AtomicInteger();
  FinancialHeapGuard g = new FinancialHeapGuard(new FinancialHeapBounds(2,4,100,10,20,1000,100),172,1000,
   () -> new FinancialHeapSnapshot(1000,calls.incrementAndGet() >= 3 ? 700 : 50,0), () -> 0L,250,5000000000L);
  Path p=Path.of(args[0]);
  try { g.start(); g.publish(p,"{\"heapPeakBytes\":"+g.telemetry().get("heapPeakBytes")+"}",null);
   System.out.println("published="+Files.readString(p)+" finalGuardPeak="+g.telemetry().get("heapPeakBytes")+" calls="+calls.get());
  } finally {g.close();}
 }
}
