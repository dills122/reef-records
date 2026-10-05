package com.reef.platform.calcify.financial

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.node.ObjectNode
import java.io.File
import java.lang.management.ManagementFactory
import java.math.BigInteger
import java.nio.file.Files
import java.nio.file.Path
import java.security.MessageDigest
import java.time.Duration
import java.util.HexFormat
import java.util.Properties
import java.util.concurrent.CountDownLatch
import java.util.concurrent.Semaphore
import java.util.concurrent.TimeUnit
import java.util.concurrent.FutureTask
import java.util.concurrent.TimeoutException
import java.util.concurrent.atomic.AtomicLong
import java.util.concurrent.atomic.AtomicReference
import java.util.concurrent.locks.LockSupport
import org.apache.kafka.clients.admin.AdminClient
import org.apache.kafka.clients.admin.NewTopic
import org.apache.kafka.clients.consumer.KafkaConsumer
import org.apache.kafka.clients.producer.KafkaProducer
import org.apache.kafka.clients.producer.ProducerRecord
import org.apache.kafka.common.TopicPartition
import org.apache.kafka.common.config.ConfigResource
import org.apache.kafka.common.serialization.StringDeserializer
import org.apache.kafka.common.serialization.StringSerializer
import org.apache.kafka.streams.KafkaStreams
import org.apache.kafka.streams.StreamsConfig
import org.apache.kafka.streams.errors.StreamsUncaughtExceptionHandler

