'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

exports.__esModule = true;

var _CompositeDisposable = require('disposables');

var _createConnectRef2 = require('./createConnectRef');

var _createConnectRef3 = _interopRequireWildcard(_createConnectRef2);

var TargetMonitor = (function () {
  function TargetMonitor(manager, targetId) {
    var _this = this;

    _classCallCheck(this, TargetMonitor);

    this.manager = manager;
    this.targetId = targetId;

    this.disposable = new _CompositeDisposable.CompositeDisposable();

    var backend = manager.getBackend();
    var connector = backend.connectDropTarget(targetId);

    Object.keys(connector).forEach(function (name) {
      var _createConnectRef = _createConnectRef3['default'](connector[name]);

      var disposable = _createConnectRef.disposable;
      var ref = _createConnectRef.ref;

      _this.disposable.add(disposable);
      _this[name] = function () {
        return ref;
      };
    });
  }

  TargetMonitor.prototype.canDrop = function canDrop() {
    var monitor = this.manager.getMonitor();
    return monitor.canDropOnTarget(this.targetId);
  };

  TargetMonitor.prototype.isOver = function isOver(options) {
    var monitor = this.manager.getMonitor();
    return monitor.isOverTarget(this.targetId, options);
  };

  TargetMonitor.prototype.getDisposable = function getDisposable() {
    return this.disposable;
  };

  return TargetMonitor;
})();

exports['default'] = TargetMonitor;
module.exports = exports['default'];