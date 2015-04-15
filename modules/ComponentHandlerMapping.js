import { SerialDisposable } from 'disposables'
import HandlerRegistration from './HandlerRegistration';

export default class ComponentHandlerMapping {
  constructor(registry, handler) {
    this.registry = registry;
    this.registration = null;

    this.disposable = new SerialDisposable();
    this.receiveHandler(handler);
  }

  getHandlerId() {
    if (this.registration) {
      return this.registration.handlerId || null;
    } else {
      return null;
    }
  }

  addDisposable(disposable) {
    this.registration.addDisposable(disposable);
  }

  receiveHandler(nextHandler) {
    const { registration, registry } = this;
    if (registration && registration.receiveHandler(nextHandler)) {
      return true;
    }

    const nextRegistration = new HandlerRegistration(registry, nextHandler);
    const nextDisposable = nextRegistration.getDisposable();

    this.disposable.setDisposable(nextDisposable);
    this.registration = nextRegistration;

    return false;
  }

  getDisposable() {
    return this.disposable;
  }
}