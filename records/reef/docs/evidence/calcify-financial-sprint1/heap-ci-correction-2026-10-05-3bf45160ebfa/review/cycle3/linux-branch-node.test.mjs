// Branch instrumentation on actual macOS. Never reported as Linux execution.
Object.defineProperty(process, 'platform', { value: 'linux' });
await import('../../../../scripts/dev/calcify-financial/rate-proof.test.mjs');
