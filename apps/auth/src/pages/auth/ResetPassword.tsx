import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import AuthLayout from '@/components/auth/AuthLayout'
import TurnstileWidget from '@/components/auth/TurnstileWidget'
import { Button, FieldError, Label, PasswordInput } from '@payvance/ui'
import { AUTH_ROUTES } from '@/constants/pages.constants'
import { useResetPassword } from '@/hooks/useResetPassword'
import { useTurnstile } from '@/hooks/useTurnstile'
import { resolveTurnstileToken } from '@/lib/get-turnstile-token'
import {
	type ResetPasswordFormValues,
	resetPasswordSchema,
} from '@/schemas/reset-password.schema'

export default function ResetPassword() {
	const [searchParams] = useSearchParams()
	const token = searchParams.get('token') ?? ''
	const { resetPassword, isPending } = useResetPassword()
	const turnstile = useTurnstile()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ResetPasswordFormValues>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
		mode: 'onBlur',
	})

	const onSubmit = async (values: ResetPasswordFormValues) => {
		if (!token) {
			toast.error('Reset link is invalid. Request a new one.')
			return
		}

		const turnstileToken = await resolveTurnstileToken(turnstile)

		if (turnstile.isRequired && !turnstileToken) {
			return
		}

		resetPassword(
			{
				token,
				password: values.password,
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
				<h2 className="text-3xl font-semibold tracking-tight">Choose a new password</h2>

				<p className="text-sm text-muted-foreground">
					Enter your new password below to finish resetting your account.
				</p>
			</div>

			<form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="flex flex-col gap-1">
					<Label htmlFor="password">New password</Label>

					<PasswordInput
						id="password"
						placeholder="••••••••"
						autoComplete="new-password"
						className="h-11"
						aria-invalid={Boolean(errors.password)}
						{...register('password')}
					/>

					<FieldError message={errors.password?.message} />
				</div>

				<div className="flex flex-col gap-1">
					<Label htmlFor="confirmPassword">Confirm password</Label>

					<PasswordInput
						id="confirmPassword"
						placeholder="••••••••"
						autoComplete="new-password"
						className="h-11"
						aria-invalid={Boolean(errors.confirmPassword)}
						{...register('confirmPassword')}
					/>

					<FieldError message={errors.confirmPassword?.message} />
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
					disabled={isSubmitting || isPending || !token}
				>
					Update password
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
