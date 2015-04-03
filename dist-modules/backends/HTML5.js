"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var DragSource = require("dnd-core").DragSource;
var NativeTypes = _interopRequire(require("../NativeTypes"));

var EnterLeaveCounter = _interopRequire(require("../utils/EnterLeaveCounter"));

var invariant = _interopRequire(require("react/lib/invariant"));

var warning = _interopRequire(require("react/lib/warning"));

function isUrlDataTransfer(dataTransfer) {
  var types = Array.prototype.slice.call(dataTransfer.types);
  return types.indexOf("Url") > -1 || types.indexOf("text/uri-list") > -1;
}

function isFileDataTransfer(dataTransfer) {
  var types = Array.prototype.slice.call(dataTransfer.types);
  return types.indexOf("Files") > -1;
}

var FileDragSource = (function (DragSource) {
  function FileDragSource() {
    _classCallCheck(this, FileDragSource);

    this.item = Object.defineProperties({}, {
      files: {
        get: function () {
          warning(false, "Browser doesn't allow reading file information until the files are dropped.");
          return null;
        },
        enumerable: true,
        configurable: true
      }
    });
  }

  _inherits(FileDragSource, DragSource);

  _prototypeProperties(FileDragSource, null, {
    mutateItemByReadingDataTransfer: {
      value: function mutateItemByReadingDataTransfer(dataTransfer) {
        delete this.item.files;
        this.item.files = Array.prototype.slice.call(dataTransfer.files);
      },
      writable: true,
      configurable: true
    },
    beginDrag: {
      value: function beginDrag() {
        return this.item;
      },
      writable: true,
      configurable: true
    }
  });

  return FileDragSource;
})(DragSource);

var UrlDragSource = (function (DragSource) {
  function UrlDragSource() {
    _classCallCheck(this, UrlDragSource);

    this.item = Object.defineProperties({}, {
      urls: {
        get: function () {
          warning(false, "Browser doesn't allow reading URL information until the link is dropped.");
          return null;
        },
        enumerable: true,
        configurable: true
      }
    });
  }

  _inherits(UrlDragSource, DragSource);

  _prototypeProperties(UrlDragSource, null, {
    mutateItemByReadingDataTransfer: {
      value: function mutateItemByReadingDataTransfer(dataTransfer) {
        delete this.item.urls;
        this.item.urls = (dataTransfer.getData("Url") || dataTransfer.getData("text/uri-list") || "").split("\n");
      },
      writable: true,
      configurable: true
    },
    beginDrag: {
      value: function beginDrag() {
        return this.item;
      },
      writable: true,
      configurable: true
    }
  });

  return UrlDragSource;
})(DragSource);

