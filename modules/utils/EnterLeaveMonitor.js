'use strict';

var union = require('lodash-node/modern/arrays/union'),
    without = require('lodash-node/modern/arrays/without');

class EnterLeaveMonitor {
  constructor() {
    this._entered = [];
  }

  enter(enteringNode) {
    this._entered = union(
      this._entered.filter(node =>
        document.body.contains(node) &&
        (!node.contains || node.contains(enteringNode))
      ),
      [enteringNode]
    );

    return this._entered.length === 1;
  }

  leave(leavingNode) {
    this._entered = without(
      this._entered.filter(node =>
        document.body.contains(node)
      ),
      leavingNode
    );

    return this._entered.length === 0;
  }

  reset() {
    this._entered = [];
  }
}

module.exports = EnterLeaveMonitor;