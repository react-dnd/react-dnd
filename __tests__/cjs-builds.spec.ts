describe('CommonJS Builds', () => {
	it('dnd-core', () => expect(require('dnd-core-cjs')).toBeDefined())
	it('react-dnd', () => expect(require('react-dnd-cjs')).toBeDefined())
	it('react-dnd-html5-backend', () =>
		expect(require('react-dnd-html5-backend-cjs')).toBeDefined())
	it('react-dnd-touch-backend', () =>
		expect(require('react-dnd-touch-backend-cjs')).toBeDefined())
	it('react-dnd-test-backend', () =>
		expect(require('react-dnd-test-backend')).toBeDefined())
	it('react-dnd-test-utils', () =>
		expect(require('react-dnd-test-utils')).toBeDefined())
})
