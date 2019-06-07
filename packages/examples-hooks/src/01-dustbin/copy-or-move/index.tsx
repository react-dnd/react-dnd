import React from 'react'
import Dustbin from './Dustbin'
import Box from './Box'

const Container: React.FC = () => (
	<div>
		<div style={{ overflow: 'hidden', clear: 'both' }}>
			<Dustbin allowedDropEffect="any" />
			<Dustbin allowedDropEffect="copy" />
			<Dustbin allowedDropEffect="move" />
		</div>
		<div style={{ overflow: 'hidden', clear: 'both' }}>
			<Box name="Glass" />
			<Box name="Banana" />
			<Box name="Paper" />
		</div>
	</div>
)
export default Container
