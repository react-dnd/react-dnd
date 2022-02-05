/* eslint-disable */
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

module.exports = { check }
