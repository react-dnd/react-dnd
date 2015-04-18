import { SerialDisposable } from 'disposables';
import HandlerRegistration from './HandlerRegistration';

export default class ComponentHandlerMapping {
  constructor(manager, handler) {
    this.manager = manager;
    this.registration = null;

    this.disposable = new SerialDisposable();
    this.receiveHandler(handler);
  }

  getHandlerId() {
    return this.registration.getHandlerId();
  }

  getHandlerMonitor() {
    return this.registration.getHandlerMonitor();
  }

  receiveHandler(nextHandler) {
    const { registration, manager } = this;
    if (registration && registration.receiveHandler(nextHandler)) {
      return true;
    }

    const nextRegistration = new HandlerRegistration(manager, nextHandler);
    const nextDisposable = nextRegistration.getDisposable();

    this.disposable.setDisposable(nextDisposable);
    this.registration = nextRegistration;

    return false;
  }

  getDisposable() {
    return this.disposable;
  }
}