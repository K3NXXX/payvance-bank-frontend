import type { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { getAppStore } from './store.js'

type StoreProviderProps = {
	children: ReactNode
}

export function StoreProvider({ children }: StoreProviderProps) {
	return <Provider store={getAppStore()}>{children}</Provider>
}
