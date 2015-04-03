"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = configureDragDrop;
var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var PropTypes = _react.PropTypes;
var findDOMNode = _react.findDOMNode;
var ComponentDragSource = _interopRequire(require("./ComponentDragSource"));

var ComponentDropTarget = _interopRequire(require("./ComponentDropTarget"));

var shallowEqual = _interopRequire(require("./utils/shallowEqual"));

var shallowEqualScalar = _interopRequire(require("./utils/shallowEqualScalar"));

var assign = _interopRequire(require("lodash/object/assign"));

var memoize = _interopRequire(require("lodash/function/memoize"));

var invariant = _interopRequire(require("react/lib/invariant"));

var DEFAULT_KEY = "__default__";

function configureDragDrop(InnerComponent, _ref) {
  var configure = _ref.configure;
  var inject = _ref.inject;
  var _ref$arePropsEqual = _ref.arePropsEqual;
  var arePropsEqual = _ref$arePropsEqual === undefined ? shallowEqualScalar : _ref$arePropsEqual;
  var _ref$managerName = _ref.managerName;
  var managerName = _ref$managerName === undefined ? "dragDropManager" : _ref$managerName;
  var DragDropContainer = (function (Component) {
    function DragDropContainer(props, context) {
      _classCallCheck(this, DragDropContainer);

      _get(Object.getPrototypeOf(DragDropContainer.prototype), "constructor", this).call(this, props);
      this.handleChange = this.handleChange.bind(this);

      this.manager = context[managerName];
      invariant(this.manager, "Could not read manager from context.");

      this.handlerIds = {};
      this.handlers = {};

      this.connector = this.createConnector();
      this.attachHandlers(this.getNextHandlers(props));
      this.state = this.getCurrentState();
    }

    _inherits(DragDropContainer, Component);

    _prototypeProperties(DragDropContainer, null, {
      shouldComponentUpdate: {
        value: function shouldComponentUpdate(nextProps, nextState) {
          return !arePropsEqual(nextProps, this.props) || !shallowEqual(nextState, this.state);
        },
        writable: true,
        configurable: true
      },
      componentWillMount: {
        value: function componentWillMount() {
          var monitor = this.manager.getMonitor();
          monitor.addChangeListener(this.handleChange);
        },
        writable: true,
        configurable: true
      },
      componentWillReceiveProps: {
        value: function componentWillReceiveProps(nextProps) {
          if (arePropsEqual(nextProps, this.props)) {
            return;
          }

          var monitor = this.manager.getMonitor();
          monitor.removeChangeListener(this.handleChange);
          this.receiveHandlers(this.getNextHandlers(nextProps));
          monitor.addChangeListener(this.handleChange);

          this.handleChange();
        },
        writable: true,
        configurable: true
      },
      componentWillUnmount: {
        value: function componentWillUnmount() {
          var monitor = this.manager.getMonitor();
          monitor.removeChangeListener(this.handleChange);

          this.detachHandlers();
          this.connector = null;
        },
        writable: true,
        configurable: true
      },
      handleChange: {
        value: function handleChange() {
          var nextState = this.getCurrentState();
          if (!shallowEqual(nextState, this.state)) {
            this.setState(nextState);
          }
        },
        writable: true,
        configurable: true
      },
      getNextHandlers: {
        value: function getNextHandlers(props) {
          var register = {
            dragSource: function dragSource(type, spec) {
              return new ComponentDragSource(type, spec, props);
            },
            dropTarget: function dropTarget(type, spec) {
              return new ComponentDropTarget(type, spec, props);
            }
          };

          var handlers = configure(register, props);
          if (handlers instanceof ComponentDragSource || handlers instanceof ComponentDropTarget) {
            handlers = _defineProperty({}, DEFAULT_KEY, handlers);
          }

          return handlers;
        },
        writable: true,
        configurable: true
      },
      attachHandlers: {
        value: function attachHandlers(handlers) {
          var _this = this;
          this.handlers = assign({}, this.handlers);
          this.handlerIds = assign({}, this.handlerIds);

          Object.keys(handlers).forEach(function (key) {
            _this.attachHandler(key, handlers[key]);
          });
        },
        writable: true,
        configurable: true
      },
      detachHandlers: {
        value: function detachHandlers() {
          var _this = this;
          this.handlers = assign({}, this.handlers);
          this.handlerIds = assign({}, this.handlerIds);

          Object.keys(this.handlerIds).forEach(function (key) {
            _this.detachHandler(key);
          });
        },
        writable: true,
        configurable: true
      },
      receiveHandlers: {
        value: function receiveHandlers(nextHandlers) {
          var _this = this;
          this.handlers = assign({}, this.handlers);
          this.handlerIds = assign({}, this.handlerIds);

          var keys = Object.keys(this.handlers);
          var nextKeys = Object.keys(nextHandlers);

          invariant(keys.every(function (k) {
            return nextKeys.indexOf(k) > -1;
          }) && nextKeys.every(function (k) {
            return keys.indexOf(k) > -1;
          }) && keys.length === nextKeys.length, "Expected handlers to have stable keys at runtime.");

          keys.forEach(function (key) {
            _this.receiveHandler(key, nextHandlers[key]);
          });
        },
        writable: true,
        configurable: true
      },
      attachHandler: {
        value: function attachHandler(key, handler) {
          var registry = this.manager.getRegistry();

          if (handler instanceof ComponentDragSource) {
            this.handlerIds[key] = registry.addSource(handler.type, handler);
          } else if (handler instanceof ComponentDropTarget) {
            this.handlerIds[key] = registry.addTarget(handler.type, handler);
          } else {
            invariant(false, "Handle is neither a source nor a target.");
          }

          this.handlers[key] = handler;
        },
        writable: true,
        configurable: true
      },
      detachHandler: {
        value: function detachHandler(key) {
          var registry = this.manager.getRegistry();
          var handlerId = this.handlerIds[key];

          if (registry.isSourceId(handlerId)) {
            registry.removeSource(handlerId);
          } else if (registry.isTargetId(handlerId)) {
            registry.removeTarget(handlerId);
          } else {
            invariant(false, "Handle is neither a source nor a target.");
          }

          delete this.handlerIds[key];
          delete this.handlers[key];
        },
        writable: true,
        configurable: true
      },
      receiveHandler: {
        value: function receiveHandler(key, nextHandler) {
          var handler = this.handlers[key];
          if (handler.receive(nextHandler)) {
            return;
          }

          this.detachHandler(key);
          this.attachHandler(key, nextHandler);
        },
        writable: true,
        configurable: true
      },
      getCurrentState: {
        value: function getCurrentState() {
          var monitor = this.manager.getMonitor();

          var handlerIds = this.handlerIds;
          if (typeof handlerIds[DEFAULT_KEY] !== "undefined") {
            handlerIds = handlerIds[DEFAULT_KEY];
          }

          return inject(this.connector, monitor, handlerIds);
        },
        writable: true,
        configurable: true
      },
      createConnector: {
        value: function createConnector() {
          var backend = this.manager.getBackend();
          var connector = backend.getConnector();
          var wrappedConnector = {};

          Object.keys(connector).forEach(function (key) {
            wrappedConnector[key] = memoize(function (handlerId) {
              return function (componentOrNode) {
                return connector[key].call(connector, handlerId, findDOMNode(componentOrNode));
              };
            });
          });

          return wrappedConnector;
        },
        writable: true,
        configurable: true
      },
      render: {
        value: function render() {
          return React.createElement(InnerComponent, _extends({}, this.props, this.state));
        },
        writable: true,
        configurable: true
      }
    });

    return DragDropContainer;
  })(Component);

  DragDropContainer.contextTypes = _defineProperty({}, managerName, PropTypes.object.isRequired);

  return DragDropContainer;
}