#!/usr/bin/env node

const {existsSync} = require(`fs`);
const {createRequire, createRequireFromPath} = require(`module`);
const {resolve, dirname} = require(`path`);

const relPnpApiPath = "../../../../.pnp.js";

const absPnpApiPath = resolve(__dirname, relPnpApiPath);
const absRequire = (createRequire || createRequireFromPath)(absPnpApiPath);

const moduleWrapper = tsserver => {
  // VSCode sends the zip paths to TS using the "zip://" prefix, that TS
  // doesn't understand. This layer makes sure to remove the protocol
  // before forwarding it to TS, and to add it back on all returned paths.

  const {isAbsolute} = require(`path`);

  const Session = tsserver.server.Session;
  const {onMessage: originalOnMessage, send: originalSend} = Session.prototype;
  let isVSCode = false;

  return Object.assign(Session.prototype, {
    onMessage(/** @type {string} */ message) {
      const parsedMessage = JSON.parse(message)

      if (
        parsedMessage != null &&
        typeof parsedMessage === 'object' &&
        parsedMessage.arguments &&
        parsedMessage.arguments.hostInfo === 'vscode'
      ) {
        isVSCode = true;
      }

      return originalOnMessage.call(this, JSON.stringify(parsedMessage, (key, value) => {
        return typeof value === 'string' ? removeZipPrefix(value) : value;
      }));
    },

    send(/** @type {any} */ msg) {
      return originalSend.call(this, JSON.parse(JSON.stringify(msg, (key, value) => {
        return typeof value === 'string' ? addZipPrefix(value) : value;
      })));
    }
  });

  function addZipPrefix(str) {
    // We add the `zip:` prefix to both `.zip/` paths and virtual paths
    if (isAbsolute(str) && !str.match(/^\^zip:/) && (str.match(/\.zip\//) || str.match(/\$\$virtual\//))) {
      // Absolute VSCode `Uri.fsPath`s need to start with a slash.
      // VSCode only adds it automatically for supported schemes,
      // so we have to do it manually for the `zip` scheme.
      // The path needs to start with a caret otherwise VSCode doesn't handle the protocol
      // https://github.com/microsoft/vscode/issues/105014#issuecomment-686760910
      return `${isVSCode ? '^' : ''}zip:${str.replace(/^\/?/, `/`)}`;
    } else {
      return str;
    }
  }

  function removeZipPrefix(str) {
    return process.platform === 'win32'
      ? str.replace(/^\^?zip:\//, ``)
      : str.replace(/^\^?zip:/, ``);
  }
};

if (existsSync(absPnpApiPath)) {
  if (!process.versions.pnp) {
    // Setup the environment to be able to require typescript/lib/tsserver.js
    require(absPnpApiPath).setup();
  }
}

// Defer to the real typescript/lib/tsserver.js your application uses
module.exports = moduleWrapper(absRequire(`typescript/lib/tsserver.js`));
