import { useGoogleLogin } from '@react-oauth/google'
import { Button } from '@payvance/ui'
import { FaGoogle } from 'react-icons/fa6'

interface GoogleSignInButtonProps {
	onSuccess: (credential: string) => void
	onError?: () => void
	disabled?: boolean
}

export default function GoogleSignInButton({
	onSuccess,
	onError,
	disabled,
}: GoogleSignInButtonProps) {
	const googleLogin = useGoogleLogin({
		onSuccess: (tokenResponse) => {
			onSuccess(tokenResponse.access_token)
		},
		onError: () => onError?.(),
	})

	return (
		<Button
			type="button"
			variant="outline"
			className="h-11 w-full gap-3 font-medium"
			disabled={disabled}
			onClick={() => googleLogin()}
		>
			<FaGoogle className="size-4" />
			Continue with Google
		</Button>
	)
}
