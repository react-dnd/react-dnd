import * as React from 'react'
import { memo } from 'react'
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
export const DndProvider: React.FC<DndProviderProps<any>> = memo(
	({ children, ...props }) => {
		const context =
			'manager' in props
				? { dragDropManager: props.manager }
				: createSingletonDndContext(
						props.backend,
						props.context,
						props.debugMode,
				  )
		return <DndContext.Provider value={context}>{children}</DndContext.Provider>
	},
)

let SINGLETON_DND_CONTEXT: DndContext<any> | undefined
function createSingletonDndContext<BackendContext>(
	backend: BackendFactory,
	context?: BackendContext,
	debugMode?: boolean,
) {
	if (!SINGLETON_DND_CONTEXT) {
		SINGLETON_DND_CONTEXT = createDndContext(backend, context, debugMode)
	}
	return SINGLETON_DND_CONTEXT
}
