import * as React from 'react'
import TestBackendImpl, { TestBackend } from 'react-dnd-test-backend'
import { DragDropContext, ContextComponent, DndComponent } from 'react-dnd'
import { Backend } from 'dnd-core'
import { act } from 'react-dom/test-utils'

/**
 * Wrap a DnD component or test case in a DragDropContext
 *
 * @param DecoratedComponent The component to decorate
 */
export function wrapInTestContext(DecoratedComponent: any): any {
	const TestStub = (props: any) => <DecoratedComponent {...props} />
	return DragDropContext(TestBackendImpl)(TestStub)
}

/**
 * Extracts a Backend instance from a TestContext component, such as
 * one emitted from `wrapinTestContext`
 *
 * @param instance The instance to extract the backend fram
 */
export function getBackendFromInstance<T extends Backend>(
	instance: ContextComponent<any>,
): T {
	// Obtain a reference to the backend
	return (instance.getManager().getBackend() as any) as T
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
