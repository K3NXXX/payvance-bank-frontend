import { toast } from 'sonner'

type TurnstileRunner = {
	isRequired: boolean
	run: () => Promise<string | undefined>
}

export const resolveTurnstileToken = async (
	turnstile: TurnstileRunner,
): Promise<string | undefined> => {
	if (!turnstile.isRequired) {
		return undefined
	}

	try {
		const token = await turnstile.run()

		if (!token) {
			toast.error('Please complete the captcha')
			return undefined
		}

		return token
	} catch {
		toast.error('Captcha verification failed. Try again.')
		return undefined
	}
}
