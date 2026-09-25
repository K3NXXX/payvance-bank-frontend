import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { getAuthErrorMessage } from '@/lib/get-auth-error-message'
import { authService } from '@/services/auth.service'
import type { IForgotPasswordRequest } from '@/types/auth.types'

export const useForgotPassword = () => {
	const { mutate: requestPasswordReset, isPending } = useMutation({
		mutationKey: ['forgotPassword'],
		mutationFn: (data: IForgotPasswordRequest) => authService.forgotPassword(data),
		onSuccess: () => {
			toast.success('Check your email', {
				description: 'If an account exists with that address, we sent a password reset link.',
			})
		},
		onError: (error: unknown) => {
			toast.error(getAuthErrorMessage(error))
		},
	})

	return { requestPasswordReset, isPending }
}
