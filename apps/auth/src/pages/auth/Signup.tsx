import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import AuthLayout from '@/components/auth/AuthLayout'
import GoogleSignInButton from '@/components/auth/GoogleSignInButton'
import TurnstileWidget from '@/components/auth/TurnstileWidget'
import { Button, FieldError, Input, Label, PasswordInput, Separator } from '@payvance/ui'
import { AUTH_ROUTES } from '@/constants/pages.constants'
import { useGoogleAuth } from '@/hooks/useGoogleAuth'
import { useResendVerification } from '@/hooks/useResendVerification'
import { useSendSignupCode } from '@/hooks/useSendSignupCode'
import { useSignup } from '@/hooks/useSignup'
import { useTurnstile } from '@/hooks/useTurnstile'
import { resolveTurnstileToken } from '@/lib/get-turnstile-token'
import { type SignupFormValues, signupSchema } from '@/schemas/signup.schema'
import { type VerifyEmailFormValues, verifyEmailSchema } from '@/schemas/verify-email.schema'

type SignupDraft = {
	fullName: string
	email: string
	password: string
}

export default function Signup() {
	const [step, setStep] = useState<'details' | 'code'>('details')
	const [signupDraft, setSignupDraft] = useState<SignupDraft | null>(null)
	const { sendSignupCode, isPending: isSendingCode } = useSendSignupCode()
	const { signUp, isPending: isSigningUp } = useSignup()
	const { resendCode, isPending: isResending } = useResendVerification()
	const { signInWithGoogle, isPending: isGooglePending } = useGoogleAuth()
	const detailsTurnstile = useTurnstile()
	const codeTurnstile = useTurnstile()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			fullName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		mode: 'onBlur',
	})

	const {
		register: registerCode,
		handleSubmit: handleCodeSubmit,
		formState: { errors: codeErrors, isSubmitting: isSubmittingCode },
	} = useForm<VerifyEmailFormValues>({
		resolver: zodResolver(verifyEmailSchema),
		defaultValues: { code: '' },
	})

	const onSubmitDetails = async (values: SignupFormValues) => {
		const turnstileToken = await resolveTurnstileToken(detailsTurnstile)

		if (detailsTurnstile.isRequired && !turnstileToken) {
			return
		}

		const draft: SignupDraft = {
			fullName: values.fullName,
			email: values.email,
			password: values.password,
		}

		sendSignupCode(
			{ email: values.email, turnstileToken },
			{
				onSuccess: () => {
					setSignupDraft(draft)
					setStep('code')
					detailsTurnstile.reset()
				},
				onSettled: () => detailsTurnstile.reset(),
			},
		)
	}

	const onSubmitCode = async (values: VerifyEmailFormValues) => {
		if (!signupDraft) {
			return
		}

		const turnstileToken = await resolveTurnstileToken(codeTurnstile)

		if (codeTurnstile.isRequired && !turnstileToken) {
			return
		}

		signUp(
			{
				fullName: signupDraft.fullName,
				email: signupDraft.email,
				password: signupDraft.password,
				code: values.code,
				turnstileToken,
			},
			{
				onSettled: () => codeTurnstile.reset(),
			},
		)
	}

	if (step === 'code' && signupDraft) {
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
					<h2 className="text-3xl font-semibold tracking-tight">Verify your email</h2>

					<p className="text-sm text-muted-foreground">
						We sent a 6-digit code to{' '}
						<span className="font-medium text-foreground">{signupDraft.email}</span>. Enter it below
						to finish creating your account.
					</p>
				</div>

				<form className="mt-8 space-y-5" onSubmit={handleCodeSubmit(onSubmitCode)} noValidate>
					<div className="flex flex-col gap-1">
						<Label htmlFor="verification-code">Verification code</Label>

						<Input
							id="verification-code"
							type="text"
							inputMode="numeric"
							autoComplete="one-time-code"
							placeholder="000000"
							maxLength={6}
							className="h-11 text-center text-lg tracking-[0.4em]"
							aria-invalid={Boolean(codeErrors.code)}
							{...registerCode('code')}
						/>

						<FieldError message={codeErrors.code?.message} />
					</div>

					{codeTurnstile.isRequired ? (
						<TurnstileWidget
							siteKey={codeTurnstile.siteKey}
							turnstileRef={codeTurnstile.ref}
							onWidgetLoad={codeTurnstile.onWidgetLoad}
							onSuccess={codeTurnstile.onSuccess}
							onExpire={codeTurnstile.onExpire}
							onError={codeTurnstile.onError}
						/>
					) : null}

					<Button
						type="submit"
						className="h-11 w-full font-medium"
						disabled={isSubmittingCode || isSigningUp}
					>
						Create account
					</Button>

					<p className="text-center text-sm text-muted-foreground">
						Didn't receive the code?{' '}
						<button
							type="button"
							className="font-medium text-foreground underline-offset-4 hover:underline disabled:opacity-50"
							disabled={isResending}
							onClick={async () => {
								const turnstileToken = await resolveTurnstileToken(codeTurnstile)

								if (codeTurnstile.isRequired && !turnstileToken) {
									return
								}

								resendCode(
									{ email: signupDraft.email, turnstileToken },
									{
										onSettled: () => codeTurnstile.reset(),
									},
								)
							}}
						>
							Resend code
						</button>
					</p>

					<button
						type="button"
						className="block w-full text-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
						onClick={() => {
							setStep('details')
							setSignupDraft(null)
						}}
					>
						Back to sign up
					</button>
				</form>
			</AuthLayout>
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
				<h2 className="text-3xl font-semibold tracking-tight">Create your account</h2>

				<p className="text-sm text-muted-foreground">
					Join Payvance and take control of your finances.
				</p>
			</div>

			<form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmitDetails)} noValidate>
				<GoogleSignInButton
					disabled={isGooglePending}
					onSuccess={signInWithGoogle}
					onError={() => toast.error('Google sign-in failed')}
				/>

				<div className="flex items-center gap-4 py-1">
					<Separator className="flex-1" />

					<span className="text-xs font-medium text-muted-foreground">OR</span>

					<Separator className="flex-1" />
				</div>

				<div className="flex flex-col gap-1">
					<Label htmlFor="fullName">Full name</Label>

					<Input
						id="fullName"
						type="text"
						placeholder="John Doe"
						autoComplete="name"
						className="h-11"
						aria-invalid={Boolean(errors.fullName)}
						{...register('fullName')}
					/>

					<FieldError message={errors.fullName?.message} />
				</div>

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

				<div className="grid gap-4 sm:grid-cols-2">
					<div className="flex flex-col gap-1">
						<Label htmlFor="password">Password</Label>

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
				</div>

				<p className="text-xs text-muted-foreground">
					Use at least 8 characters with a mix of letters and numbers.
				</p>

				{detailsTurnstile.isRequired ? (
					<TurnstileWidget
						siteKey={detailsTurnstile.siteKey}
						turnstileRef={detailsTurnstile.ref}
						onWidgetLoad={detailsTurnstile.onWidgetLoad}
						onSuccess={detailsTurnstile.onSuccess}
						onExpire={detailsTurnstile.onExpire}
						onError={detailsTurnstile.onError}
					/>
				) : null}

				<Button
					type="submit"
					className="h-11 w-full font-medium"
					disabled={isSubmitting || isSendingCode || isGooglePending}
				>
					Continue
				</Button>

				<p className="pt-2 text-center text-sm text-muted-foreground">
					Already have an account?{' '}
					<Link
						to={`../${AUTH_ROUTES.LOGIN}`}
						className="font-medium text-foreground underline-offset-4 hover:underline"
					>
						Sign in
					</Link>
				</p>

				<p className="pt-8 text-center text-xs leading-5 text-muted-foreground">
					By creating an account, you agree to our{' '}
					<button type="button" className="underline underline-offset-2 hover:text-foreground">
						Terms of Service
					</button>{' '}
					and{' '}
					<button type="button" className="underline underline-offset-2 hover:text-foreground">
						Privacy Policy
					</button>
					.
				</p>
			</form>
		</AuthLayout>
	)
}
