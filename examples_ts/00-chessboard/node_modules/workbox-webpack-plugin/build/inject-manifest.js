'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var assert = require('assert');
var path = require('path');

var _require = require('workbox-build'),
    getManifest = _require.getManifest;

var convertStringToAsset = require('./lib/convert-string-to-asset');
var getDefaultConfig = require('./lib/get-default-config');
var formatManifestFilename = require('./lib/format-manifest-filename');
var getAssetHash = require('./lib/get-asset-hash');
var getManifestEntriesFromCompilation = require('./lib/get-manifest-entries-from-compilation');
var getWorkboxSWImports = require('./lib/get-workbox-sw-imports');
var readFileWrapper = require('./lib/read-file-wrapper');
var relativeToOutputPath = require('./lib/relative-to-output-path');
var sanitizeConfig = require('./lib/sanitize-config');
var stringifyManifest = require('./lib/stringify-manifest');
var warnAboutConfig = require('./lib/warn-about-config');

/**
 * This class supports taking an existing service worker file which already
 * uses Workbox, and injecting a reference to a [precache manifest]() into it,
 * allowing it to efficiently precache the assets created by a webpack build.
 *
 * Use an instance of `InjectManifest` in the
 * [`plugins` array](https://webpack.js.org/concepts/plugins/#usage) of a
 * webpack config.
 *
 * @module workbox-webpack-plugin
 */

var InjectManifest = function () {
  /**
   * Creates an instance of InjectManifest.
   *
   * @param {Object} [config] See the
   * [configuration guide](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#configuration)
   * for all supported options and defaults.
   */
  function InjectManifest() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, InjectManifest);

    assert(typeof config.swSrc === 'string', `swSrc must be set to the path ` + `to an existing service worker file.`);

    this.config = (0, _assign2.default)(getDefaultConfig(), {
      // Default to using the same filename as the swSrc file, since that's
      // provided here. (In GenerateSW, that's not available.)
      swDest: path.basename(config.swSrc)
    }, config);
  }

  /**
   * @param {Object} compilation The webpack compilation.
   * @param {Function} readFile The function to use when reading files,
   * derived from compiler.inputFileSystem.
   * @private
   */


  (0, _createClass3.default)(InjectManifest, [{
    key: 'handleEmit',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(compilation, readFile) {
        var configWarning, workboxSWImports, modulePathPrefix, entries, importScriptsArray, sanitizedConfig, _ref2, manifestEntries, warnings, manifestString, manifestAsset, manifestHash, manifestFilename, pathToManifestFile, originalSWString, absoluteSwSrc, importScriptsString, setConfigString, postInjectionSWString, relSwDest;

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


                // this.config.modulePathPrefix may or may not have been set by
                // getWorkboxSWImports(), depending on the other config options. If it was
                // set, we need to pull it out and make use of it later, as it can't be
                // used by the underlying workbox-build getManifest() method.
                modulePathPrefix = this.config.modulePathPrefix;

                delete this.config.modulePathPrefix;

                entries = getManifestEntriesFromCompilation(compilation, this.config);
                importScriptsArray = [].concat(this.config.importScripts);
                sanitizedConfig = sanitizeConfig.forGetManifest(this.config);
                // If there are any "extra" config options remaining after we remove the
                // ones that are used natively by the plugin, then assume that they should
                // be passed on to workbox-build.getManifest() to generate extra entries.

                if (!((0, _keys2.default)(sanitizedConfig).length > 0)) {
                  _context.next = 19;
                  break;
                }

                // If globPatterns isn't explicitly set, then default to [], instead of
                // the workbox-build.getManifest() default.
                sanitizedConfig.globPatterns = sanitizedConfig.globPatterns || [];

                _context.next = 14;
                return getManifest(sanitizedConfig);

              case 14:
                _ref2 = _context.sent;
                manifestEntries = _ref2.manifestEntries;
                warnings = _ref2.warnings;

                compilation.warnings = compilation.warnings.concat(warnings || []);
                entries = entries.concat(manifestEntries);

              case 19:
                manifestString = stringifyManifest(entries);
                manifestAsset = convertStringToAsset(manifestString);
                manifestHash = getAssetHash(manifestAsset);
                manifestFilename = formatManifestFilename(this.config.precacheManifestFilename, manifestHash);
                pathToManifestFile = relativeToOutputPath(compilation, path.join(this.config.importsDirectory, manifestFilename));

                compilation.assets[pathToManifestFile] = manifestAsset;

                importScriptsArray.push((compilation.options.output.publicPath || '') + pathToManifestFile.split(path.sep).join('/'));

                // workboxSWImports might be null if importWorkboxFrom is 'disabled'.
                if (workboxSWImports) {
                  importScriptsArray.push.apply(importScriptsArray, (0, _toConsumableArray3.default)(workboxSWImports));
                }

                _context.next = 29;
                return readFileWrapper(readFile, this.config.swSrc);

              case 29:
                originalSWString = _context.sent;


                // compilation.fileDependencies needs absolute paths.
                absoluteSwSrc = path.resolve(this.config.swSrc);

                if (Array.isArray(compilation.fileDependencies)) {
                  // webpack v3
                  if (compilation.fileDependencies.indexOf(absoluteSwSrc) === -1) {
                    compilation.fileDependencies.push(absoluteSwSrc);
                  }
                } else if ('add' in compilation.fileDependencies) {
                  // webpack v4; no need to check for membership first, since it's a Set.
                  compilation.fileDependencies.add(absoluteSwSrc);
                }

                importScriptsString = importScriptsArray.map(_stringify2.default).join(', ');
                setConfigString = modulePathPrefix ? `workbox.setConfig({modulePathPrefix: ` + `${(0, _stringify2.default)(modulePathPrefix)}});` : '';
                postInjectionSWString = `importScripts(${importScriptsString});
${setConfigString}
${originalSWString}
`;
                relSwDest = relativeToOutputPath(compilation, this.config.swDest);

                compilation.assets[relSwDest] = convertStringToAsset(postInjectionSWString);

              case 37:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleEmit(_x2, _x3) {
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

      var readFile = compiler.inputFileSystem.readFile.bind(compiler.inputFileSystem);
      if ('hooks' in compiler) {
        // We're in webpack 4+.
        compiler.hooks.emit.tapPromise(this.constructor.name, function (compilation) {
          return _this.handleEmit(compilation, readFile);
        });
      } else {
        // We're in webpack 2 or 3.
        compiler.plugin('emit', function (compilation, callback) {
          _this.handleEmit(compilation, readFile).then(callback).catch(callback);
        });
      }
    }
  }]);
  return InjectManifest;
}();

module.exports = InjectManifest;