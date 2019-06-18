import { useContext } from 'react'
import { DragDropManager } from 'dnd-core'
import invariant from 'invariant'
import { DndContext } from '../../common/DndContext'

/**
 * A hook to retrieve the DragDropManager from Context
 */
export function useDragDropManager<Context>(): DragDropManager<Context> {
	const { dragDropManager } = useContext(DndContext)
	invariant(dragDropManager != null, 'Expected drag drop context')
	return dragDropManager as DragDropManager<Context>
}
