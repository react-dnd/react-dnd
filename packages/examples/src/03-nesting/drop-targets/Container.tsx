import type { FC } from 'react'
import { Dustbin } from './Dustbin.js'
import { Box } from './Box.js'

export const Container: FC = () => (
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
