import invariant from 'invariant';
import { Disposable, CompositeDisposable } from 'disposables';
import DragSource from './DragSource';
import DropTarget from './DropTarget';
import DragSourceMonitor from './DragSourceMonitor';
import DropTargetMonitor from './DropTargetMonitor';

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
    if (handler instanceof DragSource) {
      this.handlerId = registry.addSource(type, handler);
      this.handlerMonitor = new DragSourceMonitor(manager, this.handlerId);
    } else if (handler instanceof DropTarget) {
      this.handlerId = registry.addTarget(type, handler);
      this.handlerMonitor = new DropTargetMonitor(manager, this.handlerId);
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
    if (handler instanceof DragSource) {
      registry.removeSource(handlerId);
    } else if (handler instanceof DropTarget) {
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