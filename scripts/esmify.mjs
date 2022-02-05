/* eslint-disable */
import fs from 'fs/promises'
import path from 'path'

const hasImport = (l) => l.indexOf('import ') !== -1
const hasExport = (l) => l.indexOf('export ') !== -1
const isSourceMap = (l) => l.indexOf('//# sourceMappingURL=') !== -1

async function processDir(dir) {
	const entries = await fs.readdir(dir)
	for (const entry of entries) {
		const entryPath = path.join(dir, entry)
		const stat = await fs.stat(entryPath)
		if (stat.isDirectory()) {
			await processDir(entryPath)
		} else {
			if (entryPath.endsWith('.js')) {
				await js2mjsRefs(entryPath)
			}
			if (entryPath.indexOf('.js') >= 0) {
				await js2mjsName(entryPath)
			}
		}
	}
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
