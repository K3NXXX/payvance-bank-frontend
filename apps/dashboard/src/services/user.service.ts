import type { IUser } from '@/types/user.types'
import { axiosInstance } from './axios.instance'

class UserService {
	private BASE_URL = '/auth'

	async getMe(): Promise<IUser> {
		const { data } = await axiosInstance.get<IUser>(`${this.BASE_URL}/me`)

		return data
	}
}

export const userService = new UserService()
