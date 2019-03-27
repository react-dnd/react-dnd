'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

/**
 * Helper method that sanitizes the config based on what
 * workbox-build.getManifest() expects.
 *
 * @param {Object} originalConfig
 * @return {Object} Sanitized config.
 * @private
 */
function forGetManifest(originalConfig) {
  var propertiesToRemove = ['chunks', 'exclude', 'excludeChunks', 'importScripts', 'importWorkboxFrom', 'importsDirectory', 'include', 'precacheManifestFilename', 'swDest', 'swSrc', 'test'];

  return sanitizeConfig(originalConfig, propertiesToRemove);
}

/**
 * Helper method that sanitizes the config based on what
 * workbox-build.generateSWString() expects.
 *
 * @param {Object} originalConfig
 * @return {Object} Sanitized config.
 * @private
 */
function forGenerateSWString(originalConfig) {
  var propertiesToRemove = ['chunks', 'exclude', 'excludeChunks', 'importWorkboxFrom', 'importsDirectory', 'include', 'precacheManifestFilename', 'swDest', 'test'];

  return sanitizeConfig(originalConfig, propertiesToRemove);
}

/**
 * Given a config object, make a shallow copy via Object.assign(), and remove
 * the properties from the copy that we know are webpack-plugin
 * specific, so that the remaining properties can be passed through to the
 * appropriate workbox-build method.
 *
 * @param {Object} originalConfig
 * @param {Array<string>} propertiesToRemove
 * @return {Object} A copy of config, sanitized.
 *
 * @private
 */
function sanitizeConfig(originalConfig, propertiesToRemove) {
  var config = (0, _assign2.default)({}, originalConfig);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(propertiesToRemove), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var property = _step.value;

      delete config[property];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return config;
}

module.exports = {
  forGetManifest,
  forGenerateSWString
};