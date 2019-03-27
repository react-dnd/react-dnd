'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Copyright 2017 Google Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

var _require = require('workbox-build'),
    generateSWString = _require.generateSWString;

var path = require('path');

var convertStringToAsset = require('./lib/convert-string-to-asset');
var getDefaultConfig = require('./lib/get-default-config');
var formatManifestFilename = require('./lib/format-manifest-filename');
var getAssetHash = require('./lib/get-asset-hash');
var getManifestEntriesFromCompilation = require('./lib/get-manifest-entries-from-compilation');
var getWorkboxSWImports = require('./lib/get-workbox-sw-imports');
var relativeToOutputPath = require('./lib/relative-to-output-path');
var sanitizeConfig = require('./lib/sanitize-config');
var stringifyManifest = require('./lib/stringify-manifest');
var warnAboutConfig = require('./lib/warn-about-config');

/**
 * This class supports creating a new, ready-to-use service worker file as
 * part of the webpack compilation process.
 *
 * Use an instance of `GenerateSW` in the
 * [`plugins` array](https://webpack.js.org/concepts/plugins/#usage) of a
 * webpack config.
 *
 * @module workbox-webpack-plugin
 */

var GenerateSW = function () {
  /**
   * Creates an instance of GenerateSW.
   *
   * @param {Object} [config] See the
   * [configuration guide](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#configuration)
   * for all supported options and defaults.
   */
  function GenerateSW() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, GenerateSW);

    this.config = (0, _assign2.default)(getDefaultConfig(), {
      // Hardcode this default filename, since we don't have swSrc to read from
      // (like we do in InjectManifest).
      swDest: 'service-worker.js'
    }, config);
  }

  /**
   * @param {Object} compilation The webpack compilation.
   * @private
   */


  (0, _createClass3.default)(GenerateSW, [{
    key: 'handleEmit',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(compilation) {
        var configWarning, workboxSWImports, entries, importScriptsArray, manifestString, manifestAsset, manifestHash, manifestFilename, pathToManifestFile, workboxSWImport, sanitizedConfig, _ref2, swString, warnings, relSwDest;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                configWarning = warnAboutConfig(this.config);

                if (configWarning) {
                  compilation.warnings.push(configWarning);
                }

                _context.next = 4;
                return getWorkboxSWImports(compilation, this.config);

              case 4:
                workboxSWImports = _context.sent;
                entries = getManifestEntriesFromCompilation(compilation, this.config);
                importScriptsArray = [].concat(this.config.importScripts);
                manifestString = stringifyManifest(entries);
                manifestAsset = convertStringToAsset(manifestString);
                manifestHash = getAssetHash(manifestAsset);
                manifestFilename = formatManifestFilename(this.config.precacheManifestFilename, manifestHash);
                pathToManifestFile = relativeToOutputPath(compilation, path.join(this.config.importsDirectory, manifestFilename));

                compilation.assets[pathToManifestFile] = manifestAsset;

                importScriptsArray.push((compilation.options.output.publicPath || '') + pathToManifestFile.split(path.sep).join('/'));

                // workboxSWImports might be null if importWorkboxFrom is 'disabled'.
                workboxSWImport = void 0;

                if (workboxSWImports) {
                  if (workboxSWImports.length === 1) {
                    // When importWorkboxFrom is 'cdn' or 'local', or a chunk name
                    // that only contains one JavaScript asset, then this will be a one
                    // element array, containing just the Workbox SW code.
                    workboxSWImport = workboxSWImports[0];
                  } else {
                    // If importWorkboxFrom was a chunk name that contained multiple
                    // JavaScript assets, then we don't know which contains the Workbox SW
                    // code. Just import them first as part of the "main" importScripts().
                    importScriptsArray.unshift.apply(importScriptsArray, (0, _toConsumableArray3.default)(workboxSWImports));
                  }
                }

                sanitizedConfig = sanitizeConfig.forGenerateSWString(this.config);
                // If globPatterns isn't explicitly set, then default to [], instead of
                // the workbox-build.generateSWString() default.

                sanitizedConfig.globPatterns = sanitizedConfig.globPatterns || [];
                sanitizedConfig.importScripts = importScriptsArray;
                sanitizedConfig.workboxSWImport = workboxSWImport;
                _context.next = 22;
                return generateSWString(sanitizedConfig);

              case 22:
                _ref2 = _context.sent;
                swString = _ref2.swString;
                warnings = _ref2.warnings;

                compilation.warnings = compilation.warnings.concat(warnings || []);

                relSwDest = relativeToOutputPath(compilation, this.config.swDest);

                compilation.assets[relSwDest] = convertStringToAsset(swString);

              case 28:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleEmit(_x2) {
        return _ref.apply(this, arguments);
      }

      return handleEmit;
    }()

    /**
     * @param {Object} [compiler] default compiler object passed from webpack
     *
     * @private
     */

  }, {
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      if ('hooks' in compiler) {
        // We're in webpack 4+.
        compiler.hooks.emit.tapPromise(this.constructor.name, function (compilation) {
          return _this.handleEmit(compilation);
        });
      } else {
        // We're in webpack 2 or 3.
        compiler.plugin('emit', function (compilation, callback) {
          _this.handleEmit(compilation).then(callback).catch(callback);
        });
      }
    }
  }]);
  return GenerateSW;
}();

module.exports = GenerateSW;