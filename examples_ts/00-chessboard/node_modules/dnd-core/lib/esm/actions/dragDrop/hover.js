import matchesType from '../../utils/matchesType';
import { HOVER } from './types';
const invariant = require('invariant');
export default function createHover(manager) {
    return function hover(targetIdsArg, { clientOffset } = {}) {
        verifyTargetIdsIsArray(targetIdsArg);
        const targetIds = targetIdsArg.slice(0);
        const monitor = manager.getMonitor();
        const registry = manager.getRegistry();
        checkInvariants(targetIds, monitor, registry);
        const draggedItemType = monitor.getItemType();
        removeNonMatchingTargetIds(targetIds, registry, draggedItemType);
        hoverAllTargets(targetIds, monitor, registry);
        return {
            type: HOVER,
            payload: {
                targetIds,
                clientOffset: clientOffset || null,
            },
        };
    };
}
function verifyTargetIdsIsArray(targetIdsArg) {
    invariant(Array.isArray(targetIdsArg), 'Expected targetIds to be an array.');
}
function checkInvariants(targetIds, monitor, registry) {
    invariant(monitor.isDragging(), 'Cannot call hover while not dragging.');
    invariant(!monitor.didDrop(), 'Cannot call hover after drop.');
    for (let i = 0; i < targetIds.length; i++) {
        const targetId = targetIds[i];
        invariant(targetIds.lastIndexOf(targetId) === i, 'Expected targetIds to be unique in the passed array.');
        const target = registry.getTarget(targetId);
        invariant(target, 'Expected targetIds to be registered.');
    }
}
function removeNonMatchingTargetIds(targetIds, registry, draggedItemType) {
    // Remove those targetIds that don't match the targetType.  This
    // fixes shallow isOver which would only be non-shallow because of
    // non-matching targets.
    for (let i = targetIds.length - 1; i >= 0; i--) {
        const targetId = targetIds[i];
        const targetType = registry.getTargetType(targetId);
        if (!matchesType(targetType, draggedItemType)) {
            targetIds.splice(i, 1);
        }
    }
}
function hoverAllTargets(targetIds, monitor, registry) {
    // Finally call hover on all matching targets.
    for (const targetId of targetIds) {
        const target = registry.getTarget(targetId);
        target.hover(monitor, targetId);
    }
}
