type Props = {
	error: unknown
	resetError: () => void
}

export default function SentryFallback({ error, resetError }: Props) {
	const message = error instanceof Error ? error.message : 'Unknown error'

	return (
		<div>
			<p>Something went wrong</p>
			<p>{message}</p>
			<button type='button' onClick={resetError}>
				Try again
			</button>
		</div>
	)
}
