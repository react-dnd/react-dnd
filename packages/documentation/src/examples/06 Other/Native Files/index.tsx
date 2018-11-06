import * as React from 'react'
import Container from './Container'

export default class NativeFiles extends React.Component {
	public render() {
		return (
			<div>
				<p>
					<b>
						<a href="https://github.com/react-dnd/react-dnd/tree/master/packages/documentation/src/examples/06%20Other/Native%20Files">
							Browse the Source
						</a>
					</b>
				</p>
				<p>Example demonstrating drag and drop of native files.</p>
				<Container />
			</div>
		)
	}
}
