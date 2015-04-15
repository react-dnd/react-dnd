'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

exports.__esModule = true;

var _SerialDisposable = require('disposables');

var _HandlerRegistration = require('./HandlerRegistration');

var _HandlerRegistration2 = _interopRequireWildcard(_HandlerRegistration);

var ComponentHandlerMapping = (function () {
  function ComponentHandlerMapping(registry, handler) {
    _classCallCheck(this, ComponentHandlerMapping);

    this.registry = registry;
    this.registration = null;

    this.disposable = new _SerialDisposable.SerialDisposable();
    this.receiveHandler(handler);
  }

  ComponentHandlerMapping.prototype.getHandlerId = function getHandlerId() {
    if (this.registration) {
      return this.registration.handlerId || null;
    } else {
      return null;
    }
  };

  ComponentHandlerMapping.prototype.addDisposable = function addDisposable(disposable) {
    this.registration.addDisposable(disposable);
  };

  ComponentHandlerMapping.prototype.receiveHandler = function receiveHandler(nextHandler) {
    var registration = this.registration;
    var registry = this.registry;

    if (registration && registration.receiveHandler(nextHandler)) {
      return true;
    }

    var nextRegistration = new _HandlerRegistration2['default'](registry, nextHandler);
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