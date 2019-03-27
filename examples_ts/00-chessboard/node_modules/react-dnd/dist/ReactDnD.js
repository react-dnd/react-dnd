(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactDnD"] = factory(require("react"));
	else
		root["ReactDnD"] = factory(root["React"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../dnd-core/lib/cjs/DragDropManagerImpl.js":
/*!**************************************************!*\
  !*** ../dnd-core/lib/cjs/DragDropManagerImpl.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar redux_1 = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n\nvar reducers_1 = __webpack_require__(/*! ./reducers */ \"../dnd-core/lib/cjs/reducers/index.js\");\n\nvar dragDrop_1 = __webpack_require__(/*! ./actions/dragDrop */ \"../dnd-core/lib/cjs/actions/dragDrop/index.js\");\n\nvar DragDropMonitorImpl_1 = __webpack_require__(/*! ./DragDropMonitorImpl */ \"../dnd-core/lib/cjs/DragDropMonitorImpl.js\");\n\nvar HandlerRegistryImpl_1 = __webpack_require__(/*! ./HandlerRegistryImpl */ \"../dnd-core/lib/cjs/HandlerRegistryImpl.js\");\n\nfunction makeStoreInstance(debugMode) {\n  // TODO: if we ever make a react-native version of this,\n  // we'll need to consider how to pull off dev-tooling\n  var reduxDevTools = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__;\n  return redux_1.createStore(reducers_1.default, debugMode && reduxDevTools && reduxDevTools({\n    name: 'dnd-core',\n    instanceId: 'dnd-core'\n  }));\n}\n\nvar DragDropManagerImpl =\n/** @class */\nfunction () {\n  function DragDropManagerImpl(createBackend, context, debugMode) {\n    if (context === void 0) {\n      context = {};\n    }\n\n    if (debugMode === void 0) {\n      debugMode = false;\n    }\n\n    var _this = this;\n\n    this.context = context;\n    this.isSetUp = false;\n\n    this.handleRefCountChange = function () {\n      var shouldSetUp = _this.store.getState().refCount > 0;\n\n      if (shouldSetUp && !_this.isSetUp) {\n        _this.backend.setup();\n\n        _this.isSetUp = true;\n      } else if (!shouldSetUp && _this.isSetUp) {\n        _this.backend.teardown();\n\n        _this.isSetUp = false;\n      }\n    };\n\n    var store = makeStoreInstance(debugMode);\n    this.store = store;\n    this.monitor = new DragDropMonitorImpl_1.default(store, new HandlerRegistryImpl_1.default(store));\n    this.backend = createBackend(this);\n    store.subscribe(this.handleRefCountChange);\n  }\n\n  DragDropManagerImpl.prototype.getContext = function () {\n    return this.context;\n  };\n\n  DragDropManagerImpl.prototype.getMonitor = function () {\n    return this.monitor;\n  };\n\n  DragDropManagerImpl.prototype.getBackend = function () {\n    return this.backend;\n  };\n\n  DragDropManagerImpl.prototype.getRegistry = function () {\n    return this.monitor.registry;\n  };\n\n  DragDropManagerImpl.prototype.getActions = function () {\n    var manager = this;\n    var dispatch = this.store.dispatch;\n\n    function bindActionCreator(actionCreator) {\n      return function () {\n        var args = [];\n\n        for (var _i = 0; _i < arguments.length; _i++) {\n          args[_i] = arguments[_i];\n        }\n\n        var action = actionCreator.apply(manager, args);\n\n        if (typeof action !== 'undefined') {\n          dispatch(action);\n        }\n      };\n    }\n\n    var actions = dragDrop_1.default(this);\n    return Object.keys(actions).reduce(function (boundActions, key) {\n      var action = actions[key];\n      boundActions[key] = bindActionCreator(action);\n      return boundActions;\n    }, {});\n  };\n\n  DragDropManagerImpl.prototype.dispatch = function (action) {\n    this.store.dispatch(action);\n  };\n\n  return DragDropManagerImpl;\n}();\n\nexports.default = DragDropManagerImpl;\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/DragDropManagerImpl.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/DragDropMonitorImpl.js":
/*!**************************************************!*\
  !*** ../dnd-core/lib/cjs/DragDropMonitorImpl.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar matchesType_1 = __webpack_require__(/*! ./utils/matchesType */ \"../dnd-core/lib/cjs/utils/matchesType.js\");\n\nvar coords_1 = __webpack_require__(/*! ./utils/coords */ \"../dnd-core/lib/cjs/utils/coords.js\");\n\nvar dirtiness_1 = __webpack_require__(/*! ./utils/dirtiness */ \"../dnd-core/lib/cjs/utils/dirtiness.js\");\n\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\n\nvar DragDropMonitorImpl =\n/** @class */\nfunction () {\n  function DragDropMonitorImpl(store, registry) {\n    this.store = store;\n    this.registry = registry;\n  }\n\n  DragDropMonitorImpl.prototype.subscribeToStateChange = function (listener, options) {\n    var _this = this;\n\n    if (options === void 0) {\n      options = {\n        handlerIds: undefined\n      };\n    }\n\n    var handlerIds = options.handlerIds;\n    invariant(typeof listener === 'function', 'listener must be a function.');\n    invariant(typeof handlerIds === 'undefined' || Array.isArray(handlerIds), 'handlerIds, when specified, must be an array of strings.');\n    var prevStateId = this.store.getState().stateId;\n\n    var handleChange = function () {\n      var state = _this.store.getState();\n\n      var currentStateId = state.stateId;\n\n      try {\n        var canSkipListener = currentStateId === prevStateId || currentStateId === prevStateId + 1 && !dirtiness_1.areDirty(state.dirtyHandlerIds, handlerIds);\n\n        if (!canSkipListener) {\n          listener();\n        }\n      } finally {\n        prevStateId = currentStateId;\n      }\n    };\n\n    return this.store.subscribe(handleChange);\n  };\n\n  DragDropMonitorImpl.prototype.subscribeToOffsetChange = function (listener) {\n    var _this = this;\n\n    invariant(typeof listener === 'function', 'listener must be a function.');\n    var previousState = this.store.getState().dragOffset;\n\n    var handleChange = function () {\n      var nextState = _this.store.getState().dragOffset;\n\n      if (nextState === previousState) {\n        return;\n      }\n\n      previousState = nextState;\n      listener();\n    };\n\n    return this.store.subscribe(handleChange);\n  };\n\n  DragDropMonitorImpl.prototype.canDragSource = function (sourceId) {\n    if (!sourceId) {\n      return false;\n    }\n\n    var source = this.registry.getSource(sourceId);\n    invariant(source, 'Expected to find a valid source.');\n\n    if (this.isDragging()) {\n      return false;\n    }\n\n    return source.canDrag(this, sourceId);\n  };\n\n  DragDropMonitorImpl.prototype.canDropOnTarget = function (targetId) {\n    // undefined on initial render\n    if (!targetId) {\n      return false;\n    }\n\n    var target = this.registry.getTarget(targetId);\n    invariant(target, 'Expected to find a valid target.');\n\n    if (!this.isDragging() || this.didDrop()) {\n      return false;\n    }\n\n    var targetType = this.registry.getTargetType(targetId);\n    var draggedItemType = this.getItemType();\n    return matchesType_1.default(targetType, draggedItemType) && target.canDrop(this, targetId);\n  };\n\n  DragDropMonitorImpl.prototype.isDragging = function () {\n    return Boolean(this.getItemType());\n  };\n\n  DragDropMonitorImpl.prototype.isDraggingSource = function (sourceId) {\n    // undefined on initial render\n    if (!sourceId) {\n      return false;\n    }\n\n    var source = this.registry.getSource(sourceId, true);\n    invariant(source, 'Expected to find a valid source.');\n\n    if (!this.isDragging() || !this.isSourcePublic()) {\n      return false;\n    }\n\n    var sourceType = this.registry.getSourceType(sourceId);\n    var draggedItemType = this.getItemType();\n\n    if (sourceType !== draggedItemType) {\n      return false;\n    }\n\n    return source.isDragging(this, sourceId);\n  };\n\n  DragDropMonitorImpl.prototype.isOverTarget = function (targetId, options) {\n    if (options === void 0) {\n      options = {\n        shallow: false\n      };\n    } // undefined on initial render\n\n\n    if (!targetId) {\n      return false;\n    }\n\n    var shallow = options.shallow;\n\n    if (!this.isDragging()) {\n      return false;\n    }\n\n    var targetType = this.registry.getTargetType(targetId);\n    var draggedItemType = this.getItemType();\n\n    if (draggedItemType && !matchesType_1.default(targetType, draggedItemType)) {\n      return false;\n    }\n\n    var targetIds = this.getTargetIds();\n\n    if (!targetIds.length) {\n      return false;\n    }\n\n    var index = targetIds.indexOf(targetId);\n\n    if (shallow) {\n      return index === targetIds.length - 1;\n    } else {\n      return index > -1;\n    }\n  };\n\n  DragDropMonitorImpl.prototype.getItemType = function () {\n    return this.store.getState().dragOperation.itemType;\n  };\n\n  DragDropMonitorImpl.prototype.getItem = function () {\n    return this.store.getState().dragOperation.item;\n  };\n\n  DragDropMonitorImpl.prototype.getSourceId = function () {\n    return this.store.getState().dragOperation.sourceId;\n  };\n\n  DragDropMonitorImpl.prototype.getTargetIds = function () {\n    return this.store.getState().dragOperation.targetIds;\n  };\n\n  DragDropMonitorImpl.prototype.getDropResult = function () {\n    return this.store.getState().dragOperation.dropResult;\n  };\n\n  DragDropMonitorImpl.prototype.didDrop = function () {\n    return this.store.getState().dragOperation.didDrop;\n  };\n\n  DragDropMonitorImpl.prototype.isSourcePublic = function () {\n    return this.store.getState().dragOperation.isSourcePublic;\n  };\n\n  DragDropMonitorImpl.prototype.getInitialClientOffset = function () {\n    return this.store.getState().dragOffset.initialClientOffset;\n  };\n\n  DragDropMonitorImpl.prototype.getInitialSourceClientOffset = function () {\n    return this.store.getState().dragOffset.initialSourceClientOffset;\n  };\n\n  DragDropMonitorImpl.prototype.getClientOffset = function () {\n    return this.store.getState().dragOffset.clientOffset;\n  };\n\n  DragDropMonitorImpl.prototype.getSourceClientOffset = function () {\n    return coords_1.getSourceClientOffset(this.store.getState().dragOffset);\n  };\n\n  DragDropMonitorImpl.prototype.getDifferenceFromInitialOffset = function () {\n    return coords_1.getDifferenceFromInitialOffset(this.store.getState().dragOffset);\n  };\n\n  return DragDropMonitorImpl;\n}();\n\nexports.default = DragDropMonitorImpl;\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/DragDropMonitorImpl.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/HandlerRegistryImpl.js":
/*!**************************************************!*\
  !*** ../dnd-core/lib/cjs/HandlerRegistryImpl.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar registry_1 = __webpack_require__(/*! ./actions/registry */ \"../dnd-core/lib/cjs/actions/registry.js\");\n\nvar getNextUniqueId_1 = __webpack_require__(/*! ./utils/getNextUniqueId */ \"../dnd-core/lib/cjs/utils/getNextUniqueId.js\");\n\nvar interfaces_1 = __webpack_require__(/*! ./interfaces */ \"../dnd-core/lib/cjs/interfaces.js\");\n\nvar contracts_1 = __webpack_require__(/*! ./contracts */ \"../dnd-core/lib/cjs/contracts.js\");\n\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\n\nvar asap = __webpack_require__(/*! asap */ \"./node_modules/asap/browser-asap.js\");\n\nfunction getNextHandlerId(role) {\n  var id = getNextUniqueId_1.default().toString();\n\n  switch (role) {\n    case interfaces_1.HandlerRole.SOURCE:\n      return \"S\" + id;\n\n    case interfaces_1.HandlerRole.TARGET:\n      return \"T\" + id;\n\n    default:\n      throw new Error(\"Unknown Handler Role: \" + role);\n  }\n}\n\nfunction parseRoleFromHandlerId(handlerId) {\n  switch (handlerId[0]) {\n    case 'S':\n      return interfaces_1.HandlerRole.SOURCE;\n\n    case 'T':\n      return interfaces_1.HandlerRole.TARGET;\n\n    default:\n      invariant(false, \"Cannot parse handler ID: \" + handlerId);\n  }\n}\n\nfunction mapContainsValue(map, searchValue) {\n  var entries = map.entries();\n  var isDone = false;\n\n  do {\n    var _a = entries.next(),\n        done = _a.done,\n        _b = _a.value,\n        value = _b[1];\n\n    if (value === searchValue) {\n      return true;\n    }\n\n    isDone = done;\n  } while (!isDone);\n\n  return false;\n}\n\nvar HandlerRegistryImpl =\n/** @class */\nfunction () {\n  function HandlerRegistryImpl(store) {\n    this.store = store;\n    this.types = new Map();\n    this.dragSources = new Map();\n    this.dropTargets = new Map();\n    this.pinnedSourceId = null;\n    this.pinnedSource = null;\n  }\n\n  HandlerRegistryImpl.prototype.addSource = function (type, source) {\n    contracts_1.validateType(type);\n    contracts_1.validateSourceContract(source);\n    var sourceId = this.addHandler(interfaces_1.HandlerRole.SOURCE, type, source);\n    this.store.dispatch(registry_1.addSource(sourceId));\n    return sourceId;\n  };\n\n  HandlerRegistryImpl.prototype.addTarget = function (type, target) {\n    contracts_1.validateType(type, true);\n    contracts_1.validateTargetContract(target);\n    var targetId = this.addHandler(interfaces_1.HandlerRole.TARGET, type, target);\n    this.store.dispatch(registry_1.addTarget(targetId));\n    return targetId;\n  };\n\n  HandlerRegistryImpl.prototype.containsHandler = function (handler) {\n    return mapContainsValue(this.dragSources, handler) || mapContainsValue(this.dropTargets, handler);\n  };\n\n  HandlerRegistryImpl.prototype.getSource = function (sourceId, includePinned) {\n    if (includePinned === void 0) {\n      includePinned = false;\n    }\n\n    invariant(this.isSourceId(sourceId), 'Expected a valid source ID.');\n    var isPinned = includePinned && sourceId === this.pinnedSourceId;\n    var source = isPinned ? this.pinnedSource : this.dragSources.get(sourceId);\n    return source;\n  };\n\n  HandlerRegistryImpl.prototype.getTarget = function (targetId) {\n    invariant(this.isTargetId(targetId), 'Expected a valid target ID.');\n    return this.dropTargets.get(targetId);\n  };\n\n  HandlerRegistryImpl.prototype.getSourceType = function (sourceId) {\n    invariant(this.isSourceId(sourceId), 'Expected a valid source ID.');\n    return this.types.get(sourceId);\n  };\n\n  HandlerRegistryImpl.prototype.getTargetType = function (targetId) {\n    invariant(this.isTargetId(targetId), 'Expected a valid target ID.');\n    return this.types.get(targetId);\n  };\n\n  HandlerRegistryImpl.prototype.isSourceId = function (handlerId) {\n    var role = parseRoleFromHandlerId(handlerId);\n    return role === interfaces_1.HandlerRole.SOURCE;\n  };\n\n  HandlerRegistryImpl.prototype.isTargetId = function (handlerId) {\n    var role = parseRoleFromHandlerId(handlerId);\n    return role === interfaces_1.HandlerRole.TARGET;\n  };\n\n  HandlerRegistryImpl.prototype.removeSource = function (sourceId) {\n    var _this = this;\n\n    invariant(this.getSource(sourceId), 'Expected an existing source.');\n    this.store.dispatch(registry_1.removeSource(sourceId));\n    asap(function () {\n      _this.dragSources.delete(sourceId);\n\n      _this.types.delete(sourceId);\n    });\n  };\n\n  HandlerRegistryImpl.prototype.removeTarget = function (targetId) {\n    invariant(this.getTarget(targetId), 'Expected an existing target.');\n    this.store.dispatch(registry_1.removeTarget(targetId));\n    this.dropTargets.delete(targetId);\n    this.types.delete(targetId);\n  };\n\n  HandlerRegistryImpl.prototype.pinSource = function (sourceId) {\n    var source = this.getSource(sourceId);\n    invariant(source, 'Expected an existing source.');\n    this.pinnedSourceId = sourceId;\n    this.pinnedSource = source;\n  };\n\n  HandlerRegistryImpl.prototype.unpinSource = function () {\n    invariant(this.pinnedSource, 'No source is pinned at the time.');\n    this.pinnedSourceId = null;\n    this.pinnedSource = null;\n  };\n\n  HandlerRegistryImpl.prototype.addHandler = function (role, type, handler) {\n    var id = getNextHandlerId(role);\n    this.types.set(id, type);\n\n    if (role === interfaces_1.HandlerRole.SOURCE) {\n      this.dragSources.set(id, handler);\n    } else if (role === interfaces_1.HandlerRole.TARGET) {\n      this.dropTargets.set(id, handler);\n    }\n\n    return id;\n  };\n\n  return HandlerRegistryImpl;\n}();\n\nexports.default = HandlerRegistryImpl;\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/HandlerRegistryImpl.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/actions/dragDrop/beginDrag.js":
/*!*********************************************************!*\
  !*** ../dnd-core/lib/cjs/actions/dragDrop/beginDrag.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar setClientOffset_1 = __webpack_require__(/*! ./local/setClientOffset */ \"../dnd-core/lib/cjs/actions/dragDrop/local/setClientOffset.js\");\n\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\n\nvar isObject = __webpack_require__(/*! lodash/isObject */ \"./node_modules/lodash/isObject.js\");\n\nvar types_1 = __webpack_require__(/*! ./types */ \"../dnd-core/lib/cjs/actions/dragDrop/types.js\");\n\nvar ResetCoordinatesAction = {\n  type: types_1.INIT_COORDS,\n  payload: {\n    clientOffset: null,\n    sourceClientOffset: null\n  }\n};\n\nfunction createBeginDrag(manager) {\n  return function beginDrag(sourceIds, options) {\n    if (sourceIds === void 0) {\n      sourceIds = [];\n    }\n\n    if (options === void 0) {\n      options = {\n        publishSource: true\n      };\n    }\n\n    var _a = options.publishSource,\n        publishSource = _a === void 0 ? true : _a,\n        clientOffset = options.clientOffset,\n        getSourceClientOffset = options.getSourceClientOffset;\n    var monitor = manager.getMonitor();\n    var registry = manager.getRegistry(); // Initialize the coordinates using the client offset\n\n    manager.dispatch(setClientOffset_1.setClientOffset(clientOffset));\n    verifyInvariants(sourceIds, monitor, registry); // Get the draggable source\n\n    var sourceId = getDraggableSource(sourceIds, monitor);\n\n    if (sourceId === null) {\n      manager.dispatch(ResetCoordinatesAction);\n      return;\n    } // Get the source client offset\n\n\n    var sourceClientOffset = null;\n\n    if (clientOffset) {\n      verifyGetSourceClientOffsetIsFunction(getSourceClientOffset);\n      sourceClientOffset = getSourceClientOffset(sourceId);\n    } // Initialize the full coordinates\n\n\n    manager.dispatch(setClientOffset_1.setClientOffset(clientOffset, sourceClientOffset));\n    var source = registry.getSource(sourceId);\n    var item = source.beginDrag(monitor, sourceId);\n    verifyItemIsObject(item);\n    registry.pinSource(sourceId);\n    var itemType = registry.getSourceType(sourceId);\n    return {\n      type: types_1.BEGIN_DRAG,\n      payload: {\n        itemType: itemType,\n        item: item,\n        sourceId: sourceId,\n        clientOffset: clientOffset || null,\n        sourceClientOffset: sourceClientOffset || null,\n        isSourcePublic: !!publishSource\n      }\n    };\n  };\n}\n\nexports.default = createBeginDrag;\n\nfunction verifyInvariants(sourceIds, monitor, registry) {\n  invariant(!monitor.isDragging(), 'Cannot call beginDrag while dragging.');\n\n  for (var _i = 0, sourceIds_1 = sourceIds; _i < sourceIds_1.length; _i++) {\n    var s = sourceIds_1[_i];\n    invariant(registry.getSource(s), 'Expected sourceIds to be registered.');\n  }\n}\n\nfunction verifyGetSourceClientOffsetIsFunction(getSourceClientOffset) {\n  invariant(typeof getSourceClientOffset === 'function', 'When clientOffset is provided, getSourceClientOffset must be a function.');\n}\n\nfunction verifyItemIsObject(item) {\n  invariant(isObject(item), 'Item must be an object.');\n}\n\nfunction getDraggableSource(sourceIds, monitor) {\n  var sourceId = null;\n\n  for (var i = sourceIds.length - 1; i >= 0; i--) {\n    if (monitor.canDragSource(sourceIds[i])) {\n      sourceId = sourceIds[i];\n      break;\n    }\n  }\n\n  return sourceId;\n}\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/actions/dragDrop/beginDrag.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/actions/dragDrop/drop.js":
/*!****************************************************!*\
  !*** ../dnd-core/lib/cjs/actions/dragDrop/drop.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __assign = this && this.__assign || function () {\n  __assign = Object.assign || function (t) {\n    for (var s, i = 1, n = arguments.length; i < n; i++) {\n      s = arguments[i];\n\n      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];\n    }\n\n    return t;\n  };\n\n  return __assign.apply(this, arguments);\n};\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar types_1 = __webpack_require__(/*! ./types */ \"../dnd-core/lib/cjs/actions/dragDrop/types.js\");\n\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\n\nvar isObject = __webpack_require__(/*! lodash/isObject */ \"./node_modules/lodash/isObject.js\");\n\nfunction createDrop(manager) {\n  return function drop(options) {\n    if (options === void 0) {\n      options = {};\n    }\n\n    var monitor = manager.getMonitor();\n    var registry = manager.getRegistry();\n    verifyInvariants(monitor);\n    var targetIds = getDroppableTargets(monitor); // Multiple actions are dispatched here, which is why this doesn't return an action\n\n    targetIds.forEach(function (targetId, index) {\n      var dropResult = determineDropResult(targetId, index, registry, monitor);\n      var action = {\n        type: types_1.DROP,\n        payload: {\n          dropResult: __assign({}, options, dropResult)\n        }\n      };\n      manager.dispatch(action);\n    });\n  };\n}\n\nexports.default = createDrop;\n\nfunction verifyInvariants(monitor) {\n  invariant(monitor.isDragging(), 'Cannot call drop while not dragging.');\n  invariant(!monitor.didDrop(), 'Cannot call drop twice during one drag operation.');\n}\n\nfunction determineDropResult(targetId, index, registry, monitor) {\n  var target = registry.getTarget(targetId);\n  var dropResult = target.drop(monitor, targetId);\n  verifyDropResultType(dropResult);\n\n  if (typeof dropResult === 'undefined') {\n    dropResult = index === 0 ? {} : monitor.getDropResult();\n  }\n\n  return dropResult;\n}\n\nfunction verifyDropResultType(dropResult) {\n  invariant(typeof dropResult === 'undefined' || isObject(dropResult), 'Drop result must either be an object or undefined.');\n}\n\nfunction getDroppableTargets(monitor) {\n  var targetIds = monitor.getTargetIds().filter(monitor.canDropOnTarget, monitor);\n  targetIds.reverse();\n  return targetIds;\n}\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/actions/dragDrop/drop.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/actions/dragDrop/endDrag.js":
/*!*******************************************************!*\
  !*** ../dnd-core/lib/cjs/actions/dragDrop/endDrag.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar types_1 = __webpack_require__(/*! ./types */ \"../dnd-core/lib/cjs/actions/dragDrop/types.js\");\n\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\n\nfunction createEndDrag(manager) {\n  return function endDrag() {\n    var monitor = manager.getMonitor();\n    var registry = manager.getRegistry();\n    verifyIsDragging(monitor);\n    var sourceId = monitor.getSourceId();\n    var source = registry.getSource(sourceId, true);\n    source.endDrag(monitor, sourceId);\n    registry.unpinSource();\n    return {\n      type: types_1.END_DRAG\n    };\n  };\n}\n\nexports.default = createEndDrag;\n\nfunction verifyIsDragging(monitor) {\n  invariant(monitor.isDragging(), 'Cannot call endDrag while not dragging.');\n}\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/actions/dragDrop/endDrag.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/actions/dragDrop/hover.js":
/*!*****************************************************!*\
  !*** ../dnd-core/lib/cjs/actions/dragDrop/hover.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar matchesType_1 = __webpack_require__(/*! ../../utils/matchesType */ \"../dnd-core/lib/cjs/utils/matchesType.js\");\n\nvar types_1 = __webpack_require__(/*! ./types */ \"../dnd-core/lib/cjs/actions/dragDrop/types.js\");\n\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\n\nfunction createHover(manager) {\n  return function hover(targetIdsArg, _a) {\n    var clientOffset = (_a === void 0 ? {} : _a).clientOffset;\n    verifyTargetIdsIsArray(targetIdsArg);\n    var targetIds = targetIdsArg.slice(0);\n    var monitor = manager.getMonitor();\n    var registry = manager.getRegistry();\n    checkInvariants(targetIds, monitor, registry);\n    var draggedItemType = monitor.getItemType();\n    removeNonMatchingTargetIds(targetIds, registry, draggedItemType);\n    hoverAllTargets(targetIds, monitor, registry);\n    return {\n      type: types_1.HOVER,\n      payload: {\n        targetIds: targetIds,\n        clientOffset: clientOffset || null\n      }\n    };\n  };\n}\n\nexports.default = createHover;\n\nfunction verifyTargetIdsIsArray(targetIdsArg) {\n  invariant(Array.isArray(targetIdsArg), 'Expected targetIds to be an array.');\n}\n\nfunction checkInvariants(targetIds, monitor, registry) {\n  invariant(monitor.isDragging(), 'Cannot call hover while not dragging.');\n  invariant(!monitor.didDrop(), 'Cannot call hover after drop.');\n\n  for (var i = 0; i < targetIds.length; i++) {\n    var targetId = targetIds[i];\n    invariant(targetIds.lastIndexOf(targetId) === i, 'Expected targetIds to be unique in the passed array.');\n    var target = registry.getTarget(targetId);\n    invariant(target, 'Expected targetIds to be registered.');\n  }\n}\n\nfunction removeNonMatchingTargetIds(targetIds, registry, draggedItemType) {\n  // Remove those targetIds that don't match the targetType.  This\n  // fixes shallow isOver which would only be non-shallow because of\n  // non-matching targets.\n  for (var i = targetIds.length - 1; i >= 0; i--) {\n    var targetId = targetIds[i];\n    var targetType = registry.getTargetType(targetId);\n\n    if (!matchesType_1.default(targetType, draggedItemType)) {\n      targetIds.splice(i, 1);\n    }\n  }\n}\n\nfunction hoverAllTargets(targetIds, monitor, registry) {\n  // Finally call hover on all matching targets.\n  for (var _i = 0, targetIds_1 = targetIds; _i < targetIds_1.length; _i++) {\n    var targetId = targetIds_1[_i];\n    var target = registry.getTarget(targetId);\n    target.hover(monitor, targetId);\n  }\n}\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/actions/dragDrop/hover.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/actions/dragDrop/index.js":
/*!*****************************************************!*\
  !*** ../dnd-core/lib/cjs/actions/dragDrop/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction __export(m) {\n  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar beginDrag_1 = __webpack_require__(/*! ./beginDrag */ \"../dnd-core/lib/cjs/actions/dragDrop/beginDrag.js\");\n\nvar publishDragSource_1 = __webpack_require__(/*! ./publishDragSource */ \"../dnd-core/lib/cjs/actions/dragDrop/publishDragSource.js\");\n\nvar hover_1 = __webpack_require__(/*! ./hover */ \"../dnd-core/lib/cjs/actions/dragDrop/hover.js\");\n\nvar drop_1 = __webpack_require__(/*! ./drop */ \"../dnd-core/lib/cjs/actions/dragDrop/drop.js\");\n\nvar endDrag_1 = __webpack_require__(/*! ./endDrag */ \"../dnd-core/lib/cjs/actions/dragDrop/endDrag.js\");\n\n__export(__webpack_require__(/*! ./types */ \"../dnd-core/lib/cjs/actions/dragDrop/types.js\"));\n\nfunction createDragDropActions(manager) {\n  return {\n    beginDrag: beginDrag_1.default(manager),\n    publishDragSource: publishDragSource_1.default(manager),\n    hover: hover_1.default(manager),\n    drop: drop_1.default(manager),\n    endDrag: endDrag_1.default(manager)\n  };\n}\n\nexports.default = createDragDropActions;\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/actions/dragDrop/index.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/actions/dragDrop/local/setClientOffset.js":
/*!*********************************************************************!*\
  !*** ../dnd-core/lib/cjs/actions/dragDrop/local/setClientOffset.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar types_1 = __webpack_require__(/*! ../types */ \"../dnd-core/lib/cjs/actions/dragDrop/types.js\");\n\nfunction setClientOffset(clientOffset, sourceClientOffset) {\n  return {\n    type: types_1.INIT_COORDS,\n    payload: {\n      sourceClientOffset: sourceClientOffset || null,\n      clientOffset: clientOffset || null\n    }\n  };\n}\n\nexports.setClientOffset = setClientOffset;\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/actions/dragDrop/local/setClientOffset.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/actions/dragDrop/publishDragSource.js":
/*!*****************************************************************!*\
  !*** ../dnd-core/lib/cjs/actions/dragDrop/publishDragSource.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar types_1 = __webpack_require__(/*! ./types */ \"../dnd-core/lib/cjs/actions/dragDrop/types.js\");\n\nfunction createPublishDragSource(manager) {\n  return function publishDragSource() {\n    var monitor = manager.getMonitor();\n\n    if (monitor.isDragging()) {\n      return {\n        type: types_1.PUBLISH_DRAG_SOURCE\n      };\n    }\n  };\n}\n\nexports.default = createPublishDragSource;\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/actions/dragDrop/publishDragSource.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/actions/dragDrop/types.js":
/*!*****************************************************!*\
  !*** ../dnd-core/lib/cjs/actions/dragDrop/types.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.INIT_COORDS = 'dnd-core/INIT_COORDS';\nexports.BEGIN_DRAG = 'dnd-core/BEGIN_DRAG';\nexports.PUBLISH_DRAG_SOURCE = 'dnd-core/PUBLISH_DRAG_SOURCE';\nexports.HOVER = 'dnd-core/HOVER';\nexports.DROP = 'dnd-core/DROP';\nexports.END_DRAG = 'dnd-core/END_DRAG';\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/actions/dragDrop/types.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/actions/registry.js":
/*!***********************************************!*\
  !*** ../dnd-core/lib/cjs/actions/registry.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.ADD_SOURCE = 'dnd-core/ADD_SOURCE';\nexports.ADD_TARGET = 'dnd-core/ADD_TARGET';\nexports.REMOVE_SOURCE = 'dnd-core/REMOVE_SOURCE';\nexports.REMOVE_TARGET = 'dnd-core/REMOVE_TARGET';\n\nfunction addSource(sourceId) {\n  return {\n    type: exports.ADD_SOURCE,\n    payload: {\n      sourceId: sourceId\n    }\n  };\n}\n\nexports.addSource = addSource;\n\nfunction addTarget(targetId) {\n  return {\n    type: exports.ADD_TARGET,\n    payload: {\n      targetId: targetId\n    }\n  };\n}\n\nexports.addTarget = addTarget;\n\nfunction removeSource(sourceId) {\n  return {\n    type: exports.REMOVE_SOURCE,\n    payload: {\n      sourceId: sourceId\n    }\n  };\n}\n\nexports.removeSource = removeSource;\n\nfunction removeTarget(targetId) {\n  return {\n    type: exports.REMOVE_TARGET,\n    payload: {\n      targetId: targetId\n    }\n  };\n}\n\nexports.removeTarget = removeTarget;\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/actions/registry.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/contracts.js":
/*!****************************************!*\
  !*** ../dnd-core/lib/cjs/contracts.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\n\nfunction validateSourceContract(source) {\n  invariant(typeof source.canDrag === 'function', 'Expected canDrag to be a function.');\n  invariant(typeof source.beginDrag === 'function', 'Expected beginDrag to be a function.');\n  invariant(typeof source.endDrag === 'function', 'Expected endDrag to be a function.');\n}\n\nexports.validateSourceContract = validateSourceContract;\n\nfunction validateTargetContract(target) {\n  invariant(typeof target.canDrop === 'function', 'Expected canDrop to be a function.');\n  invariant(typeof target.hover === 'function', 'Expected hover to be a function.');\n  invariant(typeof target.drop === 'function', 'Expected beginDrag to be a function.');\n}\n\nexports.validateTargetContract = validateTargetContract;\n\nfunction validateType(type, allowArray) {\n  if (allowArray && Array.isArray(type)) {\n    type.forEach(function (t) {\n      return validateType(t, false);\n    });\n    return;\n  }\n\n  invariant(typeof type === 'string' || typeof type === 'symbol', allowArray ? 'Type can only be a string, a symbol, or an array of either.' : 'Type can only be a string or a symbol.');\n}\n\nexports.validateType = validateType;\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/contracts.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/factories.js":
/*!****************************************!*\
  !*** ../dnd-core/lib/cjs/factories.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar DragDropManagerImpl_1 = __webpack_require__(/*! ./DragDropManagerImpl */ \"../dnd-core/lib/cjs/DragDropManagerImpl.js\");\n\nfunction createDragDropManager(backend, context, debugMode) {\n  return new DragDropManagerImpl_1.default(backend, context, debugMode);\n}\n\nexports.createDragDropManager = createDragDropManager;\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/factories.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/index.js":
/*!************************************!*\
  !*** ../dnd-core/lib/cjs/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction __export(m) {\n  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\n__export(__webpack_require__(/*! ./interfaces */ \"../dnd-core/lib/cjs/interfaces.js\"));\n\n__export(__webpack_require__(/*! ./factories */ \"../dnd-core/lib/cjs/factories.js\"));\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/index.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/interfaces.js":
/*!*****************************************!*\
  !*** ../dnd-core/lib/cjs/interfaces.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar HandlerRole;\n\n(function (HandlerRole) {\n  HandlerRole[\"SOURCE\"] = \"SOURCE\";\n  HandlerRole[\"TARGET\"] = \"TARGET\";\n})(HandlerRole = exports.HandlerRole || (exports.HandlerRole = {}));\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/interfaces.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/reducers/dirtyHandlerIds.js":
/*!*******************************************************!*\
  !*** ../dnd-core/lib/cjs/reducers/dirtyHandlerIds.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar dragDrop_1 = __webpack_require__(/*! ../actions/dragDrop */ \"../dnd-core/lib/cjs/actions/dragDrop/index.js\");\n\nvar registry_1 = __webpack_require__(/*! ../actions/registry */ \"../dnd-core/lib/cjs/actions/registry.js\");\n\nvar equality_1 = __webpack_require__(/*! ../utils/equality */ \"../dnd-core/lib/cjs/utils/equality.js\");\n\nvar dirtiness_1 = __webpack_require__(/*! ../utils/dirtiness */ \"../dnd-core/lib/cjs/utils/dirtiness.js\");\n\nvar xor = __webpack_require__(/*! lodash/xor */ \"./node_modules/lodash/xor.js\");\n\nfunction dirtyHandlerIds(state, action) {\n  if (state === void 0) {\n    state = dirtiness_1.NONE;\n  }\n\n  switch (action.type) {\n    case dragDrop_1.HOVER:\n      break;\n\n    case registry_1.ADD_SOURCE:\n    case registry_1.ADD_TARGET:\n    case registry_1.REMOVE_TARGET:\n    case registry_1.REMOVE_SOURCE:\n      return dirtiness_1.NONE;\n\n    case dragDrop_1.BEGIN_DRAG:\n    case dragDrop_1.PUBLISH_DRAG_SOURCE:\n    case dragDrop_1.END_DRAG:\n    case dragDrop_1.DROP:\n    default:\n      return dirtiness_1.ALL;\n  }\n\n  var _a = action.payload,\n      _b = _a.targetIds,\n      targetIds = _b === void 0 ? [] : _b,\n      _c = _a.prevTargetIds,\n      prevTargetIds = _c === void 0 ? [] : _c;\n  var result = xor(targetIds, prevTargetIds);\n  var didChange = result.length > 0 || !equality_1.areArraysEqual(targetIds, prevTargetIds);\n\n  if (!didChange) {\n    return dirtiness_1.NONE;\n  } // Check the target ids at the innermost position. If they are valid, add them\n  // to the result\n\n\n  var prevInnermostTargetId = prevTargetIds[prevTargetIds.length - 1];\n  var innermostTargetId = targetIds[targetIds.length - 1];\n\n  if (prevInnermostTargetId !== innermostTargetId) {\n    if (prevInnermostTargetId) {\n      result.push(prevInnermostTargetId);\n    }\n\n    if (innermostTargetId) {\n      result.push(innermostTargetId);\n    }\n  }\n\n  return result;\n}\n\nexports.default = dirtyHandlerIds;\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/reducers/dirtyHandlerIds.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/reducers/dragOffset.js":
/*!**************************************************!*\
  !*** ../dnd-core/lib/cjs/reducers/dragOffset.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __assign = this && this.__assign || function () {\n  __assign = Object.assign || function (t) {\n    for (var s, i = 1, n = arguments.length; i < n; i++) {\n      s = arguments[i];\n\n      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];\n    }\n\n    return t;\n  };\n\n  return __assign.apply(this, arguments);\n};\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar dragDrop_1 = __webpack_require__(/*! ../actions/dragDrop */ \"../dnd-core/lib/cjs/actions/dragDrop/index.js\");\n\nvar equality_1 = __webpack_require__(/*! ../utils/equality */ \"../dnd-core/lib/cjs/utils/equality.js\");\n\nvar initialState = {\n  initialSourceClientOffset: null,\n  initialClientOffset: null,\n  clientOffset: null\n};\n\nfunction dragOffset(state, action) {\n  if (state === void 0) {\n    state = initialState;\n  }\n\n  var payload = action.payload;\n\n  switch (action.type) {\n    case dragDrop_1.INIT_COORDS:\n    case dragDrop_1.BEGIN_DRAG:\n      return {\n        initialSourceClientOffset: payload.sourceClientOffset,\n        initialClientOffset: payload.clientOffset,\n        clientOffset: payload.clientOffset\n      };\n\n    case dragDrop_1.HOVER:\n      if (equality_1.areCoordsEqual(state.clientOffset, payload.clientOffset)) {\n        return state;\n      }\n\n      return __assign({}, state, {\n        clientOffset: payload.clientOffset\n      });\n\n    case dragDrop_1.END_DRAG:\n    case dragDrop_1.DROP:\n      return initialState;\n\n    default:\n      return state;\n  }\n}\n\nexports.default = dragOffset;\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/reducers/dragOffset.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/reducers/dragOperation.js":
/*!*****************************************************!*\
  !*** ../dnd-core/lib/cjs/reducers/dragOperation.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __assign = this && this.__assign || function () {\n  __assign = Object.assign || function (t) {\n    for (var s, i = 1, n = arguments.length; i < n; i++) {\n      s = arguments[i];\n\n      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];\n    }\n\n    return t;\n  };\n\n  return __assign.apply(this, arguments);\n};\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar dragDrop_1 = __webpack_require__(/*! ../actions/dragDrop */ \"../dnd-core/lib/cjs/actions/dragDrop/index.js\");\n\nvar registry_1 = __webpack_require__(/*! ../actions/registry */ \"../dnd-core/lib/cjs/actions/registry.js\");\n\nvar without = __webpack_require__(/*! lodash/without */ \"./node_modules/lodash/without.js\");\n\nvar initialState = {\n  itemType: null,\n  item: null,\n  sourceId: null,\n  targetIds: [],\n  dropResult: null,\n  didDrop: false,\n  isSourcePublic: null\n};\n\nfunction dragOperation(state, action) {\n  if (state === void 0) {\n    state = initialState;\n  }\n\n  var payload = action.payload;\n\n  switch (action.type) {\n    case dragDrop_1.BEGIN_DRAG:\n      return __assign({}, state, {\n        itemType: payload.itemType,\n        item: payload.item,\n        sourceId: payload.sourceId,\n        isSourcePublic: payload.isSourcePublic,\n        dropResult: null,\n        didDrop: false\n      });\n\n    case dragDrop_1.PUBLISH_DRAG_SOURCE:\n      return __assign({}, state, {\n        isSourcePublic: true\n      });\n\n    case dragDrop_1.HOVER:\n      return __assign({}, state, {\n        targetIds: payload.targetIds\n      });\n\n    case registry_1.REMOVE_TARGET:\n      if (state.targetIds.indexOf(payload.targetId) === -1) {\n        return state;\n      }\n\n      return __assign({}, state, {\n        targetIds: without(state.targetIds, payload.targetId)\n      });\n\n    case dragDrop_1.DROP:\n      return __assign({}, state, {\n        dropResult: payload.dropResult,\n        didDrop: true,\n        targetIds: []\n      });\n\n    case dragDrop_1.END_DRAG:\n      return __assign({}, state, {\n        itemType: null,\n        item: null,\n        sourceId: null,\n        dropResult: null,\n        didDrop: false,\n        isSourcePublic: null,\n        targetIds: []\n      });\n\n    default:\n      return state;\n  }\n}\n\nexports.default = dragOperation;\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/reducers/dragOperation.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/reducers/index.js":
/*!*********************************************!*\
  !*** ../dnd-core/lib/cjs/reducers/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar __assign = this && this.__assign || function () {\n  __assign = Object.assign || function (t) {\n    for (var s, i = 1, n = arguments.length; i < n; i++) {\n      s = arguments[i];\n\n      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];\n    }\n\n    return t;\n  };\n\n  return __assign.apply(this, arguments);\n};\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar dragOffset_1 = __webpack_require__(/*! ./dragOffset */ \"../dnd-core/lib/cjs/reducers/dragOffset.js\");\n\nvar dragOperation_1 = __webpack_require__(/*! ./dragOperation */ \"../dnd-core/lib/cjs/reducers/dragOperation.js\");\n\nvar refCount_1 = __webpack_require__(/*! ./refCount */ \"../dnd-core/lib/cjs/reducers/refCount.js\");\n\nvar dirtyHandlerIds_1 = __webpack_require__(/*! ./dirtyHandlerIds */ \"../dnd-core/lib/cjs/reducers/dirtyHandlerIds.js\");\n\nvar stateId_1 = __webpack_require__(/*! ./stateId */ \"../dnd-core/lib/cjs/reducers/stateId.js\");\n\nvar get = __webpack_require__(/*! lodash/get */ \"./node_modules/lodash/get.js\");\n\nfunction reduce(state, action) {\n  if (state === void 0) {\n    state = {};\n  }\n\n  return {\n    dirtyHandlerIds: dirtyHandlerIds_1.default(state.dirtyHandlerIds, {\n      type: action.type,\n      payload: __assign({}, action.payload, {\n        prevTargetIds: get(state, 'dragOperation.targetIds', [])\n      })\n    }),\n    dragOffset: dragOffset_1.default(state.dragOffset, action),\n    refCount: refCount_1.default(state.refCount, action),\n    dragOperation: dragOperation_1.default(state.dragOperation, action),\n    stateId: stateId_1.default(state.stateId)\n  };\n}\n\nexports.default = reduce;\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/reducers/index.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/reducers/refCount.js":
/*!************************************************!*\
  !*** ../dnd-core/lib/cjs/reducers/refCount.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar registry_1 = __webpack_require__(/*! ../actions/registry */ \"../dnd-core/lib/cjs/actions/registry.js\");\n\nfunction refCount(state, action) {\n  if (state === void 0) {\n    state = 0;\n  }\n\n  switch (action.type) {\n    case registry_1.ADD_SOURCE:\n    case registry_1.ADD_TARGET:\n      return state + 1;\n\n    case registry_1.REMOVE_SOURCE:\n    case registry_1.REMOVE_TARGET:\n      return state - 1;\n\n    default:\n      return state;\n  }\n}\n\nexports.default = refCount;\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/reducers/refCount.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/reducers/stateId.js":
/*!***********************************************!*\
  !*** ../dnd-core/lib/cjs/reducers/stateId.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nfunction stateId(state) {\n  if (state === void 0) {\n    state = 0;\n  }\n\n  return state + 1;\n}\n\nexports.default = stateId;\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/reducers/stateId.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/utils/coords.js":
/*!*******************************************!*\
  !*** ../dnd-core/lib/cjs/utils/coords.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/**\n * Coordinate addition\n * @param a The first coordinate\n * @param b The second coordinate\n */\n\nfunction add(a, b) {\n  return {\n    x: a.x + b.x,\n    y: a.y + b.y\n  };\n}\n\nexports.add = add;\n/**\n * Coordinate subtraction\n * @param a The first coordinate\n * @param b The second coordinate\n */\n\nfunction subtract(a, b) {\n  return {\n    x: a.x - b.x,\n    y: a.y - b.y\n  };\n}\n\nexports.subtract = subtract;\n/**\n * Returns the cartesian distance of the drag source component's position, based on its position\n * at the time when the current drag operation has started, and the movement difference.\n *\n * Returns null if no item is being dragged.\n *\n * @param state The offset state to compute from\n */\n\nfunction getSourceClientOffset(state) {\n  var clientOffset = state.clientOffset,\n      initialClientOffset = state.initialClientOffset,\n      initialSourceClientOffset = state.initialSourceClientOffset;\n\n  if (!clientOffset || !initialClientOffset || !initialSourceClientOffset) {\n    return null;\n  }\n\n  return subtract(add(clientOffset, initialSourceClientOffset), initialClientOffset);\n}\n\nexports.getSourceClientOffset = getSourceClientOffset;\n/**\n * Determines the x,y offset between the client offset and the initial client offset\n *\n * @param state The offset state to compute from\n */\n\nfunction getDifferenceFromInitialOffset(state) {\n  var clientOffset = state.clientOffset,\n      initialClientOffset = state.initialClientOffset;\n\n  if (!clientOffset || !initialClientOffset) {\n    return null;\n  }\n\n  return subtract(clientOffset, initialClientOffset);\n}\n\nexports.getDifferenceFromInitialOffset = getDifferenceFromInitialOffset;\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/utils/coords.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/utils/dirtiness.js":
/*!**********************************************!*\
  !*** ../dnd-core/lib/cjs/utils/dirtiness.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar intersection = __webpack_require__(/*! lodash/intersection */ \"./node_modules/lodash/intersection.js\");\n\nexports.NONE = [];\nexports.ALL = [];\nexports.NONE.__IS_NONE__ = true;\nexports.ALL.__IS_ALL__ = true;\n/**\n * Determines if the given handler IDs are dirty or not.\n *\n * @param dirtyIds The set of dirty handler ids\n * @param handlerIds The set of handler ids to check\n */\n\nfunction areDirty(dirtyIds, handlerIds) {\n  if (dirtyIds === exports.NONE) {\n    return false;\n  }\n\n  if (dirtyIds === exports.ALL || typeof handlerIds === 'undefined') {\n    return true;\n  }\n\n  var commonIds = intersection(handlerIds, dirtyIds);\n  return commonIds.length > 0;\n}\n\nexports.areDirty = areDirty;\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/utils/dirtiness.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/utils/equality.js":
/*!*********************************************!*\
  !*** ../dnd-core/lib/cjs/utils/equality.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nexports.strictEquality = function (a, b) {\n  return a === b;\n};\n/**\n * Determine if two cartesian coordinate offsets are equal\n * @param offsetA\n * @param offsetB\n */\n\n\nfunction areCoordsEqual(offsetA, offsetB) {\n  if (!offsetA && !offsetB) {\n    return true;\n  } else if (!offsetA || !offsetB) {\n    return false;\n  } else {\n    return offsetA.x === offsetB.x && offsetA.y === offsetB.y;\n  }\n}\n\nexports.areCoordsEqual = areCoordsEqual;\n/**\n * Determines if two arrays of items are equal\n * @param a The first array of items\n * @param b The second array of items\n */\n\nfunction areArraysEqual(a, b, isEqual) {\n  if (isEqual === void 0) {\n    isEqual = exports.strictEquality;\n  }\n\n  if (a.length !== b.length) {\n    return false;\n  }\n\n  for (var i = 0; i < a.length; ++i) {\n    if (!isEqual(a[i], b[i])) {\n      return false;\n    }\n  }\n\n  return true;\n}\n\nexports.areArraysEqual = areArraysEqual;\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/utils/equality.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/utils/getNextUniqueId.js":
/*!****************************************************!*\
  !*** ../dnd-core/lib/cjs/utils/getNextUniqueId.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar nextUniqueId = 0;\n\nfunction getNextUniqueId() {\n  return nextUniqueId++;\n}\n\nexports.default = getNextUniqueId;\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/utils/getNextUniqueId.js?");

/***/ }),

/***/ "../dnd-core/lib/cjs/utils/matchesType.js":
/*!************************************************!*\
  !*** ../dnd-core/lib/cjs/utils/matchesType.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nfunction matchesType(targetType, draggedItemType) {\n  if (draggedItemType === null) {\n    return targetType === null;\n  }\n\n  return Array.isArray(targetType) ? targetType.some(function (t) {\n    return t === draggedItemType;\n  }) : targetType === draggedItemType;\n}\n\nexports.default = matchesType;\n\n//# sourceURL=webpack://ReactDnD/../dnd-core/lib/cjs/utils/matchesType.js?");

/***/ }),

