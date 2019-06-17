import React from 'react'
import { ConnectDropTarget } from 'react-dnd'
import { DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style: React.CSSProperties = {
	border: '1px solid gray',
	height: '15rem',
	width: '15rem',
	padding: '2rem',
	textAlign: 'center',
}

export interface TargetBoxProps {
	connectDropTarget: ConnectDropTarget
	isOver: boolean
	canDrop: boolean
}

const TargetBox: React.FC<TargetBoxProps> = ({
	canDrop,
	isOver,
	connectDropTarget,
}) => {
	const isActive = canDrop && isOver
	return connectDropTarget(
		<div style={style}>{isActive ? 'Release to drop' : 'Drag item here'}</div>,
	)
}

export default DropTarget(ItemTypes.BOX, {}, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
}))(TargetBox)
