'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: key == null || typeof Symbol == 'undefined' || key.constructor !== Symbol, configurable: true, writable: true }); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;
exports['default'] = configureDragDrop;

var _React$Component$PropTypes = require('react');

var _React$Component$PropTypes2 = _interopRequireWildcard(_React$Component$PropTypes);

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

var _invariant = require('invariant');

var _invariant2 = _interopRequireWildcard(_invariant);

var DEFAULT_KEY = '__default__';

function configureDragDrop(configure, collect) {
  var _ref = arguments[2] === undefined ? {} : arguments[2];

  var _ref$arePropsEqual = _ref.arePropsEqual;
  var arePropsEqual = _ref$arePropsEqual === undefined ? _shallowEqualScalar2['default'] : _ref$arePropsEqual;
  var _ref$managerKey = _ref.managerKey;
  var managerKey = _ref$managerKey === undefined ? 'dragDropManager' : _ref$managerKey;

  return function (DecoratedComponent) {
    return (function (_Component) {
      function DragDropHandler(props, context) {
        _classCallCheck(this, DragDropHandler);

        _Component.call(this, props);
        this.handleChange = this.handleChange.bind(this);
        this.getComponentRef = this.getComponentRef.bind(this);
        this.setComponentRef = this.setComponentRef.bind(this);
        this.componentRef = null;

        this.manager = context[managerKey];
        _invariant2['default'](this.manager, 'Could not read manager from context.');

        var handlers = this.getNextHandlers(props);
        this.handlerMap = new _ComponentHandlerMap2['default'](this.manager, handlers, this.handleChange);
        this.state = this.getCurrentState();
      }

      _inherits(DragDropHandler, _Component);

      DragDropHandler.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
        return !arePropsEqual(nextProps, this.props) || !_shallowEqual2['default'](nextState, this.state);
      };

      DragDropHandler.prototype.setComponentRef = function setComponentRef(ref) {
        this.componentRef = ref;
      };

      DragDropHandler.prototype.getComponentRef = function getComponentRef() {
        return this.componentRef;
      };

      DragDropHandler.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (!arePropsEqual(nextProps, this.props)) {
          var nextHandlers = this.getNextHandlers(nextProps);
          this.handlerMap.receiveHandlers(nextHandlers);
          this.handleChange();
        }
      };

      DragDropHandler.prototype.componentWillUnmount = function componentWillUnmount() {
        var disposable = this.handlerMap.getDisposable();
        disposable.dispose();
      };

      DragDropHandler.prototype.handleChange = function handleChange() {
        var nextState = this.getCurrentState();
        if (!_shallowEqual2['default'](nextState, this.state)) {
          this.setState(nextState);
        }
      };

      DragDropHandler.prototype.getNextHandlers = function getNextHandlers(props) {
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

      DragDropHandler.prototype.getCurrentState = function getCurrentState() {
        var handlerMonitors = this.handlerMap.getHandlerMonitors();

        if (typeof handlerMonitors[DEFAULT_KEY] !== 'undefined') {
          handlerMonitors = handlerMonitors[DEFAULT_KEY];
        }

        var monitor = this.manager.getMonitor();
        return collect(handlerMonitors, monitor);
      };

      DragDropHandler.prototype.render = function render() {
        return _React$Component$PropTypes2['default'].createElement(DecoratedComponent, _extends({}, this.props, this.state, {
          ref: this.setComponentRef }));
      };

      _createClass(DragDropHandler, null, [{
        key: 'contextTypes',
        enumerable: true,
        value: _defineProperty({}, managerKey, _React$Component$PropTypes.PropTypes.object.isRequired)
      }]);

      return DragDropHandler;
    })(_React$Component$PropTypes.Component);
  };
}

module.exports = exports['default'];