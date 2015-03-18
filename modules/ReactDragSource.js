import { findDOMNode } from 'react';
import { DragSource } from 'dnd-core';
import MonitorObservable from './MonitorObservable';
import invariant from 'react/lib/invariant';

class SourceAdapter {
  constructor(source, manager) {
    this.source = source;
    this.manager = manager;
  }

  addHandler(type) {
    const registry = this.manager.getRegistry();
    return registry.addSource(type, this.source);
  }

  removeHandler(handle) {
    const registry = this.manager.getRegistry();
    return registry.removeSource(handle);
  }

  addChangeListener(listener, context) {
    const monitor = this.manager.getMonitor();
    monitor.addChangeListener(listener, context);
  }

  removeChangeListener(listener, context) {
    const monitor = this.manager.getMonitor();
    monitor.removeChangeListener(listener, context);
  }

  // TODO: eww
  getState(handle) {
    const monitor = this.manager.getMonitor();
    const backend = this.manager.getBackend();
    const registry = this.manager.getRegistry();

    if (!registry.getSource(handle)) {
      return {
        canDrag: false,
        isDragging: false,
        ref: undefined
      };
    }

    return {
      canDrag: monitor.canDrag(handle),
      isDragging: monitor.isDragging(handle),
      ref: (component) => backend.updateSourceNode(handle, findDOMNode(component))
    };
  }
}

export default class ReactDragSource extends DragSource {
  constructor(component) {
    this.component = component;
  }

  connectTo(manager, type) {
    if (this.observable && this.observable.hasObservers()) {
      invariant(this.manager === manager, 'Cannot connect to another manager midflight.');
    } else {
      this.observable = new MonitorObservable(type, new SourceAdapter(this, manager));
      this.type = type;
      this.manager = manager;
    }

    this.observable.receiveType(type);
    return this.observable;
  }
}