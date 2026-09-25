import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from '@payvance/store'
import App from './App.tsx'
import { DASHBOARD_ROUTES } from './constants/pages.constants.ts'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter basename={DASHBOARD_ROUTES.STANDALONE_BASENAME}>
			<StoreProvider>
				<App />
			</StoreProvider>
		</BrowserRouter>
	</StrictMode>,
)
