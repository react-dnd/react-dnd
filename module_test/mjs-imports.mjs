/* eslint-disable @typescript-eslint/no-var-requires */
import * as core from 'dnd-core'
import * as dnd from 'react-dnd'
import * as htmlBackend from 'react-dnd-html5-backend'
import * as touchBackend from 'react-dnd-touch-backend'
import * as testBackend from 'react-dnd-test-backend'
import * as testUtils from 'react-dnd-test-utils'
import { readFile } from 'fs/promises'

const api = JSON.parse(await readFile(new URL('./api.json', import.meta.url)))

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

console.log('👍 ESModules OK')
