/* eslint-disable */
import fs from 'fs/promises'
import path from 'path'

const pathArg = process.argv[2]
console.log("process path ", pathArg)

async function processDir(dir) {
	const entries = await fs.readdir(dir)
	for (const entry of entries) {
		const entryPath = path.join(dir, entry)
		const stat = await fs.stat(entryPath)
		if (stat.isDirectory()) {
			await processDir(entryPath)
		} else {
			if (entryPath.endsWith('.jsx')) {
				await jsx2jsName(entryPath)
			}
		}
	}
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
