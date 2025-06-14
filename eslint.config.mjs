//@ts-check
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import autoImports from './.wxt/eslint-auto-imports.mjs';

export default tseslint.config(
	// commons
	eslint.configs.recommended,
	tseslint.configs.recommended,
	// react
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat['jsx-runtime'],
	pluginReactHooks.configs['recommended-latest'],
	pluginReactRefresh.configs.recommended,
	{
		settings: { react: { version: 'detect' } },
		rules: {
			'react/prop-types': 'off',
			'react/jsx-no-undef': ['error', { allowGlobals: true }],
		},
	},
	// others
	autoImports,
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.es2024,
			},
		},
	},
	{
		ignores: ['.wxt/**/*'],
	},
	eslintConfigPrettier,
);
