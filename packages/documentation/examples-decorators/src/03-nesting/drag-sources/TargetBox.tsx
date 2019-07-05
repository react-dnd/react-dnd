import React, { useState, useCallback } from 'react'
import { ConnectDropTarget, DropTargetMonitor } from 'react-dnd'
import { DropTarget } from 'react-dnd'
import Colors from './Colors'

const style: React.CSSProperties = {
	border: '1px solid gray',
	height: '15rem',
	width: '15rem',
	padding: '2rem',
	textAlign: 'center',
}

export interface TargetBoxProps {
	onDrop: (item: any) => void
	lastDroppedColor?: string

	isOver: boolean
	canDrop: boolean
	draggingColor: string
	connectDropTarget: ConnectDropTarget
}

const TargetBoxRaw: React.FC<TargetBoxProps> = ({
	canDrop,
	isOver,
	draggingColor,
	lastDroppedColor,
	connectDropTarget,
}) => {
	const opacity = isOver ? 1 : 0.7
	let backgroundColor = '#fff'
	switch (draggingColor) {
		case Colors.BLUE:
			backgroundColor = 'lightblue'
			break
		case Colors.YELLOW:
			backgroundColor = 'lightgoldenrodyellow'
			break
		default:
			break
	}

	return connectDropTarget(
		<div style={{ ...style, backgroundColor, opacity }}>
			<p>Drop here.</p>

			{!canDrop && lastDroppedColor && <p>Last dropped: {lastDroppedColor}</p>}
		</div>,
	)
}

const TargetBox = DropTarget(
	[Colors.YELLOW, Colors.BLUE],
	{
		drop(props: TargetBoxProps, monitor: DropTargetMonitor) {
			props.onDrop(monitor.getItemType())
		},
	},
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
		draggingColor: monitor.getItemType() as string,
	}),
)(TargetBoxRaw)

export interface StatefulTargetBoxState {
	lastDroppedColor: string | null
}
const StatefulTargetBox: React.FC = props => {
	const [lastDroppedColor, setLastDroppedColor] = useState<string | null>(null)
	const handleDrop = useCallback(
		(color: string) => setLastDroppedColor(color),
		[],
	)

	return (
		<TargetBox
			{...props}
			lastDroppedColor={lastDroppedColor as string}
			onDrop={handleDrop}
		/>
	)
}

export default StatefulTargetBox
