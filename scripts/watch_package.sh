#!/bin/sh
set -e
tsc -w --preserveWatchOutput&
babel --config-file=../../../babel.config.js lib --out-dir dist/esm -w&
babel --config-file=../../../babel.config.cjs.js lib --out-dir dist/cjs -w
