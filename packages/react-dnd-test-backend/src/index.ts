import TestBackend from './TestBackend'
import { DragDropManager, IDragDropActions } from 'dnd-core'
export { ITestBackend } from './TestBackend'

export default function createBackend(manager: DragDropManager<any>) {
	return new TestBackend(manager)
}
