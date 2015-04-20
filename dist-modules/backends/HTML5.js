'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

exports.__esModule = true;
exports['default'] = createHTML5Backend;

var _DragSource3 = require('dnd-core');

var _EnterLeaveCounter = require('../utils/EnterLeaveCounter');

var _EnterLeaveCounter2 = _interopRequireWildcard(_EnterLeaveCounter);

var _isFirefox = require('../utils/BrowserDetector');

var _isUrlDataTransfer$isFileDataTransfer = require('../utils/DataTransfer');

var _getElementClientOffset$getEventClientOffset$getDragPreviewOffset = require('../utils/OffsetHelpers');

var _shallowEqual = require('../utils/shallowEqual');

var _shallowEqual2 = _interopRequireWildcard(_shallowEqual);

var _defaults = require('lodash/object/defaults');

var _defaults2 = _interopRequireWildcard(_defaults);

var _invariant = require('invariant');

var _invariant2 = _interopRequireWildcard(_invariant);

var FileDragSource = (function (_DragSource) {
  function FileDragSource() {
    _classCallCheck(this, FileDragSource);

    _DragSource.call(this);
    this.item = Object.defineProperties({}, {
      files: {
        get: function () {
          console.warn('Browser doesn\'t allow reading file information until the files are dropped.');
          return null;
        },
        configurable: true,
        enumerable: true
      }
    });
  }

  _inherits(FileDragSource, _DragSource);

  FileDragSource.prototype.mutateItemByReadingDataTransfer = function mutateItemByReadingDataTransfer(dataTransfer) {
    delete this.item.files;
    this.item.files = Array.prototype.slice.call(dataTransfer.files);
  };

  FileDragSource.prototype.beginDrag = function beginDrag() {
    return this.item;
  };

  return FileDragSource;
})(_DragSource3.DragSource);

var UrlDragSource = (function (_DragSource2) {
  function UrlDragSource() {
    _classCallCheck(this, UrlDragSource);

    _DragSource2.call(this);
    this.item = Object.defineProperties({}, {
      urls: {
        get: function () {
          console.warn('Browser doesn\'t allow reading URL information until the link is dropped.');
          return null;
        },
        configurable: true,
        enumerable: true
      }
    });
  }

  _inherits(UrlDragSource, _DragSource2);

  UrlDragSource.prototype.mutateItemByReadingDataTransfer = function mutateItemByReadingDataTransfer(dataTransfer) {
    delete this.item.urls;
    this.item.urls = (dataTransfer.getData('Url') || dataTransfer.getData('text/uri-list') || '').split('\n');
  };

  UrlDragSource.prototype.beginDrag = function beginDrag() {
    return this.item;
  };

  return UrlDragSource;
})(_DragSource3.DragSource);

var NativeTypes = {
  FILE: '__NATIVE_FILE__',
  URL: '__NATIVE_URL__'
};

exports.NativeTypes = NativeTypes;

