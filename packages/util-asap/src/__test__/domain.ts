/* eslint-disable @typescript-eslint/no-var-requires */
// In Node.js, use the native domain module
// package.json redirects ./domain to ./browser-domain for browsers.
export const domain = require('domain')
