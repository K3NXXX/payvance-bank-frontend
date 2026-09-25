import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { getAuthErrorMessage } from '@/lib/get-auth-error-message'
import { authService } from '@/services/auth.service'
import type { IResendVerificationRequest } from '@/types/auth.types'

export const useResendVerification = () => {
	const { mutate: resendCode, isPending } = useMutation({
		mutationKey: ['resendVerification'],
		mutationFn: (data: IResendVerificationRequest) => authService.resendVerification(data),
		onSuccess: () => {
			toast.success('Verification code sent')
		},
		onError: (error: unknown) => {
			toast.error(getAuthErrorMessage(error))
		},
	})

	return { resendCode, isPending }
}
