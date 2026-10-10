# O1 bounded poison harness spike2

Knowledge failure preserved in focused-tests-red-2.log: new poison test passed
map[string]any to existing newFakeDelivery, which accepts map[string]string.
Compilation exited1 before stream tests. App accessor test passed separately.

Bounded source check processor_test.go newFakeDelivery/fakeDelivery: constructor
marshals string map into unexported payload bytes; fakeDelivery implements complete
delivery protocol. To represent wrong JSON type, instantiate exact fakeDelivery
with controlled literal bytes instead of broadening shared helper or production
decoder. Source compile-time types now checked before retry. No production defect,
scope expansion or review-count reset. Reentry limited to poison test setup.

Subsequent focused check reached new retry assertion but exited1; retained
focused-tests-red-3.log. Existing fakePublisher does not record failed attempts;
assertion incorrectly expected two batches. Source check verified existing
fakeAtomicPublisher records both attempts and exercises actual processor atomic
publication branch. Use it for bounded failure/retry test, asserting two byte-equal
attempts plus rollback/rebuild. No shared helper change. This spike extends same
harness alignment to publication observation before reentry.
