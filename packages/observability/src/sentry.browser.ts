import * as Sentry from '@sentry/react'

export type BrowserSentryApp = 'shell' | 'auth' | 'dashboard'

export type InitBrowserSentryOptions = {
	app: BrowserSentryApp
	dsn?: string
	environment?: string
	release?: string
	apiBaseUrl?: string
}

function parseSampleRate(value: string | undefined, fallback: number) {
	if (!value) {
		return fallback
	}

	const parsed = Number(value)

	return Number.isFinite(parsed) && parsed >= 0 && parsed <= 1 ? parsed : fallback
}

export function initBrowserSentry(options: InitBrowserSentryOptions) {
	const dsn = options.dsn?.trim()

	if (!dsn) {
		return false
	}

	const environment =
		options.environment ??
		(typeof import.meta !== 'undefined' && import.meta.env?.MODE
			? import.meta.env.MODE
			: 'development')

	const tracesSampleRate = parseSampleRate(
		typeof import.meta !== 'undefined' ? import.meta.env?.VITE_SENTRY_TRACES_SAMPLE_RATE : undefined,
		environment === 'production' ? 0.2 : 1,
	)

	const apiOrigin = options.apiBaseUrl ? new URL(options.apiBaseUrl).origin : undefined

	Sentry.init({
		dsn,
		environment,
		release: options.release,
		enabled: true,
		sendDefaultPii: false,
		integrations: [
			Sentry.browserTracingIntegration(),
			Sentry.replayIntegration({
				maskAllText: true,
				blockAllMedia: true,
			}),
		],
		tracesSampleRate,
		replaysSessionSampleRate: environment === 'production' ? 0.05 : 0,
		replaysOnErrorSampleRate: environment === 'production' ? 1 : 0,
		tracePropagationTargets: [
			'localhost',
			/^https?:\/\/127\.0\.0\.1/,
			...(apiOrigin ? [apiOrigin] : []),
		],
		initialScope: {
			tags: {
				mfe: options.app,
			},
		},
		beforeSend(event) {
			if (event.request?.headers) {
				delete event.request.headers.authorization
				delete event.request.headers.cookie
			}

			return event
		},
	})

	return true
}

export { Sentry }
