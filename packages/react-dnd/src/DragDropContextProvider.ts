import { Component, Children, ReactElement } from 'react'
import PropTypes from 'prop-types'
import { IBackend, BackendFactory } from 'dnd-core'
import {
	CHILD_CONTEXT_TYPES,
	createChildContext,
	unpackBackendForEs5Users,
} from './DragDropContext'

/**
 * This class is a React-Component based version of the DragDropContext.
 * This is an alternative to decorating an application component with an ES7 decorator.
 */
export interface IDragDropContextProviderProps {
	backend: BackendFactory
	// TODO: Replace with generic context, see TODO below
	window: any
}

export default class DragDropContextProvider extends Component<
	IDragDropContextProviderProps
> {
	public static propTypes = {
		backend: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
		children: PropTypes.element.isRequired,
		window: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	}
	public static defaultProps = {
		window: undefined,
	}
	public static childContextTypes = CHILD_CONTEXT_TYPES
	public static displayName = 'DragDropContextProvider'
	public static contextTypes = {
		window: PropTypes.object,
	}

	private backend: BackendFactory
	private childContext: any

	constructor(props: any, context: any) {
		super(props, context)

		// TODO: Remove 'window' here to allow for non-dom (e.g. React-Native) environments

		/**
		 * This property determines which window global to use for creating the DragDropManager.
		 * If a window has been injected explicitly via props, that is used first. If it is available
		 * as a context value, then use that, otherwise use the browser global.
		 */
		const getWindow = () => {
			if (props && props.window) {
				return props.window
			} else if (context && context.window) {
				return context.window
			} else if (typeof window !== 'undefined') {
				return window
			}
			return undefined
		}

		this.backend = unpackBackendForEs5Users(props.backend)
		this.childContext = createChildContext(this.backend, {
			window: getWindow(),
		})
	}

	public componentWillReceiveProps(nextProps: any) {
		if (
			nextProps.backend !== this.props.backend ||
			nextProps.window !== this.props.window
		) {
			throw new Error(
				'DragDropContextProvider backend and window props must not change.',
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
