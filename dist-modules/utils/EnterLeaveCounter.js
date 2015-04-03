"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var union = _interopRequire(require("lodash/array/union"));

var without = _interopRequire(require("lodash/array/without"));

var EnterLeaveCounter = (function () {
  function EnterLeaveCounter() {
    _classCallCheck(this, EnterLeaveCounter);

    this.entered = [];
  }

  _prototypeProperties(EnterLeaveCounter, null, {
    enter: {
      value: function enter(enteringNode) {
        this.entered = union(this.entered.filter(function (node) {
          return document.body.contains(node) && (!node.contains || node.contains(enteringNode));
        }), [enteringNode]);

        return this.entered.length === 1;
      },
      writable: true,
      configurable: true
    },
    leave: {
      value: function leave(leavingNode) {
        this.entered = without(this.entered.filter(function (node) {
          return document.body.contains(node);
        }), leavingNode);

        return this.entered.length === 0;
      },
      writable: true,
      configurable: true
    },
    reset: {
      value: function reset() {
        this.entered = [];
      },
      writable: true,
      configurable: true
    }
  });

  return EnterLeaveCounter;
})();

module.exports = EnterLeaveCounter;