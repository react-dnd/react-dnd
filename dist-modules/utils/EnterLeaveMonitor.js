"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var union = require("lodash/array/union"),
    without = require("lodash/array/without");

var EnterLeaveMonitor = (function () {
  function EnterLeaveMonitor() {
    _classCallCheck(this, EnterLeaveMonitor);

    this._entered = [];
  }

  _prototypeProperties(EnterLeaveMonitor, null, {
    enter: {
      value: function enter(enteringNode) {
        this._entered = union(this._entered.filter(function (node) {
          return document.body.contains(node) && (!node.contains || node.contains(enteringNode));
        }), [enteringNode]);

        return this._entered.length === 1;
      },
      writable: true,
      configurable: true
    },
    leave: {
      value: function leave(leavingNode) {
        this._entered = without(this._entered.filter(function (node) {
          return document.body.contains(node);
        }), leavingNode);

        return this._entered.length === 0;
      },
      writable: true,
      configurable: true
    },
    reset: {
      value: function reset() {
        this._entered = [];
      },
      writable: true,
      configurable: true
    }
  });

  return EnterLeaveMonitor;
})();

module.exports = EnterLeaveMonitor;