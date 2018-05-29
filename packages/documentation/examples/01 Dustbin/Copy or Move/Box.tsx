import React from 'react'
import PropTypes from 'prop-types'
import {
	DragSource,
	ConnectDragSource,
	DragSourceConnector,
	DragSourceMonitor,
} from 'react-dnd'
import ItemTypes from '../Single Target/ItemTypes'
import { DragDropManager } from 'dnd-core'

const style: React.CSSProperties = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	float: 'left',
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
			let alertMessage = ''
			const isDropAllowed =
				dropResult.allowedDropEffect === 'any' ||
				dropResult.allowedDropEffect === dropResult.dropEffect

			if (isDropAllowed) {
				const isCopyAction = dropResult.dropEffect === 'copy'
				const actionName = isCopyAction ? 'copied' : 'moved'
				alertMessage = `You ${actionName} ${item.name} into ${dropResult.name}!`
			} else {
				alertMessage = `You cannot ${dropResult.dropEffect} an item into the ${
					dropResult.name
				}`
			}
			alert(alertMessage) // eslint-disable-line no-alert
		}
	},
}

export interface BoxProps {
	name: string
	isDragging?: boolean
	connectDragSource?: ConnectDragSource
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
	public static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		name: PropTypes.string.isRequired,
	}

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
