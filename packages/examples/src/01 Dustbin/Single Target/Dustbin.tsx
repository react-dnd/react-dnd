import React from 'react'
import { DropTarget, DropTargetConnector, DropTargetMonitor } from 'react-dnd'
import ItemTypes from './ItemTypes'

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
	drop: () => ({ name: 'Dustbin' }),
}

export interface DustbinProps {
	canDrop: boolean
	isOver: boolean
	dropTarget: React.RefObject<any>
}

class Dustbin extends React.Component<DustbinProps> {
	public render() {
		const { canDrop, isOver, dropTarget } = this.props
		const isActive = canDrop && isOver

		let backgroundColor = '#222'
		if (isActive) {
			backgroundColor = 'darkgreen'
		} else if (canDrop) {
			backgroundColor = 'darkkhaki'
		}

		return (
			<div ref={dropTarget} style={{ ...style, backgroundColor }}>
				{isActive ? 'Release to drop' : 'Drag a box here'}
			</div>
		)
	}
}

export default DropTarget(
	ItemTypes.BOX,
	boxTarget,
	(connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
		dropTarget: connect.dropTargetRef(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
	}),
)(Dustbin)
