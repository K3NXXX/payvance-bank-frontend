import { APP_ROUTES, isAuthenticated } from '@payvance/auth-session'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
	if (!isAuthenticated()) {
		return <Navigate to={APP_ROUTES.LOGIN} replace />
	}

	return <Outlet />
}
