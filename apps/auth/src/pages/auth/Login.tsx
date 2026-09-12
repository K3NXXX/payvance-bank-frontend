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
import { type LoginFormValues, loginSchema } from '@/schemas/login.schema'

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onBlur',
	})

	const onSubmit = (values: LoginFormValues) => {
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
				<h2 className='text-3xl font-semibold tracking-tight'>Welcome back</h2>

				<p className='text-sm text-muted-foreground'>
					Sign in to your Payvance account.
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

				<div className='flex flex-col gap-1'>
					<div className='flex items-center justify-between'>
						<Label htmlFor='password'>Password</Label>

						<button
							type='button'
							className='text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline'
						>
							Forgot password?
						</button>
					</div>

					<Input
						id='password'
						type='password'
						placeholder='••••••••'
						autoComplete='current-password'
						className='h-11'
						aria-invalid={Boolean(errors.password)}
						{...register('password')}
					/>

					<FieldError message={errors.password?.message} />
				</div>

				<Button
					type='submit'
					className='h-11 w-full font-medium'
					disabled={isSubmitting}
				>
					Sign in
				</Button>

				<p className='pt-2 text-center text-sm text-muted-foreground'>
					Don't have an account?{' '}
					<Link
						to={`../${AUTH_ROUTES.SIGNUP}`}
						className='font-medium text-foreground underline-offset-4 hover:underline'
					>
						Create account
					</Link>
				</p>
			</form>
		</AuthLayout>
	)
}