var HTML5Backend = (function () {
  function HTML5Backend(actions, monitor, registry) {
    _classCallCheck(this, HTML5Backend);

    this.actions = actions;
    this.monitor = monitor;
    this.registry = registry;

    this.nodeHandlers = {};
    this.enterLeaveCounter = new EnterLeaveCounter();

    this.handleTopDragStart = this.handleTopDragStart.bind(this);
    this.handleTopDragStartCapture = this.handleTopDragStartCapture.bind(this);
    this.handleTopDragEnd = this.handleTopDragEnd.bind(this);
    this.handleTopDragEndCapture = this.handleTopDragEndCapture.bind(this);
    this.handleTopDragEnter = this.handleTopDragEnter.bind(this);
    this.handleTopDragEnterCapture = this.handleTopDragEnterCapture.bind(this);
    this.handleTopDragLeave = this.handleTopDragLeave.bind(this);
    this.handleTopDragLeaveCapture = this.handleTopDragLeaveCapture.bind(this);
    this.handleTopDragOver = this.handleTopDragOver.bind(this);
    this.handleTopDragOverCapture = this.handleTopDragOverCapture.bind(this);
    this.handleTopDrop = this.handleTopDrop.bind(this);
    this.handleTopDropCapture = this.handleTopDropCapture.bind(this);
    this.endDragIfSourceWasRemovedFromDOM = this.endDragIfSourceWasRemovedFromDOM.bind(this);
    this.setSourceNode = this.setSourceNode.bind(this);
    this.setTargetNode = this.setTargetNode.bind(this);
  }

  _prototypeProperties(HTML5Backend, null, {
    setup: {
      value: function setup() {
        invariant(!this.constructor.isSetUp, "Cannot have two HTML5 backends at the same time.");
        this.constructor.isSetUp = true;

        if (typeof window === "undefined") {
          return;
        }

        window.addEventListener("dragstart", this.handleTopDragStart);
        window.addEventListener("dragstart", this.handleTopDragStartCapture, true);
        window.addEventListener("dragend", this.handleTopDragEnd);
        window.addEventListener("dragend", this.handleTopDragEndCapture, true);
        window.addEventListener("dragenter", this.handleTopDragEnter);
        window.addEventListener("dragenter", this.handleTopDragEnterCapture, true);
        window.addEventListener("dragleave", this.handleTopDragLeave);
        window.addEventListener("dragleave", this.handleTopDragLeaveCapture, true);
        window.addEventListener("dragover", this.handleTopDragOver);
        window.addEventListener("dragover", this.handleTopDragOverCapture, true);
        window.addEventListener("drop", this.handleTopDrop);
        window.addEventListener("drop", this.handleTopDropCapture, true);
      },
      writable: true,
      configurable: true
    },
    teardown: {
      value: function teardown() {
        this.constructor.isSetUp = false;

        if (typeof window === "undefined") {
          return;
        }

        window.removeEventListener("dragstart", this.handleTopDragStart);
        window.removeEventListener("dragstart", this.handleTopDragStartCapture, true);
        window.removeEventListener("dragend", this.handleTopDragEnd);
        window.removeEventListener("dragend", this.handleTopDragEndCapture, true);
        window.removeEventListener("dragenter", this.handleTopDragEnter);
        window.removeEventListener("dragenter", this.handleTopDragEnterCapture, true);
        window.removeEventListener("dragleave", this.handleTopDragLeave);
        window.removeEventListener("dragleave", this.handleTopDragLeaveCapture, true);
        window.removeEventListener("dragover", this.handleTopDragOver);
        window.removeEventListener("dragover", this.handleTopDragOverCapture, true);
        window.removeEventListener("drop", this.handleTopDrop);
        window.removeEventListener("drop", this.handleTopDropCapture, true);

        this.clearCurrentDragSourceNode();
      },
      writable: true,
      configurable: true
    },
    getDragImageOffset: {
      value: function getDragImageOffset() {
        // TODO: not implemented
        // A good test case is canDrag(): false on child.
        // With parent as preview, we need to manually calculate the offset.
        return [0, 0];
      },
      writable: true,
      configurable: true
    },
    isDraggingNativeItem: {
      value: function isDraggingNativeItem() {
        switch (this.monitor.getItemType()) {
          case NativeTypes.FILE:
          case NativeTypes.URL:
            return true;
          default:
            return false;
        }
      },
      writable: true,
      configurable: true
    },
    beginDragNativeUrl: {
      value: function beginDragNativeUrl() {
        this.clearCurrentDragSourceNode();

        this.currentNativeSource = new UrlDragSource();
        this.currentNativeHandle = this.registry.addSource(NativeTypes.URL, this.currentNativeSource);
        this.actions.beginDrag(this.currentNativeHandle);
      },
      writable: true,
      configurable: true
    },
    beginDragNativeFile: {
      value: function beginDragNativeFile() {
        this.clearCurrentDragSourceNode();

        this.currentNativeSource = new FileDragSource();
        this.currentNativeHandle = this.registry.addSource(NativeTypes.FILE, this.currentNativeSource);
        this.actions.beginDrag(this.currentNativeHandle);
      },
      writable: true,
      configurable: true
    },
    endDragNativeItem: {
      value: function endDragNativeItem() {
        this.actions.endDrag();
        this.registry.removeSource(this.currentNativeHandle);
        this.currentNativeHandle = null;
        this.currentNativeSource = null;
      },
      writable: true,
      configurable: true
    },
    endDragIfSourceWasRemovedFromDOM: {
      value: function endDragIfSourceWasRemovedFromDOM() {
        var node = this.currentDragSourceNode;
        if (document.body.contains(node)) {
          return;
        }

        this.actions.endDrag();
        this.clearCurrentDragSourceNode();
      },
      writable: true,
      configurable: true
    },
    setCurrentDragSourceNode: {
      value: function setCurrentDragSourceNode(node) {
        this.clearCurrentDragSourceNode();
        this.currentDragSourceNode = node;

        // Receiving a mouse event in the middle of a dragging operation
        // means it has ended and the drag source node disappeared from DOM,
        // so the browser didn't dispatch the dragend event.
        window.addEventListener("mousemove", this.endDragIfSourceWasRemovedFromDOM, true);
      },
      writable: true,
      configurable: true
    },
    clearCurrentDragSourceNode: {
      value: function clearCurrentDragSourceNode() {
        if (this.currentDragSourceNode) {
          this.currentDragSourceNode = null;
          window.removeEventListener("mousemove", this.endDragIfSourceWasRemovedFromDOM, true);
          return true;
        } else {
          return false;
        }
      },
      writable: true,
      configurable: true
    },
    handleTopDragStartCapture: {
      value: function handleTopDragStartCapture() {
        this.clearCurrentDragSourceNode();
        this.dragStartSourceHandles = [];
      },
      writable: true,
      configurable: true
    },
    handleDragStart: {
      value: function handleDragStart(e, sourceId) {
        this.dragStartSourceHandles.push([sourceId, e.currentTarget]);
      },
      writable: true,
      configurable: true
    },
    handleTopDragStart: {
      value: function handleTopDragStart(e) {
        var _this = this;
        var _ref = this;
        var dragStartSourceHandles = _ref.dragStartSourceHandles;
        this.dragStartSourceHandles = null;

        // Try calling beginDrag() on each drag source
        // until one of them agrees to to be dragged.
        var sourceId = null;
        var node = null;
        for (var i = 0; i < dragStartSourceHandles.length; i++) {
          var _ref2 = dragStartSourceHandles[i];
          var _ref22 = _slicedToArray(_ref2, 2);

          sourceId = _ref22[0];
          node = _ref22[1];
          // Pass false to keep drag source unpublished.
          // We will publish it in the next tick so browser
          // has time to screenshot current state and doesn't
          // cancel drag if the source DOM node is removed.
          this.actions.beginDrag(sourceId, false);

          if (this.monitor.isDragging()) {
            break;
          }
        }

        var dataTransfer = e.dataTransfer;
        if (this.monitor.isDragging()) {
          // If child drag source refuses drag but parent agrees,
          // use parent's node as drag image. This won't work in IE.
          var dragOffset = this.getDragImageOffset(node);
          dataTransfer.setDragImage.apply(dataTransfer, [node].concat(_toConsumableArray(dragOffset)));

          try {
            // Firefox won't drag without setting data
            dataTransfer.setData("application/json", {});
          } catch (err) {}

          // Store drag source node so we can check whether
          // it is removed from DOM and trigger endDrag manually.
          this.setCurrentDragSourceNode(e.target);

          setTimeout(function () {
            // By now, the browser has taken drag screenshot
            // and we can safely let the drag source know it's active.
            _this.actions.publishDragSource();
          });
        } else if (isUrlDataTransfer(dataTransfer)) {
          // URL dragged from inside the document
          this.beginDragNativeUrl();
        } else {
          // If by this time no drag source reacted, tell browser not to drag.
          e.preventDefault();
        }
      },
      writable: true,
      configurable: true
    },
    handleTopDragEndCapture: {
      value: function handleTopDragEndCapture() {
        if (this.clearCurrentDragSourceNode()) {
          // Firefox can dispatch this event in an infinite loop
          // if dragend handler does something like showing an alert.
          // Only proceed if we have not handled it already.
          this.actions.endDrag();
        }
      },
      writable: true,
      configurable: true
    },
    handleTopDragEnd: {
      value: function handleTopDragEnd() {},
      writable: true,
      configurable: true
    },
    handleTopDragOverCapture: {
      value: function handleTopDragOverCapture() {
        this.dragOverTargetHandles = [];
      },
      writable: true,
      configurable: true
    },
    handleDragOver: {
      value: function handleDragOver(e, targetId) {
        this.dragOverTargetHandles.unshift(targetId);
      },
      writable: true,
      configurable: true
    },
    handleTopDragOver: {
      value: function handleTopDragOver(e) {
        var _this = this;
        var _ref = this;
        var dragOverTargetHandles = _ref.dragOverTargetHandles;
        this.dragOverTargetHandles = [];
        this.actions.hover(dragOverTargetHandles);

        var canDrop = dragOverTargetHandles.some(function (targetId) {
          return _this.monitor.canDrop(targetId);
        });

        if (canDrop) {
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
        } else if (this.isDraggingNativeItem()) {
          // Don't show a nice cursor but still prevent default
          // "drop and blow away the whole document" action.
          e.preventDefault();
          e.dataTransfer.dropEffect = "none";
        }
      },
      writable: true,
      configurable: true
    },
    handleTopDragEnterCapture: {
      value: function handleTopDragEnterCapture(e) {
        this.dragEnterTargetHandles = [];

        var isFirstEnter = this.enterLeaveCounter.enter(e.target);
        if (!isFirstEnter || this.monitor.isDragging()) {
          return;
        }

        var dataTransfer = e.dataTransfer;
        if (isFileDataTransfer(dataTransfer)) {
          // File dragged from outside the document
          this.beginDragNativeFile();
        } else if (isUrlDataTransfer(dataTransfer)) {
          // URL dragged from outside the document
          this.beginDragNativeUrl();
        }
      },
      writable: true,
      configurable: true
    },
    handleDragEnter: {
      value: function handleDragEnter(e, targetId) {
        this.dragEnterTargetHandles.unshift(targetId);
      },
      writable: true,
      configurable: true
    },
    handleTopDragEnter: {
      value: function handleTopDragEnter(e) {
        var _this = this;
        var _ref = this;
        var dragEnterTargetHandles = _ref.dragEnterTargetHandles;
        this.dragEnterTargetHandles = [];
        this.actions.hover(dragEnterTargetHandles);

        var canDrop = dragEnterTargetHandles.some(function (targetId) {
          return _this.monitor.canDrop(targetId);
        });

        if (canDrop) {
          // IE requires this to fire dragover events
          e.preventDefault();
        }
      },
      writable: true,
      configurable: true
    },
    handleTopDragLeaveCapture: {
      value: function handleTopDragLeaveCapture(e) {
        if (this.isDraggingNativeItem()) {
          e.preventDefault();
        }

        var isLastLeave = this.enterLeaveCounter.leave(e.target);
        if (!isLastLeave || !this.isDraggingNativeItem()) {
          return;
        }

        this.endDragNativeItem();
      },
      writable: true,
      configurable: true
    },
    handleTopDragLeave: {
      value: function handleTopDragLeave() {},
      writable: true,
      configurable: true
    },
    handleTopDropCapture: {
      value: function handleTopDropCapture(e) {
        this.dropTargetHandles = [];

        if (this.isDraggingNativeItem()) {
          e.preventDefault();
          this.currentNativeSource.mutateItemByReadingDataTransfer(e.dataTransfer);
        }

        this.enterLeaveCounter.reset();
      },
      writable: true,
      configurable: true
    },
    handleDrop: {
      value: function handleDrop(e, targetId) {
        this.dropTargetHandles.unshift(targetId);
      },
      writable: true,
      configurable: true
    },
    handleTopDrop: {
      value: function handleTopDrop() {
        var _ref = this;
        var dropTargetHandles = _ref.dropTargetHandles;
        this.dropTargetHandles = [];

        this.actions.hover(dropTargetHandles);
        this.actions.drop();

        if (this.isDraggingNativeItem()) {
          this.endDragNativeItem();
        } else {
          this.endDragIfSourceWasRemovedFromDOM();
        }
      },
      writable: true,
      configurable: true
    },
    getConnector: {
      value: function getConnector() {
        return {
          dragSource: this.setSourceNode,
          dragSourcePreview: function () {},
          dropTarget: this.setTargetNode
        };
      },
      writable: true,
      configurable: true
    },
    setSourceNode: {
      value: function setSourceNode(sourceId, node) {
        var _this = this;
        var nodeHandlers = this.nodeHandlers[sourceId];
        if (nodeHandlers && nodeHandlers.node === node) {
          return;
        }

        if (nodeHandlers) {
          nodeHandlers.node.removeEventListener("dragstart", nodeHandlers.dragstart);
          nodeHandlers.node.setAttribute("draggable", false);
        }

        if (node) {
          nodeHandlers = this.nodeHandlers[sourceId] = {
            node: node,
            dragstart: function (e) {
              return _this.handleDragStart(e, sourceId);
            }
          };

          node.setAttribute("draggable", true);
          node.addEventListener("dragstart", nodeHandlers.dragstart);
        } else {
          delete this.nodeHandlers[sourceId];
        }
      },
      writable: true,
      configurable: true
    },
    setTargetNode: {
      value: function setTargetNode(targetId, node) {
        var _this = this;
        var nodeHandlers = this.nodeHandlers[targetId];
        if (nodeHandlers && nodeHandlers.node === node) {
          return;
        }

        if (nodeHandlers) {
          nodeHandlers.node.removeEventListener("dragenter", nodeHandlers.dragenter);
          nodeHandlers.node.removeEventListener("dragover", nodeHandlers.dragover);
          nodeHandlers.node.removeEventListener("drop", nodeHandlers.drop);
        }

        if (node) {
          nodeHandlers = this.nodeHandlers[targetId] = {
            node: node,
            dragenter: function (e) {
              return _this.handleDragEnter(e, targetId);
            },
            dragover: function (e) {
              return _this.handleDragOver(e, targetId);
            },
            drop: function (e) {
              return _this.handleDrop(e, targetId);
            }
          };

          node.addEventListener("dragenter", nodeHandlers.dragenter);
          node.addEventListener("dragover", nodeHandlers.dragover);
          node.addEventListener("drop", nodeHandlers.drop);
        } else {
          delete this.nodeHandlers[targetId];
        }
      },
      writable: true,
      configurable: true
    }
  });

  return HTML5Backend;
})();

module.exports = HTML5Backend;
// IE doesn't support MIME types in setData