import type { FC } from 'react'

import { BoxWithHandle } from './BoxWithHandle.js'
import { BoxWithImage } from './BoxWithImage.js'

export const Container: FC = () => {
	return (
		<div>
			<div style={{ marginTop: '1.5rem' }}>
				<BoxWithHandle />
				<BoxWithImage />
			</div>
		</div>
	)
}
