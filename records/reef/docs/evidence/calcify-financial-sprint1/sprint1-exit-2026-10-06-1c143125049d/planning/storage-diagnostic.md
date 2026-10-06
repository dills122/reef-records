# E4 arm3 storage diagnostic — read-only findings

Scope: failed finite empirical fresh2500trades/s×60s,4GiB JVM,RF3,one hot domain,2GiB ACK journal; aborted 2026-10-06T02:24:34.816Z by project-allocation guard. No final measurement/result-only replay artifact exists. No load, broker startup, DB opening, economic source edit or optimization performed in this assessment.

## Actual observed resource accounting

First valid project sample:50,577,408B at02:22:28.778Z. Last accepted sample:9,649,577,984B at02:24:28.824Z (broker8,235,102,208B,host1,414,475,776B). Rejected raw observation at2026-10-06T02:24:33.632Z: broker8,690,835,456B +host1,464,602,624B =10,155,438,080B, exceeding9GiB earlyabort threshold. FinalSample in abort receipt is lastaccepted sample, not rejected peak. Five-second samples and separately timed host/guest collection are not continuous or atomic total peak.

After brokerstop, root read-only volume audits (no network,pinnedimage,mountreadonly) sum: input319,766,528B; results2,313,555,968B; financial-state changelog4,139,024,384B; system4,857,856B. Closed audit total6,777,204,736B acrossthree broker replicas. These later allocations cannot replace running rejected-observation figures or prove exact logical byte/compaction causality. Active log segment allocation, replication, transactions/retention and asynchronouscompaction contribute scope differences. Topic-attribution data point to changelog then results as dominant retained broker categories, rather than independent verifier output files.

Closed host store1,150,867,052B logical /1,150,926,848B allocated; journal305,233,482B logical /311,508,992B allocated; proof roughly1.5MB logical /2.2MB allocated at assessment. Proofgrowth will vary as receiptsappend. Journal small fraction of total rejected allocation; increasing/removing journal is not explanation for multiGiB broker growth.

## Closed-journal facts, without a broker

Streamed offline forensic reader fully verified272,154 published source members in2,886 publication batches,136,077 paired CAPTURE/SETTLE source inputs,zerounpairedcapture andzerodata/indextails. Verified every frame SHA, priorchain, mirroredpublicationwitness, indexpositions, ordinal/physicaloffsetorder, run/topicUUID/domain and sourcepayloadhash, plus exact paired synthetic execution IDs. Input payload bytes101,688,211 total:CAPTURE65,089,119B(avg478.33,max482);SETTLE36,599,092B(avg268.96,max271). Journal approximately2243.09Blogical per paired published source trade versus747.28B inputpayload.

Persisted first-to-last offeredclockspan120,708.325292ms; callbackspan120,692.49575ms. These characterize partialsourceprefix only. Never convert136,077 sourcepairs to settledtrades, finaldrain or deadline2500/s result. Durable publication proves sourcecallback membership, not completedworkerdecisions/readcommitted financial settlement. timedStart,controlleradmission notifications and deadline-stagecountscut were not persisted, so exact deadlinecounts cannot be reconstructed honestly. Brokerresult consumption and fullowner/historyreplay remain unverified. Reader opened files read-only, didnot instantiate FinancialAckJournal.recover (which maytruncatepreservetail), and verified rawfiles unchanged bysize/hash before/after. Rawreader and source findings retained alongside this report.

## Representation and write amplification paths

FinancialRateProbe.kt: send emits two tiny JSON sourceenvelopes pertrade,CAPTURE andSETTLE; source limit1KiB andbounded16384suffix. Its mainworker calls FinancialBrokerProbe.topology(config), so rate and E3 brokerproof share same financial processor. Independent Reference is in-JVM and doesnot produce additional broker topics/storehistory. ACK journal is testcontroller durability proof and storesbase64source+metadata+index+dualpublication witnesses; contributes localtestdisk and sourceadmissionI/O, not deployed production venueauthority.

FinancialKernel.kt append creates full JSON history containing originalinput,before/afterchanges,journalgroups,sequence andchainchecksum. Capturedexecution/obligation/workflow/dedup andsettlementeffects create multiple semantic keys. Bounded changes do not imply smalltotalencoded record or onephysicalwrite.

FinancialBrokerProbe.kt processor writes each semanticchange to s/keys, fullhistoryrecord+sourcescope to h/keys, c/sourcecoverage withbefore/afterheads andhistorychecksums, andcert/0 aftereveryinput. It forwards fullhistoryrecords again to resulttopic. Persistent RocksDB state-store logging remains enabled(default) withcachingexplicitlydisabled. Consequently fullhistory exists in resulttopic,localh/store andRF3statestorechangelog; semantic/coverage/certificatewrites add further changelog cost. Changelogcompaction maintains currentkeys but h/ andc/appendunique retained keys, so cannot retire their audit history merely bycompactingcurrentbalancekeys. Results/input retain deletepolicy; noqualified short retention removes requiredhistory.

