import * as React from 'react'
import Dustbin from './Dustbin'
import Box from './Box'

const Container: React.FC<{}> = () => (
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

export default Container
