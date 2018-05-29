import TestBackend from './TestBackend'
import { DragDropManager, DragDropActions } from 'dnd-core'
export { TestBackend } from './TestBackend'

export default function createBackend(manager: DragDropManager<any>) {
	return new TestBackend(manager)
}