/***/ "./node_modules/asap/browser-asap.js":
/*!*******************************************!*\
  !*** ./node_modules/asap/browser-asap.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// rawAsap provides everything we need except exception management.\nvar rawAsap = __webpack_require__(/*! ./raw */ \"./node_modules/asap/browser-raw.js\");\n// RawTasks are recycled to reduce GC churn.\nvar freeTasks = [];\n// We queue errors to ensure they are thrown in right order (FIFO).\n// Array-as-queue is good enough here, since we are just dealing with exceptions.\nvar pendingErrors = [];\nvar requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);\n\nfunction throwFirstError() {\n    if (pendingErrors.length) {\n        throw pendingErrors.shift();\n    }\n}\n\n/**\n * Calls a task as soon as possible after returning, in its own event, with priority\n * over other events like animation, reflow, and repaint. An error thrown from an\n * event will not interrupt, nor even substantially slow down the processing of\n * other events, but will be rather postponed to a lower priority event.\n * @param {{call}} task A callable object, typically a function that takes no\n * arguments.\n */\nmodule.exports = asap;\nfunction asap(task) {\n    var rawTask;\n    if (freeTasks.length) {\n        rawTask = freeTasks.pop();\n    } else {\n        rawTask = new RawTask();\n    }\n    rawTask.task = task;\n    rawAsap(rawTask);\n}\n\n// We wrap tasks with recyclable task objects.  A task object implements\n// `call`, just like a function.\nfunction RawTask() {\n    this.task = null;\n}\n\n// The sole purpose of wrapping the task is to catch the exception and recycle\n// the task object after its single use.\nRawTask.prototype.call = function () {\n    try {\n        this.task.call();\n    } catch (error) {\n        if (asap.onerror) {\n            // This hook exists purely for testing purposes.\n            // Its name will be periodically randomized to break any code that\n            // depends on its existence.\n            asap.onerror(error);\n        } else {\n            // In a web browser, exceptions are not fatal. However, to avoid\n            // slowing down the queue of pending tasks, we rethrow the error in a\n            // lower priority turn.\n            pendingErrors.push(error);\n            requestErrorThrow();\n        }\n    } finally {\n        this.task = null;\n        freeTasks[freeTasks.length] = this;\n    }\n};\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/asap/browser-asap.js?");

/***/ }),

/***/ "./node_modules/asap/browser-raw.js":
/*!******************************************!*\
  !*** ./node_modules/asap/browser-raw.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global) {\n\n// Use the fastest means possible to execute a task in its own turn, with\n// priority over other events including IO, animation, reflow, and redraw\n// events in browsers.\n//\n// An exception thrown by a task will permanently interrupt the processing of\n// subsequent tasks. The higher level `asap` function ensures that if an\n// exception is thrown by a task, that the task queue will continue flushing as\n// soon as possible, but if you use `rawAsap` directly, you are responsible to\n// either ensure that no exceptions are thrown from your task, or to manually\n// call `rawAsap.requestFlush` if an exception is thrown.\nmodule.exports = rawAsap;\nfunction rawAsap(task) {\n    if (!queue.length) {\n        requestFlush();\n        flushing = true;\n    }\n    // Equivalent to push, but avoids a function call.\n    queue[queue.length] = task;\n}\n\nvar queue = [];\n// Once a flush has been requested, no further calls to `requestFlush` are\n// necessary until the next `flush` completes.\nvar flushing = false;\n// `requestFlush` is an implementation-specific method that attempts to kick\n// off a `flush` event as quickly as possible. `flush` will attempt to exhaust\n// the event queue before yielding to the browser's own event loop.\nvar requestFlush;\n// The position of the next task to execute in the task queue. This is\n// preserved between calls to `flush` so that it can be resumed if\n// a task throws an exception.\nvar index = 0;\n// If a task schedules additional tasks recursively, the task queue can grow\n// unbounded. To prevent memory exhaustion, the task queue will periodically\n// truncate already-completed tasks.\nvar capacity = 1024;\n\n// The flush function processes all tasks that have been scheduled with\n// `rawAsap` unless and until one of those tasks throws an exception.\n// If a task throws an exception, `flush` ensures that its state will remain\n// consistent and will resume where it left off when called again.\n// However, `flush` does not make any arrangements to be called again if an\n// exception is thrown.\nfunction flush() {\n    while (index < queue.length) {\n        var currentIndex = index;\n        // Advance the index before calling the task. This ensures that we will\n        // begin flushing on the next task the task throws an error.\n        index = index + 1;\n        queue[currentIndex].call();\n        // Prevent leaking memory for long chains of recursive calls to `asap`.\n        // If we call `asap` within tasks scheduled by `asap`, the queue will\n        // grow, but to avoid an O(n) walk for every task we execute, we don't\n        // shift tasks off the queue after they have been executed.\n        // Instead, we periodically shift 1024 tasks off the queue.\n        if (index > capacity) {\n            // Manually shift all values starting at the index back to the\n            // beginning of the queue.\n            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {\n                queue[scan] = queue[scan + index];\n            }\n            queue.length -= index;\n            index = 0;\n        }\n    }\n    queue.length = 0;\n    index = 0;\n    flushing = false;\n}\n\n// `requestFlush` is implemented using a strategy based on data collected from\n// every available SauceLabs Selenium web driver worker at time of writing.\n// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593\n\n// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that\n// have WebKitMutationObserver but not un-prefixed MutationObserver.\n// Must use `global` or `self` instead of `window` to work in both frames and web\n// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.\n\n/* globals self */\nvar scope = typeof global !== \"undefined\" ? global : self;\nvar BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;\n\n// MutationObservers are desirable because they have high priority and work\n// reliably everywhere they are implemented.\n// They are implemented in all modern browsers.\n//\n// - Android 4-4.3\n// - Chrome 26-34\n// - Firefox 14-29\n// - Internet Explorer 11\n// - iPad Safari 6-7.1\n// - iPhone Safari 7-7.1\n// - Safari 6-7\nif (typeof BrowserMutationObserver === \"function\") {\n    requestFlush = makeRequestCallFromMutationObserver(flush);\n\n// MessageChannels are desirable because they give direct access to the HTML\n// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera\n// 11-12, and in web workers in many engines.\n// Although message channels yield to any queued rendering and IO tasks, they\n// would be better than imposing the 4ms delay of timers.\n// However, they do not work reliably in Internet Explorer or Safari.\n\n// Internet Explorer 10 is the only browser that has setImmediate but does\n// not have MutationObservers.\n// Although setImmediate yields to the browser's renderer, it would be\n// preferrable to falling back to setTimeout since it does not have\n// the minimum 4ms penalty.\n// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and\n// Desktop to a lesser extent) that renders both setImmediate and\n// MessageChannel useless for the purposes of ASAP.\n// https://github.com/kriskowal/q/issues/396\n\n// Timers are implemented universally.\n// We fall back to timers in workers in most engines, and in foreground\n// contexts in the following browsers.\n// However, note that even this simple case requires nuances to operate in a\n// broad spectrum of browsers.\n//\n// - Firefox 3-13\n// - Internet Explorer 6-9\n// - iPad Safari 4.3\n// - Lynx 2.8.7\n} else {\n    requestFlush = makeRequestCallFromTimer(flush);\n}\n\n// `requestFlush` requests that the high priority event queue be flushed as\n// soon as possible.\n// This is useful to prevent an error thrown in a task from stalling the event\n// queue if the exception handled by Node.js’s\n// `process.on(\"uncaughtException\")` or by a domain.\nrawAsap.requestFlush = requestFlush;\n\n// To request a high priority event, we induce a mutation observer by toggling\n// the text of a text node between \"1\" and \"-1\".\nfunction makeRequestCallFromMutationObserver(callback) {\n    var toggle = 1;\n    var observer = new BrowserMutationObserver(callback);\n    var node = document.createTextNode(\"\");\n    observer.observe(node, {characterData: true});\n    return function requestCall() {\n        toggle = -toggle;\n        node.data = toggle;\n    };\n}\n\n// The message channel technique was discovered by Malte Ubl and was the\n// original foundation for this library.\n// http://www.nonblocking.io/2011/06/windownexttick.html\n\n// Safari 6.0.5 (at least) intermittently fails to create message ports on a\n// page's first load. Thankfully, this version of Safari supports\n// MutationObservers, so we don't need to fall back in that case.\n\n// function makeRequestCallFromMessageChannel(callback) {\n//     var channel = new MessageChannel();\n//     channel.port1.onmessage = callback;\n//     return function requestCall() {\n//         channel.port2.postMessage(0);\n//     };\n// }\n\n// For reasons explained above, we are also unable to use `setImmediate`\n// under any circumstances.\n// Even if we were, there is another bug in Internet Explorer 10.\n// It is not sufficient to assign `setImmediate` to `requestFlush` because\n// `setImmediate` must be called *by name* and therefore must be wrapped in a\n// closure.\n// Never forget.\n\n// function makeRequestCallFromSetImmediate(callback) {\n//     return function requestCall() {\n//         setImmediate(callback);\n//     };\n// }\n\n// Safari 6.0 has a problem where timers will get lost while the user is\n// scrolling. This problem does not impact ASAP because Safari 6.0 supports\n// mutation observers, so that implementation is used instead.\n// However, if we ever elect to use timers in Safari, the prevalent work-around\n// is to add a scroll event listener that calls for a flush.\n\n// `setTimeout` does not call the passed callback if the delay is less than\n// approximately 7 in web workers in Firefox 8 through 18, and sometimes not\n// even then.\n\nfunction makeRequestCallFromTimer(callback) {\n    return function requestCall() {\n        // We dispatch a timeout with a specified delay of 0 for engines that\n        // can reliably accommodate that request. This will usually be snapped\n        // to a 4 milisecond delay, but once we're flushing, there's no delay\n        // between events.\n        var timeoutHandle = setTimeout(handleTimer, 0);\n        // However, since this timer gets frequently dropped in Firefox\n        // workers, we enlist an interval handle that will try to fire\n        // an event 20 times per second until it succeeds.\n        var intervalHandle = setInterval(handleTimer, 50);\n\n        function handleTimer() {\n            // Whichever timer succeeds will cancel both timers and\n            // execute the callback.\n            clearTimeout(timeoutHandle);\n            clearInterval(intervalHandle);\n            callback();\n        }\n    };\n}\n\n// This is for `asap.js` only.\n// Its name will be periodically randomized to break any code that depends on\n// its existence.\nrawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;\n\n// ASAP was originally a nextTick shim included in Q. This was factored out\n// into this ASAP package. It was later adapted to RSVP which made further\n// amendments. These decisions, particularly to marginalize MessageChannel and\n// to capture the MutationObserver implementation in a closure, were integrated\n// back into ASAP proper.\n// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack://ReactDnD/./node_modules/asap/browser-raw.js?");

