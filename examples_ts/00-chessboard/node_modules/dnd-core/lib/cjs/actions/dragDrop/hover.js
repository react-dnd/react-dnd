"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var matchesType_1 = require("../../utils/matchesType");
var types_1 = require("./types");
var invariant = require('invariant');
function createHover(manager) {
    return function hover(targetIdsArg, _a) {
        var clientOffset = (_a === void 0 ? {} : _a).clientOffset;
        verifyTargetIdsIsArray(targetIdsArg);
        var targetIds = targetIdsArg.slice(0);
        var monitor = manager.getMonitor();
        var registry = manager.getRegistry();
        checkInvariants(targetIds, monitor, registry);
        var draggedItemType = monitor.getItemType();
        removeNonMatchingTargetIds(targetIds, registry, draggedItemType);
        hoverAllTargets(targetIds, monitor, registry);
        return {
            type: types_1.HOVER,
            payload: {
                targetIds: targetIds,
                clientOffset: clientOffset || null,
            },
        };
    };
}
exports.default = createHover;
function verifyTargetIdsIsArray(targetIdsArg) {
    invariant(Array.isArray(targetIdsArg), 'Expected targetIds to be an array.');
}
function checkInvariants(targetIds, monitor, registry) {
    invariant(monitor.isDragging(), 'Cannot call hover while not dragging.');
    invariant(!monitor.didDrop(), 'Cannot call hover after drop.');
    for (var i = 0; i < targetIds.length; i++) {
        var targetId = targetIds[i];
        invariant(targetIds.lastIndexOf(targetId) === i, 'Expected targetIds to be unique in the passed array.');
        var target = registry.getTarget(targetId);
        invariant(target, 'Expected targetIds to be registered.');
    }
}
function removeNonMatchingTargetIds(targetIds, registry, draggedItemType) {
    // Remove those targetIds that don't match the targetType.  This
    // fixes shallow isOver which would only be non-shallow because of
    // non-matching targets.
    for (var i = targetIds.length - 1; i >= 0; i--) {
        var targetId = targetIds[i];
        var targetType = registry.getTargetType(targetId);
        if (!matchesType_1.default(targetType, draggedItemType)) {
            targetIds.splice(i, 1);
        }
    }
}
function hoverAllTargets(targetIds, monitor, registry) {
    // Finally call hover on all matching targets.
    for (var _i = 0, targetIds_1 = targetIds; _i < targetIds_1.length; _i++) {
        var targetId = targetIds_1[_i];
        var target = registry.getTarget(targetId);
        target.hover(monitor, targetId);
    }
}
