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

let refCount = 0

/**
 * A React component that provides the React-DnD context
 */
export const DndProvider: React.FC<DndProviderProps<any, any>> = memo(
	({ children, ...props }) => {
		const [manager, isGlobalInstance] = getDndContextValue(props) // memoized from props

		/**
		 * If the global context was used to store the DND context
		 * then where theres no more references to it we should
		 * clean it up to avoid memory leaks
		 */
		React.useEffect(() => {
			if (isGlobalInstance) {
				refCount++
			}

			return () => {
				if (isGlobalInstance) {
					refCount--

					if (refCount === 0) {
						const context = getGlobalContext()
						context[instanceSymbol] = null
					}
				}
			}
		}, [])

		return <DndContext.Provider value={manager}>{children}</DndContext.Provider>
	},
)
DndProvider.displayName = 'DndProvider'

function getDndContextValue(props: DndProviderProps<any, any>) {
	if ('manager' in props) {
		const manager = { dragDropManager: props.manager }
		return [manager, false]
	}

	const manager = createSingletonDndContext(
		props.backend,
		props.context,
		props.options,
		props.debugMode,
	)
	const isGlobalInstance = !props.context

	return [manager, isGlobalInstance]
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

declare const global: any
function getGlobalContext() {
	return typeof global !== 'undefined' ? global : (window as any)
}