/***/ }),

/***/ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Copyright 2015, Yahoo! Inc.\n * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.\n */\nvar ReactIs = __webpack_require__(/*! react-is */ \"./node_modules/react-is/index.js\");\nvar REACT_STATICS = {\n    childContextTypes: true,\n    contextType: true,\n    contextTypes: true,\n    defaultProps: true,\n    displayName: true,\n    getDefaultProps: true,\n    getDerivedStateFromError: true,\n    getDerivedStateFromProps: true,\n    mixins: true,\n    propTypes: true,\n    type: true\n};\n\nvar KNOWN_STATICS = {\n    name: true,\n    length: true,\n    prototype: true,\n    caller: true,\n    callee: true,\n    arguments: true,\n    arity: true\n};\n\nvar FORWARD_REF_STATICS = {\n    '$$typeof': true,\n    render: true,\n    defaultProps: true,\n    displayName: true,\n    propTypes: true\n};\n\nvar MEMO_STATICS = {\n    '$$typeof': true,\n    compare: true,\n    defaultProps: true,\n    displayName: true,\n    propTypes: true,\n    type: true\n};\n\nvar TYPE_STATICS = {};\nTYPE_STATICS[ReactIs.ForwardRef] = FORWARD_REF_STATICS;\n\nfunction getStatics(component) {\n    if (ReactIs.isMemo(component)) {\n        return MEMO_STATICS;\n    }\n    return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;\n}\n\nvar defineProperty = Object.defineProperty;\nvar getOwnPropertyNames = Object.getOwnPropertyNames;\nvar getOwnPropertySymbols = Object.getOwnPropertySymbols;\nvar getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;\nvar getPrototypeOf = Object.getPrototypeOf;\nvar objectPrototype = Object.prototype;\n\nfunction hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {\n    if (typeof sourceComponent !== 'string') {\n        // don't hoist over string (html) components\n\n        if (objectPrototype) {\n            var inheritedComponent = getPrototypeOf(sourceComponent);\n            if (inheritedComponent && inheritedComponent !== objectPrototype) {\n                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);\n            }\n        }\n\n        var keys = getOwnPropertyNames(sourceComponent);\n\n        if (getOwnPropertySymbols) {\n            keys = keys.concat(getOwnPropertySymbols(sourceComponent));\n        }\n\n        var targetStatics = getStatics(targetComponent);\n        var sourceStatics = getStatics(sourceComponent);\n\n        for (var i = 0; i < keys.length; ++i) {\n            var key = keys[i];\n            if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {\n                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);\n                try {\n                    // Avoid failures from read-only properties\n                    defineProperty(targetComponent, key, descriptor);\n                } catch (e) {}\n            }\n        }\n\n        return targetComponent;\n    }\n\n    return targetComponent;\n}\n\nmodule.exports = hoistNonReactStatics;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js?");

/***/ }),

/***/ "./node_modules/invariant/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/invariant/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\n/**\n * Use invariant() to assert state which your program assumes to be true.\n *\n * Provide sprintf-style format (only %s is supported) and arguments\n * to provide information about what broke and what you were\n * expecting.\n *\n * The invariant message will be stripped in production, but the invariant\n * will remain to ensure logic does not differ in production.\n */\n\nvar invariant = function(condition, format, a, b, c, d, e, f) {\n  if (false) {}\n\n  if (!condition) {\n    var error;\n    if (format === undefined) {\n      error = new Error(\n        'Minified exception occurred; use the non-minified dev environment ' +\n        'for the full error message and additional helpful warnings.'\n      );\n    } else {\n      var args = [a, b, c, d, e, f];\n      var argIndex = 0;\n      error = new Error(\n        format.replace(/%s/g, function() { return args[argIndex++]; })\n      );\n      error.name = 'Invariant Violation';\n    }\n\n    error.framesToPop = 1; // we don't care about invariant's own frame\n    throw error;\n  }\n};\n\nmodule.exports = invariant;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/invariant/browser.js?");

/***/ }),

/***/ "./node_modules/lodash/_Hash.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_Hash.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var hashClear = __webpack_require__(/*! ./_hashClear */ \"./node_modules/lodash/_hashClear.js\"),\n    hashDelete = __webpack_require__(/*! ./_hashDelete */ \"./node_modules/lodash/_hashDelete.js\"),\n    hashGet = __webpack_require__(/*! ./_hashGet */ \"./node_modules/lodash/_hashGet.js\"),\n    hashHas = __webpack_require__(/*! ./_hashHas */ \"./node_modules/lodash/_hashHas.js\"),\n    hashSet = __webpack_require__(/*! ./_hashSet */ \"./node_modules/lodash/_hashSet.js\");\n\n/**\n * Creates a hash object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction Hash(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `Hash`.\nHash.prototype.clear = hashClear;\nHash.prototype['delete'] = hashDelete;\nHash.prototype.get = hashGet;\nHash.prototype.has = hashHas;\nHash.prototype.set = hashSet;\n\nmodule.exports = Hash;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_Hash.js?");

/***/ }),

/***/ "./node_modules/lodash/_ListCache.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_ListCache.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ \"./node_modules/lodash/_listCacheClear.js\"),\n    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ \"./node_modules/lodash/_listCacheDelete.js\"),\n    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ \"./node_modules/lodash/_listCacheGet.js\"),\n    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ \"./node_modules/lodash/_listCacheHas.js\"),\n    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ \"./node_modules/lodash/_listCacheSet.js\");\n\n/**\n * Creates an list cache object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction ListCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `ListCache`.\nListCache.prototype.clear = listCacheClear;\nListCache.prototype['delete'] = listCacheDelete;\nListCache.prototype.get = listCacheGet;\nListCache.prototype.has = listCacheHas;\nListCache.prototype.set = listCacheSet;\n\nmodule.exports = ListCache;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_ListCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_Map.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Map.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Map = getNative(root, 'Map');\n\nmodule.exports = Map;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_Map.js?");

/***/ }),

/***/ "./node_modules/lodash/_MapCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_MapCache.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ \"./node_modules/lodash/_mapCacheClear.js\"),\n    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ \"./node_modules/lodash/_mapCacheDelete.js\"),\n    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ \"./node_modules/lodash/_mapCacheGet.js\"),\n    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ \"./node_modules/lodash/_mapCacheHas.js\"),\n    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ \"./node_modules/lodash/_mapCacheSet.js\");\n\n/**\n * Creates a map cache object to store key-value pairs.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction MapCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `MapCache`.\nMapCache.prototype.clear = mapCacheClear;\nMapCache.prototype['delete'] = mapCacheDelete;\nMapCache.prototype.get = mapCacheGet;\nMapCache.prototype.has = mapCacheHas;\nMapCache.prototype.set = mapCacheSet;\n\nmodule.exports = MapCache;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_MapCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_Set.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Set.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Set = getNative(root, 'Set');\n\nmodule.exports = Set;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_Set.js?");

/***/ }),

/***/ "./node_modules/lodash/_SetCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_SetCache.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var MapCache = __webpack_require__(/*! ./_MapCache */ \"./node_modules/lodash/_MapCache.js\"),\n    setCacheAdd = __webpack_require__(/*! ./_setCacheAdd */ \"./node_modules/lodash/_setCacheAdd.js\"),\n    setCacheHas = __webpack_require__(/*! ./_setCacheHas */ \"./node_modules/lodash/_setCacheHas.js\");\n\n/**\n *\n * Creates an array cache object to store unique values.\n *\n * @private\n * @constructor\n * @param {Array} [values] The values to cache.\n */\nfunction SetCache(values) {\n  var index = -1,\n      length = values == null ? 0 : values.length;\n\n  this.__data__ = new MapCache;\n  while (++index < length) {\n    this.add(values[index]);\n  }\n}\n\n// Add methods to `SetCache`.\nSetCache.prototype.add = SetCache.prototype.push = setCacheAdd;\nSetCache.prototype.has = setCacheHas;\n\nmodule.exports = SetCache;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_SetCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Built-in value references. */\nvar Symbol = root.Symbol;\n\nmodule.exports = Symbol;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_Symbol.js?");

/***/ }),

/***/ "./node_modules/lodash/_apply.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_apply.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A faster alternative to `Function#apply`, this function invokes `func`\n * with the `this` binding of `thisArg` and the arguments of `args`.\n *\n * @private\n * @param {Function} func The function to invoke.\n * @param {*} thisArg The `this` binding of `func`.\n * @param {Array} args The arguments to invoke `func` with.\n * @returns {*} Returns the result of `func`.\n */\nfunction apply(func, thisArg, args) {\n  switch (args.length) {\n    case 0: return func.call(thisArg);\n    case 1: return func.call(thisArg, args[0]);\n    case 2: return func.call(thisArg, args[0], args[1]);\n    case 3: return func.call(thisArg, args[0], args[1], args[2]);\n  }\n  return func.apply(thisArg, args);\n}\n\nmodule.exports = apply;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_apply.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayFilter.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_arrayFilter.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.filter` for arrays without support for\n * iteratee shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} predicate The function invoked per iteration.\n * @returns {Array} Returns the new filtered array.\n */\nfunction arrayFilter(array, predicate) {\n  var index = -1,\n      length = array == null ? 0 : array.length,\n      resIndex = 0,\n      result = [];\n\n  while (++index < length) {\n    var value = array[index];\n    if (predicate(value, index, array)) {\n      result[resIndex++] = value;\n    }\n  }\n  return result;\n}\n\nmodule.exports = arrayFilter;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_arrayFilter.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayIncludes.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayIncludes.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIndexOf = __webpack_require__(/*! ./_baseIndexOf */ \"./node_modules/lodash/_baseIndexOf.js\");\n\n/**\n * A specialized version of `_.includes` for arrays without support for\n * specifying an index to search from.\n *\n * @private\n * @param {Array} [array] The array to inspect.\n * @param {*} target The value to search for.\n * @returns {boolean} Returns `true` if `target` is found, else `false`.\n */\nfunction arrayIncludes(array, value) {\n  var length = array == null ? 0 : array.length;\n  return !!length && baseIndexOf(array, value, 0) > -1;\n}\n\nmodule.exports = arrayIncludes;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_arrayIncludes.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayIncludesWith.js":
/*!***************************************************!*\
  !*** ./node_modules/lodash/_arrayIncludesWith.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This function is like `arrayIncludes` except that it accepts a comparator.\n *\n * @private\n * @param {Array} [array] The array to inspect.\n * @param {*} target The value to search for.\n * @param {Function} comparator The comparator invoked per element.\n * @returns {boolean} Returns `true` if `target` is found, else `false`.\n */\nfunction arrayIncludesWith(array, value, comparator) {\n  var index = -1,\n      length = array == null ? 0 : array.length;\n\n  while (++index < length) {\n    if (comparator(value, array[index])) {\n      return true;\n    }\n  }\n  return false;\n}\n\nmodule.exports = arrayIncludesWith;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_arrayIncludesWith.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayMap.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_arrayMap.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.map` for arrays without support for iteratee\n * shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns the new mapped array.\n */\nfunction arrayMap(array, iteratee) {\n  var index = -1,\n      length = array == null ? 0 : array.length,\n      result = Array(length);\n\n  while (++index < length) {\n    result[index] = iteratee(array[index], index, array);\n  }\n  return result;\n}\n\nmodule.exports = arrayMap;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_arrayMap.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayPush.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayPush.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Appends the elements of `values` to `array`.\n *\n * @private\n * @param {Array} array The array to modify.\n * @param {Array} values The values to append.\n * @returns {Array} Returns `array`.\n */\nfunction arrayPush(array, values) {\n  var index = -1,\n      length = values.length,\n      offset = array.length;\n\n  while (++index < length) {\n    array[offset + index] = values[index];\n  }\n  return array;\n}\n\nmodule.exports = arrayPush;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_arrayPush.js?");

/***/ }),

/***/ "./node_modules/lodash/_assocIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_assocIndexOf.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\");\n\n/**\n * Gets the index at which the `key` is found in `array` of key-value pairs.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {*} key The key to search for.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction assocIndexOf(array, key) {\n  var length = array.length;\n  while (length--) {\n    if (eq(array[length][0], key)) {\n      return length;\n    }\n  }\n  return -1;\n}\n\nmodule.exports = assocIndexOf;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_assocIndexOf.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseDifference.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_baseDifference.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var SetCache = __webpack_require__(/*! ./_SetCache */ \"./node_modules/lodash/_SetCache.js\"),\n    arrayIncludes = __webpack_require__(/*! ./_arrayIncludes */ \"./node_modules/lodash/_arrayIncludes.js\"),\n    arrayIncludesWith = __webpack_require__(/*! ./_arrayIncludesWith */ \"./node_modules/lodash/_arrayIncludesWith.js\"),\n    arrayMap = __webpack_require__(/*! ./_arrayMap */ \"./node_modules/lodash/_arrayMap.js\"),\n    baseUnary = __webpack_require__(/*! ./_baseUnary */ \"./node_modules/lodash/_baseUnary.js\"),\n    cacheHas = __webpack_require__(/*! ./_cacheHas */ \"./node_modules/lodash/_cacheHas.js\");\n\n/** Used as the size to enable large array optimizations. */\nvar LARGE_ARRAY_SIZE = 200;\n\n/**\n * The base implementation of methods like `_.difference` without support\n * for excluding multiple arrays or iteratee shorthands.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {Array} values The values to exclude.\n * @param {Function} [iteratee] The iteratee invoked per element.\n * @param {Function} [comparator] The comparator invoked per element.\n * @returns {Array} Returns the new array of filtered values.\n */\nfunction baseDifference(array, values, iteratee, comparator) {\n  var index = -1,\n      includes = arrayIncludes,\n      isCommon = true,\n      length = array.length,\n      result = [],\n      valuesLength = values.length;\n\n  if (!length) {\n    return result;\n  }\n  if (iteratee) {\n    values = arrayMap(values, baseUnary(iteratee));\n  }\n  if (comparator) {\n    includes = arrayIncludesWith;\n    isCommon = false;\n  }\n  else if (values.length >= LARGE_ARRAY_SIZE) {\n    includes = cacheHas;\n    isCommon = false;\n    values = new SetCache(values);\n  }\n  outer:\n  while (++index < length) {\n    var value = array[index],\n        computed = iteratee == null ? value : iteratee(value);\n\n    value = (comparator || value !== 0) ? value : 0;\n    if (isCommon && computed === computed) {\n      var valuesIndex = valuesLength;\n      while (valuesIndex--) {\n        if (values[valuesIndex] === computed) {\n          continue outer;\n        }\n      }\n      result.push(value);\n    }\n    else if (!includes(values, computed, comparator)) {\n      result.push(value);\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseDifference;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_baseDifference.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseFindIndex.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_baseFindIndex.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.findIndex` and `_.findLastIndex` without\n * support for iteratee shorthands.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {Function} predicate The function invoked per iteration.\n * @param {number} fromIndex The index to search from.\n * @param {boolean} [fromRight] Specify iterating from right to left.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction baseFindIndex(array, predicate, fromIndex, fromRight) {\n  var length = array.length,\n      index = fromIndex + (fromRight ? 1 : -1);\n\n  while ((fromRight ? index-- : ++index < length)) {\n    if (predicate(array[index], index, array)) {\n      return index;\n    }\n  }\n  return -1;\n}\n\nmodule.exports = baseFindIndex;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_baseFindIndex.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseFlatten.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseFlatten.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayPush = __webpack_require__(/*! ./_arrayPush */ \"./node_modules/lodash/_arrayPush.js\"),\n    isFlattenable = __webpack_require__(/*! ./_isFlattenable */ \"./node_modules/lodash/_isFlattenable.js\");\n\n/**\n * The base implementation of `_.flatten` with support for restricting flattening.\n *\n * @private\n * @param {Array} array The array to flatten.\n * @param {number} depth The maximum recursion depth.\n * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.\n * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.\n * @param {Array} [result=[]] The initial result value.\n * @returns {Array} Returns the new flattened array.\n */\nfunction baseFlatten(array, depth, predicate, isStrict, result) {\n  var index = -1,\n      length = array.length;\n\n  predicate || (predicate = isFlattenable);\n  result || (result = []);\n\n  while (++index < length) {\n    var value = array[index];\n    if (depth > 0 && predicate(value)) {\n      if (depth > 1) {\n        // Recursively flatten arrays (susceptible to call stack limits).\n        baseFlatten(value, depth - 1, predicate, isStrict, result);\n      } else {\n        arrayPush(result, value);\n      }\n    } else if (!isStrict) {\n      result[result.length] = value;\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseFlatten;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_baseFlatten.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var castPath = __webpack_require__(/*! ./_castPath */ \"./node_modules/lodash/_castPath.js\"),\n    toKey = __webpack_require__(/*! ./_toKey */ \"./node_modules/lodash/_toKey.js\");\n\n/**\n * The base implementation of `_.get` without support for default values.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {Array|string} path The path of the property to get.\n * @returns {*} Returns the resolved value.\n */\nfunction baseGet(object, path) {\n  path = castPath(path, object);\n\n  var index = 0,\n      length = path.length;\n\n  while (object != null && index < length) {\n    object = object[toKey(path[index++])];\n  }\n  return (index && index == length) ? object : undefined;\n}\n\nmodule.exports = baseGet;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_baseGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    getRawTag = __webpack_require__(/*! ./_getRawTag */ \"./node_modules/lodash/_getRawTag.js\"),\n    objectToString = __webpack_require__(/*! ./_objectToString */ \"./node_modules/lodash/_objectToString.js\");\n\n/** `Object#toString` result references. */\nvar nullTag = '[object Null]',\n    undefinedTag = '[object Undefined]';\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * The base implementation of `getTag` without fallbacks for buggy environments.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nfunction baseGetTag(value) {\n  if (value == null) {\n    return value === undefined ? undefinedTag : nullTag;\n  }\n  return (symToStringTag && symToStringTag in Object(value))\n    ? getRawTag(value)\n    : objectToString(value);\n}\n\nmodule.exports = baseGetTag;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_baseGetTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIndexOf.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIndexOf.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseFindIndex = __webpack_require__(/*! ./_baseFindIndex */ \"./node_modules/lodash/_baseFindIndex.js\"),\n    baseIsNaN = __webpack_require__(/*! ./_baseIsNaN */ \"./node_modules/lodash/_baseIsNaN.js\"),\n    strictIndexOf = __webpack_require__(/*! ./_strictIndexOf */ \"./node_modules/lodash/_strictIndexOf.js\");\n\n/**\n * The base implementation of `_.indexOf` without `fromIndex` bounds checks.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {*} value The value to search for.\n * @param {number} fromIndex The index to search from.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction baseIndexOf(array, value, fromIndex) {\n  return value === value\n    ? strictIndexOf(array, value, fromIndex)\n    : baseFindIndex(array, baseIsNaN, fromIndex);\n}\n\nmodule.exports = baseIndexOf;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_baseIndexOf.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIntersection.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIntersection.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var SetCache = __webpack_require__(/*! ./_SetCache */ \"./node_modules/lodash/_SetCache.js\"),\n    arrayIncludes = __webpack_require__(/*! ./_arrayIncludes */ \"./node_modules/lodash/_arrayIncludes.js\"),\n    arrayIncludesWith = __webpack_require__(/*! ./_arrayIncludesWith */ \"./node_modules/lodash/_arrayIncludesWith.js\"),\n    arrayMap = __webpack_require__(/*! ./_arrayMap */ \"./node_modules/lodash/_arrayMap.js\"),\n    baseUnary = __webpack_require__(/*! ./_baseUnary */ \"./node_modules/lodash/_baseUnary.js\"),\n    cacheHas = __webpack_require__(/*! ./_cacheHas */ \"./node_modules/lodash/_cacheHas.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeMin = Math.min;\n\n/**\n * The base implementation of methods like `_.intersection`, without support\n * for iteratee shorthands, that accepts an array of arrays to inspect.\n *\n * @private\n * @param {Array} arrays The arrays to inspect.\n * @param {Function} [iteratee] The iteratee invoked per element.\n * @param {Function} [comparator] The comparator invoked per element.\n * @returns {Array} Returns the new array of shared values.\n */\nfunction baseIntersection(arrays, iteratee, comparator) {\n  var includes = comparator ? arrayIncludesWith : arrayIncludes,\n      length = arrays[0].length,\n      othLength = arrays.length,\n      othIndex = othLength,\n      caches = Array(othLength),\n      maxLength = Infinity,\n      result = [];\n\n  while (othIndex--) {\n    var array = arrays[othIndex];\n    if (othIndex && iteratee) {\n      array = arrayMap(array, baseUnary(iteratee));\n    }\n    maxLength = nativeMin(array.length, maxLength);\n    caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))\n      ? new SetCache(othIndex && array)\n      : undefined;\n  }\n  array = arrays[0];\n\n  var index = -1,\n      seen = caches[0];\n\n  outer:\n  while (++index < length && result.length < maxLength) {\n    var value = array[index],\n        computed = iteratee ? iteratee(value) : value;\n\n    value = (comparator || value !== 0) ? value : 0;\n    if (!(seen\n          ? cacheHas(seen, computed)\n          : includes(result, computed, comparator)\n        )) {\n      othIndex = othLength;\n      while (--othIndex) {\n        var cache = caches[othIndex];\n        if (!(cache\n              ? cacheHas(cache, computed)\n              : includes(arrays[othIndex], computed, comparator))\n            ) {\n          continue outer;\n        }\n      }\n      if (seen) {\n        seen.push(computed);\n      }\n      result.push(value);\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseIntersection;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_baseIntersection.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]';\n\n/**\n * The base implementation of `_.isArguments`.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an `arguments` object,\n */\nfunction baseIsArguments(value) {\n  return isObjectLike(value) && baseGetTag(value) == argsTag;\n}\n\nmodule.exports = baseIsArguments;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_baseIsArguments.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsNaN.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsNaN.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.isNaN` without support for number objects.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.\n */\nfunction baseIsNaN(value) {\n  return value !== value;\n}\n\nmodule.exports = baseIsNaN;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_baseIsNaN.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isFunction = __webpack_require__(/*! ./isFunction */ \"./node_modules/lodash/isFunction.js\"),\n    isMasked = __webpack_require__(/*! ./_isMasked */ \"./node_modules/lodash/_isMasked.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    toSource = __webpack_require__(/*! ./_toSource */ \"./node_modules/lodash/_toSource.js\");\n\n/**\n * Used to match `RegExp`\n * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).\n */\nvar reRegExpChar = /[\\\\^$.*+?()[\\]{}|]/g;\n\n/** Used to detect host constructors (Safari). */\nvar reIsHostCtor = /^\\[object .+?Constructor\\]$/;\n\n/** Used for built-in method references. */\nvar funcProto = Function.prototype,\n    objectProto = Object.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Used to detect if a method is native. */\nvar reIsNative = RegExp('^' +\n  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\\\$&')\n  .replace(/hasOwnProperty|(function).*?(?=\\\\\\()| for .+?(?=\\\\\\])/g, '$1.*?') + '$'\n);\n\n/**\n * The base implementation of `_.isNative` without bad shim checks.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a native function,\n *  else `false`.\n */\nfunction baseIsNative(value) {\n  if (!isObject(value) || isMasked(value)) {\n    return false;\n  }\n  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;\n  return pattern.test(toSource(value));\n}\n\nmodule.exports = baseIsNative;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_baseIsNative.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var identity = __webpack_require__(/*! ./identity */ \"./node_modules/lodash/identity.js\"),\n    overRest = __webpack_require__(/*! ./_overRest */ \"./node_modules/lodash/_overRest.js\"),\n    setToString = __webpack_require__(/*! ./_setToString */ \"./node_modules/lodash/_setToString.js\");\n\n/**\n * The base implementation of `_.rest` which doesn't validate or coerce arguments.\n *\n * @private\n * @param {Function} func The function to apply a rest parameter to.\n * @param {number} [start=func.length-1] The start position of the rest parameter.\n * @returns {Function} Returns the new function.\n */\nfunction baseRest(func, start) {\n  return setToString(overRest(func, start, identity), func + '');\n}\n\nmodule.exports = baseRest;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_baseRest.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseSetToString.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseSetToString.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var constant = __webpack_require__(/*! ./constant */ \"./node_modules/lodash/constant.js\"),\n    defineProperty = __webpack_require__(/*! ./_defineProperty */ \"./node_modules/lodash/_defineProperty.js\"),\n    identity = __webpack_require__(/*! ./identity */ \"./node_modules/lodash/identity.js\");\n\n/**\n * The base implementation of `setToString` without support for hot loop shorting.\n *\n * @private\n * @param {Function} func The function to modify.\n * @param {Function} string The `toString` result.\n * @returns {Function} Returns `func`.\n */\nvar baseSetToString = !defineProperty ? identity : function(func, string) {\n  return defineProperty(func, 'toString', {\n    'configurable': true,\n    'enumerable': false,\n    'value': constant(string),\n    'writable': true\n  });\n};\n\nmodule.exports = baseSetToString;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_baseSetToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseToString.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseToString.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    arrayMap = __webpack_require__(/*! ./_arrayMap */ \"./node_modules/lodash/_arrayMap.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used as references for various `Number` constants. */\nvar INFINITY = 1 / 0;\n\n/** Used to convert symbols to primitives and strings. */\nvar symbolProto = Symbol ? Symbol.prototype : undefined,\n    symbolToString = symbolProto ? symbolProto.toString : undefined;\n\n/**\n * The base implementation of `_.toString` which doesn't convert nullish\n * values to empty strings.\n *\n * @private\n * @param {*} value The value to process.\n * @returns {string} Returns the string.\n */\nfunction baseToString(value) {\n  // Exit early for strings to avoid a performance hit in some environments.\n  if (typeof value == 'string') {\n    return value;\n  }\n  if (isArray(value)) {\n    // Recursively convert values (susceptible to call stack limits).\n    return arrayMap(value, baseToString) + '';\n  }\n  if (isSymbol(value)) {\n    return symbolToString ? symbolToString.call(value) : '';\n  }\n  var result = (value + '');\n  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;\n}\n\nmodule.exports = baseToString;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_baseToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.unary` without support for storing metadata.\n *\n * @private\n * @param {Function} func The function to cap arguments for.\n * @returns {Function} Returns the new capped function.\n */\nfunction baseUnary(func) {\n  return function(value) {\n    return func(value);\n  };\n}\n\nmodule.exports = baseUnary;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_baseUnary.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseUniq.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseUniq.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var SetCache = __webpack_require__(/*! ./_SetCache */ \"./node_modules/lodash/_SetCache.js\"),\n    arrayIncludes = __webpack_require__(/*! ./_arrayIncludes */ \"./node_modules/lodash/_arrayIncludes.js\"),\n    arrayIncludesWith = __webpack_require__(/*! ./_arrayIncludesWith */ \"./node_modules/lodash/_arrayIncludesWith.js\"),\n    cacheHas = __webpack_require__(/*! ./_cacheHas */ \"./node_modules/lodash/_cacheHas.js\"),\n    createSet = __webpack_require__(/*! ./_createSet */ \"./node_modules/lodash/_createSet.js\"),\n    setToArray = __webpack_require__(/*! ./_setToArray */ \"./node_modules/lodash/_setToArray.js\");\n\n/** Used as the size to enable large array optimizations. */\nvar LARGE_ARRAY_SIZE = 200;\n\n/**\n * The base implementation of `_.uniqBy` without support for iteratee shorthands.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {Function} [iteratee] The iteratee invoked per element.\n * @param {Function} [comparator] The comparator invoked per element.\n * @returns {Array} Returns the new duplicate free array.\n */\nfunction baseUniq(array, iteratee, comparator) {\n  var index = -1,\n      includes = arrayIncludes,\n      length = array.length,\n      isCommon = true,\n      result = [],\n      seen = result;\n\n  if (comparator) {\n    isCommon = false;\n    includes = arrayIncludesWith;\n  }\n  else if (length >= LARGE_ARRAY_SIZE) {\n    var set = iteratee ? null : createSet(array);\n    if (set) {\n      return setToArray(set);\n    }\n    isCommon = false;\n    includes = cacheHas;\n    seen = new SetCache;\n  }\n  else {\n    seen = iteratee ? [] : result;\n  }\n  outer:\n  while (++index < length) {\n    var value = array[index],\n        computed = iteratee ? iteratee(value) : value;\n\n    value = (comparator || value !== 0) ? value : 0;\n    if (isCommon && computed === computed) {\n      var seenIndex = seen.length;\n      while (seenIndex--) {\n        if (seen[seenIndex] === computed) {\n          continue outer;\n        }\n      }\n      if (iteratee) {\n        seen.push(computed);\n      }\n      result.push(value);\n    }\n    else if (!includes(seen, computed, comparator)) {\n      if (seen !== result) {\n        seen.push(computed);\n      }\n      result.push(value);\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseUniq;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_baseUniq.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseXor.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseXor.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseDifference = __webpack_require__(/*! ./_baseDifference */ \"./node_modules/lodash/_baseDifference.js\"),\n    baseFlatten = __webpack_require__(/*! ./_baseFlatten */ \"./node_modules/lodash/_baseFlatten.js\"),\n    baseUniq = __webpack_require__(/*! ./_baseUniq */ \"./node_modules/lodash/_baseUniq.js\");\n\n/**\n * The base implementation of methods like `_.xor`, without support for\n * iteratee shorthands, that accepts an array of arrays to inspect.\n *\n * @private\n * @param {Array} arrays The arrays to inspect.\n * @param {Function} [iteratee] The iteratee invoked per element.\n * @param {Function} [comparator] The comparator invoked per element.\n * @returns {Array} Returns the new array of values.\n */\nfunction baseXor(arrays, iteratee, comparator) {\n  var length = arrays.length;\n  if (length < 2) {\n    return length ? baseUniq(arrays[0]) : [];\n  }\n  var index = -1,\n      result = Array(length);\n\n  while (++index < length) {\n    var array = arrays[index],\n        othIndex = -1;\n\n    while (++othIndex < length) {\n      if (othIndex != index) {\n        result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);\n      }\n    }\n  }\n  return baseUniq(baseFlatten(result, 1), iteratee, comparator);\n}\n\nmodule.exports = baseXor;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_baseXor.js?");

