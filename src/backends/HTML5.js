import { DragSource } from 'dnd-core';
import EnterLeaveCounter from '../utils/EnterLeaveCounter';
import { isFirefox } from '../utils/BrowserDetector';
import { isUrlDataTransfer, isFileDataTransfer, isTextDataTransfer } from '../utils/DataTransfer';
import { getElementClientOffset, getEventClientOffset, getDragPreviewOffset } from '../utils/OffsetHelpers';
import shallowEqual from '../utils/shallowEqual';
import defaults from 'lodash/object/defaults';
import invariant from 'invariant';

export const NativeTypes = {
  FILE: Symbol('Native File'),
  URL: Symbol('Native URL'),
  TEXT: Symbol('Native Text')
};

let emptyImage;
export function getEmptyImage() {
  if (!emptyImage) {
    emptyImage = new Image();
    emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  }

  return emptyImage;
}

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

class TextDragSource extends DragSource {
  constructor() {
    super();
    this.item = {
      get text() {
        console.warn('Browser doesn\'t allow reading the text until it is dropped.');
        return null;
      }
    };
  }

  mutateItemByReadingDataTransfer(dataTransfer) {
    delete this.item.text;
    this.item.text = (
      dataTransfer.getData('Text') ||
      dataTransfer.getData('text/text-plain') || ''
    );
  }

  beginDrag() {
    return this.item;
  }
}

class HTML5Backend {
  constructor(manager) {
    this.actions = manager.getActions();
    this.monitor = manager.getMonitor();
    this.registry = manager.getRegistry();

    this.sourcePreviewNodes = {};
    this.sourcePreviewNodeOptions = {};
    this.sourceNodes = {};
    this.sourceNodeOptions = {};
    this.enterLeaveCounter = new EnterLeaveCounter();

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
    this.handleSelectStart = this.handleSelectStart.bind(this);
    this.endDragIfSourceWasRemovedFromDOM = this.endDragIfSourceWasRemovedFromDOM.bind(this);
  }

