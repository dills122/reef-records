package com.reef.platform.calcify.financial

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.node.ArrayNode
import com.fasterxml.jackson.databind.node.ObjectNode
import java.nio.file.Path
import java.security.MessageDigest
import java.util.HexFormat

private val json = ObjectMapper()
private var checks = 0
private fun canonical(n: JsonNode): String = when {
    n.isObject -> n.fields().asSequence().sortedBy { it.key }.joinToString(",", "{", "}") { json.writeValueAsString(it.key) + ":" + canonical(it.value) }
    n.isArray -> n.joinToString(",", "[", "]") { canonical(it) }
    else -> n.toString()
}
private fun digest(n: JsonNode) = HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(canonical(n).toByteArray()))
private fun equal(label: String, expected: Any?, actual: Any?) { check(expected == actual) { "$label mismatch" }; checks++ }
private fun rejected(label: String, block: () -> Unit) {
    val failure = runCatching(block).exceptionOrNull()
    check(failure is RuntimeException) { "$label accepted or unexpected failure: $failure" }
    checks++
}
private fun resign(record: ObjectNode): ObjectNode {
    record.remove("checksum"); record.put("checksum", digest(record)); return record
}
private fun helperChecks() {
    val empty = CompactReferenceFixture.emptyOwner()
    val store = CanonicalLeafOwner(empty)
    equal("genesis digest", digest(empty), store.ownerDigest())
    equal("empty categories", canonical(empty), canonical(store.materialize()))
    val leaf = json.readTree("""{"z":null,"a":[1,"1",{"quote\"\\\n":"é😀"}],"boolean":true}""") as ObjectNode
    val key = "escaped\"\\\n\t-é😀"
    store.write(listOf("executions", key), leaf)
    val expected = empty.deepCopy().apply { (get("executions") as ObjectNode).set<JsonNode>(key, leaf.deepCopy()) }
    equal("escaped/null/array leaf digest", digest(expected), store.ownerDigest())
    leaf.put("mutated", "input")
    equal("input mutation isolation", digest(expected), store.ownerDigest())
    (store.get(listOf("executions", key)) as ObjectNode).put("mutated", "read")
    equal("read mutation isolation", digest(expected), store.ownerDigest())
    (store.materialize()["executions"] as ObjectNode).removeAll()
    equal("materialized mutation isolation", digest(expected), store.ownerDigest())
    val reversed = json.createObjectNode()
    expected.fields().asSequence().toList().reversed().forEach { (k,v) -> reversed.set<JsonNode>(k,v) }
    equal("root insertion order", store.ownerDigest(), CanonicalLeafOwner(reversed).ownerDigest())
    val one = CanonicalLeafOwner(empty); val two = CanonicalLeafOwner(empty)
    listOf("z", "a", key).forEach { one.write(listOf("dedup",it), expected["executions"][key]) }
    listOf(key, "a", "z").forEach { two.write(listOf("dedup",it), expected["executions"][key]) }
    equal("leaf insertion order", one.ownerDigest(), two.ownerDigest())
    val numeric = one.ownerDigest(); one.write(listOf("historySeq"), json.nodeFactory.textNode("0"))
    check(numeric != one.ownerDigest()); checks++
    store.write(listOf("executions", key), json.nullNode())
    equal("null leaf removes key", false, store.contains("executions",key))
    equal("null root retained", true, store.get(listOf("continuation")).isNull)
    equal("delete restores genesis", digest(empty), store.ownerDigest())
    rejected("root category write") { store.write(listOf("executions"), json.createObjectNode()) }
    rejected("root category get") { store.get(listOf("executions")) }
    store.clear(); equal("clear retained leaves",0,store.retainedLeafCount()); equal("clear owner", "{}",canonical(store.materialize()))
    equal("clear digest", digest(json.createObjectNode()),store.ownerDigest())
    val source = empty.deepCopy().apply { (get("executions") as ObjectNode).set<JsonNode>(key,leaf) }
    val isolated = CanonicalLeafOwner(source); val before = isolated.ownerDigest(); source.removeAll(); leaf.removeAll()
    equal("constructor mutation isolation",before,isolated.ownerDigest())
}

