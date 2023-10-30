import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const postsProxyTarget = `http://posts:8080`;
const yoobiProxyTarget = `http://yoobi:3001`;

const config: UserConfig = {
	plugins: [sveltekit()],
	test: {
		globals: true,
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		setupFiles: ['src/test/setupTest.ts']
	},
	server: {
		proxy: {
			'/api': {
				target: postsProxyTarget,
				changeOrigin: true
			},
			'/ask': {
				target: yoobiProxyTarget,
				changeOrigin: true
			}
		},
		port: 3000,
		strictPort: true,
		host: true, 
		fs: {
			allow: ['../node_modules'] 
		},
		watch: {
			usePolling: true
		}
	}
};

export default config;
