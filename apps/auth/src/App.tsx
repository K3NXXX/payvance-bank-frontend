import { Route, Routes } from 'react-router-dom'
import { AUTH_ROUTES } from './constants/pages.constants'
import './index.css'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'

function App() {
	return (
		<Routes>
			<Route path={AUTH_ROUTES.LOGIN} element={<Login />} />
			<Route path={AUTH_ROUTES.SIGNUP} element={<Signup />} />
		</Routes>
	)
}

export default App