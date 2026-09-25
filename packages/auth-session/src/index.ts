const STORAGE_KEY = 'payvance_access_token'

export const APP_ROUTES = {
	LOGIN: '/auth/login',
	SIGNUP: '/auth/sign-up',
	FORGOT_PASSWORD: '/auth/forgot-password',
	RESET_PASSWORD: '/auth/reset-password',
	DASHBOARD: '/dashboard',
} as const

export const authToken = {
	get: () => sessionStorage.getItem(STORAGE_KEY),
	set: (token: string) => {
		sessionStorage.setItem(STORAGE_KEY, token)
	},
	clear: () => {
		sessionStorage.removeItem(STORAGE_KEY)
	},
}

export const isAuthenticated = () => Boolean(authToken.get())
