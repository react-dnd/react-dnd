import { CSSProperties, FC } from 'react'
import { DragSourceMonitor, ConnectDragSource } from 'react-dnd'
import { DragSource, DragSourceConnector } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

const style: CSSProperties = {
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

	// Collected Props
	isDragging: boolean
	connectDragSource: ConnectDragSource
}
const Box: FC<BoxProps> = ({ name, isDragging, connectDragSource }) => {
	const opacity = isDragging ? 0.4 : 1
	return (
		<div ref={connectDragSource} style={{ ...style, opacity }}>
			{name}
		</div>
	)
}

export default DragSource(
	ItemTypes.BOX,
	{
		beginDrag: (props: BoxProps) => ({ name: props.name }),
		endDrag(props: BoxProps, monitor: DragSourceMonitor) {
			const item = monitor.getItem<{ name: string }>()
			const dropResult = monitor.getDropResult<{ name: string }>()

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
