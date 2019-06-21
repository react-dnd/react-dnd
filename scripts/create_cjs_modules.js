/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const esmLibs = require('./esm-libs')

function deleteFolderRecursive(filePath) {
	if (fs.existsSync(filePath)) {
		fs.readdirSync(filePath).forEach(function(file) {
			var curPath = filePath + '/' + file
			if (fs.lstatSync(curPath).isDirectory()) {
				// recurse
				deleteFolderRecursive(curPath)
			} else {
				// delete file
				fs.unlinkSync(curPath)
			}
		})
		fs.rmdirSync(filePath)
	}
}

const cjsRoot = path.join(__dirname, '../packages/alternative_builds/cjs')

const coreRoots = [
	path.join(__dirname, '../packages/core'),
	path.join(__dirname, '../packages/testing'),
]
coreRoots.forEach(coreRoot => {
	const corePackages = fs.readdirSync(coreRoot)
	corePackages.forEach(corePackage => {
		const cjsPackageRoot = path.join(cjsRoot, corePackage)
		if (fs.existsSync(cjsPackageRoot)) {
			deleteFolderRecursive(cjsPackageRoot)
		}
		fs.mkdirSync(cjsPackageRoot)

		const {
			name,
			version,
			main,
			typings,
			dependencies = {},
			license,
			description,
			devDependencies = {},
			peerDependencies = {},
		} = require(`${coreRoot}/${corePackage}/package.json`)

		esmLibs.forEach(lib => {
			if (dependencies[lib]) {
				dependencies[`${lib}-cjs`] = dependencies[lib]
				delete dependencies[`${lib}`]
			}
			if (peerDependencies[lib]) {
				peerDependencies[`${lib}-cjs`] = peerDependencies[lib]
				delete peerDependencies[`${lib}`]
			}
		})

		const cjsPackageJson = {
			name: `${name}-cjs`,
			version,
			license,
			description,
			main,
			typings,
			scripts: {
				build: 'tsc',
				clean: 'rimraf lib',
			},
			dependencies,
			devDependencies: {
				...devDependencies,
				// this will ensure the source package builds before the CJS package in Lerna
				[name]: version,
			},
			peerDependencies,
		}
		console.log(`write ${name} package.json`)
		fs.writeFileSync(
			path.join(cjsPackageRoot, 'package.json'),
			JSON.stringify(cjsPackageJson, null, 2),
			{ encoding: 'utf8' },
		)

		const tsConfigJson = {
			extends: '../../../../tsconfig.base.json',
			compilerOptions: {
				target: 'es5',
				module: 'commonjs',
				outDir: 'lib',
				esModuleInterop: true,
				baseUrl: `${coreRoot}/${corePackage}/`,
				paths: {
					'dnd-core': ['../../core/dnd-core/lib/index.d.ts'],
					'react-dnd': ['../../core/react-dnd/lib/index.d.ts'],
					'react-dnd-html5-backend': [
						'../../core/html5-backend/lib/index.d.ts',
					],
					'react-dnd-test-backend': [
						'../../testing/test-backend/lib/index.d.ts',
					],
					'react-dnd-test-utils': ['../../testing/test-utils/lib/index.d.ts'],
				},
			},
			files: [`${coreRoot}/${corePackage}/src/index.ts`],
		}

		console.log(`write ${name} tsconfig.json`)
		fs.writeFileSync(
			path.join(cjsPackageRoot, 'tsconfig.json'),
			JSON.stringify(tsConfigJson, null, 2),
			{ encoding: 'utf8' },
		)
	})
})
