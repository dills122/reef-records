# Arm5 closed journal verification

PASS. Read-only reused frame reader; no broker/RocksDB opening, journal recovery, source edits or load. Raw file sizes/SHA256 checked before and after; unchanged.

300000 contiguous published source actions;150000 complete CAPTURE/SETTLE pairs;3146 publication batches;0 unpaired CAPTURE,0 unpublished data/index tails. Full frame hashes/data+publication chains, mirrored witness, ordinal index positions, scope/topic UUID/domain, increasing source offsets, payload hashes,1KiB bound and complete fixed action JSON verified.

Source encoded bytes112172230 (CAPTURE71800005;SETTLE40372225), maximum482/271B. Journal data328612423B; aggregate336587023B. Published measurement agrees exactly on scope,count,queueSize0,three journal file hashes,aggregate bytes and encodedInputBytes. Measurement SHA2568dc1974b7ba755c145d59534893befbe0b4c52180917df08325184ed8b4db6da.

Published measurement deadline settled63104/final150000; deadline offered71296/callback71286/admitted71256. Those counts copied from measurement, never inferred from journal offer/callback clocks. Journal alone certifies source publication only; independent economics/history/result-replay evidence remains measurement/parity scope. No new managed separate-JVM restart certified.

Exact retained reader: `arm5-journal-offline-inspect.py`; full hashes/counts/measurement comparison: `arm5-journal-offline-findings.json`. Prior failed arm3/arm4 evidence untouched.
