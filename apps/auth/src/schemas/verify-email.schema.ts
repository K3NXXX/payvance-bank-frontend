import { z } from 'zod'

export const verifyEmailSchema = z.object({
	code: z
		.string()
		.trim()
		.min(1, 'Verification code is required')
		.length(6, 'Verification code must be 6 digits')
		.regex(/^\d{6}$/, 'Verification code must be 6 digits'),
})

export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>
