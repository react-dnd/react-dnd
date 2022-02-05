/* eslint-disable */
const api = require('./api.json')

function check(imported, libKey) {
	console.log('checking', libKey)
	const apiKeys = api[libKey]

	Object.keys(imported).forEach((key) => {
		if (!apiKeys[key]) {
			throw new Error(`missing export: ${key}`)
		}
	})
	Object.keys(apiKeys).forEach((key) => {
		if (!imported[key]) {
			throw new Error(`uneexpected export: ${key}`)
		}
	})
}

module.exports = { check }
