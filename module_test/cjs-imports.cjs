/* eslint-disable @typescript-eslint/no-var-requires */
const core = require('dnd-core')
const dnd = require('react-dnd')
const htmlBackend = require('react-dnd-html5-backend')
const touchBackend = require('react-dnd-touch-backend')
const testBackend = require('react-dnd-test-backend')
const testUtils = require('react-dnd-test-utils')

const api = require('./api.json')

function check(imported, libKey) {
	console.log('checking', libKey)
	Object.keys(imported).forEach((key) => {
		if (!imported[key]) {
			throw new Error(`missing export: ${key}`)
		}
	})
	Object.keys(imported).forEach((key) => {
		if (!api[libKey][key]) {
			throw new Error(`uneexpected export: ${key}`)
		}
	})
}

check(core, 'core')
check(dnd, 'dnd')
check(htmlBackend, 'htmlBackend')
check(touchBackend, 'touchBackend')
check(testBackend, 'testBackend')
check(testUtils, 'testUtils')

console.log('👍 CommonJS Modules OK')
