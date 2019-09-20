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

let globalContextRefCount = 0;

/**
 * A React component that provides the React-DnD context
 */
export const DndProvider: React.FC<DndProviderProps<any, any>> = memo(
	({ children, ...props }) => {

		/**
		 * If the global context was used to store the DND context
		 * then where theres no more references to it we should
		 * clean it up to avoid memory leaks
		 */
		React.useEffect(() => {
			return () => {
				if ('manager' in props || props.context) {
					return
				}

				globalContextRefCount -= 1
				if (globalContextRefCount > 0) {
					return
				}

				const context = getGlobalContext()
				context[instanceSymbol] = null
			}
		})

		return <DndContext.Provider value={getDndContextValue(props)}>{children}</DndContext.Provider>
	},
)

function getDndContextValue(props: any) {
	if ('manager' in props) {
		return { dragDropManager: props.manager }
	}

	// If no context was provided, then global/window context will be used
	if (!props.context) {
		globalContextRefCount += 1
	}

	return createSingletonDndContext(
		props.backend,
		props.context,
		props.options,
		props.debugMode,
	)
}

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
