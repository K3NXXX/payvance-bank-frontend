import { cn } from 'cn'
import { LogOut } from 'lucide-react'
import { NavLink } from 'react-router-dom'

import { NAV_FOOTER_ITEMS, NAV_ITEMS } from '@/constants/navigation.constants'
import { useLogout } from '@/hooks/useLogout'

export default function Sidebar() {
	const { logOut, isPending } = useLogout()

	return (
		<aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-sidebar lg:sticky lg:top-0 lg:flex">
			<div className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border px-6">
				<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-sm font-bold text-background">
					P
				</div>

				<span className="text-lg font-semibold tracking-tight text-sidebar-foreground">Payvance</span>
			</div>

			<nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-4">
				{NAV_ITEMS.map((item) => (
					<NavLink
						key={item.label}
						to={item.href}
						end={item.href === '/'}
						className={({ isActive }) =>
							cn(
								'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
								isActive
									? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
									: 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
							)
						}
					>
						<item.icon className="size-4 shrink-0" />
						{item.label}
					</NavLink>
				))}
			</nav>

			<div className="mt-auto shrink-0 border-t border-sidebar-border p-4">
				{NAV_FOOTER_ITEMS.map((item) => (
					<NavLink
						key={item.label}
						to={item.href}
						className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
					>
						<item.icon className="size-4 shrink-0" />
						{item.label}
					</NavLink>
				))}

				<button
					type="button"
					disabled={isPending}
					onClick={() => logOut()}
					className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50"
				>
					<LogOut className="size-4 shrink-0" />
					Log out
				</button>
			</div>
		</aside>
	)
}
