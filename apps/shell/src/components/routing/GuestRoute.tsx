import { APP_ROUTES, isAuthenticated } from '@payvance/auth-session'
import { Navigate, Outlet } from 'react-router-dom'

export default function GuestRoute() {
	if (isAuthenticated()) {
		return <Navigate to={APP_ROUTES.DASHBOARD} replace />
	}

	return <Outlet />
}
