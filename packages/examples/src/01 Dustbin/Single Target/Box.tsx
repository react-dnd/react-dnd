import React from 'react'
import { DragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd'
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

interface BoxProps {
	name: string
}

interface BoxCollectedProps {
	isDragging: boolean
	dragSource: React.RefObject<any>
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

class Box extends React.Component<BoxProps & BoxCollectedProps> {
	public render() {
		const { isDragging, dragSource } = this.props
		const { name } = this.props
		const opacity = isDragging ? 0.4 : 1

		return (
			<div ref={dragSource} style={{ ...style, opacity }}>
				{name}
			</div>
		)
	}
}

export default DragSource(
	ItemTypes.BOX,
	boxSource,
	(connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
		dragSource: connect.dragSourceRef(),
		isDragging: monitor.isDragging(),
	}),
)(Box)
