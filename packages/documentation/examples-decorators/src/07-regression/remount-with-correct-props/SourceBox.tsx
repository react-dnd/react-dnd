import React from 'react'
import { DragSource, ConnectDragSource } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

const getStyle = (isDragging: boolean) => ({
	display: 'inline-block',
	padding: '0.5rem 1rem',
	cursor: 'pointer',
	border: '1px dashed gray',
	backgroundColor: isDragging ? 'red' : undefined,
	opacity: isDragging ? 0.4 : 1,
})

export interface SourceBoxProps {
	id: string
	isDragging: boolean
	connectDragSource: ConnectDragSource
	onBeginDrag: () => void
	onEndDrag: () => void
}
const SourceBox: React.FC<SourceBoxProps> = ({
	isDragging,
	connectDragSource,
}) => {
	return connectDragSource(<div style={getStyle(isDragging)}>Drag me</div>)
}

export default DragSource(
	ItemTypes.BOX,
	{
		beginDrag: (props: SourceBoxProps) => {
			props.onBeginDrag()
			return { id: props.id }
		},
		endDrag: (props: SourceBoxProps) => {
			props.onEndDrag()
		},
		isDragging: (props: SourceBoxProps, monitor) =>
			monitor.getItem().id === props.id,
	},
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}),
)(SourceBox)
