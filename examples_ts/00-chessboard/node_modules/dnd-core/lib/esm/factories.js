import DragDropManagerImpl from './DragDropManagerImpl';
export function createDragDropManager(backend, context, debugMode) {
    return new DragDropManagerImpl(backend, context, debugMode);
}
