# OCR delivery retry research

Recommendation: no identical rerun. Approval needed to merge minimal two-file
trusted-base patch before any retry: exclude only generated Calcify Java from hosted
semantic review and raise literal aggregate token budget500000→1500000. Preserve
all existing handcrafted Go/Kotlin/test/contract coverage and gates. Proposed patch
is unapplied in proposed-trusted-base.patch. Manager owns any base PR/merge/trigger;
this research authorizes none. Trusted-base merge is outside currently authorized
Calcify implementation delivery and needs human approval.

## Failure and scope

PR485 head1dee92a64cc86e58ae5fcff98f9f6118533e2bfd, run38066442470,
job114254942453; trusted master checkout e69e62ada42c633b81f90ccf178680973b398b0c;
review merge-base51cd90eee43d257bad4f973fc9bd81f273bb4ef7. Complete result reconstructed
from retained truncated-start log, saved failed-result.json. Selected48,
completed0/reused0/failed48/waived0; findings0. First semantic group10files estimated
896928tokens; grouping used1863; projected898791>500000 stops all dispatch. This is
infrastructure/coverage failure, not substantive code approval or finding.

Selection48:31generated Java,9handwritten Go(5production/4tests),6Kotlin(3production/
3tests),2contracts(proto+fixture manifest). Expected proposed selection17 preserves
all17handwritten originally selected paths, excludes exactly31generatedJava; exact
before/after lists in coverage-before-after.json. Generated Go calcify.pb.go already
excluded by built-in **/*.pb.go. Existing include patterns bypass default Go/Kotlin
test exclusions and MUST remain. Docs/reports exclusions remain; include is bypass,
not whitelist. Contract JSONL/hex fixtures and owner docs were outside original
hosted selection; no invented hosted coverage for them. Existing fresh review3,
protoc additive/drift checks and golden tests retain their coverage and evidence.
No O1 fourth internal review created; hosted retry remains existing delivery gate.

## Supported options versus exposed caller

Pinned action bccbc15f785269400735d5255540c231e6c02b6d supports rule,
max_tokens_budget,effort,review_concurrency,base_ref,head_sha,pr_number,full_review.
Trusted Reef workflow exposes only pull_request_target labeled/synchronize/reopened/
ready_for_review; no workflow_dispatch declaration or workflow inputs. Budget literal
500000, medium effort, concurrency2. Neither dispatch API/gh -f inputs nor environment
at rerun can override literal caller. PR branch rule/workflow edits cannot affect
trusted checkout; pointing rule to PR-owned file would violate secret boundary.
Action fetches PR head as Git objects while base files remain trusted.

Exact CLI controls in pinned source:

```text
ocr review --from 51cd90eee43d257bad4f973fc9bd81f273bb4ef7 --to 1dee92a64cc86e58ae5fcff98f9f6118533e2bfd --audience agent --format json --timeout 15 --concurrency 2 --effort medium --max-tokens-budget 1500000 --rule <trusted-existing-rule-path>
ocr review --from 51cd90eee43d257bad4f973fc9bd81f273bb4ef7 --to 1dee92a64cc86e58ae5fcff98f9f6118533e2bfd --rule <trusted-existing-rule-path> --preview --format json
ocr rules check --rule <trusted-existing-rule-path> services/platform-runtime/src/test/kotlin/com/reef/platform/calcify/FiniteLifecycleCaptureProcessorTest.kt
ocr rules check --rule <trusted-existing-rule-path> services/matching-engine/internal/streamdirect/calcify_lifecycle_test.go
```

Examples not executed; no credential/config read, CLI install or review invocation.
--preview supported without LLM; CLI unavailable in current research environment,
so coverage witness uses exact hosted manifest/set arithmetic, not executed preview.
Trusted action rule input accepts existingbase file, not inlineJSON. Custom filter
layer with any include/exclude replaces project filter layer, so override must copy
both test include patterns and docs/reports excludes; rules text resolution retains
normal matching precedence. Local handwritten rule-only override is not available
via this hosted caller. CLI --exclude and --max-tokens exist, but action exposes
neither; no supported public grouping-size/partition input. Do not lower effort,
disable PLAN/filter, drop tests or force grouping failure to evade gate. --no-plan
is scan option, not this review command. Lower concurrency cannot shrink group cost.

GitHub dispatch command is currently unsupported:
`gh workflow run open-code-review-pilot.yml --ref master -f pr_number=485 -f head_sha=...`
would require adding workflow_dispatch and trustedvalidated inputs first; not
recommended minimal fix. `gh run rerun 38066442470 --failed` supplies no overrides
and repeats original workflow/event configuration, so not recovery even after base
changes. Fresh pull_request_target event after approved trusted-base merge must
load newbase workflow/rule and samefrozenhead; manager chooses authorized event.
Do not create product commit merely to trigger synchronize, resolve old findings,
remove review requirement or mark failing run successful.

## Cost and coverage projections

Pinned estimator per diff =21300+8*cl100k_base(diffTokens); assumes PLAN plus seven
main calls, independent of medium effort. Heuristic ignores full-body tool-use
inflation and counts overhead per file even bundled. Exact dispatch floor to admit
original first group is898791tokens; increasing to900000 might admit it but does
not reserve enough for remaining groups or guarantee completed coverage.

No-auth witness coverage-cost-witness.json uses floor(fullGitDiffBytes/4) fallback
proxy, includes Git headers, NOT exact embedded BPE/parsed diff estimate. Full48
proxy3003280tokens;31generatedJava proxy2253964; remaining17proxy749316:
contracts76960 +Go291812 +Kotlin380544. First originalgroup proxy849952 versus actual
896928 demonstrates~5.5% low bias for that group only; cannot extrapolate calibrated
billing. Therefore generatedJava exclusion alone at500000 still risks incomplete
coverage; two-file recommendation1500000 gives~2x remainingproxy headroom. Not
promised sufficient: actual tool use/provider counts decide, manifest must prove
17/17 completed/reused,zero failed/waived, correct frozenrange, no droppedhandcrafted
paths before hosted gate is satisfied. CLI exit0 alone can mean partialbudget run.

Budget-only full generatedcoverage needs order3M+ proxy and retainedgroup fit,
substantially more model work over reproducible outputs; 500000→900000 alone not
credible completecoverage recovery. Splitting groups may reduce all-or-nothing
firstgate but not aggregate work, loses shared semantic context and needs unsupported
caller/template customization. Minimal recommended change preserves medium effort,
concurrency2,45min workflow timeout, default15min per-task timeout, model/version,
secret handling,fail-on-error,sticky summary/incremental/checkpoint behavior.

1500000 is soft token policy, not hard dollar charge cap: in-flight/final-round work,
plan/group/filter calls and toolinflation may exceed threshold; no USD estimate or
provider billing promised. Blank/0 unlimited specifically rejected. Failed original
actual usage1863tokens; no substantive task work spent. Changed rule/budget fingerprints
force full base-to-head coverage; no existing checkpoint may hide failed range.

## Primary-source trust / remaining blockers

Pinned action installer log version1.12.9(bccbc15), while result execution.ocr_version
v1.12.13. Preserve mismatch; do not claim upgrade or normalize version identity.
Source manifest uses llm.AppVersion; CLI uses ldflags main.Version. Metadata mismatch
alone does not prove different executable, but actual resolved install/version and
newmanifest must be retained before acceptance. This spike does not alter pin.

Hard blocker: no supported run-specific override with current trusted workflow.
Need human approval for proposedbase patch + trustedbase review/merge before retry.
Rule change excludes reproduciblegenerated semantic review only; deterministic
regeneration/additive/drift/golden gates remain required and cannot be waived.
CI remains separate running gate; no merge/readiness from budget spike. After
approvedbase change, retain newworkflow/rule SHA, exactPRhead/range and expected
selection17; full manifest/result plus hosted findings/reconciliation required.
No repeatedrun, review creation, product/workflow/rule/Git/network write or secrets
access performed. Only authorized ocr-spike directory written; original failure
retained. HTTPSprimary source reads approved by tool sandbox; initial restrictedDNS
failure retained as diagnostic, not treated as review failure.

Primary source URLs (immutable pinned refs):

- https://raw.githubusercontent.com/alibaba/open-code-review/bccbc15f785269400735d5255540c231e6c02b6d/action.yml
- https://raw.githubusercontent.com/alibaba/open-code-review/bccbc15f785269400735d5255540c231e6c02b6d/internal/agent/estimate.go
- https://raw.githubusercontent.com/alibaba/open-code-review/bccbc15f785269400735d5255540c231e6c02b6d/internal/agent/agent.go
- https://raw.githubusercontent.com/alibaba/open-code-review/bccbc15f785269400735d5255540c231e6c02b6d/internal/config/rules/system_rules.go
- https://raw.githubusercontent.com/alibaba/open-code-review/bccbc15f785269400735d5255540c231e6c02b6d/cmd/opencodereview/shared_flags.go
- https://raw.githubusercontent.com/alibaba/open-code-review/bccbc15f785269400735d5255540c231e6c02b6d/internal/agent/grouping.go
