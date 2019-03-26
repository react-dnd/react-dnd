import React from 'react'
import BoxWithImage from './BoxWithImage'
import BoxWithHandle from './BoxWithHandle'

export default function Container() {
	return (
		<div>
			<h1>EXPERIMENTAL API</h1>
			<div style={{ marginTop: '1.5rem' }}>
				<BoxWithHandle />
				<BoxWithImage />
			</div>
		</div>
	)
}
