import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PAGES } from './constants/pages.constants'

const AuthApp = lazy(() => import('auth/AuthApp'))

function App() {
	return (
		<Routes>
			<Route index element={<Navigate to='/auth' replace />} />
			<Route
				path={PAGES.AUTH}
				element={
					<Suspense fallback={<div>Loading...</div>}>
						<AuthApp />
					</Suspense>
				}
			/>
		</Routes>
	)
}

export default App
