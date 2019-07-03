import * as React from 'react'
import { memo } from 'react'
import { BackendFactory, DragDropManager } from 'dnd-core'
import { DndContext, createDndContext } from './DndContext'

export type DndProviderProps<BackendContext, BackendOptions> =
	| {
			manager: DragDropManager
	  }
	| {
			backend: BackendFactory
			context?: BackendContext
			options?: BackendOptions
			debugMode?: boolean
	  }

/**
 * A React component that provides the React-DnD context
 */
export const DndProvider: React.FC<DndProviderProps<any, any>> = memo(
	({ children, ...props }) => {
		const context =
			'manager' in props
				? { dragDropManager: props.manager }
				: createSingletonDndContext(
						props.backend,
						props.context,
						props.options,
						props.debugMode,
				  )
		return <DndContext.Provider value={context}>{children}</DndContext.Provider>
	},
)

const instanceSymbol = Symbol.for('__REACT_DND_CONTEXT_INSTANCE__')
function createSingletonDndContext<BackendContext, BackendOptions>(
	backend: BackendFactory,
	context: BackendContext = getGlobalContext(),
	options: BackendOptions,
	debugMode?: boolean,
) {
	const ctx = context as any
	if (!ctx[instanceSymbol]) {
		ctx[instanceSymbol] = createDndContext(backend, context, options, debugMode)
	}
	return ctx[instanceSymbol]
}

declare var global: any
function getGlobalContext() {
	return typeof global !== 'undefined' ? global : (window as any)
}
