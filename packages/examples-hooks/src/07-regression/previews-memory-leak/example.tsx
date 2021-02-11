import { FC, useState, useEffect } from 'react'
import { BoxWithImage } from './BoxWithImage'
import { BoxWithHandle } from './BoxWithHandle'

export const Example: FC = () => {
	const [key, setKey] = useState(0)

	useEffect(() => {
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
