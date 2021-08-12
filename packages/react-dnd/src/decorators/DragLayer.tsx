import {
	createRef,
	RefObject,
	Component,
	ComponentType as RComponentType,
} from 'react'
import { DragDropManager, Unsubscribe } from 'dnd-core'
import { shallowEqual } from '@react-dnd/shallowequal'
import { invariant } from '@react-dnd/invariant'
import hoistStatics from 'hoist-non-react-statics'
import { DndContext } from '../core'
import { DragLayerCollector, DndComponentEnhancer, DndOptions } from './types'
import { isRefable, checkDecoratorArguments, isPlainObject } from './utils'

/**
 * @param collect The props collector function
 * @param options The DnD options
 */
export function DragLayer<RequiredProps, CollectedProps = any>(
	collect: DragLayerCollector<RequiredProps, CollectedProps>,
	options: DndOptions<RequiredProps> = {},
): DndComponentEnhancer<CollectedProps> {
	checkDecoratorArguments('DragLayer', 'collect[, options]', collect, options)
	invariant(
		typeof collect === 'function',
		'Expected "collect" provided as the first argument to DragLayer to be a function that collects props to inject into the component. ',
		'Instead, received %s. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-layer',
		collect,
	)
	invariant(
		isPlainObject(options),
		'Expected "options" provided as the second argument to DragLayer to be a plain object when specified. ' +
			'Instead, received %s. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-layer',
		options,
	)

	return function decorateLayer<
		ComponentType extends RComponentType<RequiredProps & CollectedProps>,
	>(DecoratedComponent: ComponentType): DndComponentEnhancer<CollectedProps> {
		const Decorated = DecoratedComponent as any
		const { arePropsEqual = shallowEqual } = options
		const displayName = Decorated.displayName || Decorated.name || 'Component'

		class DragLayerContainer extends Component<RequiredProps> {
			public static displayName = `DragLayer(${displayName})`
			public static DecoratedComponent = DecoratedComponent

			private manager: DragDropManager | undefined
			private isCurrentlyMounted = false
			private unsubscribeFromOffsetChange: Unsubscribe | undefined
			private unsubscribeFromStateChange: Unsubscribe | undefined
			private ref: RefObject<any> = createRef()

			public getDecoratedComponentInstance() {
				invariant(
					this.ref.current,
					'In order to access an instance of the decorated component, it must either be a class component or use React.forwardRef()',
				)
				return this.ref.current
			}

			public shouldComponentUpdate(nextProps: any, nextState: any) {
				return (
					!arePropsEqual(nextProps, this.props) ||
					!shallowEqual(nextState, this.state)
				)
			}

			public componentDidMount() {
				this.isCurrentlyMounted = true
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
					<DndContext.Consumer>
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
								<Decorated
									{...this.props}
									{...this.state}
									ref={isRefable(Decorated) ? this.ref : null}
								/>
							)
						}}
					</DndContext.Consumer>
				)
			}

			private receiveDragDropManager(dragDropManager: DragDropManager) {
				if (this.manager !== undefined) {
					return
				}
				this.manager = dragDropManager
				invariant(
					typeof dragDropManager === 'object',
					'Could not find the drag and drop manager in the context of %s. ' +
						'Make sure to render a DndProvider component in your top-level component. ' +
						'Read more: http://react-dnd.github.io/react-dnd/docs/troubleshooting#could-not-find-the-drag-and-drop-manager-in-the-context',
					displayName,
					displayName,
				)

				const monitor = this.manager.getMonitor()
				this.unsubscribeFromOffsetChange = monitor.subscribeToOffsetChange(
					this.handleChange,
				)
				this.unsubscribeFromStateChange = monitor.subscribeToStateChange(
					this.handleChange,
				)
			}

			private handleChange = () => {
				if (!this.isCurrentlyMounted) {
					return
				}

				const nextState = this.getCurrentState()
				if (!shallowEqual(nextState, this.state)) {
					this.setState(nextState)
				}
			}

			private getCurrentState() {
				if (!this.manager) {
					return {}
				}
				const monitor = this.manager.getMonitor()
				return collect(monitor, this.props)
			}
		}

		return hoistStatics(DragLayerContainer, DecoratedComponent) as any
	} as any as DndComponentEnhancer<CollectedProps>
}
