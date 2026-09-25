export const MFE_PORTS = {
	shell: 3000,
	auth: 3001,
	dashboard: 3002,
} as const

/** Singleton shared deps — prevents invalid hook call across shell/remotes. */
export const SHARED_DEPENDENCIES = {
	react: {
		singleton: true,
		requiredVersion: '^19.0.0',
	},
	'react-dom': {
		singleton: true,
		requiredVersion: '^19.0.0',
	},
	'react-router-dom': {
		singleton: true,
		requiredVersion: '^7.0.0',
	},
	'@reduxjs/toolkit': {
		singleton: true,
	},
	'react-redux': {
		singleton: true,
	},
	'@tanstack/react-query': {
		singleton: true,
	},
} as const

const REMOTE_ENV_KEYS = {
	auth: 'VITE_AUTH_REMOTE_URL',
	dashboard: 'VITE_DASHBOARD_REMOTE_URL',
} as const

type RemoteName = keyof typeof REMOTE_ENV_KEYS

type EnvRecord = Record<string, string | undefined>

export function getRemoteEntryUrl(remote: RemoteName, env: EnvRecord = process.env) {
	const envKey = REMOTE_ENV_KEYS[remote]
	const baseUrl = env[envKey]

	if (baseUrl) {
		return `${baseUrl.replace(/\/$/, '')}/remoteEntry.js`
	}

	return `http://localhost:${MFE_PORTS[remote]}/remoteEntry.js`
}

export function createShellRemotes(env: EnvRecord = process.env) {
	return {
		auth: {
			type: 'module' as const,
			name: 'auth',
			entry: getRemoteEntryUrl('auth', env),
		},
		dashboard: {
			type: 'module' as const,
			name: 'dashboard',
			entry: getRemoteEntryUrl('dashboard', env),
		},
	}
}
