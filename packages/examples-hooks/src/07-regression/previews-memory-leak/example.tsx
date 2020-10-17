import React from 'react'
import { BoxWithImage } from './BoxWithImage'
import { BoxWithHandle } from './BoxWithHandle'

export const Example: React.FC = () => {
	const [key, setKey] = React.useState(0)

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			setKey(Math.random())
		}, 100)
		return () => clearTimeout(timeout)
	})

	return (
		<div key={key}>
			<div style={{ marginTop: '1.5rem' }}>
				<BoxWithHandle />
				<BoxWithImage />
			</div>
		</div>
	)
}
