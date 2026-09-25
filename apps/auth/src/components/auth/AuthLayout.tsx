import type { ReactNode } from 'react'

type AuthLayoutProps = {
	children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<main className="min-h-screen bg-background">
			<div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
				<section className="relative hidden overflow-hidden bg-[#070a0a] p-10 text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(16,185,129,0.16),transparent_35%)]" />

					<div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:48px_48px]" />

					<div className="absolute -left-40 -top-40 h-[620px] w-[620px] rounded-full bg-emerald-500/20 blur-[130px]" />

					<div className="absolute -bottom-52 -right-40 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[130px]" />

					<div className="absolute left-[18%] top-[28%] h-[420px] w-[420px] rounded-full border border-emerald-400/[0.08]" />

					<div className="absolute left-[10%] top-[20%] h-[580px] w-[580px] rounded-full border border-emerald-400/[0.05]" />

					<div className="relative z-10 flex items-center gap-2">
						<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-zinc-950">
							P
						</div>

						<span className="text-lg font-semibold tracking-tight">Payvance</span>
					</div>

					<div className="relative z-10 flex max-w-2xl flex-1 flex-col justify-center">
						<div className="mb-6 inline-flex items-center rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5 text-xs text-emerald-300 backdrop-blur-xl max-w-[25d0px]">
							<span className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,1)]" />
							Modern banking, simplified
						</div>

						<h1 className="max-w-xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] xl:text-6xl">
							Banking that
							<br />
							<span className="text-zinc-500">moves with you.</span>
						</h1>

						<p className="mt-6 max-w-lg text-base leading-7 text-zinc-400">
							Manage your money, track your spending and move funds with a banking experience
							designed around you.
						</p>

						<div className="relative mt-12 h-[280px] max-w-xl">
							<div className="absolute left-1/2 top-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-black/50 backdrop-blur-2xl">
								<div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-emerald-400/20 via-transparent to-transparent opacity-70" />

								<div className="relative">
									<div className="flex items-start justify-between">
										<div>
											<p className="text-xs text-zinc-500">Available balance</p>

											<p className="mt-2 text-3xl font-semibold tracking-tight">$24,680.50</p>
										</div>

										<div className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
											+12.8%
										</div>
									</div>

									<div className="mt-7 flex h-24 items-end gap-1">
										{[35, 42, 32, 55, 47, 62, 51, 74, 68, 84, 72, 96].map((height, index) => (
											<div
												key={index}
												className="flex-1 rounded-sm bg-gradient-to-t from-emerald-500/10 via-emerald-400/40 to-emerald-300/80"
												style={{ height: `${height}%` }}
											/>
										))}
									</div>

									<div className="mt-4 flex justify-between text-[10px] text-zinc-600">
										<span>JAN</span>
										<span>FEB</span>
										<span>MAR</span>
										<span>APR</span>
										<span>MAY</span>
										<span>JUN</span>
									</div>
								</div>
							</div>

							<div className="absolute left-0 top-24 w-44 rounded-2xl border border-white/10 bg-zinc-900/80 p-4 shadow-xl backdrop-blur-xl">
								<div className="flex items-center gap-3">
									<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
										↓
									</div>

									<div>
										<p className="text-[10px] text-zinc-500">Received</p>
										<p className="mt-0.5 text-sm font-medium">+$2,450</p>
									</div>
								</div>
							</div>

							<div className="absolute bottom-4 right-0 w-44 rounded-2xl border border-white/10 bg-zinc-900/80 p-4 shadow-xl backdrop-blur-xl">
								<div className="flex items-center gap-3">
									<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-zinc-300">
										↑
									</div>

									<div>
										<p className="text-[10px] text-zinc-500">Spent today</p>
										<p className="mt-0.5 text-sm font-medium">$184.20</p>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
							<div className="flex items-center gap-2 text-xs text-zinc-500">
								<span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
								Secure by design
							</div>

							<div className="flex items-center gap-2 text-xs text-zinc-500">
								<span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
								Real-time insights
							</div>

							<div className="flex items-center gap-2 text-xs text-zinc-500">
								<span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
								Global payments
							</div>
						</div>
					</div>

					<p className="relative z-10 text-xs text-zinc-700">© 2026 Payvance</p>
				</section>

				<section className="flex min-h-screen items-center justify-center px-6 py-12">
					<div className="w-full max-w-md">{children}</div>
				</section>
			</div>
		</main>
	)
}
