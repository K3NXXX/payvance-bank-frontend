import axios from 'axios'

import { API_BASE_URL } from '@/constants/api.constants'
import { authToken } from '@payvance/auth-session'

export const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
	transformResponse: [
		(data: string) => {
			if (!data) {
				return null
			}

			try {
				return JSON.parse(data) as unknown
			} catch {
				return data
			}
		},
	],
})

axiosInstance.interceptors.request.use((config) => {
	const token = authToken.get()

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})
