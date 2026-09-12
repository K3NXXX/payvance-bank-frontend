import { zodResolver } from '@hookform/resolvers/zod'
import { FaGoogle } from 'react-icons/fa6'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import AuthLayout from '@/components/auth/AuthLayout'
import { Button } from '@/components/ui/button'
import { FieldError } from '@/components/ui/field-error'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { AUTH_ROUTES } from '@/constants/pages.constants'
import {
	type SignupFormValues,
	signupSchema,
} from '@/schemas/signup.schema'

export default function Signup() {
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

	const onSubmit = (values: SignupFormValues) => {
		console.log(values)
	}

	return (
		<AuthLayout>
			<div className='mb-10 lg:hidden'>
				<div className='flex items-center gap-2'>
					<div className='flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-sm font-bold text-background'>
						P
					</div>

					<span className='text-lg font-semibold tracking-tight'>Payvance</span>
				</div>
			</div>

			<div className='space-y-2'>
				<h2 className='text-3xl font-semibold tracking-tight'>
					Create your account
				</h2>

				<p className='text-sm text-muted-foreground'>
					Join Payvance and take control of your finances.
				</p>
			</div>

			<form className='mt-8 space-y-5' onSubmit={handleSubmit(onSubmit)} noValidate>
				<Button
					type='button'
					variant='outline'
					className='h-11 w-full gap-3 font-medium'
				>
					<FaGoogle className='size-4' />
					Continue with Google
				</Button>

				<div className='flex items-center gap-4 py-1'>
					<Separator className='flex-1' />

					<span className='text-xs font-medium text-muted-foreground'>OR</span>

					<Separator className='flex-1' />
				</div>

				<div className='flex flex-col gap-1'>
					<Label htmlFor='fullName'>Full name</Label>

					<Input
						id='fullName'
						type='text'
						placeholder='John Doe'
						autoComplete='name'
						className='h-11'
						aria-invalid={Boolean(errors.fullName)}
						{...register('fullName')}
					/>

					<FieldError message={errors.fullName?.message} />
				</div>

				<div className='flex flex-col gap-1'>
					<Label htmlFor='email'>Email</Label>

					<Input
						id='email'
						type='email'
						placeholder='you@example.com'
						autoComplete='email'
						className='h-11'
						aria-invalid={Boolean(errors.email)}
						{...register('email')}
					/>

					<FieldError message={errors.email?.message} />
				</div>

				<div className='grid gap-4 sm:grid-cols-2'>
					<div className='flex flex-col gap-1'>
						<Label htmlFor='password'>Password</Label>

						<Input
							id='password'
							type='password'
							placeholder='••••••••'
							autoComplete='new-password'
							className='h-11'
							aria-invalid={Boolean(errors.password)}
							{...register('password')}
						/>

						<FieldError message={errors.password?.message} />
					</div>

					<div className='flex flex-col gap-1'>
						<Label htmlFor='confirmPassword'>Confirm password</Label>

						<Input
							id='confirmPassword'
							type='password'
							placeholder='••••••••'
							autoComplete='new-password'
							className='h-11'
							aria-invalid={Boolean(errors.confirmPassword)}
							{...register('confirmPassword')}
						/>

						<FieldError message={errors.confirmPassword?.message} />
					</div>
				</div>

				<p className='text-xs text-muted-foreground'>
					Use at least 8 characters with a mix of letters and numbers.
				</p>

				<Button
					type='submit'
					className='h-11 w-full font-medium'
					disabled={isSubmitting}
				>
					Create account
				</Button>

				<p className='pt-2 text-center text-sm text-muted-foreground'>
					Already have an account?{' '}
					<Link
						to={`../${AUTH_ROUTES.LOGIN}`}
						className='font-medium text-foreground underline-offset-4 hover:underline'
					>
						Sign in
					</Link>
				</p>

				<p className='pt-8 text-center text-xs leading-5 text-muted-foreground'>
					By creating an account, you agree to our{' '}
					<button
						type='button'
						className='underline underline-offset-2 hover:text-foreground'
					>
						Terms of Service
					</button>{' '}
					and{' '}
					<button
						type='button'
						className='underline underline-offset-2 hover:text-foreground'
					>
						Privacy Policy
					</button>
					.
				</p>
			</form>
		</AuthLayout>
	)
}
