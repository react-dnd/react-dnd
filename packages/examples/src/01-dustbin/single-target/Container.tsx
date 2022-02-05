import { FC, memo } from 'react'
import { Dustbin } from './Dustbin.js'
import { Box } from './Box.js'

export const Container: FC = memo(function Container() {
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
