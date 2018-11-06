import * as React from 'react'
import Container from './Container'

export default class CustomizeDropEffects extends React.Component {
	public render() {
		return (
			<div>
				<p>
					<b>
						<a href="https://github.com/react-dnd/react-dnd/tree/master/packages/documentation/src/examples/05%20Customize/Drop%20Effects">
							Browse the Source
						</a>
					</b>
				</p>
				<p>
					Some browsers let you specify the “drop effects” for the draggable
					items. In the compatible browsers, you will see a “copy” icon when you
					drag the first box over the drop zone.
				</p>
				<Container />
			</div>
		)
	}
}