/***/ }),

/***/ "./node_modules/lodash/_cacheHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_cacheHas.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if a `cache` value for `key` exists.\n *\n * @private\n * @param {Object} cache The cache to query.\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction cacheHas(cache, key) {\n  return cache.has(key);\n}\n\nmodule.exports = cacheHas;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_cacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_castArrayLikeObject.js":
/*!*****************************************************!*\
  !*** ./node_modules/lodash/_castArrayLikeObject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isArrayLikeObject = __webpack_require__(/*! ./isArrayLikeObject */ \"./node_modules/lodash/isArrayLikeObject.js\");\n\n/**\n * Casts `value` to an empty array if it's not an array like object.\n *\n * @private\n * @param {*} value The value to inspect.\n * @returns {Array|Object} Returns the cast array-like object.\n */\nfunction castArrayLikeObject(value) {\n  return isArrayLikeObject(value) ? value : [];\n}\n\nmodule.exports = castArrayLikeObject;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_castArrayLikeObject.js?");

/***/ }),

/***/ "./node_modules/lodash/_castPath.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_castPath.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isKey = __webpack_require__(/*! ./_isKey */ \"./node_modules/lodash/_isKey.js\"),\n    stringToPath = __webpack_require__(/*! ./_stringToPath */ \"./node_modules/lodash/_stringToPath.js\"),\n    toString = __webpack_require__(/*! ./toString */ \"./node_modules/lodash/toString.js\");\n\n/**\n * Casts `value` to a path array if it's not one.\n *\n * @private\n * @param {*} value The value to inspect.\n * @param {Object} [object] The object to query keys on.\n * @returns {Array} Returns the cast property path array.\n */\nfunction castPath(value, object) {\n  if (isArray(value)) {\n    return value;\n  }\n  return isKey(value, object) ? [value] : stringToPath(toString(value));\n}\n\nmodule.exports = castPath;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_castPath.js?");

/***/ }),

/***/ "./node_modules/lodash/_coreJsData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Used to detect overreaching core-js shims. */\nvar coreJsData = root['__core-js_shared__'];\n\nmodule.exports = coreJsData;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_coreJsData.js?");

/***/ }),

/***/ "./node_modules/lodash/_createSet.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_createSet.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Set = __webpack_require__(/*! ./_Set */ \"./node_modules/lodash/_Set.js\"),\n    noop = __webpack_require__(/*! ./noop */ \"./node_modules/lodash/noop.js\"),\n    setToArray = __webpack_require__(/*! ./_setToArray */ \"./node_modules/lodash/_setToArray.js\");\n\n/** Used as references for various `Number` constants. */\nvar INFINITY = 1 / 0;\n\n/**\n * Creates a set object of `values`.\n *\n * @private\n * @param {Array} values The values to add to the set.\n * @returns {Object} Returns the new set.\n */\nvar createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {\n  return new Set(values);\n};\n\nmodule.exports = createSet;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_createSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_defineProperty.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_defineProperty.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\");\n\nvar defineProperty = (function() {\n  try {\n    var func = getNative(Object, 'defineProperty');\n    func({}, '', {});\n    return func;\n  } catch (e) {}\n}());\n\nmodule.exports = defineProperty;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_defineProperty.js?");

/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */\nvar freeGlobal = typeof global == 'object' && global && global.Object === Object && global;\n\nmodule.exports = freeGlobal;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_freeGlobal.js?");

/***/ }),

/***/ "./node_modules/lodash/_getMapData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getMapData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isKeyable = __webpack_require__(/*! ./_isKeyable */ \"./node_modules/lodash/_isKeyable.js\");\n\n/**\n * Gets the data for `map`.\n *\n * @private\n * @param {Object} map The map to query.\n * @param {string} key The reference key.\n * @returns {*} Returns the map data.\n */\nfunction getMapData(map, key) {\n  var data = map.__data__;\n  return isKeyable(key)\n    ? data[typeof key == 'string' ? 'string' : 'hash']\n    : data.map;\n}\n\nmodule.exports = getMapData;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_getMapData.js?");

/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ \"./node_modules/lodash/_baseIsNative.js\"),\n    getValue = __webpack_require__(/*! ./_getValue */ \"./node_modules/lodash/_getValue.js\");\n\n/**\n * Gets the native function at `key` of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {string} key The key of the method to get.\n * @returns {*} Returns the function if it's native, else `undefined`.\n */\nfunction getNative(object, key) {\n  var value = getValue(object, key);\n  return baseIsNative(value) ? value : undefined;\n}\n\nmodule.exports = getNative;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_getNative.js?");

/***/ }),

/***/ "./node_modules/lodash/_getPrototype.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getPrototype.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var overArg = __webpack_require__(/*! ./_overArg */ \"./node_modules/lodash/_overArg.js\");\n\n/** Built-in value references. */\nvar getPrototype = overArg(Object.getPrototypeOf, Object);\n\nmodule.exports = getPrototype;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_getPrototype.js?");

/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the raw `toStringTag`.\n */\nfunction getRawTag(value) {\n  var isOwn = hasOwnProperty.call(value, symToStringTag),\n      tag = value[symToStringTag];\n\n  try {\n    value[symToStringTag] = undefined;\n    var unmasked = true;\n  } catch (e) {}\n\n  var result = nativeObjectToString.call(value);\n  if (unmasked) {\n    if (isOwn) {\n      value[symToStringTag] = tag;\n    } else {\n      delete value[symToStringTag];\n    }\n  }\n  return result;\n}\n\nmodule.exports = getRawTag;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_getRawTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_getValue.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the value at `key` of `object`.\n *\n * @private\n * @param {Object} [object] The object to query.\n * @param {string} key The key of the property to get.\n * @returns {*} Returns the property value.\n */\nfunction getValue(object, key) {\n  return object == null ? undefined : object[key];\n}\n\nmodule.exports = getValue;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_getValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashClear.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_hashClear.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/**\n * Removes all key-value entries from the hash.\n *\n * @private\n * @name clear\n * @memberOf Hash\n */\nfunction hashClear() {\n  this.__data__ = nativeCreate ? nativeCreate(null) : {};\n  this.size = 0;\n}\n\nmodule.exports = hashClear;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_hashClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashDelete.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_hashDelete.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes `key` and its value from the hash.\n *\n * @private\n * @name delete\n * @memberOf Hash\n * @param {Object} hash The hash to modify.\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction hashDelete(key) {\n  var result = this.has(key) && delete this.__data__[key];\n  this.size -= result ? 1 : 0;\n  return result;\n}\n\nmodule.exports = hashDelete;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_hashDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Gets the hash value for `key`.\n *\n * @private\n * @name get\n * @memberOf Hash\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction hashGet(key) {\n  var data = this.__data__;\n  if (nativeCreate) {\n    var result = data[key];\n    return result === HASH_UNDEFINED ? undefined : result;\n  }\n  return hasOwnProperty.call(data, key) ? data[key] : undefined;\n}\n\nmodule.exports = hashGet;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_hashGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashHas.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Checks if a hash value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf Hash\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction hashHas(key) {\n  var data = this.__data__;\n  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);\n}\n\nmodule.exports = hashHas;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_hashHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashSet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/**\n * Sets the hash `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf Hash\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the hash instance.\n */\nfunction hashSet(key, value) {\n  var data = this.__data__;\n  this.size += this.has(key) ? 0 : 1;\n  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;\n  return this;\n}\n\nmodule.exports = hashSet;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_hashSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_isFlattenable.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_isFlattenable.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    isArguments = __webpack_require__(/*! ./isArguments */ \"./node_modules/lodash/isArguments.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\");\n\n/** Built-in value references. */\nvar spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;\n\n/**\n * Checks if `value` is a flattenable `arguments` object or array.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.\n */\nfunction isFlattenable(value) {\n  return isArray(value) || isArguments(value) ||\n    !!(spreadableSymbol && value && value[spreadableSymbol]);\n}\n\nmodule.exports = isFlattenable;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_isFlattenable.js?");

/***/ }),

/***/ "./node_modules/lodash/_isKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_isKey.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used to match property names within property paths. */\nvar reIsDeepProp = /\\.|\\[(?:[^[\\]]*|([\"'])(?:(?!\\1)[^\\\\]|\\\\.)*?\\1)\\]/,\n    reIsPlainProp = /^\\w*$/;\n\n/**\n * Checks if `value` is a property name and not a property path.\n *\n * @private\n * @param {*} value The value to check.\n * @param {Object} [object] The object to query keys on.\n * @returns {boolean} Returns `true` if `value` is a property name, else `false`.\n */\nfunction isKey(value, object) {\n  if (isArray(value)) {\n    return false;\n  }\n  var type = typeof value;\n  if (type == 'number' || type == 'symbol' || type == 'boolean' ||\n      value == null || isSymbol(value)) {\n    return true;\n  }\n  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||\n    (object != null && value in Object(object));\n}\n\nmodule.exports = isKey;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_isKey.js?");

/***/ }),

/***/ "./node_modules/lodash/_isKeyable.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_isKeyable.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is suitable for use as unique object key.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is suitable, else `false`.\n */\nfunction isKeyable(value) {\n  var type = typeof value;\n  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')\n    ? (value !== '__proto__')\n    : (value === null);\n}\n\nmodule.exports = isKeyable;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_isKeyable.js?");

/***/ }),

/***/ "./node_modules/lodash/_isMasked.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var coreJsData = __webpack_require__(/*! ./_coreJsData */ \"./node_modules/lodash/_coreJsData.js\");\n\n/** Used to detect methods masquerading as native. */\nvar maskSrcKey = (function() {\n  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');\n  return uid ? ('Symbol(src)_1.' + uid) : '';\n}());\n\n/**\n * Checks if `func` has its source masked.\n *\n * @private\n * @param {Function} func The function to check.\n * @returns {boolean} Returns `true` if `func` is masked, else `false`.\n */\nfunction isMasked(func) {\n  return !!maskSrcKey && (maskSrcKey in func);\n}\n\nmodule.exports = isMasked;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_isMasked.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheClear.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_listCacheClear.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes all key-value entries from the list cache.\n *\n * @private\n * @name clear\n * @memberOf ListCache\n */\nfunction listCacheClear() {\n  this.__data__ = [];\n  this.size = 0;\n}\n\nmodule.exports = listCacheClear;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_listCacheClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheDelete.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_listCacheDelete.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/** Used for built-in method references. */\nvar arrayProto = Array.prototype;\n\n/** Built-in value references. */\nvar splice = arrayProto.splice;\n\n/**\n * Removes `key` and its value from the list cache.\n *\n * @private\n * @name delete\n * @memberOf ListCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction listCacheDelete(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    return false;\n  }\n  var lastIndex = data.length - 1;\n  if (index == lastIndex) {\n    data.pop();\n  } else {\n    splice.call(data, index, 1);\n  }\n  --this.size;\n  return true;\n}\n\nmodule.exports = listCacheDelete;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_listCacheDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheGet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheGet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Gets the list cache value for `key`.\n *\n * @private\n * @name get\n * @memberOf ListCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction listCacheGet(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  return index < 0 ? undefined : data[index][1];\n}\n\nmodule.exports = listCacheGet;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_listCacheGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheHas.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheHas.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Checks if a list cache value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf ListCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction listCacheHas(key) {\n  return assocIndexOf(this.__data__, key) > -1;\n}\n\nmodule.exports = listCacheHas;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_listCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheSet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheSet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Sets the list cache `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf ListCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the list cache instance.\n */\nfunction listCacheSet(key, value) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    ++this.size;\n    data.push([key, value]);\n  } else {\n    data[index][1] = value;\n  }\n  return this;\n}\n\nmodule.exports = listCacheSet;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_listCacheSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheClear.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_mapCacheClear.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Hash = __webpack_require__(/*! ./_Hash */ \"./node_modules/lodash/_Hash.js\"),\n    ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\"),\n    Map = __webpack_require__(/*! ./_Map */ \"./node_modules/lodash/_Map.js\");\n\n/**\n * Removes all key-value entries from the map.\n *\n * @private\n * @name clear\n * @memberOf MapCache\n */\nfunction mapCacheClear() {\n  this.size = 0;\n  this.__data__ = {\n    'hash': new Hash,\n    'map': new (Map || ListCache),\n    'string': new Hash\n  };\n}\n\nmodule.exports = mapCacheClear;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_mapCacheClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheDelete.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_mapCacheDelete.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Removes `key` and its value from the map.\n *\n * @private\n * @name delete\n * @memberOf MapCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction mapCacheDelete(key) {\n  var result = getMapData(this, key)['delete'](key);\n  this.size -= result ? 1 : 0;\n  return result;\n}\n\nmodule.exports = mapCacheDelete;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_mapCacheDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheGet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheGet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Gets the map value for `key`.\n *\n * @private\n * @name get\n * @memberOf MapCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction mapCacheGet(key) {\n  return getMapData(this, key).get(key);\n}\n\nmodule.exports = mapCacheGet;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_mapCacheGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheHas.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Checks if a map value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf MapCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction mapCacheHas(key) {\n  return getMapData(this, key).has(key);\n}\n\nmodule.exports = mapCacheHas;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_mapCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheSet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheSet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Sets the map `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf MapCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the map cache instance.\n */\nfunction mapCacheSet(key, value) {\n  var data = getMapData(this, key),\n      size = data.size;\n\n  data.set(key, value);\n  this.size += data.size == size ? 0 : 1;\n  return this;\n}\n\nmodule.exports = mapCacheSet;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_mapCacheSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_memoizeCapped.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_memoizeCapped.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var memoize = __webpack_require__(/*! ./memoize */ \"./node_modules/lodash/memoize.js\");\n\n/** Used as the maximum memoize cache size. */\nvar MAX_MEMOIZE_SIZE = 500;\n\n/**\n * A specialized version of `_.memoize` which clears the memoized function's\n * cache when it exceeds `MAX_MEMOIZE_SIZE`.\n *\n * @private\n * @param {Function} func The function to have its output memoized.\n * @returns {Function} Returns the new memoized function.\n */\nfunction memoizeCapped(func) {\n  var result = memoize(func, function(key) {\n    if (cache.size === MAX_MEMOIZE_SIZE) {\n      cache.clear();\n    }\n    return key;\n  });\n\n  var cache = result.cache;\n  return result;\n}\n\nmodule.exports = memoizeCapped;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_memoizeCapped.js?");

/***/ }),

/***/ "./node_modules/lodash/_nativeCreate.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeCreate.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\");\n\n/* Built-in method references that are verified to be native. */\nvar nativeCreate = getNative(Object, 'create');\n\nmodule.exports = nativeCreate;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_nativeCreate.js?");

/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/**\n * Converts `value` to a string using `Object.prototype.toString`.\n *\n * @private\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n */\nfunction objectToString(value) {\n  return nativeObjectToString.call(value);\n}\n\nmodule.exports = objectToString;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_objectToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Creates a unary function that invokes `func` with its argument transformed.\n *\n * @private\n * @param {Function} func The function to wrap.\n * @param {Function} transform The argument transform.\n * @returns {Function} Returns the new function.\n */\nfunction overArg(func, transform) {\n  return function(arg) {\n    return func(transform(arg));\n  };\n}\n\nmodule.exports = overArg;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_overArg.js?");

/***/ }),

/***/ "./node_modules/lodash/_overRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_overRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var apply = __webpack_require__(/*! ./_apply */ \"./node_modules/lodash/_apply.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeMax = Math.max;\n\n/**\n * A specialized version of `baseRest` which transforms the rest array.\n *\n * @private\n * @param {Function} func The function to apply a rest parameter to.\n * @param {number} [start=func.length-1] The start position of the rest parameter.\n * @param {Function} transform The rest array transform.\n * @returns {Function} Returns the new function.\n */\nfunction overRest(func, start, transform) {\n  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);\n  return function() {\n    var args = arguments,\n        index = -1,\n        length = nativeMax(args.length - start, 0),\n        array = Array(length);\n\n    while (++index < length) {\n      array[index] = args[start + index];\n    }\n    index = -1;\n    var otherArgs = Array(start + 1);\n    while (++index < start) {\n      otherArgs[index] = args[index];\n    }\n    otherArgs[start] = transform(array);\n    return apply(func, this, otherArgs);\n  };\n}\n\nmodule.exports = overRest;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_overRest.js?");

/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ \"./node_modules/lodash/_freeGlobal.js\");\n\n/** Detect free variable `self`. */\nvar freeSelf = typeof self == 'object' && self && self.Object === Object && self;\n\n/** Used as a reference to the global object. */\nvar root = freeGlobal || freeSelf || Function('return this')();\n\nmodule.exports = root;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_root.js?");

/***/ }),

/***/ "./node_modules/lodash/_setCacheAdd.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setCacheAdd.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/**\n * Adds `value` to the array cache.\n *\n * @private\n * @name add\n * @memberOf SetCache\n * @alias push\n * @param {*} value The value to cache.\n * @returns {Object} Returns the cache instance.\n */\nfunction setCacheAdd(value) {\n  this.__data__.set(value, HASH_UNDEFINED);\n  return this;\n}\n\nmodule.exports = setCacheAdd;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_setCacheAdd.js?");

/***/ }),

/***/ "./node_modules/lodash/_setCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setCacheHas.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is in the array cache.\n *\n * @private\n * @name has\n * @memberOf SetCache\n * @param {*} value The value to search for.\n * @returns {number} Returns `true` if `value` is found, else `false`.\n */\nfunction setCacheHas(value) {\n  return this.__data__.has(value);\n}\n\nmodule.exports = setCacheHas;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_setCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_setToArray.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_setToArray.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Converts `set` to an array of its values.\n *\n * @private\n * @param {Object} set The set to convert.\n * @returns {Array} Returns the values.\n */\nfunction setToArray(set) {\n  var index = -1,\n      result = Array(set.size);\n\n  set.forEach(function(value) {\n    result[++index] = value;\n  });\n  return result;\n}\n\nmodule.exports = setToArray;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_setToArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_setToString.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setToString.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseSetToString = __webpack_require__(/*! ./_baseSetToString */ \"./node_modules/lodash/_baseSetToString.js\"),\n    shortOut = __webpack_require__(/*! ./_shortOut */ \"./node_modules/lodash/_shortOut.js\");\n\n/**\n * Sets the `toString` method of `func` to return `string`.\n *\n * @private\n * @param {Function} func The function to modify.\n * @param {Function} string The `toString` result.\n * @returns {Function} Returns `func`.\n */\nvar setToString = shortOut(baseSetToString);\n\nmodule.exports = setToString;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_setToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_shortOut.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_shortOut.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to detect hot functions by number of calls within a span of milliseconds. */\nvar HOT_COUNT = 800,\n    HOT_SPAN = 16;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeNow = Date.now;\n\n/**\n * Creates a function that'll short out and invoke `identity` instead\n * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`\n * milliseconds.\n *\n * @private\n * @param {Function} func The function to restrict.\n * @returns {Function} Returns the new shortable function.\n */\nfunction shortOut(func) {\n  var count = 0,\n      lastCalled = 0;\n\n  return function() {\n    var stamp = nativeNow(),\n        remaining = HOT_SPAN - (stamp - lastCalled);\n\n    lastCalled = stamp;\n    if (remaining > 0) {\n      if (++count >= HOT_COUNT) {\n        return arguments[0];\n      }\n    } else {\n      count = 0;\n    }\n    return func.apply(undefined, arguments);\n  };\n}\n\nmodule.exports = shortOut;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_shortOut.js?");

/***/ }),

/***/ "./node_modules/lodash/_strictIndexOf.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_strictIndexOf.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.indexOf` which performs strict equality\n * comparisons of values, i.e. `===`.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {*} value The value to search for.\n * @param {number} fromIndex The index to search from.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction strictIndexOf(array, value, fromIndex) {\n  var index = fromIndex - 1,\n      length = array.length;\n\n  while (++index < length) {\n    if (array[index] === value) {\n      return index;\n    }\n  }\n  return -1;\n}\n\nmodule.exports = strictIndexOf;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_strictIndexOf.js?");

/***/ }),

/***/ "./node_modules/lodash/_stringToPath.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_stringToPath.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var memoizeCapped = __webpack_require__(/*! ./_memoizeCapped */ \"./node_modules/lodash/_memoizeCapped.js\");\n\n/** Used to match property names within property paths. */\nvar rePropName = /[^.[\\]]+|\\[(?:(-?\\d+(?:\\.\\d+)?)|([\"'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))/g;\n\n/** Used to match backslashes in property paths. */\nvar reEscapeChar = /\\\\(\\\\)?/g;\n\n/**\n * Converts `string` to a property path array.\n *\n * @private\n * @param {string} string The string to convert.\n * @returns {Array} Returns the property path array.\n */\nvar stringToPath = memoizeCapped(function(string) {\n  var result = [];\n  if (string.charCodeAt(0) === 46 /* . */) {\n    result.push('');\n  }\n  string.replace(rePropName, function(match, number, quote, subString) {\n    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));\n  });\n  return result;\n});\n\nmodule.exports = stringToPath;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_stringToPath.js?");

/***/ }),

/***/ "./node_modules/lodash/_toKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_toKey.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used as references for various `Number` constants. */\nvar INFINITY = 1 / 0;\n\n/**\n * Converts `value` to a string key if it's not a string or symbol.\n *\n * @private\n * @param {*} value The value to inspect.\n * @returns {string|symbol} Returns the key.\n */\nfunction toKey(value) {\n  if (typeof value == 'string' || isSymbol(value)) {\n    return value;\n  }\n  var result = (value + '');\n  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;\n}\n\nmodule.exports = toKey;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_toKey.js?");

/***/ }),

/***/ "./node_modules/lodash/_toSource.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar funcProto = Function.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/**\n * Converts `func` to its source code.\n *\n * @private\n * @param {Function} func The function to convert.\n * @returns {string} Returns the source code.\n */\nfunction toSource(func) {\n  if (func != null) {\n    try {\n      return funcToString.call(func);\n    } catch (e) {}\n    try {\n      return (func + '');\n    } catch (e) {}\n  }\n  return '';\n}\n\nmodule.exports = toSource;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/_toSource.js?");

/***/ }),

/***/ "./node_modules/lodash/constant.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/constant.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Creates a function that returns `value`.\n *\n * @static\n * @memberOf _\n * @since 2.4.0\n * @category Util\n * @param {*} value The value to return from the new function.\n * @returns {Function} Returns the new constant function.\n * @example\n *\n * var objects = _.times(2, _.constant({ 'a': 1 }));\n *\n * console.log(objects);\n * // => [{ 'a': 1 }, { 'a': 1 }]\n *\n * console.log(objects[0] === objects[1]);\n * // => true\n */\nfunction constant(value) {\n  return function() {\n    return value;\n  };\n}\n\nmodule.exports = constant;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/constant.js?");

/***/ }),

/***/ "./node_modules/lodash/eq.js":
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Performs a\n * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * comparison between two values to determine if they are equivalent.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n * @example\n *\n * var object = { 'a': 1 };\n * var other = { 'a': 1 };\n *\n * _.eq(object, object);\n * // => true\n *\n * _.eq(object, other);\n * // => false\n *\n * _.eq('a', 'a');\n * // => true\n *\n * _.eq('a', Object('a'));\n * // => false\n *\n * _.eq(NaN, NaN);\n * // => true\n */\nfunction eq(value, other) {\n  return value === other || (value !== value && other !== other);\n}\n\nmodule.exports = eq;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/eq.js?");

/***/ }),

/***/ "./node_modules/lodash/get.js":
/*!************************************!*\
  !*** ./node_modules/lodash/get.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGet = __webpack_require__(/*! ./_baseGet */ \"./node_modules/lodash/_baseGet.js\");\n\n/**\n * Gets the value at `path` of `object`. If the resolved value is\n * `undefined`, the `defaultValue` is returned in its place.\n *\n * @static\n * @memberOf _\n * @since 3.7.0\n * @category Object\n * @param {Object} object The object to query.\n * @param {Array|string} path The path of the property to get.\n * @param {*} [defaultValue] The value returned for `undefined` resolved values.\n * @returns {*} Returns the resolved value.\n * @example\n *\n * var object = { 'a': [{ 'b': { 'c': 3 } }] };\n *\n * _.get(object, 'a[0].b.c');\n * // => 3\n *\n * _.get(object, ['a', '0', 'b', 'c']);\n * // => 3\n *\n * _.get(object, 'a.b.c', 'default');\n * // => 'default'\n */\nfunction get(object, path, defaultValue) {\n  var result = object == null ? undefined : baseGet(object, path);\n  return result === undefined ? defaultValue : result;\n}\n\nmodule.exports = get;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/get.js?");

/***/ }),

/***/ "./node_modules/lodash/identity.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns the first argument it receives.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Util\n * @param {*} value Any value.\n * @returns {*} Returns `value`.\n * @example\n *\n * var object = { 'a': 1 };\n *\n * console.log(_.identity(object) === object);\n * // => true\n */\nfunction identity(value) {\n  return value;\n}\n\nmodule.exports = identity;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/identity.js?");

/***/ }),

