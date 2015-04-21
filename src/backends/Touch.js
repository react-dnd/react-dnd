import { DragSource } from 'dnd-core';
import { getElementClientOffset, getEventClientOffset } from '../utils/OffsetHelpers';
import invariant from 'invariant';

class TouchBackend {
  constructor(manager) {
    this.actions = manager.getActions();
    this.monitor = manager.getMonitor();
    this.registry = manager.getRegistry();

    this.sourceNodes = {};
    this.sourceNodeOptions = {};
    this.targetNodes = {};
    this.targetNodeOptions = {};

    this.getSourceClientOffset = this.getSourceClientOffset.bind(this);
    this.handleTopTouchStart = this.handleTopTouchStart.bind(this);
    this.handleTopTouchStartCapture = this.handleTopTouchStartCapture.bind(this);
    this.handleTopTouchMoveCapture = this.handleTopTouchMoveCapture.bind(this);
    this.handleTopTouchEndCapture = this.handleTopTouchEndCapture.bind(this);
  }

  setup() {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('touchstart', this.handleTopTouchStartCapture, true);
    window.addEventListener('touchstart', this.handleTopTouchStart);
    window.addEventListener('touchmove', this.handleTopTouchMoveCapture, true);
    window.addEventListener('touchend', this.handleTopTouchEndCapture, true);
  }

  teardown() {
    if (typeof window === 'undefined') {
      return;
    }

    window.removeEventListener('touchstart', this.handleTopTouchStartCapture, true);
    window.removeEventListener('touchstart', this.handleTopTouchStart);
    window.removeEventListener('touchmove', this.handleTopTouchMoveCapture, true);
    window.removeEventListener('touchend', this.handleTopTouchEndCapture, true);

    this.uninstallSourceNodeRemovalObserver();
  }

  connectDragSource(sourceId) {
    return {
      connect: (node, options) => this.connectSourceNode(sourceId, node, options),
      connectPreview: () => () => {}
    };
  }

  connectDropTarget(targetId) {
    return {
      connect: (node, options) => this.connectTargetNode(targetId, node, options)
    };
  }

  getSourceClientOffset(sourceId) {
    return getElementClientOffset(this.sourceNodes[sourceId]);
  }

  handleTopTouchStartCapture(e) {
    this.touchStartSourceIds = [];
  }

  handleTouchStart(e, sourceId) {
    this.touchStartSourceIds.unshift(sourceId);
  }

  handleTopTouchStart(e) {
    const { touchStartSourceIds } = this;
    this.touchStartSourceIds = null;

    if (e.targetTouches.length !== 1) {
      return;
    }

    this.actions.beginDrag(touchStartSourceIds, {
      clientOffset: getEventClientOffset(e.targetTouches[0]),
      getSourceClientOffset: this.getSourceClientOffset,
      publishSource: false
    });

    if (this.monitor.isDragging()) {
      const sourceNode = this.sourceNodes[this.monitor.getSourceId()];
      this.installSourceNodeRemovalObserver(sourceNode);
      this.actions.publishDragSource();
    }
  }

  handleTopTouchMoveCapture(e) {
    if (e.targetTouches.length !== 1) {
      return;
    }

    if (!this.monitor.isDragging()) {
      return;
    }

    e.preventDefault();

    const clientOffset = getEventClientOffset(e.targetTouches[0]);
    const matchingTargetIds = Object.keys(this.targetNodes).filter(targetId => {
      const boundingRect = this.targetNodes[targetId].getBoundingClientRect();
      return clientOffset.x >= boundingRect.left &&
             clientOffset.x <= boundingRect.right &&
             clientOffset.y >= boundingRect.top &&
             clientOffset.y <= boundingRect.bottom;
    });

    this.actions.hover(matchingTargetIds, {
      clientOffset
    });
  }

  handleTopTouchEndCapture(e) {
    if (!this.monitor.isDragging() || this.monitor.didDrop()) {
      return;
    }

    e.preventDefault();

    this.uninstallSourceNodeRemovalObserver();
    this.actions.drop();
    this.actions.endDrag();
  }

  installSourceNodeRemovalObserver(node) {
    this.uninstallSourceNodeRemovalObserver();

    this.draggedSourceNode = node;
    this.draggedSourceNodeRemovalObserver = new MutationObserver(() => {
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

  resurrectSourceNode() {
    this.draggedSourceNode.style.display = 'none';
    this.draggedSourceNode.removeAttribute('data-reactid');
    document.body.appendChild(this.draggedSourceNode);
  }

  uninstallSourceNodeRemovalObserver() {
    if (this.draggedSourceNodeRemovalObserver) {
      this.draggedSourceNodeRemovalObserver.disconnect();
    }

    this.draggedSourceNodeRemovalObserver = null;
    this.draggedSourceNode = null;
  }

  connectSourceNode(sourceId, node, options) {
    this.sourceNodes[sourceId] = node;

    const handleTouchStart = (e) => this.handleTouchStart(e, sourceId);
    node.addEventListener('touchstart', handleTouchStart);

    return () => {
      delete this.sourceNodes[sourceId];
      node.removeEventListener('touchstart', handleTouchStart);
    };
  }

  connectTargetNode(targetId, node) {
    this.targetNodes[targetId] = node;

    return () => {
      delete this.targetNodes[targetId];
    };
  }
}

export default function createTouchBackend(manager) {
  return new TouchBackend(manager);
}