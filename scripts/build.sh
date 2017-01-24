#!/bin/sh

# build minified standalone version in dist
rm -rf dist
BABEL_ENV=commonjs ./node_modules/.bin/webpack --output-filename=dist/ReactDnD.js
BABEL_ENV=commonjs ./node_modules/.bin/webpack --output-filename=dist/ReactDnD.min.js --optimize-minimize

# build ES5 modules to lib
rm -rf lib
BABEL_ENV=commonjs ./node_modules/.bin/babel src --out-dir lib

# build ES6 modules to es
rm -rf es
BABEL_ENV=es ./node_modules/.bin/babel src --out-dir es
