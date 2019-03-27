const memoize = require('lodash/memoize');
export const isFirefox = memoize(() => /firefox/i.test(navigator.userAgent));
export const isSafari = memoize(() => Boolean(window.safari));
