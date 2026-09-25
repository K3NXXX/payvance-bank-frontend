import { useCallback, useRef, useState } from 'react'
import type { TurnstileInstance } from '@marsidev/react-turnstile'

export const useTurnstile = () => {
	const ref = useRef<TurnstileInstance>(null)
	const [token, setToken] = useState('')
	const isReady = useRef(false)
	const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? ''
	const isRequired = Boolean(siteKey)

	const reset = useCallback(() => {
		setToken('')
		ref.current?.reset()
	}, [])

	const handleWidgetLoad = useCallback(() => {
		isReady.current = true
	}, [])

	const handleSuccess = useCallback((value: string) => {
		setToken(value)
	}, [])

	const handleExpire = useCallback(() => {
		setToken('')
	}, [])

	const handleError = useCallback(() => {
		setToken('')
	}, [])

	const run = useCallback(async (): Promise<string | undefined> => {
		if (!isRequired) {
			return undefined
		}

		const existingToken = ref.current?.getResponse() || token

		if (existingToken) {
			return existingToken
		}

		if (!ref.current || !isReady.current) {
			throw new Error('Captcha is not ready')
		}

		ref.current.execute()

		return ref.current.getResponsePromise()
	}, [isRequired, token])

	return {
		ref,
		reset,
		isRequired,
		siteKey,
		run,
		onWidgetLoad: handleWidgetLoad,
		onSuccess: handleSuccess,
		onExpire: handleExpire,
		onError: handleError,
	}
}
