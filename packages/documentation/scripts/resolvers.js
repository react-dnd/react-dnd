var fs = require('fs')
var glob = require('glob')
var path = require('path')

function buildHasteMap() {
	var root = path.resolve(__dirname, '../src')
	var hasteMap = {}
	glob.sync(root + '/**/*.{js,css}').forEach(function(file) {
		var code = fs.readFileSync(file)
		var regex = /@providesModule ([^\s*]+)/
		var result = regex.exec(code)
		if (result) {
			var id = result[1]
			if (path.extname(file) === '.css') {
				id += '.css'
			}
			hasteMap[id] = file
		}
	})
	return hasteMap
}

class HasteResolvingPlugin {
	constructor() {
		this.hasteMap = buildHasteMap()
	}

	apply(compiler) {
		compiler.plugin('module', function(request, callback) {
			const hastePath = hasteMap[request.request]
			if (hastePath) {
				return callback(null, {
					path: hastePath,
					query: request.query,
					file: true,
					resolved: true,
				})
			}
			return callback()
		})
	}
}

module.exports = {
	resolveHasteDefines: new HasteResolvingPlugin(),
}
