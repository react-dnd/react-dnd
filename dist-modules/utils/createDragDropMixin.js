"use strict";

var DragDropActionCreators = require("../actions/DragDropActionCreators"),
    DragOperationStore = require("../stores/DragOperationStore"),
    DragDropContext = require("../utils/DragDropContext"),
    EnterLeaveMonitor = require("./EnterLeaveMonitor"),
    DropEffects = require("../constants/DropEffects"),
    DefaultDragSource = require("./DefaultDragSource"),
    DefaultDropTarget = require("./DefaultDropTarget"),
    isFileDragDropEvent = require("./isFileDragDropEvent"),
    invariant = require("react/lib/invariant"),
    assign = require("react/lib/Object.assign"),
    defaults = require("lodash/object/defaults"),
    isArray = require("lodash/lang/isArray"),
    isObject = require("lodash/lang/isObject"),
    noop = require("lodash/utility/noop");

function checkValidType(component, type) {
  invariant(type && typeof type === "string", "Expected item type to be a non-empty string. See %s", component.constructor.displayName);
}

function checkDragSourceDefined(component, type) {
  var displayName = component.constructor.displayName;

  invariant(component._dragSources[type], "There is no drag source for \"%s\" registered in %s. " + "Have you forgotten to register it? " + "See configureDragDrop in %s", type, displayName, displayName);
}

function checkDropTargetDefined(component, type) {
  var displayName = component.constructor.displayName;

  invariant(component._dropTargets[type], "There is no drop target for \"%s\" registered in %s. " + "Have you forgotten to register it? " + "See configureDragDrop in %s", type, displayName, displayName);
}

