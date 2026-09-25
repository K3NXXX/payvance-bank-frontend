import { APP_ROUTES, isAuthenticated } from '@payvance/auth-session'
import { Navigate } from 'react-router-dom'

const DASHBOARD_DEV_PORT = '3002'
const DEFAULT_SHELL_URL = 'http://localhost:3000'

export default function ProtectedOnly({ children }: { children: React.ReactNode }) {
	if (isAuthenticated()) {
		return children
	}

	if (window.location.port === DASHBOARD_DEV_PORT) {
		const shellUrl = import.meta.env.VITE_SHELL_URL ?? DEFAULT_SHELL_URL
		window.location.href = `${shellUrl}${APP_ROUTES.LOGIN}`
		return null
	}

	return <Navigate to={APP_ROUTES.LOGIN} replace />
}
