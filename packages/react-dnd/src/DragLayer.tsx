import React, { Component, StatelessComponent, ComponentClass } from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import isPlainObject from 'lodash/isPlainObject'
import invariant from 'invariant'
import checkDecoratorArguments from './utils/checkDecoratorArguments'
import { IDragDropManager, Unsubscribe } from 'dnd-core'
const shallowEqual = require('shallowequal')

export default function DragLayer(collect: any, options: any = {}) {
	checkDecoratorArguments('DragLayer', 'collect[, options]', collect, options) // eslint-disable-line prefer-rest-params
	invariant(
		typeof collect === 'function',
		'Expected "collect" provided as the first argument to DragLayer to be a function that collects props to inject into the component. ',
		'Instead, received %s. Read more: http://react-dnd.github.io/react-dnd/docs-drag-layer.html',
		collect,
	)
	invariant(
		isPlainObject(options),
		'Expected "options" provided as the second argument to DragLayer to be a plain object when specified. ' +
			'Instead, received %s. Read more: http://react-dnd.github.io/react-dnd/docs-drag-layer.html',
		options,
	)

	return function decorateLayer(DecoratedComponent: ComponentClass) {
		const { arePropsEqual = shallowEqual } = options
		const displayName =
			DecoratedComponent.displayName || DecoratedComponent.name || 'Component'

		class DragLayerContainer extends React.Component<any> {
			static DecoratedComponent = DecoratedComponent
			static displayName = `DragLayer(${displayName})`
			static contextTypes = {
				dragDropManager: PropTypes.object.isRequired,
			}

			private manager: IDragDropManager<any>
			private isCurrentlyMounted: boolean = false
			private unsubscribeFromOffsetChange: Unsubscribe | undefined
			private unsubscribeFromStateChange: Unsubscribe | undefined
			private child: any

			getDecoratedComponentInstance() {
				invariant(
					this.child,
					'In order to access an instance of the decorated component it can not be a stateless component.',
				)
				return this.child
			}

			shouldComponentUpdate(nextProps: any, nextState: any) {
				return (
					!arePropsEqual(nextProps, this.props) ||
					!shallowEqual(nextState, this.state)
				)
			}

			constructor(props: any, context: any) {
				super(props)
				this.handleChange = this.handleChange.bind(this)
				this.manager = context.dragDropManager

				invariant(
					typeof this.manager === 'object',
					'Could not find the drag and drop manager in the context of %s. ' +
						'Make sure to wrap the top-level component of your app with DragDropContext. ' +
						'Read more: http://react-dnd.github.io/react-dnd/docs-troubleshooting.html#could-not-find-the-drag-and-drop-manager-in-the-context',
					displayName,
					displayName,
				)

				this.state = this.getCurrentState()
			}

			componentDidMount() {
				this.isCurrentlyMounted = true

				const monitor = this.manager.getMonitor()
				this.unsubscribeFromOffsetChange = monitor.subscribeToOffsetChange(
					this.handleChange,
				)
				this.unsubscribeFromStateChange = monitor.subscribeToStateChange(
					this.handleChange,
				)

				this.handleChange()
			}

			componentWillUnmount() {
				this.isCurrentlyMounted = false
				if (this.unsubscribeFromOffsetChange) {
					this.unsubscribeFromOffsetChange()
					this.unsubscribeFromOffsetChange = undefined
				}
				if (this.unsubscribeFromStateChange) {
					this.unsubscribeFromStateChange()
					this.unsubscribeFromStateChange = undefined
				}
			}

			handleChange() {
				if (!this.isCurrentlyMounted) {
					return
				}

				const nextState = this.getCurrentState()
				if (!shallowEqual(nextState, this.state)) {
					this.setState(nextState)
				}
			}

			getCurrentState() {
				const monitor = this.manager.getMonitor()
				return collect(monitor, this.props)
			}

			render() {
				return (
					<DecoratedComponent
						{...this.props}
						{...this.state}
						ref={child => {
							this.child = child
						}}
					/>
				)
			}
		}

		return hoistStatics(DragLayerContainer, DecoratedComponent)
	}
}
