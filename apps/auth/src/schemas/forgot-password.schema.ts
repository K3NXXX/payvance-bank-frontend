import { z } from 'zod'

export const forgotPasswordSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, 'Email is required')
		.email('Enter a valid email address')
		.max(254, 'Email must be at most 254 characters'),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
