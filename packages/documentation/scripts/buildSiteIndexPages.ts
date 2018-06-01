import fs from 'fs'
import path from 'path'
import * as Constants from '../site/Constants'
import flatten from 'lodash/flatten'

const glob = require('glob')
const renderPath = require('../__site_prerender__/renderPath').default

const sitePath = path.join(__dirname, '../__site__')
if (!fs.existsSync(sitePath)) {
	fs.mkdirSync(sitePath)
}

const files: { [key: string]: string } = {
	'main.js': 'main.js',
}

if (process.env.NODE_ENV === 'production') {
	Object.keys(files).forEach(fileName => {
		const searchPath = path.join(
			__dirname,
			'../__site__/' + fileName.replace('.', '-*.'),
		)
		const hashedFilename = glob.sync(searchPath)[0]
		if (!hashedFilename) {
			throw new Error(
				'Hashed file of "' +
					fileName +
					'" ' +
					'not found when searching with "' +
					searchPath +
					'"',
			)
		}

		files[fileName] = path.basename(hashedFilename)
	})
}

const locations = flatten([
	Constants.APIPages.map((group: any) => group.pages),
	Constants.ExamplePages.map((group: any) => group.pages),
	Constants.Pages,
]).reduce((paths: string[], pages: { [key: string]: any }) => {
	return paths.concat(Object.keys(pages).map(key => pages[key].location))
}, [])

locations.forEach((fileName: string) => {
	const props = {
		location: fileName,
		devMode: process.env.NODE_ENV !== 'production',
		files,
	}

	renderPath(fileName, props, (content: string) => {
		fs.writeFileSync(path.join(sitePath, fileName), content)
	})
})
