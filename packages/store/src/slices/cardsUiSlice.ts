import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type CardsUiState = {
	activeCardId: string | null
	hideBalances: boolean
}

const initialState: CardsUiState = {
	activeCardId: null,
	hideBalances: false,
}

const cardsUiSlice = createSlice({
	name: 'cardsUi',
	initialState,
	reducers: {
		setActiveCardId(state, action: PayloadAction<string | null>) {
			state.activeCardId = action.payload
		},
		toggleHideBalances(state) {
			state.hideBalances = !state.hideBalances
		},
	},
})

export const { setActiveCardId, toggleHideBalances } = cardsUiSlice.actions
export const cardsUiReducer = cardsUiSlice.reducer

export const selectActiveCardId = (state: { cardsUi: CardsUiState }) => state.cardsUi.activeCardId
export const selectHideBalances = (state: { cardsUi: CardsUiState }) => state.cardsUi.hideBalances
