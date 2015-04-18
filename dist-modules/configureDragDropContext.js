'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;
exports['default'] = configureDragDropContext;

var _React$Component$PropTypes = require('react');

var _React$Component$PropTypes2 = _interopRequireWildcard(_React$Component$PropTypes);

var _DragDropManager = require('dnd-core');

function configureDragDropContext(backendFactories) {
  var childContextTypes = {};
  var childContext = {};

  if (typeof backendFactories === 'function') {
    backendFactories = {
      dragDropManager: backendFactories
    };
  }

  Object.keys(backendFactories).forEach(function (key) {
    childContextTypes[key] = _React$Component$PropTypes.PropTypes.object.isRequired;
    childContext[key] = new _DragDropManager.DragDropManager(backendFactories[key]);
  });

  return function (DecoratedComponent) {
    return (function (_Component) {
      function DragDropContext() {
        _classCallCheck(this, DragDropContext);

        if (_Component != null) {
          _Component.apply(this, arguments);
        }
      }

      _inherits(DragDropContext, _Component);

      DragDropContext.prototype.getChildContext = function getChildContext() {
        return childContext;
      };

      DragDropContext.prototype.render = function render() {
        return _React$Component$PropTypes2['default'].createElement(DecoratedComponent, this.props);
      };

      _createClass(DragDropContext, null, [{
        key: 'childContextTypes',
        enumerable: true,
        value: childContextTypes
      }]);

      return DragDropContext;
    })(_React$Component$PropTypes.Component);
  };
}

module.exports = exports['default'];