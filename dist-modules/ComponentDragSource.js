"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var DragSource = require("dnd-core").DragSource;
var invariant = _interopRequire(require("react/lib/invariant"));

var isString = _interopRequire(require("lodash/lang/isString"));

var isObject = _interopRequire(require("lodash/lang/isObject"));

var ComponentDragSource = (function (DragSource) {
  function ComponentDragSource(type, spec, props) {
    _classCallCheck(this, ComponentDragSource);

    invariant(isString(type), "Expected type to be a string.");
    invariant(isObject(spec), "Expected spec to be an object.");

    this.type = type;
    this.spec = spec;
    this.props = props;
  }

  _inherits(ComponentDragSource, DragSource);

  _prototypeProperties(ComponentDragSource, null, {
    receive: {
      value: function receive(handler) {
        if (!(handler instanceof ComponentDragSource)) {
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
    canDrag: {
      value: function canDrag() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (this.spec.canDrag) {
          var _spec$canDrag;
          return (_spec$canDrag = this.spec.canDrag).call.apply(_spec$canDrag, [null, this.props].concat(args));
        } else {
          return _get(Object.getPrototypeOf(ComponentDragSource.prototype), "canDrag", this).apply(this, args);
        }
      },
      writable: true,
      configurable: true
    },
    isDragging: {
      value: function isDragging() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (this.spec.isDragging) {
          var _spec$isDragging;
          return (_spec$isDragging = this.spec.isDragging).call.apply(_spec$isDragging, [null, this.props].concat(args));
        } else {
          return _get(Object.getPrototypeOf(ComponentDragSource.prototype), "isDragging", this).apply(this, args);
        }
      },
      writable: true,
      configurable: true
    },
    beginDrag: {
      value: function beginDrag() {
        var _spec$beginDrag;
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return (_spec$beginDrag = this.spec.beginDrag).call.apply(_spec$beginDrag, [null, this.props].concat(args));
      },
      writable: true,
      configurable: true
    },
    endDrag: {
      value: function endDrag() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (this.spec.endDrag) {
          var _spec$endDrag;
          return (_spec$endDrag = this.spec.endDrag).call.apply(_spec$endDrag, [null, this.props].concat(args));
        } else {
          return _get(Object.getPrototypeOf(ComponentDragSource.prototype), "endDrag", this).apply(this, args);
        }
      },
      writable: true,
      configurable: true
    }
  });

  return ComponentDragSource;
})(DragSource);

module.exports = ComponentDragSource;