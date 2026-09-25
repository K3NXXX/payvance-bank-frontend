import { z } from 'zod'

const passwordSchema = z
	.string()
	.min(8, 'Password must be at least 8 characters')
	.max(128, 'Password must be at most 128 characters')
	.regex(/[a-zA-Z]/, 'Password must contain at least one letter')
	.regex(/\d/, 'Password must contain at least one number')

export const signupSchema = z
	.object({
		fullName: z
			.string()
			.trim()
			.min(1, 'Full name is required')
			.min(2, 'Full name must be at least 2 characters')
			.max(100, 'Full name must be at most 100 characters')
			.regex(
				/^[a-zA-ZÀ-ÿ]+(?:[-'][a-zA-ZÀ-ÿ]+)* [a-zA-ZÀ-ÿ]+(?:[-'][a-zA-ZÀ-ÿ]+)*$/,
				'Enter your first and last name only',
			),
		email: z
			.string()
			.trim()
			.min(1, 'Email is required')
			.email('Enter a valid email address')
			.max(254, 'Email must be at most 254 characters'),
		password: passwordSchema,
		confirmPassword: z.string().min(1, 'Please confirm your password'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

export type SignupFormValues = z.infer<typeof signupSchema>
