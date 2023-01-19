import fs from 'fs/promises'
import path from 'path'

if (!process.cwd().match(/packages\/[^/]+$/)) {
	throw new Error('You must run this command from a package folder')
}

const DIST_FOLDERS = [
	{ folder: 'esm', type: 'module' },
	{ folder: 'cjs', type: 'commonjs' }
]
const PACKAGE_JSON_PATH = path.join(process.cwd(), 'package.json')

const toJson = obj => JSON.stringify(obj, null, 2)
const readJson = async file => JSON.parse(await fs.readFile(file, { encoding: 'utf-8' }))

/**
 * This function injects a package.json file into dist/esm and dist/cjs to 
 * force node into a specific module resolution mode.
 */
async function injectResolverPackageJsonFiles() {
	const pkgJson = await readJson(PACKAGE_JSON_PATH)
	const name = pkgJson.name

	return Promise.all(DIST_FOLDERS.map(({ folder, type }) => {
		fs.writeFile(
			path.join(process.cwd(), 'dist', folder, 'package.json'),
			toJson({ name, type })
		)
	}))
}

injectResolverPackageJsonFiles()
