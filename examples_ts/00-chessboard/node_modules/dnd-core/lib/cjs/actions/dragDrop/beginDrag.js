"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setClientOffset_1 = require("./local/setClientOffset");
var invariant = require('invariant');
var isObject = require('lodash/isObject');
var types_1 = require("./types");
var ResetCoordinatesAction = {
    type: types_1.INIT_COORDS,
    payload: {
        clientOffset: null,
        sourceClientOffset: null,
    },
};
function createBeginDrag(manager) {
    return function beginDrag(sourceIds, options) {
        if (sourceIds === void 0) { sourceIds = []; }
        if (options === void 0) { options = {
            publishSource: true,
        }; }
        var _a = options.publishSource, publishSource = _a === void 0 ? true : _a, clientOffset = options.clientOffset, getSourceClientOffset = options.getSourceClientOffset;
        var monitor = manager.getMonitor();
        var registry = manager.getRegistry();
        // Initialize the coordinates using the client offset
        manager.dispatch(setClientOffset_1.setClientOffset(clientOffset));
        verifyInvariants(sourceIds, monitor, registry);
        // Get the draggable source
        var sourceId = getDraggableSource(sourceIds, monitor);
        if (sourceId === null) {
            manager.dispatch(ResetCoordinatesAction);
            return;
        }
        // Get the source client offset
        var sourceClientOffset = null;
        if (clientOffset) {
            verifyGetSourceClientOffsetIsFunction(getSourceClientOffset);
            sourceClientOffset = getSourceClientOffset(sourceId);
        }
        // Initialize the full coordinates
        manager.dispatch(setClientOffset_1.setClientOffset(clientOffset, sourceClientOffset));
        var source = registry.getSource(sourceId);
        var item = source.beginDrag(monitor, sourceId);
        verifyItemIsObject(item);
        registry.pinSource(sourceId);
        var itemType = registry.getSourceType(sourceId);
        return {
            type: types_1.BEGIN_DRAG,
            payload: {
                itemType: itemType,
                item: item,
                sourceId: sourceId,
                clientOffset: clientOffset || null,
                sourceClientOffset: sourceClientOffset || null,
                isSourcePublic: !!publishSource,
            },
        };
    };
}
exports.default = createBeginDrag;
function verifyInvariants(sourceIds, monitor, registry) {
    invariant(!monitor.isDragging(), 'Cannot call beginDrag while dragging.');
    for (var _i = 0, sourceIds_1 = sourceIds; _i < sourceIds_1.length; _i++) {
        var s = sourceIds_1[_i];
        invariant(registry.getSource(s), 'Expected sourceIds to be registered.');
    }
}
function verifyGetSourceClientOffsetIsFunction(getSourceClientOffset) {
    invariant(typeof getSourceClientOffset === 'function', 'When clientOffset is provided, getSourceClientOffset must be a function.');
}
function verifyItemIsObject(item) {
    invariant(isObject(item), 'Item must be an object.');
}
function getDraggableSource(sourceIds, monitor) {
    var sourceId = null;
    for (var i = sourceIds.length - 1; i >= 0; i--) {
        if (monitor.canDragSource(sourceIds[i])) {
            sourceId = sourceIds[i];
            break;
        }
    }
    return sourceId;
}
