import {
	ArrowLeftRight,
	CreditCard,
	HelpCircle,
	LayoutDashboard,
	Receipt,
	Settings,
	Wallet,
} from 'lucide-react'

export const NAV_ITEMS = [
	{ label: 'Overview', href: '/', icon: LayoutDashboard },
	{ label: 'Accounts', href: '/accounts', icon: Wallet },
	{ label: 'Transactions', href: '/transactions', icon: Receipt },
	{ label: 'Payments', href: '/payments', icon: ArrowLeftRight },
	{ label: 'Cards', href: '/cards', icon: CreditCard },
] as const

export const NAV_FOOTER_ITEMS = [
	{ label: 'Settings', href: '/settings', icon: Settings },
	{ label: 'Help', href: '/help', icon: HelpCircle },
] as const
