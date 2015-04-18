'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

exports.__esModule = true;

var _CompositeDisposable = require('disposables');

var _createConnectRef2 = require('./createConnectRef');

var _createConnectRef3 = _interopRequireWildcard(_createConnectRef2);

var SourceMonitor = (function () {
  function SourceMonitor(manager, sourceId) {
    var _this = this;

    _classCallCheck(this, SourceMonitor);

    this.manager = manager;
    this.sourceId = sourceId;

    this.disposable = new _CompositeDisposable.CompositeDisposable();

    var backend = manager.getBackend();
    var connector = backend.connectDragSource(sourceId);

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

  SourceMonitor.prototype.canDrag = function canDrag() {
    var monitor = this.manager.getMonitor();
    return monitor.canDragSource(this.sourceId);
  };

  SourceMonitor.prototype.isDragging = function isDragging() {
    var monitor = this.manager.getMonitor();
    return monitor.isDraggingSource(this.sourceId);
  };

  SourceMonitor.prototype.getDisposable = function getDisposable() {
    return this.disposable;
  };

  return SourceMonitor;
})();

exports['default'] = SourceMonitor;
module.exports = exports['default'];