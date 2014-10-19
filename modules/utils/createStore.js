'use strict';

var EventEmitter = require('events').EventEmitter,
    merge = require('react/lib/merge'),
    shallowEqual = require('react/lib/shallowEqual'),
    bindAll = require('./bindAll'),
    CHANGE_EVENT = 'change';

function createStore(spec) {
  var store = merge(EventEmitter.prototype, merge(spec, {
    emitChange() {
      this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    }
  }));

  store.setMaxListeners(0);
  bindAll(store);

  return store;
}

module.exports = createStore;