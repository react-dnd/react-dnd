import React, { useState, useImperativeHandle } from 'react'
import { DropTarget } from 'react-dnd'
import { ConnectDropTarget, DropTargetMonitor } from 'react-dnd'
import ItemTypes from './ItemTypes'

function getStyle(backgroundColor: string): React.CSSProperties {
	return {
		border: '1px solid rgba(0,0,0,0.2)',
		minHeight: '8rem',
		minWidth: '8rem',
		color: 'white',
		backgroundColor,
		padding: '2rem',
		paddingTop: '1rem',
		margin: '1rem',
		textAlign: 'center',
		float: 'left',
		fontSize: '1rem',
	}
}

export interface DustbinProps {
	greedy?: boolean
	isOver: boolean
	isOverCurrent: boolean
	connectDropTarget: ConnectDropTarget
}

export interface DustbinState {
	hasDropped: boolean
	hasDroppedOnChild: boolean
}

const Dustbin = React.forwardRef<HTMLDivElement, DustbinProps>(
	({ greedy, isOver, isOverCurrent, connectDropTarget, children }, ref) => {
		const [hasDropped, setHasDropped] = useState(false)
		const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false)

		useImperativeHandle(
			ref as any,
			() => ({
				onDrop: (onChild: boolean) => {
					setHasDroppedOnChild(onChild)
					setHasDropped(true)
				},
			}),
			[],
		)

		const text = greedy ? 'greedy' : 'not greedy'
		let backgroundColor = 'rgba(0, 0, 0, .5)'

		if (isOverCurrent || (isOver && greedy)) {
			backgroundColor = 'darkgreen'
		}

		return connectDropTarget(
			<div style={getStyle(backgroundColor)}>
				{text}
				<br />
				{hasDropped && <span>dropped {hasDroppedOnChild && ' on child'}</span>}
				<div>{children}</div>
			</div>,
		)
	},
)

export default DropTarget(
	ItemTypes.BOX,
	{
		drop(
			props: DustbinProps,
			monitor: DropTargetMonitor,
			component: React.Component | null,
		) {
			if (!component) {
				return
			}
			const hasDroppedOnChild = monitor.didDrop()
			if (hasDroppedOnChild && !props.greedy) {
				return
			}

			;(component as any).onDrop(hasDroppedOnChild)
		},
	},
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		isOverCurrent: monitor.isOver({ shallow: true }),
	}),
)(Dustbin)
