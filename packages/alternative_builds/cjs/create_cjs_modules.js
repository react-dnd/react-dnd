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

const coreRoots = [
	path.join(__dirname, '../../core'),
	path.join(__dirname, '../../testing'),
]
coreRoots.forEach(coreRoot => {
	const corePackages = fs.readdirSync(coreRoot)
	corePackages.forEach(corePackage => {
		const cjsPackageRoot = path.join(__dirname, corePackage)
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
			if (devDependencies[lib]) {
				devDependencies[`${lib}-cjs`] = devDependencies[lib]
				delete devDependencies[`${lib}`]
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
				rimraf: devDependencies.rimraf,
				typescript: devDependencies.typescript,
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
			extends: '../tsconfig.json',
			compilerOptions: {
				outDir: 'lib',
				baseUrl: `${coreRoot}/corePackage/src`,
				paths: {
					'dnd-core': ['../../../core/dnd-core/src/index'],
					'dnd-core/*': ['../../../core/dnd-core/src/*'],
					'react-dnd': ['../../../core/react-dnd/src/index'],
					'react-dnd/*': ['../../../core/react-dnd/src/*'],
					'react-dnd-html5-backend': ['../../../core/html5-backend/src/index'],
					'react-dnd-html5-backend/*': ['../../../core/html5-backend/src/*'],
					'react-dnd-test-backend': ['../../../testing/test-backend/src/index'],
					'react-dnd-test-backend/*': ['../../../testing/test-backend/src/*'],
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
