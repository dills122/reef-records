# First implementable P0 task — finite isolated source contract

Author planning proposal, October 6, 2026. Direct audited source fallback; no independent review verdict, runtime loads or test execution. No implementation changed. This task precedes existing RFC P3 useful path; it does not choose financial authority, reservations or production SLOs.

## Outcome and actual delta

Make one explicitly isolated, finite Calcify source profile refuse startup when terminal order eviction would invalidate its declared full-run order identity contract. Pin `MATCHING_ENGINE_TERMINAL_ORDER_RETENTION_LIMIT=0`; validate configured namespace/topic ownership and finite workload/resource manifest before admitting the profile's commands. Prove accepted order IDs remain unavailable after fill/cancel and restart within that declared finite scope.

Existing matcher already provides no-reuse while records remain retained. Default retention0 already preserves terminal records, and V4 snapshot metadata already binds retention policy/limit. **Do not implement another ID set, change default matching semantics, add a tombstone subsystem, or rewrite snapshot format merely to test existing behavior.** The useful missing plumbing is an explicit opt-in source-contract configuration guard and reproducible finite source profile, rather than a new matching algorithm.

Proposed source-contract mode/name is not yet a repository setting. Freeze its exact name before implementation. A dedicated isolated matcher deployment/profile is the smallest scope: its source namespace and command topic belong to that finite Calcify run. This is not per-run mixed-tenant enforcement inside a shared matcher; shared deployment support would require another ownership/admission design.

## Patch boundaries

| Owner/module | Narrow change | Existing API/config to reuse |
|---|---|---|
| `services/matching-engine/cmd/matching-engine/main.go` | Explicit optional source-contract startup validation before exposing HTTP/gRPC or starting durable consumption. Refuse opted-in retention other than exact0, malformed contract configuration, or undeclared isolated source profile. Log/report accepted binding. Keep ordinary startup untouched when mode absent. | `app.NewService`, `app.WithTerminalOrderRetentionLimit(0)`, `streamdirect.RuntimeConfigFromEnv`, `streamdirect.StartRunner`. Startup currently constructs service at line32 and stream runner at line52. |
| `services/matching-engine/internal/app/` | Small pure source-contract/config validation helper if appropriate; exact filename to freeze. No change to `reserveInBatch`, terminal eviction or default retention semantics. | `service.go:187` retention default0; `order_index.go:59` retained `(run,order)` duplicate check; `service_snapshot.go:166` existing restore compatibility checks. |
| Isolated Calcify P0/P3 source launcher/profile under `scripts/dev/` | New profile or clearly separate opt-in branch pins retention0 and named command/event topics; frozen finite total accepted orders, lanes, duration and resource budget. Preserve existing Calcify throughput profile at250000. Persist actual resolved Compose config and source-contract binding. Exact new script filename to freeze. | `scripts/dev/calcify-direct-bootstrap.mjs:17` currently sets250000; `compose.base.yml:247` accepts env override; existing command/event namespace configuration. |
| Contract/config owners | Describe finite full-run identity promise, isolated deployment scope, resource preflight, retention0 and restore compatibility. Distinguish mode from global default and source identity from command retry identity. | `docs/work/CALCIFY_SYSTEM_ARCHITECTURE_RFC.md:128` proposed no-reuse; `docs/LOCAL_CONFIGURATION.md`; `docs/LOCAL_RUN_PROFILES.md:342`; `contracts/calcify/README.md` only if adopted source contract is recorded there. |
| Focused tests | Existing behavior plus new startup/refusal integration controls; real durable source fixture with terminal transitions and restart. Use existing matcher and source fixtures. | `services/matching-engine/internal/app/run_scope_test.go`, `terminal_retention_replay_test.go`, `terminal_retention_recovery_test.go`; `services/matching-engine/internal/streamdirect/processor.go:519`. |

No public route, Protobuf financial/lifecycle envelope or event schema change is necessary for this narrowly scoped configuration contract. Existing snapshot metadata suffices for retention0 binding. Lifecycle/coverage envelope implementation belongs to later P3 source gate, not this task.

## Finite acceptance cases

1. Opt-in isolated profile with explicit retention0 and valid finite manifest starts; nonzero/negative/malformed retention or malformed profile refuses before command consumption or ingress exposure. Absent opt-in retains existing legacy behavior/configuration.
2. Submit order under `(runA,orderA)`; second submission with new command/idempotency identity and same order ID rejects `DUPLICATE_ORDER_ID` before matching. Test changed session/instrument within same run too: uniqueness is run-wide, not book-local.
3. Fully fill orderA; submit enough unrelated terminal orders to exceed a small historical eviction test limit; same ID still rejects under pinned0. Repeat with cancellation and IOC residual closure. Do not confuse identical command retry with new-command reuse.
4. Snapshot/restart under same pinned0; previously terminal order IDs still reject. Continue matching against live resting state correctly. Reject restore of snapshot from incompatible positive-retention profile using existing V4 compatibility check.
5. Different run with same raw order ID remains valid/isolated; blank-run namespace cannot address another run's order. Existing run-scoped tests preserved.
6. Separate legacy bounded-retention instance still evicts and allows reuse exactly as current tests require; no global behavior change.
7. Real durable ingress→command topic→matcher→venue outcome fixture verifies new-command duplicate rejection occurs before accepted order/trade output; restart retains source/engine checkpoint parity and produces no duplicate trade effects.
8. Actual finite manifest count/resource accounting matches retained order count and source facts. Retention0 does not imply safe unbounded operation; declare run lifetime and stop admission at fixture boundary. Out-of-scope inputs invalidate this finite proof and must not be silently counted as covered.

Finite runtime cap enforcement is **not currently implemented by retention0**. This proposal's smallest version is a finite isolated source experiment/profile with declared, validated workload generation and resource preflight. If project requires rejecting arbitrary external commands beyond a retained-order cap in production, add explicit admission-budget design rather than pretending profile manifest alone enforces it.

## Existing guarantees and limitation

- Live/retained duplicate enforcement: `service.go:278` calls `reserveOrder` before matching; `order_index.go:59` keys `(run,order)`.
- Bounded terminal retention deletes record: `terminal_retention.go:96`, `service.go:1170`.
- Intentional legacy same-run reuse: `terminal_retention_replay_test.go:397`; cross-instrument reuse at line270.
- Retention0 default: `service.go:187`; bounded Calcify direct profile250000: `scripts/dev/calcify-direct-bootstrap.mjs:17`.
- Snapshot serializes currently indexed rows: `service_snapshot.go:91`; restore reinstates retained rows and checks retention compatibility.
- Durable intake deduplicates `(scope,idempotency_key)` and `command_id`, not `(run,order)`: `services/platform-runtime/src/main/kotlin/com/reef/platform/api/StreamCommandIntake.kt:181`,`:204`. Matcher remains acceptance guard in this scoped profile.

No architecture decision is needed to demonstrate existing retention0 behavior in an isolated finite fixture. **Adopting that behavior as a live Calcify product source contract still requires owner acceptance of no-reuse and finite deployment scope.** If owner requires bounded terminal eviction or same-run reuse, this proposed guard is insufficient; choose explicit acceptance incarnation or durable run-lifetime identity ownership before implementation. Do not add empty tests or claim P0 universally closed.

All code paths relative to `/Users/dsteele/.codex/worktrees/8c6f/reef`. Exact helper/script names and opt-in config key are proposed, not existing repository APIs. P0 acceptance result is configuration/fixture scoped; it neither closes lifecycle/coverage nor P3 financial/SQL/API acceptance.
