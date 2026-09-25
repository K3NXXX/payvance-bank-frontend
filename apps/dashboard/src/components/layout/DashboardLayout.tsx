import { Outlet } from 'react-router-dom'

import Header from './Header'
import Sidebar from './Sidebar'

export default function DashboardLayout() {
	return (
		<div className="flex min-h-screen bg-[linear-gradient(180deg,#f8faf9_0%,#f4f6f5_100%)] dark:bg-background">
			<Sidebar />

			<div className="flex min-w-0 flex-1 flex-col">
				<Header />

				<main className="flex-1 p-4 lg:p-8">
					<Outlet />
				</main>
			</div>
		</div>
	)
}
