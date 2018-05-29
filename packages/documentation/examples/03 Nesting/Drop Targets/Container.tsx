import React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Dustbin from './Dustbin'
import Box from './Box'

@DragDropContext(HTML5Backend)
export default class Container extends React.Component {
	public render() {
		return (
			<div>
				<div style={{ overflow: 'hidden', clear: 'both', margin: '-1rem' }}>
					<Dustbin greedy={true}>
						<Dustbin greedy={true}>
							<Dustbin greedy={true} />
						</Dustbin>
					</Dustbin>

					<Dustbin>
						<Dustbin>
							<Dustbin />
						</Dustbin>
					</Dustbin>
				</div>

				<div style={{ overflow: 'hidden', clear: 'both', marginTop: '1.5rem' }}>
					<Box />
				</div>
			</div>
		)
	}
}
