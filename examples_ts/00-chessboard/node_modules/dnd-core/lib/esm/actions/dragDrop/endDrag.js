import { END_DRAG } from './types';
const invariant = require('invariant');
export default function createEndDrag(manager) {
    return function endDrag() {
        const monitor = manager.getMonitor();
        const registry = manager.getRegistry();
        verifyIsDragging(monitor);
        const sourceId = monitor.getSourceId();
        const source = registry.getSource(sourceId, true);
        source.endDrag(monitor, sourceId);
        registry.unpinSource();
        return { type: END_DRAG };
    };
}
function verifyIsDragging(monitor) {
    invariant(monitor.isDragging(), 'Cannot call endDrag while not dragging.');
}
