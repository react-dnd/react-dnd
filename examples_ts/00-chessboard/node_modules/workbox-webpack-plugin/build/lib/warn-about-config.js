'use strict';

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

module.exports = function (config) {
  var moreInfoUrl = 'https://goo.gl/EQ4Rhm';

  var globOptions = ['globDirectory', 'globFollow', 'globIgnores', 'globPatterns', 'globStrict'];

  var usedGlobOptions = globOptions.filter(function (option) {
    return option in config;
  });
  if (usedGlobOptions.length > 0) {
    return `You're using the following Workbox configuration option` + `${usedGlobOptions.length === 1 ? '' : 's'}: ` + `[${usedGlobOptions.join(', ')}]. In Workbox v3 and later, this is ` + `usually not needed. Please see ${moreInfoUrl} for more info.`;
  }

  var optionsToWarnAboutWhenGlobPatternsIsNotSet = ['dontCacheBustUrlsMatching', 'manifestTransforms', 'maximumFileSizeToCacheInBytes', 'modifyUrlPrefix'];

  var usedNoopOptions = optionsToWarnAboutWhenGlobPatternsIsNotSet.filter(function (option) {
    return option in config;
  });
  if (usedNoopOptions.length > 0) {
    return `You're using the following Workbox configuration option` + `${usedGlobOptions.length === 1 ? '' : 's'}: ` + `[${usedNoopOptions.join(', ')}]. This will not have any effect, as ` + `it will only modify files that are matched via 'globPatterns'. You ` + `can remove them from your config, and learn more at ${moreInfoUrl}`;
  }

  return null;
};