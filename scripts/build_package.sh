#!/bin/sh
set -e
tsc
babel --config-file=../../../babel.config.js lib --ignore="src/**/__tests__/**" --out-dir dist/esm &
babel --config-file=../../../babel.config.cjs.js lib --ignore="src/**/__tests__/**" --out-dir dist/cjs &
wait

if [ -f ./rollup.config.js ]
then
  rollup -c rollup.config.js
fi
