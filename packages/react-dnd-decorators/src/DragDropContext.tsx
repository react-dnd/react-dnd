import * as React from 'react'
import { DndContext, createDndContext } from 'react-dnd'
import { BackendFactory } from 'dnd-core'
import checkDecoratorArguments from './utils/checkDecoratorArguments'
import { ContextComponent } from './interfaces'
import { isRefable } from './utils/isRefable'
// @ts-ignore
import invariant from 'invariant'
// @ts-ignore
import hoistStatics from 'hoist-non-react-statics'

/**
 * Wrap the root component of your application with DragDropContext decorator to set up React DnD.
 * This lets you specify the backend, and sets up the shared DnD state behind the scenes.
 * @param backendFactory The DnD backend factory
 * @param backendContext The backend context
 */
export function DragDropContext(
	backendFactory: BackendFactory,
	backendContext?: any,
	debugMode?: boolean,
) {
	checkDecoratorArguments('DragDropContext', 'backend', backendFactory)
	const childContext = createDndContext(
		backendFactory,
		backendContext,
		debugMode,
	)

	return function decorateContext<
		TargetClass extends
			| React.ComponentClass<any>
			| React.StatelessComponent<any>
	>(DecoratedComponent: TargetClass): TargetClass & ContextComponent<any> {
		const Decorated = DecoratedComponent as any
		const displayName = Decorated.displayName || Decorated.name || 'Component'

		class DragDropContextContainer extends React.Component<any>
			implements ContextComponent<any> {
			public static DecoratedComponent = DecoratedComponent
			public static displayName = `DragDropContext(${displayName})`

			private ref: React.RefObject<any> = React.createRef()

			public getDecoratedComponentInstance() {
				invariant(
					this.ref.current,
					'In order to access an instance of the decorated component, it must either be a class component or use React.forwardRef()',
				)
				return this.ref.current
			}

			public getManager = () => childContext.dragDropManager

			public render() {
				return (
					<DndContext.Provider value={childContext}>
						{/* If decorated is an FC, then the reff will be blank */}
						<Decorated
							{...this.props}
							ref={isRefable(Decorated) ? this.ref : null}
						/>
					</DndContext.Provider>
				)
			}
		}

		return (hoistStatics(
			DragDropContextContainer,
			DecoratedComponent,
		) as any) as TargetClass & DragDropContextContainer
	}
}
