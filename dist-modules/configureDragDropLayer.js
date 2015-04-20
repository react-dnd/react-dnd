'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: key == null || typeof Symbol == 'undefined' || key.constructor !== Symbol, configurable: true, writable: true }); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;
exports['default'] = configureDragDropLayer;

var _React$Component$PropTypes = require('react');

var _React$Component$PropTypes2 = _interopRequireWildcard(_React$Component$PropTypes);

var _shallowEqual = require('./utils/shallowEqual');

var _shallowEqual2 = _interopRequireWildcard(_shallowEqual);

var _shallowEqualScalar = require('./utils/shallowEqualScalar');

var _shallowEqualScalar2 = _interopRequireWildcard(_shallowEqualScalar);

var _invariant = require('invariant');

var _invariant2 = _interopRequireWildcard(_invariant);

function configureDragDropLayer(collect) {
  var _ref = arguments[1] === undefined ? {} : arguments[1];

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

        this.manager = context[managerKey];
        _invariant2['default'](this.manager, 'Could not read manager from context.');

        this.state = this.getCurrentState();
      }

      _inherits(DragDropHandler, _Component);

      DragDropHandler.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
        return !arePropsEqual(nextProps, this.props) || !_shallowEqual2['default'](nextState, this.state);
      };

      DragDropHandler.prototype.componentDidMount = function componentDidMount() {
        var monitor = this.manager.getMonitor();
        this.disposable = monitor.subscribeToOffsetChange(this.handleChange);
      };

      DragDropHandler.prototype.componentWillUnmount = function componentWillUnmount() {
        this.disposable.dispose();
      };

      DragDropHandler.prototype.handleChange = function handleChange() {
        var nextState = this.getCurrentState();
        if (!_shallowEqual2['default'](nextState, this.state)) {
          this.setState(nextState);
        }
      };

      DragDropHandler.prototype.getCurrentState = function getCurrentState() {
        var monitor = this.manager.getMonitor();
        return collect(monitor);
      };

      DragDropHandler.prototype.render = function render() {
        return _React$Component$PropTypes2['default'].createElement(DecoratedComponent, _extends({}, this.props, this.state));
      };

      _createClass(DragDropHandler, null, [{
        key: 'contextTypes',
        value: _defineProperty({}, managerKey, _React$Component$PropTypes.PropTypes.object.isRequired),
        enumerable: true
      }]);

      return DragDropHandler;
    })(_React$Component$PropTypes.Component);
  };
}

module.exports = exports['default'];