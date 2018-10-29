#!/bin/bash
set -e
PATH=$(npm bin):$PATH

rm -rf ./__site__
rm -rf ./__site_prerender__
webpack --mode production --config "$PWD/site/webpack-client.config.js"
webpack --mode production --config "$PWD/site/webpack-prerender.config.js"
NODE_ENV=production ts-node ./scripts/buildSiteIndexPages.ts
