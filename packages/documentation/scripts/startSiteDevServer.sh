#!/bin/bash
set -e
PATH=$(npm bin):$PATH

rm -rf ./__site__
rm -rf ./__site_prerender__
./node_modules/.bin/webpack --config "$PWD/site/webpack-prerender.config.js"
./scripts/buildSiteIndexPages.sh
./node_modules/.bin/webpack-dev-server --config "$PWD/site/webpack-client.config.js" --hot --content-base __site__
