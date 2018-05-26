import React, { Component, StatelessComponent, ComponentClass } from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import isPlainObject from 'lodash/isPlainObject'
import invariant from 'invariant'
import checkDecoratorArguments from './utils/checkDecoratorArguments'
import { DragDropManager, Unsubscribe } from 'dnd-core'
import { DragLayerCollector, DndOptions, DndComponentClass } from './interfaces'

const shallowEqual = require('shallowequal')

export default function DragLayer<
	P,
	S,
	TargetComponent extends React.Component<P, S> | React.StatelessComponent<P>,
	CollectedProps
>(collect: DragLayerCollector<P, CollectedProps>, options: DndOptions<P> = {}) {
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

	return function decorateLayer<TargetClass extends React.ComponentClass<P>>(
		DecoratedComponent: TargetClass,
	): TargetClass & DndComponentClass<P, S, TargetComponent, TargetClass> {
		const { arePropsEqual = shallowEqual } = options
		const displayName =
			DecoratedComponent.displayName || DecoratedComponent.name || 'Component'

		class DragLayerContainer extends React.Component<P> {
			public static displayName = `DragLayer(${displayName})`
			public static contextTypes = {
				dragDropManager: PropTypes.object.isRequired,
			}

			public get DecoratedComponent() {
				return DecoratedComponent
			}

			private manager: DragDropManager<any>
			private isCurrentlyMounted: boolean = false
			private unsubscribeFromOffsetChange: Unsubscribe | undefined
			private unsubscribeFromStateChange: Unsubscribe | undefined
			private child: any

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

			public getDecoratedComponentInstance() {
				invariant(
					this.child,
					'In order to access an instance of the decorated component it can not be a stateless component.',
				)
				return this.child
			}

			public shouldComponentUpdate(nextProps: any, nextState: any) {
				return (
					!arePropsEqual(nextProps, this.props) ||
					!shallowEqual(nextState, this.state)
				)
			}

			public componentDidMount() {
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

			public componentWillUnmount() {
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

			public render() {
				return (
					<DecoratedComponent
						{...this.props}
						{...this.state}
						ref={(child: any) => {
							this.child = child
						}}
					/>
				)
			}
			private handleChange() {
				if (!this.isCurrentlyMounted) {
					return
				}

				const nextState = this.getCurrentState()
				if (!shallowEqual(nextState, this.state)) {
					this.setState(nextState)
				}
			}

			private getCurrentState() {
				const monitor = this.manager.getMonitor()
				return collect(monitor, this.props)
			}
		}

		return hoistStatics(DragLayerContainer, DecoratedComponent) as TargetClass &
			DndComponentClass<P, S, TargetComponent, TargetClass>
	}
}
