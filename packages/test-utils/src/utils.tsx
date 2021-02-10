/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ref, ComponentType, Component, forwardRef } from 'react'
import {
	TestBackend,
	ITestBackend,
	TestBackendOptions,
} from 'react-dnd-test-backend'
import { DndComponent, DndProvider } from 'react-dnd'
import { act } from 'react-dom/test-utils'

/**
 * Wrap a DnD component or test case in a DragDropContext
 *
 * @param DecoratedComponent The component to decorate
 */
export function wrapInTestContext<T>(
	DecoratedComponent: ComponentType<T>,
): [ComponentType<T>, () => ITestBackend | undefined] {
	let backend: ITestBackend | undefined
	const testBackendOptions: TestBackendOptions = {
		onCreate(be) {
			backend = be
		},
	}

	class TestContextWrapper extends Component<
		T & {
			forwardedRef: Ref<any>
		}
	> {
		public render() {
			const { forwardedRef, ...rest } = this.props
			return (
				<DndProvider backend={TestBackend} options={testBackendOptions}>
					<DecoratedComponent ref={forwardedRef} {...(rest as T)} />
				</DndProvider>
			)
		}
	}
	const ForwardedComponent = forwardRef<unknown, T>(
		function ForwardedTestContextWrapper(props, ref) {
			return <TestContextWrapper {...props} forwardedRef={ref} />
		},
	)

	return [
		(ForwardedComponent as unknown) as React.ComponentType<T>,
		() => backend,
	]
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
