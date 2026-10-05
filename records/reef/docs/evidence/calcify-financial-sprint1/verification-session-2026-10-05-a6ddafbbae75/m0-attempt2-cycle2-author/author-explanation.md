# Author Explanation

## Intent And Success Criteria

Root accepted instance1 non-blocking follow-ups before live smoke. Frozen guard
argv previously accepted directory without required flag. Normal five-second
cadence could miss target's nominal three-second starting interval, leaving
parent's starting acceptance/measured du unexercised despite wrapper observation.
Local refinements tighten flag validation and sample recovering target sooner.

## Plan-To-Implementation Traceability

Instance1 P3 accepted: exactly one literal flag immediately followed by frozen
directory now required. Missing/incomplete/wrong pair and duplicate flags reject.
Instance1 sampling refinement accepted: RECOVERING-only nominal1second target
with existing200ms lead. Normal phases unchanged. Instance1 P2 smoke acceptance
corrected separately by root, new root adjunct hash and receipts in bootstrap.
All prior56 operational controls preserved, two added, focused58/58 pass.
No protocol/schema/deadline/budget/runtime pin change or new architecture.

## Technical Approach And Flow

Preflight counts literal flag occurrences and checks adjacent path against frozen
protocol directory. sampleDeadline closure derives next scheduled sample from
last sample timestamp and current parent phase:1000ms only RECOVERING,5000ms
otherwise. Existing loop starts200ms early. Recompute after authorization and
each actual observation; fresh healthy observation advances phase and restores
normal cadence. Every cached/fresh validation still enforces5second maximum;
recovery grant deadline still anchored before START and never renewed.

## Changed-Component Walkthrough

Only proof-supervisor.mjs and proof-supervisor.test.mjs changed in author scope.
Source adds one recovery scheduling constant, phase-aware next-sample closure,
flag count/pair gate and scope text documenting nominal cadence. Test adds two
controls. Broker runner/tests and external-faults module remain hash-identical to
instance1. Root smoke now asserts startingSeen before recovered ACK/success;
root controls load actual driver with injected Docker/client.

## Decisions And Rejected Alternatives

Keep1second as scheduling target and strict5second freshness as fail-closed
ceiling. Bounded monitor taking>1second may defer next nominal sample; falsely
claiming hard1second would exceed event-loop/adapter model. No global sampling
rate change, grace relaxation, deadline extension or broker healthcheck change.
Root acceptance still separately requires actual parent starting row/du receipt;
faster cadence increases opportunity but cannot force short daemon transition
to exist or guarantee observed starting under every timing.

## Invariants And Boundary Conditions

Same30second grant, single cycle/generation, exact resource ownership, stable
3GiB charge, mandatory du during starting, all peer/initial/final health checks,
freshness/IO/publication/owned cleanup guarantees retained. All normal phases
nominal5000ms with200ms lead. Wrapper-side starting alone cannot qualify parent
regression proof. Labels/exclusive-volume assumption and same-host runtime clock
inference unchanged; no continuous or atomic measurement claim.

## Verification Performed And Results

New controls run before source fix: `refinement-red.log`, actualexit1,0/2pass.
Preflight reports Missing expected exception; complete actual adapter/file-client
cycle succeeds but parent starting samples=0 when target turns healthy exactly
STARTgrant+3000ms. This directly demonstrates old cadence gap with injected
Docker, not live daemon timing.

First patched run `refinement-green-attempt1.log`: flag test passes, starting
checks pass; normal STOPPED cadence assertion lacks two comparable samples
because test dwell only6000ms and first sample carries prior authorization seq.
Test dwell extended to10000ms for STOPPED/postrecovery; production unchanged.
Corrected `refinement-green.log`:2/2pass, parent starting stamps27600/28400/29200,
grant26800, fixed deadline56800. Each starting row healthy=false, reserved charge
3GiB, actual measured1GiB and matching target du receipt at same injected time.
Consecutive recovering gap800ms, normal HEALTHY/STOPPED/RECOVERED periodic gap
4800ms verified. Old cadence yielded zero starting rows against same three-second
health transition. Test health changes on actual adapter invocation/clock; no
unrealistic wall-clock task sleep advances grant.

Full focused command in bootstrap actualexit0,58/58,0fail/skip/cancelled,
9387.721ms; two syntax checks pass. Real own-group stopped-leaf/leader-exit and
sentinel controls included, Docker injected throughout. Other three operational
hashes independently rechecked unchanged. Root reports actual-body smoke TDD
RED2tests1failure thenGREEN2/2; these are root-owned receipts, not author tests.
Root broad CI2 reports216/216zero failures/skips, actualexit0 and before/after
hash equality; independent reviewer verify retained receipts. Live smoke/campaign
pending; no result invented.

## Risks, Tradeoffs, And Maintenance Costs

Recovering phase performs samples more often, including exact3 running du calls
and guest/raw measurement. Tiny bounded correctness cluster only; no capacity
claim. Monitor/phase IO cost can exceed nominal cadence, still subject to strict
5second freshness and independent timeout. Additional phase-specific interval
one conditional, no generalized scheduler/framework. Same source publication,
kernel/event-loop/host stall, group escape, exclusive writer and clock pin limits
from instance1 retained. Final sample still precedes small metadata; keep raw margin.

## Deviations, Deferrals, And Known Gaps

First GREEN harness sample-count correction retained honestly. No historical
receipt removed. Root owns smoke-driver/CI metadata corrections, later source
scope alignment and delivery/retention pass. No live Docker or broad CI by author.
Fresh review instance2 needed for material operational refinement; Attempt1
allthree and Attempt2 instance1 counters/reports preserved. Source frozen.

## Challenge Points For The Reviewer

Verify exact argv cardinality/adjacency, phase sampling deadline recomputation,
posthealthy cadence, strict heartbeat under slow monitor, unchanged fixed grant
deadline and complete58control suite. Check driver starting acceptance plus
separate live parent starting/du requirement. Reconcile corrected test dwell and
all hashes; inspect complete modules/plan rather than trusting rationale.
