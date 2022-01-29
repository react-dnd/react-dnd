import { compile } from './typescript'
import { getSourceFiles } from './getSourceFiles'
import { checkAndEmitTypings } from './checkAndEmitTypes'

build()
.catch(err => console.error('error building', err))

async function build(): Promise<void> {
	const sourceFiles = await getSourceFiles()
	await Promise.all([
		compile(sourceFiles),
		checkAndEmitTypings(sourceFiles)
	])
}

process
	.on('unhandledRejection', (reason, p) => {
		console.error(reason, 'unhandled promise rejection', p)
		process.exit(1)
	})
	.on('uncaughtException', (err) => {
		console.error(err, 'uncaught exception')
		process.exit(1)
	})