/***/ "./node_modules/lodash/intersection.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/intersection.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayMap = __webpack_require__(/*! ./_arrayMap */ \"./node_modules/lodash/_arrayMap.js\"),\n    baseIntersection = __webpack_require__(/*! ./_baseIntersection */ \"./node_modules/lodash/_baseIntersection.js\"),\n    baseRest = __webpack_require__(/*! ./_baseRest */ \"./node_modules/lodash/_baseRest.js\"),\n    castArrayLikeObject = __webpack_require__(/*! ./_castArrayLikeObject */ \"./node_modules/lodash/_castArrayLikeObject.js\");\n\n/**\n * Creates an array of unique values that are included in all given arrays\n * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * for equality comparisons. The order and references of result values are\n * determined by the first array.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Array\n * @param {...Array} [arrays] The arrays to inspect.\n * @returns {Array} Returns the new array of intersecting values.\n * @example\n *\n * _.intersection([2, 1], [2, 3]);\n * // => [2]\n */\nvar intersection = baseRest(function(arrays) {\n  var mapped = arrayMap(arrays, castArrayLikeObject);\n  return (mapped.length && mapped[0] === arrays[0])\n    ? baseIntersection(mapped)\n    : [];\n});\n\nmodule.exports = intersection;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/intersection.js?");

/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ \"./node_modules/lodash/_baseIsArguments.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Built-in value references. */\nvar propertyIsEnumerable = objectProto.propertyIsEnumerable;\n\n/**\n * Checks if `value` is likely an `arguments` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an `arguments` object,\n *  else `false`.\n * @example\n *\n * _.isArguments(function() { return arguments; }());\n * // => true\n *\n * _.isArguments([1, 2, 3]);\n * // => false\n */\nvar isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {\n  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&\n    !propertyIsEnumerable.call(value, 'callee');\n};\n\nmodule.exports = isArguments;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/isArguments.js?");

/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is classified as an `Array` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an array, else `false`.\n * @example\n *\n * _.isArray([1, 2, 3]);\n * // => true\n *\n * _.isArray(document.body.children);\n * // => false\n *\n * _.isArray('abc');\n * // => false\n *\n * _.isArray(_.noop);\n * // => false\n */\nvar isArray = Array.isArray;\n\nmodule.exports = isArray;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/isArray.js?");

/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isFunction = __webpack_require__(/*! ./isFunction */ \"./node_modules/lodash/isFunction.js\"),\n    isLength = __webpack_require__(/*! ./isLength */ \"./node_modules/lodash/isLength.js\");\n\n/**\n * Checks if `value` is array-like. A value is considered array-like if it's\n * not a function and has a `value.length` that's an integer greater than or\n * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is array-like, else `false`.\n * @example\n *\n * _.isArrayLike([1, 2, 3]);\n * // => true\n *\n * _.isArrayLike(document.body.children);\n * // => true\n *\n * _.isArrayLike('abc');\n * // => true\n *\n * _.isArrayLike(_.noop);\n * // => false\n */\nfunction isArrayLike(value) {\n  return value != null && isLength(value.length) && !isFunction(value);\n}\n\nmodule.exports = isArrayLike;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/isArrayLike.js?");

/***/ }),

/***/ "./node_modules/lodash/isArrayLikeObject.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/isArrayLikeObject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/**\n * This method is like `_.isArrayLike` except that it also checks if `value`\n * is an object.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an array-like object,\n *  else `false`.\n * @example\n *\n * _.isArrayLikeObject([1, 2, 3]);\n * // => true\n *\n * _.isArrayLikeObject(document.body.children);\n * // => true\n *\n * _.isArrayLikeObject('abc');\n * // => false\n *\n * _.isArrayLikeObject(_.noop);\n * // => false\n */\nfunction isArrayLikeObject(value) {\n  return isObjectLike(value) && isArrayLike(value);\n}\n\nmodule.exports = isArrayLikeObject;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/isArrayLikeObject.js?");

/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/** `Object#toString` result references. */\nvar asyncTag = '[object AsyncFunction]',\n    funcTag = '[object Function]',\n    genTag = '[object GeneratorFunction]',\n    proxyTag = '[object Proxy]';\n\n/**\n * Checks if `value` is classified as a `Function` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a function, else `false`.\n * @example\n *\n * _.isFunction(_);\n * // => true\n *\n * _.isFunction(/abc/);\n * // => false\n */\nfunction isFunction(value) {\n  if (!isObject(value)) {\n    return false;\n  }\n  // The use of `Object#toString` avoids issues with the `typeof` operator\n  // in Safari 9 which returns 'object' for typed arrays and other constructors.\n  var tag = baseGetTag(value);\n  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;\n}\n\nmodule.exports = isFunction;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/isFunction.js?");

/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used as references for various `Number` constants. */\nvar MAX_SAFE_INTEGER = 9007199254740991;\n\n/**\n * Checks if `value` is a valid array-like length.\n *\n * **Note:** This method is loosely based on\n * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.\n * @example\n *\n * _.isLength(3);\n * // => true\n *\n * _.isLength(Number.MIN_VALUE);\n * // => false\n *\n * _.isLength(Infinity);\n * // => false\n *\n * _.isLength('3');\n * // => false\n */\nfunction isLength(value) {\n  return typeof value == 'number' &&\n    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;\n}\n\nmodule.exports = isLength;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/isLength.js?");

/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is the\n * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)\n * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an object, else `false`.\n * @example\n *\n * _.isObject({});\n * // => true\n *\n * _.isObject([1, 2, 3]);\n * // => true\n *\n * _.isObject(_.noop);\n * // => true\n *\n * _.isObject(null);\n * // => false\n */\nfunction isObject(value) {\n  var type = typeof value;\n  return value != null && (type == 'object' || type == 'function');\n}\n\nmodule.exports = isObject;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/isObject.js?");

/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is object-like. A value is object-like if it's not `null`\n * and has a `typeof` result of \"object\".\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is object-like, else `false`.\n * @example\n *\n * _.isObjectLike({});\n * // => true\n *\n * _.isObjectLike([1, 2, 3]);\n * // => true\n *\n * _.isObjectLike(_.noop);\n * // => false\n *\n * _.isObjectLike(null);\n * // => false\n */\nfunction isObjectLike(value) {\n  return value != null && typeof value == 'object';\n}\n\nmodule.exports = isObjectLike;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/isObjectLike.js?");

/***/ }),

/***/ "./node_modules/lodash/isPlainObject.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/isPlainObject.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    getPrototype = __webpack_require__(/*! ./_getPrototype */ \"./node_modules/lodash/_getPrototype.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar objectTag = '[object Object]';\n\n/** Used for built-in method references. */\nvar funcProto = Function.prototype,\n    objectProto = Object.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Used to infer the `Object` constructor. */\nvar objectCtorString = funcToString.call(Object);\n\n/**\n * Checks if `value` is a plain object, that is, an object created by the\n * `Object` constructor or one with a `[[Prototype]]` of `null`.\n *\n * @static\n * @memberOf _\n * @since 0.8.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.\n * @example\n *\n * function Foo() {\n *   this.a = 1;\n * }\n *\n * _.isPlainObject(new Foo);\n * // => false\n *\n * _.isPlainObject([1, 2, 3]);\n * // => false\n *\n * _.isPlainObject({ 'x': 0, 'y': 0 });\n * // => true\n *\n * _.isPlainObject(Object.create(null));\n * // => true\n */\nfunction isPlainObject(value) {\n  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {\n    return false;\n  }\n  var proto = getPrototype(value);\n  if (proto === null) {\n    return true;\n  }\n  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;\n  return typeof Ctor == 'function' && Ctor instanceof Ctor &&\n    funcToString.call(Ctor) == objectCtorString;\n}\n\nmodule.exports = isPlainObject;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/isPlainObject.js?");

/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar symbolTag = '[object Symbol]';\n\n/**\n * Checks if `value` is classified as a `Symbol` primitive or object.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.\n * @example\n *\n * _.isSymbol(Symbol.iterator);\n * // => true\n *\n * _.isSymbol('abc');\n * // => false\n */\nfunction isSymbol(value) {\n  return typeof value == 'symbol' ||\n    (isObjectLike(value) && baseGetTag(value) == symbolTag);\n}\n\nmodule.exports = isSymbol;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/isSymbol.js?");

/***/ }),

/***/ "./node_modules/lodash/memoize.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/memoize.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var MapCache = __webpack_require__(/*! ./_MapCache */ \"./node_modules/lodash/_MapCache.js\");\n\n/** Error message constants. */\nvar FUNC_ERROR_TEXT = 'Expected a function';\n\n/**\n * Creates a function that memoizes the result of `func`. If `resolver` is\n * provided, it determines the cache key for storing the result based on the\n * arguments provided to the memoized function. By default, the first argument\n * provided to the memoized function is used as the map cache key. The `func`\n * is invoked with the `this` binding of the memoized function.\n *\n * **Note:** The cache is exposed as the `cache` property on the memoized\n * function. Its creation may be customized by replacing the `_.memoize.Cache`\n * constructor with one whose instances implement the\n * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)\n * method interface of `clear`, `delete`, `get`, `has`, and `set`.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Function\n * @param {Function} func The function to have its output memoized.\n * @param {Function} [resolver] The function to resolve the cache key.\n * @returns {Function} Returns the new memoized function.\n * @example\n *\n * var object = { 'a': 1, 'b': 2 };\n * var other = { 'c': 3, 'd': 4 };\n *\n * var values = _.memoize(_.values);\n * values(object);\n * // => [1, 2]\n *\n * values(other);\n * // => [3, 4]\n *\n * object.a = 2;\n * values(object);\n * // => [1, 2]\n *\n * // Modify the result cache.\n * values.cache.set(object, ['a', 'b']);\n * values(object);\n * // => ['a', 'b']\n *\n * // Replace `_.memoize.Cache`.\n * _.memoize.Cache = WeakMap;\n */\nfunction memoize(func, resolver) {\n  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {\n    throw new TypeError(FUNC_ERROR_TEXT);\n  }\n  var memoized = function() {\n    var args = arguments,\n        key = resolver ? resolver.apply(this, args) : args[0],\n        cache = memoized.cache;\n\n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    var result = func.apply(this, args);\n    memoized.cache = cache.set(key, result) || cache;\n    return result;\n  };\n  memoized.cache = new (memoize.Cache || MapCache);\n  return memoized;\n}\n\n// Expose `MapCache`.\nmemoize.Cache = MapCache;\n\nmodule.exports = memoize;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/memoize.js?");

/***/ }),

/***/ "./node_modules/lodash/noop.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/noop.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns `undefined`.\n *\n * @static\n * @memberOf _\n * @since 2.3.0\n * @category Util\n * @example\n *\n * _.times(2, _.noop);\n * // => [undefined, undefined]\n */\nfunction noop() {\n  // No operation performed.\n}\n\nmodule.exports = noop;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/noop.js?");

/***/ }),

/***/ "./node_modules/lodash/toString.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toString.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseToString = __webpack_require__(/*! ./_baseToString */ \"./node_modules/lodash/_baseToString.js\");\n\n/**\n * Converts `value` to a string. An empty string is returned for `null`\n * and `undefined` values. The sign of `-0` is preserved.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n * @example\n *\n * _.toString(null);\n * // => ''\n *\n * _.toString(-0);\n * // => '-0'\n *\n * _.toString([1, 2, 3]);\n * // => '1,2,3'\n */\nfunction toString(value) {\n  return value == null ? '' : baseToString(value);\n}\n\nmodule.exports = toString;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/toString.js?");

/***/ }),

/***/ "./node_modules/lodash/without.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/without.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseDifference = __webpack_require__(/*! ./_baseDifference */ \"./node_modules/lodash/_baseDifference.js\"),\n    baseRest = __webpack_require__(/*! ./_baseRest */ \"./node_modules/lodash/_baseRest.js\"),\n    isArrayLikeObject = __webpack_require__(/*! ./isArrayLikeObject */ \"./node_modules/lodash/isArrayLikeObject.js\");\n\n/**\n * Creates an array excluding all given values using\n * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * for equality comparisons.\n *\n * **Note:** Unlike `_.pull`, this method returns a new array.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Array\n * @param {Array} array The array to inspect.\n * @param {...*} [values] The values to exclude.\n * @returns {Array} Returns the new array of filtered values.\n * @see _.difference, _.xor\n * @example\n *\n * _.without([2, 1, 2, 3], 1, 2);\n * // => [3]\n */\nvar without = baseRest(function(array, values) {\n  return isArrayLikeObject(array)\n    ? baseDifference(array, values)\n    : [];\n});\n\nmodule.exports = without;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/without.js?");

/***/ }),

/***/ "./node_modules/lodash/xor.js":
/*!************************************!*\
  !*** ./node_modules/lodash/xor.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ \"./node_modules/lodash/_arrayFilter.js\"),\n    baseRest = __webpack_require__(/*! ./_baseRest */ \"./node_modules/lodash/_baseRest.js\"),\n    baseXor = __webpack_require__(/*! ./_baseXor */ \"./node_modules/lodash/_baseXor.js\"),\n    isArrayLikeObject = __webpack_require__(/*! ./isArrayLikeObject */ \"./node_modules/lodash/isArrayLikeObject.js\");\n\n/**\n * Creates an array of unique values that is the\n * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)\n * of the given arrays. The order of result values is determined by the order\n * they occur in the arrays.\n *\n * @static\n * @memberOf _\n * @since 2.4.0\n * @category Array\n * @param {...Array} [arrays] The arrays to inspect.\n * @returns {Array} Returns the new array of filtered values.\n * @see _.difference, _.without\n * @example\n *\n * _.xor([2, 1], [2, 3]);\n * // => [1, 3]\n */\nvar xor = baseRest(function(arrays) {\n  return baseXor(arrayFilter(arrays, isArrayLikeObject));\n});\n\nmodule.exports = xor;\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/lodash/xor.js?");

/***/ }),

/***/ "./node_modules/react-is/cjs/react-is.production.min.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.production.min.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/** @license React v16.8.4\n * react-is.production.min.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\nObject.defineProperty(exports,\"__esModule\",{value:!0});\nvar b=\"function\"===typeof Symbol&&Symbol.for,c=b?Symbol.for(\"react.element\"):60103,d=b?Symbol.for(\"react.portal\"):60106,e=b?Symbol.for(\"react.fragment\"):60107,f=b?Symbol.for(\"react.strict_mode\"):60108,g=b?Symbol.for(\"react.profiler\"):60114,h=b?Symbol.for(\"react.provider\"):60109,k=b?Symbol.for(\"react.context\"):60110,l=b?Symbol.for(\"react.async_mode\"):60111,m=b?Symbol.for(\"react.concurrent_mode\"):60111,n=b?Symbol.for(\"react.forward_ref\"):60112,p=b?Symbol.for(\"react.suspense\"):60113,q=b?Symbol.for(\"react.memo\"):\n60115,r=b?Symbol.for(\"react.lazy\"):60116;function t(a){if(\"object\"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case h:return a;default:return u}}case r:case q:case d:return u}}}function v(a){return t(a)===m}exports.typeOf=t;exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;\nexports.Fragment=e;exports.Lazy=r;exports.Memo=q;exports.Portal=d;exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isValidElementType=function(a){return\"string\"===typeof a||\"function\"===typeof a||a===e||a===m||a===g||a===f||a===p||\"object\"===typeof a&&null!==a&&(a.$$typeof===r||a.$$typeof===q||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n)};exports.isAsyncMode=function(a){return v(a)||t(a)===l};exports.isConcurrentMode=v;exports.isContextConsumer=function(a){return t(a)===k};\nexports.isContextProvider=function(a){return t(a)===h};exports.isElement=function(a){return\"object\"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return t(a)===n};exports.isFragment=function(a){return t(a)===e};exports.isLazy=function(a){return t(a)===r};exports.isMemo=function(a){return t(a)===q};exports.isPortal=function(a){return t(a)===d};exports.isProfiler=function(a){return t(a)===g};exports.isStrictMode=function(a){return t(a)===f};\nexports.isSuspense=function(a){return t(a)===p};\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/react-is/cjs/react-is.production.min.js?");

/***/ }),

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nif (true) {\n  module.exports = __webpack_require__(/*! ./cjs/react-is.production.min.js */ \"./node_modules/react-is/cjs/react-is.production.min.js\");\n} else {}\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/react-is/index.js?");

/***/ }),

/***/ "./node_modules/redux/es/redux.js":
/*!****************************************!*\
  !*** ./node_modules/redux/es/redux.js ***!
  \****************************************/
/*! exports provided: createStore, combineReducers, bindActionCreators, applyMiddleware, compose, __DO_NOT_USE__ActionTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createStore\", function() { return createStore; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"combineReducers\", function() { return combineReducers; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bindActionCreators\", function() { return bindActionCreators; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"applyMiddleware\", function() { return applyMiddleware; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"compose\", function() { return compose; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__DO_NOT_USE__ActionTypes\", function() { return ActionTypes; });\n/* harmony import */ var symbol_observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! symbol-observable */ \"./node_modules/symbol-observable/es/index.js\");\n\n\n/**\n * These are private action types reserved by Redux.\n * For any unknown actions, you must return the current state.\n * If the current state is undefined, you must return the initial state.\n * Do not reference these action types directly in your code.\n */\nvar randomString = function randomString() {\n  return Math.random().toString(36).substring(7).split('').join('.');\n};\n\nvar ActionTypes = {\n  INIT: \"@@redux/INIT\" + randomString(),\n  REPLACE: \"@@redux/REPLACE\" + randomString(),\n  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {\n    return \"@@redux/PROBE_UNKNOWN_ACTION\" + randomString();\n  }\n};\n\n/**\n * @param {any} obj The object to inspect.\n * @returns {boolean} True if the argument appears to be a plain object.\n */\nfunction isPlainObject(obj) {\n  if (typeof obj !== 'object' || obj === null) return false;\n  var proto = obj;\n\n  while (Object.getPrototypeOf(proto) !== null) {\n    proto = Object.getPrototypeOf(proto);\n  }\n\n  return Object.getPrototypeOf(obj) === proto;\n}\n\n/**\n * Creates a Redux store that holds the state tree.\n * The only way to change the data in the store is to call `dispatch()` on it.\n *\n * There should only be a single store in your app. To specify how different\n * parts of the state tree respond to actions, you may combine several reducers\n * into a single reducer function by using `combineReducers`.\n *\n * @param {Function} reducer A function that returns the next state tree, given\n * the current state tree and the action to handle.\n *\n * @param {any} [preloadedState] The initial state. You may optionally specify it\n * to hydrate the state from the server in universal apps, or to restore a\n * previously serialized user session.\n * If you use `combineReducers` to produce the root reducer function, this must be\n * an object with the same shape as `combineReducers` keys.\n *\n * @param {Function} [enhancer] The store enhancer. You may optionally specify it\n * to enhance the store with third-party capabilities such as middleware,\n * time travel, persistence, etc. The only store enhancer that ships with Redux\n * is `applyMiddleware()`.\n *\n * @returns {Store} A Redux store that lets you read the state, dispatch actions\n * and subscribe to changes.\n */\n\nfunction createStore(reducer, preloadedState, enhancer) {\n  var _ref2;\n\n  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {\n    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function');\n  }\n\n  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {\n    enhancer = preloadedState;\n    preloadedState = undefined;\n  }\n\n  if (typeof enhancer !== 'undefined') {\n    if (typeof enhancer !== 'function') {\n      throw new Error('Expected the enhancer to be a function.');\n    }\n\n    return enhancer(createStore)(reducer, preloadedState);\n  }\n\n  if (typeof reducer !== 'function') {\n    throw new Error('Expected the reducer to be a function.');\n  }\n\n  var currentReducer = reducer;\n  var currentState = preloadedState;\n  var currentListeners = [];\n  var nextListeners = currentListeners;\n  var isDispatching = false;\n\n  function ensureCanMutateNextListeners() {\n    if (nextListeners === currentListeners) {\n      nextListeners = currentListeners.slice();\n    }\n  }\n  /**\n   * Reads the state tree managed by the store.\n   *\n   * @returns {any} The current state tree of your application.\n   */\n\n\n  function getState() {\n    if (isDispatching) {\n      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');\n    }\n\n    return currentState;\n  }\n  /**\n   * Adds a change listener. It will be called any time an action is dispatched,\n   * and some part of the state tree may potentially have changed. You may then\n   * call `getState()` to read the current state tree inside the callback.\n   *\n   * You may call `dispatch()` from a change listener, with the following\n   * caveats:\n   *\n   * 1. The subscriptions are snapshotted just before every `dispatch()` call.\n   * If you subscribe or unsubscribe while the listeners are being invoked, this\n   * will not have any effect on the `dispatch()` that is currently in progress.\n   * However, the next `dispatch()` call, whether nested or not, will use a more\n   * recent snapshot of the subscription list.\n   *\n   * 2. The listener should not expect to see all state changes, as the state\n   * might have been updated multiple times during a nested `dispatch()` before\n   * the listener is called. It is, however, guaranteed that all subscribers\n   * registered before the `dispatch()` started will be called with the latest\n   * state by the time it exits.\n   *\n   * @param {Function} listener A callback to be invoked on every dispatch.\n   * @returns {Function} A function to remove this change listener.\n   */\n\n\n  function subscribe(listener) {\n    if (typeof listener !== 'function') {\n      throw new Error('Expected the listener to be a function.');\n    }\n\n    if (isDispatching) {\n      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');\n    }\n\n    var isSubscribed = true;\n    ensureCanMutateNextListeners();\n    nextListeners.push(listener);\n    return function unsubscribe() {\n      if (!isSubscribed) {\n        return;\n      }\n\n      if (isDispatching) {\n        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');\n      }\n\n      isSubscribed = false;\n      ensureCanMutateNextListeners();\n      var index = nextListeners.indexOf(listener);\n      nextListeners.splice(index, 1);\n    };\n  }\n  /**\n   * Dispatches an action. It is the only way to trigger a state change.\n   *\n   * The `reducer` function, used to create the store, will be called with the\n   * current state tree and the given `action`. Its return value will\n   * be considered the **next** state of the tree, and the change listeners\n   * will be notified.\n   *\n   * The base implementation only supports plain object actions. If you want to\n   * dispatch a Promise, an Observable, a thunk, or something else, you need to\n   * wrap your store creating function into the corresponding middleware. For\n   * example, see the documentation for the `redux-thunk` package. Even the\n   * middleware will eventually dispatch plain object actions using this method.\n   *\n   * @param {Object} action A plain object representing “what changed”. It is\n   * a good idea to keep actions serializable so you can record and replay user\n   * sessions, or use the time travelling `redux-devtools`. An action must have\n   * a `type` property which may not be `undefined`. It is a good idea to use\n   * string constants for action types.\n   *\n   * @returns {Object} For convenience, the same action object you dispatched.\n   *\n   * Note that, if you use a custom middleware, it may wrap `dispatch()` to\n   * return something else (for example, a Promise you can await).\n   */\n\n\n  function dispatch(action) {\n    if (!isPlainObject(action)) {\n      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');\n    }\n\n    if (typeof action.type === 'undefined') {\n      throw new Error('Actions may not have an undefined \"type\" property. ' + 'Have you misspelled a constant?');\n    }\n\n    if (isDispatching) {\n      throw new Error('Reducers may not dispatch actions.');\n    }\n\n    try {\n      isDispatching = true;\n      currentState = currentReducer(currentState, action);\n    } finally {\n      isDispatching = false;\n    }\n\n    var listeners = currentListeners = nextListeners;\n\n    for (var i = 0; i < listeners.length; i++) {\n      var listener = listeners[i];\n      listener();\n    }\n\n    return action;\n  }\n  /**\n   * Replaces the reducer currently used by the store to calculate the state.\n   *\n   * You might need this if your app implements code splitting and you want to\n   * load some of the reducers dynamically. You might also need this if you\n   * implement a hot reloading mechanism for Redux.\n   *\n   * @param {Function} nextReducer The reducer for the store to use instead.\n   * @returns {void}\n   */\n\n\n  function replaceReducer(nextReducer) {\n    if (typeof nextReducer !== 'function') {\n      throw new Error('Expected the nextReducer to be a function.');\n    }\n\n    currentReducer = nextReducer;\n    dispatch({\n      type: ActionTypes.REPLACE\n    });\n  }\n  /**\n   * Interoperability point for observable/reactive libraries.\n   * @returns {observable} A minimal observable of state changes.\n   * For more information, see the observable proposal:\n   * https://github.com/tc39/proposal-observable\n   */\n\n\n  function observable() {\n    var _ref;\n\n    var outerSubscribe = subscribe;\n    return _ref = {\n      /**\n       * The minimal observable subscription method.\n       * @param {Object} observer Any object that can be used as an observer.\n       * The observer object should have a `next` method.\n       * @returns {subscription} An object with an `unsubscribe` method that can\n       * be used to unsubscribe the observable from the store, and prevent further\n       * emission of values from the observable.\n       */\n      subscribe: function subscribe(observer) {\n        if (typeof observer !== 'object' || observer === null) {\n          throw new TypeError('Expected the observer to be an object.');\n        }\n\n        function observeState() {\n          if (observer.next) {\n            observer.next(getState());\n          }\n        }\n\n        observeState();\n        var unsubscribe = outerSubscribe(observeState);\n        return {\n          unsubscribe: unsubscribe\n        };\n      }\n    }, _ref[symbol_observable__WEBPACK_IMPORTED_MODULE_0__[\"default\"]] = function () {\n      return this;\n    }, _ref;\n  } // When a store is created, an \"INIT\" action is dispatched so that every\n  // reducer returns their initial state. This effectively populates\n  // the initial state tree.\n\n\n  dispatch({\n    type: ActionTypes.INIT\n  });\n  return _ref2 = {\n    dispatch: dispatch,\n    subscribe: subscribe,\n    getState: getState,\n    replaceReducer: replaceReducer\n  }, _ref2[symbol_observable__WEBPACK_IMPORTED_MODULE_0__[\"default\"]] = observable, _ref2;\n}\n\n/**\n * Prints a warning in the console if it exists.\n *\n * @param {String} message The warning message.\n * @returns {void}\n */\nfunction warning(message) {\n  /* eslint-disable no-console */\n  if (typeof console !== 'undefined' && typeof console.error === 'function') {\n    console.error(message);\n  }\n  /* eslint-enable no-console */\n\n\n  try {\n    // This error was thrown as a convenience so that if you enable\n    // \"break on all exceptions\" in your console,\n    // it would pause the execution at this line.\n    throw new Error(message);\n  } catch (e) {} // eslint-disable-line no-empty\n\n}\n\nfunction getUndefinedStateErrorMessage(key, action) {\n  var actionType = action && action.type;\n  var actionDescription = actionType && \"action \\\"\" + String(actionType) + \"\\\"\" || 'an action';\n  return \"Given \" + actionDescription + \", reducer \\\"\" + key + \"\\\" returned undefined. \" + \"To ignore an action, you must explicitly return the previous state. \" + \"If you want this reducer to hold no value, you can return null instead of undefined.\";\n}\n\nfunction getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {\n  var reducerKeys = Object.keys(reducers);\n  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';\n\n  if (reducerKeys.length === 0) {\n    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';\n  }\n\n  if (!isPlainObject(inputState)) {\n    return \"The \" + argumentName + \" has unexpected type of \\\"\" + {}.toString.call(inputState).match(/\\s([a-z|A-Z]+)/)[1] + \"\\\". Expected argument to be an object with the following \" + (\"keys: \\\"\" + reducerKeys.join('\", \"') + \"\\\"\");\n  }\n\n  var unexpectedKeys = Object.keys(inputState).filter(function (key) {\n    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];\n  });\n  unexpectedKeys.forEach(function (key) {\n    unexpectedKeyCache[key] = true;\n  });\n  if (action && action.type === ActionTypes.REPLACE) return;\n\n  if (unexpectedKeys.length > 0) {\n    return \"Unexpected \" + (unexpectedKeys.length > 1 ? 'keys' : 'key') + \" \" + (\"\\\"\" + unexpectedKeys.join('\", \"') + \"\\\" found in \" + argumentName + \". \") + \"Expected to find one of the known reducer keys instead: \" + (\"\\\"\" + reducerKeys.join('\", \"') + \"\\\". Unexpected keys will be ignored.\");\n  }\n}\n\nfunction assertReducerShape(reducers) {\n  Object.keys(reducers).forEach(function (key) {\n    var reducer = reducers[key];\n    var initialState = reducer(undefined, {\n      type: ActionTypes.INIT\n    });\n\n    if (typeof initialState === 'undefined') {\n      throw new Error(\"Reducer \\\"\" + key + \"\\\" returned undefined during initialization. \" + \"If the state passed to the reducer is undefined, you must \" + \"explicitly return the initial state. The initial state may \" + \"not be undefined. If you don't want to set a value for this reducer, \" + \"you can use null instead of undefined.\");\n    }\n\n    if (typeof reducer(undefined, {\n      type: ActionTypes.PROBE_UNKNOWN_ACTION()\n    }) === 'undefined') {\n      throw new Error(\"Reducer \\\"\" + key + \"\\\" returned undefined when probed with a random type. \" + (\"Don't try to handle \" + ActionTypes.INIT + \" or other actions in \\\"redux/*\\\" \") + \"namespace. They are considered private. Instead, you must return the \" + \"current state for any unknown actions, unless it is undefined, \" + \"in which case you must return the initial state, regardless of the \" + \"action type. The initial state may not be undefined, but can be null.\");\n    }\n  });\n}\n/**\n * Turns an object whose values are different reducer functions, into a single\n * reducer function. It will call every child reducer, and gather their results\n * into a single state object, whose keys correspond to the keys of the passed\n * reducer functions.\n *\n * @param {Object} reducers An object whose values correspond to different\n * reducer functions that need to be combined into one. One handy way to obtain\n * it is to use ES6 `import * as reducers` syntax. The reducers may never return\n * undefined for any action. Instead, they should return their initial state\n * if the state passed to them was undefined, and the current state for any\n * unrecognized action.\n *\n * @returns {Function} A reducer function that invokes every reducer inside the\n * passed object, and builds a state object with the same shape.\n */\n\n\nfunction combineReducers(reducers) {\n  var reducerKeys = Object.keys(reducers);\n  var finalReducers = {};\n\n  for (var i = 0; i < reducerKeys.length; i++) {\n    var key = reducerKeys[i];\n\n    if (false) {}\n\n    if (typeof reducers[key] === 'function') {\n      finalReducers[key] = reducers[key];\n    }\n  }\n\n  var finalReducerKeys = Object.keys(finalReducers);\n  var unexpectedKeyCache;\n\n  if (false) {}\n\n  var shapeAssertionError;\n\n  try {\n    assertReducerShape(finalReducers);\n  } catch (e) {\n    shapeAssertionError = e;\n  }\n\n  return function combination(state, action) {\n    if (state === void 0) {\n      state = {};\n    }\n\n    if (shapeAssertionError) {\n      throw shapeAssertionError;\n    }\n\n    if (false) { var warningMessage; }\n\n    var hasChanged = false;\n    var nextState = {};\n\n    for (var _i = 0; _i < finalReducerKeys.length; _i++) {\n      var _key = finalReducerKeys[_i];\n      var reducer = finalReducers[_key];\n      var previousStateForKey = state[_key];\n      var nextStateForKey = reducer(previousStateForKey, action);\n\n      if (typeof nextStateForKey === 'undefined') {\n        var errorMessage = getUndefinedStateErrorMessage(_key, action);\n        throw new Error(errorMessage);\n      }\n\n      nextState[_key] = nextStateForKey;\n      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;\n    }\n\n    return hasChanged ? nextState : state;\n  };\n}\n\nfunction bindActionCreator(actionCreator, dispatch) {\n  return function () {\n    return dispatch(actionCreator.apply(this, arguments));\n  };\n}\n/**\n * Turns an object whose values are action creators, into an object with the\n * same keys, but with every function wrapped into a `dispatch` call so they\n * may be invoked directly. This is just a convenience method, as you can call\n * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.\n *\n * For convenience, you can also pass a single function as the first argument,\n * and get a function in return.\n *\n * @param {Function|Object} actionCreators An object whose values are action\n * creator functions. One handy way to obtain it is to use ES6 `import * as`\n * syntax. You may also pass a single function.\n *\n * @param {Function} dispatch The `dispatch` function available on your Redux\n * store.\n *\n * @returns {Function|Object} The object mimicking the original object, but with\n * every action creator wrapped into the `dispatch` call. If you passed a\n * function as `actionCreators`, the return value will also be a single\n * function.\n */\n\n\nfunction bindActionCreators(actionCreators, dispatch) {\n  if (typeof actionCreators === 'function') {\n    return bindActionCreator(actionCreators, dispatch);\n  }\n\n  if (typeof actionCreators !== 'object' || actionCreators === null) {\n    throw new Error(\"bindActionCreators expected an object or a function, instead received \" + (actionCreators === null ? 'null' : typeof actionCreators) + \". \" + \"Did you write \\\"import ActionCreators from\\\" instead of \\\"import * as ActionCreators from\\\"?\");\n  }\n\n  var keys = Object.keys(actionCreators);\n  var boundActionCreators = {};\n\n  for (var i = 0; i < keys.length; i++) {\n    var key = keys[i];\n    var actionCreator = actionCreators[key];\n\n    if (typeof actionCreator === 'function') {\n      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);\n    }\n  }\n\n  return boundActionCreators;\n}\n\nfunction _defineProperty(obj, key, value) {\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n\n  return obj;\n}\n\nfunction _objectSpread(target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = arguments[i] != null ? arguments[i] : {};\n    var ownKeys = Object.keys(source);\n\n    if (typeof Object.getOwnPropertySymbols === 'function') {\n      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {\n        return Object.getOwnPropertyDescriptor(source, sym).enumerable;\n      }));\n    }\n\n    ownKeys.forEach(function (key) {\n      _defineProperty(target, key, source[key]);\n    });\n  }\n\n  return target;\n}\n\n/**\n * Composes single-argument functions from right to left. The rightmost\n * function can take multiple arguments as it provides the signature for\n * the resulting composite function.\n *\n * @param {...Function} funcs The functions to compose.\n * @returns {Function} A function obtained by composing the argument functions\n * from right to left. For example, compose(f, g, h) is identical to doing\n * (...args) => f(g(h(...args))).\n */\nfunction compose() {\n  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {\n    funcs[_key] = arguments[_key];\n  }\n\n  if (funcs.length === 0) {\n    return function (arg) {\n      return arg;\n    };\n  }\n\n  if (funcs.length === 1) {\n    return funcs[0];\n  }\n\n  return funcs.reduce(function (a, b) {\n    return function () {\n      return a(b.apply(void 0, arguments));\n    };\n  });\n}\n\n/**\n * Creates a store enhancer that applies middleware to the dispatch method\n * of the Redux store. This is handy for a variety of tasks, such as expressing\n * asynchronous actions in a concise manner, or logging every action payload.\n *\n * See `redux-thunk` package as an example of the Redux middleware.\n *\n * Because middleware is potentially asynchronous, this should be the first\n * store enhancer in the composition chain.\n *\n * Note that each middleware will be given the `dispatch` and `getState` functions\n * as named arguments.\n *\n * @param {...Function} middlewares The middleware chain to be applied.\n * @returns {Function} A store enhancer applying the middleware.\n */\n\nfunction applyMiddleware() {\n  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {\n    middlewares[_key] = arguments[_key];\n  }\n\n  return function (createStore) {\n    return function () {\n      var store = createStore.apply(void 0, arguments);\n\n      var _dispatch = function dispatch() {\n        throw new Error(\"Dispatching while constructing your middleware is not allowed. \" + \"Other middleware would not be applied to this dispatch.\");\n      };\n\n      var middlewareAPI = {\n        getState: store.getState,\n        dispatch: function dispatch() {\n          return _dispatch.apply(void 0, arguments);\n        }\n      };\n      var chain = middlewares.map(function (middleware) {\n        return middleware(middlewareAPI);\n      });\n      _dispatch = compose.apply(void 0, chain)(store.dispatch);\n      return _objectSpread({}, store, {\n        dispatch: _dispatch\n      });\n    };\n  };\n}\n\n/*\n * This is a dummy function to check if the function name has been altered by minification.\n * If the function has been minified and NODE_ENV !== 'production', warn the user.\n */\n\nfunction isCrushed() {}\n\nif (false) {}\n\n\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/redux/es/redux.js?");

