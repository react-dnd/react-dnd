import { Disposable, CompositeDisposable, SerialDisposable } from 'disposables';
import HandlerMapping from './HandlerMapping';
import invariant from 'invariant';
import values from 'lodash/object/values';
import xor from 'lodash/array/xor';

export default class HandlerMap {
  constructor(manager, handlers, onChange) {
    this.manager = manager;
    this.onChange = onChange;

    this.changeSubscriptionDisposable = new SerialDisposable();
    this.disposable = new CompositeDisposable(this.changeSubscriptionDisposable);

    this.createMappings(handlers);
    this.resubscribe();
  }

  createMappings(handlers) {
    this.mappings = {};

    Object.keys(handlers).forEach(key => {
      const handler = handlers[key];
      const mapping = new HandlerMapping(this.manager, handler);

      this.mappings[key] = mapping;
      this.disposable.add(mapping.getDisposable());
    });
  }

  mapMappings(selector) {
    const result = {};

    Object.keys(this.mappings).forEach(key => {
      const mapping = this.mappings[key];
      result[key] = selector(mapping);
    });

    return result;
  }

  getHandlerIds() {
    return this.mapMappings(m => m.getHandlerId());
  }

  getHandlerMonitors() {
    return this.mapMappings(m => m.getHandlerMonitor());
  }

  receiveHandlers(nextHandlers) {
    const knownKeys = Object.keys(this.mappings);
    const nextKeys = Object.keys(nextHandlers);

    invariant(
      xor(knownKeys, nextKeys).length === 0,
      'Expected handlers to have stable keys at runtime.'
    );

    const receivedAll = nextKeys.reduce((receivedAllYet, key) => {
      const mapping = this.mappings[key];
      const nextHandler = nextHandlers[key];

      const receivedCurrent = mapping.receiveHandler(nextHandler);
      return receivedAllYet && receivedCurrent;
    }, true);

    if (!receivedAll) {
      this.resubscribe();
    }
  }

  resubscribe() {
    const handlerIds = this.getHandlerIds();
    const monitor = this.manager.getMonitor();

    const unsubscribe = monitor.subscribeToStateChange(this.onChange, {
      handlerIds: values(handlerIds)
    });
    const disposable = new Disposable(unsubscribe);
    this.changeSubscriptionDisposable.setDisposable(disposable);
  }

  getDisposable() {
    return this.disposable;
  }
}