import invariant from 'invariant';
import { Disposable, CompositeDisposable } from 'disposables';
import ComponentDragSource from './ComponentDragSource';
import ComponentDropTarget from './ComponentDropTarget';
import SourceMonitor from './SourceMonitor';
import TargetMonitor from './TargetMonitor';

export default class HandlerRegistration {
  constructor(manager, handler) {
    this.manager = manager;

    this.handler = handler;
    this.handlerId = null;
    this.handlerMonitor = null;

    const innerDisposable = new Disposable(this.unregister.bind(this));
    this.disposable = new CompositeDisposable(innerDisposable);

    this.register();
  }

  getHandlerId() {
    return this.handlerId;
  }

  getHandlerMonitor() {
    return this.handlerMonitor;
  }

  receiveHandler(nextHandler) {
    return this.handler.receive(nextHandler);
  }

  addDisposable(disposable) {
    this.disposable.add(disposable);
  }

  register() {
    invariant(!this.handlerId, 'Already registered.');
    const { manager, handler } = this;
    const { type } = handler;

    const registry = manager.getRegistry();
    if (handler instanceof ComponentDragSource) {
      this.handlerId = registry.addSource(type, handler);
      this.handlerMonitor = new SourceMonitor(manager, this.handlerId);
    } else if (handler instanceof ComponentDropTarget) {
      this.handlerId = registry.addTarget(type, handler);
      this.handlerMonitor = new TargetMonitor(manager, this.handlerId);
    } else {
      invariant(false, 'Handle is neither a source nor a target.');
    }

    const monitorDisposable = this.handlerMonitor.getDisposable();
    this.disposable.add(monitorDisposable);
  }

  unregister() {
    invariant(this.handlerId, 'Not registered.');
    const { manager, handler, handlerId } = this;

    const registry = manager.getRegistry();
    if (handler instanceof ComponentDragSource) {
      registry.removeSource(handlerId);
    } else if (handler instanceof ComponentDropTarget) {
      registry.removeTarget(handlerId);
    } else {
      invariant(false, 'Handle is neither a source nor a target.');
    }

    this.handlerId = null;
    this.handlerMonitor = null;
    this.manager = null;
  }

  getDisposable() {
    return this.disposable;
  }
}