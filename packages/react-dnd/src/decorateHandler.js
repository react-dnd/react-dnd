import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Disposable, CompositeDisposable, SerialDisposable } from 'disposables'
import isPlainObject from 'lodash/isPlainObject'
import invariant from 'invariant'
import hoistStatics from 'hoist-non-react-statics'
import shallowEqual from './utils/shallowEqual'
import shallowEqualScalar from './utils/shallowEqualScalar'

const isClassComponent = Comp =>
	Boolean(Comp && Comp.prototype && typeof Comp.prototype.render === 'function')

export default function decorateHandler({
	DecoratedComponent,
	createHandler,
	createMonitor,
	createConnector,
	registerHandler,
	containerDisplayName,
	getType,
	collect,
	options,
}) {
	const { arePropsEqual = shallowEqualScalar } = options
	const displayName =
		DecoratedComponent.displayName || DecoratedComponent.name || 'Component'

	class DragDropContainer extends Component {
		static DecoratedComponent = DecoratedComponent

		static displayName = `${containerDisplayName}(${displayName})`

		static contextTypes = {
			dragDropManager: PropTypes.object.isRequired,
		}

		getHandlerId() {
			return this.handlerId
		}

		getDecoratedComponentInstance() {
			return this.decoratedComponentInstance
		}

		shouldComponentUpdate(nextProps, nextState) {
			return (
				!arePropsEqual(nextProps, this.props) ||
				!shallowEqual(nextState, this.state)
			)
		}

		constructor(props, context) {
			super(props, context)
			this.handleChange = this.handleChange.bind(this)
			this.handleChildRef = this.handleChildRef.bind(this)

			invariant(
				typeof this.context.dragDropManager === 'object',
				'Could not find the drag and drop manager in the context of %s. ' +
					'Make sure to wrap the top-level component of your app with DragDropContext. ' +
					'Read more: http://react-dnd.github.io/react-dnd/docs-troubleshooting.html#could-not-find-the-drag-and-drop-manager-in-the-context',
				displayName,
				displayName,
			)

			this.manager = this.context.dragDropManager
			this.handlerMonitor = createMonitor(this.manager)
			this.handlerConnector = createConnector(this.manager.getBackend())
			this.handler = createHandler(this.handlerMonitor)

			this.disposable = new SerialDisposable()
			this.receiveProps(props)
			this.state = this.getCurrentState()
			this.dispose()
		}

		componentDidMount() {
			this.isCurrentlyMounted = true
			this.disposable = new SerialDisposable()
			this.currentType = null
			this.receiveProps(this.props)
			this.handleChange()
		}

		componentWillReceiveProps(nextProps) {
			if (!arePropsEqual(nextProps, this.props)) {
				this.receiveProps(nextProps)
				this.handleChange()
			}
		}

		componentWillUnmount() {
			this.dispose()
			this.isCurrentlyMounted = false
		}

		receiveProps(props) {
			this.handler.receiveProps(props)
			this.receiveType(getType(props))
		}

		receiveType(type) {
			if (type === this.currentType) {
				return
			}

			this.currentType = type

			const { handlerId, unregister } = registerHandler(
				type,
				this.handler,
				this.manager,
			)

			this.handlerId = handlerId
			this.handlerMonitor.receiveHandlerId(handlerId)
			this.handlerConnector.receiveHandlerId(handlerId)

			const globalMonitor = this.manager.getMonitor()
			const unsubscribe = globalMonitor.subscribeToStateChange(
				this.handleChange,
				{ handlerIds: [handlerId] },
			)

			this.disposable.setDisposable(
				new CompositeDisposable(
					new Disposable(unsubscribe),
					new Disposable(unregister),
				),
			)
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

		dispose() {
			this.disposable.dispose()
			this.handlerConnector.receiveHandlerId(null)
		}

		handleChildRef(component) {
			this.decoratedComponentInstance = component
			this.handler.receiveComponent(component)
		}

		getCurrentState() {
			const nextState = collect(
				this.handlerConnector.hooks,
				this.handlerMonitor,
			)

			if (process.env.NODE_ENV !== 'production') {
				invariant(
					isPlainObject(nextState),
					'Expected `collect` specified as the second argument to ' +
						'%s for %s to return a plain object of props to inject. ' +
						'Instead, received %s.',
					containerDisplayName,
					displayName,
					nextState,
				)
			}

			return nextState
		}

		render() {
			return React.createElement(DecoratedComponent, {
				...this.props,
				...this.state,
				ref: isClassComponent(DecoratedComponent) ? this.handleChildRef : null,
			})
		}
	}

	return hoistStatics(DragDropContainer, DecoratedComponent)
}
