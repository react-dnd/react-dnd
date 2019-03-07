import React from 'react'
import { DropTarget, ConnectDropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style: React.CSSProperties = {
	border: '1px solid gray',
	height: '15rem',
	width: '15rem',
	padding: '2rem',
	textAlign: 'center',
}

const boxTarget = {
	drop() {
		//
	},
}

export interface TargetBoxProps {
	connectDropTarget: ConnectDropTarget
	isOver: boolean
	canDrop: boolean
}

class TargetBox extends React.Component<TargetBoxProps> {
	public render() {
		const { canDrop, isOver, connectDropTarget } = this.props
		const isActive = canDrop && isOver

		return connectDropTarget(
			<div style={style}>
				{isActive ? 'Release to drop' : 'Drag item here'}
			</div>,
		)
	}
}

export default DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
}))(TargetBox)
