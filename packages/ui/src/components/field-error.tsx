type FieldErrorProps = {
	message?: string
}

function FieldError({ message }: FieldErrorProps) {
	return (
		<p
			className="min-h-4 text-xs leading-4 text-destructive"
			aria-live="polite"
			role={message ? 'alert' : undefined}
		>
			{message ?? '\u00A0'}
		</p>
	)
}

export { FieldError }
