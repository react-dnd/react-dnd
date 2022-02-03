module.exports = {
	rootDir: __dirname,
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(t|j)sx?$': [
			require.resolve('@swc/jest'),
			{
				sourceMaps: true,
				jsc: {
					target: 'es2017',
					parser: {
						syntax: 'typescript',
						tsx: true,
					},
					transform: {
						react: { runtime: 'automatic', useBuiltins: true },
					},
				},
			},
		],
	},
	setupFilesAfterEnv: ['<rootDir>/jest/setup-testing-library.js'],
	collectCoverageFrom: [
		'packages/*/src/**/*.tsx',
		'packages/*/src/**/*.ts',
		'!**/__tests__/**',
		'!packages/build/**',
		'!packages/docsite/**',
		'!packages/backend-test/**',
		'!packages/test-utils/**',
	],
	//coverageProvider: 'v8',
	testMatch: [
		'<rootDir>/__tests__/**/*.(spec|test).ts(x|)',
		'<rootDir>/packages/*/src/**/__tests__/**/*.(spec|test).ts(x|)',
	],
}
