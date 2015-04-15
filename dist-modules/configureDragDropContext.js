'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: key == null || typeof Symbol == 'undefined' || key.constructor !== Symbol, configurable: true, writable: true }); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;
exports['default'] = configureDragDropContext;

var _React$Component$PropTypes = require('react');

var _React$Component$PropTypes2 = _interopRequireWildcard(_React$Component$PropTypes);

var _DragDropManager = require('dnd-core');

function configureDragDropContext(InnerComponent, _ref2) {
  var backend = _ref2.backend;
  var _ref2$managerName = _ref2.managerName;
  var managerName = _ref2$managerName === undefined ? 'dragDropManager' : _ref2$managerName;

  var manager = new _DragDropManager.DragDropManager(backend);

  var DragDropContext = (function (_Component) {
    function DragDropContext() {
      _classCallCheck(this, DragDropContext);

      if (_Component != null) {
        _Component.apply(this, arguments);
      }
    }

    _inherits(DragDropContext, _Component);

    DragDropContext.prototype.getChildContext = function getChildContext() {
      return _defineProperty({}, managerName, manager);
    };

    DragDropContext.prototype.render = function render() {
      return _React$Component$PropTypes2['default'].createElement(InnerComponent, this.props);
    };

    return DragDropContext;
  })(_React$Component$PropTypes.Component);

  DragDropContext.childContextTypes = _defineProperty({}, managerName, _React$Component$PropTypes.PropTypes.object.isRequired);

  return DragDropContext;
}

module.exports = exports['default'];