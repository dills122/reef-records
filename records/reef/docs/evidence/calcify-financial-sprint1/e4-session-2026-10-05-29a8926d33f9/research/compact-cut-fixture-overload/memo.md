Research before explicit WholeAttempt3 cycle1. Attempt2 cycle3 remains NotReady, max3cycles respected.

Actual compiled FinancialRateReferenceTest.javap shows duplicate-cut construction invokes kotlin.collections.CollectionsKt.plus(Collection,Iterable), preceded checkcastjava/lang/Iterable on JsonNode. Jackson JsonNode is Iterable of childnodes; ObjectNode iterator yields field values. Therefore history+history.last() appends scalar/array/objectchildren instead of one validhistory record; Reference.accept attempts missingkind.asText and throwsNPE. Failure109/1 preserved currentCompiledjavap andXML/TAP; thisisnegativefixture construction error, notnewcompact economic semanticfailure.

Correction history+listOf(history.last()) appends Iterablecontaining exactlyoneJsonNode and tests intendedduplicatehistory. Assert IllegalArgumentException message duplicate timed economic action, preserving invalidrecord failclosed behavior instead of wideningexceptiontype. No runtimeReferencechange. Allsource27frozen prior preserved; newAttempt3cycle1 sourcefreeze required; freshreview afterresearch, no cycle4/reset. Full109 must rerun, newcap/current49/pairedactualcohort remains open.



Actual bytecode snippets:
```text
     213: istore        7
     215: aload_0
     216: aload_2
     217: aload_1
     218: checkcast     #576                // class java/util/Collection
     221: aload_1
     222: invokestatic  #868                // Method kotlin/collections/CollectionsKt.last:(Ljava/util/List;)Ljava/lang/Object;
     225: checkcast     #118                // class java/lang/Iterable
     228: invokestatic  #872                // Method kotlin/collections/CollectionsKt.plus:(Ljava/util/Collection;Ljava/lang/Iterable;)Ljava/util/List;
     231: invokestatic  #858                // Method truncatedExtraAndReorderedCompleteCommittedCutsFailExpectedBoundary$verifyCompleteCut:(Lcom/reef/platform/calcify/financial/FinancialRateReferenceTest;Lcom/reef/platform/calcify/financial/FinancialRateProbe$Reference;Ljava/util/List;)V
     234: getstatic     #768                // Field kotlin/Unit.INSTANCE:Lkotlin/Unit;
     237: invokestatic  #771                // Method kotlin/Result."constructor-impl":(Ljava/lang/Object;)Ljava/lang/Object;
```
