export const MOCK_USER = {
	name: 'John Doe',
	email: 'john.doe@example.com',
	initials: 'JD',
}

export const MOCK_BALANCE = {
	total: 24680.5,
	available: 24120.5,
	pending: 560,
	changePercent: 12.8,
	changeAmount: 2810.4,
}

export const MOCK_QUICK_ACTIONS = [
	{ label: 'Send', description: 'Transfer money' },
	{ label: 'Request', description: 'Get paid' },
	{ label: 'Top up', description: 'Add funds' },
	{ label: 'Exchange', description: 'Convert currency' },
] as const

export const MOCK_DEFAULT_CARD = {
	id: '1',
	type: 'Virtual' as const,
	label: 'Everyday',
	holder: 'John Doe',
	last4: '4821',
	expires: '09/29',
	balance: 0,
	currency: 'USD',
	theme: 'emerald' as const,
}

export const MOCK_CARDS = [
	MOCK_DEFAULT_CARD,
	{
		id: '2',
		type: 'Physical' as const,
		label: 'Premium',
		holder: 'John Doe',
		last4: '7392',
		expires: '12/28',
		balance: 5260,
		currency: 'USD',
		theme: 'cyan' as const,
	},
	{
		id: '3',
		type: 'Travel' as const,
		label: 'EUR Wallet',
		holder: 'John Doe',
		last4: '1044',
		expires: '03/30',
		balance: 1000,
		currency: 'EUR',
		theme: 'violet' as const,
	},
]

export const MOCK_STATS = [
	{ label: 'Income', value: 6200, change: '+8.2%', positive: true },
	{ label: 'Expenses', value: 1843, change: '-3.1%', positive: true },
	{ label: 'Savings rate', value: 24, suffix: '%', change: '+2.4%', positive: true },
	{ label: 'Investments', value: 8420, change: '+5.6%', positive: true },
] as const

export const MOCK_INSIGHTS = [
	{
		id: '1',
		title: 'You saved $240 more than last month',
		description: 'Your spending in Food dropped by 18%.',
	},
	{
		id: '2',
		title: 'Upcoming bill: Rent on Mar 15',
		description: '$1,450 will be charged from Primary Checking.',
	},
] as const

export const MOCK_ACCOUNTS = [
	{
		id: '1',
		name: 'Primary Checking',
		balance: 18420.5,
		currency: 'USD',
		lastActivity: 'Card purchase · 2h ago',
		accent: 'from-emerald-500/20 via-emerald-400/5 to-transparent',
		icon: 'checking',
	},
	{
		id: '2',
		name: 'Savings',
		balance: 5260,
		currency: 'USD',
		lastActivity: 'Interest earned · yesterday',
		accent: 'from-cyan-500/20 via-cyan-400/5 to-transparent',
		icon: 'savings',
	},
	{
		id: '3',
		name: 'Travel Wallet',
		balance: 1000,
		currency: 'EUR',
		lastActivity: 'FX conversion · 3d ago',
		accent: 'from-violet-500/20 via-violet-400/5 to-transparent',
		icon: 'travel',
	},
] as const

export const MOCK_TRANSACTIONS = [
	{
		id: '1',
		title: 'Apple Store',
		category: 'Shopping',
		amount: -129.99,
		date: 'Today, 2:14 PM',
	},
	{
		id: '2',
		title: 'Salary deposit',
		category: 'Income',
		amount: 4200,
		date: 'Yesterday',
	},
	{
		id: '3',
		title: 'Uber',
		category: 'Transport',
		amount: -18.4,
		date: 'Mar 11',
	},
	{
		id: '4',
		title: 'Whole Foods',
		category: 'Groceries',
		amount: -86.12,
		date: 'Mar 10',
	},
	{
		id: '5',
		title: 'Netflix',
		category: 'Subscriptions',
		amount: -15.99,
		date: 'Mar 9',
	},
] as const

export const MOCK_SPENDING = [
	{ category: 'Food', amount: 420, percent: 34 },
	{ category: 'Transport', amount: 180, percent: 15 },
	{ category: 'Shopping', amount: 310, percent: 25 },
	{ category: 'Bills', amount: 240, percent: 19 },
	{ category: 'Other', amount: 85, percent: 7 },
] as const

export const MOCK_CHART = [35, 42, 32, 55, 47, 62, 51, 74, 68, 84, 72, 96] as const
