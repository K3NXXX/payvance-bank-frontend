import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.service'

export const useGetMe = () => {
	return useQuery({
		queryKey: ['getMe'],
		queryFn: () => userService.getMe(),
	})
}
