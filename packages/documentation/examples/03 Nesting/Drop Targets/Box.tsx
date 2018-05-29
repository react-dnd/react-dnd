import React from 'react'
import PropTypes from 'prop-types'
import { DragSource, ConnectDragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style = {
	display: 'inline-block',
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	backgroundColor: 'white',
	cursor: 'move',
}

const boxSource = {
	beginDrag() {
		return {}
	},
}

export interface BoxProps {
	connectDragSource?: ConnectDragSource
}

@DragSource(ItemTypes.BOX, boxSource, connect => ({
	connectDragSource: connect.dragSource(),
}))
export default class Box extends React.Component<BoxProps> {
	public static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
	}

	public render() {
		const { connectDragSource } = this.props

		return (
			connectDragSource && connectDragSource(<div style={style}>Drag me</div>)
		)
	}
}
