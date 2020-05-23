import React, { memo } from 'react'
import { Dustbin } from './Dustbin'
import { Box } from './Box'

export const Container: React.FC = memo(function Container() {
	return (
		<div>
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
})
