import { useMemo, useState } from 'react'
import { Bell, CreditCard, Eye, EyeOff, Menu, Search } from 'lucide-react'
import {
	markAllNotificationsRead,
	selectActiveCardId,
	selectHideBalances,
	selectNotifications,
	selectUnreadNotificationsCount,
	toggleHideBalances,
	useAppDispatch,
	useAppSelector,
} from '@payvance/store'

import { Button, Input } from '@payvance/ui'
import { useGetCards } from '@/hooks/useGetCards'
import { useGetMe } from '@/hooks/useGetMe'
import { getUserInitials } from '@/lib/get-user-initials'

export default function Header() {
	const dispatch = useAppDispatch()
	const [notificationsOpen, setNotificationsOpen] = useState(false)
	const { data: user, isLoading } = useGetMe()
	const { data: cards = [] } = useGetCards()
	const activeCardId = useAppSelector(selectActiveCardId)
	const hideBalances = useAppSelector(selectHideBalances)
	const notifications = useAppSelector(selectNotifications)
	const unreadCount = useAppSelector(selectUnreadNotificationsCount)

	const activeCard = useMemo(() => {
		if (!activeCardId) {
			return null
		}

		return cards.find((item) => item.id === activeCardId) ?? null
	}, [activeCardId, cards])

	return (
		<header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-border/70 bg-background/85 px-4 backdrop-blur-xl lg:px-8">
			<div className="flex min-w-0 flex-1 items-center gap-3">
				<Button type="button" variant="ghost" size="icon" className="shrink-0 rounded-xl lg:hidden">
					<Menu className="size-5" />
				</Button>

				<div className="relative hidden min-w-0 flex-1 lg:block">
					<Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground/70" />

					<Input
						type="search"
						placeholder="Search transactions, contacts..."
						className="h-10 w-full max-w-md rounded-xl border-border/60 bg-muted/35 pl-10 shadow-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-emerald-500/30 focus-visible:bg-background focus-visible:ring-emerald-500/15"
					/>
				</div>

				{activeCard ? (
					<div
						className="hidden shrink-0 items-center gap-2 rounded-full border border-border/60 bg-muted/25 px-3 py-1.5 lg:flex"
						title="Active card"
					>
						<CreditCard className="size-3.5 text-muted-foreground" aria-hidden />
						<span className="max-w-[8rem] truncate text-xs font-medium text-foreground">
							{activeCard.label}
						</span>
						<span className="text-xs text-muted-foreground/80" aria-hidden>
							·
						</span>
						<span className="font-mono text-xs tabular-nums text-muted-foreground">
							{activeCard.last4}
						</span>
					</div>
				) : null}
			</div>

			<div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="rounded-xl hover:bg-muted/50"
					aria-label={hideBalances ? 'Show balances' : 'Hide balances'}
					aria-pressed={hideBalances}
					onClick={() => dispatch(toggleHideBalances())}
				>
					{hideBalances ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
				</Button>

				<div className="relative">
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="relative rounded-xl hover:bg-muted/50"
						aria-label="Notifications"
						aria-expanded={notificationsOpen}
						onClick={() => setNotificationsOpen((open) => !open)}
					>
						<Bell className="size-4" />
						{unreadCount > 0 ? (
							<span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-bold text-white ring-2 ring-background">
								{unreadCount > 9 ? '9+' : unreadCount}
							</span>
						) : null}
					</Button>

					{notificationsOpen ? (
						<div className="absolute top-full right-0 z-30 mt-2 w-80 rounded-2xl border border-border/70 bg-background p-3 shadow-xl">
							<div className="mb-2 flex items-center justify-between gap-2 px-1">
								<p className="text-sm font-semibold">Notifications</p>
								{unreadCount > 0 ? (
									<button
										type="button"
										className="text-xs font-medium text-emerald-600 hover:underline dark:text-emerald-400"
										onClick={() => dispatch(markAllNotificationsRead())}
									>
										Mark all read
									</button>
								) : null}
							</div>

							{notifications.length === 0 ? (
								<p className="px-1 py-6 text-center text-sm text-muted-foreground">
									No notifications yet
								</p>
							) : (
								<ul className="max-h-72 space-y-2 overflow-y-auto">
									{notifications.map((item) => (
										<li
											key={item.id}
											className={`rounded-xl border px-3 py-2.5 ${
												item.read
													? 'border-border/50 bg-muted/20'
													: 'border-emerald-500/20 bg-emerald-500/5'
											}`}
										>
											<p className="text-sm font-medium">{item.title}</p>
											<p className="mt-0.5 text-xs text-muted-foreground">{item.message}</p>
										</li>
									))}
								</ul>
							)}
						</div>
					) : null}
				</div>

				<button
					type="button"
					className="flex max-w-[220px] items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-muted/50 sm:max-w-none"
				>
					<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-foreground text-xs font-bold text-background">
						{isLoading ? '…' : getUserInitials(user?.fullName ?? 'U')}
					</div>

					<div className="hidden min-w-0 text-left sm:block">
						<p className="truncate text-sm font-medium leading-none tracking-tight">
							{isLoading ? 'Loading…' : (user?.fullName ?? 'User')}
						</p>
						<p className="mt-1 truncate text-xs text-muted-foreground">
							{isLoading ? '…' : (user?.email ?? '')}
						</p>
					</div>
				</button>
			</div>
		</header>
	)
}
