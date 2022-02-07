/* eslint-disable */
import fs from 'fs/promises'
import { walk } from './walk.mjs'

const pathArg = process.argv[2]
console.log('process path ', pathArg)

async function processDir(dir) {
	await walk(dir, async (entryPath) => {
		if (entryPath.endsWith('.jsx')) {
			await jsx2jsName(entryPath)
		}
	})
}

function jsx2jsName(entryPath) {
	const newPath = entryPath.replace('.jsx', '.js')
	console.log(`${entryPath} => ${newPath}`)
	return fs.rename(entryPath, newPath)
}

if (!pathArg) {
	throw new Error('arg must be defined')
}
await processDir(pathArg)
