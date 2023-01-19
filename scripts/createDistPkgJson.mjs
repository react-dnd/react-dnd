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
const JSON_ENCODING = { encoding: 'utf-8' }

const toJson = obj => JSON.stringify(obj, null, 2)
const readJson = async file => JSON.parse(await fs.readFile(file, JSON_ENCODING))
const writeJson = async (file, content) => fs.writeFile(file, content, JSON_ENCODING)

/**
 * This function injects a package.json file into dist/esm and dist/cjs to 
 * force node into a specific module resolution mode.
 */
async function injectResolverPackageJsonFiles() {
	const pkgJson = await readJson(PACKAGE_JSON_PATH)
	const name = pkgJson.name

	return Promise.all(DIST_FOLDERS.map(({ folder, type }) => {
		const distPkgJsonPath = path.join(process.cwd(), 'dist', folder, 'package.json')
		return writeJson(distPkgJsonPath, toJson({ name, type }))
	}))
}

injectResolverPackageJsonFiles()
