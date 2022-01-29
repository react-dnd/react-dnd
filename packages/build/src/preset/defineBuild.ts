import * as glob from 'glob'
import { compile } from '../tasks/typescript'

export async function build(): Promise<void> {
	const sourceFiles = await getSourceFiles()
	await compile(sourceFiles)
}

const SOURCE_GLOB = 'src/**/*.ts*'
const TEST_GLOB = 'src/**/__tests__/**'

async function getSourceFiles(): Promise<string[]> {
	const [sourceFiles, testFiles] = await Promise.all([
		resolveGlob(SOURCE_GLOB),
		resolveGlob(TEST_GLOB),
	])
	const diff = difference(sourceFiles, testFiles)
	return [...diff.values()]
}

function resolveGlob(globSpec: string): Promise<Set<string>> {
	return new Promise((resolve, reject) => {
		glob(globSpec, (err, res) => {
			if (err) {
				reject(err)
			} else {
				const fileSet = new Set<string>()
				res.forEach(r => fileSet.add(r))
				resolve(fileSet)
			}
		})
	})
}

function difference<T>(main: Set<T>, remove: Set<T>): Set<T> {
	const result = new Set<T>()
	for (const v of main.values()) {
		if (!remove.has(v)) {
			result.add(v)
		}
	}
	return result
}
