import * as rdnd from 'react-dnd'
import * as html5 from 'react-dnd-html5-backend'
import touch from 'react-dnd-touch-backend'

/* eslint-disable @typescript-eslint/no-var-requires */
describe('UMD Builds', () => {
	it('ReactDnD', () => {
		const library = require('../packages/core/react-dnd/dist/umd/ReactDnD.js')
		checkKeyMatch(library, rdnd)
	})
	it('ReactDnD.min', () => {
		const library = require('../packages/core/react-dnd/dist/umd/ReactDnD.min.js')
		checkKeyMatch(library, rdnd)
	})
	it('ReactDnDHTML5Backend', () => {
		const library = require('../packages/core/html5-backend/dist/umd/ReactDnDHTML5Backend.js')
		checkKeyMatch(library, html5)
	})
	it('ReactDnDHTML5Backend.min', () => {
		const library = require('../packages/core/html5-backend/dist/umd/ReactDnDHTML5Backend.min.js')
		checkKeyMatch(library, html5)
	})
	it('ReactDnDTouchBackend', () => {
		const library = require('../packages/core/touch-backend/dist/umd/ReactDnDTouchBackend.js')
		checkKeyMatch(library, touch)
	})
	it('ReactDnDTouchBackend.min', () => {
		const library = require('../packages/core/touch-backend/dist/umd/ReactDnDTouchBackend.min.js')
		checkKeyMatch(library, touch)
	})
})

function checkKeyMatch(lib: any, expected: any): void {
	Object.keys(expected).forEach(key => {
		expect(typeof lib[key]).toEqual(typeof expected[key])
	})
	Object.keys(lib).forEach(key => {
		expect(typeof expected[key]).toEqual(typeof lib[key])
	})
}
