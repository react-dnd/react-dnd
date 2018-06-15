import * as React from 'react'
import {
	DragDropManager,
	BackendFactory,
	createDragDropManager,
} from 'dnd-core'
import checkDecoratorArguments from './utils/checkDecoratorArguments'
import { ContextComponent } from './interfaces'
const invariant = require('invariant')
const hoistStatics = require('hoist-non-react-statics')

/**
 * The React context type
 */
export interface DragDropContext<BC> {
	dragDropManager: DragDropManager<BC> | undefined
}

/**
 * Create the React Context
 */
export const { Consumer, Provider } = React.createContext<DragDropContext<any>>(
	{ dragDropManager: undefined },
)

/**
 * Creates the context object we're providing
 * @param backend
 * @param context
 */
export function createChildContext<BackendContext>(
	backend: BackendFactory,
	context?: BackendContext,
) {
	return {
		dragDropManager: createDragDropManager(backend, context),
	}
}

export interface DragDropContextProviderProps<BackendContext> {
	backend: BackendFactory
	context?: BackendContext
}

/**
 * A React component that provides the React-DnD context
 */
export const DragDropContextProvider: React.SFC<
	DragDropContextProviderProps<any>
> = ({ backend, context, children }) => {
	const contextValue = createChildContext(backend, context)
	return <Provider value={contextValue}>{children}</Provider>
}

/**
 * Wrap the root component of your application with DragDropContext decorator to set up React DnD.
 * This lets you specify the backend, and sets up the shared DnD state behind the scenes.
 * @param backendFactory The DnD backend factory
 * @param backendContext The backend context
 */
export function DragDropContext<
	P,
	S,
	TargetComponent extends React.Component<P, S> | React.StatelessComponent<P>
>(backendFactory: BackendFactory, backendContext?: any) {
	checkDecoratorArguments('DragDropContext', 'backend', backendFactory)
	const childContext = createChildContext(backendFactory, backendContext)

	return function decorateContext<TargetClass extends React.ComponentClass<P>>(
		DecoratedComponent: TargetClass,
	): TargetClass & ContextComponent<P, S, TargetComponent> {
		const displayName =
			DecoratedComponent.displayName || DecoratedComponent.name || 'Component'

		class DragDropContextContainer extends React.Component<P, S>
			implements ContextComponent<P, S, TargetComponent> {
			public static DecoratedComponent = DecoratedComponent
			public static displayName = `DragDropContext(${displayName})`

			private child: any

			public getDecoratedComponentInstance() {
				invariant(
					this.child,
					'In order to access an instance of the decorated component it can not be a stateless component.',
				)
				return this.child
			}

			public getManager() {
				return childContext.dragDropManager
			}

			public render() {
				return (
					<Provider value={childContext}>
						<DecoratedComponent
							{...this.props}
							ref={(child: any) => (this.child = child)}
						/>
					</Provider>
				)
			}
		}

		return hoistStatics(
			DragDropContextContainer,
			DecoratedComponent,
		) as TargetClass & DragDropContextContainer
	}
}
