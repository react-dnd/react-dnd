declare const process: any

import { RefObject, createRef, Component } from 'react'
import { shallowEqual } from '@react-dnd/shallowequal'
import { invariant } from '@react-dnd/invariant'
import { DragDropManager, Identifier } from 'dnd-core'
import { DndContext } from '../core'
import { Connector } from '../internals'
import { isPlainObject } from './utils'
import { DndComponent } from './types'
import {
	Disposable,
	CompositeDisposable,
	SerialDisposable,
} from './disposables'
import { isRefable } from './utils'
import hoistStatics from 'hoist-non-react-statics'

export interface DecorateHandlerArgs<Props, ItemIdType> {
	DecoratedComponent: any
	createMonitor: (manager: DragDropManager) => HandlerReceiver
	createHandler: (
		monitor: HandlerReceiver,
		ref: RefObject<any>,
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
	ref: RefObject<any>
	receiveProps(props: Props): void
}

export function decorateHandler<Props, CollectedProps, ItemIdType>({
	DecoratedComponent,
	createHandler,
	createMonitor,
	createConnector,
	registerHandler,
	containerDisplayName,
	getType,
	collect,
	options,
}: DecorateHandlerArgs<Props, ItemIdType>): DndComponent<Props> {
	const { arePropsEqual = shallowEqual } = options
	const Decorated: any = DecoratedComponent

	const displayName =
		DecoratedComponent.displayName || DecoratedComponent.name || 'Component'

	class DragDropContainer
		extends Component<Props>
		implements DndComponent<Props>
	{
		public static DecoratedComponent = DecoratedComponent
		public static displayName = `${containerDisplayName}(${displayName})`

		private decoratedRef = createRef()
		private handlerId: string | undefined
		private manager: DragDropManager | undefined
		private handlerMonitor: HandlerReceiver | undefined
		private handlerConnector: Connector | undefined
		private handler: Handler<Props> | undefined
		private disposable: any
		private currentType: any

		public constructor(props: Props) {
			super(props)
			this.disposable = new SerialDisposable()
			this.receiveProps(props)
			this.dispose()
		}

		public getHandlerId() {
			return this.handlerId as string
		}

		public getDecoratedComponentInstance() {
			invariant(
				this.decoratedRef.current,
				'In order to access an instance of the decorated component, it must either be a class component or use React.forwardRef()',
			)
			return this.decoratedRef.current as any
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

		public getCurrentState(): CollectedProps {
			if (!this.handlerConnector) {
				return {} as CollectedProps
			}
			const nextState = collect(
				this.handlerConnector.hooks,
				this.handlerMonitor,
				this.props,
			) as CollectedProps

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
				<DndContext.Consumer>
					{({ dragDropManager }) => {
						this.receiveDragDropManager(dragDropManager)
						if (typeof requestAnimationFrame !== 'undefined') {
							requestAnimationFrame(() => this.handlerConnector?.reconnect())
						}
						return (
							<Decorated
								{...this.props}
								{...this.getCurrentState()}
								// NOTE: if Decorated is a Function Component, decoratedRef will not be populated unless it's a refforwarding component.
								ref={isRefable(Decorated) ? this.decoratedRef : null}
							/>
						)
					}}
				</DndContext.Consumer>
			)
		}

		private receiveDragDropManager(dragDropManager?: DragDropManager) {
			if (this.manager !== undefined) {
				return
			}

			invariant(
				dragDropManager !== undefined,
				'Could not find the drag and drop manager in the context of %s. ' +
					'Make sure to render a DndProvider component in your top-level component. ' +
					'Read more: http://react-dnd.github.io/react-dnd/docs/troubleshooting#could-not-find-the-drag-and-drop-manager-in-the-context',
				displayName,
				displayName,
			)
			if (dragDropManager === undefined) {
				return
			}

			this.manager = dragDropManager
			this.handlerMonitor = createMonitor(dragDropManager)
			this.handlerConnector = createConnector(dragDropManager.getBackend())
			this.handler = createHandler(this.handlerMonitor, this.decoratedRef)
		}
	}

	return hoistStatics(
		DragDropContainer,
		DecoratedComponent,
	) as any as DndComponent<Props>
}
