import type { ReactNode } from 'react'

type CardShellProps = {
	children: ReactNode
	className?: string
}

export default function CardShell({
	children,
	className = '',
}: CardShellProps) {
	return (
		<article
			className={`relative isolate aspect-[1.586/1] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#070a0a] [filter:drop-shadow(0_24px_48px_rgba(0,0,0,0.28))] ${className}`}
		>
			<div className='pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]'>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(16,185,129,0.16),transparent_48%)]' />
				<div className='absolute inset-0 bg-gradient-to-br from-emerald-400/15 via-transparent to-transparent opacity-80' />
				<div className='absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:48px_48px]' />
			</div>

			<div className='relative flex h-full flex-col rounded-[inherit]'>
				{children}
			</div>
		</article>
	)
}
