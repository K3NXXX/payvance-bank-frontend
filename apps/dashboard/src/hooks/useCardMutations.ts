import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { cardsService } from '@/services/cards.service'
import type { CreateCardPayload } from '@/types/transaction.types'

export const cardTransactionsQueryKey = (cardId: string | null) =>
	['cardTransactions', cardId] as const

export const useGetCardTransactions = (cardId: string | null) => {
	return useQuery({
		queryKey: cardTransactionsQueryKey(cardId),
		queryFn: () => cardsService.getCardTransactions(cardId!),
		enabled: Boolean(cardId),
	})
}

export const useCreateCard = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (payload: CreateCardPayload) => cardsService.createCard(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getCards'] })
		},
	})
}

export const useTopUpCard = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ cardId, amount }: { cardId: string; amount: number }) =>
			cardsService.topUpCard(cardId, amount),
		onSuccess: (_card, variables) => {
			queryClient.invalidateQueries({ queryKey: ['getCards'] })
			queryClient.invalidateQueries({
				queryKey: cardTransactionsQueryKey(variables.cardId),
			})
		},
	})
}
