import React, { Component, ComponentClass } from 'react'
import PropTypes from 'prop-types'
import {
	DragDropManager,
	Backend,
	BackendFactory,
	createDragDropManager,
} from 'dnd-core'
import invariant from 'invariant'
import hoistStatics from 'hoist-non-react-statics'
import checkDecoratorArguments from './utils/checkDecoratorArguments'
import { ContextComponent } from './interfaces'
import { Target } from './createTargetFactory'

export const CHILD_CONTEXT_TYPES = {
	dragDropManager: PropTypes.object.isRequired,
}

export function createChildContext<Context>(
	backend: BackendFactory,
	context?: Context,
) {
	return {
		dragDropManager: createDragDropManager(backend, context),
	}
}

export default function DragDropContext<
	P,
	S,
	TargetComponent extends React.Component<P, S> | React.StatelessComponent<P>
>(backendFactory: BackendFactory, context?: any) {
	checkDecoratorArguments('DragDropContext', 'backend', backendFactory) // eslint-disable-line prefer-rest-params
	const childContext = createChildContext(backendFactory, context)

	return function decorateContext<TargetClass extends React.ComponentClass<P>>(
		DecoratedComponent: TargetClass,
	): TargetClass & ContextComponent<P, S, TargetComponent> {
		const displayName =
			DecoratedComponent.displayName || DecoratedComponent.name || 'Component'

		class DragDropContextContainer extends React.Component<P, S>
			implements ContextComponent<P, S, TargetComponent> {
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

		return hoistStatics(
			DragDropContextContainer,
			DecoratedComponent,
		) as TargetClass & DragDropContextContainer
	}
}
