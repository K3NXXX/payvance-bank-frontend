# @payvance/observability

Browser Sentry for Payvance microfrontends.

## Env (shell / auth / dashboard)

```bash
VITE_SENTRY_DSN=https://xxx@oXXX.ingest.sentry.io/XXX
VITE_SENTRY_ENVIRONMENT=production   # optional; defaults to Vite MODE
VITE_SENTRY_RELEASE=payvance-web@1.0.0  # optional; set in CI
VITE_SENTRY_TRACES_SAMPLE_RATE=0.2   # optional; 0–1
VITE_API_URL=https://api.example.com # used for trace propagation to gateway
```

Without `VITE_SENTRY_DSN`, Sentry stays off (local dev stays quiet).

## What you get in production

| Signal | Where | How |
|--------|--------|-----|
| **Errors** | Issues | Uncaught exceptions, React error boundary, `captureError()` |
| **Performance** | Performance → Transactions | Page loads, `browserTracingIntegration`, axios/fetch if traced |
| **Session replay** | Replays | Sample on error (`replaysOnErrorSampleRate: 1` in prod) |
| **Custom metrics** | Metrics | `trackMetric('card.top_up', 1, { amount: 50 })` |

## Manual capture (dashboard example)

```ts
import { captureError, trackMetric } from '@payvance/observability'

trackMetric('card.created', 1, { type: 'Virtual' })

try {
  await risky()
} catch (error) {
  captureError(error, { feature: 'top-up' })
  throw error
}
```

## Source maps

For readable stack traces in prod, add to shell `vite build` (CI secrets):

- `SENTRY_AUTH_TOKEN`
- `SENTRY_ORG`, `SENTRY_PROJECT`
- `@sentry/vite-plugin` on the shell app

## Backend

HTTP errors and traces are initialized in `gateway-service` (`SENTRY_DSN` in env). gRPC services can get the same pattern later.
