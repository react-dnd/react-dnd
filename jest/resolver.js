/* eslint-disable */
const exts = ['.ts', '.tsx', '.cts', '.mts']

module.exports = (request, options) => {
	const defaultResolver =
		options.defaultResolver ||
		require('jest-resolve/build/defaultResolver').default
	try {
		return defaultResolver(request, options)
	} catch (err) {
		for (let ext of exts) {
			try {
				return defaultResolver(request.replace(/\.js$/, ext), options)
			} catch (err) {
				// do nothing
			}
		}
	}
}
