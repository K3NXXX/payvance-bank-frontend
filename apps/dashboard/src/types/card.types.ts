export type CardTheme = 'emerald' | 'cyan' | 'violet'

export type BankCardData = {
	id: string
	type: 'Virtual' | 'Physical' | 'Travel'
	label: string
	holder: string
	last4: string
	expires: string
	balance: number
	currency: string
	theme: CardTheme
}