FinancialRateProbe streamProperties uses EOSv2,RF3,minISR2,writecachingfalse,one streamthread,commitinterval2000ms,finiteproducerbuffer4MiB,batch64KiB,compressionnone; sourceproduceralso compressionnone. The new empirical mode reuses bootstrapfiniteclientlimits but ordinary pacedcore/economic checks. BrokerProbe E3 worker defaultcommitinterval60000ms and source seedusestransactionalseeding withabortedprelude, unlike pacednontransactionalsourceproducer. Comparecorrectness/economic paths acrossE3/E4, not identical workload/commit/membershipcost. Snapshot writes/replicated changelog/encoding/I/O are real proposedfinancialmanaged-log-path costs, not verifierheapoptimization.

## Production applicability and one-variable question

All audited financial implementations currently live under src/test; do not call this evidence deployed Calcify memory/storage/rate. RF3canonicalfacts+rebuildableprojectionstate, financialhistoryencoding,EOScommits andretention are relevant design questions if this adapter ispromotedinto runtime. Production Phase1/2 context-resolution pipeline wasnot measured in this failedarm.

No harnessoptimization recommended. First finish finite usefulmeasurement with reasonableexplicitdiskresourcebudget. If later isolating intrinsic runtime-path storagecost, hold financialinputs,exactfacts,replay,EOSTransactions,RF3 andretentionconstant andchange only production-intended producercompression setting fromnone. Hypothesis: repetitive JSON history/semanticvalues compress substantially, reducing brokerbyteswithout financialsemanticchanges; throughput/CPUimpact mustbemeasured,notassumed. This would require explicit newconfigboundexperiment, not deletionofhistory,RF1substitution or verifier weakening. No suchchange/runperformed here. Also attribute encodedactualhistory/changelog bytes separately from allocatedsegments beforedesignchanges.

## Evidence quality

Used codebase-memory Verify: graphprojectreef-calcify-session-8c6f,generation2026-10-05T07:02:27Z. Search identifiedFinancialRateProbe/BrokerProbe; check_index_coverage reportedmetadata_changed for both, AckJournalnottracked,scriptsexcluded,Kernelmetadata_match. Currentdirectsource fallback isauthority. No graphabsence/completenessclaim. Primaryraw:arm3/proof/supervision/resource-samples.jsonl,arm3/closed-volume-audit/rp0..2.json,arm3/journal/*,frozenpolicy/config, currentKernel/Broker/RateProbe/AckJournal sources. Numerical receipt:storage-diagnostic-metrics.json; fulljournalforensics:journal-offline-findings.json andjournal-offline-inspect.py.

## Source-membership upper bound

Shared FinancialProcessor obtains membership before calling kernel.execute. RateProbe membership waits on FinancialAckJournal.member, which returns no member for ordinal >= publishedCount and verifies both publication and independent witness. Journal publish forces data, index, witness and publication before advancing publishedCount. Closed complete mirrored prefix therefore bounds every input capable of executing in this isolated worker. In-flight Kafka records or producer buffers beyond prefix cannot execute without journal publication.

Verified prefix contains exactly 136,077 distinct SETTLE inputs, one per synthetic execution, with no unpaired capture or unpublished data/index tail. For this fixed CAPTURE/SETTLE workload, settled business decisions at any cut are therefore **at most 136,077**, below 150,000 target. This is an upper count bound, not actual settled count, completed parity, measured deadline rate or recovery result. Controller admission timestamps and exact deadline cut remain unknown.

## Resource-only continuation

Observed host and guest free space support considering fixed larger experimental resource permission: 14 GiB early abort, 16 GiB hard allocation, unchanged 20 GiB guest-free floor, 256 MiB raw-output cap and sampling/lifecycle rules. No conservative bound or guaranteed cohort fit inferred. Extra permission may yield complete measurement showing target miss; it cannot turn delayed source offers into timely settlement.

Minimal implementation affects proof-supervisor profile selection/sample ceilings, rate-supervision frozen-policy agreement, rate-proof empirical policy/report budgets and FinancialRateProbe empirical-only disk cap. Financial kernel, broker adapter, economic reference, journal algorithm and ordinary/bootstrap 9/10 GiB supervision and 10 GiB probe caps unchanged. New named profile keeps old absent-profile 10 GiB empirical policy meaning intact. Fresh project required; failed volumes and evidence retained. No storage/memory optimization or additional load performed by this author.