internal object CompactReferenceFixture {
    private val json = ObjectMapper()
    private const val PRICE = 10_000_000L
    private const val RAW_CAP = 256L * 1024 * 1024
    private const val DISK_CAP = 10L * 1024 * 1024 * 1024
    private val nullNode get() = json.nullNode()
    private fun node(value: Any?): JsonNode = json.valueToTree(value)
    private fun sha(bytes: ByteArray) = HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(bytes))
    private fun canonical(n: JsonNode): String = when {
        n.isObject -> n.fields().asSequence().sortedBy { it.key }.joinToString(",", "{", "}") { json.writeValueAsString(it.key) + ":" + canonical(it.value) }
        n.isArray -> n.joinToString(",", "[", "]") { canonical(it) }
        else -> n.toString()
    }
    private fun digest(n: JsonNode): String {
        val md = MessageDigest.getInstance("SHA-256")
        fun part(s: String) { md.update(s.toByteArray()) }
        fun walk(v: JsonNode) {
            when {
                v.isObject -> { part("{"); v.fields().asSequence().sortedBy { it.key }.forEachIndexed { i, entry -> if (i > 0) part(","); part(json.writeValueAsString(entry.key)); part(":"); walk(entry.value) }; part("}") }
                v.isArray -> { part("["); v.forEachIndexed { i, child -> if (i > 0) part(","); walk(child) }; part("]") }
                else -> part(v.toString())
            }
        }
        walk(n); return HexFormat.of().formatHex(md.digest())
    }
    private fun shaFile(path: Path): String { val md = MessageDigest.getInstance("SHA-256"); Files.newInputStream(path).use { stream -> val buffer = ByteArray(65536); while (true) { val n = stream.read(buffer); if (n < 0) break; md.update(buffer, 0, n) } }; return HexFormat.of().formatHex(md.digest()) }
    private fun frame(vararg ids: String) = json.writeValueAsString(ids.toList())
    internal fun action(id: Long, phase: String, kind: String): JsonNode {
        val execution = "$phase-$id"
        val payload = if (kind == "CAPTURE") mapOf("executionId" to execution, "runId" to "e4", "venueSessionId" to "venue", "instrumentId" to "ACME",
            "buyOrderId" to "buyer-$execution", "sellOrderId" to "seller-$execution", "buyerAccount" to "buyer", "sellerAccount" to "seller",
            "cashAsset" to "USD_NANO", "securityAsset" to "ACME_SHARE", "quantity" to "1", "priceNanos" to PRICE.toString(), "dueTick" to "0")
        else mapOf("executionId" to execution, "runId" to "e4", "venueSessionId" to "venue", "instrumentId" to "ACME", "attempt" to "1")
        return node(mapOf("namespace" to "financial-e4", "domain" to "hot", "actionId" to "$execution-$kind", "kind" to kind, "payload" to payload))
    }
    internal fun emptyOwner(): ObjectNode = json.createObjectNode().apply {
        listOf("balances", "executions", "obligations", "workflows", "instructions", "attempts", "exceptions", "reservations", "dedup", "effects", "versions", "dueQueue", "stagedInputs", "policy").forEach { set<JsonNode>(it, json.createObjectNode()) }
        put("logicalTick", "0"); listOf("businessSeq", "historySeq", "deliveryCursor", "nextDelivery").forEach { put(it, 0L) }
        listOf("continuation", "lastDecisionId", "semanticDigest", "activePolicy").forEach { putNull(it) }
    }

    /** Independent fixed gross-DvP reference: BigInteger economics, known-key deltas.
     * No kernel economics, per-input full state scans or snapshots. */
    internal class Reference(private val balances: JsonNode, private val policy: JsonNode) {
        private val owner = CanonicalLeafOwner(emptyOwner())
        var chain = "GENESIS"
        var historyRecords = 0L
        private fun get(path: List<String>): JsonNode = owner.get(path)
        fun accept(record: JsonNode) {
            val writes = linkedMapOf<List<String>, JsonNode>()
            fun put(root: String, key: String?, value: JsonNode) { writes[if (key == null) listOf(root) else listOf(root, key)] = value }
            fun increment(root: String, key: String? = null) { val p = if (key == null) listOf(root) else listOf(root, key); writes[p] = node(get(p).asLong() + 1) }
            val legs = mutableListOf<Map<String, String>>()
            fun leg(asset: String, account: String, amount: BigInteger) { legs.add(mapOf("asset" to asset, "account" to account, "amount" to amount.toString())) }
            if (historyRecords == 0L) {
                require(record["kind"].asText() == "GENESIS")
                listOf("buyerCash", "sellerCash", "buyerShares", "sellerShares").forEach { put("balances", it, balances[it]) }
                for ((asset, suffix) in listOf("USD_NANO" to "Cash", "ACME_SHARE" to "Shares")) {
                    val opening = -(BigInteger(balances["buyer$suffix"].asText()) + BigInteger(balances["seller$suffix"].asText()))
                    put("balances", "opening$suffix", node(opening.toString())); leg(asset, "opening", opening)
                    listOf("buyer", "seller").forEach { account -> leg(asset, account, BigInteger(balances[account + suffix].asText())) }
                }
                listOf("buyerCash", "sellerCash", "buyerShares", "sellerShares", "openingCash", "openingShares").forEach { put("versions", it, node(0L)) }
                put("policy", null, policy); put("activePolicy", null, policy["policy"]); put("semanticDigest", null, node(sha("GENESIS".toByteArray())))
            } else {
                require(record["kind"].asText() == "BUSINESS")
                val input = record["input"]; val kind = input["kind"].asText(); val payload = input["payload"]
                require(input["namespace"].asText() == "financial-e4" && input["domain"].asText() == "hot")
                require(kind in setOf("CAPTURE", "SETTLE"))
                val execution = frame("e4", "venue", "ACME", payload["executionId"].asText())
                val decision = frame("financial-e4", "hot", input["actionId"].asText())
                require(!owner.contains("dedup", decision)) { "duplicate timed economic action" }
                val disposition: String
                if (kind == "CAPTURE") {
                    require(!owner.contains("executions", execution)); require(payload["quantity"].asText() == "1" && payload["priceNanos"].asText() == PRICE.toString())
                    put("executions", execution, payload); put("obligations", execution, node(mapOf("status" to "PENDING", "cashResidual" to PRICE.toString(), "shareResidual" to "1")))
                    put("workflows", execution, node("PENDING")); put("instructions", execution, node("READY"))
                    put("dueQueue", execution, node(mapOf("tick" to "0", "priority" to 0, "workId" to payload["executionId"].asText())))
                    increment("versions", execution); disposition = "CAPTURED"
                } else {
                    require(get(listOf("obligations", execution))["status"].asText() == "PENDING")
                    for ((field, delta) in listOf("buyerCash" to -PRICE, "sellerCash" to PRICE, "buyerShares" to 1L, "sellerShares" to -1L)) {
                        val next = BigInteger(get(listOf("balances", field)).asText()) + BigInteger.valueOf(delta)
                        require(next.signum() >= 0 && next <= BigInteger.valueOf(Long.MAX_VALUE)); put("balances", field, node(next.toString())); increment("versions", field)
                    }
                    leg("USD_NANO", "buyer", BigInteger.valueOf(-PRICE)); leg("USD_NANO", "seller", BigInteger.valueOf(PRICE)); leg("ACME_SHARE", "seller", -BigInteger.ONE); leg("ACME_SHARE", "buyer", BigInteger.ONE)
                    put("obligations", execution, node(mapOf("status" to "SETTLED", "cashResidual" to "0", "shareResidual" to "0")))
                    put("workflows", execution, node("SETTLED")); put("instructions", execution, node("SETTLED")); put("attempts", frame("e4", "venue", "ACME", payload["executionId"].asText(), "1"), node("SETTLED"))
                    increment("versions", execution); put("dueQueue", execution, nullNode); disposition = "SETTLED"
                }
                increment("businessSeq"); put("lastDecisionId", null, node(decision))
                val pairs = payload.fields().asSequence().sortedBy { it.key }.map { listOf(it.key, it.value.asText()) }.toList()
                val requestDigest = sha(json.writeValueAsBytes(listOf(kind, null, pairs)))
                val context = policy.deepCopy<ObjectNode>().apply { put("logicalTick", "0"); put("domain", "hot") }
                put("dedup", decision, node(mapOf("digest" to requestDigest, "context" to context, "disposition" to disposition)))
                if (legs.isNotEmpty()) put("effects", decision, node(legs))
                val semanticChanges = writes.entries.filter { it.key[0] !in setOf("historySeq", "deliveryCursor", "nextDelivery", "stagedInputs", "policy", "semanticDigest") && canonical(get(it.key)) != canonical(it.value) }
                    .sortedBy { canonical(node(it.key)) }.map { mapOf("path" to it.key, "before" to get(it.key), "after" to it.value) }
                put("semanticDigest", null, node(sha(canonical(node(mapOf("decisionId" to decision, "disposition" to disposition, "input" to requestDigest, "context" to context, "journalLegs" to legs, "semanticChanges" to semanticChanges))).toByteArray())))
            }
            increment("historySeq")
            val expected = writes.map { (p, value) -> mapOf("path" to p, "before" to get(p), "after" to value) }
            val actual = record["changes"].map { it }.sortedBy { canonical(it["path"]) }
            require(canonical(node(expected.sortedBy { canonical(node(it["path"])) })) == canonical(node(actual))) { "independent complete semantic delta mismatch" }
            require(canonical(record["journalGroups"]) == canonical(node(legs.groupBy { it.getValue("asset") }))) { "independent journal mismatch" }
            require(record["sequence"].asLong() == historyRecords + 1 && record["priorSequence"].asLong() == historyRecords && record["priorChecksum"].asText() == chain)
            val unsigned = record.deepCopy<ObjectNode>().apply { remove("checksum") }
            require(record["checksum"].asText() == digest(unsigned)) { "history checksum" }
            writes.forEach { (p, value) -> owner.write(p, value) }
            historyRecords++; chain = record["checksum"].asText()
        }
        fun ownerDigest() = owner.ownerDigest()
        fun clear() = owner.clear()
        internal fun finiteOwnerView() = owner.materialize()
        fun businessView() = owner.materialize().apply {
            listOf("policy", "historySeq", "deliveryCursor", "nextDelivery", "stagedInputs").forEach { remove(it) }; set<JsonNode>("dueWork", node(emptyList<String>()))
        }
    }

}
