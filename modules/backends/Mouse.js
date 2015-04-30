'use strict';

var DragDropActionCreators = require('../actions/DragDropActionCreators'),
    DragOperationStore = require('../stores/DragOperationStore'),
    find = require('lodash/collection/find'),
    filter = require('lodash/collection/filter'),
    includes = require('lodash/collection/includes'),
    getElementRect = require('../utils/getElementRect');

var _currentComponent;
var _dropTargets = [];
var _currentDropTarget;

function removeUnmountedDropTargets() {
  _dropTargets = filter(_dropTargets, (target) => {
    return target.isMounted();
  });
}
function getDragItemTypes() {
  return [DragOperationStore.getDraggedItemType()];
}

function findDropTarget(coordinates) {
  return find(_dropTargets, (target) => {
    if (!target.isMounted()) {
      return false;
    }

    var rect = getElementRect(target.getDOMNode());

    if (!rect) {
      return false;
    }

    return coordinates.x >= rect.left && coordinates.x <= rect.left + rect.width && coordinates.y >= rect.top && coordinates.y <= rect.top + rect.height;
  });
}

function handleTopMouseMove(e) {
  var coordinates = getClientOffset(e);
  DragDropActionCreators.drag(coordinates);

  var activeTarget = findDropTarget(coordinates);

  if (!_currentDropTarget && !activeTarget) {
    return;
  }

  var dragItemTypes = getDragItemTypes();
  if (activeTarget === _currentDropTarget) {
    _currentDropTarget.handleDragOver(dragItemTypes, e)
    return;
  }

  if (_currentDropTarget) {
    _currentDropTarget.handleDragLeave(dragItemTypes, e);
  }

  if (activeTarget) {
    activeTarget.handleDragEnter(dragItemTypes, e);
  }

  _currentDropTarget = activeTarget;
}

function handleTopMouseUp(e) {
  if (_currentDropTarget) {
    _currentDropTarget.handleDrop(getDragItemTypes(), e);
  }

  var type = DragOperationStore.getDraggedItemType();
  _currentComponent.handleDragEnd(type, null);
}

function getClientOffset(e) {
  return {
    x: e.clientX,
    y: e.clientY
  };
}

var Mouse = {
  setup() {
  },

  teardown() {
  },

  beginDrag(component, e, containerNode, dragPreview, dragAnchors, dragStartOffset, effectsAllowed) {
    e.preventDefault();
    e.stopPropagation();

    _currentComponent = component;
    removeUnmountedDropTargets();

    window.addEventListener('mousemove', handleTopMouseMove);
    window.addEventListener('mouseup', handleTopMouseUp);
  },

  endDrag() {
    _currentComponent = null;
    _currentDropTarget = null;
    window.removeEventListener('mousemove', handleTopMouseMove);
    window.removeEventListener('mouseup', handleTopMouseUp);
  },

  dragOver(e, dropEffect) {
  },

  getDragSourceProps(component, type) {
    return {
      onMouseDown: component.handleDragStart.bind(component, type)
    };
  },

  getDropTargetProps(component, types) {
    if (!includes(_dropTargets, (target) => target._rootNodeID === component._rootNodeID)) {
      _dropTargets.push(component);
    }

    return {};
  },

  getOffsetFromClient(component, e) {
    return getClientOffset(e);
  }
};

module.exports = Mouse;
