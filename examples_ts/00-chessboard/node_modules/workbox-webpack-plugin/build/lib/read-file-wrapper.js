"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

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
 * A wrapper that calls readFileFn and returns a promise for the contents of
 * filePath.
 *
 * readFileFn is expected to be set to compiler.inputFileSystem.readFile, to
 * ensure compatibility with webpack dev server's in-memory filesystem.
 *
 * @param {Function} readFileFn The function to use for readFile.
 * @param {string} filePath The path to the file to read.
 * @return {Promise<string>} The contents of the file.
 * @private
 */
function readFileWrapper(readFileFn, filePath) {
  return new _promise2.default(function (resolve, reject) {
    readFileFn(filePath, function (error, data) {
      if (error) {
        return reject(error);
      }
      resolve(data);
    });
  });
}

module.exports = readFileWrapper;