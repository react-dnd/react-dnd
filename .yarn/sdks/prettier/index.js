#!/usr/bin/env node

const {existsSync} = require(`fs`);
const {createRequire, createRequireFromPath} = require(`module`);
const {resolve, dirname} = require(`path`);

const relPnpApiPath = "../../../.pnp.js";

const absPnpApiPath = resolve(__dirname, relPnpApiPath);
const absRequire = (createRequire || createRequireFromPath)(absPnpApiPath);

if (existsSync(absPnpApiPath)) {
  if (!process.versions.pnp) {
    // Setup the environment to be able to require prettier/index.js
    require(absPnpApiPath).setup();
  }

  const pnpifyResolution = require.resolve(`@yarnpkg/pnpify`, {paths: [dirname(absPnpApiPath)]});
  if (typeof global[`__yarnpkg_sdk_is_using_pnpify__`] === `undefined`) {
    Object.defineProperty(global, `__yarnpkg_sdk_is_using_pnpify__`, {configurable: true, value: true});

    process.env.NODE_OPTIONS += ` -r ${pnpifyResolution}`;

    // Apply PnPify to the current process
    absRequire(pnpifyResolution).patchFs();
  }
}

// Defer to the real prettier/index.js your application uses
module.exports = absRequire(`prettier/index.js`);
