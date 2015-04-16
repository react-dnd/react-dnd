import { DragSource } from 'dnd-core';
import EnterLeaveCounter from '../utils/EnterLeaveCounter';
import { isSafari, isFirefox } from '../utils/BrowserDetector';
import { isUrlDataTransfer, isFileDataTransfer } from '../utils/DataTransfer';
import { getElementRect, getMouseEventOffsets, getDragPreviewOffset } from '../utils/OffsetHelpers';
import shallowEqual from '../utils/shallowEqual';
import defaults from 'lodash/object/defaults';
import memoize from 'lodash/function/memoize';
import invariant from 'invariant';

class FileDragSource extends DragSource {
  constructor() {
    super();
    this.item = {
      get files() {
        console.warn('Browser doesn\'t allow reading file information until the files are dropped.');
        return null;
      }
    };
  }

  mutateItemByReadingDataTransfer(dataTransfer) {
    delete this.item.files;
    this.item.files = Array.prototype.slice.call(dataTransfer.files);
  }

  beginDrag() {
    return this.item;
  }
}

class UrlDragSource extends DragSource {
  constructor() {
    super();
    this.item = {
      get urls() {
        console.warn('Browser doesn\'t allow reading URL information until the link is dropped.');
        return null;
      }
    };
  }

  mutateItemByReadingDataTransfer(dataTransfer) {
    delete this.item.urls;
    this.item.urls = (
      dataTransfer.getData('Url') ||
      dataTransfer.getData('text/uri-list') || ''
    ).split('\n');
  }

  beginDrag() {
    return this.item;
  }
}

export const NativeTypes = {
  FILE: '__NATIVE_FILE__',
  URL: '__NATIVE_URL__'
};

class HTML5Backend {
  constructor(manager) {
    this.actions = manager.getActions();
    this.monitor = manager.getMonitor();
    this.registry = manager.getRegistry();

    this.sourcePreviewNodes = {};
    this.sourcePreviewNodeOptions = {};
    this.sourceNodeOptions = {};
    this.enterLeaveCounter = new EnterLeaveCounter();

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
    this.connectSourceNode = this.connectSourceNode.bind(this);
    this.connectSourcePreviewNode = this.connectSourcePreviewNode.bind(this);
    this.connectTargetNode = this.connectTargetNode.bind(this);
  }

  setup() {
    invariant(!this.constructor.isSetUp, 'Cannot have two HTML5 backends at the same time.');
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
  }

  teardown() {
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
  }

  connect() {
    return {
      dragSource: this.connectSourceNode,
      dragSourcePreview: this.connectSourcePreviewNode,
      dropTarget: this.connectTargetNode
    };
  }

  connectSourcePreviewNode(sourceId, node, options) {
    this.sourcePreviewNodeOptions[sourceId] = options;
    this.sourcePreviewNodes[sourceId] = node;

    return () => {
      delete this.sourcePreviewNodes[sourceId];
      delete this.sourcePreviewNodeOptions[sourceId];
    };
  }

  connectSourceNode(sourceId, node, options) {
    const handleDragStart = (e) => this.handleDragStart(e, sourceId);

    this.sourceNodeOptions[sourceId] = options;
    node.setAttribute('draggable', true);
    node.addEventListener('dragstart', handleDragStart);

    return () => {
      delete this.sourceNodeOptions[sourceId];
      node.removeEventListener('dragstart', handleDragStart);
      node.setAttribute('draggable', false);
    };
  }

  connectTargetNode(targetId, node) {
    const handleDragEnter = (e) => this.handleDragEnter(e, targetId);
    const handleDragOver = (e) => this.handleDragOver(e, targetId);
    const handleDrop = (e) => this.handleDrop(e, targetId);

    node.addEventListener('dragenter', handleDragEnter);
    node.addEventListener('dragover', handleDragOver);
    node.addEventListener('drop', handleDrop);

    return () => {
      node.removeEventListener('dragenter', handleDragEnter);
      node.removeEventListener('dragover', handleDragOver);
      node.removeEventListener('drop', handleDrop);
    };
  }

  getSpecifiedDropEffect() {
    const sourceId = this.monitor.getSourceId();
    const sourceNodeOptions = this.sourceNodeOptions[sourceId];

    return defaults(sourceNodeOptions || {}, {
      dropEffect: 'move'
    }).dropEffect;
  }

