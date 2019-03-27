"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADD_SOURCE = 'dnd-core/ADD_SOURCE';
exports.ADD_TARGET = 'dnd-core/ADD_TARGET';
exports.REMOVE_SOURCE = 'dnd-core/REMOVE_SOURCE';
exports.REMOVE_TARGET = 'dnd-core/REMOVE_TARGET';
function addSource(sourceId) {
    return {
        type: exports.ADD_SOURCE,
        payload: {
            sourceId: sourceId,
        },
    };
}
exports.addSource = addSource;
function addTarget(targetId) {
    return {
        type: exports.ADD_TARGET,
        payload: {
            targetId: targetId,
        },
    };
}
exports.addTarget = addTarget;
function removeSource(sourceId) {
    return {
        type: exports.REMOVE_SOURCE,
        payload: {
            sourceId: sourceId,
        },
    };
}
exports.removeSource = removeSource;
function removeTarget(targetId) {
    return {
        type: exports.REMOVE_TARGET,
        payload: {
            targetId: targetId,
        },
    };
}
exports.removeTarget = removeTarget;
