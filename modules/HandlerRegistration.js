import invariant from 'invariant';
import { Disposable, CompositeDisposable } from 'disposables';
import ComponentDragSource from './ComponentDragSource';
import ComponentDropTarget from './ComponentDropTarget';

export default class HandlerRegistration {
  constructor(registry, handler) {
    this.registry = registry;
    this.handler = handler;
    this.handlerId = null;

    const innerDisposable = new Disposable(this.unregister.bind(this));
    this.disposable = new CompositeDisposable(innerDisposable);

    this.register();
  }

  getHandlerId() {
    return this.handlerId || null;
  }

  receiveHandler(nextHandler) {
    return this.handler.receive(nextHandler);
  }

  addDisposable(disposable) {
    this.disposable.add(disposable);
  }

  register() {
    invariant(!this.handlerId, 'Already registered.');
    const { registry, handler } = this;
    const { type } = handler;

    if (handler instanceof ComponentDragSource) {
      this.handlerId = registry.addSource(type, handler);
    } else if (handler instanceof ComponentDropTarget) {
      this.handlerId = registry.addTarget(type, handler);
    } else {
      invariant(false, 'Handle is neither a source nor a target.');
    }
  }

  unregister() {
    invariant(this.handlerId, 'Not registered.');
    const { registry, handler, handlerId } = this;

    if (handler instanceof ComponentDragSource) {
      registry.removeSource(handlerId);
    } else if (handler instanceof ComponentDropTarget) {
      registry.removeTarget(handlerId);
    } else {
      invariant(false, 'Handle is neither a source nor a target.');
    }

    this.handlerId = null;
    this.handler = null;
    this.registry = null;
  }

  getDisposable() {
    return this.disposable;
  }
}