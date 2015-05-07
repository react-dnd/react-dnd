#!/bin/sh

# build minified standalone version in dist
./node_modules/.bin/webpack

# build ES5 modules in modules
./node_modules/.bin/babel src --out-dir modules
