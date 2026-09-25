import {
	addNotification,
	selectActiveCardId,
	useAppDispatch,
	useAppSelector,
} from '@payvance/store'
import { ArrowDownLeft, ArrowUpRight, Loader2, Wallet } from 'lucide-react'
import { toast } from 'sonner'

import { useGetCardTransactions, useTopUpCard } from '@/hooks/useCardMutations'
import { formatCurrency } from '@/lib/format-currency'
import { formatTransactionDate } from '@/lib/format-transaction-date'
import type { BankCardData } from '@/types/card.types'
import { Button } from '@payvance/ui'

type CardActivityPanelProps = {
	cards: BankCardData[]
}

const QUICK_AMOUNTS = [25, 50, 100] as const

export default function CardActivityPanel({ cards }: CardActivityPanelProps) {
	const dispatch = useAppDispatch()
	const activeCardId = useAppSelector(selectActiveCardId)
	const activeCard = activeCardId
		? (cards.find((card) => card.id === activeCardId) ?? null)
		: null
	const cardId = activeCard?.id ?? null

	const { data: transactions = [], isLoading, isFetching } = useGetCardTransactions(cardId)
	const { mutate: topUp, isPending: isTopUpPending } = useTopUpCard()

	const handleTopUp = (amount: number) => {
		if (!cardId) {
			toast.error('Select a card first')
			return
		}

		topUp(
			{ cardId, amount },
			{
				onSuccess: (card) => {
					dispatch(
						addNotification({
							title: 'Balance updated',
							message: `${formatCurrency(amount, card.currency)} added to ${card.label}.`,
						}),
					)
					toast.success('Top up completed', {
						description: `New balance: ${formatCurrency(card.balance, card.currency)}`,
					})
				},
				onError: () => {
					toast.error('Top up failed', {
						description: 'Please try again in a moment.',
					})
				},
			},
		)
	}

	if (!activeCard) {
		return (
			<section className="mt-8 rounded-3xl border border-dashed border-border/70 bg-card/50 px-5 py-8 text-center text-sm text-muted-foreground">
				Swipe to a card to top up and view recent transactions.
			</section>
		)
	}

	return (
		<section className="mt-8 space-y-4">
			<div className="flex flex-wrap items-end justify-between gap-3">
				<div>
					<p className="text-sm font-medium text-muted-foreground">Activity</p>
					<h2 className="text-lg font-semibold tracking-tight">
						{activeCard.label} · •••• {activeCard.last4}
					</h2>
				</div>

				<p className="text-sm text-muted-foreground">
					Balance{' '}
					<span className="font-medium text-foreground">
						{formatCurrency(activeCard.balance, activeCard.currency)}
					</span>
				</p>
			</div>

			<div className="rounded-3xl border border-border/70 bg-card/80 p-4 shadow-sm">
				<div className="flex items-center gap-2 text-sm font-medium">
					<Wallet className="size-4 text-emerald-600" />
					Quick top up
				</div>

				<div className="mt-3 flex flex-wrap gap-2">
					{QUICK_AMOUNTS.map((amount) => (
						<Button
							key={amount}
							type="button"
							variant="outline"
							size="sm"
							className="rounded-xl"
							disabled={isTopUpPending}
							onClick={() => handleTopUp(amount)}
						>
							{formatCurrency(amount, activeCard.currency)}
						</Button>
					))}
				</div>
			</div>

			<div className="rounded-3xl border border-border/70 bg-card/80 shadow-sm">
				<div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
					<p className="text-sm font-medium">Recent transactions</p>
					{(isLoading || isFetching) && (
						<Loader2 className="size-4 animate-spin text-muted-foreground" />
					)}
				</div>

				{isLoading ? (
					<p className="px-5 py-8 text-center text-sm text-muted-foreground">
						Loading activity…
					</p>
				) : transactions.length === 0 ? (
					<p className="px-5 py-8 text-center text-sm text-muted-foreground">
						No transactions yet. Use quick top up to add funds and see them here.
					</p>
				) : (
					<ul className="divide-y divide-border/60">
						{transactions.map((item) => {
							const isCredit = item.amount >= 0

							return (
								<li key={item.id} className="flex items-center gap-4 px-5 py-4">
									<div
										className={`flex size-10 shrink-0 items-center justify-center rounded-2xl ${
											isCredit
												? 'bg-emerald-500/10 text-emerald-700'
												: 'bg-rose-500/10 text-rose-700'
										}`}
									>
										{isCredit ? (
											<ArrowDownLeft className="size-4" />
										) : (
											<ArrowUpRight className="size-4" />
										)}
									</div>

									<div className="min-w-0 flex-1">
										<p className="truncate font-medium">{item.title}</p>
										<p className="text-xs text-muted-foreground">
											{item.category} · {formatTransactionDate(item.createdAt)}
										</p>
									</div>

									<p
										className={`shrink-0 text-sm font-semibold tabular-nums ${
											isCredit ? 'text-emerald-700' : 'text-foreground'
										}`}
									>
										{isCredit ? '+' : ''}
										{formatCurrency(item.amount, activeCard.currency)}
									</p>
								</li>
							)
						})}
					</ul>
				)}
			</div>
		</section>
	)
}
