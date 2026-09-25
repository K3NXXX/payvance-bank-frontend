import { APP_ROUTES, isAuthenticated } from '@payvance/auth-session'
import { Navigate } from 'react-router-dom'

const AUTH_DEV_PORT = '3001'
const DEFAULT_SHELL_URL = 'http://localhost:3000'

export default function GuestOnly({ children }: { children: React.ReactNode }) {
	if (!isAuthenticated()) {
		return children
	}

	if (window.location.port === AUTH_DEV_PORT) {
		const shellUrl = import.meta.env.VITE_SHELL_URL ?? DEFAULT_SHELL_URL
		window.location.href = `${shellUrl}${APP_ROUTES.DASHBOARD}`
		return null
	}

	return <Navigate to={APP_ROUTES.DASHBOARD} replace />
}
