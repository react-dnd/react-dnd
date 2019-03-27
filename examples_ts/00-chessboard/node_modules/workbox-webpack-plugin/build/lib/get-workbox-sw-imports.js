'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * @param {Object} compilation The webpack compilation.
 * @param {Object} config The options passed to the plugin constructor.
 * - config.excludeChunks may be modified by this function if
 *   config.importWorkboxFrom is set to a chunk name.
 * - config.modulePathPrefix may be modified by this function if
 *   config.importWorkboxFrom is set to 'local'.
 * @return {Array<string>|null} A list of URLs to use to import the Workbox
 * runtime code, or null if importWorkboxFrom is 'disabled'.
 * @private
 */
var getWorkboxSWImport = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(compilation, config) {
    var wbDir, workboxSWImport, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, chunk;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = config.importWorkboxFrom;
            _context.next = _context.t0 === 'cdn' ? 3 : _context.t0 === 'local' ? 4 : _context.t0 === 'disabled' ? 10 : 11;
            break;

          case 3:
            return _context.abrupt('return', [getModuleUrl('workbox-sw')]);

          case 4:
            _context.next = 6;
            return copyWorkboxLibraries(path.join(compilation.options.output.path, config.importsDirectory));

          case 6:
            wbDir = _context.sent;


            // We need to set this extra option in the config to ensure that the
            // workbox library loader knows where to get the local libraries from.
            config.modulePathPrefix = (compilation.options.output.publicPath || '') + path.join(config.importsDirectory, wbDir).split(path.sep).join('/');

            workboxSWImport = config.modulePathPrefix + '/workbox-sw.js';
            return _context.abrupt('return', [workboxSWImport]);

          case 10:
            return _context.abrupt('return', null);

          case 11:
            // If importWorkboxFrom is anything else, then treat it as the name of
            // a webpack chunk that corresponds to the custom compilation of the
            // Workbox code.
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 14;
            _iterator = (0, _getIterator3.default)(compilation.chunks);

          case 16:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 24;
              break;
            }

            chunk = _step.value;

            if (!(chunk.name === config.importWorkboxFrom)) {
              _context.next = 21;
              break;
            }

            config.excludeChunks.push(chunk.name);
            return _context.abrupt('return', chunk.files.map(function (file) {
              return (compilation.options.output.publicPath || '') + file;
            }));

          case 21:
            _iteratorNormalCompletion = true;
            _context.next = 16;
            break;

          case 24:
            _context.next = 30;
            break;

          case 26:
            _context.prev = 26;
            _context.t1 = _context['catch'](14);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 30:
            _context.prev = 30;
            _context.prev = 31;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 33:
            _context.prev = 33;

            if (!_didIteratorError) {
              _context.next = 36;
              break;
            }

            throw _iteratorError;

          case 36:
            return _context.finish(33);

          case 37:
            return _context.finish(30);

          case 38:
            throw Error(`importWorkboxFrom was set to ` + `'${config.importWorkboxFrom}', which is not an existing chunk name.`);

          case 39:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[14, 26, 30, 38], [31,, 33, 37]]);
  }));

  return function getWorkboxSWImport(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

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

var path = require('path');

var _require = require('workbox-build'),
    copyWorkboxLibraries = _require.copyWorkboxLibraries,
    getModuleUrl = _require.getModuleUrl;

module.exports = getWorkboxSWImport;