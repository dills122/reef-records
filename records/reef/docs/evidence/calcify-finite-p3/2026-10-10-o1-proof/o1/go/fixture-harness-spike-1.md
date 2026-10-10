# O1 bounded fixture harness spike1

Failure preserved: initial legacy fixture run with Go1.26.9 returned exit1,
`command1: processed=12 err=<nil>`. New test incorrectly assumed existing
`fakeSource.Fetch` respects requested batch size. Current helper deliberately
returns all supplied deliveries on first fetch and ignores batchSize.

Focused source check: processor_test.go fakeSource.Fetch and ProcessOnce. Matcher
production behavior unaffected; failed assertion prevented baseline artifact output.
Smallest correction: same real Processor processes one explicitly supplied delivery
per ProcessOnce call; fixture source advances explicitly in test. Each command
retains canonical input, real batch construction/publication/ack path, batchSize1.
No production source change or alternate fixture generator required. Reentry scope
limited to new test helper. This is harness knowledge repair, not review-budget reset.

Correction compile check returned exit1: `source.fetched undefined`. Exact helper
has deliveries/fetchErr/fetchCalls and clears deliveries after Fetch; no fetched
flag. Rechecked complete helper before reentry, removed mistaken flag assignment.
Both failed checks preserved; test now supplies next delivery using existing field.
