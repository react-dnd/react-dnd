import * as React from 'react'
import PropTypes from 'prop-types'
import isPlainObject from 'lodash/isPlainObject'
import invariant from 'invariant'
import hoistStatics from 'hoist-non-react-statics'
import { DragDropManager, Identifier } from 'dnd-core'
import { DndComponentClass, DndComponent } from './interfaces'

const shallowEqual = require('shallowequal')
const {
	Disposable,
	CompositeDisposable,
	SerialDisposable,
} = require('disposables')

const isClassComponent = (Comp: any) => {
	return (
		!!Comp && !!Comp.prototype && typeof Comp.prototype.render === 'function'
	)
}

export interface DecorateHandlerArgs<
	P,
	ComponentClass extends React.ComponentClass<P>
> {
	DecoratedComponent: ComponentClass
	createHandler: any
	createMonitor: any
	createConnector: any
	registerHandler: any
	containerDisplayName: string
	getType: any
	collect: any
	options: any
}

interface HandlerReceiver {
	receiveHandlerId: (handlerId: Identifier) => void
}

export default function decorateHandler<
	P,
	S,
	TargetComponent extends React.Component<P, S> | React.StatelessComponent<P>,
	TargetClass extends React.ComponentClass<P>
>({
	DecoratedComponent,
	createHandler,
	createMonitor,
	createConnector,
	registerHandler,
	containerDisplayName,
	getType,
	collect,
	options,
}: DecorateHandlerArgs<P, TargetClass>): TargetClass &
	DndComponentClass<P, S, TargetComponent, TargetClass> {
	const { arePropsEqual = shallowEqual } = options
	const displayName =
		DecoratedComponent.displayName || DecoratedComponent.name || 'Component'

	class DragDropContainer extends React.Component<P, S>
		implements DndComponent<P, S, TargetComponent> {
		public static DecoratedComponent = DecoratedComponent
		public static displayName = `${containerDisplayName}(${displayName})`
		public static contextTypes = {
			dragDropManager: PropTypes.object.isRequired,
		}

		private handlerId: string | undefined
		private decoratedComponentInstance: any
		private manager: DragDropManager<any>
		private handlerMonitor: HandlerReceiver
		private handlerConnector: any
		private handler: any
		private disposable: any
		private isCurrentlyMounted: boolean = false
		private currentType: any

		constructor(props: P, context: any) {
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

		public getHandlerId() {
			return this.handlerId as string
		}

		public getDecoratedComponentInstance() {
			return this.decoratedComponentInstance
		}

		public shouldComponentUpdate(nextProps: any, nextState: any) {
			return (
				!arePropsEqual(nextProps, this.props) ||
				!shallowEqual(nextState, this.state)
			)
		}

		public componentDidMount() {
			this.isCurrentlyMounted = true
			this.disposable = new SerialDisposable()
			this.currentType = undefined
			this.receiveProps(this.props)
			this.handleChange()
		}

		public componentWillReceiveProps(nextProps: any) {
			if (!arePropsEqual(nextProps, this.props)) {
				this.receiveProps(nextProps)
				this.handleChange()
			}
		}

		public componentWillUnmount() {
			this.dispose()
			this.isCurrentlyMounted = false
		}

		public receiveProps(props: any) {
			this.handler.receiveProps(props)
			this.receiveType(getType(props))
		}

		public receiveType(type: any) {
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

		public handleChange() {
			if (!this.isCurrentlyMounted) {
				return
			}

			const nextState = this.getCurrentState()
			if (!shallowEqual(nextState, this.state)) {
				this.setState(nextState)
			}
		}

		public dispose() {
			this.disposable.dispose()
			this.handlerConnector.receiveHandlerId(null)
		}

		public handleChildRef(component: any) {
			this.decoratedComponentInstance = component
			this.handler.receiveComponent(component)
		}

		public getCurrentState() {
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

		public render() {
			return (
				<DecoratedComponent
					{...this.props}
					{...this.state}
					ref={
						isClassComponent(DecoratedComponent) ? this.handleChildRef : null
					}
				/>
			)
		}
	}

	return hoistStatics(DragDropContainer, DecoratedComponent) as TargetClass &
		DndComponentClass<P, S, TargetComponent, TargetClass>
}
