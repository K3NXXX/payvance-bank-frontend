import type { NavigateFunction } from 'react-router-dom'

import { APP_ROUTES } from '@payvance/auth-session'

const AUTH_DEV_PORT = '3001'
const DEFAULT_SHELL_URL = 'http://localhost:3000'

export function navigateToDashboard(navigate: NavigateFunction) {
	const shellUrl = import.meta.env.VITE_SHELL_URL ?? DEFAULT_SHELL_URL

	if (window.location.port === AUTH_DEV_PORT) {
		window.location.href = `${shellUrl}${APP_ROUTES.DASHBOARD}`
		return
	}

	navigate(APP_ROUTES.DASHBOARD, { replace: true })
}
