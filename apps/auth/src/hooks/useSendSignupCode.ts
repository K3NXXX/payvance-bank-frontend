import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { getAuthErrorMessage } from '@/lib/get-auth-error-message'
import { authService } from '@/services/auth.service'
import type { ISendSignupCodeRequest } from '@/types/auth.types'

export const useSendSignupCode = () => {
	const { mutate: sendSignupCode, isPending } = useMutation({
		mutationKey: ['sendSignupCode'],
		mutationFn: (data: ISendSignupCodeRequest) => authService.sendSignupCode(data),
		onSuccess: () => {
			toast.success('Verification code sent to your email')
		},
		onError: (error: unknown) => {
			toast.error(getAuthErrorMessage(error))
		},
	})

	return { sendSignupCode, isPending }
}
