import DragDropManagerImpl from './DragDropManagerImpl'
import { DragDropManager, BackendFactory } from './interfaces'

export function createDragDropManager<C, O>(
	backendFactory: BackendFactory,
	context: C,
	options: O,
	debugMode?: boolean,
): DragDropManager {
	const manager = new DragDropManagerImpl(debugMode)
	const backend = backendFactory(manager, context, options)
	manager.receiveBackend(backend)
	return manager
}
