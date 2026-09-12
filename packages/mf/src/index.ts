export const MFE_PORTS = {
	shell: 3000,
	auth: 3001,
} as const

export const SHARED_DEPENDENCIES = [
	'react',
	'react-dom',
	'react-router-dom',
] as const

const REMOTE_ENV_KEYS = {
	auth: 'VITE_AUTH_REMOTE_URL',
} as const

type RemoteName = keyof typeof REMOTE_ENV_KEYS

export function getRemoteEntryUrl(
	remote: RemoteName,
	env: NodeJS.ProcessEnv = process.env,
) {
	const envKey = REMOTE_ENV_KEYS[remote]
	const baseUrl = env[envKey]

	if (baseUrl) {
		return `${baseUrl.replace(/\/$/, '')}/remoteEntry.js`
	}

	return `http://localhost:${MFE_PORTS[remote]}/remoteEntry.js`
}

export function createShellRemotes(env: NodeJS.ProcessEnv = process.env) {
	return {
		auth: {
			type: 'module' as const,
			name: 'auth',
			entry: getRemoteEntryUrl('auth', env),
		},
	}
}