/***/ }),

/***/ "./node_modules/shallowequal/index.js":
/*!********************************************!*\
  !*** ./node_modules/shallowequal/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//\n\nmodule.exports = function shallowEqual(objA, objB, compare, compareContext) {\n  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;\n\n  if (ret !== void 0) {\n    return !!ret;\n  }\n\n  if (objA === objB) {\n    return true;\n  }\n\n  if (typeof objA !== \"object\" || !objA || typeof objB !== \"object\" || !objB) {\n    return false;\n  }\n\n  var keysA = Object.keys(objA);\n  var keysB = Object.keys(objB);\n\n  if (keysA.length !== keysB.length) {\n    return false;\n  }\n\n  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);\n\n  // Test for A's keys different from B.\n  for (var idx = 0; idx < keysA.length; idx++) {\n    var key = keysA[idx];\n\n    if (!bHasOwnProperty(key)) {\n      return false;\n    }\n\n    var valueA = objA[key];\n    var valueB = objB[key];\n\n    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;\n\n    if (ret === false || (ret === void 0 && valueA !== valueB)) {\n      return false;\n    }\n  }\n\n  return true;\n};\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/shallowequal/index.js?");

/***/ }),

/***/ "./node_modules/symbol-observable/es/index.js":
/*!****************************************************!*\
  !*** ./node_modules/symbol-observable/es/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var _ponyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ponyfill.js */ \"./node_modules/symbol-observable/es/ponyfill.js\");\n/* global window */\n\n\nvar root;\n\nif (typeof self !== 'undefined') {\n  root = self;\n} else if (typeof window !== 'undefined') {\n  root = window;\n} else if (typeof global !== 'undefined') {\n  root = global;\n} else if (true) {\n  root = module;\n} else {}\n\nvar result = Object(_ponyfill_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(root);\n/* harmony default export */ __webpack_exports__[\"default\"] = (result);\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\"), __webpack_require__(/*! ./../../webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack://ReactDnD/./node_modules/symbol-observable/es/index.js?");

/***/ }),

/***/ "./node_modules/symbol-observable/es/ponyfill.js":
/*!*******************************************************!*\
  !*** ./node_modules/symbol-observable/es/ponyfill.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return symbolObservablePonyfill; });\nfunction symbolObservablePonyfill(root) {\n\tvar result;\n\tvar Symbol = root.Symbol;\n\n\tif (typeof Symbol === 'function') {\n\t\tif (Symbol.observable) {\n\t\t\tresult = Symbol.observable;\n\t\t} else {\n\t\t\tresult = Symbol('observable');\n\t\t\tSymbol.observable = result;\n\t\t}\n\t} else {\n\t\tresult = '@@observable';\n\t}\n\n\treturn result;\n};\n\n\n//# sourceURL=webpack://ReactDnD/./node_modules/symbol-observable/es/ponyfill.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack://ReactDnD/(webpack)/buildin/global.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(originalModule) {\n\tif (!originalModule.webpackPolyfill) {\n\t\tvar module = Object.create(originalModule);\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"exports\", {\n\t\t\tenumerable: true\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack://ReactDnD/(webpack)/buildin/harmony-module.js?");

/***/ }),

/***/ "./src/DragDropContext.tsx":
/*!*********************************!*\
  !*** ./src/DragDropContext.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"react\");\nvar dnd_core_1 = __webpack_require__(/*! dnd-core */ \"../dnd-core/lib/cjs/index.js\");\nvar checkDecoratorArguments_1 = __webpack_require__(/*! ./utils/checkDecoratorArguments */ \"./src/utils/checkDecoratorArguments.ts\");\nvar isRefable_1 = __webpack_require__(/*! ./utils/isRefable */ \"./src/utils/isRefable.ts\");\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\nvar hoistStatics = __webpack_require__(/*! hoist-non-react-statics */ \"./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js\");\n/**\n * Create the React Context\n */\nexports.context = React.createContext({\n    dragDropManager: undefined,\n});\nexports.Consumer = exports.context.Consumer, exports.Provider = exports.context.Provider;\n/**\n * Creates the context object we're providing\n * @param backend\n * @param context\n */\nfunction createChildContext(backend, context, debugMode) {\n    return {\n        dragDropManager: dnd_core_1.createDragDropManager(backend, context, debugMode),\n    };\n}\nexports.createChildContext = createChildContext;\n/**\n * A React component that provides the React-DnD context\n */\nexports.DragDropContextProvider = function (_a) {\n    var backend = _a.backend, context = _a.context, debugMode = _a.debugMode, children = _a.children;\n    var contextValue = createChildContext(backend, context, debugMode);\n    return React.createElement(exports.Provider, { value: contextValue }, children);\n};\n/**\n * Wrap the root component of your application with DragDropContext decorator to set up React DnD.\n * This lets you specify the backend, and sets up the shared DnD state behind the scenes.\n * @param backendFactory The DnD backend factory\n * @param backendContext The backend context\n */\nfunction DragDropContext(backendFactory, backendContext, debugMode) {\n    checkDecoratorArguments_1.default('DragDropContext', 'backend', backendFactory);\n    var childContext = createChildContext(backendFactory, backendContext, debugMode);\n    return function decorateContext(DecoratedComponent) {\n        var Decorated = DecoratedComponent;\n        var displayName = Decorated.displayName || Decorated.name || 'Component';\n        var DragDropContextContainer = /** @class */ (function (_super) {\n            __extends(DragDropContextContainer, _super);\n            function DragDropContextContainer() {\n                var _this = _super !== null && _super.apply(this, arguments) || this;\n                _this.ref = React.createRef();\n                _this.getManager = function () { return childContext.dragDropManager; };\n                return _this;\n            }\n            DragDropContextContainer.prototype.getDecoratedComponentInstance = function () {\n                invariant(this.ref.current, 'In order to access an instance of the decorated component, it must either be a class component or use React.forwardRef()');\n                return this.ref.current;\n            };\n            DragDropContextContainer.prototype.render = function () {\n                return (React.createElement(exports.Provider, { value: childContext },\n                    React.createElement(Decorated, __assign({}, this.props, { ref: isRefable_1.isRefable(Decorated) ? this.ref : null }))));\n            };\n            DragDropContextContainer.DecoratedComponent = DecoratedComponent;\n            DragDropContextContainer.displayName = \"DragDropContext(\" + displayName + \")\";\n            return DragDropContextContainer;\n        }(React.Component));\n        return hoistStatics(DragDropContextContainer, DecoratedComponent);\n    };\n}\nexports.DragDropContext = DragDropContext;\n\n\n//# sourceURL=webpack://ReactDnD/./src/DragDropContext.tsx?");

/***/ }),

/***/ "./src/DragLayer.tsx":
/*!***************************!*\
  !*** ./src/DragLayer.tsx ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"react\");\nvar checkDecoratorArguments_1 = __webpack_require__(/*! ./utils/checkDecoratorArguments */ \"./src/utils/checkDecoratorArguments.ts\");\nvar DragDropContext_1 = __webpack_require__(/*! ./DragDropContext */ \"./src/DragDropContext.tsx\");\nvar isRefable_1 = __webpack_require__(/*! ./utils/isRefable */ \"./src/utils/isRefable.ts\");\nvar hoistStatics = __webpack_require__(/*! hoist-non-react-statics */ \"./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js\");\nvar isPlainObject = __webpack_require__(/*! lodash/isPlainObject */ \"./node_modules/lodash/isPlainObject.js\");\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\nvar shallowEqual = __webpack_require__(/*! shallowequal */ \"./node_modules/shallowequal/index.js\");\nfunction DragLayer(collect, options) {\n    if (options === void 0) { options = {}; }\n    checkDecoratorArguments_1.default('DragLayer', 'collect[, options]', collect, options);\n    invariant(typeof collect === 'function', 'Expected \"collect\" provided as the first argument to DragLayer to be a function that collects props to inject into the component. ', 'Instead, received %s. Read more: http://react-dnd.github.io/react-dnd/docs-drag-layer.html', collect);\n    invariant(isPlainObject(options), 'Expected \"options\" provided as the second argument to DragLayer to be a plain object when specified. ' +\n        'Instead, received %s. Read more: http://react-dnd.github.io/react-dnd/docs-drag-layer.html', options);\n    return function decorateLayer(DecoratedComponent) {\n        var Decorated = DecoratedComponent;\n        var _a = options.arePropsEqual, arePropsEqual = _a === void 0 ? shallowEqual : _a;\n        var displayName = Decorated.displayName || Decorated.name || 'Component';\n        var DragLayerContainer = /** @class */ (function (_super) {\n            __extends(DragLayerContainer, _super);\n            function DragLayerContainer() {\n                var _this = _super !== null && _super.apply(this, arguments) || this;\n                _this.isCurrentlyMounted = false;\n                _this.ref = React.createRef();\n                _this.handleChange = function () {\n                    if (!_this.isCurrentlyMounted) {\n                        return;\n                    }\n                    var nextState = _this.getCurrentState();\n                    if (!shallowEqual(nextState, _this.state)) {\n                        _this.setState(nextState);\n                    }\n                };\n                return _this;\n            }\n            DragLayerContainer.prototype.getDecoratedComponentInstance = function () {\n                invariant(this.ref.current, 'In order to access an instance of the decorated component, it must either be a class component or use React.forwardRef()');\n                return this.ref.current;\n            };\n            DragLayerContainer.prototype.shouldComponentUpdate = function (nextProps, nextState) {\n                return (!arePropsEqual(nextProps, this.props) ||\n                    !shallowEqual(nextState, this.state));\n            };\n            DragLayerContainer.prototype.componentDidMount = function () {\n                this.isCurrentlyMounted = true;\n                this.handleChange();\n            };\n            DragLayerContainer.prototype.componentWillUnmount = function () {\n                this.isCurrentlyMounted = false;\n                if (this.unsubscribeFromOffsetChange) {\n                    this.unsubscribeFromOffsetChange();\n                    this.unsubscribeFromOffsetChange = undefined;\n                }\n                if (this.unsubscribeFromStateChange) {\n                    this.unsubscribeFromStateChange();\n                    this.unsubscribeFromStateChange = undefined;\n                }\n            };\n            DragLayerContainer.prototype.render = function () {\n                var _this = this;\n                return (React.createElement(DragDropContext_1.Consumer, null, function (_a) {\n                    var dragDropManager = _a.dragDropManager;\n                    if (dragDropManager === undefined) {\n                        return null;\n                    }\n                    _this.receiveDragDropManager(dragDropManager);\n                    // Let componentDidMount fire to initialize the collected state\n                    if (!_this.isCurrentlyMounted) {\n                        return null;\n                    }\n                    return (React.createElement(Decorated, __assign({}, _this.props, _this.state, { ref: isRefable_1.isRefable(Decorated) ? _this.ref : null })));\n                }));\n            };\n            DragLayerContainer.prototype.receiveDragDropManager = function (dragDropManager) {\n                if (this.manager !== undefined) {\n                    return;\n                }\n                this.manager = dragDropManager;\n                invariant(typeof dragDropManager === 'object', 'Could not find the drag and drop manager in the context of %s. ' +\n                    'Make sure to wrap the top-level component of your app with DragDropContext. ' +\n                    'Read more: http://react-dnd.github.io/react-dnd/docs-troubleshooting.html#could-not-find-the-drag-and-drop-manager-in-the-context', displayName, displayName);\n                var monitor = this.manager.getMonitor();\n                this.unsubscribeFromOffsetChange = monitor.subscribeToOffsetChange(this.handleChange);\n                this.unsubscribeFromStateChange = monitor.subscribeToStateChange(this.handleChange);\n            };\n            DragLayerContainer.prototype.getCurrentState = function () {\n                if (!this.manager) {\n                    return {};\n                }\n                var monitor = this.manager.getMonitor();\n                return collect(monitor, this.props);\n            };\n            DragLayerContainer.displayName = \"DragLayer(\" + displayName + \")\";\n            DragLayerContainer.DecoratedComponent = DecoratedComponent;\n            return DragLayerContainer;\n        }(React.Component));\n        return hoistStatics(DragLayerContainer, DecoratedComponent);\n    };\n}\nexports.default = DragLayer;\n\n\n//# sourceURL=webpack://ReactDnD/./src/DragLayer.tsx?");

/***/ }),

/***/ "./src/DragPreviewImage.tsx":
/*!**********************************!*\
  !*** ./src/DragPreviewImage.tsx ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"react\");\n/*\n * A utility for rendering a drag preview image\n */\nvar DragPreviewImage = React.memo(function (_a) {\n    var connect = _a.connect, src = _a.src;\n    if (typeof Image !== 'undefined') {\n        var img_1 = new Image();\n        img_1.src = src;\n        img_1.onload = function () { return connect(img_1); };\n    }\n    return null;\n});\nexports.default = DragPreviewImage;\n\n\n//# sourceURL=webpack://ReactDnD/./src/DragPreviewImage.tsx?");

/***/ }),

/***/ "./src/DragSource.ts":
/*!***************************!*\
  !*** ./src/DragSource.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar checkDecoratorArguments_1 = __webpack_require__(/*! ./utils/checkDecoratorArguments */ \"./src/utils/checkDecoratorArguments.ts\");\nvar decorateHandler_1 = __webpack_require__(/*! ./decorateHandler */ \"./src/decorateHandler.tsx\");\nvar registerSource_1 = __webpack_require__(/*! ./registerSource */ \"./src/registerSource.ts\");\nvar createSourceFactory_1 = __webpack_require__(/*! ./createSourceFactory */ \"./src/createSourceFactory.ts\");\nvar DragSourceMonitorImpl_1 = __webpack_require__(/*! ./DragSourceMonitorImpl */ \"./src/DragSourceMonitorImpl.ts\");\nvar SourceConnector_1 = __webpack_require__(/*! ./SourceConnector */ \"./src/SourceConnector.ts\");\nvar isValidType_1 = __webpack_require__(/*! ./utils/isValidType */ \"./src/utils/isValidType.ts\");\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\nvar isPlainObject = __webpack_require__(/*! lodash/isPlainObject */ \"./node_modules/lodash/isPlainObject.js\");\n/**\n * Decorates a component as a dragsource\n * @param type The dragsource type\n * @param spec The drag source specification\n * @param collect The props collector function\n * @param options DnD options\n */\nfunction DragSource(type, spec, collect, options) {\n    if (options === void 0) { options = {}; }\n    checkDecoratorArguments_1.default('DragSource', 'type, spec, collect[, options]', type, spec, collect, options);\n    var getType = type;\n    if (typeof type !== 'function') {\n        invariant(isValidType_1.default(type), 'Expected \"type\" provided as the first argument to DragSource to be ' +\n            'a string, or a function that returns a string given the current props. ' +\n            'Instead, received %s. ' +\n            'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', type);\n        getType = function () { return type; };\n    }\n    invariant(isPlainObject(spec), 'Expected \"spec\" provided as the second argument to DragSource to be ' +\n        'a plain object. Instead, received %s. ' +\n        'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', spec);\n    var createSource = createSourceFactory_1.default(spec);\n    invariant(typeof collect === 'function', 'Expected \"collect\" provided as the third argument to DragSource to be ' +\n        'a function that returns a plain object of props to inject. ' +\n        'Instead, received %s. ' +\n        'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', collect);\n    invariant(isPlainObject(options), 'Expected \"options\" provided as the fourth argument to DragSource to be ' +\n        'a plain object when specified. ' +\n        'Instead, received %s. ' +\n        'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', collect);\n    return function decorateSource(DecoratedComponent) {\n        return decorateHandler_1.default({\n            containerDisplayName: 'DragSource',\n            createHandler: createSource,\n            registerHandler: registerSource_1.default,\n            createConnector: function (backend) { return new SourceConnector_1.default(backend); },\n            createMonitor: function (manager) {\n                return new DragSourceMonitorImpl_1.default(manager);\n            },\n            DecoratedComponent: DecoratedComponent,\n            getType: getType,\n            collect: collect,\n            options: options,\n        });\n    };\n}\nexports.default = DragSource;\n\n\n//# sourceURL=webpack://ReactDnD/./src/DragSource.ts?");

/***/ }),

/***/ "./src/DragSourceMonitorImpl.ts":
/*!**************************************!*\
  !*** ./src/DragSourceMonitorImpl.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\nvar isCallingCanDrag = false;\nvar isCallingIsDragging = false;\nvar DragSourceMonitorImpl = /** @class */ (function () {\n    function DragSourceMonitorImpl(manager) {\n        this.sourceId = null;\n        this.internalMonitor = manager.getMonitor();\n    }\n    DragSourceMonitorImpl.prototype.receiveHandlerId = function (sourceId) {\n        this.sourceId = sourceId;\n    };\n    DragSourceMonitorImpl.prototype.getHandlerId = function () {\n        return this.sourceId;\n    };\n    DragSourceMonitorImpl.prototype.canDrag = function () {\n        invariant(!isCallingCanDrag, 'You may not call monitor.canDrag() inside your canDrag() implementation. ' +\n            'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html');\n        try {\n            isCallingCanDrag = true;\n            return this.internalMonitor.canDragSource(this.sourceId);\n        }\n        finally {\n            isCallingCanDrag = false;\n        }\n    };\n    DragSourceMonitorImpl.prototype.isDragging = function () {\n        invariant(!isCallingIsDragging, 'You may not call monitor.isDragging() inside your isDragging() implementation. ' +\n            'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source-monitor.html');\n        try {\n            isCallingIsDragging = true;\n            return this.internalMonitor.isDraggingSource(this.sourceId);\n        }\n        finally {\n            isCallingIsDragging = false;\n        }\n    };\n    DragSourceMonitorImpl.prototype.subscribeToStateChange = function (listener, options) {\n        return this.internalMonitor.subscribeToStateChange(listener, options);\n    };\n    DragSourceMonitorImpl.prototype.isDraggingSource = function (sourceId) {\n        return this.internalMonitor.isDraggingSource(sourceId);\n    };\n    DragSourceMonitorImpl.prototype.isOverTarget = function (targetId, options) {\n        return this.internalMonitor.isOverTarget(targetId, options);\n    };\n    DragSourceMonitorImpl.prototype.getTargetIds = function () {\n        return this.internalMonitor.getTargetIds();\n    };\n    DragSourceMonitorImpl.prototype.isSourcePublic = function () {\n        return this.internalMonitor.isSourcePublic();\n    };\n    DragSourceMonitorImpl.prototype.getSourceId = function () {\n        return this.internalMonitor.getSourceId();\n    };\n    DragSourceMonitorImpl.prototype.subscribeToOffsetChange = function (listener) {\n        return this.internalMonitor.subscribeToOffsetChange(listener);\n    };\n    DragSourceMonitorImpl.prototype.canDragSource = function (sourceId) {\n        return this.internalMonitor.canDragSource(sourceId);\n    };\n    DragSourceMonitorImpl.prototype.canDropOnTarget = function (targetId) {\n        return this.internalMonitor.canDropOnTarget(targetId);\n    };\n    DragSourceMonitorImpl.prototype.getItemType = function () {\n        return this.internalMonitor.getItemType();\n    };\n    DragSourceMonitorImpl.prototype.getItem = function () {\n        return this.internalMonitor.getItem();\n    };\n    DragSourceMonitorImpl.prototype.getDropResult = function () {\n        return this.internalMonitor.getDropResult();\n    };\n    DragSourceMonitorImpl.prototype.didDrop = function () {\n        return this.internalMonitor.didDrop();\n    };\n    DragSourceMonitorImpl.prototype.getInitialClientOffset = function () {\n        return this.internalMonitor.getInitialClientOffset();\n    };\n    DragSourceMonitorImpl.prototype.getInitialSourceClientOffset = function () {\n        return this.internalMonitor.getInitialSourceClientOffset();\n    };\n    DragSourceMonitorImpl.prototype.getSourceClientOffset = function () {\n        return this.internalMonitor.getSourceClientOffset();\n    };\n    DragSourceMonitorImpl.prototype.getClientOffset = function () {\n        return this.internalMonitor.getClientOffset();\n    };\n    DragSourceMonitorImpl.prototype.getDifferenceFromInitialOffset = function () {\n        return this.internalMonitor.getDifferenceFromInitialOffset();\n    };\n    return DragSourceMonitorImpl;\n}());\nexports.default = DragSourceMonitorImpl;\n\n\n//# sourceURL=webpack://ReactDnD/./src/DragSourceMonitorImpl.ts?");

/***/ }),

/***/ "./src/DropTarget.ts":
/*!***************************!*\
  !*** ./src/DropTarget.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar checkDecoratorArguments_1 = __webpack_require__(/*! ./utils/checkDecoratorArguments */ \"./src/utils/checkDecoratorArguments.ts\");\nvar decorateHandler_1 = __webpack_require__(/*! ./decorateHandler */ \"./src/decorateHandler.tsx\");\nvar registerTarget_1 = __webpack_require__(/*! ./registerTarget */ \"./src/registerTarget.ts\");\nvar createTargetFactory_1 = __webpack_require__(/*! ./createTargetFactory */ \"./src/createTargetFactory.ts\");\nvar isValidType_1 = __webpack_require__(/*! ./utils/isValidType */ \"./src/utils/isValidType.ts\");\nvar DropTargetMonitorImpl_1 = __webpack_require__(/*! ./DropTargetMonitorImpl */ \"./src/DropTargetMonitorImpl.ts\");\nvar TargetConnector_1 = __webpack_require__(/*! ./TargetConnector */ \"./src/TargetConnector.ts\");\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\nvar isPlainObject = __webpack_require__(/*! lodash/isPlainObject */ \"./node_modules/lodash/isPlainObject.js\");\nfunction DropTarget(type, spec, collect, options) {\n    if (options === void 0) { options = {}; }\n    checkDecoratorArguments_1.default('DropTarget', 'type, spec, collect[, options]', type, spec, collect, options);\n    var getType = type;\n    if (typeof type !== 'function') {\n        invariant(isValidType_1.default(type, true), 'Expected \"type\" provided as the first argument to DropTarget to be ' +\n            'a string, an array of strings, or a function that returns either given ' +\n            'the current props. Instead, received %s. ' +\n            'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html', type);\n        getType = function () { return type; };\n    }\n    invariant(isPlainObject(spec), 'Expected \"spec\" provided as the second argument to DropTarget to be ' +\n        'a plain object. Instead, received %s. ' +\n        'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html', spec);\n    var createTarget = createTargetFactory_1.default(spec);\n    invariant(typeof collect === 'function', 'Expected \"collect\" provided as the third argument to DropTarget to be ' +\n        'a function that returns a plain object of props to inject. ' +\n        'Instead, received %s. ' +\n        'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html', collect);\n    invariant(isPlainObject(options), 'Expected \"options\" provided as the fourth argument to DropTarget to be ' +\n        'a plain object when specified. ' +\n        'Instead, received %s. ' +\n        'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html', collect);\n    return function decorateTarget(DecoratedComponent) {\n        return decorateHandler_1.default({\n            containerDisplayName: 'DropTarget',\n            createHandler: createTarget,\n            registerHandler: registerTarget_1.default,\n            createMonitor: function (manager) {\n                return new DropTargetMonitorImpl_1.default(manager);\n            },\n            createConnector: function (backend) { return new TargetConnector_1.default(backend); },\n            DecoratedComponent: DecoratedComponent,\n            getType: getType,\n            collect: collect,\n            options: options,\n        });\n    };\n}\nexports.default = DropTarget;\n\n\n//# sourceURL=webpack://ReactDnD/./src/DropTarget.ts?");

