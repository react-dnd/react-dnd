"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var invariant = require('invariant');
var isObject = require('lodash/isObject');
function createDrop(manager) {
    return function drop(options) {
        if (options === void 0) { options = {}; }
        var monitor = manager.getMonitor();
        var registry = manager.getRegistry();
        verifyInvariants(monitor);
        var targetIds = getDroppableTargets(monitor);
        // Multiple actions are dispatched here, which is why this doesn't return an action
        targetIds.forEach(function (targetId, index) {
            var dropResult = determineDropResult(targetId, index, registry, monitor);
            var action = {
                type: types_1.DROP,
                payload: {
                    dropResult: __assign({}, options, dropResult),
                },
            };
            manager.dispatch(action);
        });
    };
}
exports.default = createDrop;
function verifyInvariants(monitor) {
    invariant(monitor.isDragging(), 'Cannot call drop while not dragging.');
    invariant(!monitor.didDrop(), 'Cannot call drop twice during one drag operation.');
}
function determineDropResult(targetId, index, registry, monitor) {
    var target = registry.getTarget(targetId);
    var dropResult = target.drop(monitor, targetId);
    verifyDropResultType(dropResult);
    if (typeof dropResult === 'undefined') {
        dropResult = index === 0 ? {} : monitor.getDropResult();
    }
    return dropResult;
}
function verifyDropResultType(dropResult) {
    invariant(typeof dropResult === 'undefined' || isObject(dropResult), 'Drop result must either be an object or undefined.');
}
function getDroppableTargets(monitor) {
    var targetIds = monitor
        .getTargetIds()
        .filter(monitor.canDropOnTarget, monitor);
    targetIds.reverse();
    return targetIds;
}
