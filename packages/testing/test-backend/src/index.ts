import TestBackend from './TestBackend'
import { DragDropManager, BackendFactory } from 'dnd-core'
export { TestBackend } from './TestBackend'

const createBackend: BackendFactory = (manager: DragDropManager) =>
	new TestBackend(manager)

export default createBackend
