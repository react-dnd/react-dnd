'use strict';

var DragDropActionCreators = require('../actions/DragDropActionCreators'),
    DragDropStore = require('../stores/DragDropStore'),
    EnterLeaveMonitor = require('./EnterLeaveMonitor'),
    DropEffects = require('../constants/DropEffects'),
    DefaultDragSource = require('./DefaultDragSource'),
    DefaultDropTarget = require('./DefaultDropTarget'),
    isFileDragDropEvent = require('./isFileDragDropEvent'),
    getDragStartOffset = require('./getDragStartOffset'),
    bindAll = require('./bindAll'),
    invariant = require('react/lib/invariant'),
    assign = require('react/lib/Object.assign'),
    defaults = require('lodash-node/modern/objects/defaults'),
    union = require('lodash-node/modern/arrays/union'),
    without = require('lodash-node/modern/arrays/without'),
    isArray = require('lodash-node/modern/objects/isArray'),
    isObject = require('lodash-node/modern/objects/isObject'),
    noop = require('lodash-node/modern/utilities/noop');

function checkValidType(component, type) {
  invariant(
    type && typeof type === 'string',
    'Expected item type to be a non-empty string. See %s',
    component.constructor.displayName
  );
}

function checkDragSourceDefined(component, type) {
  var displayName = component.constructor.displayName;

  invariant(
    component._dragSources[type],
    'There is no drag source for "%s" registered in %s. ' +
    'Have you forgotten to register it? ' +
    'See configureDragDrop in %s',
    type,
    displayName,
    displayName
  );
}

function checkDropTargetDefined(component, type) {
  var displayName = component.constructor.displayName;

  invariant(
    component._dropTargets[type],
    'There is no drop target for "%s" registered in %s. ' +
    'Have you forgotten to register it? ' +
    'See configureDragDrop in %s',
    type,
    displayName,
    displayName
  );
}

