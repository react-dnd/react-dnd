'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var ModuleFilenameHelpers = require('webpack/lib/ModuleFilenameHelpers');

var getAssetHash = require('./get-asset-hash');
var resolveWebpackUrl = require('./resolve-webpack-url');

/**
 * A single manifest entry that Workbox can precache.
 * When possible, we leave out the revision information, which tells Workbox
 * that the URL contains enough info to uniquely version the asset.
 *
 * @param {Array<string>} knownHashes All of the hashes that are associated
 * with this webpack build.
 * @param {string} url webpack asset url path
 * @param {string} [revision] A revision hash for the entry
 * @return {module:workbox-build.ManifestEntry} A single manifest entry
 *
 * @private
 */
function getEntry(knownHashes, url, revision) {
  // We're assuming that if the URL contains any of the known hashes
  // (either the short or full chunk hash or compilation hash) then it's
  // already revisioned, and we don't need additional out-of-band revisioning.
  if (!revision || knownHashes.some(function (hash) {
    return url.includes(hash);
  })) {
    return { url };
  }
  return { revision, url };
}

/**
 * Filter to narrow down the asset list to chunks that:
 * - have a name.
 * - if there's a whitelist, the chunk's name is in the whitelist.
 * - if there's a blacklist, the chunk's name is not in the blacklist.
 *
 * TODO:
 *  Filter files by size:
 *    https://github.com/GoogleChrome/workbox/pull/808#discussion_r139606242
 *  Filter files that match `staticFileGlobsIgnorePatterns` (or something)
 *  but filter for [/\.map$/, /asset-manifest\.json$/] by default:
 *    https://github.com/GoogleChrome/workbox/pull/808#discussion_r140565156
 *
 * @param {Object<string, Object>} assetMetadata Metadata about the assets.
 * @param {Array<string>} [whitelist] Chunk names to include.
 * @param {Array<string>} [blacklist] Chunk names to exclude.
 * @return {Object<string, Object>} Filtered asset metadata.
 *
 * @private
 */
function filterAssets(assetMetadata, whitelist, blacklist) {
  var filteredMapping = {};

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)((0, _entries2.default)(assetMetadata)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

      var file = _ref2[0];
      var metadata = _ref2[1];

      var chunkName = metadata.chunkName;
      // This file is whitelisted if:
      // - Trivially, if there is no whitelist defined.
      // - There is a whitelist and our file is associated with a chunk whose name
      // is listed.
      var isWhitelisted = whitelist.length === 0 || whitelist.includes(chunkName);

      // This file is blacklisted if our file is associated with a chunk whose
      // name is listed.
      var isBlacklisted = blacklist.includes(chunkName);

      // Only include this entry in the filtered mapping if we're whitelisted and
      // not blacklisted.
      if (isWhitelisted && !isBlacklisted) {
        filteredMapping[file] = metadata;
      }
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

  return filteredMapping;
}

/**
 * Takes in compilation.assets and compilation.chunks, and assigns metadata
 * to each file listed in assets:
 *
 * - If the asset was created by a chunk, it assigns the existing chunk name and
 * chunk hash.
 * - If the asset was created outside of a chunk, it assigns a chunk name of ''
 * and generates a hash of the asset.
 *
 * @param {Object} assets The compilation.assets
 * @param {Array<Object>} chunks The compilation.chunks
 * @return {Object<string, Object>} Mapping of asset paths to chunk name and
 * hash metadata.
 *
 * @private
 */
function generateMetadataForAssets(assets, chunks) {
  var mapping = {};

  // Start out by getting metadata for all the assets associated with a chunk.
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _getIterator3.default)(chunks), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var chunk = _step2.value;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = (0, _getIterator3.default)(chunk.files), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _file = _step4.value;

          mapping[_file] = {
            chunkName: chunk.name,
            hash: chunk.renderedHash
          };
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }

    // Next, loop through the total list of assets and find anything that isn't
    // associated with a chunk.
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = (0, _getIterator3.default)((0, _entries2.default)(assets)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _ref3 = _step3.value;

      var _ref4 = (0, _slicedToArray3.default)(_ref3, 2);

      var file = _ref4[0];
      var asset = _ref4[1];

      if (file in mapping) {
        continue;
      }

      mapping[file] = {
        // Just use an empty string to denote the lack of chunk association.
        chunkName: '',
        hash: getAssetHash(asset)
      };
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return mapping;
}

/**
 * Given an assetMetadata mapping, returns a Set of all of the hashes that
 * are associated with at least one asset.
 *
 * @param {Object<string, Object>} assetMetadata Mapping of asset paths to chunk
 * name and hash metadata.
 * @return {Set} The known hashes associated with an asset.
 *
 * @private
 */
function getKnownHashesFromAssets(assetMetadata) {
  var knownHashes = new _set2.default();
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = (0, _getIterator3.default)((0, _values2.default)(assetMetadata)), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var metadata = _step5.value;

      knownHashes.add(metadata.hash);
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return knownHashes;
}

/**
 * Generate an array of manifest entries using webpack's compilation data.
 *
 * @param {Object} compilation webpack compilation
 * @param {Object} config
 * @return {Array<workbox.build.ManifestEntry>}
 *
 * @private
 */
function getManifestEntriesFromCompilation(compilation, config) {
  var blacklistedChunkNames = config.excludeChunks;
  var whitelistedChunkNames = config.chunks;
  var assets = compilation.assets,
      chunks = compilation.chunks;
  var publicPath = compilation.options.output.publicPath;


  var assetMetadata = generateMetadataForAssets(assets, chunks);
  var filteredAssetMetadata = filterAssets(assetMetadata, whitelistedChunkNames, blacklistedChunkNames);

  var knownHashes = [compilation.hash, compilation.fullHash].concat((0, _toConsumableArray3.default)(getKnownHashesFromAssets(filteredAssetMetadata))).filter(function (hash) {
    return !!hash;
  });

  var manifestEntries = [];
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = (0, _getIterator3.default)((0, _entries2.default)(filteredAssetMetadata)), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var _ref5 = _step6.value;

      var _ref6 = (0, _slicedToArray3.default)(_ref5, 2);

      var file = _ref6[0];
      var metadata = _ref6[1];

      // Filter based on test/include/exclude options set in the config,
      // following webpack's conventions.
      // This matches the behavior of, e.g., UglifyJS's webpack plugin.
      if (!ModuleFilenameHelpers.matchObject(config, file)) {
        continue;
      }

      var publicUrl = resolveWebpackUrl(publicPath, file);
      var manifestEntry = getEntry(knownHashes, publicUrl, metadata.hash);
      manifestEntries.push(manifestEntry);
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  return manifestEntries;
}

module.exports = getManifestEntriesFromCompilation;