# Reef Arena runner prototype retirement — October 16, 2026

Source: [Reef `5272fdb68`](https://github.com/dills122/reef/tree/5272fdb68).
[Manifest](../../manifests/2026-10-16-reef-arena-runner-prototype.json): five exact originals, 41,184 bytes.

July 7 Phase 1 synthetic Deno/Node runner benchmark and its two child workers have no maintained caller beyond a package alias. The container wrapper has another package alias, defaults to Bun 1.1.38, and invokes a July 7 real-world benchmark with no current caller beyond its own package alias. Current CI uses Bun 1.3.14. Runner-pool, tick and local hardening checks remain in Reef; no production runner is removed.

Last source edit is not last run. No central invocation telemetry exists for these manual aliases, so archive makes no claim of exact last use. No runtime behavior, scenario contract or performance qualification changes.