function createDragDropMixin(backend) {
  var refs = 0;

  function useBackend() {
    if (refs === 0) {
      backend.setup();
    }
    refs++;
  }

  function unuseBackend() {
    refs--;
    if (refs === 0) {
      backend.teardown();
    }
  }

  /**
   * Use this mixin to define drag sources and drop targets.
   */
  return {
    getInitialState() {
      var state = {
        ownDraggedItemType: null,
        currentDropEffect: null
      };

      return assign(state, this.getStateFromDragDropStore());
    },

    getActiveDropTargetType() {
      var { draggedItemType, draggedItem, ownDraggedItemType } = this.state,
          dropTarget = this._dropTargets[draggedItemType];

      if (!dropTarget) {
        return null;
      }

      if (draggedItemType === ownDraggedItemType) {
        return null;
      }

      var { canDrop } = dropTarget;
      return canDrop(draggedItem) ? draggedItemType : null;
    },

    isAnyDropTargetActive(types) {
      return types.indexOf(this.getActiveDropTargetType()) > -1;
    },

    getStateFromDragDropStore() {
      return {
        draggedItem: DragDropStore.getDraggedItem(),
        draggedItemType: DragDropStore.getDraggedItemType()
      };
    },

    getDragState(type) {
      checkValidType(this, type);
      checkDragSourceDefined(this, type);

      return {
        isDragging: this.state.ownDraggedItemType === type
      };
    },

    getDropState(type) {
      checkValidType(this, type);
      checkDropTargetDefined(this, type);

      var isDragging = this.getActiveDropTargetType() === type,
          isHovering = !!this.state.currentDropEffect;

      return {
        isDragging: isDragging,
        isHovering: isDragging && isHovering
      };
    },

    componentWillMount() {
      this._monitor = new EnterLeaveMonitor();
      this._dragSources = {};
      this._dropTargets = {};

      invariant(this.configureDragDrop, 'Implement configureDragDrop(registerType) to use DragDropMixin');
      this.configureDragDrop(this.registerDragDropItemTypeHandlers);
    },

    componentDidMount() {
      useBackend();
      DragDropStore.addChangeListener(this.handleDragDropStoreChange);
    },

    componentWillUnmount() {
      unuseBackend();
      DragDropStore.removeChangeListener(this.handleDragDropStoreChange);
    },

    registerDragDropItemTypeHandlers(type, handlers) {
      checkValidType(this, type);

      var { dragSource, dropTarget } = handlers;

      if (dragSource) {
        invariant(
          !this._dragSources[type],
          'Drag source for %s specified twice. See configureDragDrop in %s',
          type,
          this.constructor.displayName
        );

        this._dragSources[type] = defaults(bindAll(dragSource, this), DefaultDragSource);
      }

      if (dropTarget) {
        invariant(
          !this._dropTargets[type],
          'Drop target for %s specified twice. See configureDragDrop in %s',
          type,
          this.constructor.displayName
        );

        this._dropTargets[type] = defaults(bindAll(dropTarget, this), DefaultDropTarget);
      }
    },

    handleDragDropStoreChange() {
      if (this.isMounted()) {
        this.setState(this.getStateFromDragDropStore());
      }
    },

    dragSourceFor(type) {
      checkValidType(this, type);
      checkDragSourceDefined(this, type);

      return backend.getDragSourceProps(this, type);
    },

    handleDragStart(type, e) {
      var { canDrag, beginDrag } = this._dragSources[type];

      if (!canDrag(e)) {
        e.preventDefault();
        return;
      }

      var dragOptions = beginDrag(e),
          containerNode = this.getDOMNode(),
          dragOffset = { x: e.clientX, y: e.clientY },
          dragStartOffset = getDragStartOffset(containerNode, e.nativeEvent),
          { item, dragPreview, dragAnchors, effectsAllowed } = dragOptions;

      if (!effectsAllowed) {
        // Move is a sensible default drag effect.
        // Browser shows a drag preview anyway so we usually don't want "+" icon.
        effectsAllowed = [DropEffects.MOVE];
      }

      invariant(isArray(effectsAllowed) && effectsAllowed.length > 0, 'Expected effectsAllowed to be non-empty array');
      invariant(isObject(item), 'Expected return value of beginDrag to contain "item" object');

      backend.beginDrag(this, e, containerNode, dragPreview, dragAnchors, dragStartOffset, effectsAllowed);
      DragDropActionCreators.startDragging(type, item, effectsAllowed, dragOffset, dragStartOffset);

      // Delay setting own state by a tick so `getDragState(type).isDragging`
      // doesn't return `true` yet. Otherwise browser will capture dragged state
      // as the element screenshot.

      setTimeout(() => {
        if (this.isMounted() && DragDropStore.getDraggedItem() === item) {
          this.setState({
            ownDraggedItemType: type
          });
        }
      });
    },

    handleDragEnd(type, e) {
      backend.endDrag();

      var { endDrag } = this._dragSources[type],
          effect = DragDropStore.getDropEffect();

      DragDropActionCreators.endDragging();

      if (!this.isMounted()) {

        // Note: this method may be invoked even *after* component was unmounted
        // This happens if source node was removed from DOM while dragging.

        return;
      }

      this.setState({
        ownDraggedItemType: null
      });

      endDrag(effect, e);
    },

    dropTargetFor(...types) {
      types.forEach(type => {
        checkValidType(this, type);
        checkDropTargetDefined(this, type);
      });

      return backend.getDropTargetProps(this, types);
    },

    handleDragEnter(types, e) {
      if (!this.isAnyDropTargetActive(types)) {
        return;
      }

      if (!this._monitor.enter(e.target)) {
        return;
      }

      var { enter, getDropEffect } = this._dropTargets[this.state.draggedItemType],
          effectsAllowed = DragDropStore.getEffectsAllowed();

      if (isFileDragDropEvent(e)) {
        // Use Copy drop effect for dragging files.
        // Because browser gives no drag preview, "+" icon is useful.
        effectsAllowed = [DropEffects.COPY];
      }

      var dropEffect = getDropEffect(effectsAllowed);
      if (dropEffect) {
        invariant(
          effectsAllowed.indexOf(dropEffect) > -1,
          'Effect %s supplied by drop target is not one of the effects allowed by drag source: %s',
          dropEffect,
          effectsAllowed.join(', ')
        );
      }

      this.setState({
        currentDropEffect: dropEffect
      });

      enter(this.state.draggedItem, e);
    },

    handleDragOver(types, e) {
      if (!this.isAnyDropTargetActive(types)) {
        return;
      }

      e.preventDefault();

      var { over, getDropEffect } = this._dropTargets[this.state.draggedItemType];
      over(this.state.draggedItem, e);

      // Don't use `none` because this will prevent browser from firing `dragend`
      backend.dragOver(e, this.state.currentDropEffect || 'move');
    },

    handleDragLeave(types, e) {
      if (!this.isAnyDropTargetActive(types)) {
        return;
      }

      if (!this._monitor.leave(e.target)) {
        return;
      }

      this.setState({
        currentDropEffect: null
      });

      var { leave } = this._dropTargets[this.state.draggedItemType];
      leave(this.state.draggedItem, e);
    },

    handleDrop(types, e) {
      if (!this.isAnyDropTargetActive(types)) {
        return;
      }

      e.preventDefault();

      var item = this.state.draggedItem,
          { acceptDrop } = this._dropTargets[this.state.draggedItemType],
          { currentDropEffect } = this.state,
          isHandled = !!DragDropStore.getDropEffect();

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

      acceptDrop(item, e, isHandled, DragDropStore.getDropEffect());
    }
  };
}

module.exports = createDragDropMixin;
