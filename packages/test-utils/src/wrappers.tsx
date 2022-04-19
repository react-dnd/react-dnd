import type { BackendFactory } from 'dnd-core'
import type { ComponentType, Ref } from 'react'
import { Component, forwardRef } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import type { ITestBackend, TestBackendOptions } from 'react-dnd-test-backend'
import { TestBackend } from 'react-dnd-test-backend'

/**
 * Wrap a Component with a DnDContext using the TestBackend
 *
 * @param DecoratedComponent The component to decorate
 * @returns [Component, getBackend] The wrapped component and a utility method
 * to get the test backend instance.
 */
export function wrapWithTestBackend<T>(
	DecoratedComponent: ComponentType<T>,
): [ComponentType<T>, () => ITestBackend | undefined] {
	let backend: ITestBackend | undefined
	const opts: TestBackendOptions = {
		onCreate(be) {
			backend = be
		},
	}
	const result = wrapWithBackend(DecoratedComponent, TestBackend, opts)
	return [result, () => backend]
}

/**
 * Wrap a component with a DndContext providing a backend.
 *
 * @param DecoratedComponent The compoent to decorate
 * @param Backend The backend to use (default=HTML5Backend)
 * @param backendOptions The optional backend options
 */
export function wrapWithBackend<T>(
	DecoratedComponent: ComponentType<T>,
	Backend: BackendFactory = HTML5Backend,
	backendOptions?: unknown,
): ComponentType<T> {
	class TestContextWrapper extends Component<
		T & {
			forwardedRef: Ref<any>
		}
	> {
		public override render() {
			const { forwardedRef, ...rest } = this.props
			return (
				<DndProvider backend={Backend} options={backendOptions}>
					<DecoratedComponent ref={forwardedRef} {...(rest as any as T)} />
				</DndProvider>
			)
		}
	}
	const ForwardedComponent = forwardRef<unknown, T>(
		function ForwardedTestContextWrapper(props, ref) {
			return <TestContextWrapper {...props} forwardedRef={ref} />
		},
	)
	return ForwardedComponent as unknown as ComponentType<T>
}
