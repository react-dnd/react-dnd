var fs = require('fs');
var glob = require('glob');
var path = require('path');

function buildHasteMap() {
  var root = path.resolve(__dirname, '../src');
  var hasteMap = {};
  glob.sync(root + '/**/*.{js,css}').forEach(function(file) {
    var code = fs.readFileSync(file);
    var regex = /@providesModule ([^\s*]+)/;
    var result = regex.exec(code);
    if (result) {
      var id = result[1];
      if (path.extname(file) === '.css') {
        id += '.css';
      }
      hasteMap[id] = file;
    }
  });
  return hasteMap;
};

function resolveHasteDefines() {
  // Run in the context of webpack's compiler.
  var hasteMap = buildHasteMap();
  this.resolvers.normal.plugin('module', function(request, callback) {
    var hastePath = hasteMap[request.request];
    if (hastePath) {
      return callback(null, {
        path: hastePath,
        query: request.query,
        file: true,
        resolved: true
      });
    }
    return callback();
  });
}

module.exports = {
  resolveHasteDefines: resolveHasteDefines
};
