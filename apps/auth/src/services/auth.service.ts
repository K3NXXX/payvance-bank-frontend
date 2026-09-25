import type {
	IGoogleAuthRequest,
	IForgotPasswordRequest,
	ILogInRequest,
	ILoginSuccessResponse,
	IResendVerificationRequest,
	IResetPasswordRequest,
	ISendSignupCodeRequest,
	ISignupRequest,
	ISignUpResponse,
} from '@/types/auth.types'

import { axiosInstance } from './axios.instance'

class AuthService {
	private BASE_URL = '/auth'

	async sendSignupCode(data: ISendSignupCodeRequest): Promise<void> {
		await axiosInstance.post(`${this.BASE_URL}/send-signup-code`, data)
	}

	async signup(signUpData: ISignupRequest): Promise<ISignUpResponse> {
		const { data } = await axiosInstance.post<ISignUpResponse>(
			`${this.BASE_URL}/register`,
			signUpData,
		)

		return data
	}

	async resendVerification(resendData: IResendVerificationRequest): Promise<void> {
		await axiosInstance.post(`${this.BASE_URL}/resend-verification`, resendData)
	}

	async login(logInData: ILogInRequest): Promise<ILoginSuccessResponse> {
		const { data } = await axiosInstance.post<ILoginSuccessResponse>(
			`${this.BASE_URL}/login`,
			logInData,
		)

		return data
	}

	async googleAuth(googleAuthData: IGoogleAuthRequest): Promise<ILoginSuccessResponse> {
		const { data } = await axiosInstance.post<ILoginSuccessResponse>(
			`${this.BASE_URL}/google`,
			googleAuthData,
		)

		return data
	}

	async forgotPassword(data: IForgotPasswordRequest): Promise<void> {
		await axiosInstance.post(`${this.BASE_URL}/forgot-password`, data)
	}

	async resetPassword(data: IResetPasswordRequest): Promise<void> {
		await axiosInstance.post(`${this.BASE_URL}/reset-password`, data)
	}
}

export const authService = new AuthService()
