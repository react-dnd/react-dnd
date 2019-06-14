import React from 'react'
import { ConnectDragSource, DragSourceMonitor } from 'react-dnd'
import { DragSource, DragSourceConnector } from 'react-dnd'

const style: React.CSSProperties = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	cursor: 'move',
	float: 'left',
}

export interface BoxProps {
	name: string
	type: string
	isDropped: boolean

	// Collected Props
	connectDragSource: ConnectDragSource
	isDragging: boolean
}

export const Box: React.FC<BoxProps> = ({
	name,
	isDropped,
	isDragging,
	connectDragSource,
}) => {
	const opacity = isDragging ? 0.4 : 1
	return connectDragSource(
		<div style={{ ...style, opacity }}>{isDropped ? <s>{name}</s> : name}</div>,
	)
}

export default DragSource(
	(props: BoxProps) => props.type,
	{
		beginDrag: (props: BoxProps) => ({ name: props.name }),
	},
	(connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}),
)(Box)
