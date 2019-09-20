/* eslint-disable no-console, @typescript-eslint/no-var-requires */
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
		const files = [
			path.join(subdir, 'lib/**/*.js'),
			path.join(subdir, 'lib/**/*.d.ts'),
		]

		const executeReplacement = ({ ...opts }) => {
			const results = replace.sync({
				files,
				...opts,
			})
			console.log(
				`executed replacement pattern in ${results.length} files`,
				results
					.filter(r => r.hasChanged)
					.map(r => r.file.replace(subdir, ''))
					.join('\n\t'),
			)
		}

		// Replace 'require' calls
		executeReplacement({
			from: esmLibs.map(esmLib => new RegExp(`require\\("${esmLib}"\\)`, 'g')),
			to: esmLibs.map(esmLib => `require("${esmLib}-cjs")`),
		})
		executeReplacement({
			from: esmLibs.map(esmLib => new RegExp(`from '${esmLib}'`, 'g')),
			to: esmLibs.map(esmLib => `from '${esmLib}-cjs'`),
		})
		executeReplacement({
			from: esmLibs.map(esmLib => new RegExp(`import\\("${esmLib}"\\)`, 'g')),
			to: esmLibs.map(esmLib => `import("${esmLib}-cjs")`),
		})
	}
})
