/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const replace = require('replace-in-file')
const esmLibs = require('./esm-libs')
const cjsRoot = path.join(__dirname, '../packages/alternative_builds/cjs')

const files = fs.readdirSync(cjsRoot)
files.forEach(file => {
	const subdir = path.join(cjsRoot, file)
	if (fs.lstatSync(subdir).isDirectory()) {
		console.log(`process module requires in ${subdir}`)
		const jsReplaceSpec = {
			files: `${subdir}/lib/**/*.js`,
			from: esmLibs.map(esmLib => new RegExp(`require\\("${esmLib}"\\)`, 'g')),
			to: esmLibs.map(esmLib => `require("${esmLib}-cjs")`),
		}

		replace.sync(jsReplaceSpec)

		let dtsReplaceSpec = {
			files: `${file}/lib/**/*.d.ts`,
			from: esmLibs.map(esmLib => new RegExp(`from '${esmLib}'`, 'g')),
			to: esmLibs.map(esmLib => `from '${esmLib}-cjs'`),
		}
		replace.sync(dtsReplaceSpec)

		dtsReplaceSpec = {
			files: `${file}/lib/**/*.d.ts`,
			from: esmLibs.map(esmLib => new RegExp(`import\\("${esmLib}"\\)`, 'g')),
			to: esmLibs.map(esmLib => `import("${esmLib}-cjs")`),
		}
		replace.sync(dtsReplaceSpec)
	}
})
