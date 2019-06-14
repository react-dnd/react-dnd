import React from 'react'
import { ConnectDragSource, DragSourceMonitor } from 'react-dnd'
import { DragSource, DragSourceConnector } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style: React.CSSProperties = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	float: 'left',
}

export interface BoxProps {
	isDragging: boolean
	connectDragSource: ConnectDragSource
	name: string
}

const Box: React.FC<BoxProps> = ({ name, isDragging, connectDragSource }) => {
	const opacity = isDragging ? 0.4 : 1
	return connectDragSource(<div style={{ ...style, opacity }}>{name}</div>)
}

export default DragSource(
	ItemTypes.BOX,
	{
		beginDrag: (props: BoxProps) => ({ name: props.name }),
		endDrag(props: BoxProps, monitor: DragSourceMonitor) {
			const item = monitor.getItem()
			const dropResult = monitor.getDropResult()

			if (dropResult) {
				let alertMessage = ''
				const isDropAllowed =
					dropResult.allowedDropEffect === 'any' ||
					dropResult.allowedDropEffect === dropResult.dropEffect

				if (isDropAllowed) {
					const isCopyAction = dropResult.dropEffect === 'copy'
					const actionName = isCopyAction ? 'copied' : 'moved'
					alertMessage = `You ${actionName} ${item.name} into ${
						dropResult.name
					}!`
				} else {
					alertMessage = `You cannot ${
						dropResult.dropEffect
					} an item into the ${dropResult.name}`
				}
				alert(alertMessage)
			}
		},
	},
	(connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}),
)(Box)
