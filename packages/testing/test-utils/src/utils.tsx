import * as React from 'react'
import TestBackendImpl, {
	TestBackend,
	getInstance,
} from 'react-dnd-test-backend'
import { DndComponent, DndContext, DndProvider } from 'react-dnd'
import { Backend, DragDropManager } from 'dnd-core'
import { act } from 'react-dom/test-utils'

interface RefType {
	getManager: () => DragDropManager | undefined
}

/**
 * Wrap a DnD component or test case in a DragDropContext
 *
 * @param DecoratedComponent The component to decorate
 */
export function wrapInTestContext(DecoratedComponent: any): any {
	const forwardedRefFunc = (props: any, ref: React.Ref<RefType>) => {
		const dragDropManager = React.useRef<any>(undefined)

		React.useImperativeHandle(ref, () => ({
			getManager: () => dragDropManager.current,
		}))

		return (
			<DndProvider backend={TestBackendImpl}>
				<DndContext.Consumer>
					{ctx => {
						dragDropManager.current = ctx.dragDropManager
						return null
					}}
				</DndContext.Consumer>
				<DecoratedComponent {...props} />
			</DndProvider>
		)
	}
	forwardedRefFunc.displayName = 'TestContextWrapper'

	return React.forwardRef(forwardedRefFunc)
}

/**
 * Extracts a Backend instance from a TestContext component, such as
 * one emitted from `wrapinTestContext`
 *
 * @param instance The instance to extract the backend fram
 * @deprecated - This is no longer useful since ContextComponent was removed. This will be removed in a major version cut.
 */
export function getBackendFromInstance<T extends Backend>(
	instance: DndComponent<any>,
): T {
	return getInstance() as any
}

export function simulateDragDropSequence(
	source: DndComponent<any>,
	target: DndComponent<any>,
	backend: TestBackend,
) {
	act(() => {
		backend.simulateBeginDrag([source.getHandlerId()])
		backend.simulateHover([target.getHandlerId()])
		backend.simulateDrop()
		backend.simulateEndDrag()
	})
}

export function simulateHoverSequence(
	source: DndComponent<any>,
	target: DndComponent<any>,
	backend: TestBackend,
) {
	act(() => {
		backend.simulateBeginDrag([source.getHandlerId()])
		backend.simulateHover([target.getHandlerId()])
		backend.simulateEndDrag()
	})
}
