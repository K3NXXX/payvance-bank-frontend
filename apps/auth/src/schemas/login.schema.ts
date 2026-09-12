import { z } from 'zod'

export const loginSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, 'Email is required')
		.email('Enter a valid email address')
		.max(254, 'Email must be at most 254 characters'),
	password: z
		.string()
		.min(1, 'Password is required')
		.max(128, 'Password must be at most 128 characters'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
