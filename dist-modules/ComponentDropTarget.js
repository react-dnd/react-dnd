"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var DropTarget = require("dnd-core").DropTarget;
var invariant = _interopRequire(require("react/lib/invariant"));

var isString = _interopRequire(require("lodash/lang/isString"));

var isArray = _interopRequire(require("lodash/lang/isArray"));

var isObject = _interopRequire(require("lodash/lang/isObject"));

var ComponentDropTarget = (function (DropTarget) {
  function ComponentDropTarget(type, _x, props) {
    var spec = arguments[1] === undefined ? {} : arguments[1];
    _classCallCheck(this, ComponentDropTarget);

    invariant(isString(type) || isArray(type), "Expected type to be a string or an array.");
    invariant(isObject(spec), "Expected spec to be an object.");

    this.type = type;
    this.spec = spec;
    this.props = props;
  }

  _inherits(ComponentDropTarget, DropTarget);

  _prototypeProperties(ComponentDropTarget, null, {
    receive: {
      value: function receive(handler) {
        if (!(handler instanceof ComponentDropTarget)) {
          return false;
        }

        if (this.type !== handler.type) {
          return false;
        }

        this.spec = handler.spec;
        this.props = handler.props;
        return true;
      },
      writable: true,
      configurable: true
    },
    canDrop: {
      value: function canDrop() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (this.spec.canDrop) {
          var _spec$canDrop;
          return (_spec$canDrop = this.spec.canDrop).call.apply(_spec$canDrop, [null, this.props].concat(args));
        } else {
          return _get(Object.getPrototypeOf(ComponentDropTarget.prototype), "canDrop", this).apply(this, args);
        }
      },
      writable: true,
      configurable: true
    },
    hover: {
      value: function hover() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (this.spec.hover) {
          var _spec$hover;
          return (_spec$hover = this.spec.hover).call.apply(_spec$hover, [null, this.props].concat(args));
        } else {
          return _get(Object.getPrototypeOf(ComponentDropTarget.prototype), "hover", this).apply(this, args);
        }
      },
      writable: true,
      configurable: true
    },
    drop: {
      value: function drop() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (this.spec.drop) {
          var _spec$drop;
          return (_spec$drop = this.spec.drop).call.apply(_spec$drop, [null, this.props].concat(args));
        } else {
          return _get(Object.getPrototypeOf(ComponentDropTarget.prototype), "drop", this).apply(this, args);
        }
      },
      writable: true,
      configurable: true
    }
  });

  return ComponentDropTarget;
})(DropTarget);

module.exports = ComponentDropTarget;