import React from 'react'
import SourceBox from './SourceBox'
import TargetBox from './TargetBox'

const Container: React.FC = () => (
	<div style={{ overflow: 'hidden', clear: 'both', marginTop: '1.5rem' }}>
		<div style={{ float: 'left' }}>
			<SourceBox showCopyIcon={true} />
			<SourceBox />
		</div>
		<div style={{ float: 'left' }}>
			<TargetBox />
		</div>
	</div>
)

export default Container
