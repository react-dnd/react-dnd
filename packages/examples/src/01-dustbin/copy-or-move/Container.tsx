import type { FC } from 'react'
import { Dustbin } from './Dustbin.js'
import { Box } from './Box.js'

export const Container: FC = () => (
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
