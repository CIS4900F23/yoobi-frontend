import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

// const { POSTS_HOST, POSTS_PORT, YOOBI_HOST, YOOBI_PORT } = process.env;
// const postsProxyTarget = `${POSTS_HOST}:${POSTS_PORT}`;
// const yoobiProxyTarget = `${YOOBI_HOST}:${YOOBI_PORT}`;
const postsProxyTarget = `http://yoobi-posts:8080`;
const yoobiProxyTarget = `http://yoobi-bot:3001`;

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
