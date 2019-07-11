#!/bin/sh
npx tsc
npx babel --config-file=../../../babel.config.js lib --ignore="src/**/__tests__/**" --out-dir dist/esm &
npx babel --config-file=../../../babel.config.cjs.js lib --ignore="src/**/__tests__/**" --out-dir dist/cjs &
wait