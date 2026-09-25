import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { getAuthErrorMessage } from '@/lib/get-auth-error-message'
import { navigateToDashboard } from '@/lib/navigate-to-dashboard'
import { authService } from '@/services/auth.service'
import type { ISignupRequest } from '@/types/auth.types'
import { authToken } from '@payvance/auth-session'

export const useSignup = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const { mutate: signUp, isPending } = useMutation({
		mutationKey: ['signUp'],
		mutationFn: (data: ISignupRequest) => authService.signup(data),
		onSuccess: (data) => {
			if (!data.accessToken) {
				toast.error('Account setup is incomplete. Please try again.')
				return
			}

			authToken.set(data.accessToken)
			void queryClient.invalidateQueries({ queryKey: ['getMe'] })
			void queryClient.invalidateQueries({ queryKey: ['getCards'] })
			toast.success('Account created successfully')
			navigateToDashboard(navigate)
		},
		onError: (error: unknown) => {
			toast.error(getAuthErrorMessage(error))
		},
	})

	return { signUp, isPending }
}
