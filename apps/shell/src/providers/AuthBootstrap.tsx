import { authToken } from '@payvance/auth-session'
import axios from 'axios'
import { useEffect, useState } from 'react'

import { API_BASE_URL } from '@/constants/api.constants'

export default function AuthBootstrap({ children }: { children: React.ReactNode }) {
	const [isReady, setIsReady] = useState(() => Boolean(authToken.get()))

	useEffect(() => {
		if (authToken.get()) {
			setIsReady(true)
			return
		}

		axios
			.post<{ accessToken: string }>(`${API_BASE_URL}/auth/refresh`, {}, { withCredentials: true })
			.then((response) => {
				authToken.set(response.data.accessToken)
			})
			.catch(() => {
				authToken.clear()
			})
			.finally(() => {
				setIsReady(true)
			})
	}, [])

	if (!isReady) {
		return <div>Loading...</div>
	}

	return children
}
