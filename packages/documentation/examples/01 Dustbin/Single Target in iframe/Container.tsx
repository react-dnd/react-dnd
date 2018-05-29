import React from 'react'
import PropTypes from 'prop-types'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Dustbin from '../Single Target/Dustbin'
import Box from '../Single Target/Box'
const Frame = require('react-frame-component').default

class FrameBindingContext extends React.Component {
	public static contextTypes = {
		window: PropTypes.object,
	}
	public static propTypes = {
		children: PropTypes.node,
	}

	get dragDropContext() {
		return {
			window: this.context.window,
		}
	}

	public render() {
		return (
			<DragDropContextProvider
				backend={HTML5Backend}
				context={this.dragDropContext}
			>
				{this.props.children}
			</DragDropContextProvider>
		)
	}
}

// Don't use the decorator, embed the DnD context within the iframe
// tslint:disable-next-line max-classes-per-file
export default class Container extends React.Component {
	public render() {
		// The react-frame-component will pass the iframe's 'window' global as a context value
		// to the DragDropContext provider. You could also directly inject it in via a prop.
		// If neither the prop or the context value for 'window' are present, the DragDropContextProvider
		// will just use the global window.
		return (
			<Frame style={{ width: '100%', height: '100%' }}>
				<FrameBindingContext>
					<div>
						<div style={{ overflow: 'hidden', clear: 'both' }}>
							<Dustbin />
						</div>
						<div style={{ overflow: 'hidden', clear: 'both' }}>
							<Box name="Glass" />
							<Box name="Banana" />
							<Box name="Paper" />
						</div>
					</div>
				</FrameBindingContext>
			</Frame>
		)
	}
}
