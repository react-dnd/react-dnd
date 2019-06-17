/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

const esmLibs = [
	'dnd-core',
	'react-dnd',
	'react-dnd-html5-backend',
	'react-dnd-test-backend',
	'react-dnd-test-utils',
]

const coreRoots = ['../../core/', '../../testing']
coreRoots.forEach(coreRoot => {
	const corePackages = fs.readdirSync(coreRoot)
	corePackages.forEach(corePackage => {
		const cjsPackageRoot = path.join(__dirname, corePackage)
		if (fs.existsSync(cjsPackageRoot)) {
			rimraf.sync(cjsPackageRoot)
		}
		fs.mkdirSync(cjsPackageRoot)

		const {
			name,
			version,
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
