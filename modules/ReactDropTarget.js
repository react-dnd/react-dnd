'use strict';

import { DropTarget } from 'dnd-core';
import MonitorObservable from './MonitorObservable';
import invariant from 'react/lib/invariant';

class TargetAdapter {
  constructor(target, manager) {
    this.target = target;
    this.manager = manager;
  }

  addHandler(type) {
    const registry = this.manager.getRegistry();
    return registry.addTarget(type, this.target);
  }

  removeHandler(handle) {
    const registry = this.manager.getRegistry();
    return registry.removeTarget(handle);
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

    if (!registry.getTarget(handle)) {
      return {
        canDrop: false,
        isOver: false,
        isOverShallow: false,
        dropEventHandlers: {}
      };
    }

    return {
      canDrop: monitor.canDrop(handle),
      isOver: monitor.canDrop(handle) && monitor.isOver(handle),
      isOverShallow: monitor.canDrop(handle) && monitor.isOver(handle, true),
      dropEventHandlers: backend.getTargetProps(handle, this.target.component)
    };
  }
}

export default class ReactDropTarget extends DropTarget {
  constructor(component) {
    this.component = component;
  }

  connectTo(manager, type) {
    if (this.observable && this.observable.hasObservers()) {
      invariant(this.manager === manager, 'Cannot connect to another manager midflight.');
    } else {
      this.observable = new MonitorObservable(type, new TargetAdapter(this, manager));
      this.type = type;
      this.manager = manager;
    }

    if (this.type !== type) {
      this.observable.replaceType(type);
    }

    return this.observable;
  }
}