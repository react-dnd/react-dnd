"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var memoize = require('lodash/memoize');
exports.isFirefox = memoize(function () {
    return /firefox/i.test(navigator.userAgent);
});
exports.isSafari = memoize(function () { return Boolean(window.safari); });
