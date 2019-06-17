import DragDropManagerImpl from './DragDropManagerImpl'
import { DragDropManager, BackendFactory } from './interfaces'

export function createDragDropManager<C>(
	backend: BackendFactory,
	context: C,
	debugMode?: boolean,
): DragDropManager<C> {
	return new DragDropManagerImpl(backend, context, debugMode)
}
