'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

exports.__esModule = true;

var _Disposable$CompositeDisposable$SerialDisposable = require('disposables');

var _ComponentHandlerMapping = require('./ComponentHandlerMapping');

var _ComponentHandlerMapping2 = _interopRequireWildcard(_ComponentHandlerMapping);

var _invariant = require('invariant');

var _invariant2 = _interopRequireWildcard(_invariant);

var _values = require('lodash/object/values');

var _values2 = _interopRequireWildcard(_values);

var _xor = require('lodash/array/xor');

var _xor2 = _interopRequireWildcard(_xor);

var ComponentHandlerMap = (function () {
  function ComponentHandlerMap(manager, handlers, onChange) {
    _classCallCheck(this, ComponentHandlerMap);

    this.manager = manager;
    this.onChange = onChange;

    this.changeSubscriptionDisposable = new _Disposable$CompositeDisposable$SerialDisposable.SerialDisposable();
    this.disposable = new _Disposable$CompositeDisposable$SerialDisposable.CompositeDisposable(this.changeSubscriptionDisposable);

    this.createMappings(handlers);
    this.resubscribe();
  }

  ComponentHandlerMap.prototype.createMappings = function createMappings(handlers) {
    var _this = this;

    this.mappings = {};

    Object.keys(handlers).forEach(function (key) {
      var handler = handlers[key];
      var mapping = new _ComponentHandlerMapping2['default'](_this.manager, handler);

      _this.mappings[key] = mapping;
      _this.disposable.add(mapping.getDisposable());
    });
  };

  ComponentHandlerMap.prototype.mapMappings = function mapMappings(selector) {
    var _this2 = this;

    var result = {};

    Object.keys(this.mappings).forEach(function (key) {
      var mapping = _this2.mappings[key];
      result[key] = selector(mapping);
    });

    return result;
  };

  ComponentHandlerMap.prototype.getHandlerIds = function getHandlerIds() {
    return this.mapMappings(function (m) {
      return m.getHandlerId();
    });
  };

  ComponentHandlerMap.prototype.getHandlerMonitors = function getHandlerMonitors() {
    return this.mapMappings(function (m) {
      return m.getHandlerMonitor();
    });
  };

  ComponentHandlerMap.prototype.receiveHandlers = function receiveHandlers(nextHandlers) {
    var _this3 = this;

    var knownKeys = Object.keys(this.mappings);
    var nextKeys = Object.keys(nextHandlers);

    _invariant2['default'](_xor2['default'](knownKeys, nextKeys).length === 0, 'Expected handlers to have stable keys at runtime.');

    var receivedAll = nextKeys.reduce(function (receivedAllYet, key) {
      var mapping = _this3.mappings[key];
      var nextHandler = nextHandlers[key];

      var receivedCurrent = mapping.receiveHandler(nextHandler);
      return receivedAllYet && receivedCurrent;
    }, true);

    if (!receivedAll) {
      this.resubscribe();
    }
  };

  ComponentHandlerMap.prototype.resubscribe = function resubscribe() {
    var handlerIds = this.getHandlerIds();
    var monitor = this.manager.getMonitor();

    var unsubscribe = monitor.subscribe(this.onChange, _values2['default'](handlerIds));
    var disposable = new _Disposable$CompositeDisposable$SerialDisposable.Disposable(unsubscribe);
    this.changeSubscriptionDisposable.setDisposable(disposable);
  };

  ComponentHandlerMap.prototype.getDisposable = function getDisposable() {
    return this.disposable;
  };

  return ComponentHandlerMap;
})();

exports['default'] = ComponentHandlerMap;
module.exports = exports['default'];