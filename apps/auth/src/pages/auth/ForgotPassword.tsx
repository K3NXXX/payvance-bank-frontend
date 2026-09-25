import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import AuthLayout from '@/components/auth/AuthLayout'
import TurnstileWidget from '@/components/auth/TurnstileWidget'
import { Button, FieldError, Input, Label } from '@payvance/ui'
import { AUTH_ROUTES } from '@/constants/pages.constants'
import { useForgotPassword } from '@/hooks/useForgotPassword'
import { useTurnstile } from '@/hooks/useTurnstile'
import { resolveTurnstileToken } from '@/lib/get-turnstile-token'
import {
	type ForgotPasswordFormValues,
	forgotPasswordSchema,
} from '@/schemas/forgot-password.schema'

export default function ForgotPassword() {
	const { requestPasswordReset, isPending } = useForgotPassword()
	const turnstile = useTurnstile()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ForgotPasswordFormValues>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
		mode: 'onBlur',
	})

	const onSubmit = async (values: ForgotPasswordFormValues) => {
		const turnstileToken = await resolveTurnstileToken(turnstile)

		if (turnstile.isRequired && !turnstileToken) {
			return
		}

		requestPasswordReset(
			{
				email: values.email,
				turnstileToken,
			},
			{
				onSettled: () => turnstile.reset(),
			},
		)
	}

	return (
		<AuthLayout>
			<div className="mb-10 lg:hidden">
				<div className="flex items-center gap-2">
					<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-sm font-bold text-background">
						P
					</div>

					<span className="text-lg font-semibold tracking-tight">Payvance</span>
				</div>
			</div>

			<div className="space-y-2">
				<h2 className="text-3xl font-semibold tracking-tight">Forgot your password?</h2>

				<p className="text-sm text-muted-foreground">
					Enter your email and we'll send you instructions to reset your password.
				</p>
			</div>

			<form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="flex flex-col gap-1">
					<Label htmlFor="email">Email</Label>

					<Input
						id="email"
						type="email"
						placeholder="you@example.com"
						autoComplete="email"
						className="h-11"
						aria-invalid={Boolean(errors.email)}
						{...register('email')}
					/>

					<FieldError message={errors.email?.message} />
				</div>

				{turnstile.isRequired ? (
					<TurnstileWidget
						siteKey={turnstile.siteKey}
						turnstileRef={turnstile.ref}
						onWidgetLoad={turnstile.onWidgetLoad}
						onSuccess={turnstile.onSuccess}
						onExpire={turnstile.onExpire}
						onError={turnstile.onError}
					/>
				) : null}

				<Button
					type="submit"
					className="h-11 w-full font-medium"
					disabled={isSubmitting || isPending}
				>
					Send reset link
				</Button>

				<p className="pt-2 text-center text-sm text-muted-foreground">
					Remember your password?{' '}
					<Link
						to={`../${AUTH_ROUTES.LOGIN}`}
						className="font-medium text-foreground underline-offset-4 hover:underline"
					>
						Sign in
					</Link>
				</p>
			</form>
		</AuthLayout>
	)
}
