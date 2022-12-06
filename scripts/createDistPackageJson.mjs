import fs from 'fs/promises'
import path from 'path'

if (!process.cwd().match(/packages\/[^/]+$/)) {
	throw new Error('You must run this command from a package folder')
}

const writeFiles = async () => {
	await Promise.all(
		[
			['cjs', 'commonjs'],
			['esm', 'module'],
		].map(async ([folder, type]) => {
			const name = JSON.parse(
				await fs.readFile(path.join(process.cwd(), 'package.json')),
			).name
			await fs.writeFile(
				path.join(process.cwd(), 'dist', folder, 'package.json'),
				JSON.stringify(
					{
						name,
						type,
					},
					null,
					2,
				),
			)
		}),
	)
}

writeFiles()
