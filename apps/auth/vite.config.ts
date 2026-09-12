import { MFE_PORTS, SHARED_DEPENDENCIES } from '@payvance/mf'
import { federation } from '@module-federation/vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		tsconfigPaths(),
		federation({
			name: 'auth',
			filename: 'remoteEntry.js',
			exposes: {
				'./AuthApp': './src/App.tsx',
			},
			shared: [...SHARED_DEPENDENCIES],
			dev: {
				remoteHmr: true,
			},
		}),
	],
	server: {
		port: MFE_PORTS.auth,
		origin: `http://localhost:${MFE_PORTS.auth}`,
		open: '/auth/login',
	},
})
