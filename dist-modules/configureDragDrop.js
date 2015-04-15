'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: key == null || typeof Symbol == 'undefined' || key.constructor !== Symbol, configurable: true, writable: true }); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;
exports['default'] = configureDragDrop;

var _React$Component$PropTypes$findDOMNode = require('react');

var _React$Component$PropTypes$findDOMNode2 = _interopRequireWildcard(_React$Component$PropTypes$findDOMNode);

var _Disposable$CompositeDisposable$SerialDisposable = require('disposables');

var _ComponentDragSource = require('./ComponentDragSource');

var _ComponentDragSource2 = _interopRequireWildcard(_ComponentDragSource);

var _ComponentDropTarget = require('./ComponentDropTarget');

var _ComponentDropTarget2 = _interopRequireWildcard(_ComponentDropTarget);

var _ComponentHandlerMap = require('./ComponentHandlerMap');

var _ComponentHandlerMap2 = _interopRequireWildcard(_ComponentHandlerMap);

var _shallowEqual = require('./utils/shallowEqual');

var _shallowEqual2 = _interopRequireWildcard(_shallowEqual);

var _shallowEqualScalar = require('./utils/shallowEqualScalar');

var _shallowEqualScalar2 = _interopRequireWildcard(_shallowEqualScalar);

var _assign = require('lodash/object/assign');

var _assign2 = _interopRequireWildcard(_assign);

var _memoize = require('lodash/function/memoize');

var _memoize2 = _interopRequireWildcard(_memoize);

var _invariant = require('invariant');

var _invariant2 = _interopRequireWildcard(_invariant);

var DEFAULT_KEY = '__default__';

function configureDragDrop(InnerComponent, _ref) {
  var configure = _ref.configure;
  var collect = _ref.collect;
  var _ref$arePropsEqual = _ref.arePropsEqual;
  var arePropsEqual = _ref$arePropsEqual === undefined ? _shallowEqualScalar2['default'] : _ref$arePropsEqual;
  var _ref$managerName = _ref.managerName;
  var managerName = _ref$managerName === undefined ? 'dragDropManager' : _ref$managerName;

  var DragDropContainer = (function (_Component) {
    function DragDropContainer(props, context) {
      _classCallCheck(this, DragDropContainer);

      _Component.call(this, props);
      this.handleChange = this.handleChange.bind(this);
      this.getComponentRef = this.getComponentRef.bind(this);
      this.setComponentRef = this.setComponentRef.bind(this);
      this.componentRef = null;

      this.manager = context[managerName];
      _invariant2['default'](this.manager, 'Could not read manager from context.');

      this.componentConnector = this.createComponentConnector();
      this.handlerMap = new _ComponentHandlerMap2['default'](this.manager.getRegistry(), this.manager.getMonitor(), this.getNextHandlers(props), this.handleChange);
      this.state = this.getCurrentState();
    }

    _inherits(DragDropContainer, _Component);

    DragDropContainer.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
      return !arePropsEqual(nextProps, this.props) || !_shallowEqual2['default'](nextState, this.state);
    };

    DragDropContainer.prototype.setComponentRef = function setComponentRef(ref) {
      this.componentRef = ref;
    };

    DragDropContainer.prototype.getComponentRef = function getComponentRef() {
      return this.componentRef;
    };

    DragDropContainer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      if (!arePropsEqual(nextProps, this.props)) {
        var nextHandlers = this.getNextHandlers(nextProps);
        this.handlerMap.receiveHandlers(nextHandlers);
        this.handleChange();
      }
    };

    DragDropContainer.prototype.componentWillUnmount = function componentWillUnmount() {
      var disposable = this.handlerMap.getDisposable();
      disposable.dispose();
    };

    DragDropContainer.prototype.handleChange = function handleChange() {
      var nextState = this.getCurrentState();
      if (!_shallowEqual2['default'](nextState, this.state)) {
        this.setState(nextState);
      }
    };

    DragDropContainer.prototype.getNextHandlers = function getNextHandlers(props) {
      var _this = this;

      props = _assign2['default']({}, props);

      var register = {
        dragSource: function dragSource(type, spec) {
          return new _ComponentDragSource2['default'](type, spec, props, _this.getComponentRef);
        },
        dropTarget: function dropTarget(type, spec) {
          return new _ComponentDropTarget2['default'](type, spec, props, _this.getComponentRef);
        }
      };

      var handlers = configure(register, props);
      if (handlers instanceof _ComponentDragSource2['default'] || handlers instanceof _ComponentDropTarget2['default']) {
        handlers = _defineProperty({}, DEFAULT_KEY, handlers);
      }

      return handlers;
    };

    DragDropContainer.prototype.getCurrentState = function getCurrentState() {
      var monitor = this.manager.getMonitor();
      var handlerIds = this.handlerMap.getHandlerIds();

      if (typeof handlerIds[DEFAULT_KEY] !== 'undefined') {
        handlerIds = handlerIds[DEFAULT_KEY];
      }

      return collect(this.componentConnector, monitor, handlerIds);
    };

    DragDropContainer.prototype.createComponentConnector = function createComponentConnector() {
      var _this2 = this;

      var backend = this.manager.getBackend();
      var backendConnector = backend.connect();
      var componentConnector = {};

      Object.keys(backendConnector).forEach(function (key) {
        var connectBackend = backendConnector[key].bind(backendConnector);
        var connectComponent = _this2.wrapConnectBackend(key, connectBackend);

        componentConnector[key] = _memoize2['default'](connectComponent);
      });

      return componentConnector;
    };

    DragDropContainer.prototype.wrapConnectBackend = function wrapConnectBackend(key, connectBackend) {
      var _this3 = this;

      return function (handlerId) {
        var nodeDisposable = new _Disposable$CompositeDisposable$SerialDisposable.SerialDisposable();
        _this3.handlerMap.addDisposable(handlerId, nodeDisposable);

        var currentNode = null;
        var currentOptions = null;

        return function (nextComponentOrNode, nextOptions) {
          var nextNode = _React$Component$PropTypes$findDOMNode.findDOMNode(nextComponentOrNode);
          if (nextNode === currentNode && _shallowEqualScalar2['default'](currentOptions, nextOptions)) {
            return;
          }

          currentNode = nextNode;
          currentOptions = nextOptions;

          if (nextNode) {
            var nextDispose = connectBackend(handlerId, nextNode, nextOptions);
            nodeDisposable.setDisposable(new _Disposable$CompositeDisposable$SerialDisposable.Disposable(nextDispose));
          } else {
            nodeDisposable.setDisposable(null);
          }
        };
      };
    };

    DragDropContainer.prototype.render = function render() {
      return _React$Component$PropTypes$findDOMNode2['default'].createElement(InnerComponent, _extends({}, this.props, this.state, {
        ref: this.setComponentRef }));
    };

    return DragDropContainer;
  })(_React$Component$PropTypes$findDOMNode.Component);

  DragDropContainer.contextTypes = _defineProperty({}, managerName, _React$Component$PropTypes$findDOMNode.PropTypes.object.isRequired);

  return DragDropContainer;
}

module.exports = exports['default'];