import * as React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from 'cn'

import { Input } from './input'

const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
	({ className, ...props }, ref) => {
		const [showPassword, setShowPassword] = React.useState(false)

		return (
			<div className="relative w-full">
				<Input
					ref={ref}
					type={showPassword ? 'text' : 'password'}
					className={cn('pr-10', className)}
					{...props}
				/>

				<button
					type="button"
					onClick={() => setShowPassword((current) => !current)}
					className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition-colors hover:text-foreground"
					aria-label={showPassword ? 'Hide password' : 'Show password'}
				>
					{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
				</button>
			</div>
		)
	},
)

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
