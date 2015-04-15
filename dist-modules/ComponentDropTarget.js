'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;

var _DropTarget2 = require('dnd-core');

var _invariant = require('invariant');

var _invariant2 = _interopRequireWildcard(_invariant);

var _isString = require('lodash/lang/isString');

var _isString2 = _interopRequireWildcard(_isString);

var _isArray = require('lodash/lang/isArray');

var _isArray2 = _interopRequireWildcard(_isArray);

var _isObject = require('lodash/lang/isObject');

var _isObject2 = _interopRequireWildcard(_isObject);

var ComponentDropTarget = (function (_DropTarget) {
  function ComponentDropTarget(type, _x, props, getComponentRef) {
    var spec = arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, ComponentDropTarget);

    _DropTarget.call(this);

    _invariant2['default'](_isString2['default'](type) || _isArray2['default'](type), 'Expected type to be a string or an array.');
    _invariant2['default'](_isObject2['default'](spec), 'Expected spec to be an object.');

    this.type = type;
    this.spec = spec;
    this.props = props;
    this.getComponentRef = getComponentRef;
  }

  _inherits(ComponentDropTarget, _DropTarget);

  ComponentDropTarget.prototype.receive = function receive(handler) {
    if (!(handler instanceof ComponentDropTarget)) {
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

  ComponentDropTarget.prototype.canDrop = function canDrop() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (this.spec.canDrop) {
      var _spec$canDrop;

      return (_spec$canDrop = this.spec.canDrop).call.apply(_spec$canDrop, [null, this.props].concat(args));
    } else {
      var _DropTarget$prototype$canDrop;

      return (_DropTarget$prototype$canDrop = _DropTarget.prototype.canDrop).call.apply(_DropTarget$prototype$canDrop, [this].concat(args));
    }
  };

  ComponentDropTarget.prototype.hover = function hover() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (this.spec.hover) {
      var _spec$hover;

      return (_spec$hover = this.spec.hover).call.apply(_spec$hover, [null, this.props].concat(args, [this.getComponentRef()]));
    } else {
      var _DropTarget$prototype$hover;

      return (_DropTarget$prototype$hover = _DropTarget.prototype.hover).call.apply(_DropTarget$prototype$hover, [this].concat(args));
    }
  };

  ComponentDropTarget.prototype.drop = function drop() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    if (this.spec.drop) {
      var _spec$drop;

      return (_spec$drop = this.spec.drop).call.apply(_spec$drop, [null, this.props].concat(args, [this.getComponentRef()]));
    } else {
      var _DropTarget$prototype$drop;

      return (_DropTarget$prototype$drop = _DropTarget.prototype.drop).call.apply(_DropTarget$prototype$drop, [this].concat(args));
    }
  };

  return ComponentDropTarget;
})(_DropTarget2.DropTarget);

exports['default'] = ComponentDropTarget;
module.exports = exports['default'];