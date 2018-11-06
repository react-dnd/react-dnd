import * as React from 'react'
import Container from './Container'

export default class SortableCancelOnDropOutside extends React.Component {
	public render() {
		return (
			<div>
				<p>
					<b>
						<a href="https://github.com/react-dnd/react-dnd/tree/master/packages/documentation/src/examples/04%20Sortable/Cancel%20on%20Drop%20Outside">
							Browse the Source
						</a>
					</b>
				</p>
				<p>
					Because you write the logic instead of using the readymade components,
					you can tweak the behavior to the one your app needs. In this example,
					instead of moving the card inside the drop target&apos;s{' '}
					<code>drop()</code> handler, we do it inside the drag source&apos;s{' '}
					<code>endDrag()</code> handler. This let us check{' '}
					<code>monitor.didDrop()</code> and revert the drag operation if the
					card was dropped outside its container.
				</p>
				<Container />
			</div>
		)
	}
}
