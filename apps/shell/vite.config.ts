import {
	createShellRemotes,
	MFE_PORTS,
	SHARED_DEPENDENCIES,
} from '@payvance/mf'
import { federation } from '@module-federation/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: 'shell',
			remotes: createShellRemotes(),
			shared: [...SHARED_DEPENDENCIES],
			dev: {
				remoteHmr: true,
			},
		}),
	],
	server: {
		port: MFE_PORTS.shell,
	},
})