var HTML5Backend = (function () {
  function HTML5Backend(manager) {
    _classCallCheck(this, HTML5Backend);

    this.actions = manager.getActions();
    this.monitor = manager.getMonitor();
    this.registry = manager.getRegistry();

    this.sourcePreviewNodes = {};
    this.sourcePreviewNodeOptions = {};
    this.sourceNodes = {};
    this.sourceNodeOptions = {};
    this.enterLeaveCounter = new _EnterLeaveCounter2['default']();

    this.getSourceClientOffset = this.getSourceClientOffset.bind(this);
    this.handleTopDragStart = this.handleTopDragStart.bind(this);
    this.handleTopDragStartCapture = this.handleTopDragStartCapture.bind(this);
    this.handleTopDragEndCapture = this.handleTopDragEndCapture.bind(this);
    this.handleTopDragEnter = this.handleTopDragEnter.bind(this);
    this.handleTopDragEnterCapture = this.handleTopDragEnterCapture.bind(this);
    this.handleTopDragLeaveCapture = this.handleTopDragLeaveCapture.bind(this);
    this.handleTopDragOver = this.handleTopDragOver.bind(this);
    this.handleTopDragOverCapture = this.handleTopDragOverCapture.bind(this);
    this.handleTopDrop = this.handleTopDrop.bind(this);
    this.handleTopDropCapture = this.handleTopDropCapture.bind(this);
    this.endDragIfSourceWasRemovedFromDOM = this.endDragIfSourceWasRemovedFromDOM.bind(this);
  }

  HTML5Backend.prototype.setup = function setup() {
    _invariant2['default'](!this.constructor.isSetUp, 'Cannot have two HTML5 backends at the same time.');
    this.constructor.isSetUp = true;

    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('dragstart', this.handleTopDragStart);
    window.addEventListener('dragstart', this.handleTopDragStartCapture, true);
    window.addEventListener('dragend', this.handleTopDragEndCapture, true);
    window.addEventListener('dragenter', this.handleTopDragEnter);
    window.addEventListener('dragenter', this.handleTopDragEnterCapture, true);
    window.addEventListener('dragleave', this.handleTopDragLeaveCapture, true);
    window.addEventListener('dragover', this.handleTopDragOver);
    window.addEventListener('dragover', this.handleTopDragOverCapture, true);
    window.addEventListener('drop', this.handleTopDrop);
    window.addEventListener('drop', this.handleTopDropCapture, true);
  };

  HTML5Backend.prototype.teardown = function teardown() {
    this.constructor.isSetUp = false;

    if (typeof window === 'undefined') {
      return;
    }

    window.removeEventListener('dragstart', this.handleTopDragStart);
    window.removeEventListener('dragstart', this.handleTopDragStartCapture, true);
    window.removeEventListener('dragend', this.handleTopDragEndCapture, true);
    window.removeEventListener('dragenter', this.handleTopDragEnter);
    window.removeEventListener('dragenter', this.handleTopDragEnterCapture, true);
    window.removeEventListener('dragleave', this.handleTopDragLeaveCapture, true);
    window.removeEventListener('dragover', this.handleTopDragOver);
    window.removeEventListener('dragover', this.handleTopDragOverCapture, true);
    window.removeEventListener('drop', this.handleTopDrop);
    window.removeEventListener('drop', this.handleTopDropCapture, true);

    this.clearCurrentDragSourceNode();
  };

  HTML5Backend.prototype.connectDragSource = function connectDragSource(sourceId) {
    var _this = this;

    return {
      connect: function connect(node, options) {
        return _this.connectSourceNode(sourceId, node, options);
      },
      connectPreview: function connectPreview(node, options) {
        return _this.connectSourcePreviewNode(sourceId, node, options);
      }
    };
  };

  HTML5Backend.prototype.connectDropTarget = function connectDropTarget(targetId) {
    var _this2 = this;

    return {
      connect: function connect(node) {
        return _this2.connectTargetNode(targetId, node);
      }
    };
  };

  HTML5Backend.prototype.connectSourcePreviewNode = function connectSourcePreviewNode(sourceId, node, options) {
    var _this3 = this;

    this.sourcePreviewNodeOptions[sourceId] = options;
    this.sourcePreviewNodes[sourceId] = node;

    return function () {
      delete _this3.sourcePreviewNodes[sourceId];
      delete _this3.sourcePreviewNodeOptions[sourceId];
    };
  };

  HTML5Backend.prototype.connectSourceNode = function connectSourceNode(sourceId, node, options) {
    var _this4 = this;

    this.sourceNodes[sourceId] = node;
    this.sourceNodeOptions[sourceId] = options;

    var handleDragStart = function handleDragStart(e) {
      return _this4.handleDragStart(e, sourceId);
    };

    node.setAttribute('draggable', true);
    node.addEventListener('dragstart', handleDragStart);

    return function () {
      delete _this4.sourceNodes[sourceId];
      delete _this4.sourceNodeOptions[sourceId];

      node.removeEventListener('dragstart', handleDragStart);
      node.setAttribute('draggable', false);
    };
  };

  HTML5Backend.prototype.connectTargetNode = function connectTargetNode(targetId, node) {
    var _this5 = this;

    var handleDragEnter = function handleDragEnter(e) {
      return _this5.handleDragEnter(e, targetId);
    };
    var handleDragOver = function handleDragOver(e) {
      return _this5.handleDragOver(e, targetId);
    };
    var handleDrop = function handleDrop(e) {
      return _this5.handleDrop(e, targetId);
    };

    node.addEventListener('dragenter', handleDragEnter);
    node.addEventListener('dragover', handleDragOver);
    node.addEventListener('drop', handleDrop);

    return function () {
      node.removeEventListener('dragenter', handleDragEnter);
      node.removeEventListener('dragover', handleDragOver);
      node.removeEventListener('drop', handleDrop);
    };
  };

  HTML5Backend.prototype.getSpecifiedDropEffect = function getSpecifiedDropEffect() {
    var sourceId = this.monitor.getSourceId();
    var sourceNodeOptions = this.sourceNodeOptions[sourceId];

    return _defaults2['default'](sourceNodeOptions || {}, {
      dropEffect: 'move'
    }).dropEffect;
  };

  HTML5Backend.prototype.getSpecifiedAnchorPoint = function getSpecifiedAnchorPoint() {
    var sourceId = this.monitor.getSourceId();
    var sourcePreviewNodeOptions = this.sourcePreviewNodeOptions[sourceId];

    return _defaults2['default'](sourcePreviewNodeOptions || {}, {
      anchorX: 0.5,
      anchorY: 0.5
    });
  };

  HTML5Backend.prototype.getSourceClientOffset = function getSourceClientOffset(sourceId) {
    return _getElementClientOffset$getEventClientOffset$getDragPreviewOffset.getElementClientOffset(this.sourceNodes[sourceId]);
  };

  HTML5Backend.prototype.isDraggingNativeItem = function isDraggingNativeItem() {
    switch (this.monitor.getItemType()) {
      case NativeTypes.FILE:
      case NativeTypes.URL:
        return true;
      default:
        return false;
    }
  };

  HTML5Backend.prototype.beginDragNativeUrl = function beginDragNativeUrl() {
    this.clearCurrentDragSourceNode();

    this.currentNativeSource = new UrlDragSource();
    this.currentNativeHandle = this.registry.addSource(NativeTypes.URL, this.currentNativeSource);
    this.actions.beginDrag([this.currentNativeHandle]);
  };

  HTML5Backend.prototype.beginDragNativeFile = function beginDragNativeFile() {
    this.clearCurrentDragSourceNode();

    this.currentNativeSource = new FileDragSource();
    this.currentNativeHandle = this.registry.addSource(NativeTypes.FILE, this.currentNativeSource);
    this.actions.beginDrag([this.currentNativeHandle]);
  };

  HTML5Backend.prototype.endDragNativeItem = function endDragNativeItem() {
    this.actions.endDrag();
    this.registry.removeSource(this.currentNativeHandle);
    this.currentNativeHandle = null;
    this.currentNativeSource = null;
  };

  HTML5Backend.prototype.endDragIfSourceWasRemovedFromDOM = function endDragIfSourceWasRemovedFromDOM() {
    var node = this.currentDragSourceNode;
    if (document.body.contains(node)) {
      return;
    }

    this.actions.endDrag();
    this.clearCurrentDragSourceNode();
  };

  HTML5Backend.prototype.setCurrentDragSourceNode = function setCurrentDragSourceNode(node) {
    this.clearCurrentDragSourceNode();
    this.currentDragSourceNode = node;
    this.currentDragSourceNodeOffset = _getElementClientOffset$getEventClientOffset$getDragPreviewOffset.getElementClientOffset(node);
    this.currentDragSourceNodeOffsetChanged = false;

    // Receiving a mouse event in the middle of a dragging operation
    // means it has ended and the drag source node disappeared from DOM,
    // so the browser didn't dispatch the dragend event.
    window.addEventListener('mousemove', this.endDragIfSourceWasRemovedFromDOM, true);
  };

  HTML5Backend.prototype.clearCurrentDragSourceNode = function clearCurrentDragSourceNode() {
    if (this.currentDragSourceNode) {
      this.currentDragSourceNode = null;
      this.currentDragSourceNodeOffset = null;
      this.currentDragSourceNodeOffsetChanged = false;
      window.removeEventListener('mousemove', this.endDragIfSourceWasRemovedFromDOM, true);
      return true;
    } else {
      return false;
    }
  };

  HTML5Backend.prototype.checkIfCurrentDragSourceRectChanged = function checkIfCurrentDragSourceRectChanged() {
    var node = this.currentDragSourceNode;
    if (!node) {
      return false;
    }

    if (this.currentDragSourceNodeOffsetChanged) {
      return true;
    }

    this.currentDragSourceNodeOffsetChanged = !_shallowEqual2['default'](_getElementClientOffset$getEventClientOffset$getDragPreviewOffset.getElementClientOffset(node), this.currentDragSourceNodeOffset);

    return this.currentDragSourceNodeOffsetChanged;
  };

  HTML5Backend.prototype.handleTopDragStartCapture = function handleTopDragStartCapture() {
    this.clearCurrentDragSourceNode();
    this.dragStartSourceIds = [];
  };

  HTML5Backend.prototype.handleDragStart = function handleDragStart(e, sourceId) {
    this.dragStartSourceIds.unshift(sourceId);
  };

  HTML5Backend.prototype.handleTopDragStart = function handleTopDragStart(e) {
    var _this6 = this;

    var dragStartSourceIds = this.dragStartSourceIds;

    this.dragStartSourceIds = null;

    var clientOffset = _getElementClientOffset$getEventClientOffset$getDragPreviewOffset.getEventClientOffset(e);

    // Keep drag source unpublished.
    // We will publish it in the next tick so browser
    // has time to screenshot current state and doesn't
    // cancel drag if the source DOM node is removed.
    this.actions.beginDrag(dragStartSourceIds, {
      publishSource: false,
      getSourceClientOffset: this.getSourceClientOffset,
      clientOffset: clientOffset
    });

    var dataTransfer = e.dataTransfer;

    if (this.monitor.isDragging()) {
      // Use custom drag image if user specifies it.
      // If child drag source refuses drag but parent agrees,
      // use parent's node as drag image. Neither works in IE though.
      var sourceId = this.monitor.getSourceId();
      var sourceNode = this.sourceNodes[sourceId];
      var dragPreview = this.sourcePreviewNodes[sourceId] || sourceNode;
      var anchorPoint = this.getSpecifiedAnchorPoint();
      var dragPreviewOffset = _getElementClientOffset$getEventClientOffset$getDragPreviewOffset.getDragPreviewOffset(sourceNode, dragPreview, clientOffset, anchorPoint);
      dataTransfer.setDragImage(dragPreview, dragPreviewOffset.x, dragPreviewOffset.y);

      try {
        // Firefox won't drag without setting data
        dataTransfer.setData('application/json', {});
      } catch (err) {}

      // Store drag source node so we can check whether
      // it is removed from DOM and trigger endDrag manually.
      this.setCurrentDragSourceNode(e.target);

      setTimeout(function () {
        // By now, the browser has taken drag screenshot
        // and we can safely let the drag source know it's active.
        _this6.actions.publishDragSource();
      });
    } else if (_isUrlDataTransfer$isFileDataTransfer.isUrlDataTransfer(dataTransfer)) {
      // URL dragged from inside the document
      this.beginDragNativeUrl();
    } else {
      // If by this time no drag source reacted, tell browser not to drag.
      e.preventDefault();
    }
  };

  HTML5Backend.prototype.handleTopDragEndCapture = function handleTopDragEndCapture() {
    if (this.clearCurrentDragSourceNode()) {
      // Firefox can dispatch this event in an infinite loop
      // if dragend handler does something like showing an alert.
      // Only proceed if we have not handled it already.
      this.actions.endDrag();
    }
  };

  HTML5Backend.prototype.handleTopDragEnterCapture = function handleTopDragEnterCapture(e) {
    this.dragEnterTargetIds = [];

    var isFirstEnter = this.enterLeaveCounter.enter(e.target);
    if (!isFirstEnter || this.monitor.isDragging()) {
      return;
    }

    var dataTransfer = e.dataTransfer;

    if (_isUrlDataTransfer$isFileDataTransfer.isFileDataTransfer(dataTransfer)) {
      // File dragged from outside the document
      this.beginDragNativeFile();
    } else if (_isUrlDataTransfer$isFileDataTransfer.isUrlDataTransfer(dataTransfer)) {
      // URL dragged from outside the document
      this.beginDragNativeUrl();
    }
  };

  HTML5Backend.prototype.handleDragEnter = function handleDragEnter(e, targetId) {
    this.dragEnterTargetIds.unshift(targetId);
  };

  HTML5Backend.prototype.handleTopDragEnter = function handleTopDragEnter(e) {
    var _this7 = this;

    var dragEnterTargetIds = this.dragEnterTargetIds;

    this.dragEnterTargetIds = [];

    if (!_isFirefox.isFirefox()) {
      // Don't emit hover in `dragenter` on Firefox due to an edge case.
      // If the target changes position as the result of `dragenter`, Firefox
      // will still happily dispatch `dragover` despite target being no longer
      // there. The easy solution is to only fire `hover` in `dragover` on FF.
      this.actions.hover(dragEnterTargetIds, {
        clientOffset: _getElementClientOffset$getEventClientOffset$getDragPreviewOffset.getEventClientOffset(e)
      });
    }

    var canDrop = dragEnterTargetIds.some(function (targetId) {
      return _this7.monitor.canDropOnTarget(targetId);
    });

    if (canDrop) {
      // IE requires this to fire dragover events
      e.preventDefault();
      e.dataTransfer.dropEffect = this.getSpecifiedDropEffect();
    }
  };

  HTML5Backend.prototype.handleTopDragOverCapture = function handleTopDragOverCapture() {
    this.dragOverTargetIds = [];
  };

  HTML5Backend.prototype.handleDragOver = function handleDragOver(e, targetId) {
    this.dragOverTargetIds.unshift(targetId);
  };

  HTML5Backend.prototype.handleTopDragOver = function handleTopDragOver(e) {
    var _this8 = this;

    var dragOverTargetIds = this.dragOverTargetIds;

    this.dragOverTargetIds = [];
    this.actions.hover(dragOverTargetIds, {
      clientOffset: _getElementClientOffset$getEventClientOffset$getDragPreviewOffset.getEventClientOffset(e)
    });

    var canDrop = dragOverTargetIds.some(function (targetId) {
      return _this8.monitor.canDropOnTarget(targetId);
    });

    if (canDrop) {
      // Show user-specified drop effect.
      e.preventDefault();
      e.dataTransfer.dropEffect = this.getSpecifiedDropEffect();
    } else if (this.isDraggingNativeItem()) {
      // Don't show a nice cursor but still prevent default
      // "drop and blow away the whole document" action.
      e.preventDefault();
      e.dataTransfer.dropEffect = 'none';
    } else if (this.checkIfCurrentDragSourceRectChanged()) {
      // Prevent animating to incorrect position.
      // Drop effect must be other than 'none' to prevent animation.
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    }
  };

  HTML5Backend.prototype.handleTopDragLeaveCapture = function handleTopDragLeaveCapture(e) {
    if (this.isDraggingNativeItem()) {
      e.preventDefault();
    }

    var isLastLeave = this.enterLeaveCounter.leave(e.target);
    if (!isLastLeave || !this.isDraggingNativeItem()) {
      return;
    }

    this.endDragNativeItem();
  };

  HTML5Backend.prototype.handleTopDropCapture = function handleTopDropCapture(e) {
    this.dropTargetIds = [];

    if (this.isDraggingNativeItem()) {
      e.preventDefault();
      this.currentNativeSource.mutateItemByReadingDataTransfer(e.dataTransfer);
    }

    this.enterLeaveCounter.reset();
  };

  HTML5Backend.prototype.handleDrop = function handleDrop(e, targetId) {
    this.dropTargetIds.unshift(targetId);
  };

  HTML5Backend.prototype.handleTopDrop = function handleTopDrop(e) {
    var dropTargetIds = this.dropTargetIds;

    this.dropTargetIds = [];

    this.actions.hover(dropTargetIds, {
      clientOffset: _getElementClientOffset$getEventClientOffset$getDragPreviewOffset.getEventClientOffset(e)
    });
    this.actions.drop();

    if (this.isDraggingNativeItem()) {
      this.endDragNativeItem();
    } else {
      this.endDragIfSourceWasRemovedFromDOM();
    }
  };

  return HTML5Backend;
})();

function createHTML5Backend(manager) {
  return new HTML5Backend(manager);
}

// IE doesn't support MIME types in setData