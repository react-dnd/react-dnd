'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;

var _memoize = require('lodash/function/memoize');

var _memoize2 = _interopRequireWildcard(_memoize);

var isFirefox = _memoize2['default'](function () {
  return /firefox/i.test(navigator.userAgent);
});

exports.isFirefox = isFirefox;
var isSafari = _memoize2['default'](function () {
  return Boolean(window.safari);
});
exports.isSafari = isSafari;