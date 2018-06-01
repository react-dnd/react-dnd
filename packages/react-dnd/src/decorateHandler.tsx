import * as React from 'react'
import PropTypes from 'prop-types'
import isPlainObject from 'lodash/isPlainObject'
import invariant from 'invariant'
import hoistStatics from 'hoist-non-react-statics'
import { DragDropManager, Identifier } from 'dnd-core'
import { DndComponentClass, DndComponent } from './interfaces'
import { Consumer } from './DragDropContext'
import shallowEqual from 'shallowequal'
import {
	Disposable,
	CompositeDisposable,
	SerialDisposable,
} from './utils/disposables'

const isClassComponent = (Comp: any) => {
	return (
		!!Comp && !!Comp.prototype && typeof Comp.prototype.render === 'function'
	)
}

export interface DecorateHandlerArgs<
	P,
	ComponentClass extends React.ComponentClass<P>,
	ItemIdType
> {
	DecoratedComponent: ComponentClass
	createHandler: any
	createMonitor: any
	createConnector: any
	registerHandler: any
	containerDisplayName: string
	getType: (props: P) => ItemIdType
	collect: any
	options: any
}

export default function decorateHandler<
	P,
	S,
	TargetComponent extends React.Component<P, S> | React.StatelessComponent<P>,
	TargetClass extends React.ComponentClass<P>,
	ItemIdType
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
}: DecorateHandlerArgs<P, TargetClass, ItemIdType>): TargetClass &
	DndComponentClass<P, TargetComponent, TargetClass> {
	const { arePropsEqual = shallowEqual } = options
	const displayName =
		DecoratedComponent.displayName || DecoratedComponent.name || 'Component'

	interface HandlerReceiver {
		receiveHandlerId: (handlerId: Identifier | null) => void
	}
	interface Handler {
		receiveProps(props: P): void
		receiveComponent(props: P): void
	}

	interface HandlerConnector extends HandlerReceiver {
		hooks: any[]
	}

	class DragDropContainer extends React.Component<P, S>
		implements DndComponent<P, TargetComponent> {
		public static DecoratedComponent = DecoratedComponent
		public static displayName = `${containerDisplayName}(${displayName})`

		private handlerId: string | undefined
		private decoratedComponentInstance: any
		private manager: DragDropManager<any> | undefined
		private handlerMonitor: HandlerReceiver | undefined
		private handlerConnector: HandlerConnector | undefined
		private handler: Handler | undefined
		private disposable: any
		private isCurrentlyMounted: boolean = false
		private currentType: any

		constructor(props: P) {
			super(props)
			this.handleChange = this.handleChange.bind(this)
			this.handleChildRef = this.handleChildRef.bind(this)

			this.disposable = new SerialDisposable()
			this.receiveProps(props)
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

		public componentDidUpdate(prevProps: P) {
			if (!arePropsEqual(this.props, prevProps)) {
				this.receiveProps(this.props)
				this.handleChange()
			}
		}

		public componentWillUnmount() {
			this.dispose()
			this.isCurrentlyMounted = false
		}

		public receiveProps(props: any) {
			if (!this.handler) {
				return
			}
			this.handler.receiveProps(props)
			this.receiveType(getType(props))
		}

		public receiveType(type: any) {
			if (!this.handlerMonitor || !this.manager || !this.handlerConnector) {
				return
			}

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
			if (this.handlerConnector) {
				this.handlerConnector.receiveHandlerId(null)
			}
		}

		public handleChildRef(component: any) {
			if (!this.handler) {
				return
			}
			this.decoratedComponentInstance = component
			this.handler.receiveComponent(component)
		}

		public getCurrentState() {
			if (!this.handlerConnector) {
				return {}
			}
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
				<Consumer>
					{({ dragDropManager }) => {
						if (dragDropManager === undefined) {
							return null
						}
						this.receiveDragDropManager(dragDropManager)

						// Let componentDidMount fire to initialize the collected state
						if (!this.isCurrentlyMounted) {
							return null
						}

						return (
							<DecoratedComponent
								{...this.props}
								{...this.state}
								ref={
									isClassComponent(DecoratedComponent)
										? this.handleChildRef
										: null
								}
							/>
						)
					}}
				</Consumer>
			)
		}

		private receiveDragDropManager(dragDropManager: DragDropManager<any>) {
			if (this.manager !== undefined) {
				return
			}
			this.manager = dragDropManager
			invariant(
				typeof dragDropManager === 'object',
				'Could not find the drag and drop manager in the context of %s. ' +
					'Make sure to wrap the top-level component of your app with DragDropContext. ' +
					'Read more: http://react-dnd.github.io/react-dnd/docs-troubleshooting.html#could-not-find-the-drag-and-drop-manager-in-the-context',
				displayName,
				displayName,
			)
			this.handlerMonitor = createMonitor(dragDropManager)
			this.handlerConnector = createConnector(dragDropManager.getBackend())
			this.handler = createHandler(this.handlerMonitor)
		}
	}

	return hoistStatics(DragDropContainer, DecoratedComponent) as TargetClass &
		DndComponentClass<P, TargetComponent, TargetClass>
}
