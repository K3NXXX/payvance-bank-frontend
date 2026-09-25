import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { AUTH_ROUTES } from '@/constants/pages.constants'
import { getAuthErrorMessage } from '@/lib/get-auth-error-message'
import { authService } from '@/services/auth.service'
import type { IResetPasswordRequest } from '@/types/auth.types'

export const useResetPassword = () => {
	const navigate = useNavigate()

	const { mutate: resetPassword, isPending } = useMutation({
		mutationKey: ['resetPassword'],
		mutationFn: (data: IResetPasswordRequest) => authService.resetPassword(data),
		onSuccess: () => {
			toast.success('Password updated successfully')
			navigate(`../${AUTH_ROUTES.LOGIN}`, { replace: true })
		},
		onError: (error: unknown) => {
			toast.error(getAuthErrorMessage(error))
		},
	})

	return { resetPassword, isPending }
}
