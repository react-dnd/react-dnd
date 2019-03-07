import * as React from 'react'
import { DragDropManager } from 'dnd-core'

/**
 * The React context type
 */
export interface DragDropContext<BC> {
	dragDropManager: DragDropManager<BC> | undefined
}

/**
 * Create the React Context
 */
export const context = React.createContext<DragDropContext<any>>({
	dragDropManager: undefined,
})
export const { Consumer, Provider } = context
