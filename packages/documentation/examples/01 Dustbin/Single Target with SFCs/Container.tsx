import * as React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Dustbin from './Dustbin'
import Box from './Box'

const Container: React.SFC<{}> = () => (
	<div>
		<div style={{ overflow: 'hidden', clear: 'both' }}>
			<Dustbin />
		</div>
		<div style={{ overflow: 'hidden', clear: 'both' }}>
			<Box name="Glass" />
			<Box name="Banana" />
			<Box name="Paper" />
		</div>
	</div>
)

export default DragDropContext(HTML5Backend)(Container)
