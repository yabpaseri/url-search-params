import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
	manifest: {
		name: 'URLSearchParams',
		default_locale: 'en',
		permissions: ['contextMenus'],
	},
	modules: ['@wxt-dev/module-react', '@wxt-dev/i18n/module'],
});
