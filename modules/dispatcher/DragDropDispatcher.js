'use strict';

var Dispatcher = require('flux').Dispatcher,
    assign = require('react/lib/Object.assign');

var DragDropDispatcher = assign(new Dispatcher(), {
  handleAction(action) {
    this.dispatch({
      action: action
    });
  }
});

module.exports = DragDropDispatcher;