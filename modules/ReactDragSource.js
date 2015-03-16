'use strict';

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
    const monitor = this.manager.getContext();
    monitor.addChangeListener(listener, context);
  }

  removeChangeListener(listener, context) {
    const monitor = this.manager.getContext();
    monitor.removeChangeListener(listener, context);
  }

  getState(handle) {
    const monitor = this.manager.getContext();
    const backend = this.manager.getBackend();

    return {
      canDrag: monitor.canDrag(handle),
      isDragging: monitor.isDragging(handle),
      dragEventHandlers: backend.getSourceProps(handle)
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

    if (this.type !== type) {
      this.observable.replaceType(type);
    }

    return this.observable;
  }
}