import * as React from 'react'
import Container from './Container'

export default class NestingDragSources extends React.Component {
	public render() {
		return (
			<div>
				<p>
					<b>
						<a href="https://github.com/react-dnd/react-dnd/tree/master/packages/documentation/examples/03%20Nesting/Drag%20Sources">
							Browse the Source
						</a>
					</b>
				</p>
				<p>
					You can nest the drag sources in one another. If a nested drag source
					returns <code>false</code> from <code>canDrag</code>, its parent will
					be asked, until a draggable source is found and activated. Only the
					activated drag source will have its <code>beginDrag()</code> and{' '}
					<code>endDrag()</code> called.
				</p>
				<Container />
			</div>
		)
	}
}
