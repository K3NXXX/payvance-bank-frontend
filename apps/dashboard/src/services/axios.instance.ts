import { APP_ROUTES, authToken } from '@payvance/auth-session'
import axios from 'axios'

import { API_BASE_URL } from '@/constants/api.constants'

export const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
	const token = authToken.get()

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (axios.isAxiosError(error) && error.response?.status === 401) {
			authToken.clear()

			if (window.location.pathname.startsWith('/dashboard')) {
				window.location.assign(APP_ROUTES.LOGIN)
			}
		}

		return Promise.reject(error)
	},
)
