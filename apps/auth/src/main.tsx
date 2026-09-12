import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { AUTH_ROUTES } from './constants/pages.constants.ts'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter basename={AUTH_ROUTES.STANDALONE_BASENAME}>
			<App />
		</BrowserRouter>
	</StrictMode>,
)
