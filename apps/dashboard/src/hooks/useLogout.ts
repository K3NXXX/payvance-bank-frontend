import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { authToken } from '@payvance/auth-session'
import { resetAppState, useAppDispatch } from '@payvance/store'
import { navigateToLogin } from '@/lib/navigate-to-login'
import { authService } from '@/services/auth.service'

export const useLogout = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const dispatch = useAppDispatch()

	const { mutate: logOut, isPending } = useMutation({
		mutationKey: ['logOut'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			authToken.clear()
			dispatch(resetAppState())
			queryClient.clear()
			toast.success('Signed out successfully')
			navigateToLogin(navigate)
		},
		onError: () => {
			authToken.clear()
			dispatch(resetAppState())
			queryClient.clear()
			navigateToLogin(navigate)
		},
	})

	return { logOut, isPending }
}
