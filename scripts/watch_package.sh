#!/bin/sh
set -e
npx tsc -w --preserveWatchOutput&
npx babel --config-file=../../../babel.config.js lib --out-dir dist/esm -w&
npx babel --config-file=../../../babel.config.cjs.js lib --out-dir dist/cjs -w
