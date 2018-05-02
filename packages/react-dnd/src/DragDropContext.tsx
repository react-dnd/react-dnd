import React, { Component, ComponentClass } from 'react'
import PropTypes from 'prop-types'
import { DragDropManager, IBackend, BackendFactory } from 'dnd-core'
import invariant from 'invariant'
import hoistStatics from 'hoist-non-react-statics'
import checkDecoratorArguments from './utils/checkDecoratorArguments'
import { IContextComponent } from './interfaces'

export const CHILD_CONTEXT_TYPES = {
	dragDropManager: PropTypes.object.isRequired,
}

export function createChildContext<Context>(
	backend: BackendFactory,
	context: Context,
) {
	return {
		dragDropManager: new DragDropManager(backend, context),
	}
}

export default function DragDropContext(
	backendFactory: BackendFactory,
	context?: any,
) {
	checkDecoratorArguments('DragDropContext', 'backend', backendFactory) // eslint-disable-line prefer-rest-params
	const childContext = createChildContext(backendFactory, context)

	return function decorateContext<T extends React.ComponentClass<any>>(
		DecoratedComponent: T,
	): T & IContextComponent<any, any> {
		const displayName =
			DecoratedComponent.displayName || DecoratedComponent.name || 'Component'

		class DragDropContextContainer extends React.Component<any>
			implements IContextComponent<any, any> {
			public static DecoratedComponent = DecoratedComponent
			public static displayName = `DragDropContext(${displayName})`
			public static childContextTypes = CHILD_CONTEXT_TYPES

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

			public getChildContext() {
				return childContext
			}

			public render() {
				return (
					<DecoratedComponent
						{...this.props}
						ref={(child: any) => (this.child = child)}
					/>
				)
			}
		}

		return hoistStatics(DragDropContextContainer, DecoratedComponent) as any
	}
}
