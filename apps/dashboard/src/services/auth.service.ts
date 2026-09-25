import { axiosInstance } from './axios.instance'

class AuthService {
	private BASE_URL = '/auth'

	async logout(): Promise<void> {
		await axiosInstance.post(`${this.BASE_URL}/logout`)
	}
}

export const authService = new AuthService()
