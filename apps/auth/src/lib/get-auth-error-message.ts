import type { AxiosError } from 'axios'

import { AUTH_ERRORS } from '@/constants/errors.constants'
import type { IApiErrorResponse } from '@/types/auth.types'

const GRPC_ERROR_MESSAGE_PATTERN = /^\d+\s+[A-Z_]+:\s*(.+)$/

function normalizeErrorMessage(message: string): string {
	const match = message.match(GRPC_ERROR_MESSAGE_PATTERN)

	return match ? match[1] : message
}

export function getAuthErrorMessage(error: unknown): string {
	const axiosError = error as AxiosError<IApiErrorResponse>
	const data = axiosError.response?.data

	if (data?.code && AUTH_ERRORS[data.code]) {
		return AUTH_ERRORS[data.code]
	}

	if (data?.message) {
		const message = Array.isArray(data.message) ? data.message[0] : data.message

		return normalizeErrorMessage(message)
	}

	return AUTH_ERRORS.unknown
}
