"use strict";

var postcss = require('postcss');
var autoPrefixer = require('autoprefixer');

module.exports = function(content) {
  if (this && this.cacheable) {
    // Webpack specific call
    this.cacheable();
  }

  content = postcss()
    .use(autoPrefixer())
    .process(content).css;

  return content;
};
