import React from 'react'
import { DragSource, ConnectDragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style: React.CSSProperties = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1rem',
	marginBottom: '1rem',
	cursor: 'move',
}

const boxSource = {
	beginDrag() {
		return {}
	},
}

export interface SourceBoxProps {
	showCopyIcon?: boolean
}

interface SourceBoxCollectedProps {
	isDragging: boolean
	connectDragSource: ConnectDragSource
}

class SourceBox extends React.Component<
	SourceBoxProps & SourceBoxCollectedProps
> {
	public render() {
		const { isDragging, connectDragSource, showCopyIcon } = this.props
		const opacity = isDragging ? 0.4 : 1
		const dropEffect = showCopyIcon ? 'copy' : 'move'

		return connectDragSource(
			<div style={{ ...style, opacity }}>
				When I am over a drop zone, I have {showCopyIcon ? 'copy' : 'no'} icon.
			</div>,
			{ dropEffect },
		)
	}
}

export default DragSource<SourceBoxProps, SourceBoxCollectedProps>(
	ItemTypes.BOX,
	boxSource,
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}),
)(SourceBox)