/***/ }),

/***/ "./src/DropTargetMonitorImpl.ts":
/*!**************************************!*\
  !*** ./src/DropTargetMonitorImpl.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\nvar isCallingCanDrop = false;\nvar DropTargetMonitorImpl = /** @class */ (function () {\n    function DropTargetMonitorImpl(manager) {\n        this.targetId = null;\n        this.internalMonitor = manager.getMonitor();\n    }\n    DropTargetMonitorImpl.prototype.receiveHandlerId = function (targetId) {\n        this.targetId = targetId;\n    };\n    DropTargetMonitorImpl.prototype.getHandlerId = function () {\n        return this.targetId;\n    };\n    DropTargetMonitorImpl.prototype.subscribeToStateChange = function (listener, options) {\n        return this.internalMonitor.subscribeToStateChange(listener, options);\n    };\n    DropTargetMonitorImpl.prototype.canDrop = function () {\n        invariant(!isCallingCanDrop, 'You may not call monitor.canDrop() inside your canDrop() implementation. ' +\n            'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target-monitor.html');\n        try {\n            isCallingCanDrop = true;\n            return this.internalMonitor.canDropOnTarget(this.targetId);\n        }\n        finally {\n            isCallingCanDrop = false;\n        }\n    };\n    DropTargetMonitorImpl.prototype.isOver = function (options) {\n        return this.internalMonitor.isOverTarget(this.targetId, options);\n    };\n    DropTargetMonitorImpl.prototype.getItemType = function () {\n        return this.internalMonitor.getItemType();\n    };\n    DropTargetMonitorImpl.prototype.getItem = function () {\n        return this.internalMonitor.getItem();\n    };\n    DropTargetMonitorImpl.prototype.getDropResult = function () {\n        return this.internalMonitor.getDropResult();\n    };\n    DropTargetMonitorImpl.prototype.didDrop = function () {\n        return this.internalMonitor.didDrop();\n    };\n    DropTargetMonitorImpl.prototype.getInitialClientOffset = function () {\n        return this.internalMonitor.getInitialClientOffset();\n    };\n    DropTargetMonitorImpl.prototype.getInitialSourceClientOffset = function () {\n        return this.internalMonitor.getInitialSourceClientOffset();\n    };\n    DropTargetMonitorImpl.prototype.getSourceClientOffset = function () {\n        return this.internalMonitor.getSourceClientOffset();\n    };\n    DropTargetMonitorImpl.prototype.getClientOffset = function () {\n        return this.internalMonitor.getClientOffset();\n    };\n    DropTargetMonitorImpl.prototype.getDifferenceFromInitialOffset = function () {\n        return this.internalMonitor.getDifferenceFromInitialOffset();\n    };\n    return DropTargetMonitorImpl;\n}());\nexports.default = DropTargetMonitorImpl;\n\n\n//# sourceURL=webpack://ReactDnD/./src/DropTargetMonitorImpl.ts?");

/***/ }),

/***/ "./src/SourceConnector.ts":
/*!********************************!*\
  !*** ./src/SourceConnector.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar wrapConnectorHooks_1 = __webpack_require__(/*! ./wrapConnectorHooks */ \"./src/wrapConnectorHooks.ts\");\nvar isRef_1 = __webpack_require__(/*! ./utils/isRef */ \"./src/utils/isRef.ts\");\nvar shallowEqual = __webpack_require__(/*! shallowequal */ \"./node_modules/shallowequal/index.js\");\nvar SourceConnector = /** @class */ (function () {\n    function SourceConnector(backend) {\n        var _this = this;\n        this.backend = backend;\n        this.hooks = wrapConnectorHooks_1.default({\n            dragSource: function (node, options) {\n                _this.dragSourceOptions = options || null;\n                if (isRef_1.isRef(node)) {\n                    _this.dragSourceRef = node;\n                }\n                else {\n                    _this.dragSourceNode = node;\n                }\n                _this.reconnectDragSource();\n            },\n            dragPreview: function (node, options) {\n                _this.dragPreviewOptions = options || null;\n                if (isRef_1.isRef(node)) {\n                    _this.dragPreviewRef = node;\n                }\n                else {\n                    _this.dragPreviewNode = node;\n                }\n                _this.reconnectDragPreview();\n            },\n        });\n        this.handlerId = null;\n        // The drop target may either be attached via ref or connect function\n        this.dragSourceRef = null;\n        this.dragSourceOptionsInternal = null;\n        // The drag preview may either be attached via ref or connect function\n        this.dragPreviewRef = null;\n        this.dragPreviewOptionsInternal = null;\n        this.lastConnectedHandlerId = null;\n        this.lastConnectedDragSource = null;\n        this.lastConnectedDragSourceOptions = null;\n        this.lastConnectedDragPreview = null;\n        this.lastConnectedDragPreviewOptions = null;\n    }\n    SourceConnector.prototype.receiveHandlerId = function (newHandlerId) {\n        if (this.handlerId === newHandlerId) {\n            return;\n        }\n        this.handlerId = newHandlerId;\n        this.reconnect();\n    };\n    Object.defineProperty(SourceConnector.prototype, \"connectTarget\", {\n        get: function () {\n            return this.dragSource;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(SourceConnector.prototype, \"dragSourceOptions\", {\n        get: function () {\n            return this.dragSourceOptionsInternal;\n        },\n        set: function (options) {\n            this.dragSourceOptionsInternal = options;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(SourceConnector.prototype, \"dragPreviewOptions\", {\n        get: function () {\n            return this.dragPreviewOptionsInternal;\n        },\n        set: function (options) {\n            this.dragPreviewOptionsInternal = options;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    SourceConnector.prototype.reconnect = function () {\n        this.reconnectDragSource();\n        this.reconnectDragPreview();\n    };\n    SourceConnector.prototype.reconnectDragSource = function () {\n        var dragSource = this.dragSource;\n        if (!this.handlerId || !dragSource) {\n            return;\n        }\n        // if nothing has changed then don't resubscribe\n        if (this.didHandlerIdChange() ||\n            this.didConnectedDragSourceChange() ||\n            this.didDragSourceOptionsChange()) {\n            this.disconnectDragSource();\n            this.lastConnectedHandlerId = this.handlerId;\n            this.lastConnectedDragSource = dragSource;\n            this.lastConnectedDragSourceOptions = this.dragSourceOptions;\n            this.dragSourceUnsubscribe = this.backend.connectDragSource(this.handlerId, dragSource, this.dragSourceOptions);\n        }\n    };\n    SourceConnector.prototype.reconnectDragPreview = function () {\n        var dragPreview = this.dragPreview;\n        if (!this.handlerId || !dragPreview) {\n            return;\n        }\n        // if nothing has changed then don't resubscribe\n        if (this.didHandlerIdChange() ||\n            this.didConnectedDragPreviewChange() ||\n            this.didDragPreviewOptionsChange()) {\n            this.disconnectDragPreview();\n            this.lastConnectedHandlerId = this.handlerId;\n            this.lastConnectedDragPreview = dragPreview;\n            this.lastConnectedDragPreviewOptions = this.dragPreviewOptions;\n            this.dragPreviewUnsubscribe = this.backend.connectDragPreview(this.handlerId, dragPreview, this.dragPreviewOptions);\n        }\n    };\n    SourceConnector.prototype.didHandlerIdChange = function () {\n        return this.lastConnectedHandlerId !== this.handlerId;\n    };\n    SourceConnector.prototype.didConnectedDragSourceChange = function () {\n        return this.lastConnectedDragSource !== this.dragSource;\n    };\n    SourceConnector.prototype.didConnectedDragPreviewChange = function () {\n        return this.lastConnectedDragPreview !== this.dragPreview;\n    };\n    SourceConnector.prototype.didDragSourceOptionsChange = function () {\n        return !shallowEqual(this.lastConnectedDragSourceOptions, this.dragSourceOptions);\n    };\n    SourceConnector.prototype.didDragPreviewOptionsChange = function () {\n        return !shallowEqual(this.lastConnectedDragPreviewOptions, this.dragPreviewOptions);\n    };\n    SourceConnector.prototype.disconnectDragSource = function () {\n        if (this.dragSourceUnsubscribe) {\n            this.dragSourceUnsubscribe();\n            this.dragSourceUnsubscribe = undefined;\n            this.dragPreviewNode = null;\n            this.dragPreviewRef = null;\n        }\n    };\n    SourceConnector.prototype.disconnectDragPreview = function () {\n        if (this.dragPreviewUnsubscribe) {\n            this.dragPreviewUnsubscribe();\n            this.dragPreviewUnsubscribe = undefined;\n            this.dragPreviewNode = null;\n            this.dragPreviewRef = null;\n        }\n    };\n    Object.defineProperty(SourceConnector.prototype, \"dragSource\", {\n        get: function () {\n            return (this.dragSourceNode || (this.dragSourceRef && this.dragSourceRef.current));\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(SourceConnector.prototype, \"dragPreview\", {\n        get: function () {\n            return (this.dragPreviewNode ||\n                (this.dragPreviewRef && this.dragPreviewRef.current));\n        },\n        enumerable: true,\n        configurable: true\n    });\n    return SourceConnector;\n}());\nexports.default = SourceConnector;\n\n\n//# sourceURL=webpack://ReactDnD/./src/SourceConnector.ts?");

/***/ }),

/***/ "./src/TargetConnector.ts":
/*!********************************!*\
  !*** ./src/TargetConnector.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar wrapConnectorHooks_1 = __webpack_require__(/*! ./wrapConnectorHooks */ \"./src/wrapConnectorHooks.ts\");\nvar isRef_1 = __webpack_require__(/*! ./utils/isRef */ \"./src/utils/isRef.ts\");\nvar shallowEqual = __webpack_require__(/*! shallowequal */ \"./node_modules/shallowequal/index.js\");\nvar TargetConnector = /** @class */ (function () {\n    function TargetConnector(backend) {\n        var _this = this;\n        this.backend = backend;\n        this.hooks = wrapConnectorHooks_1.default({\n            dropTarget: function (node, options) {\n                _this.dropTargetOptions = options;\n                if (isRef_1.isRef(node)) {\n                    _this.dropTargetRef = node;\n                }\n                else {\n                    _this.dropTargetNode = node;\n                }\n                _this.reconnect();\n            },\n        });\n        this.handlerId = null;\n        // The drop target may either be attached via ref or connect function\n        this.dropTargetRef = null;\n        this.dropTargetOptionsInternal = null;\n        this.lastConnectedHandlerId = null;\n        this.lastConnectedDropTarget = null;\n        this.lastConnectedDropTargetOptions = null;\n    }\n    Object.defineProperty(TargetConnector.prototype, \"connectTarget\", {\n        get: function () {\n            return this.dropTarget;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    TargetConnector.prototype.reconnect = function () {\n        var dropTarget = this.dropTarget;\n        if (!this.handlerId || !dropTarget) {\n            return;\n        }\n        // if nothing has changed then don't resubscribe\n        if (this.didHandlerIdChange() ||\n            this.didDropTargetChange() ||\n            this.didOptionsChange()) {\n            this.disconnectDropTarget();\n            this.lastConnectedHandlerId = this.handlerId;\n            this.lastConnectedDropTarget = dropTarget;\n            this.lastConnectedDropTargetOptions = this.dropTargetOptions;\n            this.unsubscribeDropTarget = this.backend.connectDropTarget(this.handlerId, dropTarget, this.dropTargetOptions);\n        }\n    };\n    TargetConnector.prototype.receiveHandlerId = function (newHandlerId) {\n        if (newHandlerId === this.handlerId) {\n            return;\n        }\n        this.handlerId = newHandlerId;\n        this.reconnect();\n    };\n    Object.defineProperty(TargetConnector.prototype, \"dropTargetOptions\", {\n        get: function () {\n            return this.dropTargetOptionsInternal;\n        },\n        set: function (options) {\n            this.dropTargetOptionsInternal = options;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    TargetConnector.prototype.didHandlerIdChange = function () {\n        return this.lastConnectedHandlerId !== this.handlerId;\n    };\n    TargetConnector.prototype.didDropTargetChange = function () {\n        return this.lastConnectedDropTarget !== this.dropTarget;\n    };\n    TargetConnector.prototype.didOptionsChange = function () {\n        return !shallowEqual(this.lastConnectedDropTargetOptions, this.dropTargetOptions);\n    };\n    TargetConnector.prototype.disconnectDropTarget = function () {\n        if (this.unsubscribeDropTarget) {\n            this.unsubscribeDropTarget();\n            this.unsubscribeDropTarget = undefined;\n        }\n    };\n    Object.defineProperty(TargetConnector.prototype, \"dropTarget\", {\n        get: function () {\n            return (this.dropTargetNode || (this.dropTargetRef && this.dropTargetRef.current));\n        },\n        enumerable: true,\n        configurable: true\n    });\n    return TargetConnector;\n}());\nexports.default = TargetConnector;\n\n\n//# sourceURL=webpack://ReactDnD/./src/TargetConnector.ts?");

/***/ }),

/***/ "./src/createSourceFactory.ts":
/*!************************************!*\
  !*** ./src/createSourceFactory.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar getDecoratedComponent_1 = __webpack_require__(/*! ./utils/getDecoratedComponent */ \"./src/utils/getDecoratedComponent.ts\");\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\nvar isPlainObject = __webpack_require__(/*! lodash/isPlainObject */ \"./node_modules/lodash/isPlainObject.js\");\nvar ALLOWED_SPEC_METHODS = ['canDrag', 'beginDrag', 'isDragging', 'endDrag'];\nvar REQUIRED_SPEC_METHODS = ['beginDrag'];\nvar SourceImpl = /** @class */ (function () {\n    function SourceImpl(spec, monitor, ref) {\n        var _this = this;\n        this.spec = spec;\n        this.monitor = monitor;\n        this.ref = ref;\n        this.props = null;\n        this.beginDrag = function () {\n            if (!_this.props) {\n                return;\n            }\n            var item = _this.spec.beginDrag(_this.props, _this.monitor, _this.ref.current);\n            if (false) {}\n            return item;\n        };\n    }\n    SourceImpl.prototype.receiveProps = function (props) {\n        this.props = props;\n    };\n    SourceImpl.prototype.canDrag = function () {\n        if (!this.props) {\n            return false;\n        }\n        if (!this.spec.canDrag) {\n            return true;\n        }\n        return this.spec.canDrag(this.props, this.monitor);\n    };\n    SourceImpl.prototype.isDragging = function (globalMonitor, sourceId) {\n        if (!this.props) {\n            return false;\n        }\n        if (!this.spec.isDragging) {\n            return sourceId === globalMonitor.getSourceId();\n        }\n        return this.spec.isDragging(this.props, this.monitor);\n    };\n    SourceImpl.prototype.endDrag = function () {\n        if (!this.props) {\n            return;\n        }\n        if (!this.spec.endDrag) {\n            return;\n        }\n        this.spec.endDrag(this.props, this.monitor, getDecoratedComponent_1.getDecoratedComponent(this.ref));\n    };\n    return SourceImpl;\n}());\nfunction createSourceFactory(spec) {\n    Object.keys(spec).forEach(function (key) {\n        invariant(ALLOWED_SPEC_METHODS.indexOf(key) > -1, 'Expected the drag source specification to only have ' +\n            'some of the following keys: %s. ' +\n            'Instead received a specification with an unexpected \"%s\" key. ' +\n            'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', ALLOWED_SPEC_METHODS.join(', '), key);\n        invariant(typeof spec[key] === 'function', 'Expected %s in the drag source specification to be a function. ' +\n            'Instead received a specification with %s: %s. ' +\n            'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', key, key, spec[key]);\n    });\n    REQUIRED_SPEC_METHODS.forEach(function (key) {\n        invariant(typeof spec[key] === 'function', 'Expected %s in the drag source specification to be a function. ' +\n            'Instead received a specification with %s: %s. ' +\n            'Read more: http://react-dnd.github.io/react-dnd/docs-drag-source.html', key, key, spec[key]);\n    });\n    return function createSource(monitor, ref) {\n        return new SourceImpl(spec, monitor, ref);\n    };\n}\nexports.default = createSourceFactory;\n\n\n//# sourceURL=webpack://ReactDnD/./src/createSourceFactory.ts?");

/***/ }),

/***/ "./src/createTargetFactory.ts":
/*!************************************!*\
  !*** ./src/createTargetFactory.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar getDecoratedComponent_1 = __webpack_require__(/*! ./utils/getDecoratedComponent */ \"./src/utils/getDecoratedComponent.ts\");\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\nvar isPlainObject = __webpack_require__(/*! lodash/isPlainObject */ \"./node_modules/lodash/isPlainObject.js\");\nvar ALLOWED_SPEC_METHODS = ['canDrop', 'hover', 'drop'];\nvar TargetImpl = /** @class */ (function () {\n    function TargetImpl(spec, monitor, ref) {\n        this.spec = spec;\n        this.monitor = monitor;\n        this.ref = ref;\n        this.props = null;\n    }\n    TargetImpl.prototype.receiveProps = function (props) {\n        this.props = props;\n    };\n    TargetImpl.prototype.receiveMonitor = function (monitor) {\n        this.monitor = monitor;\n    };\n    TargetImpl.prototype.canDrop = function () {\n        if (!this.spec.canDrop) {\n            return true;\n        }\n        return this.spec.canDrop(this.props, this.monitor);\n    };\n    TargetImpl.prototype.hover = function () {\n        if (!this.spec.hover) {\n            return;\n        }\n        this.spec.hover(this.props, this.monitor, getDecoratedComponent_1.getDecoratedComponent(this.ref));\n    };\n    TargetImpl.prototype.drop = function () {\n        if (!this.spec.drop) {\n            return undefined;\n        }\n        var dropResult = this.spec.drop(this.props, this.monitor, this.ref.current);\n        if (false) {}\n        return dropResult;\n    };\n    return TargetImpl;\n}());\nfunction createTargetFactory(spec) {\n    Object.keys(spec).forEach(function (key) {\n        invariant(ALLOWED_SPEC_METHODS.indexOf(key) > -1, 'Expected the drop target specification to only have ' +\n            'some of the following keys: %s. ' +\n            'Instead received a specification with an unexpected \"%s\" key. ' +\n            'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html', ALLOWED_SPEC_METHODS.join(', '), key);\n        invariant(typeof spec[key] === 'function', 'Expected %s in the drop target specification to be a function. ' +\n            'Instead received a specification with %s: %s. ' +\n            'Read more: http://react-dnd.github.io/react-dnd/docs-drop-target.html', key, key, spec[key]);\n    });\n    return function createTarget(monitor, ref) {\n        return new TargetImpl(spec, monitor, ref);\n    };\n}\nexports.default = createTargetFactory;\n\n\n//# sourceURL=webpack://ReactDnD/./src/createTargetFactory.ts?");

/***/ }),

/***/ "./src/decorateHandler.tsx":
/*!*********************************!*\
  !*** ./src/decorateHandler.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(/*! react */ \"react\");\nvar DragDropContext_1 = __webpack_require__(/*! ./DragDropContext */ \"./src/DragDropContext.tsx\");\nvar disposables_1 = __webpack_require__(/*! ./utils/disposables */ \"./src/utils/disposables/index.ts\");\nvar isRefable_1 = __webpack_require__(/*! ./utils/isRefable */ \"./src/utils/isRefable.ts\");\nvar isPlainObject = __webpack_require__(/*! lodash/isPlainObject */ \"./node_modules/lodash/isPlainObject.js\");\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\nvar hoistStatics = __webpack_require__(/*! hoist-non-react-statics */ \"./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js\");\nvar shallowEqual = __webpack_require__(/*! shallowequal */ \"./node_modules/shallowequal/index.js\");\nfunction decorateHandler(_a) {\n    var DecoratedComponent = _a.DecoratedComponent, createHandler = _a.createHandler, createMonitor = _a.createMonitor, createConnector = _a.createConnector, registerHandler = _a.registerHandler, containerDisplayName = _a.containerDisplayName, getType = _a.getType, collect = _a.collect, options = _a.options;\n    var _b = options.arePropsEqual, arePropsEqual = _b === void 0 ? shallowEqual : _b;\n    var Decorated = DecoratedComponent;\n    var displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';\n    var DragDropContainer = /** @class */ (function (_super) {\n        __extends(DragDropContainer, _super);\n        function DragDropContainer(props) {\n            var _this = _super.call(this, props) || this;\n            _this.decoratedRef = React.createRef();\n            _this.handleChange = function () {\n                var nextState = _this.getCurrentState();\n                if (!shallowEqual(nextState, _this.state)) {\n                    _this.setState(nextState);\n                }\n            };\n            _this.disposable = new disposables_1.SerialDisposable();\n            _this.receiveProps(props);\n            _this.dispose();\n            return _this;\n        }\n        DragDropContainer.prototype.getHandlerId = function () {\n            return this.handlerId;\n        };\n        DragDropContainer.prototype.getDecoratedComponentInstance = function () {\n            invariant(this.decoratedRef.current, 'In order to access an instance of the decorated component, it must either be a class component or use React.forwardRef()');\n            return this.decoratedRef.current;\n        };\n        DragDropContainer.prototype.shouldComponentUpdate = function (nextProps, nextState) {\n            return (!arePropsEqual(nextProps, this.props) ||\n                !shallowEqual(nextState, this.state));\n        };\n        DragDropContainer.prototype.componentDidMount = function () {\n            this.disposable = new disposables_1.SerialDisposable();\n            this.currentType = undefined;\n            this.receiveProps(this.props);\n            this.handleChange();\n        };\n        DragDropContainer.prototype.componentDidUpdate = function (prevProps) {\n            if (!arePropsEqual(this.props, prevProps)) {\n                this.receiveProps(this.props);\n                this.handleChange();\n            }\n        };\n        DragDropContainer.prototype.componentWillUnmount = function () {\n            this.dispose();\n        };\n        DragDropContainer.prototype.receiveProps = function (props) {\n            if (!this.handler) {\n                return;\n            }\n            this.handler.receiveProps(props);\n            this.receiveType(getType(props));\n        };\n        DragDropContainer.prototype.receiveType = function (type) {\n            if (!this.handlerMonitor || !this.manager || !this.handlerConnector) {\n                return;\n            }\n            if (type === this.currentType) {\n                return;\n            }\n            this.currentType = type;\n            var _a = registerHandler(type, this.handler, this.manager), handlerId = _a[0], unregister = _a[1];\n            this.handlerId = handlerId;\n            this.handlerMonitor.receiveHandlerId(handlerId);\n            this.handlerConnector.receiveHandlerId(handlerId);\n            var globalMonitor = this.manager.getMonitor();\n            var unsubscribe = globalMonitor.subscribeToStateChange(this.handleChange, { handlerIds: [handlerId] });\n            this.disposable.setDisposable(new disposables_1.CompositeDisposable(new disposables_1.Disposable(unsubscribe), new disposables_1.Disposable(unregister)));\n        };\n        DragDropContainer.prototype.dispose = function () {\n            this.disposable.dispose();\n            if (this.handlerConnector) {\n                this.handlerConnector.receiveHandlerId(null);\n            }\n        };\n        DragDropContainer.prototype.getCurrentState = function () {\n            if (!this.handlerConnector) {\n                return {};\n            }\n            var nextState = collect(this.handlerConnector.hooks, this.handlerMonitor, this.props);\n            if (false) {}\n            return nextState;\n        };\n        DragDropContainer.prototype.render = function () {\n            var _this = this;\n            return (React.createElement(DragDropContext_1.Consumer, null, function (_a) {\n                var dragDropManager = _a.dragDropManager;\n                _this.receiveDragDropManager(dragDropManager);\n                if (typeof requestAnimationFrame !== 'undefined') {\n                    requestAnimationFrame(function () { return _this.handlerConnector.reconnect(); });\n                }\n                return (React.createElement(Decorated, __assign({}, _this.props, _this.getCurrentState(), { \n                    // NOTE: if Decorated is a Function Component, decoratedRef will not be populated unless it's a refforwarding component.\n                    ref: isRefable_1.isRefable(Decorated) ? _this.decoratedRef : null })));\n            }));\n        };\n        DragDropContainer.prototype.receiveDragDropManager = function (dragDropManager) {\n            if (this.manager !== undefined) {\n                return;\n            }\n            invariant(dragDropManager !== undefined, 'Could not find the drag and drop manager in the context of %s. ' +\n                'Make sure to wrap the top-level component of your app with DragDropContext. ' +\n                'Read more: http://react-dnd.github.io/react-dnd/docs-troubleshooting.html#could-not-find-the-drag-and-drop-manager-in-the-context', displayName, displayName);\n            if (dragDropManager === undefined) {\n                return;\n            }\n            this.manager = dragDropManager;\n            this.handlerMonitor = createMonitor(dragDropManager);\n            this.handlerConnector = createConnector(dragDropManager.getBackend());\n            this.handler = createHandler(this.handlerMonitor, this.decoratedRef);\n        };\n        DragDropContainer.DecoratedComponent = DecoratedComponent;\n        DragDropContainer.displayName = containerDisplayName + \"(\" + displayName + \")\";\n        return DragDropContainer;\n    }(React.Component));\n    return hoistStatics(DragDropContainer, DecoratedComponent);\n}\nexports.default = decorateHandler;\n\n\n//# sourceURL=webpack://ReactDnD/./src/decorateHandler.tsx?");

/***/ }),

/***/ "./src/hooks/index.ts":
/*!****************************!*\
  !*** ./src/hooks/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./useDrag */ \"./src/hooks/useDrag.ts\"));\n__export(__webpack_require__(/*! ./useDrop */ \"./src/hooks/useDrop.ts\"));\n__export(__webpack_require__(/*! ./useDragLayer */ \"./src/hooks/useDragLayer.ts\"));\n\n\n//# sourceURL=webpack://ReactDnD/./src/hooks/index.ts?");

/***/ }),

/***/ "./src/hooks/internal/drag.ts":
/*!************************************!*\
  !*** ./src/hooks/internal/drag.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar react_1 = __webpack_require__(/*! react */ \"react\");\nvar registerSource_1 = __webpack_require__(/*! ../../registerSource */ \"./src/registerSource.ts\");\nvar useDragDropManager_1 = __webpack_require__(/*! ./useDragDropManager */ \"./src/hooks/internal/useDragDropManager.ts\");\nvar DragSourceMonitorImpl_1 = __webpack_require__(/*! ../../DragSourceMonitorImpl */ \"./src/DragSourceMonitorImpl.ts\");\nvar SourceConnector_1 = __webpack_require__(/*! ../../SourceConnector */ \"./src/SourceConnector.ts\");\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\nfunction useDragSourceMonitor() {\n    var manager = useDragDropManager_1.useDragDropManager();\n    var monitor = react_1.useMemo(function () { return new DragSourceMonitorImpl_1.default(manager); }, [manager]);\n    var connector = react_1.useMemo(function () { return new SourceConnector_1.default(manager.getBackend()); }, [\n        manager,\n    ]);\n    return [monitor, connector];\n}\nexports.useDragSourceMonitor = useDragSourceMonitor;\nfunction useDragHandler(spec, monitor, connector) {\n    var manager = useDragDropManager_1.useDragDropManager();\n    // Can't use createSourceFactory, as semantics are different\n    var handler = react_1.useMemo(function () {\n        return {\n            beginDrag: function () {\n                var _a = spec.current, begin = _a.begin, item = _a.item;\n                if (begin) {\n                    var beginResult = begin(monitor);\n                    invariant(beginResult == null || typeof beginResult === 'object', 'dragSpec.begin() must either return an object, undefined, or null');\n                    return beginResult || item || {};\n                }\n                return item || {};\n            },\n            canDrag: function () {\n                if (typeof spec.current.canDrag === 'boolean') {\n                    return spec.current.canDrag;\n                }\n                else if (typeof spec.current.canDrag === 'function') {\n                    return spec.current.canDrag(monitor);\n                }\n                else {\n                    return true;\n                }\n            },\n            isDragging: function (globalMonitor, target) {\n                var isDragging = spec.current.isDragging;\n                return isDragging\n                    ? isDragging(monitor)\n                    : target === globalMonitor.getSourceId();\n            },\n            endDrag: function () {\n                var end = spec.current.end;\n                if (end) {\n                    end(monitor.getItem(), monitor);\n                }\n                connector.reconnect();\n            },\n        };\n    }, []);\n    react_1.useEffect(function registerHandler() {\n        // console.log('Register Handler')\n        var _a = registerSource_1.default(spec.current.item.type, handler, manager), handlerId = _a[0], unregister = _a[1];\n        monitor.receiveHandlerId(handlerId);\n        connector.receiveHandlerId(handlerId);\n        return unregister;\n    }, []);\n}\nexports.useDragHandler = useDragHandler;\n\n\n//# sourceURL=webpack://ReactDnD/./src/hooks/internal/drag.ts?");

