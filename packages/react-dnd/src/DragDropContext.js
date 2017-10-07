import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragDropManager } from 'dnd-core'
import invariant from 'invariant'
import hoistStatics from 'hoist-non-react-statics'
import checkDecoratorArguments from './utils/checkDecoratorArguments'

export const CHILD_CONTEXT_TYPES = {
	dragDropManager: PropTypes.object.isRequired,
}

export const createChildContext = (backend, context) => ({
	dragDropManager: new DragDropManager(backend, context),
})

export const unpackBackendForEs5Users = backendOrModule => {
	// Auto-detect ES6 default export for people still using ES5
	let backend = backendOrModule
	if (typeof backend === 'object' && typeof backend.default === 'function') {
		backend = backend.default
	}
	invariant(
		typeof backend === 'function',
		'Expected the backend to be a function or an ES6 module exporting a default function. ' +
			'Read more: http://react-dnd.github.io/react-dnd/docs-drag-drop-context.html',
	)
	return backend
}

export default function DragDropContext(backendOrModule) {
	checkDecoratorArguments('DragDropContext', 'backend', ...arguments) // eslint-disable-line prefer-rest-params

	const backend = unpackBackendForEs5Users(backendOrModule)
	const childContext = createChildContext(backend)

	return function decorateContext(DecoratedComponent) {
		const displayName =
			DecoratedComponent.displayName || DecoratedComponent.name || 'Component'

		class DragDropContextContainer extends Component {
			static DecoratedComponent = DecoratedComponent

			static displayName = `DragDropContext(${displayName})`

			static childContextTypes = CHILD_CONTEXT_TYPES

			getDecoratedComponentInstance() {
				invariant(
					this.child,
					'In order to access an instance of the decorated component it can not be a stateless component.',
				)
				return this.child
			}

			getManager() {
				return childContext.dragDropManager
			}

			getChildContext() {
				return childContext
			}

			render() {
				return (
					<DecoratedComponent
						{...this.props}
						ref={child => {
							this.child = child
						}}
					/>
				)
			}
		}

		return hoistStatics(DragDropContextContainer, DecoratedComponent)
	}
}
