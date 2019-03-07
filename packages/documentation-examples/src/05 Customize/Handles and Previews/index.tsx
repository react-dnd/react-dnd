import React from 'react'
import BoxWithImage from './BoxWithImage'
import BoxWithHandle from './BoxWithHandle'

export default class Container extends React.Component {
	public render() {
		return (
			<div>
				<div style={{ marginTop: '1.5rem' }}>
					<BoxWithHandle />
					<BoxWithImage />
				</div>
			</div>
		)
	}
}
