import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { federation } from '@module-federation/vite'
import {
	createShellRemotes,
	MFE_PORTS,
	SHARED_DEPENDENCIES,
} from '@payvance/mf'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
	resolve: {
		dedupe: ['react', 'react-dom', 'react-redux', '@tanstack/react-query'],
		alias: {
			'@': path.resolve(dirname, 'src'),
		},
	},
	build: { sourcemap: true },
	plugins: [
		react(),
		federation({
			name: 'shell',
			remotes: createShellRemotes(),
			shared: { ...SHARED_DEPENDENCIES },
			dev: {
				remoteHmr: true,
			},
		}),
	],
	server: {
		port: MFE_PORTS.shell,
	},
})