  getSpecifiedAnchorPoint() {
    const sourceId = this.monitor.getSourceId();
    const sourcePreviewNodeOptions = this.sourcePreviewNodeOptions[sourceId];

    return defaults(sourcePreviewNodeOptions || {}, {
      anchorX: 0.5,
      anchorY: 0.5
    });
  }

  isDraggingNativeItem() {
    switch (this.monitor.getItemType()) {
    case NativeTypes.FILE:
    case NativeTypes.URL:
      return true;
    default:
      return false;
    }
  }

  beginDragNativeUrl() {
    this.clearCurrentDragSourceNode();

    this.currentNativeSource = new UrlDragSource();
    this.currentNativeHandle = this.registry.addSource(NativeTypes.URL, this.currentNativeSource);
    this.actions.beginDrag([this.currentNativeHandle]);
  }

  beginDragNativeFile() {
    this.clearCurrentDragSourceNode();

    this.currentNativeSource = new FileDragSource();
    this.currentNativeHandle = this.registry.addSource(NativeTypes.FILE, this.currentNativeSource);
    this.actions.beginDrag([this.currentNativeHandle]);
  }

  endDragNativeItem() {
    this.actions.endDrag();
    this.registry.removeSource(this.currentNativeHandle);
    this.currentNativeHandle = null;
    this.currentNativeSource = null;
  }

  endDragIfSourceWasRemovedFromDOM() {
    const node = this.currentDragSourceNode;
    if (document.body.contains(node)) {
      return;
    }

    this.actions.endDrag();
    this.clearCurrentDragSourceNode();
  }

  setCurrentDragSourceNode(node) {
    this.clearCurrentDragSourceNode();
    this.currentDragSourceNode = node;
    this.currentDragSourceNodeRect = getElementRect(node);
    this.currentDragSourceNodeRectChanged = false;

    // Receiving a mouse event in the middle of a dragging operation
    // means it has ended and the drag source node disappeared from DOM,
    // so the browser didn't dispatch the dragend event.
    window.addEventListener('mousemove', this.endDragIfSourceWasRemovedFromDOM, true);
  }

  clearCurrentDragSourceNode() {
    if (this.currentDragSourceNode) {
      this.currentDragSourceNode = null;
      this.currentDragSourceNodeRect = null;
      this.currentDragSourceNodeRectChanged = false;
      window.removeEventListener('mousemove', this.endDragIfSourceWasRemovedFromDOM, true);
      return true;
    } else {
      return false;
    }
  }

  checkIfCurrentDragSourceRectChanged() {
    const node = this.currentDragSourceNode;
    if (!node) {
      return false;
    }

    if (this.currentDragSourceNodeRectChanged) {
      return true;
    }

    this.currentDragSourceNodeRectChanged = !shallowEqual(
      getElementRect(node),
      this.currentDragSourceNodeRect
    );

    return this.currentDragSourceNodeRectChanged;
  }

  handleTopDragStartCapture() {
    this.clearCurrentDragSourceNode();
    this.dragStartSourceIds = [];
    this.dragStartSourceNodes = {};
  }

  handleDragStart(e, sourceId) {
    this.dragStartSourceIds.unshift(sourceId);
    this.dragStartSourceNodes[sourceId] = e.currentTarget;
  }

  handleTopDragStart(e) {
    const { dragStartSourceIds, dragStartSourceNodes } = this;
    this.dragStartSourceIds = null;
    this.dragStartSourceNodes = null;

    // Pass false to keep drag source unpublished.
    // We will publish it in the next tick so browser
    // has time to screenshot current state and doesn't
    // cancel drag if the source DOM node is removed.
    this.actions.beginDrag(dragStartSourceIds, false);

    const { dataTransfer } = e;
    if (this.monitor.isDragging()) {
      // Use custom drag image if user specifies it.
      // If child drag source refuses drag but parent agrees,
      // use parent's node as drag image. Neither works in IE though.
      const sourceId = this.monitor.getSourceId();
      const sourceNode = dragStartSourceNodes[sourceId];
      const dragPreview = this.sourcePreviewNodes[sourceId] || sourceNode;
      const anchorPoint = this.getSpecifiedAnchorPoint();
      const { offsetFromDragPreview } = getMouseEventOffsets(e, sourceNode, dragPreview);
      const dragPreviewOffset = getDragPreviewOffset(
        sourceNode,
        dragPreview,
        offsetFromDragPreview,
        anchorPoint
      );
      dataTransfer.setDragImage(dragPreview, dragPreviewOffset.x, dragPreviewOffset.y);

      try {
        // Firefox won't drag without setting data
        dataTransfer.setData('application/json', {});
      } catch (err) {
        // IE doesn't support MIME types in setData
      }

      // Store drag source node so we can check whether
      // it is removed from DOM and trigger endDrag manually.
      this.setCurrentDragSourceNode(e.target);

      setTimeout(() => {
        // By now, the browser has taken drag screenshot
        // and we can safely let the drag source know it's active.
        this.actions.publishDragSource();
      });

    } else if (isUrlDataTransfer(dataTransfer)) {
      // URL dragged from inside the document
      this.beginDragNativeUrl();
    } else {
      // If by this time no drag source reacted, tell browser not to drag.
      e.preventDefault();
    }
  }

