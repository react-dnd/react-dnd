"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

module.exports = configureDragDropContext;
var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var PropTypes = _react.PropTypes;
var DragDropManager = require("dnd-core").DragDropManager;
function configureDragDropContext(InnerComponent, _ref) {
  var backend = _ref.backend;
  var _ref$managerName = _ref.managerName;
  var managerName = _ref$managerName === undefined ? "dragDropManager" : _ref$managerName;
  var manager = new DragDropManager(backend);

  var DragDropContext = (function (Component) {
    function DragDropContext() {
      _classCallCheck(this, DragDropContext);

      if (Component != null) {
        Component.apply(this, arguments);
      }
    }

    _inherits(DragDropContext, Component);

    _prototypeProperties(DragDropContext, null, {
      getChildContext: {
        value: function getChildContext() {
          return _defineProperty({}, managerName, manager);
        },
        writable: true,
        configurable: true
      },
      render: {
        value: function render() {
          return React.createElement(InnerComponent, this.props);
        },
        writable: true,
        configurable: true
      }
    });

    return DragDropContext;
  })(Component);

  DragDropContext.childContextTypes = _defineProperty({}, managerName, PropTypes.object.isRequired);

  return DragDropContext;
}