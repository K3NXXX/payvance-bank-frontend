import { StoreProvider } from '@payvance/store'
import * as Sentry from '@sentry/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { onCLS, onINP, onLCP } from 'web-vitals'
import type { Metric } from 'web-vitals'
import App from './App'
import SentryFallback from './components/SentryFallback'

const sentryDsn = import.meta.env.VITE_SENTRY_DSN
const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:4000'
const apiOrigin = new URL(apiUrl).origin

if (sentryDsn) {
	Sentry.init({
		dsn: sentryDsn,
		environment: import.meta.env.MODE,
		integrations: [Sentry.browserTracingIntegration()],
		tracesSampleRate: import.meta.env.PROD ? 0.2 : 1,
		tracePropagationTargets: ['localhost', apiOrigin],
		beforeSend(event) {
			if (event.request?.headers) {
				delete event.request.headers.authorization
				delete event.request.headers.cookie
			}
			return event
		},
		initialScope: {
			tags: { app: 'payvance-web', host: 'shell' },
		},
	})
}

function sendWebVitalToSentry(metric: Metric) {
	Sentry.metrics.distribution(`web_vital.${metric.name}`, metric.value, {
		unit: metric.name === 'CLS' ? 'none' : 'millisecond',
		attributes: {
			rating: metric.rating,
			navigationType: metric.navigationType,
		},
	})
}

if (sentryDsn) {
	onLCP(sendWebVitalToSentry)
	onINP(sendWebVitalToSentry)
	onCLS(sendWebVitalToSentry)
	Sentry.metrics.count('payvance.setup_test', 1)
}

const app = (
	<BrowserRouter>
		<StoreProvider>
			<App />
		</StoreProvider>
	</BrowserRouter>
)

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		{sentryDsn ? (
			<Sentry.ErrorBoundary
				fallback={({ error, resetError }) => (
					<SentryFallback error={error} resetError={resetError} />
				)}
				showDialog={false}
			>
				{app}
			</Sentry.ErrorBoundary>
		) : (
			app
		)}
	</StrictMode>,
)
