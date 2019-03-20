declare var require: any
declare var process: any

import * as React from 'react'
import { DragDropManager, Identifier } from 'dnd-core'
import { DndComponentClass, DndComponent } from './interfaces'
import { Consumer } from './DragDropContext'
import {
	Disposable,
	CompositeDisposable,
	SerialDisposable,
} from './utils/disposables'
const isClassComponent = require('recompose/isClassComponent').default
const isPlainObject = require('lodash/isPlainObject')
const invariant = require('invariant')
const hoistStatics = require('hoist-non-react-statics')
const shallowEqual = require('shallowequal')

export interface DecorateHandlerArgs<Props, ItemIdType> {
	DecoratedComponent: any
	createMonitor: (manager: DragDropManager<any>) => HandlerReceiver
	createHandler: (
		monitor: HandlerReceiver,
		ref: React.RefObject<any>,
	) => Handler<Props>
	createConnector: any
	registerHandler: any
	containerDisplayName: string
	getType: (props: Props) => ItemIdType
	collect: any
	options: any
}

interface HandlerReceiver {
	receiveHandlerId: (handlerId: Identifier | null) => void
}
interface Handler<Props> {
	ref: React.RefObject<any>
	receiveProps(props: Props): void
}

interface HandlerConnector extends HandlerReceiver {
	hooks: any[]
	receiveHandlerId: (handleId: any) => void
	reconnect: () => void
}

export default function decorateHandler<Props, ItemIdType>({
	DecoratedComponent,
	createHandler,
	createMonitor,
	createConnector,
	registerHandler,
	containerDisplayName,
	getType,
	collect,
	options,
}: DecorateHandlerArgs<Props, ItemIdType>): DndComponentClass<Props> {
	const { arePropsEqual = shallowEqual } = options
	const Decorated: any = DecoratedComponent

	const displayName =
		DecoratedComponent.displayName || DecoratedComponent.name || 'Component'

	class DragDropContainer extends React.Component<Props>
		implements DndComponent<Props> {
		public static DecoratedComponent = DecoratedComponent
		public static displayName = `${containerDisplayName}(${displayName})`

		private handlerId: string | undefined
		private manager: DragDropManager<any> | undefined
		private handlerMonitor: HandlerReceiver | undefined
		private handlerConnector: HandlerConnector | undefined
		private handler: Handler<Props> | undefined
		private disposable: any
		private currentType: any

		constructor(props: Props) {
			super(props)
			this.disposable = new SerialDisposable()
			this.receiveProps(props)
			this.dispose()
		}

		public getHandlerId() {
			return this.handlerId as string
		}

		public getDecoratedComponentInstance() {
			if (!this.handler) {
				return null
			}
			return this.handler.ref.current as any
		}

		public shouldComponentUpdate(nextProps: any, nextState: any) {
			return (
				!arePropsEqual(nextProps, this.props) ||
				!shallowEqual(nextState, this.state)
			)
		}

		public componentDidMount() {
			this.disposable = new SerialDisposable()
			this.currentType = undefined
			this.receiveProps(this.props)
			this.handleChange()
		}

		public componentDidUpdate(prevProps: Props) {
			if (!arePropsEqual(this.props, prevProps)) {
				this.receiveProps(this.props)
				this.handleChange()
			}
		}

		public componentWillUnmount() {
			this.dispose()
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

			const [handlerId, unregister] = registerHandler(
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

		public handleChange = () => {
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
						requestAnimationFrame(() => this.handlerConnector!.reconnect())

						return (
							<Decorated
								{...this.props}
								{...this.getCurrentState()}
								ref={
									this.handler && isClassComponent(Decorated)
										? this.handler.ref
										: undefined
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
			const itemRef = React.createRef<any>()
			this.handlerMonitor = createMonitor(dragDropManager)
			this.handlerConnector = createConnector(dragDropManager.getBackend())
			this.handler = createHandler(this.handlerMonitor, itemRef)
		}
	}

	return hoistStatics(
		DragDropContainer,
		DecoratedComponent,
	) as DndComponentClass<Props>
}
