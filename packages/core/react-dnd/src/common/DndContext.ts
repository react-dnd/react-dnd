import * as React from 'react'
import {
	DragDropManager,
	BackendFactory,
	createDragDropManager,
} from 'dnd-core'

/**
 * The React context type
 */
export interface DndContext {
	dragDropManager: DragDropManager | undefined
}

/**
 * Create the React Context
 */
export const DndContext = React.createContext<DndContext>({
	dragDropManager: undefined,
})

/**
 * Creates the context object we're providing
 * @param backend
 * @param context
 */
export function createDndContext<BackendContext, BackendOptions>(
	backend: BackendFactory,
	context?: BackendContext,
	options?: BackendOptions,
	debugMode?: boolean,
) {
	return {
		dragDropManager: createDragDropManager(
			backend,
			context,
			options,
			debugMode,
		),
	}
}
