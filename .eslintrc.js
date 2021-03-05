module.exports = {
	globals: {
		__PATH_PREFIX__: true,
	},
	extends: [
		'react-app',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	plugins: ['react', 'prettier', 'jsx-a11y', 'import'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2020,
		sourceType: 'module',
	},
}
