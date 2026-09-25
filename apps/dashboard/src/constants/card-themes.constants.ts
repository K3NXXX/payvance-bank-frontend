import type { CardTheme } from '@/types/card.types'

export const CARD_THEMES: Record<
	CardTheme,
	{
		glowPrimary: string
		glowSecondary: string
		label: string
	}
> = {
	emerald: {
		glowPrimary: 'bg-emerald-500/25',
		glowSecondary: 'bg-cyan-500/10',
		label: 'text-emerald-300/80',
	},
	cyan: {
		glowPrimary: 'bg-cyan-500/25',
		glowSecondary: 'bg-blue-500/10',
		label: 'text-cyan-300/80',
	},
	violet: {
		glowPrimary: 'bg-violet-500/25',
		glowSecondary: 'bg-fuchsia-500/10',
		label: 'text-violet-300/80',
	},
}
