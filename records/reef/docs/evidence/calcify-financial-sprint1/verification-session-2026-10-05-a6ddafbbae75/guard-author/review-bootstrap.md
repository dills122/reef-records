# Guard review bootstrap

Scope: new reusable Calcify correctness-proof resource/process supervisor, isolated
from production runtime and from previous Python planning wrappers.

Review independently before live broker proof. Do not edit unrelated source or
docs. Do not start brokers, broker loads, or new resource containers. Live Docker
preflight and proof owned by root session. Repository `AGENTS.md` applies.

Files:
- `scripts/dev/calcify-financial/proof-supervisor.mjs`
- `scripts/dev/calcify-financial/proof-supervisor.test.mjs`

Inputs: `docs/evidence/calcify-financial-sprint1/broker-profile.json`, current
session frozen preflight, applicable resource/ownership constraints from root.

Required contract: exact three registered full container IDs and project/service
labels; exact wrapper argv/cwd/unique output dir; 9GiB abort/10GiB hard experiment
disk, 20GiB guest-free floor, 256MiB raw cap; 5-second sampled scope and fail-closed
observer; detached owned group cleanup including stopped/resistant descendants;
unrelated sentinel survives. Intentional single STOP must target frozen registered
broker and retain two healthy peers; stopped allocation charged explicit evidenced
3GiB reservation, not reported as measured allocation. Root asserts exclusively
owned target volume/no other writers. Normal completion requires actual wrapper
exit zero, final sample and persisted completion handshake. Preserve volumes.

Focused command (elevation needed for process-group signals):
`node --test scripts/dev/calcify-financial/proof-supervisor.test.mjs`

Fresh-context reviewer should evaluate implementation/tests without relying on
author explanation. Keep findings tied to source lines and concrete failure
paths; identify limits of control tests versus live integration.

Author explanation exists separately in `author-explanation.md` for reconciliation
after initial independent assessment.
