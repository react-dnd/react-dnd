#!/bin/sh

# build minified standalone version in dist
rm -rf dist
./node_modules/.bin/webpack

# build ES5 modules in modules
rm -rf modules
./node_modules/.bin/babel src --out-dir modules
