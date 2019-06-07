import * as React from 'react'
import { DragDropManager, BackendFactory } from 'dnd-core'
import { DndContext, createDndContext } from './DndContext'

export type DndProviderProps<BackendContext> =
	| {
			manager: DragDropManager<BackendContext>
	  }
	| {
			backend: BackendFactory
			context?: BackendContext
			debugMode?: boolean
	  }

/**
 * A React component that provides the React-DnD context
 */
export const DndProvider: React.FC<DndProviderProps<any>> = ({
	children,
	...props
}) => {
	const contextValue =
		'manager' in props
			? { dragDropManager: props.manager }
			: createDndContext(props.backend, props.context, props.debugMode)
	return (
		<DndContext.Provider value={contextValue}>{children}</DndContext.Provider>
	)
}
