'use strict';

var union = require('lodash-node/modern/arrays/union'),
    without = require('lodash-node/modern/arrays/without');


  function EnterLeaveMonitor() {
    this.$EnterLeaveMonitor_entered = [];
  }

  EnterLeaveMonitor.prototype.enter=function(enteringNode) {
    this.$EnterLeaveMonitor_entered = union(
      this.$EnterLeaveMonitor_entered.filter(function(node) 
        {return document.body.contains(node) &&
        (!node.contains || node.contains(enteringNode));}
      ),
      [enteringNode]
    );

    return this.$EnterLeaveMonitor_entered.length === 1;
  };

  EnterLeaveMonitor.prototype.leave=function(leavingNode) {
    this.$EnterLeaveMonitor_entered = without(
      this.$EnterLeaveMonitor_entered.filter(function(node) 
        {return document.body.contains(node);}
      ),
      leavingNode
    );

    return this.$EnterLeaveMonitor_entered.length === 0;
  };

  EnterLeaveMonitor.prototype.reset=function() {
    this.$EnterLeaveMonitor_entered = [];
  };


module.exports = EnterLeaveMonitor;