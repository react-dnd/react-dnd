import * as React from 'react'
import {
	DragDropManager,
	BackendFactory,
	createDragDropManager,
} from 'dnd-core'

/**
 * The React context type
 */
export interface DndContext<BC> {
	dragDropManager: DragDropManager<BC> | undefined
}

/**
 * Create the React Context
 */
export const DndContext = React.createContext<DndContext<any>>({
	dragDropManager: undefined,
})

/**
 * Creates the context object we're providing
 * @param backend
 * @param context
 */
export function createDndContext<BackendContext>(
	backend: BackendFactory,
	context?: BackendContext,
	debugMode?: boolean,
) {
	return {
		dragDropManager: createDragDropManager(backend, context, debugMode),
	}
}
