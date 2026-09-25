import { Nfc } from 'lucide-react'
import { selectHideBalances, useAppSelector } from '@payvance/store'

import CardShell from '@/components/cards/CardShell'
import { formatCurrency } from '@/lib/format-currency'
import type { BankCardData } from '@/types/card.types'

type BankCardProps = {
	card: BankCardData
}

export default function BankCard({ card }: BankCardProps) {
	const hideBalances = useAppSelector(selectHideBalances)

	return (
		<CardShell>
			<div className='flex h-full flex-col justify-between p-8 text-white'>
				<div className='flex items-start justify-between gap-4'>
					<div className='flex items-center gap-3'>
						<div className='flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-zinc-950'>
							P
						</div>

						<div>
							<p className='text-base font-semibold tracking-tight'>Payvance</p>
							<p className='mt-0.5 text-xs text-zinc-500'>
								{card.label} · {card.type}
							</p>
						</div>
					</div>

					<div className='flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-emerald-400'>
						<Nfc className='size-4' />
					</div>
				</div>

				<div>
					<p className='text-xs text-zinc-500'>Available balance</p>
					<p className='mt-2 text-4xl font-semibold tracking-tight tabular-nums'>
						{hideBalances ? '••••••' : formatCurrency(card.balance, card.currency)}
					</p>
				</div>

				<div className='space-y-5'>
					<p className='font-mono text-base tracking-[0.28em] text-zinc-300'>
						•••• •••• •••• {card.last4}
					</p>

					<div className='flex items-end justify-between gap-4'>
						<div className='min-w-0'>
							<p className='truncate text-sm font-medium text-zinc-200'>
								{card.holder}
							</p>
							<p className='mt-1 text-xs text-zinc-500'>Cardholder</p>
						</div>

						<div className='text-right'>
							<p className='text-sm font-medium text-zinc-200'>
								{card.expires}
							</p>
							<p className='mt-1 text-xs text-zinc-500'>Expires</p>
						</div>
					</div>
				</div>
			</div>
		</CardShell>
	)
}
