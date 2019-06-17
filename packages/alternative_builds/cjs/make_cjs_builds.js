/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

const coreRoot = path.join(__dirname, '../../core')
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
		dependencies,
		license,
		description,
		devDependencies,
	} = require(`${coreRoot}/${corePackage}/package.json`)
	if (dependencies['dnd-core']) {
		dependencies['dnd-core-cjs'] = dependencies['dnd-core']
		delete dependencies['dnd-core']
	}
	if (dependencies['react-dnd']) {
		dependencies['react-dnd-cjs'] = dependencies['react-dnd']
		delete dependencies['react-dnd']
	}

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
	}
	console.log(`write ${name} package.json`)
	fs.writeFileSync(
		path.join(cjsPackageRoot, 'package.json'),
		JSON.stringify(cjsPackageJson, null, 4),
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
		JSON.stringify(tsConfigJson, null, 4),
		{ encoding: 'utf8' },
	)
})
