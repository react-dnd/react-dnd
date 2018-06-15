import * as React from 'react'
import {
	ConnectDragSource,
	DragSource,
	DragSourceConnector,
	DragSourceMonitor,
} from 'react-dnd'
import ItemTypes from './ItemTypes'

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
	isDragging?: boolean
	connectDragSource?: ConnectDragSource
}

const boxSource = {
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
}

@DragSource(
	ItemTypes.BOX,
	boxSource,
	(connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}),
)
export default class Box extends React.Component<BoxProps> {
	public render() {
		const { isDragging, connectDragSource } = this.props
		const { name } = this.props
		const opacity = isDragging ? 0.4 : 1

		return (
			connectDragSource &&
			connectDragSource(<div style={{ ...style, opacity }}>{name}</div>)
		)
	}
}
