import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'

import ProtectedOnly from '@/components/routing/ProtectedOnly'
import DashboardLayout from './components/layout/DashboardLayout'
import { DASHBOARD_ROUTES } from './constants/pages.constants'
import './index.css'
import Home from './pages/Home'
import { QueryProvider } from './providers/QueryProvider'

function App() {
	return (
		<QueryProvider>
			<ProtectedOnly>
				<Routes>
					<Route element={<DashboardLayout />}>
						<Route path={DASHBOARD_ROUTES.HOME} element={<Home />} />
					</Route>
				</Routes>
			</ProtectedOnly>

			<Toaster richColors position="top-right" />
		</QueryProvider>
	)
}

export default App
