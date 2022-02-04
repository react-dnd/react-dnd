import { createContext } from 'react'
import type { DragDropManager } from 'dnd-core'

/**
 * The React context type
 */
export interface DndContextType {
	dragDropManager: DragDropManager | undefined
}

/**
 * Create the React Context
 */
export const DndContext = createContext<DndContextType>({
	dragDropManager: undefined,
})
