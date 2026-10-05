# Pilot durability readback correction

Initial gate helper failed KeyError on min.insync.replicas absent from rpk topicdescribe, includingprint-all. Failure/raworiginalhelper retained. No topic/broker/source durability setting changed. Source still requests Kafka hint2; actualreported Redpanda topic settings are RF3,write.cachingfalse,8MiBsegments. Do not describe Kafka hint as broker-read-backminISR2.

Redpanda official [architecture](https://docs.redpanda.com/streaming/current/get-started/architecture/) describes Raft majority acknowledgement for acksall; RF3 therefore quorum2 (inference from observedRF3 plus documentedprotocol). Official [producer configuration](https://docs.redpanda.com/streaming/current/develop/produce-data/configure-producers/) describes majority fsync before acknowledgement whenwritecachingdisabled. Source-driver setsacksall; Streams exactly-once producer defaults verified by actualStreamsConfig priorregression. Allsixpilot input/result/changelogtopics readbackRF3/writecachingfalse/8MiB.

Gate correction records requestedKafkaMinISR2/reportedKafkaMinISRnull and Redpanda quorum inference separately; no fabricatedreadback, relaxation, architecturechange or newKafkaqualification. Actualmajority-outagefaultmatrix remainsopen; documentation isn't empiricalfaultproof. RetrievedOctober5UTC.
