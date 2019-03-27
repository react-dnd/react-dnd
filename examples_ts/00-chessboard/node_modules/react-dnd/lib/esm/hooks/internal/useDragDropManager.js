import { useContext } from 'react';
import { context } from '../../DragDropContext';
const invariant = require('invariant');
/**
 * A hook to retrieve the DragDropManager from Context
 */
export function useDragDropManager() {
    const { dragDropManager } = useContext(context);
    invariant(dragDropManager != null, 'Expected drag drop context');
    return dragDropManager;
}
