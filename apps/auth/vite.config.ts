import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { MFE_PORTS, SHARED_DEPENDENCIES } from '@payvance/mf'
import { federation } from '@module-federation/vite'
import tailwindcss from '@tailwindcss/vite'
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
	plugins: [
		react(),
		tailwindcss(),
		federation({
			name: 'auth',
			filename: 'remoteEntry.js',
			exposes: {
				'./AuthApp': './src/App.tsx',
			},
			shared: { ...SHARED_DEPENDENCIES },
			dev: {
				remoteHmr: true,
			},
		}),
	],
	server: {
		port: MFE_PORTS.auth,
		origin: `http://localhost:${MFE_PORTS.auth}`,
		open: process.env.BROWSER === 'none' ? false : '/auth/login',
	},
})
