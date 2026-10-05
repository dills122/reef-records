# Shared host monotonic clock evidence

Observed Node22.22.1, libuv1.51.0, macOS (`process.platform=darwin`).
Pinned [Node22.22.1 native process methods](https://raw.githubusercontent.com/nodejs/node/v22.22.1/src/node_process_methods.cc) route hrtime to uv_hrtime.
Pinned [libuv1.51.0 Darwin implementation](https://raw.githubusercontent.com/libuv/libuv/v1.51.0/src/unix/darwin.c) converts mach_continuous_time using host timebase, not per-process startup origin. Same-host/same-runtime inference supports fixed deadline passed between local processes; explicit frozen runtime checked for actual fault use. Node public arbitrary-origin docs alone insufficient portability guarantee. No universal/cross-host clock claim.
