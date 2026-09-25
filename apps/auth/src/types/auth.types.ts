export interface ISendSignupCodeRequest {
	email: string
	turnstileToken?: string
}

export interface ISignupRequest {
	fullName: string
	email: string
	password: string
	code: string
	turnstileToken?: string
}

export interface ISignUpResponse {
	id: string
	fullName: string
	email: string
	createdAt: string
	accessToken: string
}

export interface IResendVerificationRequest {
	email: string
	turnstileToken?: string
}

export interface ILogInRequest {
	email: string
	password: string
	turnstileToken?: string
}

export interface ILoginSuccessResponse {
	accessToken: string
}

export interface IGoogleAuthRequest {
	credential: string
}

export interface IForgotPasswordRequest {
	email: string
	turnstileToken?: string
}

export interface IResetPasswordRequest {
	token: string
	password: string
	turnstileToken?: string
}

export interface IApiErrorResponse {
	code?: string
	message?: string | string[]
	statusCode?: number
}
