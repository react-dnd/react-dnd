/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ref, ComponentType, Component, forwardRef } from 'react'
import { Identifier } from 'dnd-core'
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

	return [(ForwardedComponent as unknown) as ComponentType<T>, () => backend]
}

export function simulateDragDropSequence(
	source: HandlerIdProvider,
	target: HandlerIdProvider,
	backend: ITestBackend,
): void {
	const sourceHandlerId = getHandlerId(source)
	const targetHandlerId = getHandlerId(target)
	act(() => {
		backend.simulateBeginDrag([sourceHandlerId])
		backend.simulateHover([targetHandlerId])
		backend.simulateDrop()
		backend.simulateEndDrag()
	})
}

export function simulateHoverSequence(
	source: HandlerIdProvider,
	target: HandlerIdProvider,
	backend: ITestBackend,
): void {
	const sourceHandlerId = getHandlerId(source)
	const targetHandlerId = getHandlerId(target)
	act(() => {
		backend.simulateBeginDrag([sourceHandlerId])
		backend.simulateHover([targetHandlerId])
		backend.simulateEndDrag()
	})
}

function getHandlerId(provider: HandlerIdProvider): Identifier {
	if (typeof provider === 'string' || typeof provider === 'symbol') {
		return provider
	} else if (typeof provider === 'function') {
		return provider() as Identifier
	} else if (typeof provider?.getHandlerId === 'function') {
		return provider.getHandlerId()
	} else {
		throw new Error('Could not get handlerId from DnD source')
	}
}
export type HandlerIdProvider =
	| Identifier
	| DndComponent<any>
	| (() => Identifier | null)
