import * as React from 'react'
import Dustbin from './Dustbin'
import Box from './Box'

export default function Container() {
	return (
		<div>
			<h1>EXPERIMENTAL API</h1>
			<div style={{ overflow: 'hidden', clear: 'both' }}>
				<Dustbin />
			</div>
			<div style={{ overflow: 'hidden', clear: 'both' }}>
				<Box name="Glass" />
				<Box name="Banana" />
				<Box name="Paper" />
			</div>
		</div>
	)
}
