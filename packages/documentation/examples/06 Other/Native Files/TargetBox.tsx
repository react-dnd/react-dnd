import React from 'react'
import {
	DropTarget,
	DropTargetConnector,
	ConnectDropTarget,
	DropTargetMonitor,
} from 'react-dnd'

const style: React.CSSProperties = {
	border: '1px solid gray',
	height: '15rem',
	width: '15rem',
	padding: '2rem',
	textAlign: 'center',
}

const boxTarget = {
	drop(props: TargetBoxProps, monitor: DropTargetMonitor) {
		if (props.onDrop) {
			props.onDrop(props, monitor)
		}
	},
}

export interface TargetBoxProps {
	accepts: string[]
	connectDropTarget?: ConnectDropTarget
	isOver?: boolean
	canDrop?: boolean
	onDrop: (props: TargetBoxProps, monitor: DropTargetMonitor) => void
}

@DropTarget(
	(props: TargetBoxProps) => props.accepts,
	boxTarget,
	(connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop(),
	}),
)
export default class TargetBox extends React.Component<TargetBoxProps> {
	public render() {
		const { canDrop, isOver, connectDropTarget } = this.props
		const isActive = canDrop && isOver

		return (
			connectDropTarget &&
			connectDropTarget(
				<div style={style}>
					{isActive ? 'Release to drop' : 'Drag file here'}
				</div>,
			)
		)
	}
}
