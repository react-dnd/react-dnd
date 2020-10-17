module.exports = {
	clearMocks: true,
	setupFilesAfterEnv: ['<rootDir>/jest/setup-enzyme.js'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	modulePaths: ['<rootDir>/packages/'],
	collectCoverageFrom: [
		'packages/*/src/**/*.{ts,tsx}',
		'!**/__tests__/**',
		'!packages/build/**',
		'!packages/docsite/**',
		'!packages/examples-*/**',
		'!packages/*test*/**',
	],
	testMatch: [
		'<rootDir>/__tests__/**/?(*.)(spec|test).ts(x|)',
		'<rootDir>/packages/*/src/**/__tests__/**/?(*.)(spec|test).ts(x|)',
	],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	globals: {
		'ts-jest': {
			tsConfig: '<rootDir>/tsconfig.jest.json',
			diagnostics: {
				pathRegex: '/.(spec|test).ts$/',
			},
		},
	},
}
