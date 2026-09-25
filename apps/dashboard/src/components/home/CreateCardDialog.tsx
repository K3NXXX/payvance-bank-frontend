import { addNotification, setActiveCardId, useAppDispatch } from '@payvance/store'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { useCreateCard } from '@/hooks/useCardMutations'
import type { BankCardData } from '@/types/card.types'
import type { CreateCardPayload } from '@/types/transaction.types'
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Input,
	Label,
} from '@payvance/ui'

type CreateCardDialogProps = {
	open: boolean
	onOpenChange: (open: boolean) => void
	onCreated?: (card: BankCardData) => void
}

const CARD_TYPES: CreateCardPayload['type'][] = ['Virtual', 'Physical', 'Travel']
const CARD_THEMES: CreateCardPayload['theme'][] = ['emerald', 'cyan', 'violet']

export default function CreateCardDialog({
	open,
	onOpenChange,
	onCreated,
}: CreateCardDialogProps) {
	const dispatch = useAppDispatch()
	const { mutate: createCard, isPending } = useCreateCard()
	const [label, setLabel] = useState('Savings')
	const [type, setType] = useState<CreateCardPayload['type']>('Virtual')
	const [theme, setTheme] = useState<CreateCardPayload['theme']>('cyan')

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()

		const trimmed = label.trim()

		if (!trimmed) {
			toast.error('Enter a card name')
			return
		}

		createCard(
			{ label: trimmed, type, theme },
			{
				onSuccess: (card) => {
					dispatch(setActiveCardId(card.id))
					dispatch(
						addNotification({
							title: 'Card created',
							message: `${card.label} ending in ${card.last4} is ready to use.`,
						}),
					)
					toast.success('New card issued', {
						description: `${card.label} · •••• ${card.last4}`,
					})
					onOpenChange(false)
					onCreated?.(card)
				},
				onError: () => {
					toast.error('Could not create card', {
						description: 'Check the form or try again later.',
					})
				},
			},
		)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="rounded-3xl sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Issue a new card</DialogTitle>
					<DialogDescription>
						We will create a real card in your wallet and sync it across the app.
					</DialogDescription>
				</DialogHeader>

				<form className="space-y-4" onSubmit={handleSubmit}>
					<div className="space-y-2">
						<Label htmlFor="card-label">Card name</Label>
						<Input
							id="card-label"
							value={label}
							maxLength={32}
							onChange={(event) => setLabel(event.target.value)}
							placeholder="e.g. Travel, Premium"
						/>
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<Label htmlFor="card-type">Type</Label>
							<select
								id="card-type"
								value={type}
								onChange={(event) =>
									setType(event.target.value as CreateCardPayload['type'])
								}
								className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm"
							>
								{CARD_TYPES.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="card-theme">Theme</Label>
							<select
								id="card-theme"
								value={theme}
								onChange={(event) =>
									setTheme(event.target.value as CreateCardPayload['theme'])
								}
								className="flex h-10 w-full rounded-xl border border-input bg-background px-3 text-sm"
							>
								{CARD_THEMES.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>
						</div>
					</div>

					<DialogFooter className="gap-2 sm:gap-0">
						<Button
							type="button"
							variant="ghost"
							onClick={() => onOpenChange(false)}
							disabled={isPending}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isPending}>
							{isPending ? (
								<>
									<Loader2 className="size-4 animate-spin" />
									Creating…
								</>
							) : (
								'Create card'
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
