'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

exports.__esModule = true;

var _SerialDisposable = require('disposables');

var _HandlerRegistration = require('./HandlerRegistration');

var _HandlerRegistration2 = _interopRequireWildcard(_HandlerRegistration);

var ComponentHandlerMapping = (function () {
  function ComponentHandlerMapping(manager, handler) {
    _classCallCheck(this, ComponentHandlerMapping);

    this.manager = manager;
    this.registration = null;

    this.disposable = new _SerialDisposable.SerialDisposable();
    this.receiveHandler(handler);
  }

  ComponentHandlerMapping.prototype.getHandlerId = function getHandlerId() {
    return this.registration.getHandlerId();
  };

  ComponentHandlerMapping.prototype.getHandlerMonitor = function getHandlerMonitor() {
    return this.registration.getHandlerMonitor();
  };

  ComponentHandlerMapping.prototype.receiveHandler = function receiveHandler(nextHandler) {
    var registration = this.registration;
    var manager = this.manager;

    if (registration && registration.receiveHandler(nextHandler)) {
      return true;
    }

    var nextRegistration = new _HandlerRegistration2['default'](manager, nextHandler);
    var nextDisposable = nextRegistration.getDisposable();

    this.disposable.setDisposable(nextDisposable);
    this.registration = nextRegistration;

    return false;
  };

  ComponentHandlerMapping.prototype.getDisposable = function getDisposable() {
    return this.disposable;
  };

  return ComponentHandlerMapping;
})();

exports['default'] = ComponentHandlerMapping;
module.exports = exports['default'];