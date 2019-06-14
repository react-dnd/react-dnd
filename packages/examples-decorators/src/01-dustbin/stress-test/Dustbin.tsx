import React, { memo } from 'react'
import { ConnectDropTarget, DropTargetMonitor } from 'react-dnd'
import { DropTarget, DropTargetConnector } from 'react-dnd'

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

export interface DustbinProps {
	lastDroppedItem?: any
	accepts: string[]
	onDrop: (arg: any) => void

	// Collected Props

	connectDropTarget: ConnectDropTarget
	isOver: boolean
	canDrop: boolean
}

const Dustbin: React.FC<DustbinProps> = memo(
	({ accepts, isOver, canDrop, connectDropTarget, lastDroppedItem }) => {
		const isActive = isOver && canDrop

		let backgroundColor = '#222'
		if (isActive) {
			backgroundColor = 'darkgreen'
		} else if (canDrop) {
			backgroundColor = 'darkkhaki'
		}

		return connectDropTarget(
			<div style={{ ...style, backgroundColor }}>
				{isActive
					? 'Release to drop'
					: `This dustbin accepts: ${accepts.join(', ')}`}

				{lastDroppedItem && (
					<p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
				)}
			</div>,
		)
	},
)

export default DropTarget(
	(props: DustbinProps) => props.accepts,
	{
		drop(props: DustbinProps, monitor: DropTargetMonitor) {
			props.onDrop(monitor.getItem())
		},
	},
	(connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
	}),
)(Dustbin)
