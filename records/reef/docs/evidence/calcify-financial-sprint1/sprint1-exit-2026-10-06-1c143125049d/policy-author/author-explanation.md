# Author Explanation — Optional8GiB Resource Permission

## Intent And Success Criteria
Arm4 stopped at4GiB sampled heap limit; no finalmeasurement. Prepare optional8GiB experiment permission under existingfinite150k/60s scope, without optimizing reference/runtime financialcode or claiming budgetguaranteesfit. Old4GiB and768MiB programs unchanged byexplicitselection.

## Plan-To-Implementation Traceability
Same E4 useful-rate/cost question. New namedprofile financial-empirical-heap8-disk16-v1 mustselect8GiB launcher,capability,guard and16GiB diskagreement. No extra workload/recovery qualification. Prior3of3 reviewcap reached; patchprepared forhumanextensiondecision only, no review4 launched.

## Technical Approach And Changed Components
proof-supervisor exports secondfixedresourceprofile, validates exact-Xmx8g onlywithnewname; oldname stillrequires-Xmx4g. Both retain14/16disk andfrozenpolicybinding/ownership/refusal ofordinary/bootstrap/fault/customcaller modes. rate-supervision accepts newnamedprofile onlywithmatchingfrozenpolicy/hash/hardceiling. rate-proof diagnosticLauncher chooses4GiB(default/oldname) or8GiB(newname) andbindsfreeze/rawactualcapability/assessment/launchtoexactselectedmax/flags. No free-form heap request.

FinancialHeapGuard empirical profile nowcarries fixedauthorizedmax4or8; defaultauthorization stays4, explicit8required. Actualcapmax/observedmaxmustexactlyequal selectedmax, stickyfail/staleness/250mssampling/atomicpublication unchanged. FinancialHeapBounds768MiB bound unchanged. FinancialRateProbe derives fixedheapmax/flags fromfrozennamedprofile andreportsactualselectedmax. Diskbudget/journal/client/economic/replay paths unchanged. Narrowtests cover8max/flags,wrongmax/oldprofilemix refusal,8heapassessment andold4/768 compatibility.

## Verification Performed
Node REDfornewprofile rejection beforechange; finalfocused102PASS. Kotlin initialtestcompilefailed ObjectNode.deepCopy typeargument; retained failurelog, correctedtest-onlycall andreran focusedchecks. Final Kotlin outcome inverification.json. gitdiffcheckPASS. Kernel/Broker hashes rechecked againstarm4compatibilitymarker unchanged. No load/commit/push byauthor.

## Invariants And Limits
Allbudgets are explicit finite testpermission, not conservativeupper/capacitypromise. Same150000trades/300000sourceactions/300001histories,exactprefunding,2GiBjournal,14/16disk,20GiBfree,raw256MiB,sampling/lifecycle/sourceownership andindependent economic/history/replay checks. Deadline rates separate fromfinaldrain; schema/provenance defects FAIL+UNKNOWN. Native/brokerCPU unqualified. Sourcecompatibility proves unchanged kernel/adapter only, not same-newbuild49 recertification.

## Costs And Deferred Work
One additional fixedresourceprofile and selectedguardmax, no newserialization/storage/financialalgorithm. Additionalreview authorization required underindependent-review skillcap3; do not run until acceptedconcretepatch reviewed withauthorizedextension. Parentowns freshproject/capability/config/sourcefreeze and actualrunanalysis. Arm4closedjournal report provides source-based settled upperbound148640, notactualdeadlinecount/parity/replay.

## Challenge Points
Check exactselection acrossNodefreeze/launcher/supervisor/report andKotlinpolicy/cap/guard;old4/768compatibility;wrongmaxrefusal;no sourceeconomicchanges;reviewcapnotreset. No readinessverdict offered byauthor.
