import * as React from 'react'
import checkDecoratorArguments from './utils/checkDecoratorArguments'
import { DragDropManager, Unsubscribe } from 'dnd-core'
import { DragLayerCollector, DndOptions, DndComponentClass } from './interfaces'
import { Consumer } from './DragDropContext'
const hoistStatics = require('hoist-non-react-statics')
const isPlainObject = require('lodash/isPlainObject')
const invariant = require('invariant')
const shallowEqual = require('shallowequal')
const isClassComponent = require('recompose/isClassComponent').default

export default function DragLayer<Props, CollectedProps = {}>(
	collect: DragLayerCollector<Props, CollectedProps>,
	options: DndOptions<Props> = {},
) {
	checkDecoratorArguments('DragLayer', 'collect[, options]', collect, options)
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

	return function decorateLayer<
		TargetClass extends
			| React.ComponentClass<Props>
			| React.StatelessComponent<Props>
	>(DecoratedComponent: TargetClass): TargetClass & DndComponentClass<Props> {
		const Decorated = DecoratedComponent as any
		const { arePropsEqual = shallowEqual } = options
		const displayName = Decorated.displayName || Decorated.name || 'Component'

		class DragLayerContainer extends React.Component<Props> {
			public static displayName = `DragLayer(${displayName})`

			public get DecoratedComponent() {
				return DecoratedComponent
			}

			private manager: DragDropManager<any> | undefined
			private isCurrentlyMounted: boolean = false
			private unsubscribeFromOffsetChange: Unsubscribe | undefined
			private unsubscribeFromStateChange: Unsubscribe | undefined
			private ref: React.RefObject<any> = React.createRef()

			constructor(props: Props) {
				super(props)
				this.handleChange = this.handleChange.bind(this)
			}

			public getDecoratedComponentInstance() {
				invariant(
					this.ref.current,
					'In order to access an instance of the decorated component it can not be a stateless component.',
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
								<Decorated
									{...this.props}
									{...this.state}
									ref={isClassComponent(Decorated) ? this.ref : undefined}
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

				const monitor = this.manager.getMonitor()
				this.unsubscribeFromOffsetChange = monitor.subscribeToOffsetChange(
					this.handleChange,
				)
				this.unsubscribeFromStateChange = monitor.subscribeToStateChange(
					this.handleChange,
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
				if (!this.manager) {
					return {}
				}
				const monitor = this.manager.getMonitor()
				return collect(monitor, this.props)
			}
		}

		return hoistStatics(DragLayerContainer, DecoratedComponent) as TargetClass &
			DndComponentClass<Props>
	}
}
