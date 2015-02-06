'use strict';

var Backends = require('../backends'),
    createDragDropMixin = require('../utils/createDragDropMixin');

module.exports = createDragDropMixin(Backends.HTML5);
