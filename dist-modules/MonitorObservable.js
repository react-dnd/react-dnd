"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var MonitorObservable = (function () {
  function MonitorObservable(type, adapter) {
    _classCallCheck(this, MonitorObservable);

    this.type = type;
    this.adapter = adapter;
    this.observers = [];
  }

  _prototypeProperties(MonitorObservable, null, {
    hasObservers: {
      value: function hasObservers() {
        return this.observers.length > 0;
      },
      writable: true,
      configurable: true
    },
    subscribe: {
      value: function subscribe(observer) {
        var _this = this;
        this.addObserver(observer);

        return {
          dispose: function () {
            _this.removeObserver(observer);
          }
        };
      },
      writable: true,
      configurable: true
    },
    addObserver: {
      value: function addObserver(observer) {
        this.observers.push(observer);

        if (this.observers.length === 1) {
          this.handle = this.adapter.addHandler(this.type);
          this.adapter.addChangeListener(this.handleChange, this);

          this.handleChange();
        }
      },
      writable: true,
      configurable: true
    },
    removeObserver: {
      value: function removeObserver(observer) {
        this.observers.splice(this.observers.indexOf(observer), 1);

        if (this.observers.length === 0) {
          this.adapter.removeHandler(this.handle);
          this.adapter.removeChangeListener(this.handleChange, this);
        }
      },
      writable: true,
      configurable: true
    },
    receiveType: {
      value: function receiveType(newType) {
        if (this.handle && this.type !== newType) {
          this.adapter.removeHandler(this.handle);
          this.handle = this.adapter.addHandler(newType);
        }

        this.type = newType;
        this.handleChange();
      },
      writable: true,
      configurable: true
    },
    handleChange: {
      value: function handleChange() {
        var _this = this;
        this.observers.forEach(function (observer) {
          observer.onNext(_this.adapter.getState(_this.handle));
        });
      },
      writable: true,
      configurable: true
    }
  });

  return MonitorObservable;
})();

module.exports = MonitorObservable;