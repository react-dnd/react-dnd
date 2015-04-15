'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _DragSource2 = require('dnd-core');

var _invariant = require('invariant');

var _invariant2 = _interopRequireWildcard(_invariant);

var _isString = require('lodash/lang/isString');

var _isString2 = _interopRequireWildcard(_isString);

var _isObject = require('lodash/lang/isObject');

var _isObject2 = _interopRequireWildcard(_isObject);

var ComponentDragSource = (function (_DragSource) {
  function ComponentDragSource(type, spec, props, getComponentRef) {
    _classCallCheck(this, ComponentDragSource);

    _DragSource.call(this);

    _invariant2['default'](_isString2['default'](type), 'Expected type to be a string.');
    _invariant2['default'](_isObject2['default'](spec), 'Expected spec to be an object.');

    this.type = type;
    this.spec = spec;
    this.props = props;
    this.getComponentRef = getComponentRef;
  }

  _inherits(ComponentDragSource, _DragSource);

  ComponentDragSource.prototype.receive = function receive(handler) {
    if (!(handler instanceof ComponentDragSource)) {
      return false;
    }

    if (this.type !== handler.type) {
      return false;
    }

    this.spec = handler.spec;
    this.props = handler.props;
    this.getComponentRef = handler.getComponentRef;
    return true;
  };

  ComponentDragSource.prototype.canDrag = function canDrag() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (this.spec.canDrag) {
      var _spec$canDrag;

      return (_spec$canDrag = this.spec.canDrag).call.apply(_spec$canDrag, [null, this.props].concat(args));
    } else {
      var _DragSource$prototype$canDrag;

      return (_DragSource$prototype$canDrag = _DragSource.prototype.canDrag).call.apply(_DragSource$prototype$canDrag, [this].concat(args));
    }
  };

  ComponentDragSource.prototype.isDragging = function isDragging() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (this.spec.isDragging) {
      var _spec$isDragging;

      return (_spec$isDragging = this.spec.isDragging).call.apply(_spec$isDragging, [null, this.props].concat(args));
    } else {
      var _DragSource$prototype$isDragging;

      return (_DragSource$prototype$isDragging = _DragSource.prototype.isDragging).call.apply(_DragSource$prototype$isDragging, [this].concat(args));
    }
  };

  ComponentDragSource.prototype.beginDrag = function beginDrag() {
    var _spec$beginDrag;

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return (_spec$beginDrag = this.spec.beginDrag).call.apply(_spec$beginDrag, [null, this.props].concat(args, [this.getComponentRef()]));
  };

  ComponentDragSource.prototype.endDrag = function endDrag() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    if (this.spec.endDrag) {
      var _spec$endDrag;

      return (_spec$endDrag = this.spec.endDrag).call.apply(_spec$endDrag, [null, this.props].concat(args, [this.getComponentRef()]));
    } else {
      var _DragSource$prototype$endDrag;

      return (_DragSource$prototype$endDrag = _DragSource.prototype.endDrag).call.apply(_DragSource$prototype$endDrag, [this].concat(args));
    }
  };

  return ComponentDragSource;
})(_DragSource2.DragSource);

exports['default'] = ComponentDragSource;
module.exports = exports['default'];