import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { getAuthErrorMessage } from '@/lib/get-auth-error-message'
import { authToken } from '@payvance/auth-session'
import { navigateToDashboard } from '@/lib/navigate-to-dashboard'
import { authService } from '@/services/auth.service'

export const useGoogleAuth = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const { mutate: signInWithGoogle, isPending } = useMutation({
		mutationKey: ['googleAuth'],
		mutationFn: (credential: string) => authService.googleAuth({ credential }),
		onSuccess: (data) => {
			authToken.set(data.accessToken)
			void queryClient.invalidateQueries({ queryKey: ['getMe'] })
			void queryClient.invalidateQueries({ queryKey: ['getCards'] })
			toast.success('Signed in successfully')
			navigateToDashboard(navigate)
		},
		onError: (error: unknown) => {
			toast.error(getAuthErrorMessage(error))
		},
	})

	return { signInWithGoogle, isPending }
}