  handleTopDragEndCapture() {
    if (this.clearCurrentDragSourceNode()) {
      // Firefox can dispatch this event in an infinite loop
      // if dragend handler does something like showing an alert.
      // Only proceed if we have not handled it already.
      this.actions.endDrag();
    }
  }

  handleTopDragEnterCapture(e) {
    this.dragEnterTargetIds = [];

    const isFirstEnter = this.enterLeaveCounter.enter(e.target);
    if (!isFirstEnter || this.monitor.isDragging()) {
      return;
    }

    const { dataTransfer } = e;
    if (isFileDataTransfer(dataTransfer)) {
      // File dragged from outside the document
      this.beginDragNativeFile();
    } else if (isUrlDataTransfer(dataTransfer)) {
      // URL dragged from outside the document
      this.beginDragNativeUrl();
    }
  }

  handleDragEnter(e, targetId) {
    this.dragEnterTargetIds.unshift(targetId);
  }

  handleTopDragEnter(e) {
    const { dragEnterTargetIds } = this;
    this.dragEnterTargetIds = [];

    if (!isFirefox()) {
      // Don't emit hover in `dragenter` on Firefox due to an edge case.
      // If the target changes position as the result of `dragenter`, Firefox
      // will still happily dispatch `dragover` despite target being no longer
      // there. The easy solution is to only fire `hover` in `dragover` on FF.
      this.actions.hover(dragEnterTargetIds);
    }

    const canDrop = dragEnterTargetIds.some(
      targetId => this.monitor.canDrop(targetId)
    );

    if (canDrop) {
      // IE requires this to fire dragover events
      e.preventDefault();
      e.dataTransfer.dropEffect = this.getSpecifiedDropEffect();
    }
  }

  handleTopDragOverCapture() {
    this.dragOverTargetIds = [];
  }

  handleDragOver(e, targetId) {
    this.dragOverTargetIds.unshift(targetId);
  }

  handleTopDragOver(e) {
    const { dragOverTargetIds } = this;
    this.dragOverTargetIds = [];
    this.actions.hover(dragOverTargetIds);

    const canDrop = dragOverTargetIds.some(
      targetId => this.monitor.canDrop(targetId)
    );

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
  }

  handleTopDragLeaveCapture(e) {
    if (this.isDraggingNativeItem()) {
      e.preventDefault();
    }

    const isLastLeave = this.enterLeaveCounter.leave(e.target);
    if (!isLastLeave || !this.isDraggingNativeItem()) {
      return;
    }

    this.endDragNativeItem();
  }

  handleTopDropCapture(e) {
    this.dropTargetIds = [];

    if (this.isDraggingNativeItem()) {
      e.preventDefault();
      this.currentNativeSource.mutateItemByReadingDataTransfer(e.dataTransfer);
    }

    this.enterLeaveCounter.reset();
  }

  handleDrop(e, targetId) {
    this.dropTargetIds.unshift(targetId);
  }

  handleTopDrop() {
    const { dropTargetIds } = this;
    this.dropTargetIds = [];

    this.actions.hover(dropTargetIds);
    this.actions.drop();

    if (this.isDraggingNativeItem()) {
      this.endDragNativeItem();
    } else {
      this.endDragIfSourceWasRemovedFromDOM();
    }
  }
}

export default function createHTML5Backend(manager) {
  return new HTML5Backend(manager);
}