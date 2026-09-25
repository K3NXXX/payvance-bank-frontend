import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type AppNotification = {
	id: string
	title: string
	message: string
	read: boolean
	createdAt: string
}

type NotificationsState = {
	items: AppNotification[]
}

const initialState: NotificationsState = {
	items: [],
}

const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		addNotification(
			state,
			action: PayloadAction<Omit<AppNotification, 'id' | 'read' | 'createdAt'> & { id?: string }>,
		) {
			state.items.unshift({
				id: action.payload.id ?? crypto.randomUUID(),
				title: action.payload.title,
				message: action.payload.message,
				read: false,
				createdAt: new Date().toISOString(),
			})
		},
		markAllNotificationsRead(state) {
			for (const item of state.items) {
				item.read = true
			}
		},
	},
})

export const { addNotification, markAllNotificationsRead } = notificationsSlice.actions
export const notificationsReducerFn = notificationsSlice.reducer

export const selectNotifications = (state: { notifications: NotificationsState }) =>
	state.notifications.items

export const selectUnreadNotificationsCount = (state: { notifications: NotificationsState }) =>
	state.notifications.items.filter((item) => !item.read).length
