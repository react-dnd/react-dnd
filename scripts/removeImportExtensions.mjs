/* eslint-disable */
import fs from 'fs/promises'
import { walk } from './walk.mjs'

const pathArg = process.argv[2]
console.log('process path ', pathArg)

/**
 * Removes extensions from relative imports in TypeScript examples
 *
 * @param {string} dir The directory to walk
 */
export async function removeImportExtensions(dir) {
	await walk(dir, async (entryPath) => {
		if (entryPath.endsWith('.ts') || entryPath.endsWith('.tsx')) {
			console.log(`handle entry ${entryPath}`)
			const content = await fs.readFile(entryPath, 'utf8')
			const newContent = content
				.split('\n')
				.map((line) => {
					const isJsImport =
						(isImport(line) || isExport(line)) && line.indexOf('.js') >= 0
					return isJsImport ? line.replace('.js', '') : line
				})
				.join('\n')
			await fs.writeFile(entryPath, newContent, 'utf8')
		}
	})
}

/**
 *
 * @param {string} line
 * @returns
 */
const isImport = (line) => line.indexOf('import ') >= 0
/**
 *
 * @param {string} line
 * @returns
 */
const isExport = (line) => line.indexOf('export ') >= 0
