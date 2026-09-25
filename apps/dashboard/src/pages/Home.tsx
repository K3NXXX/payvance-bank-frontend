import { selectActiveCardId, useAppSelector } from '@payvance/store'
import { useState } from 'react'

import CardActivityPanel from '@/components/home/CardActivityPanel'
import CreateCardDialog from '@/components/home/CreateCardDialog'
import CardCarousel from '@/components/cards/CardCarousel'
import { useGetCards } from '@/hooks/useGetCards'
import { formatCurrency } from '@/lib/format-currency'

export default function Home() {
	const [createOpen, setCreateOpen] = useState(false)
	const { data: cards = [], isLoading } = useGetCards()
	const activeCardId = useAppSelector(selectActiveCardId)

	const activeCard =
		cards.find((card) => card.id === activeCardId) ?? cards[0] ?? null

	const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0)

	if (isLoading) {
		return (
			<div className="mx-auto w-full max-w-lg rounded-3xl border border-border/70 bg-card/80 p-8 text-center text-sm text-muted-foreground">
				Loading your cards…
			</div>
		)
	}

	return (
		<div className="mx-auto w-full max-w-lg">
			<div className="mb-6 rounded-3xl border border-border/70 bg-card/80 px-5 py-4 shadow-sm">
				<p className="text-sm text-muted-foreground">Combined card balances</p>
				<p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
					{formatCurrency(totalBalance)}
				</p>
				{activeCard && (
					<p className="mt-1 text-xs text-muted-foreground">
						Active: {activeCard.label} · {formatCurrency(activeCard.balance, activeCard.currency)}
					</p>
				)}
			</div>

			<CardCarousel cards={cards} onCreateCard={() => setCreateOpen(true)} />

			<CardActivityPanel cards={cards} />

			<CreateCardDialog open={createOpen} onOpenChange={setCreateOpen} />
		</div>
	)
}
