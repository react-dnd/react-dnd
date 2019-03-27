"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var reducers_1 = require("./reducers");
var dragDrop_1 = require("./actions/dragDrop");
var DragDropMonitorImpl_1 = require("./DragDropMonitorImpl");
var HandlerRegistryImpl_1 = require("./HandlerRegistryImpl");
function makeStoreInstance(debugMode) {
    // TODO: if we ever make a react-native version of this,
    // we'll need to consider how to pull off dev-tooling
    var reduxDevTools = typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION__;
    return redux_1.createStore(reducers_1.default, debugMode &&
        reduxDevTools &&
        reduxDevTools({
            name: 'dnd-core',
            instanceId: 'dnd-core',
        }));
}
var DragDropManagerImpl = /** @class */ (function () {
    function DragDropManagerImpl(createBackend, context, debugMode) {
        if (context === void 0) { context = {}; }
        if (debugMode === void 0) { debugMode = false; }
        var _this = this;
        this.context = context;
        this.isSetUp = false;
        this.handleRefCountChange = function () {
            var shouldSetUp = _this.store.getState().refCount > 0;
            if (shouldSetUp && !_this.isSetUp) {
                _this.backend.setup();
                _this.isSetUp = true;
            }
            else if (!shouldSetUp && _this.isSetUp) {
                _this.backend.teardown();
                _this.isSetUp = false;
            }
        };
        var store = makeStoreInstance(debugMode);
        this.store = store;
        this.monitor = new DragDropMonitorImpl_1.default(store, new HandlerRegistryImpl_1.default(store));
        this.backend = createBackend(this);
        store.subscribe(this.handleRefCountChange);
    }
    DragDropManagerImpl.prototype.getContext = function () {
        return this.context;
    };
    DragDropManagerImpl.prototype.getMonitor = function () {
        return this.monitor;
    };
    DragDropManagerImpl.prototype.getBackend = function () {
        return this.backend;
    };
    DragDropManagerImpl.prototype.getRegistry = function () {
        return this.monitor.registry;
    };
    DragDropManagerImpl.prototype.getActions = function () {
        var manager = this;
        var dispatch = this.store.dispatch;
        function bindActionCreator(actionCreator) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var action = actionCreator.apply(manager, args);
                if (typeof action !== 'undefined') {
                    dispatch(action);
                }
            };
        }
        var actions = dragDrop_1.default(this);
        return Object.keys(actions).reduce(function (boundActions, key) {
            var action = actions[key];
            boundActions[key] = bindActionCreator(action);
            return boundActions;
        }, {});
    };
    DragDropManagerImpl.prototype.dispatch = function (action) {
        this.store.dispatch(action);
    };
    return DragDropManagerImpl;
}());
exports.default = DragDropManagerImpl;
