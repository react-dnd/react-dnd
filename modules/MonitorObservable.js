'use strict';

export default class MonitorObservable {
  constructor(type, adapter) {
    this.type = type;
    this.adapter = adapter;
    this.observers = [];
  }

  hasObservers() {
    return this.observers.length > 0;
  }

  subscribe(observer) {
    this.addObserver(observer);

    return {
      dispose: () => {
        this.removeObserver(observer);
      }
    };
  }

  addObserver(observer) {
    this.observers.push(observer);

    if (this.observers.length === 1) {
      this.handle = this.adapter.addHandler(this.type);
      this.adapter.addChangeListener(this.handleChange, this);

      this.handleChange();
    }
  }

  removeObserver(observer) {
    this.observers.splice(this.observers.indexOf(observer), 1);

    if (this.observers.length === 0) {
      this.adapter.removeHandler(this.handle);
      this.adapter.removeChangeListener(this.handleChange, this);
    }
  }

  replaceType(newType) {
    if (this.handle) {
      this.adapter.removeHandler(this.handle);
      this.handle = this.adapter.addHandler(newType);
    }

    this.type = newType;
    this.handleChange();
  }

  handleChange() {
    this.observers.forEach(observer => {
      observer.onNext(this.adapter.getState(this.handle));
    });
  }
}