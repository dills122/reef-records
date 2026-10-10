# Bounded test environment alignment

Two test setup failures preserved before test reentry, not implementation failures. First cached Go1.26.9 selector refuses toolchain checksum validation with GOSUMDB=off. Direct installed binary avoids downloader/verification selector, but sandbox prohibits existing user go-build cache access. Neither attempted run executes focused tests.

Smallest correction: direct already installed Go1.26.9 binary, GOTOOLCHAIN=local, GOPROXY=off and GOSUMDB=off prevent downloads; GOCACHE inside exclusively owned research output permits local compilation. Fixture output env explicitly empty prevents fixture writes. No broker, product source mutation, provider, secret or network required. Existing source assertions independently support classification if local compile remains unavailable.
