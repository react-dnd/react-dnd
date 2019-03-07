import React from 'react'
import Dustbin from './Dustbin'
import Box from './Box'

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
