import React from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
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

@DragSource(ItemTypes.BOX, boxSource, connect => ({
	connectDragSource: connect.dragSource(),
}))
export default class Box extends React.Component {
	public static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
	}

	public render() {
		const { connectDragSource } = this.props

		return connectDragSource(<div style={style}>Drag me</div>)
	}
}
