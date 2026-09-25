import { ChevronLeft, ChevronRight } from 'lucide-react'
import { setActiveCardId, useAppDispatch } from '@payvance/store'
import { useEffect, useRef, useState } from 'react'

import BankCard from '@/components/cards/BankCard'
import CreateNewCard from '@/components/cards/CreateNewCard'
import { Button } from '@payvance/ui'
import type { BankCardData } from '@/types/card.types'

type CardCarouselProps = {
	cards: BankCardData[]
	onCreateCard?: () => void
}

const SWIPE_THRESHOLD = 48

export default function CardCarousel({ cards, onCreateCard }: CardCarouselProps) {
	const dispatch = useAppDispatch()
	const totalSlides = cards.length + 1
	const [activeIndex, setActiveIndex] = useState(0)
	const [dragOffset, setDragOffset] = useState(0)
	const [isDragging, setIsDragging] = useState(false)
	const startXRef = useRef(0)
	const dragOffsetRef = useRef(0)

	useEffect(() => {
		if (cards.length === 0) {
			dispatch(setActiveCardId(null))
			return
		}

		if (activeIndex >= cards.length) {
			dispatch(setActiveCardId(null))
			return
		}

		dispatch(setActiveCardId(cards[activeIndex]?.id ?? null))
	}, [activeIndex, cards, dispatch])

	const goTo = (index: number) => {
		setActiveIndex(Math.max(0, Math.min(totalSlides - 1, index)))
		setDragOffset(0)
		dragOffsetRef.current = 0
	}

	const handlePointerDown = (clientX: number) => {
		setIsDragging(true)
		startXRef.current = clientX
	}

	const handlePointerMove = (clientX: number) => {
		if (!isDragging) {
			return
		}

		const offset = clientX - startXRef.current
		dragOffsetRef.current = offset
		setDragOffset(offset)
	}

	const handlePointerEnd = () => {
		if (!isDragging) {
			return
		}

		setIsDragging(false)

		const offset = dragOffsetRef.current

		if (offset < -SWIPE_THRESHOLD && activeIndex < totalSlides - 1) {
			goTo(activeIndex + 1)
			return
		}

		if (offset > SWIPE_THRESHOLD && activeIndex > 0) {
			goTo(activeIndex - 1)
			return
		}

		setDragOffset(0)
		dragOffsetRef.current = 0
	}

	const isCreateNewSlide = activeIndex === cards.length

	return (
		<div className="space-y-5">
			<div className="flex items-center gap-2 sm:gap-3">
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="size-10 shrink-0 rounded-xl border border-border/70 bg-background/80"
					disabled={activeIndex === 0}
					aria-label="Previous card"
					onClick={() => goTo(activeIndex - 1)}
				>
					<ChevronLeft className="size-5" />
				</Button>

				<div
					className="min-w-0 flex-1 touch-pan-y overflow-hidden rounded-3xl"
					onPointerDown={(event) => {
						event.currentTarget.setPointerCapture(event.pointerId)
						handlePointerDown(event.clientX)
					}}
					onPointerMove={(event) => handlePointerMove(event.clientX)}
					onPointerUp={handlePointerEnd}
					onPointerCancel={handlePointerEnd}
				>
					<div
						className={`flex ${isDragging ? 'transition-none' : 'transition-transform duration-300 ease-out'}`}
						style={{
							transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
						}}
					>
						{cards.map((card) => (
							<div key={card.id} className="w-full shrink-0">
								<BankCard card={card} />
							</div>
						))}

						<div className="w-full shrink-0">
							<CreateNewCard onCreate={onCreateCard} />
						</div>
					</div>
				</div>

				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="size-10 shrink-0 rounded-xl border border-border/70 bg-background/80"
					disabled={activeIndex === totalSlides - 1}
					aria-label="Next card"
					onClick={() => goTo(activeIndex + 1)}
				>
					<ChevronRight className="size-5" />
				</Button>
			</div>

			<div className="flex items-center justify-center gap-2">
				{cards.map((card, index) => (
					<button
						key={card.id}
						type="button"
						aria-label={`Show ${card.label} card`}
						onClick={() => goTo(index)}
						className={`h-1.5 rounded-full transition-all ${
							index === activeIndex ? 'w-5 bg-emerald-500' : 'w-1.5 bg-muted-foreground/25'
						}`}
					/>
				))}

				<button
					type="button"
					aria-label="Create new card"
					onClick={() => goTo(cards.length)}
					className={`h-1.5 rounded-full transition-all ${
						isCreateNewSlide ? 'w-5 bg-emerald-500' : 'w-1.5 bg-muted-foreground/25'
					}`}
				/>
			</div>
		</div>
	)
}
