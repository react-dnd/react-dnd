import { Disposable, CompositeDisposable, SerialDisposable } from 'disposables';
import ComponentHandlerMapping from './ComponentHandlerMapping';
import invariant from 'invariant';
import values from 'lodash/object/values';
import xor from 'lodash/array/xor';

export default class ComponentHandlerMap {
  constructor(registry, monitor, handlers, onChange) {
    this.registry = registry;
    this.monitor = monitor;
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
      const mapping = new ComponentHandlerMapping(this.registry, handler);

      this.mappings[key] = mapping;
      this.disposable.add(mapping.getDisposable());
    });
  }

  addDisposable(handlerId, disposable) {
    const keys = Object.keys(this.mappings);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const mapping = this.mappings[key];

      if (mapping.getHandlerId() === handlerId) {
        mapping.addDisposable(disposable);
        return;
      }
    }

    disposable.dispose();
  }

  getHandlerIds() {
    const handlerIds = {};

    Object.keys(this.mappings).forEach(key => {
      const mapping = this.mappings[key];
      handlerIds[key] = mapping.getHandlerId();
    });

    return handlerIds;
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
    const unsubscribe = this.monitor.subscribe(this.onChange, values(handlerIds));
    const disposable = new Disposable(unsubscribe);

    this.changeSubscriptionDisposable.setDisposable(disposable);
  }

  getDisposable() {
    return this.disposable;
  }
}