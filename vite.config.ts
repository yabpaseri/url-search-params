import { crx, defineManifest } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { description, version as version_name } from './package.json';
import archive from './plugins/vite-plugin-archive';

const version = version_name.replace(/[^\d.-]+/g, '').replace('-', '.');
const manifest = defineManifest({
	manifest_version: 3,
	name: 'URL Search Params',
	version,
	version_name,
	description,
	default_locale: 'en',
	icons: {
		'16': 'icons/icon16.png',
		'32': 'icons/icon32.png',
		'48': 'icons/icon48.png',
		'128': 'icons/icon128.png',
	},
	permissions: ['contextMenus'],
	background: {
		service_worker: 'src/background/service-worker.ts',
		type: 'module',
	},
});

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), crx({ manifest }), archive()],
	build: {
		rollupOptions: {
			input: {
				popup: 'pages/popup.html',
			},
		},
		minify: false,
	},
});
