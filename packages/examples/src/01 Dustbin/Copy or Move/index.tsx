import React from 'react'
import Dustbin from './Dustbin'
import Box from './Box'

const rowStyle: React.CSSProperties = { overflow: 'hidden', clear: 'both' }

const Container: React.FC = () => (
	<div>
		<div style={rowStyle}>
			<Dustbin allowedDropEffect="any" />
			<Dustbin allowedDropEffect="copy" />
			<Dustbin allowedDropEffect="move" />
		</div>
		<div style={rowStyle}>
			<Box name="Glass" />
			<Box name="Banana" />
			<Box name="Paper" />
		</div>
	</div>
)

export default Container