/***/ }),

/***/ "./src/hooks/internal/drop.ts":
/*!************************************!*\
  !*** ./src/hooks/internal/drop.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar react_1 = __webpack_require__(/*! react */ \"react\");\nvar registerTarget_1 = __webpack_require__(/*! ../../registerTarget */ \"./src/registerTarget.ts\");\nvar useDragDropManager_1 = __webpack_require__(/*! ./useDragDropManager */ \"./src/hooks/internal/useDragDropManager.ts\");\nvar TargetConnector_1 = __webpack_require__(/*! ../../TargetConnector */ \"./src/TargetConnector.ts\");\nvar DropTargetMonitorImpl_1 = __webpack_require__(/*! ../../DropTargetMonitorImpl */ \"./src/DropTargetMonitorImpl.ts\");\nfunction useDropTargetMonitor() {\n    var manager = useDragDropManager_1.useDragDropManager();\n    var monitor = react_1.useMemo(function () { return new DropTargetMonitorImpl_1.default(manager); }, [manager]);\n    var connector = react_1.useMemo(function () { return new TargetConnector_1.default(manager.getBackend()); }, [\n        manager,\n    ]);\n    return [monitor, connector];\n}\nexports.useDropTargetMonitor = useDropTargetMonitor;\nfunction useDropHandler(spec, monitor, connector) {\n    var manager = useDragDropManager_1.useDragDropManager();\n    // Can't use createSourceFactory, as semantics are different\n    var handler = react_1.useMemo(function () {\n        // console.log('create drop target handler')\n        return {\n            canDrop: function () {\n                var canDrop = spec.current.canDrop;\n                return canDrop ? canDrop(monitor.getItem(), monitor) : true;\n            },\n            hover: function () {\n                var hover = spec.current.hover;\n                if (hover) {\n                    hover(monitor.getItem(), monitor);\n                }\n            },\n            drop: function () {\n                var drop = spec.current.drop;\n                if (drop) {\n                    return drop(monitor.getItem(), monitor);\n                }\n            },\n        };\n    }, [monitor]);\n    react_1.useEffect(function registerHandler() {\n        // console.log('register droptarget handler')\n        var _a = registerTarget_1.default(spec.current.accept, handler, manager), handlerId = _a[0], unregister = _a[1];\n        monitor.receiveHandlerId(handlerId);\n        connector.receiveHandlerId(handlerId);\n        return unregister;\n    }, [monitor, connector]);\n}\nexports.useDropHandler = useDropHandler;\n\n\n//# sourceURL=webpack://ReactDnD/./src/hooks/internal/drop.ts?");

/***/ }),

/***/ "./src/hooks/internal/useCollector.ts":
/*!********************************************!*\
  !*** ./src/hooks/internal/useCollector.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n// declare var require: any\n// const shallowEqual = require('shallowequal')\nvar react_1 = __webpack_require__(/*! react */ \"react\");\n/**\n *\n * @param monitor The monitor to colelct state from\n * @param collect The collecting function\n * @param onUpdate A method to invoke when updates occur\n */\nfunction useCollector(monitor, collect, onUpdate) {\n    var _a = react_1.useState(function () { return collect(monitor); }), collected = _a[0], setCollected = _a[1];\n    var updateCollected = function () {\n        var nextValue = collect(monitor);\n        // TODO: we need this shallowequal check to work\n        // so that we can operate performantly, but the examples\n        // are broken with it in currently\n        // if (!shallowEqual(collected, nextValue)) {\n        setCollected(nextValue);\n        if (onUpdate) {\n            onUpdate();\n        }\n        // }\n    };\n    return [collected, updateCollected];\n}\nexports.useCollector = useCollector;\n\n\n//# sourceURL=webpack://ReactDnD/./src/hooks/internal/useCollector.ts?");

/***/ }),

/***/ "./src/hooks/internal/useDragDropManager.ts":
/*!**************************************************!*\
  !*** ./src/hooks/internal/useDragDropManager.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar react_1 = __webpack_require__(/*! react */ \"react\");\nvar DragDropContext_1 = __webpack_require__(/*! ../../DragDropContext */ \"./src/DragDropContext.tsx\");\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\n/**\n * A hook to retrieve the DragDropManager from Context\n */\nfunction useDragDropManager() {\n    var dragDropManager = react_1.useContext(DragDropContext_1.context).dragDropManager;\n    invariant(dragDropManager != null, 'Expected drag drop context');\n    return dragDropManager;\n}\nexports.useDragDropManager = useDragDropManager;\n\n\n//# sourceURL=webpack://ReactDnD/./src/hooks/internal/useDragDropManager.ts?");

/***/ }),

/***/ "./src/hooks/internal/useMonitorOutput.ts":
/*!************************************************!*\
  !*** ./src/hooks/internal/useMonitorOutput.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar react_1 = __webpack_require__(/*! react */ \"react\");\nvar useCollector_1 = __webpack_require__(/*! ./useCollector */ \"./src/hooks/internal/useCollector.ts\");\nfunction useMonitorOutput(monitor, collect, onCollect) {\n    var _a = useCollector_1.useCollector(monitor, collect, onCollect), collected = _a[0], updateCollected = _a[1];\n    react_1.useEffect(function subscribeToMonitorStateChange() {\n        var handlerId = monitor.getHandlerId();\n        if (handlerId == null) {\n            return undefined;\n        }\n        var unsubscribe = monitor.subscribeToStateChange(updateCollected, {\n            handlerIds: [handlerId],\n        });\n        return unsubscribe;\n    }, [monitor]);\n    return collected;\n}\nexports.useMonitorOutput = useMonitorOutput;\n\n\n//# sourceURL=webpack://ReactDnD/./src/hooks/internal/useMonitorOutput.ts?");

/***/ }),

/***/ "./src/hooks/useDrag.ts":
/*!******************************!*\
  !*** ./src/hooks/useDrag.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar useMonitorOutput_1 = __webpack_require__(/*! ./internal/useMonitorOutput */ \"./src/hooks/internal/useMonitorOutput.ts\");\nvar drag_1 = __webpack_require__(/*! ./internal/drag */ \"./src/hooks/internal/drag.ts\");\nvar react_1 = __webpack_require__(/*! react */ \"react\");\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\n/**\n * useDragSource hook (This API is experimental and subject to breaking changes in non-major versions)\n * @param sourceSpec The drag source specification *\n */\nfunction useDrag(spec) {\n    var specRef = react_1.useRef(spec);\n    // TODO: wire options into createSourceConnector\n    invariant(spec.item != null, 'item must be defined');\n    invariant(spec.item.type != null, 'item type must be defined');\n    var _a = drag_1.useDragSourceMonitor(), monitor = _a[0], connector = _a[1];\n    drag_1.useDragHandler(specRef, monitor, connector);\n    var result = useMonitorOutput_1.useMonitorOutput(monitor, specRef.current.collect || (function () { return ({}); }), function () { return connector.reconnect(); });\n    var connectDragSource = react_1.useMemo(function () { return connector.hooks.dragSource(); }, [\n        connector,\n    ]);\n    var connectDragPreview = react_1.useMemo(function () { return connector.hooks.dragPreview(); }, [\n        connector,\n    ]);\n    react_1.useEffect(function () {\n        connector.dragSourceOptions = specRef.current.options || null;\n        connector.reconnect();\n    }, [connector]);\n    react_1.useEffect(function () {\n        connector.dragPreviewOptions = specRef.current.previewOptions || null;\n        connector.reconnect();\n    }, [connector]);\n    return [result, connectDragSource, connectDragPreview];\n}\nexports.useDrag = useDrag;\n\n\n//# sourceURL=webpack://ReactDnD/./src/hooks/useDrag.ts?");

/***/ }),

/***/ "./src/hooks/useDragLayer.ts":
/*!***********************************!*\
  !*** ./src/hooks/useDragLayer.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar react_1 = __webpack_require__(/*! react */ \"react\");\nvar useDragDropManager_1 = __webpack_require__(/*! ./internal/useDragDropManager */ \"./src/hooks/internal/useDragDropManager.ts\");\nvar useCollector_1 = __webpack_require__(/*! ./internal/useCollector */ \"./src/hooks/internal/useCollector.ts\");\n/**\n * useDragLayer Hook  (This API is experimental and subject to breaking changes in non-breaking versions)\n * @param collector The property collector\n */\nfunction useDragLayer(collect) {\n    var dragDropManager = useDragDropManager_1.useDragDropManager();\n    var monitor = dragDropManager.getMonitor();\n    var _a = useCollector_1.useCollector(monitor, collect), collected = _a[0], updateCollected = _a[1];\n    react_1.useEffect(function () { return monitor.subscribeToOffsetChange(updateCollected); });\n    react_1.useEffect(function () { return monitor.subscribeToStateChange(updateCollected); });\n    return collected;\n}\nexports.useDragLayer = useDragLayer;\n\n\n//# sourceURL=webpack://ReactDnD/./src/hooks/useDragLayer.ts?");

/***/ }),

/***/ "./src/hooks/useDrop.ts":
/*!******************************!*\
  !*** ./src/hooks/useDrop.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar useMonitorOutput_1 = __webpack_require__(/*! ./internal/useMonitorOutput */ \"./src/hooks/internal/useMonitorOutput.ts\");\nvar drop_1 = __webpack_require__(/*! ./internal/drop */ \"./src/hooks/internal/drop.ts\");\nvar react_1 = __webpack_require__(/*! react */ \"react\");\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\n/**\n * useDropTarget Hook (This API is experimental and subject to breaking changes in non-breaking versions)\n * @param spec The drop target specification\n */\nfunction useDrop(spec) {\n    var specRef = react_1.useRef(spec);\n    invariant(spec.accept != null, 'accept must be defined');\n    var _a = drop_1.useDropTargetMonitor(), monitor = _a[0], connector = _a[1];\n    drop_1.useDropHandler(specRef, monitor, connector);\n    var result = useMonitorOutput_1.useMonitorOutput(monitor, specRef.current.collect || (function () { return ({}); }), function () { return connector.reconnect(); });\n    var connectDropTarget = react_1.useMemo(function () { return connector.hooks.dropTarget(); }, [\n        connector,\n    ]);\n    react_1.useEffect(function () {\n        connector.dropTargetOptions = spec.options || null;\n        connector.reconnect();\n    }, [spec.options]);\n    return [result, connectDropTarget];\n}\nexports.useDrop = useDrop;\n\n\n//# sourceURL=webpack://ReactDnD/./src/hooks/useDrop.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar DragDropContext_1 = __webpack_require__(/*! ./DragDropContext */ \"./src/DragDropContext.tsx\");\nexports.DragDropContext = DragDropContext_1.DragDropContext;\nexports.DragDropContextProvider = DragDropContext_1.DragDropContextProvider;\nexports.DragDropContextConsumer = DragDropContext_1.Consumer;\nexports.DragDropContextProviderProps = DragDropContext_1.DragDropContextProviderProps;\nvar DragLayer_1 = __webpack_require__(/*! ./DragLayer */ \"./src/DragLayer.tsx\");\nexports.DragLayer = DragLayer_1.default;\nvar DragSource_1 = __webpack_require__(/*! ./DragSource */ \"./src/DragSource.ts\");\nexports.DragSource = DragSource_1.default;\nvar DropTarget_1 = __webpack_require__(/*! ./DropTarget */ \"./src/DropTarget.ts\");\nexports.DropTarget = DropTarget_1.default;\nvar DragPreviewImage_1 = __webpack_require__(/*! ./DragPreviewImage */ \"./src/DragPreviewImage.tsx\");\nexports.DragPreviewImage = DragPreviewImage_1.default;\n__export(__webpack_require__(/*! ./interfaces */ \"./src/interfaces/index.ts\"));\nvar hooks_1 = __webpack_require__(/*! ./hooks */ \"./src/hooks/index.ts\");\nexports.__EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ = {\n    useDrag: hooks_1.useDrag,\n    useDragLayer: hooks_1.useDragLayer,\n    useDrop: hooks_1.useDrop,\n};\n\n\n//# sourceURL=webpack://ReactDnD/./src/index.ts?");

/***/ }),

/***/ "./src/interfaces/classApi.ts":
/*!************************************!*\
  !*** ./src/interfaces/classApi.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n\n\n//# sourceURL=webpack://ReactDnD/./src/interfaces/classApi.ts?");

/***/ }),

/***/ "./src/interfaces/hooksApi.ts":
/*!************************************!*\
  !*** ./src/interfaces/hooksApi.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n\n\n//# sourceURL=webpack://ReactDnD/./src/interfaces/hooksApi.ts?");

/***/ }),

/***/ "./src/interfaces/index.ts":
/*!*********************************!*\
  !*** ./src/interfaces/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar dnd_core_1 = __webpack_require__(/*! dnd-core */ \"../dnd-core/lib/cjs/index.js\");\nexports.XYCoord = dnd_core_1.XYCoord;\n__export(__webpack_require__(/*! ./classApi */ \"./src/interfaces/classApi.ts\"));\n__export(__webpack_require__(/*! ./monitors */ \"./src/interfaces/monitors.ts\"));\n__export(__webpack_require__(/*! ./hooksApi */ \"./src/interfaces/hooksApi.ts\"));\n__export(__webpack_require__(/*! ./options */ \"./src/interfaces/options.ts\"));\n\n\n//# sourceURL=webpack://ReactDnD/./src/interfaces/index.ts?");

/***/ }),

/***/ "./src/interfaces/monitors.ts":
/*!************************************!*\
  !*** ./src/interfaces/monitors.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n\n\n//# sourceURL=webpack://ReactDnD/./src/interfaces/monitors.ts?");

/***/ }),

/***/ "./src/interfaces/options.ts":
/*!***********************************!*\
  !*** ./src/interfaces/options.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n\n\n//# sourceURL=webpack://ReactDnD/./src/interfaces/options.ts?");

/***/ }),

/***/ "./src/registerSource.ts":
/*!*******************************!*\
  !*** ./src/registerSource.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction registerSource(type, source, manager) {\n    var registry = manager.getRegistry();\n    var sourceId = registry.addSource(type, source);\n    return [sourceId, function () { return registry.removeSource(sourceId); }];\n}\nexports.default = registerSource;\n\n\n//# sourceURL=webpack://ReactDnD/./src/registerSource.ts?");

/***/ }),

/***/ "./src/registerTarget.ts":
/*!*******************************!*\
  !*** ./src/registerTarget.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction registerTarget(type, target, manager) {\n    var registry = manager.getRegistry();\n    var targetId = registry.addTarget(type, target);\n    return [targetId, function () { return registry.removeTarget(targetId); }];\n}\nexports.default = registerTarget;\n\n\n//# sourceURL=webpack://ReactDnD/./src/registerTarget.ts?");

/***/ }),

/***/ "./src/utils/checkDecoratorArguments.ts":
/*!**********************************************!*\
  !*** ./src/utils/checkDecoratorArguments.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction checkDecoratorArguments(functionName, signature) {\n    var args = [];\n    for (var _i = 2; _i < arguments.length; _i++) {\n        args[_i - 2] = arguments[_i];\n    }\n    if (false) { var arg, _a, args_1; }\n}\nexports.default = checkDecoratorArguments;\n\n\n//# sourceURL=webpack://ReactDnD/./src/utils/checkDecoratorArguments.ts?");

/***/ }),

/***/ "./src/utils/cloneWithRef.ts":
/*!***********************************!*\
  !*** ./src/utils/cloneWithRef.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar react_1 = __webpack_require__(/*! react */ \"react\");\nvar invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\nfunction setRef(ref, node) {\n    if (typeof ref === 'function') {\n        ref(node);\n    }\n    else {\n        ref.current = node;\n    }\n}\nfunction cloneWithRef(element, newRef) {\n    var previousRef = element.ref;\n    invariant(typeof previousRef !== 'string', 'Cannot connect React DnD to an element with an existing string ref. ' +\n        'Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. ' +\n        'Read more: https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute');\n    if (!previousRef) {\n        // When there is no ref on the element, use the new ref directly\n        return react_1.cloneElement(element, {\n            ref: newRef,\n        });\n    }\n    return react_1.cloneElement(element, {\n        ref: function (node) {\n            setRef(newRef, node);\n            if (previousRef) {\n                setRef(previousRef, node);\n            }\n        },\n    });\n}\nexports.default = cloneWithRef;\n\n\n//# sourceURL=webpack://ReactDnD/./src/utils/cloneWithRef.ts?");

/***/ }),

/***/ "./src/utils/disposables/CompositeDisposable.ts":
/*!******************************************************!*\
  !*** ./src/utils/disposables/CompositeDisposable.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * Represents a group of disposable resources that are disposed together.\n * @constructor\n */\nvar CompositeDisposable = /** @class */ (function () {\n    function CompositeDisposable() {\n        var disposables = [];\n        for (var _i = 0; _i < arguments.length; _i++) {\n            disposables[_i] = arguments[_i];\n        }\n        this.isDisposed = false;\n        this.disposables = disposables;\n    }\n    /**\n     * Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.\n     * @param {Any} item Disposable to add.\n     */\n    CompositeDisposable.prototype.add = function (item) {\n        if (this.isDisposed) {\n            item.dispose();\n        }\n        else {\n            this.disposables.push(item);\n        }\n    };\n    /**\n     * Removes and disposes the first occurrence of a disposable from the CompositeDisposable.\n     * @param {Any} item Disposable to remove.\n     * @returns {Boolean} true if found; false otherwise.\n     */\n    CompositeDisposable.prototype.remove = function (item) {\n        var shouldDispose = false;\n        if (!this.isDisposed) {\n            var idx = this.disposables.indexOf(item);\n            if (idx !== -1) {\n                shouldDispose = true;\n                this.disposables.splice(idx, 1);\n                item.dispose();\n            }\n        }\n        return shouldDispose;\n    };\n    /**\n     *  Disposes all disposables in the group and removes them from the group but\n     *  does not dispose the CompositeDisposable.\n     */\n    CompositeDisposable.prototype.clear = function () {\n        if (!this.isDisposed) {\n            var len = this.disposables.length;\n            var currentDisposables = new Array(len);\n            for (var i = 0; i < len; i++) {\n                currentDisposables[i] = this.disposables[i];\n            }\n            this.disposables = [];\n            for (var i = 0; i < len; i++) {\n                currentDisposables[i].dispose();\n            }\n        }\n    };\n    /**\n     *  Disposes all disposables in the group and removes them from the group.\n     */\n    CompositeDisposable.prototype.dispose = function () {\n        if (!this.isDisposed) {\n            this.isDisposed = true;\n            var len = this.disposables.length;\n            var currentDisposables = new Array(len);\n            for (var i = 0; i < len; i++) {\n                currentDisposables[i] = this.disposables[i];\n            }\n            this.disposables = [];\n            for (var i = 0; i < len; i++) {\n                currentDisposables[i].dispose();\n            }\n        }\n    };\n    return CompositeDisposable;\n}());\nexports.CompositeDisposable = CompositeDisposable;\n\n\n//# sourceURL=webpack://ReactDnD/./src/utils/disposables/CompositeDisposable.ts?");

/***/ }),

/***/ "./src/utils/disposables/Disposable.ts":
/*!*********************************************!*\
  !*** ./src/utils/disposables/Disposable.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar isFunction = __webpack_require__(/*! lodash/isFunction */ \"./node_modules/lodash/isFunction.js\");\nvar noop = __webpack_require__(/*! lodash/noop */ \"./node_modules/lodash/noop.js\");\n/**\n * Provides a set of static methods for creating Disposables.\n * @param {Function} action Action to run during the first call to dispose.\n * The action is guaranteed to be run at most once.\n */\nvar Disposable = /** @class */ (function () {\n    function Disposable(action) {\n        this.isDisposed = false;\n        this.action = isFunction(action) ? action : noop;\n    }\n    /**\n     * Validates whether the given object is a disposable\n     * @param {Object} Object to test whether it has a dispose method\n     * @returns {Boolean} true if a disposable object, else false.\n     */\n    Disposable.isDisposable = function (d) {\n        return d && isFunction(d.dispose);\n    };\n    Disposable._fixup = function (result) {\n        return Disposable.isDisposable(result) ? result : Disposable.empty;\n    };\n    /**\n     * Creates a disposable object that invokes the specified action when disposed.\n     * @param {Function} dispose Action to run during the first call to dispose.\n     * The action is guaranteed to be run at most once.\n     * @return {Disposable} The disposable object that runs the given action upon disposal.\n     */\n    Disposable.create = function (action) {\n        return new Disposable(action);\n    };\n    /** Performs the task of cleaning up resources. */\n    Disposable.prototype.dispose = function () {\n        if (!this.isDisposed) {\n            this.action();\n            this.isDisposed = true;\n        }\n    };\n    /**\n     * Gets the disposable that does nothing when disposed.\n     */\n    Disposable.empty = { dispose: noop };\n    return Disposable;\n}());\nexports.Disposable = Disposable;\n\n\n//# sourceURL=webpack://ReactDnD/./src/utils/disposables/Disposable.ts?");

/***/ }),

/***/ "./src/utils/disposables/SerialDisposable.ts":
/*!***************************************************!*\
  !*** ./src/utils/disposables/SerialDisposable.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * Represents a disposable resource whose underlying disposable resource can\n * be replaced by another disposable resource, causing automatic disposal of\n * the previous underlying disposable resource.\n */\nvar SerialDisposable = /** @class */ (function () {\n    function SerialDisposable() {\n        this.isDisposed = false;\n    }\n    /**\n     * Gets the underlying disposable.\n     * @returns {Any} the underlying disposable.\n     */\n    SerialDisposable.prototype.getDisposable = function () {\n        return this.current;\n    };\n    SerialDisposable.prototype.setDisposable = function (value) {\n        var shouldDispose = this.isDisposed;\n        if (!shouldDispose) {\n            var old = this.current;\n            this.current = value;\n            if (old) {\n                old.dispose();\n            }\n        }\n        if (shouldDispose && value) {\n            value.dispose();\n        }\n    };\n    /** Performs the task of cleaning up resources. */\n    SerialDisposable.prototype.dispose = function () {\n        if (!this.isDisposed) {\n            this.isDisposed = true;\n            var old = this.current;\n            this.current = undefined;\n            if (old) {\n                old.dispose();\n            }\n        }\n    };\n    return SerialDisposable;\n}());\nexports.SerialDisposable = SerialDisposable;\n\n\n//# sourceURL=webpack://ReactDnD/./src/utils/disposables/SerialDisposable.ts?");

/***/ }),

/***/ "./src/utils/disposables/index.ts":
/*!****************************************!*\
  !*** ./src/utils/disposables/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./Disposable */ \"./src/utils/disposables/Disposable.ts\"));\n__export(__webpack_require__(/*! ./SerialDisposable */ \"./src/utils/disposables/SerialDisposable.ts\"));\n__export(__webpack_require__(/*! ./CompositeDisposable */ \"./src/utils/disposables/CompositeDisposable.ts\"));\n\n\n//# sourceURL=webpack://ReactDnD/./src/utils/disposables/index.ts?");

/***/ }),

/***/ "./src/utils/getDecoratedComponent.ts":
/*!********************************************!*\
  !*** ./src/utils/getDecoratedComponent.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction getDecoratedComponent(instanceRef) {\n    var currentRef = instanceRef.current;\n    if (currentRef == null) {\n        return null;\n    }\n    else if (typeof currentRef.getDecoratedComponentInstance === 'function') {\n        return currentRef.getDecoratedComponentInstance();\n    }\n    else {\n        return currentRef;\n    }\n}\nexports.getDecoratedComponent = getDecoratedComponent;\n\n\n//# sourceURL=webpack://ReactDnD/./src/utils/getDecoratedComponent.ts?");

/***/ }),

/***/ "./src/utils/isRef.ts":
/*!****************************!*\
  !*** ./src/utils/isRef.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction isRef(obj) {\n    if (obj !== null && typeof obj === 'object') {\n        var keys = Object.keys(obj);\n        return keys.length === 1 && keys[0] === 'current';\n    }\n    return false;\n}\nexports.isRef = isRef;\n\n\n//# sourceURL=webpack://ReactDnD/./src/utils/isRef.ts?");

/***/ }),

/***/ "./src/utils/isRefable.ts":
/*!********************************!*\
  !*** ./src/utils/isRefable.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction isClassComponent(Component) {\n    return (Component &&\n        Component.prototype &&\n        typeof Component.prototype.render === 'function');\n}\nfunction isRefForwardingComponent(C) {\n    return (C && C.$$typeof && C.$$typeof.toString() === 'Symbol(react.forward_ref)');\n}\nexports.isRefForwardingComponent = isRefForwardingComponent;\nfunction isRefable(C) {\n    return isClassComponent(C) || isRefForwardingComponent(C);\n}\nexports.isRefable = isRefable;\n\n\n//# sourceURL=webpack://ReactDnD/./src/utils/isRefable.ts?");

/***/ }),

/***/ "./src/utils/isValidType.ts":
/*!**********************************!*\
  !*** ./src/utils/isValidType.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction isValidType(type, allowArray) {\n    return (typeof type === 'string' ||\n        typeof type === 'symbol' ||\n        (!!allowArray &&\n            Array.isArray(type) &&\n            type.every(function (t) { return isValidType(t, false); })));\n}\nexports.default = isValidType;\n\n\n//# sourceURL=webpack://ReactDnD/./src/utils/isValidType.ts?");

/***/ }),

/***/ "./src/wrapConnectorHooks.ts":
/*!***********************************!*\
  !*** ./src/wrapConnectorHooks.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar react_1 = __webpack_require__(/*! react */ \"react\");\nvar cloneWithRef_1 = __webpack_require__(/*! ./utils/cloneWithRef */ \"./src/utils/cloneWithRef.ts\");\nfunction throwIfCompositeComponentElement(element) {\n    // Custom components can no longer be wrapped directly in React DnD 2.0\n    // so that we don't need to depend on findDOMNode() from react-dom.\n    if (typeof element.type === 'string') {\n        return;\n    }\n    var displayName = element.type.displayName || element.type.name || 'the component';\n    throw new Error('Only native element nodes can now be passed to React DnD connectors.' +\n        (\"You can either wrap \" + displayName + \" into a <div>, or turn it into a \") +\n        'drag source or a drop target itself.');\n}\nfunction wrapHookToRecognizeElement(hook) {\n    return function (elementOrNode, options) {\n        if (elementOrNode === void 0) { elementOrNode = null; }\n        if (options === void 0) { options = null; }\n        // When passed a node, call the hook straight away.\n        if (!react_1.isValidElement(elementOrNode)) {\n            var node = elementOrNode;\n            hook(node, options);\n            // return the node so it can be chained (e.g. when within callback refs\n            // <div ref={node => connectDragSource(connectDropTarget(node))}/>\n            return node;\n        }\n        // If passed a ReactElement, clone it and attach this function as a ref.\n        // This helps us achieve a neat API where user doesn't even know that refs\n        // are being used under the hood.\n        var element = elementOrNode;\n        throwIfCompositeComponentElement(element);\n        // When no options are passed, use the hook directly\n        var ref = options ? function (node) { return hook(node, options); } : hook;\n        return cloneWithRef_1.default(element, ref);\n    };\n}\nfunction wrapConnectorHooks(hooks) {\n    var wrappedHooks = {};\n    Object.keys(hooks).forEach(function (key) {\n        var hook = hooks[key];\n        // ref objects should be passed straight through without wrapping\n        if (key.endsWith('Ref')) {\n            wrappedHooks[key] = hooks[key];\n        }\n        else {\n            var wrappedHook_1 = wrapHookToRecognizeElement(hook);\n            wrappedHooks[key] = function () { return wrappedHook_1; };\n        }\n    });\n    return wrappedHooks;\n}\nexports.default = wrapConnectorHooks;\n\n\n//# sourceURL=webpack://ReactDnD/./src/wrapConnectorHooks.ts?");

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react__;\n\n//# sourceURL=webpack://ReactDnD/external_%7B%22root%22:%22React%22,%22commonjs2%22:%22react%22,%22commonjs%22:%22react%22,%22amd%22:%22react%22%7D?");

/***/ })

/******/ });
});