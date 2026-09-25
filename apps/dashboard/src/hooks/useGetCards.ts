import { useQuery } from '@tanstack/react-query'

import { cardsService } from '@/services/cards.service'

export const useGetCards = () => {
	return useQuery({
		queryKey: ['getCards'],
		queryFn: () => cardsService.getCards(),
	})
}