fun main() {
    helperChecks()
    val policy = json.readTree(Path.of("baseline/fixtures.json").toFile())["policy"]
    val balances = json.readTree("""{"buyerCash":"100000000000","sellerCash":"0","buyerShares":"0","sellerShares":"2000"}""")
    val kernel = FinancialKernel(balances,policy,retainHistory=false)
    val legacy = LegacyReferenceFixture.Reference(balances,policy)
    val compact = CompactReferenceFixture.Reference(balances,policy)
    val oracle = FinancialOracle(balances,policy)
    val histories = mutableListOf(kernel.lastRecord()!!.deepCopy<JsonNode>())
    legacy.accept(histories[0]); compact.accept(histories[0])
    equal("GENESIS legacy digest",digest(legacy.owner),compact.ownerDigest())
    equal("GENESIS kernel digest",digest(kernel.ownerView()),compact.ownerDigest())
    var inputs = 0
    fun execute(id: Int, kind: String) {
        val input = CompactReferenceFixture.action(id.toLong(),"bounded",kind)
        kernel.execute(input,detailed=false)
        val record = kernel.lastRecord()!!.deepCopy<JsonNode>()
        legacy.accept(record); compact.accept(record); histories.add(record); inputs++
        // Both References validate complete deltas/journals/history on every input.
        if (inputs <= 40) {
            oracle.execute(input); oracle.assertMatches(compact.businessView(),"prefix=$inputs")
            equal("full oracle prefix=$inputs",canonical(legacy.businessView()),canonical(compact.businessView()))
        }
        if (inputs <= 40 || inputs % 40 == 0 || inputs == 2100) {
            equal("owner full finite prefix=$inputs",canonical(legacy.owner),canonical(compact.finiteOwnerView()))
            equal("canonical digest prefix=$inputs",digest(legacy.owner),compact.ownerDigest())
            equal("kernel digest prefix=$inputs",digest(kernel.ownerView()),compact.ownerDigest())
        }
    }
    repeat(1000) { execute(it,"CAPTURE"); execute(it,"SETTLE") }
    repeat(100) { execute(1000+it,"CAPTURE") }
    equal("source actions",2100,inputs); equal("history records",2101L,compact.historyRecords)
    val finalOwner = compact.finiteOwnerView()
    equal("all executions",1100,finalOwner["executions"].size()); equal("all dedup",2100,finalOwner["dedup"].size())
    equal("all effects",1000,finalOwner["effects"].size()); equal("all attempts",1000,finalOwner["attempts"].size())
    val structural = CanonicalLeafOwner(finalOwner)
    equal("retained category leaf cardinality",9712,structural.retainedLeafCount())
    val categoriesField = CanonicalLeafOwner::class.java.getDeclaredField("categories").apply { isAccessible=true }
    val rootsField = CanonicalLeafOwner::class.java.getDeclaredField("roots").apply { isAccessible=true }
    val maps = categoriesField.get(structural) as Map<*, *>
    equal("category count",13,maps.size)
    maps.values.forEach { leaves -> (leaves as Map<*, *>).forEach { (key,value) ->
        check(key is String && value is String) { "mutable retained category leaf" }; checks++
    } }
    (rootsField.get(structural) as Map<*, *>).forEach { (key,value) ->
        check(key is String && value is String) { "mutable retained root" }; checks++
    }
    equal("pending due queue",100,finalOwner["dueQueue"].size())
    equal("pending obligations",100,finalOwner["obligations"].count { it["status"].asText()=="PENDING" })
    finalOwner["executions"].forEach { equal("CAPTURE complete fields",13,it.size()) }
    finalOwner["effects"].forEach { equal("complete effect legs",4,it.size()) }
    val finalDigest = compact.ownerDigest(); val finalChain = compact.chain
    compact.clear(); equal("clear reference owner","{}",canonical(compact.finiteOwnerView()))
    val restored = CompactReferenceFixture.Reference(balances,policy); histories.forEach { restored.accept(it) }
    equal("result-only replay owner",finalDigest,restored.ownerDigest()); equal("result-only replay chain",finalChain,restored.chain)
    equal("result-only replay history",2101L,restored.historyRecords)
    equal("result-only replay all logical leaves",canonical(finalOwner),canonical(restored.finiteOwnerView()))

    fun rejectMutation(label: String, mutate: (ObjectNode) -> Unit) {
        val candidate = histories[2].deepCopy<ObjectNode>(); mutate(candidate); resign(candidate)
        val ref = CompactReferenceFixture.Reference(balances,policy)
        histories.take(2).forEach { ref.accept(it) }; val before=ref.ownerDigest()
        rejected(label) { ref.accept(candidate) }
        equal("$label owner unchanged",before,ref.ownerDigest()); equal("$label count unchanged",2L,ref.historyRecords)
    }
    rejectMutation("missing delta") { (it["changes"] as ArrayNode).remove(0) }
    rejectMutation("extra delta") { (it["changes"] as ArrayNode).add(it["changes"][0].deepCopy<JsonNode>()) }
    rejectMutation("wrong before") { (it["changes"][0] as ObjectNode).put("before","wrong") }
    rejectMutation("wrong after") { (it["changes"][0] as ObjectNode).put("after","wrong") }
    rejectMutation("omitted context") { r -> val d=r["changes"].first { it["path"][0].asText()=="dedup" }; (d["after"] as ObjectNode).remove("context") }
    rejectMutation("changed context") { r -> val d=r["changes"].first { it["path"][0].asText()=="dedup" }; (d["after"]["context"] as ObjectNode).put("logicalTick","999") }
    rejectMutation("journal leg") { (it["journalGroups"]["USD_NANO"][0] as ObjectNode).put("amount","999") }
    rejectMutation("history gap") { it.put("sequence",4) }
    rejectMutation("prior checksum") { it.put("priorChecksum","wrong") }
    val gap=CompactReferenceFixture.Reference(balances,policy); gap.accept(histories[0])
    rejected("reordered history") { gap.accept(histories[2]) }
    val duplicate=CompactReferenceFixture.Reference(balances,policy); histories.take(3).forEach { duplicate.accept(it) }
    rejected("duplicate economic action") { duplicate.accept(histories[1]) }
    val checksum=CompactReferenceFixture.Reference(balances,policy); histories.take(2).forEach { checksum.accept(it) }
    rejected("checksum mutation") { checksum.accept(histories[2].deepCopy<ObjectNode>().put("checksum","tampered")) }
    fun verifyCut(records: List<JsonNode>) {
        val ref=CompactReferenceFixture.Reference(balances,policy); records.forEach { ref.accept(it) }
        check(ref.historyRecords==2101L && ref.chain==finalChain && ref.ownerDigest()==finalDigest) { "complete cut mismatch" }
    }
    rejected("truncated committed cut") { verifyCut(histories.dropLast(1)) }
    rejected("extra committed member") { verifyCut(histories + histories.last()) }
    rejected("reordered committed cut") { verifyCut(listOf(histories[0],histories[2],histories[1]) + histories.drop(3)) }
    for (category in listOf("executions","dedup","effects")) {
        val changed=finalOwner.deepCopy(); val first=changed[category].fieldNames().next()
        (changed[category] as ObjectNode).set<JsonNode>(first,json.nodeFactory.textNode("altered"))
        equal("same count $category",finalOwner[category].size(),changed[category].size())
        check(CanonicalLeafOwner(changed).ownerDigest()!=finalDigest) { "altered $category undetected" }; checks++
    }
    println(json.writeValueAsString(mapOf("status" to "PASS", "checks" to checks,"sourceActions" to inputs,"historyRecords" to histories.size,
        "fullOraclePrefixes" to 40,"ownerSha256" to finalDigest,"historyChecksum" to finalChain,
        "scope" to "isolated copied-source prototype; no throughput/capacity claim")))
}
