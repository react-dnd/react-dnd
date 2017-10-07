import { Component, Children } from 'react'
import PropTypes from 'prop-types'
import {
	CHILD_CONTEXT_TYPES,
	createChildContext,
	unpackBackendForEs5Users,
} from './DragDropContext'

/**
 * This class is a React-Component based version of the DragDropContext.
 * This is an alternative to decorating an application component with an ES7 decorator.
 */
export default class DragDropContextProvider extends Component {
	static propTypes = {
		backend: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
		children: PropTypes.element.isRequired,
		window: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	}

	static defaultProps = {
		window: undefined,
	}

	static childContextTypes = CHILD_CONTEXT_TYPES

	static displayName = 'DragDropContextProvider'

	static contextTypes = {
		window: PropTypes.object,
	}

	constructor(props, context) {
		super(props, context)

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

	componentWillReceiveProps(nextProps) {
		if (
			nextProps.backend !== this.props.backend ||
			nextProps.window !== this.props.window
		) {
			throw new Error(
				'DragDropContextProvider backend and window props must not change.',
			)
		}
	}

	getChildContext() {
		return this.childContext
	}

	render() {
		return Children.only(this.props.children)
	}
}
