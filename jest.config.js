module.exports = {
	clearMocks: true,
	cacheDirectory: '.jest-cache',
	setupFilesAfterEnv: ['<rootDir>/jest/setup-enzyme.js'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	modulePaths: ['<rootDir>/packages/core/', '<rootDir>/packages/testing/'],
	collectCoverageFrom: [
		'packages/core/**/*.{ts,tsx}',
		'!**/node_modules/**',
		'!**/lib/**',
		'!**/__tests__/**',
	],
	testMatch: [
		'<rootDir>/__tests__/**/?(*.)(spec|test).ts(x|)',
		'<rootDir>/packages/core/dnd-core/src/**/__tests__/**/?(*.)(spec|test).ts(x|)',
		'<rootDir>/packages/core/react-dnd/src/**/__tests__/**/?(*.)(spec|test).ts(x|)',
		'<rootDir>/packages/core/html5-backend/src/**/__tests__/**/?(*.)(spec|test).ts(x|)',
		'<rootDir>/packages/core/touch-backend/src/**/__tests__/**/?(*.)(spec|test).ts(x|)',
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
