import React from 'react'
import { ConnectDropTarget, DropTargetMonitor } from 'react-dnd'
import { DropTarget, DropTargetConnector } from 'react-dnd'

const style: React.CSSProperties = {
	border: '1px solid gray',
	height: '15rem',
	width: '15rem',
	padding: '2rem',
	textAlign: 'center',
}

export interface TargetBoxProps {
	accepts: string[]
	onDrop: (props: TargetBoxProps, monitor: DropTargetMonitor) => void
	isOver: boolean
	canDrop: boolean
	connectDropTarget: ConnectDropTarget
}

const TargetBox: React.FC<TargetBoxProps> = ({
	canDrop,
	isOver,
	connectDropTarget,
}) => {
	const isActive = canDrop && isOver
	return connectDropTarget(
		<div style={style}>{isActive ? 'Release to drop' : 'Drag file here'}</div>,
	)
}

export default DropTarget(
	(props: TargetBoxProps) => props.accepts,
	{
		drop(props: TargetBoxProps, monitor: DropTargetMonitor) {
			if (props.onDrop) {
				props.onDrop(props, monitor)
			}
		},
	},
	(connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
	}),
)(TargetBox)
