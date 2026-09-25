import { combineReducers, configureStore, createAction, type UnknownAction } from '@reduxjs/toolkit'

import { cardsUiReducer } from './slices/cardsUiSlice.js'
import { notificationsReducerFn } from './slices/notificationsSlice.js'

const combinedReducer = combineReducers({
	cardsUi: cardsUiReducer,
	notifications: notificationsReducerFn,
})

export type RootState = ReturnType<typeof combinedReducer>

export const resetAppState = createAction('app/reset')

const rootReducer = (state: RootState | undefined, action: UnknownAction) => {
	if (resetAppState.match(action)) {
		return combinedReducer(undefined, action)
	}

	return combinedReducer(state, action)
}

export const createAppStore = () =>
	configureStore({
		reducer: rootReducer,
	})

export type AppStore = ReturnType<typeof createAppStore>
export type AppDispatch = AppStore['dispatch']

let appStore: AppStore | undefined

export const getAppStore = () => {
	if (!appStore) {
		appStore = createAppStore()
	}

	return appStore
}
