import React from 'react'
import { DropTarget, ConnectDropTarget } from 'react-dnd'
import ItemTypes from '../Single Target/ItemTypes'

const style: React.CSSProperties = {
	height: '12rem',
	width: '12rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	color: 'white',
	padding: '1rem',
	textAlign: 'center',
	fontSize: '1rem',
	lineHeight: 'normal',
	float: 'left',
}

const boxTarget = {
	drop({ allowedDropEffect }: DustbinProps) {
		return {
			name: `${allowedDropEffect} Dustbin`,
			allowedDropEffect,
		}
	},
}

export interface DustbinProps {
	allowedDropEffect: string
}

interface DustbinCollectedProps {
	connectDropTarget: ConnectDropTarget
	canDrop: boolean
	isOver: boolean
}

class Dustbin extends React.Component<DustbinProps & DustbinCollectedProps> {
	public render() {
		const { canDrop, isOver, allowedDropEffect, connectDropTarget } = this.props
		const isActive = canDrop && isOver

		let backgroundColor = '#222'
		if (isActive) {
			backgroundColor = 'darkgreen'
		} else if (canDrop) {
			backgroundColor = 'darkkhaki'
		}

		return connectDropTarget(
			<div style={{ ...style, backgroundColor }}>
				{`Works with ${allowedDropEffect} drop effect`}
				<br />
				<br />
				{isActive ? 'Release to drop' : 'Drag a box here'}
			</div>,
		)
	}
}

export default DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
}))(Dustbin)
