'use strict';

var DragDropActionCreators = require('../actions/DragDropActionCreators'),
    DragOperationStore = require('../stores/DragOperationStore'),
    DragDropContext = require('../utils/DragDropContext'),
    EnterLeaveMonitor = require('./EnterLeaveMonitor'),
    DropEffects = require('../constants/DropEffects'),
    DefaultDragSource = require('./DefaultDragSource'),
    DefaultDropTarget = require('./DefaultDropTarget'),
    LegacyDefaultDropTarget = require('./LegacyDefaultDropTarget'),
    isFileDragDropEvent = require('./isFileDragDropEvent'),
    isUrlDragDropEvent = require('../utils/isUrlDragDropEvent'),
    invariant = require('react/lib/invariant'),
    warning = require('react/lib/warning'),
    assign = require('react/lib/Object.assign'),
    defaults = require('lodash/object/defaults'),
    isArray = require('lodash/lang/isArray'),
    isObject = require('lodash/lang/isObject'),
    noop = require('lodash/utility/noop');

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

function callDragDropLifecycle(func, component, ...rest) {
  if (component.constructor._legacyConfigureDragDrop) {
    return func.apply(component, rest);
  }

  return func.call(null, component, ...rest);
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
    getInitialState() {
      var state = {
        ownDraggedItemType: null,
        currentDropEffect: null
      };

      return assign(state, this.getStateForDragDropMixin());
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
      return callDragDropLifecycle(canDrop, this, draggedItem) ? draggedItemType : null;
    },

    isAnyDropTargetActive(types) {
      return types.indexOf(this.getActiveDropTargetType()) > -1;
    },

    getStateForDragDropMixin() {
      return {
        draggedItem: DragOperationStore.getDraggedItem(),
        draggedItemType: DragOperationStore.getDraggedItemType()
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

      if (this.configureDragDrop) {
        warning(
          this.constructor._legacyConfigureDragDrop,
          '%s declares configureDragDrop as an instance method, which is deprecated and will be removed in next version. ' +
          'Move configureDragDrop to statics and change all methods inside it to accept component as first parameter instead of using "this".',
          this.constructor.displayName
        );

        this.constructor._legacyConfigureDragDrop = true;
        this.configureDragDrop(this.registerDragDropItemTypeHandlers);
      } else if (this.constructor.configureDragDrop) {
        this.constructor.configureDragDrop(this.registerDragDropItemTypeHandlers, DragDropContext);
      } else {
        invariant(
          this.constructor.configureDragDrop,
          '%s must implement static configureDragDrop(register, context) to use DragDropMixin',
          this.constructor.displayName
        );
      }
    },

    componentDidMount() {
      useBackend(this);
      DragOperationStore.addChangeListener(this.handleStoreChangeInDragDropMixin);
    },

    componentWillUnmount() {
      unuseBackend(this);
      DragOperationStore.removeChangeListener(this.handleStoreChangeInDragDropMixin);
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

        this._dragSources[type] = defaults(dragSource, DefaultDragSource);
      }

      if (dropTarget) {
        invariant(
          !this._dropTargets[type],
          'Drop target for %s specified twice. See configureDragDrop in %s',
          type,
          this.constructor.displayName
        );

        this._dropTargets[type] = defaults(
          dropTarget,
          this.constructor._legacyConfigureDragDrop ? LegacyDefaultDropTarget : DefaultDropTarget
        );
      }
    },

    handleStoreChangeInDragDropMixin() {
      if (this.isMounted()) {
        this.setState(this.getStateForDragDropMixin());
      }
    },

    dragSourceFor(type) {
      checkValidType(this, type);
      checkDragSourceDefined(this, type);

      return backend.getDragSourceProps(this, type);
    },

    handleDragStart(type, e) {
      var { canDrag, beginDrag } = this._dragSources[type];

      if (!callDragDropLifecycle(canDrag, this, e)) {
        e.preventDefault();
        return;
      }

      var { item, dragPreview, dragAnchors, effectsAllowed } = callDragDropLifecycle(beginDrag, this, e),
          containerNode = this.getDOMNode(),
          containerRect = containerNode.getBoundingClientRect(),
          offsetFromClient = backend.getOffsetFromClient(this, e),
          offsetFromContainer;

      offsetFromContainer = {
        x: offsetFromClient.x - containerRect.left,
        y: offsetFromClient.y - containerRect.top
      };

      if (!effectsAllowed) {
        // Move is a sensible default drag effect.
        // Browser shows a drag preview anyway so we usually don't want "+" icon.
        effectsAllowed = [DropEffects.MOVE];
      }

      invariant(isArray(effectsAllowed) && effectsAllowed.length > 0, 'Expected effectsAllowed to be non-empty array');
      invariant(isObject(item), 'Expected return value of beginDrag to contain "item" object');

      backend.beginDrag(this, e, containerNode, dragPreview, dragAnchors, offsetFromContainer, effectsAllowed);
      DragDropActionCreators.startDragging(type, item, effectsAllowed, offsetFromClient, offsetFromContainer);

      // Delay setting own state by a tick so `getDragState(type).isDragging`
      // doesn't return `true` yet. Otherwise browser will capture dragged state
      // as the element screenshot.

      setTimeout(() => {
        if (this.isMounted() && DragOperationStore.getDraggedItem() === item) {
          this.setState({
            ownDraggedItemType: type
          });
        }
      });
    },

    handleDragEnd(type, e) {
      backend.endDrag(this);

      var { endDrag } = this._dragSources[type],
          effect = DragOperationStore.getDropEffect();

      DragDropActionCreators.endDragging();

      // Note: this method may be invoked even *after* component was unmounted
      // This happens if source node was removed from DOM while dragging.

      if (this.isMounted()) {
        this.setState({
          ownDraggedItemType: null
        });
      }

      callDragDropLifecycle(endDrag, this, effect, e);
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

      // IE requires this to trigger dragOver events
      e.preventDefault();

      var { enter, getDropEffect } = this._dropTargets[this.state.draggedItemType],
          effectsAllowed = DragOperationStore.getEffectsAllowed();

      if (isFileDragDropEvent(e) || isUrlDragDropEvent(e)) {
        // Use Copy drop effect for dragging files or urls.
        // Because browser gives no drag preview, "+" icon is useful.
        effectsAllowed = [DropEffects.COPY];
      }

      var dropEffect = callDragDropLifecycle(getDropEffect, this, effectsAllowed);
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

      callDragDropLifecycle(enter, this, this.state.draggedItem, e);
    },

    handleDragOver(types, e) {
      if (!this.isAnyDropTargetActive(types)) {
        return;
      }

      e.preventDefault();

      var { over, getDropEffect } = this._dropTargets[this.state.draggedItemType];
      callDragDropLifecycle(over, this, this.state.draggedItem, e);

      // Don't use `none` because this will prevent browser from firing `dragend`
      backend.dragOver(this, e, this.state.currentDropEffect || 'move');
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
      callDragDropLifecycle(leave, this, this.state.draggedItem, e);
    },

    handleDrop(types, e) {
      if (!this.isAnyDropTargetActive(types)) {
        return;
      }

      e.preventDefault();

      var item = this.state.draggedItem,
          { acceptDrop } = this._dropTargets[this.state.draggedItemType],
          { currentDropEffect } = this.state,
          isHandled = !!DragOperationStore.getDropEffect();

      if (isFileDragDropEvent(e)) {
        // We don't know file list until the `drop` event,
        // so we couldn't put `item` into the store.
        item = {
            files: Array.prototype.slice.call(e.dataTransfer.files)
        };
      } else if(isUrlDragDropEvent(e)) {
        var urls= e.dataTransfer.getData('text/uri-list').split("\n")
        item = {
            urls: urls
        };
      }

      this._monitor.reset();

      if (!isHandled) {
        DragDropActionCreators.recordDrop(currentDropEffect);
      }

      this.setState({
        currentDropEffect: null
      });

      callDragDropLifecycle(acceptDrop, this, item, e, isHandled, DragOperationStore.getDropEffect());
    }
  };
}

module.exports = createDragDropMixin;
