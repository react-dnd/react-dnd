/* eslint-disable */
import fs from 'fs/promises'
import { walk } from './walk.mjs'

const hasImport = (l) => l.indexOf('import ') !== -1 && l.indexOf('./') !== -1
const hasExport = (l) => l.indexOf('export ') !== -1
const isSourceMap = (l) => l.indexOf('//# sourceMappingURL=') !== -1

async function processDir(dir) {
	await walk(dir, async (entryPath) => {
		if (entryPath.endsWith('.js')) {
			await js2mjsRefs(entryPath)
		}
		if (entryPath.indexOf('.js') >= 0) {
			await js2mjsName(entryPath)
		}
	})
}

function js2mjsName(entryPath) {
	const newPath = entryPath.replace('.js', '.mjs')
	console.log(`${entryPath} => ${newPath}`)
	return fs.rename(entryPath, newPath)
}

async function js2mjsRefs(entryPath) {
	const content = await fs.readFile(entryPath, 'utf8')
	const lines = content.split('\n').map((l) => {
		if (
			(hasImport(l) || hasExport(l) || isSourceMap(l)) &&
			l.indexOf('.js') !== -1
		) {
			console.log('->', l)
			return l.replace('.js', '.mjs')
		}
		return l
	})
	await fs.writeFile(entryPath, lines.join('\n'), 'utf8')
}

await processDir('./dist/esm')
