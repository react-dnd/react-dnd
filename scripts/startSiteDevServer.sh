#!/bin/bash
set -e
PATH=$(npm bin):$PATH

rm -rf ./__site__
rm -rf ./__site_prerender__
webpack --config "$PWD/site/webpack-prerender.config.js"
./scripts/buildSiteIndexPages.sh
webpack-dev-server --config "$PWD/site/webpack-client.config.js" --hot --content-base __site__
