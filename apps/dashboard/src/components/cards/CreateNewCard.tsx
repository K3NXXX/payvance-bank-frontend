import { Plus } from 'lucide-react'

import CardShell from '@/components/cards/CardShell'

type CreateNewCardProps = {
	onCreate?: () => void
}

export default function CreateNewCard({ onCreate }: CreateNewCardProps) {
	return (
		<button
			type="button"
			onClick={onCreate}
			className="group block w-full overflow-hidden rounded-3xl text-left transition-transform duration-300 hover:-translate-y-0.5"
		>
			<CardShell className="border-dashed border-white/15 bg-[#070a0a]/90 transition-colors group-hover:border-emerald-400/25 group-hover:shadow-emerald-500/10">
				<div className="flex h-full flex-col items-center justify-center px-8 text-center text-white">
					<div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors group-hover:border-emerald-400/20 group-hover:bg-emerald-400/10 group-hover:text-emerald-300">
						<Plus className="size-6" />
					</div>

					<p className="mt-5 text-lg font-semibold tracking-tight">Add new card</p>
					<p className="mt-1 text-sm text-zinc-500">Tap to create a virtual or physical card</p>
				</div>
			</CardShell>
		</button>
	)
}
