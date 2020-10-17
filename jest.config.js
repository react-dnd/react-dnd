module.exports = {
	clearMocks: true,
	cacheDirectory: '.jest-cache',
	setupFilesAfterEnv: ['<rootDir>/jest/setup-enzyme.js'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	modulePaths: ['<rootDir>/packages/'],
	collectCoverageFrom: [
		'packages/core/**/*.{ts,tsx}',
		'!**/node_modules/**',
		'!**/lib/**',
		'!**/__tests__/**',
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
			tsConfig: 'tsconfig.jest.json',
			diagnostics: {
				pathRegex: '/.(spec|test).ts$/',
			},
		},
	},
}
