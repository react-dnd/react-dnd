/* global window, document */
// This is basically https://github.com/gaearon/react-dnd/blob/ba8359ab3d7c76592357e078561d0e9d96afbcb0/src/backends/Touch.js
'use strict';
import { DragSource } from 'dnd-core';
import { getElementClientOffset, getEventClientOffset } from '../utils/OffsetHelpers';
import invariant from 'invariant';

class TouchBackend {
  constructor (manager) {
    this.actions = manager.getActions();
    this.monitor = manager.getMonitor();
    this.registry = manager.getRegistry();

    this.sourceNodes = {};
    this.sourceNodeOptions = {};
    this.sourcePreviewNodes = {};
    this.sourcePreviewNodeOptions = {};
    this.targetNodes = {};
    this.targetNodeOptions = {};
    this._mouseClientOffset = {};

    this.getSourceClientOffset = this.getSourceClientOffset.bind(this);
    this.handleTopTouchStart = this.handleTopTouchStart.bind(this);
    this.handleTopTouchStartCapture = this.handleTopTouchStartCapture.bind(this);
    this.handleTopTouchMoveCapture = this.handleTopTouchMoveCapture.bind(this);
    this.handleTopTouchEndCapture = this.handleTopTouchEndCapture.bind(this);
  }

  setup () {
    if (typeof window === 'undefined') {
        return;
    }

    invariant(!this.constructor.isSetUp, 'Cannot have two Touch backends at the same time.');
    this.constructor.isSetUp = true;

    window.addEventListener('touchstart', this.handleTopTouchStartCapture, true);
    window.addEventListener('touchstart', this.handleTopTouchStart);
    window.addEventListener('touchmove', this.handleTopTouchMoveCapture, true);
    window.addEventListener('touchend', this.handleTopTouchEndCapture, true);
  }

  teardown () {
    if (typeof window === 'undefined') {
        return;
    }

    this.constructor.isSetUp = false;
    this._mouseClientOffset = {};

    window.removeEventListener('touchstart', this.handleTopTouchStartCapture, true);
    window.removeEventListener('touchstart', this.handleTopTouchStart);
    window.removeEventListener('touchmove', this.handleTopTouchMoveCapture, true);
    window.removeEventListener('touchend', this.handleTopTouchEndCapture, true);

    this.uninstallSourceNodeRemovalObserver();
  }

  connectDragSource (sourceId, node, options) {
    const handleTouchStart = this.handleTouchStart.bind(this, sourceId);
    this.sourceNodes[sourceId] = node;

    node.addEventListener('touchstart', handleTouchStart);

    return () => {
      delete this.sourceNodes[sourceId];
      node.removeEventListener('touchstart', handleTouchStart);
    };
  }

  connectDragPreview (sourceId, node, options) {
    this.sourcePreviewNodeOptions[sourceId] = options;
    this.sourcePreviewNodes[sourceId] = node;

    return () => {
      delete this.sourcePreviewNodes[sourceId];
      delete this.sourcePreviewNodeOptions[sourceId];
    };
  }

  connectDropTarget (targetId, node) {
    this.targetNodes[targetId] = node;

    return () => {
      delete this.targetNodes[targetId];
    };
  }

  getSourceClientOffset (sourceId) {
    return getElementClientOffset(this.sourceNodes[sourceId]);
  }

  handleTopTouchStartCapture (e) {
    this.touchStartSourceIds = [];
  }

  handleTouchStart (sourceId) {
    this.touchStartSourceIds.unshift(sourceId);
  }

  handleTopTouchStart (e) {
    if (e.targetTouches.length !== 1) {
        return;
    }

    // Don't prematurely preventDefault() here since it might:
    // 1. Mess up scrolling
    // 2. Mess up long tap (which brings up context menu)
    // 3. If there's an anchor link as a child, tap won't be triggered on link

    this._mouseClientOffset = getEventClientOffset(e.targetTouches[0]);
  }

  handleTopTouchMoveCapture (e) {
    const { touchStartSourceIds } = this;

    if (e.targetTouches.length !== 1) {
        return;
    }

    const clientOffset = getEventClientOffset(e.targetTouches[0]);

    // If we're not dragging and we've moved a little, that counts as a drag start
    if (
      !this.monitor.isDragging() &&
      this._mouseClientOffset.hasOwnProperty('x') &&
      touchStartSourceIds &&
      (
        this._mouseClientOffset.x !== clientOffset.x ||
        this._mouseClientOffset.y !== clientOffset.y
      )
    ) {
      this.touchStartSourceIds = null;

      this.actions.beginDrag(touchStartSourceIds, {
        clientOffset: this._mouseClientOffset,
        getSourceClientOffset: this.getSourceClientOffset,
        publishSource: false
      });
    }

    if (!this.monitor.isDragging()) {
      return;
    }

    const sourceNode = this.sourceNodes[this.monitor.getSourceId()];
    this.installSourceNodeRemovalObserver(sourceNode);
    this.actions.publishDragSource();

    e.preventDefault();

    const matchingTargetIds = Object.keys(this.targetNodes)
      .filter((targetId) => {
        const boundingRect = this.targetNodes[targetId].getBoundingClientRect();
        return clientOffset.x >= boundingRect.left &&
          clientOffset.x <= boundingRect.right &&
          clientOffset.y >= boundingRect.top &&
          clientOffset.y <= boundingRect.bottom;
      });

    this.actions.hover(matchingTargetIds, {
      clientOffset: clientOffset
    });
  }

  handleTopTouchEndCapture (e) {
    if (!this.monitor.isDragging() || this.monitor.didDrop()) {
      return;
    }

    e.preventDefault();

    this._mouseClientOffset = {};

    this.uninstallSourceNodeRemovalObserver();
    this.actions.drop();
    this.actions.endDrag();
  }

  installSourceNodeRemovalObserver (node) {
    this.uninstallSourceNodeRemovalObserver();

    this.draggedSourceNode = node;
    this.draggedSourceNodeRemovalObserver = new window.MutationObserver(() => {
      if (!node.parentElement) {
        this.resurrectSourceNode();
        this.uninstallSourceNodeRemovalObserver();
      }
    });

    this.draggedSourceNodeRemovalObserver.observe(
      node.parentElement,
      { childList: true }
    );
  }

  resurrectSourceNode () {
    this.draggedSourceNode.style.display = 'none';
    this.draggedSourceNode.removeAttribute('data-reactid');
    document.body.appendChild(this.draggedSourceNode);
  }

  uninstallSourceNodeRemovalObserver () {
    if (this.draggedSourceNodeRemovalObserver) {
      this.draggedSourceNodeRemovalObserver.disconnect();
    }

    this.draggedSourceNodeRemovalObserver = null;
    this.draggedSourceNode = null;
  }
}

export default function createTouchBackend(manager) {
  return new TouchBackend(manager);
}