function createDragDropMixin(backend) {
  var refs = 0;

  function useBackend(component) {
    if (refs === 0) {
      backend.setup(component);
    }
    refs++;
  }

  function unuseBackend(component) {
    refs--;
    if (refs === 0) {
      backend.teardown(component);
    }
  }

  /**
   * Use this mixin to define drag sources and drop targets.
   */
  return {
    getInitialState: function getInitialState() {
      var state = {
        ownDraggedItemType: null,
        currentDropEffect: null
      };

      return assign(state, this.getStateForDragDropMixin());
    },

    getActiveDropTargetType: function getActiveDropTargetType() {
      var _state = this.state;
      var draggedItemType = _state.draggedItemType;
      var draggedItem = _state.draggedItem;
      var ownDraggedItemType = _state.ownDraggedItemType;
      var dropTarget = this._dropTargets[draggedItemType];

      if (!dropTarget) {
        return null;
      }

      if (draggedItemType === ownDraggedItemType) {
        return null;
      }

      var canDrop = dropTarget.canDrop;
      return canDrop(this, draggedItem) ? draggedItemType : null;
    },

    isAnyDropTargetActive: function isAnyDropTargetActive(types) {
      return types.indexOf(this.getActiveDropTargetType()) > -1;
    },

    getStateForDragDropMixin: function getStateForDragDropMixin() {
      return {
        draggedItem: DragOperationStore.getDraggedItem(),
        draggedItemType: DragOperationStore.getDraggedItemType()
      };
    },

    getDragState: function getDragState(type) {
      checkValidType(this, type);
      checkDragSourceDefined(this, type);

      return {
        isDragging: this.state.ownDraggedItemType === type
      };
    },

    getDropState: function getDropState(type) {
      checkValidType(this, type);
      checkDropTargetDefined(this, type);

      var isDragging = this.getActiveDropTargetType() === type,
          isHovering = !!this.state.currentDropEffect;

      return {
        isDragging: isDragging,
        isHovering: isDragging && isHovering
      };
    },

    componentWillMount: function componentWillMount() {
      this._monitor = new EnterLeaveMonitor();
      this._dragSources = {};
      this._dropTargets = {};

      invariant(this.constructor.configureDragDrop, "%s must implement static configureDragDrop(register, context) to use DragDropMixin", this.constructor.displayName);

      this.constructor.configureDragDrop(this.registerDragDropItemTypeHandlers, DragDropContext);
    },

    componentDidMount: function componentDidMount() {
      useBackend(this);
      DragOperationStore.addChangeListener(this.handleStoreChangeInDragDropMixin);
    },

    componentWillUnmount: function componentWillUnmount() {
      unuseBackend(this);
      DragOperationStore.removeChangeListener(this.handleStoreChangeInDragDropMixin);
    },

    registerDragDropItemTypeHandlers: function registerDragDropItemTypeHandlers(type, handlers) {
      checkValidType(this, type);

      var dragSource = handlers.dragSource;
      var dropTarget = handlers.dropTarget;


      if (dragSource) {
        invariant(!this._dragSources[type], "Drag source for %s specified twice. See configureDragDrop in %s", type, this.constructor.displayName);

        this._dragSources[type] = defaults(dragSource, DefaultDragSource);
      }

      if (dropTarget) {
        invariant(!this._dropTargets[type], "Drop target for %s specified twice. See configureDragDrop in %s", type, this.constructor.displayName);

        this._dropTargets[type] = defaults(dropTarget, DefaultDropTarget);
      }
    },

    handleStoreChangeInDragDropMixin: function handleStoreChangeInDragDropMixin() {
      if (this.isMounted()) {
        this.setState(this.getStateForDragDropMixin());
      }
    },

    dragSourceFor: function dragSourceFor(type) {
      checkValidType(this, type);
      checkDragSourceDefined(this, type);

      return backend.getDragSourceProps(this, type);
    },

    handleDragStart: function handleDragStart(type, e) {
      var _this = this;
      var _dragSources$type = this._dragSources[type];
      var canDrag = _dragSources$type.canDrag;
      var beginDrag = _dragSources$type.beginDrag;


      if (!canDrag(this)) {
        e.preventDefault();
        return;
      }

      var _beginDrag = beginDrag(this);

      var item = _beginDrag.item;
      var dragPreview = _beginDrag.dragPreview;
      var dragAnchors = _beginDrag.dragAnchors;
      var effectsAllowed = _beginDrag.effectsAllowed;
      var containerNode = this.getDOMNode();
      var containerRect = containerNode.getBoundingClientRect();
      var offsetFromClient = backend.getOffsetFromClient(this, e);
      var offsetFromContainer;

      offsetFromContainer = {
        x: offsetFromClient.x - containerRect.left,
        y: offsetFromClient.y - containerRect.top
      };

      if (!effectsAllowed) {
        // Move is a sensible default drag effect.
        // Browser shows a drag preview anyway so we usually don't want "+" icon.
        effectsAllowed = [DropEffects.MOVE];
      }

      invariant(isArray(effectsAllowed) && effectsAllowed.length > 0, "Expected effectsAllowed to be non-empty array");
      invariant(isObject(item), "Expected return value of beginDrag to contain \"item\" object");

      backend.beginDrag(this, e, containerNode, dragPreview, dragAnchors, offsetFromContainer, effectsAllowed);
      DragDropActionCreators.startDragging(type, item, effectsAllowed, offsetFromClient, offsetFromContainer);

      // Delay setting own state by a tick so `getDragState(type).isDragging`
      // doesn't return `true` yet. Otherwise browser will capture dragged state
      // as the element screenshot.

      setTimeout(function () {
        if (_this.isMounted() && DragOperationStore.getDraggedItem() === item) {
          _this.setState({
            ownDraggedItemType: type
          });
        }
      });
    },

    handleDragEnd: function handleDragEnd(type, e) {
      backend.endDrag(this);

      var endDrag = this._dragSources[type].endDrag;
      var effect = DragOperationStore.getDropEffect();

      DragDropActionCreators.endDragging();

      // Note: this method may be invoked even *after* component was unmounted
      // This happens if source node was removed from DOM while dragging.

      if (this.isMounted()) {
        this.setState({
          ownDraggedItemType: null
        });
      }

      endDrag(this, effect);
    },

    dropTargetFor: function dropTargetFor() {
      var _this = this;
      for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
        types[_key] = arguments[_key];
      }

      types.forEach(function (type) {
        checkValidType(_this, type);
        checkDropTargetDefined(_this, type);
      });

      return backend.getDropTargetProps(this, types);
    },

    handleDragEnter: function handleDragEnter(types, e) {
      if (!this.isAnyDropTargetActive(types)) {
        return;
      }

      if (!this._monitor.enter(e.target)) {
        return;
      }

      // IE requires this to trigger dragOver events
      e.preventDefault();

      var _dropTargets$state$draggedItemType = this._dropTargets[this.state.draggedItemType];
      var enter = _dropTargets$state$draggedItemType.enter;
      var getDropEffect = _dropTargets$state$draggedItemType.getDropEffect;
      var effectsAllowed = DragOperationStore.getEffectsAllowed();

      if (isFileDragDropEvent(e)) {
        // Use Copy drop effect for dragging files.
        // Because browser gives no drag preview, "+" icon is useful.
        effectsAllowed = [DropEffects.COPY];
      }

      var dropEffect = getDropEffect(this, effectsAllowed);
      if (dropEffect) {
        invariant(effectsAllowed.indexOf(dropEffect) > -1, "Effect %s supplied by drop target is not one of the effects allowed by drag source: %s", dropEffect, effectsAllowed.join(", "));
      }

      this.setState({
        currentDropEffect: dropEffect
      });

      enter(this, this.state.draggedItem);
    },

    handleDragOver: function handleDragOver(types, e) {
      if (!this.isAnyDropTargetActive(types)) {
        return;
      }

      e.preventDefault();

      var _dropTargets$state$draggedItemType = this._dropTargets[this.state.draggedItemType];
      var over = _dropTargets$state$draggedItemType.over;
      var getDropEffect = _dropTargets$state$draggedItemType.getDropEffect;
      over(this, this.state.draggedItem);

      // Don't use `none` because this will prevent browser from firing `dragend`
      backend.dragOver(this, e, this.state.currentDropEffect || "move");
    },

    handleDragLeave: function handleDragLeave(types, e) {
      if (!this.isAnyDropTargetActive(types)) {
        return;
      }

      if (!this._monitor.leave(e.target)) {
        return;
      }

      this.setState({
        currentDropEffect: null
      });

      var leave = this._dropTargets[this.state.draggedItemType].leave;
      leave(this, this.state.draggedItem);
    },

    handleDrop: function handleDrop(types, e) {
      if (!this.isAnyDropTargetActive(types)) {
        return;
      }

      e.preventDefault();

      var item = this.state.draggedItem;
      var acceptDrop = this._dropTargets[this.state.draggedItemType].acceptDrop;
      var currentDropEffect = this.state.currentDropEffect;
      var isHandled = !!DragOperationStore.getDropEffect();

      if (isFileDragDropEvent(e)) {
        // We don't know file list until the `drop` event,
        // so we couldn't put `item` into the store.
        item = {
          files: Array.prototype.slice.call(e.dataTransfer.files)
        };
      }

      this._monitor.reset();

      if (!isHandled) {
        DragDropActionCreators.recordDrop(currentDropEffect);
      }

      this.setState({
        currentDropEffect: null
      });

      acceptDrop(this, item, isHandled, DragOperationStore.getDropEffect());
    }
  };
}

module.exports = createDragDropMixin;