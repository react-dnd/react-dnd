import { useContext } from 'react'
import { DragDropManager } from 'dnd-core'
import { invariant } from '@react-dnd/invariant'
import { DndContext } from '@react-dnd/core'

/**
 * A hook to retrieve the DragDropManager from Context
 */
export function useDragDropManager(): DragDropManager {
	const { dragDropManager } = useContext(DndContext)
	invariant(dragDropManager != null, 'Expected drag drop context')
	return dragDropManager as DragDropManager
}
