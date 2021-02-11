import { createContext } from 'react';
import { createDragDropManager, } from 'dnd-core';
/**
 * Create the React Context
 */
export const DndContext = createContext({
    dragDropManager: undefined,
});
/**
 * Creates the context object we're providing
 * @param backend
 * @param context
 */
export function createDndContext(backend, context, options, debugMode) {
    return {
        dragDropManager: createDragDropManager(backend, context, options, debugMode),
    };
}
//# sourceMappingURL=DndContext.js.map