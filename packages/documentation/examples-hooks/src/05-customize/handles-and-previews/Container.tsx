import React from 'react'
import { BoxWithImage } from './BoxWithImage'
import { BoxWithHandle } from './BoxWithHandle'

export const Container: React.FC = () => {
	return (
		<div>
			<div style={{ marginTop: '1.5rem' }}>
				<BoxWithHandle />
				<BoxWithImage />
			</div>
		</div>
	)
}
