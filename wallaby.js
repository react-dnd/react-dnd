module.exports = (/** @type {any} */ wallaby) => ({
	files: [
		'tsconfig.json',
		'packages/*/tsconfig.json',
		'packages/*/src/**/*',
		'package.json', // <--
		'!packages/*/src/**/__tests__/*.spec.js',
		'!packages/*/src/**/__tests__/*.spec.ts',
	],
	compilers: {
		'**/*.js': wallaby.compilers.babel(),
	},
	tests: [
		'packages/*/src/**/__tests__/*.spec.js',
		'packages/*/src/**/__tests__/*.spec.ts',
	],
	env: {
		type: 'node',
		runner: 'node',
	},
	testFramework: 'jest',
	setup(/** @type {any} */ w2) {
		const { jest: jestConfig } = require('./package.json')
		w2.testFramework.configure(jestConfig)
	},
})
