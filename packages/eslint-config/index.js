module.exports = {
	"parser": require.resolve("@typescript-eslint/parser"),
	"plugins": [
		"@typescript-eslint",
		"react-hooks",
		"import"
	],
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"settings": {
		"react": {
			"version": "17"
		}
	},
	"env": {
		"browser": true,
		"jest": true,
		"es6": true,
		"node": true
	},
	"rules": {
		// Formatting Rules - formatting is external now
		"no-mixed-spaces-and-tabs": "off",

		// Import Rules
		"import/first": "error",
		"import/no-amd": "error",
		"import/no-anonymous-default-export": "warn",
		"import/no-webpack-loader-syntax": "error",
		"import/extensions": ["error", "always", { "ignorePackages": true }],
		"import/order": "off",

		"@typescript-eslint/consistent-type-imports": [
			"error",
			{
				"prefer": "type-imports"
			}
		],

		"react/prop-types": "off",
		"react/react-in-jsx-scope": "off",

		// Covered by Rome
		"@typescript-eslint/no-explicit-any": "off",
		"no-delete-var": "off",

		// TODO: re-enable
		"@typescript-eslint/explicit-module-boundary-types": 0
	}
}
