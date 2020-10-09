import gulp = require('gulp')
export { preset } from './preset'

gulp.on('error', (...args: any[]) => {
	console.error('caught gulp error', ...args)
	process.exit(1)
})

process
	.on('unhandledRejection', (reason, p) => {
		console.error(reason, 'unhandled promise rejection', p)
		process.exit(1)
	})
	.on('uncaughtException', (err) => {
		console.error(err, 'uncaught exception')
		process.exit(1)
	})
