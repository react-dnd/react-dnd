'use strict';

var Dispatcher = require('flux').Dispatcher,
    copyProperties = require('react/lib/copyProperties');

var DragDropDispatcher = copyProperties(new Dispatcher(), {
  handleAction(action) {
    this.dispatch({
      action: action
    });
  }
});

module.exports = DragDropDispatcher;