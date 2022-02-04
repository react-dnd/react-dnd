import { DragDropManagerImpl } from './classes/DragDropManagerImpl.js'
import type { DragDropManager, BackendFactory } from './interfaces.js'
import { createStore, Store } from 'redux'
import { reduce, State } from './reducers/index.js'
import { DragDropMonitorImpl } from './classes/DragDropMonitorImpl.js'
import { HandlerRegistryImpl } from './classes/HandlerRegistryImpl.js'

export function createDragDropManager(
	backendFactory: BackendFactory,
	globalContext: unknown = undefined,
	backendOptions: unknown = {},
	debugMode = false,
): DragDropManager {
	const store = makeStoreInstance(debugMode)
	const monitor = new DragDropMonitorImpl(store, new HandlerRegistryImpl(store))
	const manager = new DragDropManagerImpl(store, monitor)
	const backend = backendFactory(manager, globalContext, backendOptions)
	manager.receiveBackend(backend)
	return manager
}

function makeStoreInstance(debugMode: boolean): Store<State> {
	// TODO: if we ever make a react-native version of this,
	// we'll need to consider how to pull off dev-tooling
	const reduxDevTools =
		typeof window !== 'undefined' &&
		(window as any).__REDUX_DEVTOOLS_EXTENSION__
	return createStore(
		reduce,
		debugMode &&
			reduxDevTools &&
			reduxDevTools({
				name: 'dnd-core',
				instanceId: 'dnd-core',
			}),
	)
}
