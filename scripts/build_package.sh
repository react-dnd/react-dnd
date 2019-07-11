#!/bin/sh
npx babel --config-file=../../../babel.config.js src --ignore="src/**/__tests__/**" --out-dir lib --extensions '.ts,.tsx' &
npx babel --config-file=../../../babel.config.cjs.js src --ignore="src/**/__tests__/**" --out-dir dist/cjs --extensions '.ts,.tsx' &
npx tsc &
wait