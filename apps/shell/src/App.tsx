import { APP_ROUTES, isAuthenticated } from '@payvance/auth-session'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import GuestRoute from '@/components/routing/GuestRoute'
import ProtectedRoute from '@/components/routing/ProtectedRoute'
import { PAGES } from '@/constants/pages.constants'
import AuthBootstrap from '@/providers/AuthBootstrap'

const AuthApp = lazy(() => import('auth/AuthApp'))
const DashboardApp = lazy(() => import('dashboard/DashboardApp'))



function App() {
	if (import.meta.env.DEV && new URLSearchParams(window.location.search).has('sentry')) {
		throw new Error('Sentry test — render')
	  }
	return (
		<AuthBootstrap>
			<Routes>
				<Route
					path='/'
					element={
						<Navigate
							to={isAuthenticated() ? APP_ROUTES.DASHBOARD : APP_ROUTES.LOGIN}
							replace
						/>
					}
				/>

				<Route element={<GuestRoute />}>
					<Route
						path={PAGES.AUTH}
						element={
							<Suspense fallback={<div>Loading...</div>}>
								<AuthApp />
							</Suspense>
						}
					/>
				</Route>

				<Route element={<ProtectedRoute />}>
					<Route
						path={PAGES.DASHBOARD}
						element={
							<Suspense fallback={<div>Loading...</div>}>
								<DashboardApp />
							</Suspense>
						}
					/>
				</Route>

				<Route
					path='*'
					element={
						<Navigate
							to={isAuthenticated() ? APP_ROUTES.DASHBOARD : APP_ROUTES.LOGIN}
							replace
						/>
					}
				/>
			</Routes>
		</AuthBootstrap>
	)
}

export default App
