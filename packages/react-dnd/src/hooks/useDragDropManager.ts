declare var require: any
import * as React from 'react'
import { DragDropManager } from 'dnd-core'
import { context } from '../DragDropContext'
const invariant = require('invariant')

/**
 * A hook to retrieve the DragDropManager from Context
 */
export function useDragDropManager<Context>(): DragDropManager<Context> {
	const { dragDropManager } = React.useContext(context)
	invariant(dragDropManager != null, 'Expected drag drop context')
	return dragDropManager as DragDropManager<Context>
}
