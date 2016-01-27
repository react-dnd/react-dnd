#!/usr/bin/env node
require('babel-core/register');

// -*- mode: js -*-
"use strict";

var fs = require('fs');
var path = require('path');
var glob = require('glob');
var Constants = require('../site/Constants');
var renderPath = require('../__site_prerender__/renderPath');
var flatten = require('lodash/flatten');

var sitePath = path.join(__dirname, '../__site__');
if (!fs.existsSync(sitePath)) {
  fs.mkdirSync(sitePath);
}

var files = {
  'main.css': 'main.css',
  'main.js': 'main.js'
};

if (process.env.NODE_ENV === 'production') {
  Object.keys(files).forEach(function(fileName) {
    var searchPath = path.join(
      __dirname,
      '../__site__/'  + fileName.replace('.', '-*.')
    );
    var hashedFilename = glob.sync(searchPath)[0];
    if (!hashedFilename) {
      throw new Error(
        'Hashed file of "' + fileName + '" ' +
        'not found when searching with "' + searchPath + '"'
      );
    }

    files[fileName] = path.basename(hashedFilename);
  });
}

var locations = flatten([
  Constants.APIPages.map(function (group) {
    return group.pages;
  }),
  Constants.ExamplePages.map(function (group) {
    return group.pages;
  }),
  Constants.Pages
]).reduce(function(paths, pages) {
  return paths.concat(
    Object.keys(pages).map(function(key) {
      return pages[key].location;
    })
  );
}, []);

locations.forEach(function(fileName) {
  var props = {
    location: fileName,
    devMode: process.env.NODE_ENV !== 'production',
    files: files
  };

  renderPath(fileName, props, function(content) {
    fs.writeFileSync(
      path.join(sitePath, fileName),
      content
    );
  });
});
