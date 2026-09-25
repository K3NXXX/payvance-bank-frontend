export {
	initBrowserSentry,
	Sentry,
	type BrowserSentryApp,
	type InitBrowserSentryOptions,
} from './sentry.browser.js'

/** Business / product counters — visible in Sentry → Metrics (when enabled on project). */
export function trackMetric(name: string, value = 1, attributes?: Record<string, string | number>) {
	Sentry.metrics.count(name, value, attributes ? { attributes } : undefined)
}

export function captureError(error: unknown, context?: Record<string, unknown>) {
	Sentry.captureException(error, context ? { extra: context } : undefined)
}
