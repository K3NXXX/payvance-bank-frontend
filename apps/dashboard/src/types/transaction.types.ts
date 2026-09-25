import type { BankCardData } from './card.types'

export type CardTransaction = {
	id: string
	cardId: string
	title: string
	category: string
	amount: number
	createdAt: string
}

export type CreateCardPayload = {
	label: string
	type: BankCardData['type']
	theme: BankCardData['theme']
}
