import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import type { RefObject } from 'react'

type TurnstileWidgetProps = {
	siteKey: string
	turnstileRef: RefObject<TurnstileInstance | null>
	onWidgetLoad?: (widgetId: string) => void
	onSuccess: (token: string) => void
	onExpire: () => void
	onError: () => void
}

export default function TurnstileWidget({
	siteKey,
	turnstileRef,
	onWidgetLoad,
	onSuccess,
	onExpire,
	onError,
}: TurnstileWidgetProps) {
	return (
		<Turnstile
			ref={turnstileRef}
			siteKey={siteKey}
			onWidgetLoad={onWidgetLoad}
			onSuccess={onSuccess}
			onExpire={onExpire}
			onError={onError}
			options={{
				appearance: 'execute',
				execution: 'execute',
			}}
		/>
	)
}
