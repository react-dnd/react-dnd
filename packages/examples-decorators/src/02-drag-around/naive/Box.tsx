import { CSSProperties, FC, ReactNode } from 'react'
import { ConnectDragSource } from 'react-dnd'
import { DragSource } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

const style: CSSProperties = {
	position: 'absolute',
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	cursor: 'move',
}

export interface BoxProps {
	id: any
	left: number
	top: number
	hideSourceOnDrag?: boolean
	children?: ReactNode

	// Collected Props
	connectDragSource: ConnectDragSource
	isDragging?: boolean
}

const Box: FC<BoxProps> = ({
	hideSourceOnDrag,
	left,
	top,
	connectDragSource,
	isDragging,
	children,
}) => {
	if (isDragging && hideSourceOnDrag) {
		return null
	}

	return connectDragSource(
		<div style={{ ...style, left, top }} role="Box">
			{children}
		</div>,
	)
}

export default DragSource(
	ItemTypes.BOX,
	{
		beginDrag(props: BoxProps) {
			const { id, left, top } = props
			return { id, left, top }
		},
	},
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}),
)(Box)
