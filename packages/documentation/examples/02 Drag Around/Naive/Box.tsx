import React from 'react'
import PropTypes from 'prop-types'
import { DragSource, ConnectDragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style: React.CSSProperties = {
	position: 'absolute',
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	cursor: 'move',
}

const boxSource = {
	beginDrag(props: BoxProps) {
		const { id, left, top } = props
		return { id, left, top }
	},
}

export interface BoxProps {
	connectDragSource?: ConnectDragSource
	isDragging?: boolean
	id?: any
	left?: number
	top?: number
	hideSourceOnDrag?: any
}

@DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))
export default class Box extends React.Component<BoxProps> {
	public static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		id: PropTypes.any.isRequired,
		left: PropTypes.number.isRequired,
		top: PropTypes.number.isRequired,
		hideSourceOnDrag: PropTypes.bool.isRequired,
		children: PropTypes.node,
	}

	public render() {
		const {
			hideSourceOnDrag,
			left,
			top,
			connectDragSource,
			isDragging,
			children,
		} = this.props
		if (isDragging && hideSourceOnDrag) {
			return null
		}

		return (
			connectDragSource &&
			connectDragSource(<div style={{ ...style, left, top }}>{children}</div>)
		)
	}
}
