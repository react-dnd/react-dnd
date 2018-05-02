import { Component, Children, ReactElement } from 'react'
import PropTypes from 'prop-types'
import { IBackend, BackendFactory } from 'dnd-core'
import { CHILD_CONTEXT_TYPES, createChildContext } from './DragDropContext'

/**
 * This class is a React-Component based version of the DragDropContext.
 * This is an alternative to decorating an application component with an ES7 decorator.
 */
export interface IDragDropContextProviderProps<Context> {
	backend: BackendFactory
	context: Context
}

export default class DragDropContextProvider extends Component<
	IDragDropContextProviderProps<any>
> {
	public static propTypes = {
		backend: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
		children: PropTypes.element.isRequired,
		context: PropTypes.object,
	}
	public static defaultProps = {
		context: undefined,
	}
	public static childContextTypes = CHILD_CONTEXT_TYPES
	public static displayName = 'DragDropContextProvider'

	private backend: BackendFactory
	private childContext: any

	constructor(props: any, context: any) {
		super(props, context)
		this.backend = props.backend
		this.childContext = createChildContext(this.backend, this.props.context)
	}

	public componentWillReceiveProps(nextProps: any) {
		if (
			nextProps.backend !== this.props.backend ||
			nextProps.context !== this.props.context
		) {
			throw new Error(
				'DragDropContextProvider backend and context props must not change.',
			)
		}
	}

	public getChildContext() {
		return this.childContext
	}

	public render() {
		return Children.only(this.props.children)
	}
}
