import type { BankCardData } from '@/types/card.types'
import type { CardTransaction, CreateCardPayload } from '@/types/transaction.types'
import { axiosInstance } from './axios.instance'

class CardsService {
	private BASE_URL = '/cards'

	async getCards(): Promise<BankCardData[]> {
		const { data } = await axiosInstance.get<BankCardData[]>(this.BASE_URL)

		return data
	}

	async createCard(payload: CreateCardPayload): Promise<BankCardData> {
		const { data } = await axiosInstance.post<BankCardData>(this.BASE_URL, payload)

		return data
	}

	async topUpCard(cardId: string, amount: number): Promise<BankCardData> {
		const { data } = await axiosInstance.post<BankCardData>(
			`${this.BASE_URL}/${cardId}/top-up`,
			{ amount },
		)

		return data
	}

	async getCardTransactions(cardId: string): Promise<CardTransaction[]> {
		const { data } = await axiosInstance.get<CardTransaction[]>(
			`${this.BASE_URL}/${cardId}/transactions`,
		)

		return data
	}
}

export const cardsService = new CardsService()
