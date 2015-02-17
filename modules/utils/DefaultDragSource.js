'use strict';

var invariant = require('react/lib/invariant'),
    noop = require('lodash/utility/noop');

var DefaultDragSource = {
  canDrag() {
    return true;
  },

  beginDrag() {
    invariant(false, 'Drag source must contain a method called beginDrag. See https://github.com/gaearon/react-dnd#drag-source-api');
  },

  endDrag: noop
};

module.exports = DefaultDragSource;