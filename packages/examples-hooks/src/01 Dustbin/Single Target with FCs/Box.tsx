import React from 'react'
import {
	ConnectDragSource,
	DragSource,
	DragSourceConnector,
	DragSourceMonitor,
} from 'react-dnd'
import ItemTypes from '../Single Target/ItemTypes'

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
}

interface BoxCollectedProps {
	isDragging?: boolean
	connectDragSource?: ConnectDragSource
}

const Box: React.FC<BoxProps & BoxCollectedProps> = ({
	isDragging,
	connectDragSource,
	name,
}) => {
	const opacity = isDragging ? 0.4 : 1
	const ref = React.createRef()
	return connectDragSource
		? connectDragSource(
				<div ref={ref as any} style={{ ...style, opacity }}>
					{name}
				</div>,
		  )
		: null
}

export default DragSource<BoxProps, BoxCollectedProps>(
	ItemTypes.BOX,
	{
		beginDrag(props: BoxProps) {
			return {
				name: props.name,
			}
		},
		endDrag(props: BoxProps, monitor: DragSourceMonitor) {
			const item = monitor.getItem()
			const dropResult = monitor.getDropResult()

			if (dropResult) {
				alert(`You dropped ${item.name} into ${dropResult.name}!`)
			}
		},
	},
	(connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}),
)(Box)
