import * as React from 'react'
import invariant from 'invariant'
import { BackendFactory } from 'dnd-core'
import hoistStatics from 'hoist-non-react-statics'
import { DndContext, createDndContext } from '../common/DndContext'
import { checkDecoratorArguments, isRefable } from './utils'
import { ContextComponent } from './interfaces'

/**
 * @deprecated Use DnDProvider in your JSX tree instead. This will be removed in a future major version.
 *
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
			public constructor(props: any, context: any) {
				super(props, context)
				// eslint-disable-next-line no-console
				console.warn(
					`DragDropContext has been deprecated and will be removed in a future version. Please use DndProvider instead.`,
				)
			}

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
