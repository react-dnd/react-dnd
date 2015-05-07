"use strict";

var postcss = require('postcss');
var autoPrefixer = require('autoprefixer');
var customProperties = require('postcss-custom-properties');
var cssVars = require('../src/stubs/cssVar');

function escapeSlash(match) {
  return match.replace(/\//g, '_');
}

function slashTransform(content) {
  return content.replace(/\.[\w\/\:\.]+(\s|\,)/g, escapeSlash);
}

module.exports = function(content) {
  if (this && this.cacheable) {
    // Webpack specific call
    this.cacheable();
  }

  content = slashTransform(content);
  content = postcss()
    .use(customProperties({variables: cssVars.CSS_VARS}))
    .use(autoPrefixer())
    .process(content).css;

  return content;
};
