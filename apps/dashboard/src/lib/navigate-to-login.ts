import type { NavigateFunction } from 'react-router-dom'

import { APP_ROUTES } from '@payvance/auth-session'

const DASHBOARD_DEV_PORT = '3002'
const DEFAULT_SHELL_URL = 'http://localhost:3000'

export function navigateToLogin(navigate: NavigateFunction) {
	const shellUrl = import.meta.env.VITE_SHELL_URL ?? DEFAULT_SHELL_URL

	if (window.location.port === DASHBOARD_DEV_PORT) {
		window.location.href = `${shellUrl}${APP_ROUTES.LOGIN}`
		return
	}

	navigate(APP_ROUTES.LOGIN, { replace: true })
}
