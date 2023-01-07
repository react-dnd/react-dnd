import type { FC } from 'react'

import { SourceBox } from './SourceBox.js'
import { TargetBox } from './TargetBox.js'

export const Container: FC = () => {
	return (
		<>
			<div style={{ overflow: 'hidden', marginTop: '1.5rem' }}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<SourceBox dropEffect="copy" />
					<SourceBox dropEffect="move" />
					<SourceBox />
				</div>
				<div style={{ display: 'flex', flexWrap: 'wrap' }}>
					<TargetBox dropEffect="copy" />
					<TargetBox dropEffect="move" />
					<TargetBox />
				</div>
			</div>
		</>
	)
}
