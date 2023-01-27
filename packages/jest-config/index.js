module.exports = {
	rootDir: process.cwd(),
	testEnvironment: require.resolve('jest-environment-jsdom'),
	extensionsToTreatAsEsm: ['.ts', '.tsx'],
	transform: {
		'^.+\\.(t|j)sx?$': [
			require.resolve('@swc/jest'),
			{
				sourceMaps: true,
				jsc: {
					target: 'es2019',
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
	resolver: require.resolve('./resolver.js'),
	setupFilesAfterEnv: [require.resolve('./setup-testing-library.js')],
	collectCoverageFrom: [
		'src/**/*.tsx',
		'src/**/*.ts',
		'!**/__tests__/**'
	],
	// //coverageProvider: 'v8',
	testMatch: [
		'<rootDir>/src/**/__tests__/**/*.(spec|test).ts(x|)',
		'!**/dist/**',
	],
}
