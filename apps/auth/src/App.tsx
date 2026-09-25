import { GoogleOAuthProvider } from '@react-oauth/google'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'

import GuestOnly from '@/components/routing/GuestOnly'
import { AUTH_ROUTES } from './constants/pages.constants'
import './index.css'
import ForgotPassword from './pages/auth/ForgotPassword'
import Login from './pages/auth/Login'
import ResetPassword from './pages/auth/ResetPassword'
import Signup from './pages/auth/Signup'
import { QueryProvider } from './providers/QueryProvider'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

function App() {
	return (
		<GoogleOAuthProvider clientId={googleClientId}>
			<QueryProvider>
				<GuestOnly>
					<Routes>
						<Route path={AUTH_ROUTES.LOGIN} element={<Login />} />
						<Route path={AUTH_ROUTES.SIGNUP} element={<Signup />} />
						<Route path={AUTH_ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
						<Route path={AUTH_ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
					</Routes>
				</GuestOnly>

				<Toaster richColors position="top-right" />
			</QueryProvider>
		</GoogleOAuthProvider>
	)
}

export default App