  setup() {
    if (typeof window === 'undefined') {
      return;
    }

    invariant(!this.constructor.isSetUp, 'Cannot have two HTML5 backends at the same time.');
    this.constructor.isSetUp = true;

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
    if (typeof window === 'undefined') {
      return;
    }

    this.constructor.isSetUp = false;

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

  connectDragPreview(sourceId, node, options) {
    this.sourcePreviewNodeOptions[sourceId] = options;
    this.sourcePreviewNodes[sourceId] = node;

    return () => {
      delete this.sourcePreviewNodes[sourceId];
      delete this.sourcePreviewNodeOptions[sourceId];
    };
  }

  connectDragSource(sourceId, node, options) {
    this.sourceNodes[sourceId] = node;
    this.sourceNodeOptions[sourceId] = options;

    const handleDragStart = (e) => this.handleDragStart(e, sourceId);
    const handleSelectStart = (e) => this.handleSelectStart(e, sourceId);

    node.setAttribute('draggable', true);
    node.addEventListener('dragstart', handleDragStart);
    node.addEventListener('selectstart', handleSelectStart);

    return () => {
      delete this.sourceNodes[sourceId];
      delete this.sourceNodeOptions[sourceId];

      node.removeEventListener('dragstart', handleDragStart);
      node.removeEventListener('selectstart', handleSelectStart);
      node.setAttribute('draggable', false);
    };
  }

  connectDropTarget(targetId, node) {
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

  getCurrentSourceNodeOptions() {
    const sourceId = this.monitor.getSourceId();
    const sourceNodeOptions = this.sourceNodeOptions[sourceId];

    return defaults(sourceNodeOptions || {}, {
      dropEffect: 'move'
    });
  }

  getCurrentSourcePreviewNodeOptions() {
    const sourceId = this.monitor.getSourceId();
    const sourcePreviewNodeOptions = this.sourcePreviewNodeOptions[sourceId];

    return defaults(sourcePreviewNodeOptions || {}, {
      anchorX: 0.5,
      anchorY: 0.5,
      captureDraggingState: false
    });
  }

  getSourceClientOffset(sourceId) {
    return getElementClientOffset(this.sourceNodes[sourceId]);
  }

  isDraggingNativeItem() {
    switch (this.monitor.getItemType()) {
    case NativeTypes.FILE:
    case NativeTypes.URL:
    case NativeTypes.TEXT:
      return true;
    default:
      return false;
    }
  }

  beginDragNativeItem(type, NativeDragSource) {
    this.clearCurrentDragSourceNode();

    this.currentNativeSource = new NativeDragSource();
    this.currentNativeHandle = this.registry.addSource(type, this.currentNativeSource);
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
    this.currentDragSourceNodeOffset = getElementClientOffset(node);
    this.currentDragSourceNodeOffsetChanged = false;

    // Receiving a mouse event in the middle of a dragging operation
    // means it has ended and the drag source node disappeared from DOM,
    // so the browser didn't dispatch the dragend event.
    window.addEventListener('mousemove', this.endDragIfSourceWasRemovedFromDOM, true);
  }

  clearCurrentDragSourceNode() {
    if (this.currentDragSourceNode) {
      this.currentDragSourceNode = null;
      this.currentDragSourceNodeOffset = null;
      this.currentDragSourceNodeOffsetChanged = false;
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

    if (this.currentDragSourceNodeOffsetChanged) {
      return true;
    }

    this.currentDragSourceNodeOffsetChanged = !shallowEqual(
      getElementClientOffset(node),
      this.currentDragSourceNodeOffset
    );

    return this.currentDragSourceNodeOffsetChanged;
  }

  handleTopDragStartCapture() {
    this.clearCurrentDragSourceNode();
    this.dragStartSourceIds = [];
  }

  handleDragStart(e, sourceId) {
    this.dragStartSourceIds.unshift(sourceId);
  }

  handleTopDragStart(e) {
    const { dragStartSourceIds } = this;
    this.dragStartSourceIds = null;

    const clientOffset = getEventClientOffset(e);

    // Don't publish the source just yet (see why below)
    this.actions.beginDrag(dragStartSourceIds, {
      publishSource: false,
      getSourceClientOffset: this.getSourceClientOffset,
      clientOffset
    });

    const { dataTransfer } = e;
    if (this.monitor.isDragging()) {
      if (typeof dataTransfer.setDragImage === 'function') {
        // Use custom drag image if user specifies it.
        // If child drag source refuses drag but parent agrees,
        // use parent's node as drag image. Neither works in IE though.
        const sourceId = this.monitor.getSourceId();
        const sourceNode = this.sourceNodes[sourceId];
        const dragPreview = this.sourcePreviewNodes[sourceId] || sourceNode;
        const { anchorX, anchorY } = this.getCurrentSourcePreviewNodeOptions();
        const anchorPoint = { anchorX, anchorY };
        const dragPreviewOffset = getDragPreviewOffset(
          sourceNode,
          dragPreview,
          clientOffset,
          anchorPoint
        );
        dataTransfer.setDragImage(dragPreview, dragPreviewOffset.x, dragPreviewOffset.y);
      }

      try {
        // Firefox won't drag without setting data
        dataTransfer.setData('application/json', {});
      } catch (err) {
        // IE doesn't support MIME types in setData
      }

      // Store drag source node so we can check whether
      // it is removed from DOM and trigger endDrag manually.
      this.setCurrentDragSourceNode(e.target);

      // Now we are ready to publish the drag source.. or are we not?
      const { captureDraggingState } = this.getCurrentSourcePreviewNodeOptions();
      if (!captureDraggingState) {
        // Usually we want to publish it in the next tick so that browser
        // is able to screenshot the current (not yet dragging) state.
        //
        // It also neatly avoids a situation where render() returns null
        // in the same tick for the source element, and browser freaks out.
        setTimeout(() => this.actions.publishDragSource());
      } else {
        // In some cases the user may want to override this behavior, e.g.
        // to work around IE not supporting custom drag previews.
        //
        // When using a custom drag layer, the only way to prevent
        // the default drag preview from drawing in IE is to screenshot
        // the dragging state in which the node itself has zero opacity
        // and height. In this case, though, returning null from render()
        // will abruptly end the dragging, which is not obvious.
        //
        // This is the reason such behavior is strictly opt-in.
        this.actions.publishDragSource();
      }
    } else if (isUrlDataTransfer(dataTransfer)) {
      // URL dragged from inside the document
      this.beginDragNativeItem(NativeTypes.URL, UrlDragSource);
    } else if (isTextDataTransfer(dataTransfer)) {
      // Text dragged from inside the document
      this.beginDragNativeItem(NativeTypes.TEXT, TextDragSource);
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
      this.beginDragNativeItem(NativeTypes.FILE, FileDragSource);
    } else if (isUrlDataTransfer(dataTransfer)) {
      // URL dragged from outside the document
      this.beginDragNativeItem(NativeTypes.URL, UrlDragSource);
    } else if (isTextDataTransfer(dataTransfer)) {
      // Text dragged from outside the document
      this.beginDragNativeItem(NativeTypes.TEXT, TextDragSource);
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
      this.actions.hover(dragEnterTargetIds, {
        clientOffset: getEventClientOffset(e)
      });
    }

    const canDrop = dragEnterTargetIds.some(
      targetId => this.monitor.canDropOnTarget(targetId)
    );

    if (canDrop) {
      // IE requires this to fire dragover events
      e.preventDefault();
      const { dropEffect } = this.getCurrentSourceNodeOptions();
      e.dataTransfer.dropEffect = dropEffect;
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
    this.actions.hover(dragOverTargetIds, {
      clientOffset: getEventClientOffset(e)
    });

    const canDrop = dragOverTargetIds.some(
      targetId => this.monitor.canDropOnTarget(targetId)
    );

    if (canDrop) {
      // Show user-specified drop effect.
      e.preventDefault();
      const { dropEffect } = this.getCurrentSourceNodeOptions();
      e.dataTransfer.dropEffect = dropEffect;
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

  handleTopDrop(e) {
    const { dropTargetIds } = this;
    this.dropTargetIds = [];

    this.actions.hover(dropTargetIds, {
      clientOffset: getEventClientOffset(e)
    });
    this.actions.drop();

    if (this.isDraggingNativeItem()) {
      this.endDragNativeItem();
    } else {
      this.endDragIfSourceWasRemovedFromDOM();
    }
  }

  handleSelectStart(e) {
    // Prevent selection on IE
    // and instead ask it to consider dragging.
    e.preventDefault();
    if (typeof e.target.dragDrop === 'function') {
      e.target.dragDrop();
    }
  }
}

export default function createHTML5Backend(manager) {
  return new HTML5Backend(manager);
}