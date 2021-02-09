/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Ref,
	ComponentType,
	useRef,
	useImperativeHandle,
	forwardRef,
} from 'react'
import { TestBackend, getInstance, ITestBackend } from 'react-dnd-test-backend'
import { DndComponent, DndContext, DndProvider } from 'react-dnd'
import { Backend, DragDropManager } from 'dnd-core'
import { act } from 'react-dom/test-utils'

interface RefType {
	getManager: () => DragDropManager | undefined
	getDecoratedComponent<T>(): T
}

/**
 * Wrap a DnD component or test case in a DragDropContext
 *
 * @param DecoratedComponent The component to decorate
 */
export function wrapInTestContext<T>(
	DecoratedComponent: ComponentType<T>,
): ComponentType<T> {
	const forwardedRefFunc = (props: any, ref: Ref<RefType>) => {
		const dragDropManager = useRef<any>(undefined)
		const decoratedComponentRef = useRef<any>(undefined)

		useImperativeHandle(ref, () => ({
			getManager: () => dragDropManager.current,
			getDecoratedComponent: () => decoratedComponentRef.current,
		}))

		return (
			<DndProvider backend={TestBackend}>
				<DndContext.Consumer>
					{(ctx) => {
						dragDropManager.current = ctx.dragDropManager
						return null
					}}
				</DndContext.Consumer>
				<DecoratedComponent ref={decoratedComponentRef} {...props} />
			</DndProvider>
		)
	}
	forwardedRefFunc.displayName = 'TestContextWrapper'

	return forwardRef(forwardedRefFunc)
}

/**
 * Extracts a Backend instance from a TestContext component, such as
 * one emitted from `wrapinTestContext`
 *
 * @param instance The instance to extract the backend fram
 * @deprecated - This is no longer useful since ContextComponent was removed. This will be removed in a major version cut.
 */
export function getBackendFromInstance<T extends Backend>(
	_instance: DndComponent<any>,
): T {
	return getInstance() as any
}

export function simulateDragDropSequence(
	source: DndComponent<any>,
	target: DndComponent<any>,
	backend: ITestBackend,
): void {
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
	backend: ITestBackend,
): void {
	act(() => {
		backend.simulateBeginDrag([source.getHandlerId()])
		backend.simulateHover([target.getHandlerId()])
		backend.simulateEndDrag()
	})
}
