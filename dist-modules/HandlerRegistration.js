'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

exports.__esModule = true;

var _invariant = require('invariant');

var _invariant2 = _interopRequireWildcard(_invariant);

var _Disposable$CompositeDisposable = require('disposables');

var _ComponentDragSource = require('./ComponentDragSource');

var _ComponentDragSource2 = _interopRequireWildcard(_ComponentDragSource);

var _ComponentDropTarget = require('./ComponentDropTarget');

var _ComponentDropTarget2 = _interopRequireWildcard(_ComponentDropTarget);

var _SourceMonitor = require('./SourceMonitor');

var _SourceMonitor2 = _interopRequireWildcard(_SourceMonitor);

var _TargetMonitor = require('./TargetMonitor');

var _TargetMonitor2 = _interopRequireWildcard(_TargetMonitor);

var HandlerRegistration = (function () {
  function HandlerRegistration(manager, handler) {
    _classCallCheck(this, HandlerRegistration);

    this.manager = manager;

    this.handler = handler;
    this.handlerId = null;
    this.handlerMonitor = null;

    var innerDisposable = new _Disposable$CompositeDisposable.Disposable(this.unregister.bind(this));
    this.disposable = new _Disposable$CompositeDisposable.CompositeDisposable(innerDisposable);

    this.register();
  }

  HandlerRegistration.prototype.getHandlerId = function getHandlerId() {
    return this.handlerId;
  };

  HandlerRegistration.prototype.getHandlerMonitor = function getHandlerMonitor() {
    return this.handlerMonitor;
  };

  HandlerRegistration.prototype.receiveHandler = function receiveHandler(nextHandler) {
    return this.handler.receive(nextHandler);
  };

  HandlerRegistration.prototype.addDisposable = function addDisposable(disposable) {
    this.disposable.add(disposable);
  };

  HandlerRegistration.prototype.register = function register() {
    _invariant2['default'](!this.handlerId, 'Already registered.');
    var manager = this.manager;
    var handler = this.handler;
    var type = handler.type;

    var registry = manager.getRegistry();
    if (handler instanceof _ComponentDragSource2['default']) {
      this.handlerId = registry.addSource(type, handler);
      this.handlerMonitor = new _SourceMonitor2['default'](manager, this.handlerId);
    } else if (handler instanceof _ComponentDropTarget2['default']) {
      this.handlerId = registry.addTarget(type, handler);
      this.handlerMonitor = new _TargetMonitor2['default'](manager, this.handlerId);
    } else {
      _invariant2['default'](false, 'Handle is neither a source nor a target.');
    }

    var monitorDisposable = this.handlerMonitor.getDisposable();
    this.disposable.add(monitorDisposable);
  };

  HandlerRegistration.prototype.unregister = function unregister() {
    _invariant2['default'](this.handlerId, 'Not registered.');
    var manager = this.manager;
    var handler = this.handler;
    var handlerId = this.handlerId;

    var registry = manager.getRegistry();
    if (handler instanceof _ComponentDragSource2['default']) {
      registry.removeSource(handlerId);
    } else if (handler instanceof _ComponentDropTarget2['default']) {
      registry.removeTarget(handlerId);
    } else {
      _invariant2['default'](false, 'Handle is neither a source nor a target.');
    }

    this.handlerId = null;
    this.handlerMonitor = null;
    this.manager = null;
  };

  HandlerRegistration.prototype.getDisposable = function getDisposable() {
    return this.disposable;
  };

  return HandlerRegistration;
})();

exports['default'] = HandlerRegistration;
module.exports = exports['default'];