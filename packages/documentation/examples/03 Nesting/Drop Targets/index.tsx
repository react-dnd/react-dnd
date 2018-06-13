import * as React from 'react'
import Container from './Container'

export default class NestingDropTargets extends React.Component {
	public render() {
		return (
			<div>
				<p>
					<b>
						<a href="https://github.com/react-dnd/react-dnd/tree/master/packages/documentation/examples/03%20Nesting/Drop%20Targets">
							Browse the Source
						</a>
					</b>
				</p>
				<p>
					Drop targets can, too, be nested in one another. Unlike the drag
					sources, several drop targets may react to the same item being
					dragged. React DnD by design offers no means of stopping propagation.
					Instead, the drop targets may compare <code>monitor.isOver()</code>{' '}
					and{' '}
					<code>
						monitor.isOver({'{'} shallow: false {'}'})
					</code>{' '}
					to learn if just them, or their nested targets, are being hovered.
					They may also check <code>monitor.didDrop()</code> and{' '}
					<code>monitor.getDropResult()</code> to learn if a nested target has
					already handled the drop, and even return a different drop result.
				</p>
				<Container />
			</div>
		)
	}
}
